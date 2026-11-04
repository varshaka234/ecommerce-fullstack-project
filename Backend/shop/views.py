from django.db import transaction
from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import CartItem, Order, OrderItem, Product
from .serializers import (
    CartInputSerializer,
    CartItemSerializer,
    CheckoutSerializer,
    OrderSerializer,
    ProductSerializer,
)


class ProductList(ListAPIView):
    queryset = Product.objects.filter(active=True).order_by("id")
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    authentication_classes = []
    pagination_class = None


class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        items = CartItem.objects.filter(user=request.user)
        return Response(CartItemSerializer(items, many=True).data)

    def put(self, request):
        serializer = CartInputSerializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)

        # product id -> quantity (the same product twice keeps the last one)
        wanted = {}
        for item in serializer.validated_data:
            wanted[item["id"]] = item["qty"]

        # The real name, price and photo come from the database, not the browser
        products = Product.objects.filter(id__in=list(wanted), active=True).in_bulk()
        if any(pid not in products for pid in wanted):
            return Response(
                {"error": "Some products are not available."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        with transaction.atomic():
            CartItem.objects.filter(user=request.user).exclude(
                product_id__in=list(wanted)
            ).delete()
            for pid, qty in wanted.items():
                p = products[pid]
                CartItem.objects.update_or_create(
                    user=request.user,
                    product_id=pid,
                    defaults={"name": p.name, "price": p.price, "image": p.image, "qty": qty},
                )

        items = CartItem.objects.filter(user=request.user)
        return Response(CartItemSerializer(items, many=True).data)


class OrderListCreate(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(user=request.user).prefetch_related("items")
        return Response(OrderSerializer(orders, many=True).data)

    def post(self, request):
        serializer = CheckoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        cart = list(CartItem.objects.filter(user=request.user))
        if not cart:
            return Response({"error": "Your cart is empty."}, status=status.HTTP_400_BAD_REQUEST)

        with transaction.atomic():
            total = sum(i.price * i.qty for i in cart)
            order = Order.objects.create(user=request.user, total=total, **serializer.validated_data)
            OrderItem.objects.bulk_create(
                [
                    OrderItem(
                        order=order, product_id=i.product_id, name=i.name,
                        price=i.price, image=i.image, qty=i.qty,
                    )
                    for i in cart
                ]
            )
            CartItem.objects.filter(user=request.user).delete()

        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)
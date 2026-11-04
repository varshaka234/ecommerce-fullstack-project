from django.utils import timezone
from rest_framework import serializers

from .models import CartItem, Order, OrderItem, Product


class ProductSerializer(serializers.ModelSerializer):
    price = serializers.DecimalField(max_digits=8, decimal_places=2, coerce_to_string=False)

    class Meta:
        model = Product
        fields = ["id", "name", "price", "type", "image", "sale", "featured", "for_women", "for_men"]

    def to_representation(self, obj):
        data = super().to_representation(obj)
        women = data.pop("for_women")
        men = data.pop("for_men")
        data["for"] = (["women"] if women else []) + (["men"] if men else [])
        return data


class CartInputSerializer(serializers.Serializer):
    # React only tells us which product and how many. Django looks up the price.
    id = serializers.IntegerField()
    qty = serializers.IntegerField(min_value=1, max_value=99)


class CartItemSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source="product_id")
    price = serializers.DecimalField(max_digits=8, decimal_places=2, coerce_to_string=False)

    class Meta:
        model = CartItem
        fields = ["id", "name", "price", "image", "qty"]


class OrderItemSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source="product_id")
    price = serializers.DecimalField(max_digits=8, decimal_places=2, coerce_to_string=False)

    class Meta:
        model = OrderItem
        fields = ["id", "name", "price", "image", "qty"]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    total = serializers.DecimalField(max_digits=10, decimal_places=2, coerce_to_string=False)
    date = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ["id", "total", "payment", "date", "items"]

    def get_date(self, obj):
        return timezone.localtime(obj.created_at).strftime("%d/%m/%Y")


class CheckoutSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    phone = serializers.CharField(max_length=20)
    address = serializers.CharField()
    payment = serializers.ChoiceField(choices=["Cash on delivery", "UPI", "Card"])
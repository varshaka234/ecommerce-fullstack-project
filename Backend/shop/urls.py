from django.urls import path
from . import views

urlpatterns = [
    # Public products
    path("products/", views.ProductList.as_view()),

    # Admin product management
    path("admin/products/", views.AdminProductList.as_view()),
    path("admin/products/<int:pk>/", views.AdminProductDetail.as_view()),

    # Customer cart and orders
    path("cart/", views.CartView.as_view()),
    path("orders/", views.OrderListCreate.as_view()),
    
    path("admin/orders/", views.AdminOrderList.as_view()),
    path(
    "admin/orders/<int:pk>/status/",
    views.AdminOrderStatusUpdate.as_view()
),

]
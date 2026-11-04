from django.contrib import admin
from .models import CartItem, Order, OrderItem, Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "price", "type", "sale", "featured", "active")
    list_editable = ("price", "sale", "featured", "active")
    list_filter = ("type", "active")
    search_fields = ("name",)


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "total", "payment", "created_at")
    inlines = [OrderItemInline]


admin.site.register(CartItem)
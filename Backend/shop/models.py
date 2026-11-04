from django.conf import settings
from django.db import models


class Product(models.Model):
    TYPES = [
        ("tanktops", "Tank tops"),
        ("eyewear", "Eyewear"),
        ("jackets", "Jackets"),
        ("sneakers", "Sneakers"),
        ("jeans", "Jeans"),
    ]

    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    type = models.CharField(max_length=20, choices=TYPES)
    for_women = models.BooleanField(default=False)
    for_men = models.BooleanField(default=False)
    image = models.CharField(max_length=300, help_text="Path in the public folder, for example /Tank.jpeg")
    sale = models.BooleanField(default=False)
    featured = models.BooleanField(default=False)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class CartItem(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="cart_items")
    product_id = models.IntegerField()
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    image = models.CharField(max_length=300, blank=True)
    qty = models.PositiveIntegerField(default=1)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["user", "product_id"], name="unique_cart_product")
        ]

    def __str__(self):
        return f"{self.user} - {self.name} x{self.qty}"


class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="orders")
    total = models.DecimalField(max_digits=10, decimal_places=2)
    payment = models.CharField(max_length=50)
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    address = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Order #{self.id} - {self.user}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product_id = models.IntegerField()
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    image = models.CharField(max_length=300, blank=True)
    qty = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.name} x{self.qty}"
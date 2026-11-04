from django.core.management.base import BaseCommand
from django.core.management.color import no_style
from django.db import connection

from shop.models import Product

# id, name, price, type, for women, for men, image, sale, featured
PRODUCTS = [
    (1, "Classic White Tank", 19, "tanktops", True, False, "/TankWhite.jpeg", False, False),
    (2, "Ribbed Crop Tank", 22, "tanktops", True, False, "/TankCrop.jpeg", False, False),
    (3, "Summer Print Tank", 25, "tanktops", True, False, "/Tank.jpeg", True, True),
    (4, "Gym Tank Top", 21, "tanktops", False, True, "/TankGym.jpeg", False, False),
    (5, "Basic Black Tank", 18, "tanktops", False, True, "/TankBlack.jpeg", False, False),
    (6, "Aviator Sunglasses", 35, "eyewear", True, True, "/Eyewear.jpeg", False, True),
    (7, "Round Retro Sunglasses", 29, "eyewear", True, False, "/EyewearRound.jpeg", False, False),
    (8, "Sport Shades", 39, "eyewear", False, True, "/EyewearSport.jpeg", False, False),
    (9, "Cat-Eye Sunglasses", 33, "eyewear", True, False, "/EyewearCateye.jpeg", True, False),
    (10, "Classic Wayfarer", 31, "eyewear", True, True, "/EyewearWayfarer.jpeg", False, False),
    (11, "Denim Jacket", 79, "jackets", True, True, "/Jacket.jpeg", False, True),
    (12, "Leather Biker Jacket", 129, "jackets", False, True, "/JacketLeather.jpeg", False, False),
    (13, "Bomber Jacket", 89, "jackets", False, True, "/JacketBomber.jpeg", False, False),
    (14, "Light Windbreaker", 59, "jackets", True, True, "/JacketWind.jpeg", False, False),
    (15, "Cropped Jacket", 69, "jackets", True, False, "/JacketCropped.jpeg", True, False),
    (16, "Green Sneakers", 59, "sneakers", True, True, "/Greensneaker.jpeg", True, True),
    (17, "Blue Sneakers", 64, "sneakers", True, True, "/Bluesneaker.jpeg", False, False),
    (18, "Street Runner", 72, "sneakers", False, True, "/SneakerRunner.jpeg", False, False),
    (19, "Everyday Trainers", 55, "sneakers", True, False, "/SneakerWhite.jpeg", False, False),
    (20, "Black Jeans", 45, "jeans", False, True, "/Black.jpeg", False, False),
    (21, "Blue Jeans", 49, "jeans", True, False, "/Bluejeans.jpeg", False, True),
    (22, "Grey Jeans", 52, "jeans", True, False, "/Greyjeans.jpeg", False, False),
    (23, "Slim Fit Jeans", 54, "jeans", False, True, "/JeansSlim.jpeg", False, False),
    (24, "Straight Jeans", 47, "jeans", True, True, "/JeansStraight.jpeg", False, False),
]


class Command(BaseCommand):
    help = "Load the shop products. Run it once; running it again resets them to these values."

    def handle(self, *args, **options):
        for pid, name, price, ptype, women, men, image, sale, featured in PRODUCTS:
            Product.objects.update_or_create(
                id=pid,
                defaults={
                    "name": name,
                    "price": price,
                    "type": ptype,
                    "for_women": women,
                    "for_men": men,
                    "image": image,
                    "sale": sale,
                    "featured": featured,
                    "active": True,
                },
            )
        # Keep the id counter in step, so products added later in the admin get new ids
        with connection.cursor() as cursor:
            for sql in connection.ops.sequence_reset_sql(no_style(), [Product]):
                cursor.execute(sql)
        self.stdout.write(self.style.SUCCESS(f"{len(PRODUCTS)} products loaded"))

from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.db.models import Q
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="first_name")
    role = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["name", "email", "role"]

    def get_role(self, obj):
        if obj.is_superuser:
            return "admin"
        return "customer"


class RegisterSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate_email(self, value):
        value = value.strip().lower()

        if User.objects.filter(
            Q(username__iexact=value) | Q(email__iexact=value)
        ).exists():
            raise serializers.ValidationError(
                "This email is already registered. Please log in."
            )

        return value

    def validate_password(self, value):
        validate_password(value)
        return value

    def create(self, data):
        return User.objects.create_user(
            username=data["email"],
            email=data["email"],
            password=data["password"],
            first_name=data["name"],
        )


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(
            username=data["email"].strip().lower(),
            password=data["password"]
        )

        if user is None:
            raise serializers.ValidationError(
                "Wrong email or password."
            )

        data["user"] = user
        return data

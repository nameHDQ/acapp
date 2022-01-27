from django.contrib import admin
from django.urls import path
from game.views import hello

urlpatterns = [
    path("", hello, name="hello")
]
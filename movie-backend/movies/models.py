from django.db import models
from django.contrib.auth.models import User


class Genre(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Movie(models.Model):
    title = models.CharField(max_length=255)
    year = models.IntegerField()
    rating = models.FloatField()
    description = models.TextField()
    poster = models.URLField()
    genres = models.ManyToManyField(Genre, related_name="movies")

    def __str__(self):
        return self.title


class WatchlistItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="watchlist")
    title = models.CharField(max_length=200)
    watched = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.title} ({'watched' if self.watched else 'not watched'})"

from django.db import models
from django.contrib.auth.models import User
from movies.models import Genre


class Profile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='profile'
    )

    avatar = models.URLField(
        blank=True,
        null=True
    )

    bio = models.TextField(
        blank=True
    )

    favorite_genres = models.ManyToManyField(
        Genre,
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.user.username

from rest_framework import serializers
from .models import Movie, Genre, WatchlistItem  # добавили WatchlistItem

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'

class MovieSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True) 

    class Meta:
        model = Movie
        fields = '__all__'

class WatchlistItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = WatchlistItem
        fields = ['id', 'title', 'watched']

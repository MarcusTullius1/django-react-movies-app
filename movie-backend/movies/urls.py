from django.urls import path
from .views import (
    MovieList,
    GenreList,
    WatchlistItemListCreateView,
    WatchlistItemDetailView
)

urlpatterns = [
    path('movies/', MovieList.as_view(), name='movie-list'),
    path('genres/', GenreList.as_view(), name='genre-list'),
    path('watchlist/', WatchlistItemListCreateView.as_view(), name='watchlist-list-create'),
    path('watchlist/<int:pk>/', WatchlistItemDetailView.as_view(), name='watchlist-detail'),
]

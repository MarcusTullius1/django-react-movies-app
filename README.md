# Django-React Movies App 🎬

A full-stack learning project using **Django** and **React** to manage movies, user profiles, and watchlists.  
This project integrates **internal and external APIs**, allowing users to interact with movie data and their personal profile.

---

## Technologies 🛠️

- **Backend:** Django, Django REST Framework  
- **Frontend:** React, CSS  
- **Authentication:** JWT Tokens  
- **APIs:** 
  - **External API:** Fetch movies and details from external sources  
  - **Internal API:** Backend endpoints for watchlist, friends, and activity  
  - **Profile API:** Dedicated endpoints for user profile management  

---

## Features ✨

- User registration and login with JWT  
- Browse movies from **external API**  
- Add, edit, or remove movies from **watchlist (internal API)**  
- User profile management via **profile API**  
- Friends list and recent activity feed  
- Interactive React interface, responsive design  

---

## Installation and Run 🚀

### Backend (Django)
```bash
cd movie-backend
venv\Scripts\activate      # Windows
# source venv/bin/activate # Linux / Mac
pip install -r requirements.txt
python manage.py runserver

#cd movie-frontend
npm install
npm start

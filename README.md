# Menu Digital

Menu digital desarrollado con:

- Frontend: React (Vite)
- Backend: Python Flask + SQLite

## 📦 Estructura

- `/frontend`: código React que consume la API
- `/backend`: servidor Flask que entrega proyectos desde SQLite

## 🚀 Cómo ejecutar

### Frontend
```bash
cd frontend
npm install
npm i react-router-dom
npm run dev
```
---

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python init_db.py  
python app.py
```
---
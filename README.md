# E-Commerce Full-Stack Application

A full-stack e-commerce web application built using **React.js, Django REST Framework, and PostgreSQL**. The application supports customer shopping, admin product management, authentication, and order management with Role-Based Access Control (RBAC).

## Live Demo

- **Frontend:** https://ecommerce-fullstack-project-phi.vercel.app
- **Backend:** https://ecommerce-backend-4zzc.onrender.com
- **GitHub:** https://github.com/varshaka234/ecommerce-fullstack-project

## Technologies Used

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3

### Backend
- Python
- Django
- Django REST Framework
- Django ORM
- REST APIs

### Database
- PostgreSQL
- Neon PostgreSQL

### Testing & Deployment
- Playwright
- Git & GitHub
- Vercel
- Render

## Features

### Customer Features
- User registration and login
- Browse and filter products
- Add products to shopping cart
- Manage shopping cart
- Checkout and place orders
- View order history

### Admin Features
- Admin authentication
- Role-Based Access Control (RBAC)
- Add new products
- Edit and delete products
- Search and manage products
- View customer orders
- Manage order status

## Project Architecture

The application follows a full-stack architecture:

- **React.js:** Handles the user interface and frontend interactions.
- **Django REST Framework:** Provides REST APIs and backend business logic.
- **Django ORM:** Handles database operations.
- **PostgreSQL:** Stores users, products, cart items, and orders.

## Local Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/varshaka234/ecommerce-fullstack-project.git
cd ecommerce-fullstack-project
```

### 2. Backend Setup

Open the Backend folder:

```bash
cd Backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Configure your environment variables in a `.env` file. Add your Django secret key and PostgreSQL database configuration. Never commit real credentials.

Run database migrations:

```bash
python manage.py migrate
```

Start the Django development server:

```bash
python manage.py runserver
```

Backend runs at:

`http://127.0.0.1:8000/`

### 3. Frontend Setup

Open a new terminal and navigate to the Frontend folder:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend runs at:

`http://localhost:5173/`

Make sure the frontend API configuration points to your local Django backend when running locally.

## Testing

End-to-end testing is performed using Playwright.

Install Playwright browsers:

```bash
npx playwright install chromium
```

Run the tests:

```bash
npx playwright test
```

## Deployment

| Component | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| Database | Neon PostgreSQL |

## Key Learning Outcomes

- Full-stack application development
- REST API development and integration
- Database design and Django ORM
- Authentication and Role-Based Access Control
- React component-based development
- End-to-end testing with Playwright
- Application deployment and Git version control

---

**Developed as a full-stack development portfolio project.**

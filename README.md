# E-Commerce Full-Stack Web Application

A full-stack e-commerce web application developed using **React.js, Django REST Framework, and PostgreSQL**. The application allows users to browse products, register and log in, manage their shopping cart, and place orders.

## Features

- **User Authentication:** User registration, login, and logout.
- **Product Listing:** Browse products across different categories.
- **Product Filtering:** Filter products by category and gender.
- **Shopping Cart:** Add products, update quantities, and remove items.
- **Cart Persistence:** Store cart information in PostgreSQL.
- **Checkout:** Review cart items and proceed through the checkout process.
- **Order Management:** Store and manage customer orders.
- **Admin Panel:** Manage application data through Django Admin.

## Technologies Used

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- Vite

### Backend
- Python
- Django
- Django REST Framework
- REST APIs
- Token Authentication

### Database
- PostgreSQL

### Tools
- Visual Studio Code
- Git
- GitHub
- Postman

## Project Structure

```text
ecommerce-fullstack-project/
│
├── Frontend/
│   ├── public/
│   └── src/
│       ├── Components/
│       ├── data.js
│       ├── api.js
│       ├── App.jsx
│       └── main.jsx
│
├── Backend/
│   ├── accounts/
│   ├── shop/
│   ├── config/
│   ├── manage.py
│   └── requirements.txt
│
└── README.md
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/varshaka234/ecommerce-fullstack-project.git
```

```bash
cd ecommerce-fullstack-project
```

### 2. Backend Setup

Open a terminal and navigate to the Backend folder:

```bash
cd Backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment on Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Configure your PostgreSQL database credentials in the Django environment settings.

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

Open another terminal and navigate to the Frontend folder:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal (usually `http://localhost:5173/`).

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/register/` | Register a new user |
| POST | `/api/login/` | User login |
| POST | `/api/logout/` | User logout |
| GET | `/api/me/` | Get logged-in user details |
| GET | `/api/cart/` | Retrieve cart items |
| POST | `/api/cart/` | Add an item to the cart |

## Database

PostgreSQL is used to store application data, including user accounts, products, cart items, and orders.

## Future Improvements

- Payment gateway integration
- Product search functionality
- Order tracking
- User profile management
- Product reviews and ratings

## Author

**Varsha K A**

GitHub: [varshaka234](https://github.com/varshaka234)

---

*This project was developed as a hands-on full-stack web development project to practice frontend development, backend API development, database management, and application integration.*

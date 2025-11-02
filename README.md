# E-commerce Application

A full-stack e-commerce application built with React.js frontend and ASP.NET Core backend.

## Project Structure

- `src/` - React frontend application
  - `Components/` - React components including Navbar, ProductForm, and ProductList
  - `API/` - API integration layer
  - `styles/` - Component-specific CSS files
- `ecommerce_backend/` - ASP.NET Core backend
  - `Controllers/` - API endpoints for product management
  - `Models/` - Data models and DTOs
  - `AppDbContext.cs` - Entity Framework database context

## Features

- Product management (Create, Read, Update, Delete)
- Responsive user interface
- RESTful API backend
- Database persistence using Entity Framework Core

## Getting Started

### Prerequisites

- Node.js and npm for the frontend
- .NET 8.0 SDK for the backend
- A SQL Server instance for the database

### Running the Frontend

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

The frontend will be available at [http://localhost:3000](http://localhost:3000).

### Running the Backend

1. Navigate to the backend directory:
   ```bash
   cd ecommerce_backend
   ```

2. Run the application:
   ```bash
   dotnet run
   ```

The API will be available at [http://localhost:5207](http://localhost:5000).

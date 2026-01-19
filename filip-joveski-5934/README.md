# Movie Client 2025

Angular template for the Internet Programming Exam.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Get your API key from the instructor

3. Start the development server:

```bash
npm start
```

The application will run on `http://localhost:4200/`

## API Configuration

This template is pre-configured to work with the Movie Database API.

**API Base URL:** `https://ip-exam-g12.onrender.com`

You will need to:

1. Create an HTTP interceptor to add your API key to all requests
2. Configure services to communicate with the API
3. Handle authentication and error responses

## Project Structure

- `src/app/` - Main application code
- `src/app/app.routes.ts` - Routing configuration (empty, ready for you to add routes)
- `src/app/app.config.ts` - Application configuration with HttpClient already provided

## Available API Endpoints

- `GET /movies` - Get all movies
- `GET /movies/:id` - Get movie by ID  
- `POST /movies` - Create new movie
- `PUT /movies/:id` - Update movie
- `DELETE /movies/:id` - Delete movie
- `GET /genres` - Get all genres
- `GET /actors` - Get all actors
- `GET /actors/:id` - Get actor by ID
- `GET /actors?name=<name>` - Search actor by name
- `GET /whoami` - Get current user info

All endpoints require `x-api-key` header with your API key.

## Development

Generate components, services, etc. using Angular CLI:

```bash
ng generate component components/movie-list
ng generate service services/movie
ng generate interceptor interceptors/api-key
```

## Build

To build the project for production:

```bash
npm run build
```

Build artifacts will be stored in the `dist/` directory.

## Good Luck! 🎬

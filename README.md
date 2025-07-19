# Rails API + React Todo Application

A full stack todo application built with Ruby on Rails API backend and React frontend.

## Features

- ✅ Create, read, update, and delete todos
- 🎨 Modern, responsive UI with beautiful gradients
- 📱 Mobile-friendly design
- ⚡ Real-time updates
- 🗄️ SQLite database for data persistence
- 🔄 Inline editing with double-click
- 🎯 Checkbox toggles for completion status

## Tech Stack

### Backend (Rails API)
- Ruby on Rails 8.0
- SQLite database
- RESTful API endpoints
- JSON responses

### Frontend (React)
- React 18
- Axios for API calls
- Modern CSS with gradients and animations
- Responsive design

## Project Structure

```
├── backend/                 # Rails API
│   ├── app/
│   │   ├── controllers/    # API controllers
│   │   └── models/        # ActiveRecord models
│   ├── db/                # Database migrations
│   └── config/            # Rails configuration
├── frontend/               # React app
│   ├── src/
│   │   ├── App.js         # Main component
│   │   └── App.css        # Styling
│   └── public/            # Static files
└── README.md              # This file
```

## Getting Started

### Prerequisites
- Ruby (v3.0 or higher)
- Rails (v7.0 or higher)
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup (Rails API)

1. Navigate to the backend directory
```bash
cd backend
```

2. Install Ruby dependencies
```bash
bundle install
```

3. Set up the database
```bash
rails db:migrate
```

4. Start the Rails server
```bash
rails server -p 3000
```

The Rails API will be available at: http://localhost:3000

### Frontend Setup (React)

1. Navigate to the frontend directory
```bash
cd frontend
```

2. Install Node.js dependencies
```bash
npm install
```

3. Start the React development server
```bash
npm start -- --port 3001
```

The React app will be available at: http://localhost:3001

## API Endpoints

### Todos
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## Usage

1. **Add a Todo**: Type in the input field and click "Add Todo" or press Enter
2. **Complete a Todo**: Click the checkbox to mark as complete/incomplete
3. **Edit a Todo**: Double-click on the todo title to edit inline
4. **Delete a Todo**: Click the "Delete" button to remove a todo

## Development

- Backend runs on port 3000
- Frontend runs on port 3001
- Frontend makes API calls to the Rails backend
- Hot reloading enabled for both frontend and backend

## Database Schema

The application uses a simple todos table with:
- `id` (primary key)
- `title` (string)
- `completed` (boolean)
- `created_at` (timestamp)
- `updated_at` (timestamp)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License 
import React, { useState, useEffect } from 'react';
import { todoApi } from '../services/api';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const data = await todoApi.getTodos();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const todo = await todoApi.createTodo(newTodo.trim());
      setTodos([todo, ...todos]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      const updatedTodo = await todoApi.updateTodo(id, { completed: !completed });
      setTodos(todos.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await todoApi.deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getFilteredTodos = () => {
    let filtered = todos;
    
    // Filter by status
    if (filter === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    } else if (filter === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(todo => 
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const getStats = () => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const active = total - completed;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return { total, completed, active, percentage };
  };

  const stats = getStats();
  const filteredTodos = getFilteredTodos();

  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      
      {/* Stats Section */}
      <div className="stats-section">
        <button 
          onClick={() => setShowStats(!showStats)}
          className="stats-toggle"
        >
          {showStats ? 'Hide' : 'Show'} Statistics
        </button>
        
        {showStats && (
          <div className="stats-grid">
            <div className="stat-card">
              <h3>{stats.total}</h3>
              <p>Total</p>
            </div>
            <div className="stat-card">
              <h3>{stats.active}</h3>
              <p>Active</p>
            </div>
            <div className="stat-card">
              <h3>{stats.completed}</h3>
              <p>Completed</p>
            </div>
            <div className="stat-card">
              <h3>{stats.percentage}%</h3>
              <p>Done</p>
            </div>
          </div>
        )}
      </div>

      {/* Search and Filter */}
      <div className="controls-section">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search todos..."
          className="search-input"
        />
        
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      
      {/* Add Todo Form */}
      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          className="todo-input"
        />
        <button type="submit" className="add-button">
          Add Todo
        </button>
      </form>

      {/* Todo List */}
      <div className="todo-list">
        {filteredTodos.length === 0 ? (
          <div className="empty-state">
            <p>No todos found</p>
            <small>Try adjusting your search or filter</small>
          </div>
        ) : (
          filteredTodos.map(todo => (
            <div key={todo.id} className="todo-item">
              <div className="todo-main">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id, todo.completed)}
                  className="todo-checkbox"
                />
                <div className="todo-content">
                  <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                    {todo.title}
                  </span>
                  <span className="todo-timestamp">
                    {formatDate(todo.created_at)}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => deleteTodo(todo.id)}
                className="delete-button"
                title="Delete todo"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TodoList; 
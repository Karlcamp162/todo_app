import axios from 'axios';

const API_URL = '/api/todos';

export const todoApi = {
  // Get all todos
  getTodos: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  // Create a new todo
  createTodo: async (title) => {
    const response = await axios.post(API_URL, {
      todo: { title, completed: false }
    });
    return response.data;
  },

  // Update a todo
  updateTodo: async (id, updates) => {
    const response = await axios.put(`${API_URL}/${id}`, {
      todo: updates
    });
    return response.data;
  },

  // Delete a todo
  deleteTodo: async (id) => {
    await axios.delete(`${API_URL}/${id}`);
  }
}; 
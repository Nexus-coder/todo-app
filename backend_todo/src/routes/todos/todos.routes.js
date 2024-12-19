const express = require('express');
const router = express.Router();
const {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
  searchTodos
} = require('./todos.controllers'); // Make sure the path is correct for your controller file

// Route to get all todos
router.get('/', getTodos);

// Route to create a new todo
router.post('/', createTodo);

// Route to get a single todo by ID
router.get('/:id', getTodoById);

// Route to update a todo by ID
router.put('/:id', updateTodo);

// Route to delete a todo by ID
router.delete('/:id', deleteTodo);

// Route to search todos by title or description
router.get('/search', searchTodos);

module.exports = router;

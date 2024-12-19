//@ts-nocheck
import { create } from 'zustand'

const useTodoStore = create((set) => ({
    todos: [],
    // Fetch todos from the backend
    fetchTodos: async () => {
        try {
            const response = await fetch('https://localhost:3000/todos'); // Adjust the endpoint accordingly
            const todos = await response.json();
            set({ todos });
        } catch (error) {
            console.error('Failed to fetch todos:', error);
        }
    },
    // Add a new todo
    addTodo: async (description, title) => {
        try {

            const response = await fetch('https://localhost:3000/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ description, title }),
            });

            const newTodo = await response.json();
            set((state) => ({
                todos: [...state.todos, newTodo],
            }));

        } catch (error) {
            console.error('Failed to add todo:', error);
        }
    },
    editTodo: async (description, title, id) => {
        console.log("Editing", description, title, id)
        try {
            const response = await fetch(`https://localhost:3000/todos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ description, title }),
            });
            const updatedTodo = await response.json();
            set((state) => ({
                todos: state.todos.map((todo) =>
                    todo._id === id ? { ...todo, description: updatedTodo.description, title: updatedTodo.title } : todo
                )
            }));
        } catch (error) {
            console.error('Failed to update todo:', error);
        }
    },
    // Remove a todo by id
    removeTodo: async (id) => {
        try {
            await fetch(`https://localhost:3000/todos/${id}`, {
                method: 'DELETE',
            });
            set((state) => ({
                todos: state.todos.filter((todo) => todo._id !== id),
            }));
        } catch (error) {
            console.error('Failed to remove todo:', error);
        }
    },
    // Toggle the completion status of a todo by id
    toggleTodo: (id: number) => set((state) => ({
        todos: state.todos.map((todo) =>
            todo._id === id ? { ...todo, completed: !todo.completed } : todo
        ),
    })),
}))

export default useTodoStore
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import TodoList from "@/components/todos/todo-list";
import Login from "./components/auth/login";

// Create a new QueryClient
const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<TodoList />} />
                    <Route path="/login" element={<Login/>} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;

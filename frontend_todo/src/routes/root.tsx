//@ts-nocheck

import TodoList from "@/components/todos/todo-list";

import {
    QueryClient,
    QueryClientProvider
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Root() {
    return (
        <QueryClientProvider client={queryClient}>
            <TodoList />
        </QueryClientProvider>
    )
}
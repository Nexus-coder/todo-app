//@ts-nocheck

import TodoList from "@/components/task-list";
import useTodoStore from "@/zustand/store";

import { useEffect } from "react";


export default function Root() {
    const { fetchTodos } = useTodoStore();

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <TodoList />
    )
}

// eslint-disable-next-line react-hooks/rules-of-hooks
// const getTodos = useTodoStore((state) => state.fetchTodos);

export async function loader() {
    const contacts = await todos.fetchTodos();
    return { contacts };
}
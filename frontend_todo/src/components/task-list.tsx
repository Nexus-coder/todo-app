//@ts-nocheck
import { useState, useMemo } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import useTodoStore from '@/zustand/store'

import AddTodoModal from './todo-modal'
import Task from './task'
import Paging from './pagination'

type Task = {
    id: number
    text: string
    completed: boolean
}

const ITEMS_PER_PAGE = 5

export default function TodoList() {

    const todos = useTodoStore((state) => state.todos)
    const addTodo = useTodoStore((state) => state.addTodo);
    const completed = todos.filter(todo => todo.completed).length;

    const [currentPage, setCurrentPage] = useState(1)
    const [newTask, setNewTask] = useState("")

    const paginatedTodos = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
        return todos.slice(startIndex, startIndex + ITEMS_PER_PAGE)
    }, [todos, currentPage])

    const totalPages = Math.ceil(todos.length / ITEMS_PER_PAGE)

    console.log('Zustand Todos', todos)

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4">
            <div className="max-w-2xl mx-auto">
                <header className="flex justify-center mb-8">
                    <h1 className="text-4xl font-bold">
                        <span className="text-blue-400">to</span>
                        <span className="text-purple-400">do</span>
                    </h1>
                </header>

                <div className="flex gap-2 mb-8">
                    <Input
                        type="text"
                        placeholder="Add a new todo"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        className="bg-zinc-800 border-zinc-700 text-zinc-100"
                    />
                    <Button onClick={addTodo} className="bg-blue-600 hover:bg-blue-700">
                        Search
                    </Button>
                    <AddTodoModal onAddTodo={addTodo} />
                </div>

                <div className="flex justify-between mb-4 text-sm">
                    <span className="text-blue-400">
                        Tasks remaining <span className="bg-zinc-800 px-2 py-0.5 rounded-full ml-1">{todos.length}</span>
                    </span>
                    <span className="text-purple-400">
                        Concluded <span className="bg-zinc-800 px-2 py-0.5 rounded-full ml-1">{completed} of {todos.length}</span>
                    </span>
                </div>

                <div className="space-y-2">
                    {paginatedTodos.map(todo => (
                        <Task key={todo._id} todo={todo} />
                    ))}
                </div>
            </div>
            <Paging currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
        </div>
    )
}
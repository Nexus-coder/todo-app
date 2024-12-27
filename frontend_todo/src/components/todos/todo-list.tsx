//@ts-nocheck

import { useState, useMemo, useEffect } from 'react'

import toast from 'react-hot-toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import useTodoStore from '@/context/store'
import AddTodoModal from '@/components/todos/todo-modal'
import Todo from '@/components/todos/todo'
import Paging from '@/components/pagination'

//API
import { getTodos } from '@/api/todos/get-todos'
import { createTodo } from '@/api/todos/create-todo'

const ITEMS_PER_PAGE = 5

export default function TodoList() {
    // const [currentPage, setCurrentPage] = useState(1)

    const [newTodo, setNewTodo] = useState("")

    const query = useQuery({
        queryKey: ['todos'],
        queryFn: getTodos
    })

    console.log('ReactQuery Todos', query)

    // if (query.isLoading) {
    //     return (
    //         <h1>Loading ...</h1>
    //     )

    // }
    let todos = query?.data ?? []

    const queryClient = useQueryClient()
    // const addTodo = useTodoStore((state) => state.addTodo);
    const mutationAdd = useMutation({
        mutationFn: createTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
            toast('Successfully aded a todo')
        }
    })

    const onAdd = (title: string, description: string) => {
        mutationAdd.mutate({
            title,
            description
        })
    }
    const completed = todos.filter(todo => todo.completed).length;


    // const paginatedTodos = useMemo(() => {
    //     const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    //     return todos.slice(startIndex, startIndex + ITEMS_PER_PAGE)
    // }, [todos, currentPage])

    const totalPages = Math.ceil(todos.length / ITEMS_PER_PAGE)


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
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        className="bg-zinc-800 border-zinc-700 text-zinc-100"
                    />
                    <Button className="bg-blue-600 hover:bg-blue-700">
                        Search
                    </Button>
                    <AddTodoModal onAddTodo={onAdd} />
                </div>

                <div className="flex justify-between mb-4 text-sm">
                    <span className="text-blue-400">
                        Todos remaining <span className="bg-zinc-800 px-2 py-0.5 rounded-full ml-1">{todos.length}</span>
                    </span>
                    <span className="text-purple-400">
                        Concluded <span className="bg-zinc-800 px-2 py-0.5 rounded-full ml-1">{completed} of {todos.length}</span>
                    </span>
                </div>

                <div className="space-y-2">
                    {query.data?.map(todo => (
                        <Todo key={todo._id} todo={todo} />
                    ))}
                </div>
            </div>
            {/* <Paging currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} /> */}
        </div>
    )
}
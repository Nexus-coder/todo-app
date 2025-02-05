//@ts-nocheck

import { useState } from "react"

import { Trash2, Edit2 } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import useTodoStore from "@/context/store"
import EditTodoModal from '@/components/todos/edit-todo-modal'

import { deleteTodo } from "@/api/todos/delete-todo"
import { updateTodo } from "@/api/todos/update-todo"

type Todo = {
    _id: number
    title: string
    description: string
    completed: boolean
}

export default function Todo({ todo }: { todo: Todo }) {

    const toggleTodo = useTodoStore((state) => state.toggleTodo);

    const [editingTodo, setEditingTodo] = useState<Todo | null>(null)

    const editTodo = (id: number, newText: string) => {
        setTodos(todos.map(todo =>
            todo._id === id ? { ...todo, text: newText } : task
        ))
    }
    const queryClient = useQueryClient()

    const mutationDelete = useMutation({
        mutationFn: deleteTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        }
    })

    const onDelete = () => {
        mutationDelete.mutate(todo._id)
    }

    const mutationEdit = useMutation({
        mutationFn: updateTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        }
    })
    const onEdit = (title, description) => {
        mutationEdit.mutate({
            id: todo._id,
            data: {
                title,
                description
            }

        })
    }
    return (
        <>
            <div className="border border-2 border-red-400 flex items-center gap-3 bg-zinc-800 p-4 rounded-lg">
                <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo._id)}
                    className={`${todo.completed ? 'bg-purple-600 border-purple-600' : 'border-blue-600'}`}
                />
                <div className='flex flex-col'>
                    <h1 className='font-bold'>{todo.title}</h1>
                    <span className={`flex-grow ${todo.completed ? 'line-through text-zinc-500' : 'text-zinc-100'}`}>
                        {todo.description}
                    </span>

                </div>
                <div className="">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditingTodo(todo)}
                        className="text-zinc-500 hover:text-blue-500"
                    >
                        <Edit2 className="h-4 w-4" />   
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onDelete}
                        className="text-zinc-500 hover:text-red-500"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>

            </div >
            <EditTodoModal
                isOpen={editingTodo != null}
                onClose={() => setEditingTodo(null)}
                todo={editingTodo}
                onEdit={onEdit}
            />
        </>
    )
}
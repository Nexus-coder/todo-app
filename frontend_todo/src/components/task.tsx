//@ts-nocheck
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import useTodoStore from "@/zustand/store"
import EditTodoModal from './edit-todo-modal'
import { useState } from "react"

type Todo = {
    _id: number
    title: string
    description: string
    completed: boolean
}
export default function Task({ todo }: { todo: Todo }) {
    const removeTodo = useTodoStore((state) => state.removeTodo);
    const toggleTodo = useTodoStore((state) => state.toggleTodo);

    const [editingTask, setEditingTask] = useState<Todo | null>(null)

    const editTask = (id: number, newText: string) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, text: newText } : task
        ))
    }
    async function handleClick(id) {
        await removeTodo(id)
    }
    return (
        <>
            <div className="flex items-center gap-3 bg-zinc-800 p-4 rounded-lg">
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
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditingTask(todo)}
                    className="text-zinc-500 hover:text-zinc-300"
                >
                    <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleClick(todo._id)}
                className="text-zinc-500 hover:text-zinc-300"
                >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div >
            <EditTodoModal
                isOpen={!!editingTask}
                onClose={() => setEditingTask(null)}
                todo={editingTask}
            />
        </>
    )
}
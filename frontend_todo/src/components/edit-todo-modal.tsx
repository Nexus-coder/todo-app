//@ts-nocheck
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from './ui/label'
import useTodoStore from '@/zustand/store'
type Todo = {
    _id: number
    title: string
    description: string
    completed: boolean
}

interface EditTodoModalProps {
    isOpen: boolean
    onClose: () => void
    onEdit: (id: number, newText: string) => void
    todo: Todo | null
}

export default function EditTodoModal({ isOpen, onClose, todo }: EditTodoModalProps) {
    const [editedText, setEditedText] = useState("")
    const [editedTitle, setEditedTitle] = useState("")

    const editTodo = useTodoStore((state) => state.editTodo);

    useEffect(() => {
        if (todo) {
            setEditedText(todo.description)
            setEditedTitle(todo.title)
        }
    }, [todo])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (todo && editedText.trim()) {
            await editTodo(editedText.trim(), editedTitle, todo._id)
            onClose()
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-zinc-800 text-zinc-100 border-zinc-700">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-zinc-100">Edit todo</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <Label>Title</Label>
                    <Input
                        type="text"
                        placeholder="Add the title here"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        className="bg-zinc-700 border-zinc-600 text-zinc-100 placeholder-zinc-400"
                    />
                    <Label>Todo</Label>
                    <Input
                        type="text"
                        placeholder="Add a new todo here"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        className="bg-zinc-700 border-zinc-600 text-zinc-100 placeholder-zinc-400"
                    />
                    <div className="flex justify-end space-x-2">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={onClose}
                            className="text-zinc-300 hover:text-zinc-100 hover:bg-zinc-700"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
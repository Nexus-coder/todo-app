import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PlusCircle } from "lucide-react"
import { Label } from './ui/label'

interface AddTodoModalProps {
    onAddTodo: (text: string, title: string) => void
}

export default function AddTodoModal({ onAddTodo }: AddTodoModalProps) {
    const [newTodo, setNewTodo] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [open, setOpen] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (newTodo.trim()) {
            onAddTodo(newTodo, newTitle);
            setNewTodo("")
            setOpen(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Todo
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-zinc-800 text-zinc-100 border-zinc-700">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-zinc-100">Add a new todo</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <Label>Title</Label>
                    <Input
                        type="text"
                        placeholder="Add the title here"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="bg-zinc-700 border-zinc-600 text-zinc-100 placeholder-zinc-400"
                    />
                    <Label>Todo</Label>
                    <Input
                        type="text"
                        placeholder="Add a new todo here"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        className="bg-zinc-700 border-zinc-600 text-zinc-100 placeholder-zinc-400"
                    />
                    <div className="flex justify-end space-x-2">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setOpen(false)}
                            className="text-zinc-300 hover:text-zinc-100 hover:bg-zinc-700"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={handleSubmit}
                        >
                            Add
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
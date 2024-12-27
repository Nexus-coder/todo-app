import apiCient from "@/lib/api-client";

interface DeleteTodoParams {
    id: string,
}

export const deleteTodo = async (id: DeleteTodoParams) => {

    const response = await apiCient.delete(`/todos/${id}`);

    return response.data
}
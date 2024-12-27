import apiCient from "@/lib/api-client";

interface UpdateTodoParams {
    id: string,
    data: {
        title: string,
        description: string,
    },
}

export const updateTodo = async (params: UpdateTodoParams) => {

    const response = await apiCient.put(`/todos/${params.id}`, params.data);

    return response.data
}
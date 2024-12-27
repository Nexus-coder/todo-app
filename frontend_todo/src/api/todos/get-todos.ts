import apiCient from "@/lib/api-client";

interface GetTodoParams {
    id: string,
}

export const getTodo = async (id: GetTodoParams) => {

    const response = await apiCient.get(`/todos/${id}`);

    return response.data
}

export const getTodos = async () => {

    const response = await apiCient.get(`/todos`);

    console.log('This is the data reponse', response.data)
    return response.data
}
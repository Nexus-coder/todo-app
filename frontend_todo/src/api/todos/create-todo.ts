import apiCient from "@/lib/api-client";

interface TodoParams {
    title:string,
    description:string,
}

export const createTodo = async (params:TodoParams) => {

    const response = await apiCient.post('/todos', params);

    return response.data
}

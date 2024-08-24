import { api as index } from "..";

const url = "/0739bfbafb4336d8d328647fb9586d8a/todortkq";
export const api = index.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query<TODO.GetRespone, TODO.GetRequest>({
      query: () => ({
        url: `${url}`,
        method: "GET",
      }),
      providesTags: ["todo"],
    }),
    postTodo: builder.mutation<TODO.PostRespone, TODO.PostRequest>({
      query: (data) => ({
        url: `${url}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["todo"],
    }),

    editTodo: builder.mutation<TODO.EditRespone, TODO.EditRequest>({
      query: ({ _id, data }) => ({
        url: `${url}/${_id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["todo"],
    }),

    deleteTodo: builder.mutation<TODO.DeleteRespone, TODO.DeleteRequest>({
      query: (id) => ({
        url: `${url}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  usePostTodoMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
} = api;

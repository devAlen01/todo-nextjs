"use client";

import scss from "./AddTodo.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { usePostTodoMutation } from "@/redux/api/todo";
import { useUploadFileMutation } from "@/redux/api/uploadFile";
const AddTodo = () => {
  const { register, handleSubmit, reset } = useForm<ITodo>();
  const [postTodoMutation] = usePostTodoMutation();
  const [uploadFileMutation] = useUploadFileMutation();
  const addTodo: SubmitHandler<ITodo> = async (data) => {
    const file = data.file![0];
    const formData = new FormData();
    formData.append("file", file);

    const { data: response } = await uploadFileMutation(formData);

    await postTodoMutation({
      title: data.title,
      desc: data.desc,
      image: response?.url,
    });
    reset();
  };

  return (
    <div className={scss.AddTodo}>
      <div className="container">
        <div className={scss.content}>
          <form onSubmit={handleSubmit(addTodo)}>
            <h2>Add Todo</h2>
            <input
              className={scss.input}
              type="text"
              {...register("title", { required: true })}
            />
            <input
              className={scss.input}
              type="text"
              {...register("desc", { required: true })}
            />
            <input type="file" {...register("file", { required: true })} />
            <button>ADD</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;

"use client";

import {
  useDeleteTodoMutation,
  useEditTodoMutation,
  useGetTodosQuery,
} from "@/redux/api/todo";
import scss from "./TodoList.module.scss";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const TodoList = () => {
  const { data, isLoading } = useGetTodosQuery();
  const { register, handleSubmit, setValue } = useForm<ITodo>();
  const [deleteTodoMutation] = useDeleteTodoMutation();
  const [editTodoMutation] = useEditTodoMutation();
  const [iseditId, setIsEditId] = useState<number | null>(null);

  const editTodo: SubmitHandler<ITodo> = async (data) => {
    await editTodoMutation({ _id: iseditId!, data });
    setIsEditId(null);
  };

  console.log(data, "data");

  if (isLoading) {
    return (
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "red",
          width: "700px",
          fontSize: "44px",
        }}
      >
        Loading...
      </h1>
    );
  }

  return (
    <div className={scss.TodoList}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.list}>
            {iseditId ? (
              <form onSubmit={handleSubmit(editTodo)}>
                <input
                  type="text"
                  placeholder="Edit title"
                  {...register("title", { required: true })}
                />
                <input
                  type="Edit desc"
                  {...register("desc", { required: true })}
                />

                <button>Save</button>
              </form>
            ) : (
              data?.map((item) => (
                <div className={scss.item} key={item._id}>
                  <h4>{item.title}</h4>
                  {item.image?.slice(-4, -1).includes("mpe") ? (
                    <audio src={item?.image} controls />
                  ) : (
                    <img src={item.image} alt={item.title} />
                  )}
                  <p>{item.desc}</p>
                  {item.image?.includes("mp4") ? (
                    <video src={item.image} controls>
                      {item.title}
                    </video>
                  ) : (
                    <img src={item.image} alt={item.title} />
                  )}
                  <div className={scss.action}>
                    <button
                      className={scss.btn_remove}
                      onClick={() => deleteTodoMutation(item._id!)}
                    >
                      Remove
                    </button>
                    <button
                      className={scss.btn_edit}
                      onClick={() => {
                        setIsEditId(item._id!);
                        setValue("desc", item.desc);
                        setValue("title", item.title);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;

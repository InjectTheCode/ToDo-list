import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodo,
  todoSingleInfo,
  toggleStatus,
} from "../StateManger/TodoSlice";

import TodoModal from "./modal/TodoModal";

import { MdDelete, MdEdit } from "react-icons/md";

import style from "../styles/modules/todoItem.module.scss";
import { getClass } from "../utils/getClass";

import toast from "react-hot-toast";

function TodoItem({ todo }) {
  const { todoIsEditing } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const openModalHandler = () => setOpenModal(true);
  const closeModalHandler = () => setOpenModal(false);

  const deleteHandler = () => {
    dispatch(deleteTodo(todo.id));
    toast.success("Todo Deleted ❌", {
      style: { color: "#FF0000" },
      iconTheme: {
        primary: "#FF0000",
      },
    });
  };

  const editHandler = () => {
    openModalHandler();
    dispatch(
      todoSingleInfo({
        id: todo.id,
        text: todo.text,
        status: todo.status,
      })
    );
  };

  // Checking todo's Status.
  const statusPosition = () => {
    if (todo.status === "incomplete") return "complete";
    if (todo.status === "complete") return "incomplete";
  };
  useEffect(() => {
    statusPosition();
  }, [todoIsEditing.status]);
  const toggleStatusHandler = () => {
    dispatch(
      toggleStatus({
        ...todo,
        status: statusPosition(),
      })
    );
  };

  return (
    <>
      <div className={style.item}>
        <div className={style.todoDetails}>
          <div className={style.texts} onClick={toggleStatusHandler}>
            <p
              className={getClass([
                style.todoText,
                todo.status === "complete" && style["todoText--completed"],
              ])}
            >
              {todo.text}
            </p>
            <p className={style.time}>{todo.time}</p>
          </div>
        </div>
        <div className={style.todoActions}>
          <div className={style.icon} onClick={deleteHandler}>
            <MdDelete />
          </div>
          <div className={style.icon} onClick={editHandler}>
            <MdEdit />
          </div>
        </div>
      </div>
      {openModal && (
        <TodoModal type="update" todo={todo} closeModal={closeModalHandler} />
      )}
    </>
  );
}

export default TodoItem;

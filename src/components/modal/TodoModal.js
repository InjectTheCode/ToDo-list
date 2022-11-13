import React, { useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { v4 as uuid } from "uuid";

import style from "../../styles/modules/modal.module.scss";
import { MdOutlineClose } from "react-icons/md";

import Button from "../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo } from "../../StateManger/TodoSlice";

function TodoModal({ type, closeModal, todo }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("incomplete");
  const [titleValidation, setTitleValidation] = useState(false);

  const { todoIsEditing } = useSelector((state) => state.todo);

  const dispatch = useDispatch();

  const ref = useRef();

  // make focus on input.
  useEffect(() => {
    ref.current.focus();
    if (type === "update") {
      setTitle(todoIsEditing.text);
      setStatus(todoIsEditing.status);
    }
  }, []);

  const changeHandler = (e) => {
    if (e.target.id === "title") setTitle(e.target.value);
    if (e.target.id === "status") setStatus(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    ref.current.focus();

    if (title && status) {
      if (type === "add") {
        dispatch(
          addTodo({
            id: uuid(),
            text: title,
            status: status,
            time: new Date().toLocaleString(),
          })
        );
        toast.success("Task Added Successfully");
        closeModal();
        console.log({ title, status });
      }

      if (type === "update") {
        dispatch(
          updateTodo({ ...todo, id: todo.id, text: title, status: status })
        );
        closeModal();
      }
    } else {
      setTitleValidation(true);
      setTimeout(() => {
        setTitleValidation(false);
      }, 1500);
    }

    setTitle("");
    setStatus("incomplete");
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.closeButton} onClick={closeModal}>
          <MdOutlineClose />
        </div>

        <form className={style.form} onSubmit={submitHandler}>
          <h1 className={style.formTitle}>
            {type == "add" ? "Add" : "Edit"} Task
          </h1>
          <label htmlFor="title">
            {titleValidation ? (
              <p className={style.titleValidation}>Please fill up the Title</p>
            ) : (
              "Title"
            )}
            <input
              type="text"
              id="title"
              value={title}
              onChange={changeHandler}
              ref={ref}
            />
          </label>
          <label htmlFor="Status">
            Status
            <select
              name="status"
              id="status"
              value={status}
              onChange={changeHandler}
            >
              <option value="complete">Complete</option>
              <option value="incomplete">Incomplete</option>
            </select>
          </label>
          <div className={style.buttonContainer}>
            <Button type="submit" variant="primary">
              {type == "add" ? "Add" : "Edit"} Task
            </Button>
            <Button type="button" variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TodoModal;

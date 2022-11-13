import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";

function AppContent() {
  const { todoList, selectStatus } = useSelector((state) => state.todo);
  const [todos, setTodos] = useState([]);

  const filterTodo = () => {
    if (selectStatus === "all" || selectStatus == "") {
      setTodos(todoList);
    }
    if (selectStatus === "complete") {
      const filtered = todoList.filter((todo) => todo.status === "complete");
      setTodos(filtered);
    }
    if (selectStatus === "incomplete") {
      const filtered = todoList.filter((todo) => todo.status === "incomplete");
      setTodos(filtered);
    }
  };

  useEffect(() => {
    filterTodo();
  }, [selectStatus, todoList]);

  return (
    <div>
      {todoList.length <= 0 && (
        <div>
          <h1>You have no To Do!</h1>
          <h2>Add a new To Do.</h2>
          <h2>
            Just click on your each To Do to toggle it Complete or Incomplete.
          </h2>
        </div>
      )}
      {todos.map((todo) => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </div>
  );
}

export default AppContent;

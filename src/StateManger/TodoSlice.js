// todoSlice in Toolkit is our reducer like in pure redux.
import { createSlice } from "@reduxjs/toolkit";

const getInitialTodo = () => {
  const localTodoList = localStorage.getItem("todoList");
  if (localTodoList) {
    return JSON.parse(localTodoList);
  } else {
    localStorage.setItem("todoList", JSON.stringify([]));
    return [];
  }
};

const initialValue = {
  todoList: getInitialTodo(),
  todoIsEditing: [],
  selectStatus: "",
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: initialValue,
  reducers: {
    // getting information from one Item of todo list.
    todoSingleInfo: (state, action) => {
      state.todoIsEditing = { ...action.payload };
    },

    giveStatus: (state, action) => {
      state.selectStatus = action.payload;
    },

    // Add new To Do to list.
    addTodo: (state, action) => {
      state.todoList.push(action.payload);
      const todoList = localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.push({
          ...action.payload,
        });
        localStorage.setItem("todoList", JSON.stringify(todoListArr));
      } else {
        localStorage.setItem(
          "todoList",
          JSON.stringify([{ ...action.payload }])
        );
      }
    },

    // Delete one of the chosen To Do from list.
    deleteTodo: (state, action) => {
      const deleteTodo = state.todoList.filter(
        (todoItem) => todoItem.id !== action.payload
      );
      localStorage.setItem("todoList", JSON.stringify(deleteTodo));
      state.todoList = deleteTodo;
    },

    // Editing To Do single item.
    updateTodo: (state, action) => {
      const editedList = state.todoList.map((todo) => {
        if (todo.id === action.payload.id) {
          const getCurrentTimeEdit = () => {
            if (action.payload.status === "complete")
              return `Completed at => ${new Date().toLocaleString()}`;
            if (action.payload.status === "incomplete")
              return `Change to Incomplete at => ${new Date().toLocaleString()}`;
          };

          return {
            ...todo,
            text: action.payload.text,
            status: action.payload.status,
            time: getCurrentTimeEdit(),
          };
        }
        return todo;
      });
      localStorage.setItem("todoList", JSON.stringify(editedList));
      state.todoList = editedList;
    },

    // Change status of To Do, according the Status.
    toggleStatus: (state, action) => {
      const editedList = state.todoList.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            text: action.payload.text,
            status: action.payload.status,
            time:
              action.payload.status === "complete"
                ? `Completed at => ${new Date().toLocaleString()}`
                : `Change to Incomplete at => ${new Date().toLocaleString()}`,
          };
        }
        return todo;
      });
      localStorage.setItem("todoList", JSON.stringify(editedList));
      state.todoList = editedList;
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  todoSingleInfo,
  updateTodo,
  toggleStatus,
  giveStatus,
} = todoSlice.actions;
export default todoSlice.reducer;

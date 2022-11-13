import React, { useState } from "react";
import Button, { SelectButton } from "./UI/Button";

import style from "../styles/modules/app.module.scss";
import TodoModal from "./modal/TodoModal";
import { useDispatch } from "react-redux";
import { giveStatus } from "../StateManger/TodoSlice";

function AppHeader() {
  const [openModal, setOpenModal] = useState(false);
  const [select, setSelect] = useState("");

  const dispatch = useDispatch();

  const openModalHandler = () => setOpenModal(true);
  const closeModalHandler = () => setOpenModal(false);

  const selectStatusHandler = () => {
    dispatch(giveStatus(select));
  };

  return (
    <div className={style.appHeader}>
      <Button variant="primary" onClick={openModalHandler}>
        Add Task
      </Button>
      <SelectButton
        id="status"
        onChange={(e) => setSelect(e.target.value)}
        onClick={selectStatusHandler}
      >
        <option value="all">All</option>
        <option value="complete">Complete</option>
        <option value="incomplete">Incomplete</option>
      </SelectButton>
      {openModal && <TodoModal type="add" closeModal={closeModalHandler} />}
    </div>
  );
}

export default AppHeader;

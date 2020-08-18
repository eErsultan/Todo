import React, { Fragment, useState } from "react";
import axios from "axios";

function AddTask({ item, onAddTask }) {
  const [newTasks, setNewTasks] = useState(true);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const addTask = (item, task) => {
    setLoading(true);
    axios
      .post("http://localhost:3001/tasks", {
        items2Id: item.id,
        title: task,
        complete: false,
      })
      .then(({ data }) => {
        onAddTask(item, data);
      })
      .finally(() => {
        setLoading(false);
        setInputValue("");
        setNewTasks(true);
      });
  };

  return (
    <Fragment>
      {newTasks ? (
        <div className="new-item" onClick={() => setNewTasks(false)}>
          <i>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M8 1V15"
                stroke="#B4B4B4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1 8H15"
                stroke="#B4B4B4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </i>
          <div>Новая задача</div>
        </div>
      ) : (
        <div className="add-task">
          <input
            type="text"
            placeholder="Текст задачи"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className="add-task-btn"
            onClick={() => addTask(item, inputValue)}
          >
            {loading ? "Добавление задачи..." : "Добавить задачу"}
          </button>
          <button className="close" onClick={() => setNewTasks(true)}>
            Отмена
          </button>
        </div>
      )}
    </Fragment>
  );
}

export default AddTask;

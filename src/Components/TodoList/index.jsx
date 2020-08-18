import React, { useState, useEffect } from "react";
import { Route, useHistory, useLocation } from "react-router-dom";
import axios from "axios";

import "./TodoList.css";
import ListItem from "./ListItem/ListItem";
import ListAddItem from "./ListItem/ListAddItem";
import Tasks from "./Tasks";

function TodoList() {
  const [lists, setLists] = useState(null);
  const [color, setColor] = useState(null);
  const [item, setItem] = useState();
  const [allTasks, setAllTasks] = useState();
  let history = useHistory();
  let location = useLocation();

  useEffect(() => {
    axios.get("http://localhost:3001/items2?_embed=tasks").then(({ data }) => {
      setLists(data);
    });
    axios.get("http://localhost:3001/colorIcon").then(({ data }) => {
      setColor(data);
    });
  }, []);

  const addItem = (data) => {
    const newItem = [...lists, data];
    setLists(newItem);
  };

  const removeItem = (id) => {
    const newLists = lists.filter((item) => item.id !== id);
    setItem();
    setLists(newLists);
  };

  const onAddTask = (item, data) => {
    const newLists = lists.map((i) => {
      if (item.id === i.id) {
        i.tasks = [...i.tasks, data];
      }
      return i;
    });
    setLists(newLists);
  };

  const onRemoveTask = (task) => {
    const item = lists.map((i) => {
      if (i.id === task.items2Id) {
        i.tasks = i.tasks.filter((t) => t.id !== task.id);
      }
      return i;
    });
    setLists(item);
  };

  const toggleComplete = (task) => {
    lists.map((item) => {
      if (item.id === task.items2Id) {
        item.tasks.map((t) => {
          if (t.id === task.id) {
            t.complete = !task.complete;
          }
          return t;
        });
      }
      return item;
    });
  };

  useEffect(() => {
    const listId = history.location.pathname.split("/lists/")[1];
    const list = lists && lists.find((i) => i.id === Number(listId));
    setItem(list);
  }, [lists, history.location.pathname]);

  return (
    <div className="todo">
      <div className="todo__list">
        <ListItem
          items={[
            {
              id: 1111,
              title: "Все задачи",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="12"
                  viewBox="0 0 14 12"
                  fill="none"
                >
                  <path
                    d="M10.96 5.10001H5.74001C5.24321 5.10001 5.20001 5.50231 5.20001 6.00001C5.20001 6.49771 5.24321 6.90001 5.74001 6.90001H10.96C11.4568 6.90001 11.5 6.49771 11.5 6.00001C11.5 5.50231 11.4568 5.10001 10.96 5.10001ZM12.76 9.60001H5.74001C5.24321 9.60001 5.20001 10.0023 5.20001 10.5C5.20001 10.9977 5.24321 11.4 5.74001 11.4H12.76C13.2568 11.4 13.3 10.9977 13.3 10.5C13.3 10.0023 13.2568 9.60001 12.76 9.60001ZM5.74001 2.40001H12.76C13.2568 2.40001 13.3 1.99771 13.3 1.50001C13.3 1.00231 13.2568 0.600006 12.76 0.600006H5.74001C5.24321 0.600006 5.20001 1.00231 5.20001 1.50001C5.20001 1.99771 5.24321 2.40001 5.74001 2.40001ZM2.86001 5.10001H1.24001C0.743212 5.10001 0.700012 5.50231 0.700012 6.00001C0.700012 6.49771 0.743212 6.90001 1.24001 6.90001H2.86001C3.35681 6.90001 3.40001 6.49771 3.40001 6.00001C3.40001 5.50231 3.35681 5.10001 2.86001 5.10001ZM2.86001 9.60001H1.24001C0.743212 9.60001 0.700012 10.0023 0.700012 10.5C0.700012 10.9977 0.743212 11.4 1.24001 11.4H2.86001C3.35681 11.4 3.40001 10.9977 3.40001 10.5C3.40001 10.0023 3.35681 9.60001 2.86001 9.60001ZM2.86001 0.600006H1.24001C0.743212 0.600006 0.700012 1.00231 0.700012 1.50001C0.700012 1.99771 0.743212 2.40001 1.24001 2.40001H2.86001C3.35681 2.40001 3.40001 1.99771 3.40001 1.50001C3.40001 1.00231 3.35681 0.600006 2.86001 0.600006Z"
                    fill="#7C7C7C"
                  />
                </svg>
              ),
            },
          ]}
          onClickItem={(item) => {
            history.push(`/`);
            setAllTasks(item);
            setItem();
          }}
          item={allTasks}
        />
        {lists ? (
          <ListItem
            items={lists}
            item={item}
            onRemove={removeItem}
            onClickItem={(item) => {
              history.push(`/lists/${item.id}`);
              setAllTasks();
            }}
          />
        ) : (
          "Загрузка..."
        )}
        <ListAddItem onAdd={addItem} color={color} />
      </div>
      <div className="content">
        <Route exact path="/">
          {lists &&
            lists.map((list) => (
              <Tasks
                key={list.id}
                item={list}
                onAddTask={onAddTask}
                onRemoveTask={onRemoveTask}
                toggleComplete={toggleComplete}
              />
            ))}
        </Route>
        <Route path={`/lists/:id`}>
          {item ? (
            <Tasks
              item={item}
              onAddTask={onAddTask}
              onRemoveTask={onRemoveTask}
              toggleComplete={toggleComplete}
            />
          ) : (
            <div className="no-tasks">Задачи отсутствуют</div>
          )}
        </Route>
      </div>
    </div>
  );
}

export default TodoList;

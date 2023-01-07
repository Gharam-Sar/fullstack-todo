import React from "react";
import "./App.css";
import { useState } from "react";
import trash from "./imgs/trash.png";

let toto = [];
let searchtask = [];
window.onload = (event) => {
  MyApp();
};

function ToDo({ todo, filterText, toggle }) {
  const handleDelete = async (id) => {
    console.log(id);
    try {
      let str = "/todos/" + id;
      const response = await fetch(str, {
        method: "DELETE",
        body: JSON.stringify({
          todoId: id,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.log(err.message);
    }

    window.location.reload(false);
  };

  const handleToggle = async (id) => {
    console.log(id);
    try {
      let str = "/todos/" + id;
      const response = await fetch(str, {
        method: "PUT",
        body: JSON.stringify({
          todoId: id,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.log(err.message);
    }

    window.location.reload(false);
  };
  return (
    <div className="myDiv" key={todo.id}>
      <h2>Task number: {todo.id}</h2>
      <h2>task: {todo.task}</h2>
      <h2 style={{ color: todo.done ? "green" : "red" }}>
        <pp onClick={() => handleToggle(todo.id)}>
          {" "}
          {todo.done === 1 ? "✔" : "X"}{" "}
        </pp>

        <img
          onClick={() => handleDelete(todo.id)}
          src={trash}
          style={{ height: "28px" }}
        />
      </h2>

      <hr />
    </div>
  );
}
function ToDoSpace({ displaytodo, len}) {
  const [filterText, setFilterText] = useState("");
  const [toggle, settoggle] = useState(false);

  return (
    <div>
      <SearchBar
        filterText={filterText}
        toggle={toggle}
        onFilterTextChange={setFilterText}
        ontoggleChange={settoggle}
      />

      <Tasks
        displaytodo={displaytodo}
        filterText={filterText}
        toggle={toggle}
      />
    </div>
  );
}
function Tasks({ displaytodo, filterText, toggle }) {
  if (toggle) displaytodo = [];
  const searchQuery = filterText.toLowerCase();
  searchtask = [];
  for (let j = 0; j < displaytodo.length; j++) {
    let str = displaytodo[j];
    let t = str.task;

    if (t.includes(searchQuery)) {
      console.log(t);
      searchtask.push(str);
    }
  }
  displaytodo = searchtask.slice(0);
  return (
    <div>
      <div className="tasks">
        {displaytodo.map((todo) => {
          return <ToDo todo={todo} />;
        })}
      </div>
    </div>
  );
}

function AddTask() {
  const [newtask, settask] = useState("");
  const add_task = async (event) => {
    try {
      let str = "/todos/" + newtask;
      const response = await fetch(str, {
        method: "POST",
        body: JSON.stringify({
          todo: newtask,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.log(err.message);
    }

    window.location.reload(false);
  };
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              {" "}
              <label>Task</label> &nbsp;
            </td>
            <td>
              <input
                type="text"
                id="taskName"
                name="task name"
                value={newtask}
                onChange={(e) => settask(e.target.value)}
              />
            </td>
            <td>
              &emsp;&nbsp;
              <button className="addButton" onClick={add_task}>
                {" "}
                Add{" "}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
function SearchBar({ filterText, toggle, onFilterTextChange, ontoggleChange }) {
  return (
    <div>
      <div className="componant" aria-roledescription="search">
        <input
          onChange={(e) => {
            onFilterTextChange(e.target.value);
          }}
          type="search"
          className="searchBar"
          placeholder="Search for a task"
        />
      </div>
      <label>
        <input
          type="checkbox"
          checked={toggle}
          onChange={(e) => ontoggleChange(e.target.checked)}
        />{" "}
        check to hide or display todos
      </label>
    </div>
  );
}
function Footer({ displaytodo, len }) {
  let num_todo = displaytodo.length;
  let done = 0;
  let notDone = 0;
  for (let i = 0; i < displaytodo.length; i++) {
    if (displaytodo[i].done === 1) done++;
    else notDone++;
  }
  return (
    <div style={{ color: "white", fontSize: "20px" }} className="componant">
      Number of to dos in the list= {num_todo} ---- Number of done to dos={" "}
      {done} ---- Number of to be done to dos= {notDone}
    </div>
  );
}
export default function MyApp() {
  const [todo, setTodo] = useState(0);
 
  const handleTodos = async () => {
    try {
      const response = await fetch("/todos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      toto = result;
      console.log(toto);
      setTodo(result.length);
    } catch (err) {
      console.log(err.message);
    }
  };
  handleTodos();

  return (
    <div>
      <div className="title">
        <h1>To Do List</h1>
      </div>
      <div className="componant">
        <AddTask />
      </div>
      <hr></hr>
      <div>
        <ToDoSpace displaytodo={toto} len={todo}  />
      </div>

      <hr></hr>
      <Footer displaytodo={toto} len={todo}   />
    </div>
  );
}

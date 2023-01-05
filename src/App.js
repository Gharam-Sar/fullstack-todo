import React from "react";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import trash from "./imgs/trash.png";
let todo = [];
let s = [];
let searchtask = [];
let searching = false;

if (localStorage.length === 0) {
  localStorage.setItem("ids", 0);
  localStorage.setItem("todo", JSON.stringify(s));
}



window.onload = (event) => {
  MyApp();
};

function ToDo({ todo, filterText, toggle }) {
 const handleDelete = async (id) => {
};
  const handleToggle = async (id) => {
  };
  return (
    <div className="myDiv" key={todo.id}>
      <h2>Task number: {todo.id}</h2>
      <h2>task: {todo.task}</h2>
      <h2 style={{ color: todo.done ? "green" : "red" }}>
        <pp
                        onClick={() => handleToggle( todo.id)}
        >
          {" "}
          {todo.done ? "✔" : "X"}{" "}
        </pp>

        <img
                                  onClick={() => handleDelete( todo.id)}

          src={trash}
          style={{ height: "28px" }}
        ></img>
      </h2>
      <h2></h2>
      <hr />
    </div>
  );
}
function ToDoSpace({ displaytodo }) {
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
    let str='/todos/'+newtask;
    const response = await fetch(str, {
      method: 'POST',
      body: JSON.stringify({
        todo: newtask,
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
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
        check to hide to dos
      </label>
    </div>
  );
}
function Footer() {
  let storedtodo = JSON.parse(localStorage.getItem("todo"));
  let num_todo = storedtodo.length;
  let done = 0;
  let notDone = 0;
  // for (let i = 0; i < storedtodo.length; i++) {
  //   if (storedtodo[i].done) done++;
  //   else notDone++;
  // }
  return (
    <div style={{ color: "white", fontSize: "20px" }} className="componant">
      Number of to dos in the list= {num_todo} ---- Number of done to dos={" "}
      {done} ---- Number of to be done to dos= {notDone}
    </div>
  );
}
export default function MyApp() {
         

     

     
  let storedtodo = JSON.parse(localStorage.getItem("todo"));

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
        <ToDoSpace displaytodo={storedtodo} />
      </div>


      <hr></hr>
      <Footer></Footer>
    </div>
  );
}


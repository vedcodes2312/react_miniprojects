import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
// state to store all tasks(like array)

const [tasks,setTasks] = useState([]);  // array state - handling multiple tasks 
const [newTask,setNewTask] = useState("");

// FUNCTION TO ADD NEW TASK
const addTask = () => {
  if(newTask.trim === "") return; //prevent empty task
  // trim - remove whitespaces like strip in python 
  setTasks([...tasks, {text:newTask, completed:false}]);
  setNewTask(""); // clear input
  //    ... is called spread operator - used to expand arrays/objects into elements
};

/* map()
creates a new array by applying a function to each element of the original array
used for transforming data  rendering ui lists in react  */

/* filter()
creates a new array with elements that pass a test defined in a function
used for removing unwanted items from an array based on conditions , filtering search results */

// FUNCTION TO TOGGLE COMPLETION
const toggleTask = (index) => {
  const updatedTasks = tasks.map((task,i) => 
    i === index ? {...task,completed : !task.completed} : task   );   //ternary operator inside map
    setTasks(updatedTasks);
  };

  /*The ternary operator

condition ? valueIfTrue : valueIfFalse

Here:

Condition: i === index

If true: { ...task, completed: !task.completed }

If false: task 
i === index → Checks if the current item’s index (i) matches the one you want to update.

If true → return a new object:

{ ...task, completed: !task.completed }


{ ...task } copies all properties of task.

completed: !task.completed flips the completed property (true → false, false → true).

If false → return the task unchanged. 
setTasks(tasks.map((task, i) =>
  i === index ? { ...task, completed: !task.completed } : task
));
👉 Meaning: “Go through all tasks. If it’s the one at position index, flip its completed status. Otherwise, keep it as is.”

*/

// FUNCTION TO DELETE TASK
const deleteTask = (index) => {
  const updatedTasks = tasks.filter((_,i) => i !== index); //filter out the task at the given index
  setTasks(updatedTasks);
};
//  _ IS VARIABLE WITH NO NAME SIMILAR TO PYTHON

//function to clear all tasks
const clearTask = () => setTasks([]);
// css with bootstrap classes
return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">📝 To-Do List</h1>

      {/* Input + Add Button */}
      <div className="d-flex mb-3">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Enter a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="btn btn-success" onClick={addTask}>
          ➕ Add
        </button>
      </div>

      {/* Task List */}
      {tasks.length === 0 ? (
        <p className="text-muted text-center">No tasks yet! 🎉</p>
      ) : (
        <ul className="list-group">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {/* Task Text */}
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
                onClick={() => toggleTask(index)}
              >
                {task.text}
              </span>

 {/* Delete Button */}
              <button
                className="btn btn-danger btn-sm"
               onClick={() => deleteTask(index)}
            >
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Clear All Button */}
      {tasks.length > 0 && (
        <div className="text-center mt-3">
          <button className="btn btn-warning" onClick={clearTask}>
            🔄 Clear All
          </button>
        </div>
      )}
    </div>
  );
}

  export default App;

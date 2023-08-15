import React, { useState , useEffect } from "react";
import "./App.css";

const TodoList = () => {

  // Define state variables using the useState hook
  const [tasks, setTasks] = useState([]); // stores an array of tasks
  const [inputValue, setInputValue] = useState(""); // stores the value of the input field
  const [currentTime, setCurrentTime] = useState(new Date());

  // Handler for changes to the input field
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Handler for adding a new task
  const handleAddTask = () => {
    // Ensure input is not empty before adding new task
    if (inputValue !== "") {
      setTasks([...tasks, { text: inputValue, isCompleted: false }]);
      setInputValue(""); // Reset the input field value
    }
  };

  // Handler for deleting a task
  const handleDeleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1); // Remove task at specified index
    setTasks(newTasks);
  };

  // Handler for toggling a task's completion status
  const handleCheckboxToggle = (index) => {
    const newTasks = [...tasks];
    newTasks[index].isCompleted = !newTasks[index].isCompleted; // Toggle completion status of task at specified index
    setTasks(newTasks);
  };

  // Update the current time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Format the current time as a string in GMT
  const formattedTime = currentTime.toISOString().split("T")[0] + " " + currentTime.toISOString().split("T")[1].split(".")[0] + " GMT";

  // Render the component
  return (
    <div className="todo-list-container">
      <h1>My To-Do List</h1>
      <div className="add-task-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Add a task..."
        />
        <button onClick={handleAddTask}>Add</button>
      </div>
      <ul className="task-list">
        {/* Map through the tasks array to display each task */}
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={() => handleCheckboxToggle(index)} // Call the handler to toggle the task's completion status
            />
            {/* Apply CSS class 'completed' if task is marked as complete */}
            <span className={task.isCompleted ? "task-text completed" : "task-text"}>
              {task.text}
            </span>
            <button
              className="delete-button"
              onClick={() => handleDeleteTask(index)} // Call the handler to delete the task
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

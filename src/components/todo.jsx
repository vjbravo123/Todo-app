import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faTrashAlt, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../state/index";
import "../css/todo.css";

const TodoApp = () => {
  const dispatch = useDispatch();
  const { setTodos } = actionCreators;

  // Get values from Redux state
  const todos = useSelector(state => state.todos);
  const mode = useSelector(state => state.mode); // Retrieve mode from state

  // Local state variables for managing input values with different names
  const [customTitle, setCustomTitle] = useState('');
  const [customText, setCustomText] = useState('');

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos && storedTodos.length > 0) {
      dispatch(setTodos(storedTodos));
    }
  }, [dispatch, setTodos]);

  const handleAddTodo = () => {
    if (!customTitle.trim() || !customText.trim()) return;
  
    const newTodoItem = {
      id: Date.now(),
      title: customTitle,
      text: customText,
      completed: false,
    };

    // Create a new array with the new todo at the beginning
    const updatedTodos = [newTodoItem, ...todos];
  
    // Dispatch action object with updated todos as payload
    dispatch(setTodos(updatedTodos));
  
    // Reset local state variables
    setCustomTitle('');
    setCustomText('');
  };

  const handleDeleteTodo = (id) => {
    // Filter out the todo with the specified id
    const updatedTodos = todos.filter(todo => todo.id !== id);
    
    // Dispatch the action to set todos with the updated array
    dispatch(setTodos(updatedTodos));
  };

  const handleCompleteTodo = (id) => {
    // Map over todos and toggle completed status for the todo with the specified id
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    
    // Reorder the array so that completed tasks appear after new tasks
    const reorderedTodos = [
      ...updatedTodos.filter(todo => !todo.completed),
      ...updatedTodos.filter(todo => todo.completed)
    ];
    
    // Dispatch the action to set todos with the updated array
    dispatch(setTodos(reorderedTodos));
  };

  useEffect(() => {
    console.log(mode);
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className={`container ${mode === 'dark' ? 'dark-mode' : ''}`}>
      <h1><FontAwesomeIcon icon={faTasks} /> To-Do List</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="Title"
          value={customTitle}
          onChange={(e) => setCustomTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
        />
        <button className="add-btn" onClick={handleAddTodo}>
          <FontAwesomeIcon icon={faPlus} /> Add
        </button>
      </div>
      {Array.isArray(todos) && todos.length > 0 ? (
        <div className="todo-list">
          <ul>
            {todos.map((todo) => (
              <li key={todo.id} className={todo.completed ? "todo-item completed" : "todo-item"}>
                <div className="todo-details">
                  <h3>{todo.title}</h3>
                  <p>{todo.text}</p>
                </div>
                <div className="todo-actions">
                  {!todo.completed && (
                    <button className="complete-btn" onClick={() => handleCompleteTodo(todo.id)}>
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                  )}
                  <button className="delete-btn" onClick={() => handleDeleteTodo(todo.id)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No todos found.</p>
      )}
    </div>
  );
};

export default TodoApp;

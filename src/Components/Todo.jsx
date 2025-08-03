import { useState, useEffect, useRef } from "react";
import Items from "./Items";
import { ToastContainer, toast } from 'react-toastify';
const Todo = () => {

  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const isFirstRender = useRef(true);

  const submitTodo = (e) => {
    e.preventDefault();

    if (input.trim() === "") {
      toast.warning('input can`t be empty ');
      // alert('input can`t be empty ');
      return;
    }
    if (isEditing) {
      const updateTodos = todos.map(todo =>
        todo.id === currentTodo ? { ...todo, data: input } : todo
      );

      setTodos(updateTodos);
      setIsEditing(false);
      setCurrentTodo(null);
      toast.success('Todo Updated Successfully!');
    } else {

      // create Todo ..
      const newTodo = {
        id: Date.now(),
        data: input
      }
      setTodos([...todos, newTodo]);
      toast.success('Todo Created Successfully🤩');
    }
    setInput('');
  }

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) setTodos(savedTodos)
  }, [])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem("todos", JSON.stringify(todos));

  }, [todos]);

  const startEdit = (id, data) => {
    setIsEditing(true);
    setInput(data);
    setCurrentTodo(id);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
    toast.success('Todo Deleted Successfully');

  }
  const deleteAll = () => {
    if (todos.length === 0) {
      toast.info('No todos to delete!');
      return;
    }
    setTodos([]); // clear all todos
    toast.error('All Todos Deleted');


  }
  return (
    <>
      <div className="div">
        <ToastContainer position='top-right' autoClose={1000} />
        <div className="app-container">
          <h1>Todo App</h1>
          <form className="input-container" onSubmit={submitTodo}>
            <input type="text"
              placeholder='Add A New Todo...'
              value={input}
              onChange={e => setInput(e.target.value)} />
            <button type='submit'>Add</button>
          </form>
          <ul className="items">
            {todos.map((todo) =>
              <Items key={todo.id} data={
                todo.data}
                id={todo.id}
                deleteTodo={deleteTodo}
                startEdit={startEdit}
              />
            )}
          </ul>
          {todos.length ?
            <button className="delAll-btn" onClick={deleteAll}>Delete All</button>
            : <h2>Todo Not Found</h2>
          }
        </div>
      </div>
    </>
  )
}
export default Todo;

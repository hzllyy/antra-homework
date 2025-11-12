import './App.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, createTodo, deleteTodo, editTodo } from './slices/todoSlice';
import Input from './_components/input.jsx';
import Buttons from './_components/buttons.jsx';
import Throttle from "./throttle.jsx";

function Lists() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todo.data);
  const isLoading = useSelector(state => state.todo.isLoading);

  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = (title) => {
    dispatch(createTodo(title));
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const startEdit = (id, currentTitle) => {
    setEditId(id);
    setEditValue(currentTitle);
  };

  const saveEdit = (id) => {
    dispatch(editTodo({ id, updatedTodo: { todo: editValue } }));
    setEditId(null);
    setEditValue("");
  };

  const toggleComplete = (id, completed) => {
    dispatch(editTodo({ id, updatedTodo: { completed: !completed } }));
  };

  const incompleteTodos = todos.filter(todo => !todo.completed);
  const completeTodos = todos.filter(todo => todo.completed);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>

      <Input onAddTodo={handleAddTodo}></Input>
    
      <div className="list__container">
        <div className="full__list">
          <h1>Pending Tasks</h1>
          <ul className="list__bones">
            {incompleteTodos.map((todo) => 
              <li key={todo.id}>
                <div className="spacer"></div>

                {editId === todo.id ? (
                  <input 
                   value={editValue}
                   onChange={(e) => setEditValue(e.target.value)}
                  ></input>
                ):
                (<div className="list__text">{todo.todo}</div>)
                }
                
                <Buttons 
                 completed={todo.completed}
                 id={todo.id}
                 onDelete={deleteTodo}
                 startEdit={startEdit}
                 title={todo.todo}
                 editId={editId}
                 editValue={editValue}
                 saveEdit={saveEdit}
                 onToggle={toggleComplete}/>
              </li>
            )}
          </ul>
        </div>

        <div className="full__list">
          <h1>Completed Tasks</h1>
          <ul className="list__bones">
            {completeTodos.map((todo) => 
              <li key={todo.id}>
                <Buttons 
                 completed={todo.completed}
                 id={todo.id}
                 onDelete={deleteTodo}
                 startEdit={startEdit}
                 title={todo.todo}
                 editId={editId}
                 editValue={editValue}
                 saveEdit={saveEdit}
                 onToggle={toggleComplete}
                 >
                  {editId === todo.id ? (
                    <input 
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    ></input>
                  ):
                  (<div className="list__text">{todo.todo}</div>)
                  }
                 </Buttons>
              </li>
            )}
          </ul>
        </div>
      </div> 
      <Throttle /> 
    </div>
  )
}

export default Lists

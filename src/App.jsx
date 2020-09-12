import React, { useState } from 'react';
import './App.css';
// import { Form, Button, Container, ListGroup, Modal } from 'react-bootstrap';
// import { FaTrash, FaPen } from 'react-icons/fa';

const getId = () => {
  return (Math.random() * 1000).toString() + new Date().toDateString()
}

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [show, setShow] = useState("none");
  const [selectedTodo, setSelectedTodo] = useState({ id: null, value: null })

  const handleClose = () => setShow("none");
  const handleShow = () => setShow("");

  const handleSubmit = (event) => {
    event.preventDefault()
    if (input !== "") {
      setTodos([...todos, { value: input, id: getId() }])
    }
    setInput("")
  }

  const handleDelete = (todoId) => {
    handleClose()
    setTodos(todos.filter((item) => item.id !== todoId))
  }

  const handleModify = (todo) => {
    setSelectedTodo(todo)
    handleShow()
  }

  const handleModifyValidation = (event) => {
    event.preventDefault()
    setTodos(todos.map(t => t.id === selectedTodo.id ? selectedTodo : t))
    handleClose()
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ width: "400px", height: "200px", backgroundColor: "grey", borderRadius: "10px", marginLeft: "200px" }}>
          <p>Input Box</p>
          <form onSubmit={handleSubmit} action="">
            <input type="text" placeholder="Type here" value={input} onChange={(e) => setInput(e.target.value)} style={{ outline: "none", border: "none", backgroundColor: "white", border: "none", width: "300px", height: "30px", borderRadius: "10px" }} />
            <input type="submit" value="Add" style={{ outline: "none", border: "none", backgroundColor: "green", width: "50px", height: "30px", borderRadius: "10px", marginLeft: "5px" }} />
          </form>
        </div>
        <div style={{ width: "400px", height: "900px", backgroundColor: "grey", borderRadius: "10px", marginRight: "200px" }}>
          {todos.map(todo => <div key={todo.id}>
            <div style={{ margin: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: "10px", color: "grey", backgroundColor: "white" }}>
              <p style={{ marginLeft: "10px" }}>{todo.value}</p>
              <div>
                <input type="button" value="Modify" style={{ outline: "none", border: "none", margin: "5px", backgroundColor: "orange", width: "60px", height: "30px", borderRadius: "10px", marginLeft: "5px" }} onClick={() => handleModify(todo)} />
                <input type="button" value="Delete" style={{ outline: "none", border: "none", margin: "5px", backgroundColor: "red", width: "60px", height: "30px", borderRadius: "10px", marginLeft: "5px" }} onClick={() => handleDelete(todo.id)} />
              </div>
            </div>
          </div>)}
        </div>
        <div style={{ opacity: "1", position: "fixed", marginLeft: "40%", marginTop: "10px", display: show }}>
          <form onSubmit={handleModifyValidation} action="">
            <input type="text" value={selectedTodo.value} onChange={e => setSelectedTodo({ ...selectedTodo, value: e.target.value })} style={{ outline: "none", border: "none", backgroundColor: "white", border: "none", width: "300px", height: "30px", borderRadius: "10px" }} />
            <input type="submit" value="Save" style={{ outline: "none", border: "none", backgroundColor: "green", width: "50px", height: "30px", borderRadius: "10px", marginLeft: "5px" }} />
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
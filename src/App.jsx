import React, { useState } from 'react';
import './App.css';
import { Form, Button, Container, ListGroup, Modal } from 'react-bootstrap';
// import { FaTrash, FaPen } from 'react-icons/fa';

const getId = () => {
  return (Math.random() * 1000).toString() + new Date().toDateString()
}

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [show, setShow] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState({ id: null, value: null })

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        <div style={{ width: "25%", height: "200px", backgroundColor: "grey", borderRadius: "10px", marginLeft: "10%" }}>
          <p>Input Box</p>
          <form onSubmit={handleSubmit} action="">
            <input type="text" placeholder="Type here" value={input} onChange={(e) => setInput(e.target.value)} style={{ outline: "none",fontSize: "1vw", border: "none", backgroundColor: "white", border: "none", width: "300px", height: "30px", borderRadius: "10px" }} />
            <input type="submit" value="Add" style={{ outline: "none",fontSize: "1vw", border: "none", backgroundColor: "green", width: "50px", height: "30px", borderRadius: "10px", marginLeft: "5px" }} />
          </form>
        </div>
        <div style={{ width: "25%", height: "900px", backgroundColor: "grey", borderRadius: "10px", marginRight: "10%" }}>
          {todos.map(todo => <div key={todo.id}>
            <div style={{ margin: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: "10px", color: "grey", backgroundColor: "white" }}>
              <p style={{ marginLeft: "10px" }}>{todo.value}</p>
              <div>
                <input type="button" value="Modify" style={{ outline: "none",fontSize: "1vw", border: "none", margin: "5px", backgroundColor: "orange", width: "60px", height: "30px", borderRadius: "10px", marginLeft: "5px" }} onClick={() => handleModify(todo)} />
                <input type="button" value="Delete" style={{ outline: "none",fontSize: "1vw", border: "none", margin: "5px", backgroundColor: "red", width: "60px", height: "30px", borderRadius: "10px", marginLeft: "5px" }} onClick={() => handleDelete(todo.id)} />
              </div>
            </div>
          </div>)}
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleModifyValidation} action="">
              <input type="text" value={selectedTodo.value} onChange={e => setSelectedTodo({ ...selectedTodo, value: e.target.value })} />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
          </Button>
            <Button variant="primary" onClick={handleModifyValidation}>
              Save Changes
          </Button>
          </Modal.Footer>
        </Modal>
      </header>
    </div>
  );
}

export default App;
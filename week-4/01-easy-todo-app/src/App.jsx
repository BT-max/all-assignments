import {useEffect, useState} from 'react';
import './App.css'
import axios from 'axios';
import PropTypes from "prop-types";

const instance = axios.create({
    baseURL: 'http://localhost:3000',
})


function App() {
    const [todos, setTodos] = useState([])

    const fetchTodos = () => {
        instance.get('/todos')
            .then(response => {
                setTodos(response.data);
            })
            .catch(error => console.log(error));
    }

    const deleteTodo = id => {
        axios.delete(`http://localhost:3000/todos/${id}`)
            .then(response => {
                console.log(response);
                console.log(`Todo: ${id} deleted`);
                fetchTodos();
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        fetchTodos()
    }, []);


    return (
        <>
            <div>
                {todos.map(todo => <Todo key={todo.id} deleteTodo={deleteTodo} {...todo}/>)}
            </div>
        </>
    )
}

function Todo({id, title, description, deleteTodo}) {
    return (
        <div id={id}>
            <div className='title'>{title}</div>
            <div className='description'>{description}</div>
            <button onClick={() => deleteTodo(id)}>Delete</button>
        </div>
    )
}

Todo.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    deleteTodo: PropTypes.func.isRequired,
};

export default App

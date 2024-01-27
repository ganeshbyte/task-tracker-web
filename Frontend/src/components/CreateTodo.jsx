import React, { useState } from 'react'
import axios from "axios";
function CreateTodo() {
    const [todo, setTodo] = useState({
        title: "",
        description: ""
    });

    const inputHandler = (event) => {
        const { value, name } = event.target;
        //setting titile
        if (name === "title") {
            setTodo((prev) => ({
                title: value,
                decscription: prev.description,
            }));
        }
        //setting description
        else {
            setTodo((prev) => ({
                title: prev.title,
                description: value,
            }));
        }
    }

    const onSubmitHandler = async (event) => {

        try {
            const data = await axios.post("http://localhost:3000/todo", todo, { withCredentials: true });
            setTodo({
                title: " ",
                description: " "
            });
        } catch (error) {

        }

    }

    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                <label htmlFor="title">Title</label>
                <input type="text" placeholder='title' onChange={inputHandler} name='title' value={todo.title} />
                <br />
                <label htmlFor="description">description</label>
                <input type="text" placeholder='description' onChange={inputHandler} name='description' value={todo.description} />
                <br />
                <button type='submit'>submit</button>
            </form>
        </div>
    )
}

export default CreateTodo;
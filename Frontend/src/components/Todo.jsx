import React from 'react'

function Todo({ todo }) {
    return (
        <li>{todo.title} {todo.description}</li>
    )
}

export default Todo
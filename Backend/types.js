const zod = require("zod");

//input validation

const createTodo = zod.object({
    title: zod.string(),
    description: zod.string()
})

const updateTodo = zod.object({
    id: zod.string()
})

module.exports = { createTodo, updateTodo };
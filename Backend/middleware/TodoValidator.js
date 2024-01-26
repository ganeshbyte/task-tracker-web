const { createTodo, updateTodo } = require("../types");

const createTodoValidator = async (req, res, next) => {
    const createPayload = req.body;
    const parsePayload = createTodo.safeParse(createPayload);
    if (!parsePayload.success) {
        return res.status(411).json({ message: "Invalid Input data" });
    }
    next();
}
const updateTodoValidator = async (req, res, next) => {
    const updatePayload = req.body;
    const parsePayload = updateTodo.safeParse(updatePayload);
    if (!parsePayload.success) {
        return res.status(411).json({ message: "Invalid Input data" });
    }
    next();
}
module.exports = { createTodoValidator, updateTodoValidator };
// server/routes/todo.js
const todocontroller = require('./../controllers/todo.ctrl')
const multipart = require('connect-multiparty')
const multipartWare = multipart()

module.exports = (router) => {

    /**
     * get all todos
     */
    router
        .route('/todos')
        .get(todocontroller.getAll)

    /**
     * add an todo
     */
    router
        .route('/todo')
        .post(multipartWare, todocontroller.addTodo)

    /**
     * toggle an todo
     */
    router
    .route('/todo/toggle')
    .post(multipartWare, todocontroller.toggleTodo)

    /**
     * delete an todo
     */
    router
    .route('/todo/delete')
    .post(multipartWare, todocontroller.deleteTodo)
}
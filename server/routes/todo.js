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
        .put(multipartWare, todocontroller.toggleTodo)

    /**
     * delete an todo
     */
    router
        .route('/todo/delete')
        .delete(multipartWare, todocontroller.deleteTodo)
}
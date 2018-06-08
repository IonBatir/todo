/** server/controllers/todo.ctrl.js*/
const Todo = require('../models/Todo')
const fs = require('fs')

module.exports = {
    addTodo: (req, res, next) => {
        let { text } = req.body
        saveTodo({ text, completed: false })
        function saveTodo(obj) {
            new Todo(obj).save((err, todo) => {
                if (err)
                    res.send(err)
                else if (!todo)
                    res.send(400)
                next()
            })
        }
    },
    getAll: (req, res, next) => {
        Todo.find(req.params.id)
        .exec((err, todo)=> {
            if (err)
                res.send(err)
            else if (!todo)
                res.send(404)
            else
                res.send(todo)
            next()            
        })
    },

    /**
     * todo_id
     */
    toggleTodo: (req, res, next) => {
        Todo.findById(req.body.todo_id).then((todo)=> {
            return todo.toggle().then(()=>{
                return res.json({msg: "Done"})
            })
        }).catch(next)
    }
}
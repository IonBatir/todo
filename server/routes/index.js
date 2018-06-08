// server/routes/index.js
const todo = require('./todo')

module.exports = (router) => {
    todo(router)
}
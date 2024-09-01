const todomodels = require('../models/todomodels')

module.exports.getToDo = async(req, res) =>{
    const toDo = await todomodels.find()
    res.send(toDo)
}

module.exports.saveToDo = async(req, res) =>{
    const { text } = req.body

    todomodels
    .create({ text })
    .then((data) => {
        console.log("added successfully")
        res.send(data)
    })
}

module.exports.updateToDo = async(req, res) =>{
    const {_id,text} = req.body
    todomodels
    .findByIdAndUpdate(_id, {text})
    .then(() =>  res.send("Updated"))
    .catch((error)=> console.log(error))
}

module.exports.deleteToDo = async(req, res) =>{
    const { _id } = req.body
    todomodels
    .findByIdAndDelete(_id)
    .then(() =>  res.send("Deleted"))
    .catch((error)=> console.log(error))
}
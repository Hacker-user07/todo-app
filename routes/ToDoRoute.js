const {Router} = require("express");
const { saveToDo, getToDo, updateToDo, deleteToDo } = require("../contollers/todocontroller");

const router = Router()

router.get('/home', getToDo)
router.post('/save', saveToDo)
router.post('/update', updateToDo)
router.post('/delete', deleteToDo)
module.exports = router;
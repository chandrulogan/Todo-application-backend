const express = require('express');
const router = express.Router();
const todoListController = require('./../controllers/todoListControllers')


router.route('/create-todo-list').post(todoListController.createTodoList)
router.route('/todo-list/:userId').get( todoListController.findMyTodoList)
router.route('/todo-list/find-one/:listId').get(todoListController.findOneTodoList)
router.route('/todo-list/update/:id').post( todoListController.editMyTodoList)
router.route('/todo-list/status-update').post( todoListController.updateTodoListStatus)
router.route('/todo-list/:id').delete( todoListController.deleteTodoList)

module.exports = router
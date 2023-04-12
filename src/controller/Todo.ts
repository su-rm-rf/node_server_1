import constants from '../constants'
import utils from '../utils'
import TodoModel from '../db/model/Todo'

export default class TodoController {

  async todo_list(ctx) {
    const { completed } = ctx.query
    let todoList:any = []
    if (!completed) {
      todoList = await TodoModel.find()
    } else {
      todoList = await TodoModel.find({ completed })
    }
    const res:any = []
    todoList.map(todo => {
      const todoDto = {
        id: todo._id,
        text: todo.text,
        completed: todo.completed,
      }
      res.push(todoDto)
    })
    utils.responseClient(ctx, constants.reqSuccess, '获取列表成功', res)
  }
  
  async todo_detail(ctx) {
    const { id } = ctx.params
    const todo = await TodoModel.findById(id)
    if (todo) {
      const res = {
        id: todo._id,
        text: todo.text,
        completed: todo.completed,
      }
      utils.responseClient(ctx, constants.reqSuccess, '获取详情成功', res)
    } else {
      utils.responseClient(ctx, constants.dataFail, '获取详情失败', null)
    }
  }
  
  async todo_add(ctx) {
    const { text, completed } = ctx.request.body
    const todoModel = new TodoModel()
    todoModel.text = text
    todoModel.completed = completed
    const res = await todoModel.save()
    utils.responseClient(ctx, constants.reqSuccess, '添加成功', res.id)
  }
  
  async todo_update(ctx) {
    const { id, text, completed } = ctx.request.body
    const todo = await TodoModel.findById(id)
    if (todo) {
      text && (todo.text = text)
      todo.completed = completed
      const res = await todo.save()
      utils.responseClient(ctx, constants.reqSuccess, '更新成功', id)
    } else {
      utils.responseClient(ctx, constants.dataFail, '更新失败', null)
    }
  }
  
  async todo_delete(ctx) {
    const { id } = ctx.request.body
    const todo = await TodoModel.findByIdAndRemove(id)
    if (todo) {
      utils.responseClient(ctx, constants.reqSuccess, '删除成功', id)
    } else {
      utils.responseClient(ctx, constants.dataFail, '删除失败', null)
    }
  }
  
  async todo_clear(ctx) {
    const res = await TodoModel.remove()
    if (res) {
      utils.responseClient(ctx, constants.reqSuccess, '删除成功', res.deletedCount)
    } else {
      utils.responseClient(ctx, constants.dataFail, '删除失败', null)
    }
  }

}
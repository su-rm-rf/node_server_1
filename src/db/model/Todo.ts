import { model } from "mongoose"

import TodoSchema from '../schema/Todo'

const TodoModel = model('Todo', TodoSchema)

export default TodoModel
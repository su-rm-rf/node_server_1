import { Schema } from "mongoose";

const todoSchema = new Schema({
  id: Number,
  text: String,
  completed: Number,
})

todoSchema.methods.xx = () => {
  
}

export default todoSchema
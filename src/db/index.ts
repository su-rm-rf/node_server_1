import mongoose from 'mongoose'

const DB_URL = 'mongodb://localhost/todo'

const DB_Initialize = () => {
  return mongoose.connect(DB_URL)
}

mongoose.connection.on('connected', () => {
  console.log(`mongodb connected at ${DB_URL}`)
})

mongoose.connection.on('error', err => {
  console.log(`mongodb connection error: ${err}`)
})

mongoose.connection.on('disconnected', () => {
  console.log(`mongodb disconnected`)
})

// export default mongoose
export {
  DB_Initialize
}
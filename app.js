require("./db/connect")
const express = require("express")
const app = express()
const tasks = require("./routers/tasks")
const connectDB = require("./db/connect")
const notFound = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/errorHandler")

require("dotenv").config()

// middleware
app.use(express.static("./public"))
app.use(express.json())

// routes
app.use("/api/v1/tasks", tasks)

app.use(notFound)
app.use(errorHandlerMiddleware)

// result
const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is running on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()

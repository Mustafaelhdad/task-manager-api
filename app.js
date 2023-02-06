require("./db/connect")
const express = require("express")
const app = express()
const tasks = require("./routers/tasks")
const connectDB = require("./db/connect")

require("dotenv").config()

// middleware
app.use(express.json())

// routes
app.get("/hello", (req, res) => res.send("Hello from hello route :)"))

app.use("/api/v1/tasks", tasks)

// result
const port = 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is running on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()

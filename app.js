const express = require("express")
const app = express()
const tasks = require("./routers/tasks")

// middleware
app.use(express.json())

// routes
app.get("/hello", (req, res) => res.send("Hello from hello route :)"))

app.use("/api/v1/tasks", tasks)

// result
const port = 3000
app.listen(port, console.log("Server is running on port ${port}..."))

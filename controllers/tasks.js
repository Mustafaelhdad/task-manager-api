const Task = require("../models/Task")
const asyncWrapper = require("../middleware/async")
const { createCustomError } = require("../errors/custom-error")

// getting all tasks
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({})
  res.status(200).json({ tasks })
})

// creating a new task
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body)
  res.status(201).json({ task })
})

// getting a single task
const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params
  const task = await Task.findOne({ _id: taskId })

  if (!task) {
    return next(createCustomError(`No task with id: ${taskId}`, 404))
    // const error = new Error("Not Found")
    // error.status = 404
    // return next(error)
    // return res.status(404).json({ msg: `No task with id: ${taskId}` })
  }

  res.status(200).json({ task })
})

// update a task
const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params

  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!task) {
    return next(createCustomError(`No task with id: ${taskId}`, 404))
    // return res.status(404).json({ msg: `No task with id: ${taskId}` })
  }

  res.status(200).json({ task })
})

// deleting a task
const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params
  const task = await Task.findByIdAndDelete({ _id: taskId })

  if (!task) {
    return next(createCustomError(`No task with id: ${taskId}`, 404))
    // return res.status(404).json({ msg: `No task with id: ${taskId}` })
  }

  res.status(200).json({ task })
  // res.status(200).send()
  // res.status(200).json({ task: null, status: "success" })
})

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
}

import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080'

const client = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
})

// Task lists
export const listTaskLists = () => client.get('/task-lists').then(r => r.data)
export const createTaskList = (payload) => client.post('/task-lists', payload).then(r => r.data)
export const getTaskList = (id) => client.get(`/task-lists/${id}`).then(r => r.data)
export const updateTaskList = (id, payload) => client.put(`/task-lists/${id}`, payload).then(r => r.data)
export const deleteTaskList = (id) => client.delete(`/task-lists/${id}`)

// Tasks
export const listTasks = (taskListId) => client.get(`/task-lists/${taskListId}/tasks`).then(r => r.data)
export const createTask = (taskListId, payload) => client.post(`/task-lists/${taskListId}/tasks`, payload).then(r=>r.data)
export const getTask = (taskListId, taskId) => client.get(`/task-lists/${taskListId}/tasks/${taskId}`).then(r=>r.data)
export const updateTask = (taskListId, taskId, payload) => client.put(`/task-lists/${taskListId}/tasks/${taskId}`, payload).then(r=>r.data)
export const deleteTask = (taskListId, taskId) => client.delete(`/task-lists/${taskListId}/tasks/${taskId}`)

import React from 'react'
import TaskLists from './pages/TaskLists'
import TaskListDetail from './pages/TaskListDetail'

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

export default function App(){
  return (
    <BrowserRouter>
      <header className="app-header">
        <Link to="/"><h1>Task Tracker</h1></Link>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<TaskLists />} />
          <Route path="/lists/:id" element={<TaskListDetail />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

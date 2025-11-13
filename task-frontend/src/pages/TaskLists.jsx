import React, { useEffect, useState } from 'react'
import { listTaskLists, createTaskList, deleteTaskList } from '../api'
import TaskListForm from '../components/TaskListForm'
import { Link } from 'react-router-dom'

export default function TaskLists(){
  const [lists, setLists] = useState([])
  const [showForm, setShowForm] = useState(false)

  const load = () => listTaskLists().then(setLists).catch(e => console.error(e))

  useEffect(() => { load() }, [])

  const onCreate = async (payload) => {
    await createTaskList(payload)
    setShowForm(false)
    load()
  }

  const onDelete = async (id) => {
    if(!confirm('Delete this task list?')) return
    await deleteTaskList(id)
    load()
  }

  return (
    <div>
      <div className="hero">
        <h2>My Task Lists</h2>
        <button className="big-create" onClick={()=>setShowForm(s=>!s)}>{showForm ? 'Cancel' : 'Create New Task List'}</button>
      </div>
  {showForm && <TaskListForm onSubmit={onCreate} onCancel={()=>setShowForm(false)} />}
      <div className="lists centered-lists">
        {lists.length === 0 && <p className="empty-note">No task lists</p>}
        {lists.map(l => (
          <div className="list-card" key={l.id}>
            <Link to={`/lists/${l.id}`}><strong>{l.title}</strong></Link>
            <p>{l.description}</p>
            <div className="card-actions">
              <Link to={`/lists/${l.id}`}>Open</Link>
              <button onClick={()=>onDelete(l.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

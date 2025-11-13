import React, {useState, useEffect} from 'react'
import { formatISO } from 'date-fns'

export default function TaskForm({ onSubmit, initial, onCancel }) {
  const [title, setTitle] = useState(initial?.title || '')
  const [description, setDescription] = useState(initial?.description || '')
  const [dueDate, setDueDate] = useState(initial?.dueDate ? initial.dueDate.slice(0,16) : '')
  const [priority, setPriority] = useState(initial?.priority || 'MEDIUM')
  
  const submit = (e) => {
    e.preventDefault()
    if(!title.trim()){ alert('Title required'); return }
    const payload = {
      title,
      description,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      priority
    }
    onSubmit(payload)
  }

  useEffect(()=>{
    setTitle(initial?.title || '')
    setDescription(initial?.description || '')
    setDueDate(initial?.dueDate ? initial.dueDate.slice(0,16) : '')
    setPriority(initial?.priority || 'MEDIUM')
  }, [initial])

  const mode = initial ? 'Update Task' : 'Create Task'

  return (
    <div>
      <div className="form-header">
        <button className="icon-btn" onClick={onCancel} aria-label="back">←</button>
        <h3>{mode}</h3>
      </div>
      <form className="card form" onSubmit={submit}>
        <label>Title
          <input className="form-input" value={title} onChange={e=>setTitle(e.target.value)} />
        </label>
        <label>Description
          <textarea className="form-textarea" value={description} onChange={e=>setDescription(e.target.value)} />
        </label>
        <label>Due date (optional)
          <input type="date" className="form-input" value={dueDate ? dueDate.slice(0,10) : ''} onChange={e=>setDueDate(e.target.value ? e.target.value + 'T00:00' : '')} />
        </label>

        <div className="priority-row">
          {['LOW','MEDIUM','HIGH'].map(p => (
            <button type="button" key={p} className={`priority-pill ${priority===p? 'selected':''}`} onClick={()=>setPriority(p)}>{p.charAt(0)+p.slice(1).toLowerCase()} Priority</button>
          ))}
        </div>

        <div className="form-actions"><button type="submit" className="big-action">{initial ? 'Update Task' : 'Create Task'}</button></div>
      </form>
    </div>
  )
}

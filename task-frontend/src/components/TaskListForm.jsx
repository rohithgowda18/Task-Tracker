import React, {useState} from 'react'

export default function TaskListForm({ onSubmit, initial, onCancel }) {
  const [title, setTitle] = useState(initial?.title || '')
  const [description, setDescription] = useState(initial?.description || '')

  const submit = (e) => {
    e.preventDefault()
    if(!title.trim()){ alert('Title required'); return }
    onSubmit({ title, description })
  }

  const mode = initial ? 'Update Task List' : 'Create Task List'

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
        <div className="form-actions">
          <button type="submit" className="big-action">{initial ? 'Update Task List' : 'Create Task List'}</button>
        </div>
      </form>
    </div>
  )
}

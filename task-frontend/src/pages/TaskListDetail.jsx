import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getTaskList, listTasks, createTask, updateTask, deleteTask, updateTaskList, deleteTaskList } from '../api'
import TaskForm from '../components/TaskForm'
import TaskListForm from '../components/TaskListForm'
import ProgressBar from '../components/ProgressBar'
import { format } from 'date-fns'

export default function TaskListDetail(){
  const { id } = useParams()
  const nav = useNavigate()
  const [taskList, setTaskList] = useState(null)
  const [tasks, setTasks] = useState([])
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [showEditList, setShowEditList] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  const loadList = () => getTaskList(id).then(setTaskList).catch(()=>nav('/'))
  const loadTasks = () => listTasks(id).then(setTasks)

  useEffect(()=> { loadList(); loadTasks() }, [id])

  const onCreateTask = async (payload) => {
    // handle both create and update depending on editingTask
    if(editingTask){
      await updateTask(id, editingTask.id, payload)
      setEditingTask(null)
    } else {
      await createTask(id, payload)
    }
    setShowTaskForm(false)
    loadTasks()
    loadList()
  }

  const onToggleComplete = async (t) => {
    const payload = { ...t, status: t.status === 'OPEN' ? 'CLOSED' : 'OPEN' }
    await updateTask(id, t.id, payload)
    loadTasks(); loadList()
  }

  const onDeleteTask = async (taskId) => {
    if(!confirm('Delete task?')) return
    await deleteTask(id, taskId)
    loadTasks(); loadList()
  }

  const onUpdateList = async (payload) => {
    await updateTaskList(id, payload)
    setShowEditList(false)
    loadList()
  }

  const completed = tasks.filter(t => t.status === 'CLOSED').length
  const pct = tasks.length ? Math.round((completed / tasks.length) * 100) : 0

  return (
    <div>
      {taskList && (
        <>
        <div className="detail-header">
          <button className="icon-btn" onClick={()=>nav(-1)} aria-label="back">←</button>
          <h2>{taskList.title}</h2>
          <button className="icon-btn" onClick={()=>setShowEditList(s=>!s)} aria-label="edit">✎</button>
        </div>

        <div className="progress-section">
          <ProgressBar percent={pct} />
        </div>

        <div className="centered-actions">
          <button className="big-action" onClick={()=>{ setEditingTask(null); setShowTaskForm(s=>!s) }}>{showTaskForm ? 'Cancel' : '+ Add Task'}</button>
        </div>

  {showEditList && <TaskListForm initial={taskList} onSubmit={onUpdateList} onCancel={()=>setShowEditList(false)} />}
  {showTaskForm && <TaskForm initial={editingTask} onSubmit={onCreateTask} onCancel={()=>{ setShowTaskForm(false); setEditingTask(null) }} />}

        <div className="tasks">
          <div className="table-header">
            <div>Completed</div>
            <div>Title</div>
            <div>Priority</div>
            <div>Due Date</div>
            <div>Actions</div>
          </div>
          {tasks.length === 0 && <p className="empty-note">0 tasks</p>}
          {tasks.map(t => (
            <div key={t.id} className={`task ${t.status==='CLOSED' ? 'done' : ''}`}>
              <div className="task-left">
                <input type="checkbox" className="task-check" checked={t.status==='CLOSED'} onChange={()=>onToggleComplete(t)} />
                <div>
                  <div className="task-title">{t.title}</div>
                </div>
              </div>
              <div className="task-meta compact">
                <div className="priority-pill small">{t.priority}</div>
                <div className="due-date">{t.dueDate ? format(new Date(t.dueDate), 'MM/dd/yyyy') : ''}</div>
                <div className="task-actions">
                  <button className="icon-btn" onClick={()=>{ setEditingTask(t); setShowTaskForm(true) }} aria-label="edit">✎</button>
                  <button className="icon-btn" onClick={()=>onDeleteTask(t.id)} aria-label="delete">🗑</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="centered-actions">
          <button className="danger-btn" onClick={async ()=>{ if(confirm('Delete TaskList?')){ await deleteTaskList(id); nav('/') } }}>− Delete TaskList</button>
        </div>
        </>
      )}
    </div>
  )
}

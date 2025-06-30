import { useState } from 'react'
import { Route, BrowserRouter as Router, Routes, useNavigate, useParams } from 'react-router-dom'
import Widget from './routes/Widget'
import { useWidgetStore } from './zustand/widgetStore'

function ProjectList() {
  const projects = useWidgetStore((state) => state.projects)
  const createProject = useWidgetStore((state) => state.createProject)
  const [newProjectName, setNewProjectName] = useState('')
  const navigate = useNavigate()

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='mb-6 flex flex-wrap items-center gap-4'>
        <div className='font-bold'>Projects:</div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const trimmed = newProjectName.trim()
            if (trimmed) {
              createProject(trimmed)
              setNewProjectName('')
              navigate(`/project/${encodeURIComponent(trimmed)}`)
            }
          }}
          className='flex items-center gap-2'
        >
          <input
            className='rounded border px-2 py-1'
            placeholder='New project name'
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
          />
          <button
            type='submit'
            className='rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600'
          >
            Add Project
          </button>
        </form>
      </div>
      <div className='mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3'>
        {Object.keys(projects).length === 0 && (
          <div className='col-span-full text-lg text-gray-500'>
            No projects yet. Create one above!
          </div>
        )}
        {Object.keys(projects).map((name) => (
          <div
            key={name}
            className='flex min-h-[120px] min-w-[220px] cursor-pointer flex-col items-start rounded-xl border bg-white p-8 text-xl font-semibold text-gray-800 shadow-lg transition hover:bg-blue-50 hover:shadow-2xl'
            onClick={() => navigate(`/project/${encodeURIComponent(name)}`)}
          >
            <span className='truncate'>{name}</span>
            <span className='mt-2 text-sm text-gray-400'>
              Widgets: {projects[name].widgets.length}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjectWidget() {
  const { name } = useParams<{ name: string }>()
  const setCurrentProject = useWidgetStore((state) => state.setCurrentProject)
  const projects = useWidgetStore((state) => state.projects)
  const navigate = useNavigate()

  // Set current project on mount
  if (name && projects[name]) {
    setCurrentProject(name)
    return (
      <div className='min-h-screen bg-gray-50 p-8'>
        <div className='mb-6 flex items-center gap-4'>
          <button
            className='mr-4 rounded border bg-white px-3 py-1 font-semibold hover:bg-gray-100'
            onClick={() => navigate('/')}
          >
            ← Back
          </button>
          <div className='text-2xl font-bold'>{name}</div>
        </div>
        <Widget />
      </div>
    )
  }
  return <div className='p-8 text-red-500'>Project not found.</div>
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ProjectList />} />
        <Route path='/project/:name' element={<ProjectWidget />} />
      </Routes>
    </Router>
  )
}

export default App

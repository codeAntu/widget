import { useState } from 'react'
import { Route, BrowserRouter as Router, Routes, useNavigate, useParams } from 'react-router-dom'
import Widget from './routes/Widget'
import { useWidgetStore } from './zustand/widgetStore'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ArrowLeft, Plus } from 'lucide-react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'

function ProjectList() {
  const projects = useWidgetStore((state) => state.projects)
  const createProject = useWidgetStore((state) => state.createProject)
  const [newProjectName, setNewProjectName] = useState('')
  const navigate = useNavigate()

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='mb-6 flex w-full flex-wrap items-center justify-between gap-4'>
        <div className='text-3xl font-bold opacity-80'>Projects:</div>
        <Dialog>
          <DialogTrigger>
            <Button>
              <Plus className='text-white' />
              Create New Project
            </Button>
          </DialogTrigger>
          <DialogContent className=''>
            <DialogTitle className='pb-3 text-2xl font-semibold opacity-80'>
              Create New Project
            </DialogTitle>
            <DialogDescription>
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
                className='flex flex-col items-center gap-8'
              >
                <Input
                  className='px-5 py-4 text-base'
                  placeholder='New project name'
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                />
                <Button type='submit' className='w-full'>
                  Add Project
                </Button>
              </form>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </div>
      <div className='mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
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

  if (name && projects[name]) {
    setCurrentProject(name)
    return (
      <div className='min-h-screen bg-gray-50 p-8'>
        <div className='mb-6 flex items-center gap-4'>
          <Button variant={'secondary'} onClick={() => navigate('/')}>
            <ArrowLeft />
          </Button>
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

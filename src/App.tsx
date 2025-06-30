import { useState } from 'react'
import Widget from './routes/Widget'
import { useWidgetStore } from './zustand/widgetStore'

function App() {
  const projects = useWidgetStore((state) => state.projects)
  const currentProject = useWidgetStore((state) => state.currentProject)
  const setCurrentProject = useWidgetStore((state) => state.setCurrentProject)
  const createProject = useWidgetStore((state) => state.createProject)
  const [newProjectName, setNewProjectName] = useState('')

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='mb-6 flex flex-wrap items-center gap-4'>
        <div className='font-bold'>Projects:</div>
        {Object.keys(projects).map((name) => (
          <button
            key={name}
            className={`mr-2 rounded border px-3 py-1 font-semibold ${currentProject === name ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}`}
            onClick={() => setCurrentProject(name)}
          >
            {name}
          </button>
        ))}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (newProjectName.trim()) {
              createProject(newProjectName.trim())
              setNewProjectName('')
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
      {currentProject ? (
        <Widget />
      ) : (
        <div className='mt-10 text-lg text-gray-500'>
          Select or create a project to view widgets.
        </div>
      )}
    </div>
  )
}

export default App

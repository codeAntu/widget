import { WidgetType } from '@/types'
import { useWidgetStore } from '@/zustand/widgetStore'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { useState } from 'react'
import GridLayout from 'react-grid-layout'
import renderWidget from '../components/renderers/renderWidget'

const Widget = () => {
  const currentProject = useWidgetStore((state) => state.currentProject)
  const projects = useWidgetStore((state) => state.projects)
  const addWidget = useWidgetStore((state) => state.addWidget)
  const widgets = currentProject ? projects[currentProject]?.widgets || [] : []
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<WidgetType | null>(null)
  const [inputValue, setInputValue] = useState('')

  // Update handleSubmit to accept type
  const handleSubmit = (type: WidgetType) => {
    const newId = (widgets.length + 1).toString()
    let defaultData: any = {}
    if (type === 'text-editor') defaultData = { value: inputValue }
    else if (type === 'image-display') defaultData = { src: inputValue }
    else if (type === 'data-table') defaultData = { data: [] }
    addWidget({
      id: newId,
      type,
      x: 0,
      y: Infinity,
      w: 4,
      h: 3,
      data: defaultData,
    })
    setPopoverOpen(false)
    setSelectedType(null)
    setInputValue('')
  }

  const updateLayout = (newLayout: any[]) => {
    // Map layout changes back to widgets
    const updatedWidgets = widgets.map((widget: any) => {
      const layoutItem = newLayout.find((l) => l.i === widget.id)
      if (layoutItem) {
        return {
          ...widget,
          x: layoutItem.x,
          y: layoutItem.y,
          w: layoutItem.w,
          h: layoutItem.h,
        }
      }
      return widget
    })
    useWidgetStore.getState().setWidgets(updatedWidgets)
  }

  const layout = widgets.map((w: any) => ({
    i: w.id,
    x: w.x,
    y: w.y,
    w: w.w,
    h: w.h,
  }))

  return (
    <div className='h-[100dvh] border'>
      {currentProject && <div className='mb-4 px-2 text-2xl font-bold'>{currentProject}</div>}
      <GridLayout
        className='layout w-full rounded-xl border'
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
        onLayoutChange={updateLayout}
        onchange={() => {
          console.log('Layout changed')
        }}
      >
        {widgets.map((widget: any) => (
          <div key={widget.id}>{renderWidget({ ...widget, type: widget.type as WidgetType })}</div>
        ))}
      </GridLayout>
      <div className='absolute right-0 bottom-5 left-0 mx-auto w-fit rounded-lg border p-2 px-5 text-center font-semibold'>
        {/* Text Widget Popover */}
        <Popover
          open={popoverOpen && selectedType === 'text-editor'}
          onOpenChange={(open) => {
            setPopoverOpen(open)
            if (!open) setSelectedType(null)
          }}
        >
          <PopoverTrigger asChild>
            <button
              className='m-1 rounded-lg bg-gray-200 px-3 py-1 hover:bg-gray-300'
              onClick={() => {
                setSelectedType('text-editor')
                setInputValue('')
                setPopoverOpen(true)
              }}
            >
              Text
            </button>
          </PopoverTrigger>
          <PopoverContent className='w-80 rounded-lg border bg-white p-4 shadow-lg'>
            <label className='mb-2 block font-semibold'>Text</label>
            <input
              className='mb-4 w-full rounded border p-2'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder='Enter text...'
            />
            <div className='flex gap-2'>
              <button
                className='rounded bg-blue-500 px-4 py-1 text-white hover:bg-blue-600'
                onClick={() => {
                  handleSubmit('text-editor')
                }}
              >
                Add
              </button>
              <button
                className='rounded bg-gray-200 px-4 py-1 hover:bg-gray-300'
                onClick={() => setPopoverOpen(false)}
              >
                Cancel
              </button>
            </div>
          </PopoverContent>
        </Popover>
        {/* Image Widget Popover */}
        <Popover
          open={popoverOpen && selectedType === 'image-display'}
          onOpenChange={(open) => {
            setPopoverOpen(open)
            if (!open) setSelectedType(null)
          }}
        >
          <PopoverTrigger asChild>
            <button
              className='m-1 rounded-lg bg-gray-200 px-3 py-1 hover:bg-gray-300'
              onClick={() => {
                setSelectedType('image-display')
                setInputValue('')
                setPopoverOpen(true)
              }}
            >
              Image
            </button>
          </PopoverTrigger>
          <PopoverContent className='w-80 rounded-lg border bg-white p-4 shadow-lg'>
            <label className='mb-2 block font-semibold'>Image URL</label>
            <input
              className='mb-4 w-full rounded border p-2'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder='Enter image URL...'
            />
            <div className='flex gap-2'>
              <button
                className='rounded bg-blue-500 px-4 py-1 text-white hover:bg-blue-600'
                onClick={() => {
                  handleSubmit('image-display')
                }}
              >
                Add
              </button>
              <button
                className='rounded bg-gray-200 px-4 py-1 hover:bg-gray-300'
                onClick={() => setPopoverOpen(false)}
              >
                Cancel
              </button>
            </div>
          </PopoverContent>
        </Popover>
        {/* Data Table Widget Popover */}
        <Popover
          open={popoverOpen && selectedType === 'data-table'}
          onOpenChange={(open) => {
            setPopoverOpen(open)
            if (!open) setSelectedType(null)
          }}
        >
          <PopoverTrigger asChild>
            <button
              className='m-1 rounded-lg bg-gray-200 px-3 py-1 hover:bg-gray-300'
              onClick={() => {
                setSelectedType('data-table')
                setInputValue('')
                setPopoverOpen(true)
              }}
            >
              Data Table
            </button>
          </PopoverTrigger>
          <PopoverContent className='w-80 rounded-lg border bg-white p-4 shadow-lg'>
            <label className='mb-2 block font-semibold'>Data Table</label>
            <div className='mb-4 text-sm text-gray-500'>No input required for Data Table</div>
            <div className='flex gap-2'>
              <button
                className='rounded bg-blue-500 px-4 py-1 text-white hover:bg-blue-600'
                onClick={() => {
                  handleSubmit('data-table')
                }}
              >
                Add
              </button>
              <button
                className='rounded bg-gray-200 px-4 py-1 hover:bg-gray-300'
                onClick={() => setPopoverOpen(false)}
              >
                Cancel
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default Widget

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { WidgetType } from '@/types'
import { useWidgetStore } from '@/zustand/widgetStore'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Image, Table, Text } from 'lucide-react'
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
  const [height, setHeight] = useState(3)
  const [width, setWidth] = useState(4)

  // Update handleSubmit to accept type
  const handleSubmit = (type: WidgetType) => {
    const newId = (widgets.length + 1).toString()
    let defaultData: any = {}
    if (type === 'text-editor') defaultData = { value: inputValue }
    else if (type === 'image-display') defaultData = { src: inputValue }
    else if (type === 'data-table') defaultData = { data: [] }

    // Validate width and height for edge cases and remove input arrows
    const safeWidth = Math.max(1, Math.min(Number(width) || 1, 12)) // min 1, max 12, fallback 1
    const safeHeight = Math.max(1, Math.min(Number(height) || 1, 12)) // min 1, max 12, fallback 1
    addWidget({
      id: newId,
      type,
      x: 0,
      y: Infinity,
      w: safeWidth,
      h: safeHeight,
      data: defaultData,
    })
    setPopoverOpen(false)
    setSelectedType(null)
    setInputValue('')
    setHeight(3)
    setWidth(4)
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
    <div className='bg-white'>
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
      <div className='absolute right-0 bottom-5 left-0 mx-auto flex w-fit rounded-lg border bg-white p-2 px-3 text-center font-semibold shadow-md'>
        <Popover
          open={popoverOpen && selectedType === 'text-editor'}
          onOpenChange={(open) => {
            setPopoverOpen(open)
            if (!open) setSelectedType(null)
          }}
        >
          <PopoverTrigger asChild>
            <button
              className='m-1 flex gap-2 rounded-lg px-5 py-2 font-semibold shadow transition-all hover:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none'
              onClick={() => {
                setSelectedType('text-editor')
                setInputValue('')
                setPopoverOpen(true)
              }}
            >
              <Text />
              Text Widget
            </button>
          </PopoverTrigger>
          <PopoverContent className='w-96 rounded-xl border bg-white p-6 shadow-2xl'>
            <label className='block py-2 text-lg font-semibold opacity-90'>Text</label>
            <Textarea
              className='mb-4 w-full rounded-lg border border-gray-300 p-3 text-base transition-all outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder='Enter text...'
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit('text-editor')
                }
              }}
            />
            <div className='mb-6 grid grid-cols-2 gap-4'>
              <div className='flex flex-col items-start gap-2'>
                <Label>Height</Label>
                <Input
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  placeholder='Enter height...'
                  className='no-spinner'
                />
              </div>
              <div className='flex flex-col items-start gap-2'>
                <Label>Width</Label>
                <Input
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  placeholder='Enter width...'
                  className='no-spinner'
                />
              </div>
            </div>
            <div className='flex justify-end gap-3'>
              <Button
                onClick={() => {
                  handleSubmit('text-editor')
                }}
              >
                Add
              </Button>
              <Button variant={'secondary'} onClick={() => setPopoverOpen(false)}>
                Cancel
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        <Popover
          open={popoverOpen && selectedType === 'image-display'}
          onOpenChange={(open) => {
            setPopoverOpen(open)
            if (!open) setSelectedType(null)
          }}
        >
          <PopoverTrigger asChild>
            <button
              className='m-1 flex gap-2 rounded-lg px-5 py-2 font-semibold shadow transition-all hover:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none'
              onClick={() => {
                setSelectedType('image-display')
                setInputValue('')
                setPopoverOpen(true)
              }}
            >
              <Image />
              Image Widget
            </button>
          </PopoverTrigger>
          <PopoverContent className='w-96 rounded-xl border bg-white p-6 shadow-2xl'>
            <Label className='mb-3 block text-lg font-semibold text-gray-700'>Image URL</Label>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder='Enter image URL...'
              className='mb-4'
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleSubmit('image-display')
                }
              }}
            />
            <div className='mb-6 grid grid-cols-2 gap-4'>
              <div className='flex flex-col items-start gap-2'>
                <Label>Height</Label>
                <Input
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  placeholder='Enter height...'
                  className='no-spinner'
                />
              </div>
              <div className='flex flex-col items-start gap-2'>
                <Label>Width</Label>
                <Input
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  placeholder='Enter width...'
                  className='no-spinner'
                />
              </div>
            </div>
            <div className='flex justify-end gap-3'>
              <Button
                onClick={() => {
                  handleSubmit('image-display')
                }}
              >
                Add
              </Button>
              <Button variant={'secondary'} onClick={() => setPopoverOpen(false)}>
                Cancel
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        <Popover
          open={popoverOpen && selectedType === 'data-table'}
          onOpenChange={(open) => {
            setPopoverOpen(open)
            if (!open) setSelectedType(null)
          }}
        >
          <PopoverTrigger asChild>
            <button
              className='m-1 flex gap-2 rounded-lg px-5 py-2 font-semibold shadow transition-all hover:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none'
              onClick={() => {
                setSelectedType('data-table')
                setInputValue('')
                setPopoverOpen(true)
              }}
            >
              <Table />
              Data Table
            </button>
          </PopoverTrigger>
          <PopoverContent className='w-96 rounded-xl border bg-white p-6 shadow-2xl'>
            <label className='mb-3 block text-lg font-semibold text-gray-700'>Data Table</label>
            <div className='mb-6 text-base text-gray-500'>No input required for Data Table</div>
            <div className='mb-6 grid grid-cols-2 gap-4'>
              <div className='flex flex-col items-start gap-2'>
                <Label>Height</Label>
                <Input
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  placeholder='Enter height...'
                  className='no-spinner'
                />
              </div>
              <div className='flex flex-col items-start gap-2'>
                <Label>Width</Label>
                <Input
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  placeholder='Enter width...'
                  className='no-spinner'
                />
              </div>
            </div>
            <div className='flex justify-end gap-3'>
              <Button
                onClick={() => {
                  handleSubmit('data-table')
                }}
              >
                Add
              </Button>
              <Button variant={'secondary'} onClick={() => setPopoverOpen(false)}>
                Cancel
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default Widget

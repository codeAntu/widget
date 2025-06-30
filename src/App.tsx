import GridLayout from 'react-grid-layout'
import { widgets } from './data'
import renderWidget from './renderers/renderWidget'
import { WidgetType } from './types'

function App() {
  const layout = widgets.map((w) => ({
    i: w.id,
    x: w.x,
    y: w.y,
    w: w.w,
    h: w.h,
  }))

  return (
    <div className='h-[100dvh] border'>
      <GridLayout
        className='layout w-full rounded-xl border'
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
      >
        {widgets.map((widget) => (
          <div key={widget.id}>{renderWidget({ ...widget, type: widget.type as WidgetType })}</div>
        ))}
      </GridLayout>
    </div>
  )
}

export default App

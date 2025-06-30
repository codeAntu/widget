import GridLayout from 'react-grid-layout'

function App() {
  const layout = [
    { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
    { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: 'c', x: 4, y: 0, w: 1, h: 2 },
  ]

  return (
    <GridLayout className='layout' layout={layout} cols={12} rowHeight={30} width={1200}>
      <div key='a' className='border' data-grid={{ x: 0, y: 0, w: 1, h: 2, static: true }}>
        a
      </div>

      <div
        className='text- border'
        key='b'
        data-grid={{ x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 }}
      >
        b
      </div>
      <div className='border' key='c' data-grid={{ x: 4, y: 0, w: 1, h: 2 }}>
        c
      </div>
    </GridLayout>
  )
}

export default App

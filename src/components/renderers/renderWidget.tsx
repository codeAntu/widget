import { Widget } from '@/types'
import DataTable from './dataTable'
import Image from './image'
import Text from './Text'

function renderWidget(widget: Widget) {
  switch (widget.type) {
    case 'text-editor':
      return <Text text={widget.data.value} onChange={() => {}} />
    case 'image-display':
      return <Image src={widget.data.src} />
    case 'data-table':
      return <DataTable data={widget.data.data} />
    default:
      return null
  }
}

export default renderWidget

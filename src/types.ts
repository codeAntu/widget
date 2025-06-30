export type WidgetType = 'text-editor' | 'image-display' | 'data-table'

export interface Widget {
  id: string
  type: WidgetType
  x: number
  y: number
  w: number
  h: number
  data: any
}

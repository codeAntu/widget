import { Widget } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WidgetProject {
  name: string
  widgets: Widget[]
}

interface WidgetStore {
  projects: Record<string, WidgetProject>
  currentProject: string | null
  setCurrentProject: (name: string) => void
  createProject: (name: string) => void
  addWidget: (widget: Widget) => void
  setWidgets: (widgets: Widget[]) => void
  resetWidgets: (widgets: Widget[]) => void
}

export const useWidgetStore = create<WidgetStore>()(
  persist(
    (set, get) => ({
      projects: {},
      currentProject: null,
      setCurrentProject: (name: string) => set({ currentProject: name }),
      createProject: (name: string) =>
        set((state: WidgetStore) => ({
          projects: {
            ...state.projects,
            [name]: { name, widgets: [] },
          },
          currentProject: name,
        })),
      addWidget: (widget: Widget) =>
        set((state: WidgetStore) => {
          const project = state.currentProject
          if (!project) return {}
          const widgets = state.projects[project]?.widgets || []
          return {
            projects: {
              ...state.projects,
              [project]: {
                ...state.projects[project],
                widgets: [...widgets, widget],
              },
            },
          }
        }),
      setWidgets: (widgets: Widget[]) =>
        set((state: WidgetStore) => {
          const project = state.currentProject
          if (!project) return {}
          return {
            projects: {
              ...state.projects,
              [project]: {
                ...state.projects[project],
                widgets,
              },
            },
          }
        }),
      resetWidgets: (widgets: Widget[]) =>
        set((state: WidgetStore) => {
          const project = state.currentProject
          if (!project) return {}
          return {
            projects: {
              ...state.projects,
              [project]: {
                ...state.projects[project],
                widgets,
              },
            },
          }
        }),
    }),
    {
      name: 'widgets-projects-storage',
    },
  ),
)

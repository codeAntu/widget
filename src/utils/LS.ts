import { LocalStorage } from './localStorage'

type LS = 'widgets'

export const LS = new LocalStorage<LS>()

export class LocalStorage<T extends string> {
  map = new Map<T, string>()

  getItem(key: T) {
    if (this.map.has(key)) return this.map.get(key)
    const value = localStorage.getItem(key)
    if (value) this.map.set(key, value)
    return value
  }

  setItem(key: T, value: string) {
    this.map.set(key, value)
    localStorage.setItem(key, value)
  }

  removeItem(key: T) {
    this.map.delete(key)
    localStorage.removeItem(key)
  }
}

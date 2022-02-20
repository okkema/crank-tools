type Storage = {
  get: <T>(key: string) => T | null
  set: <T>(key: string, value: T) => boolean
  remove: (key: string) => boolean
  clear: () => void
}

const useStorage = (session = false): Storage => {
  const storage = session ? sessionStorage : localStorage
  return {
    get: (key) => {
      const value = storage.getItem(key)
      if (!value) return value
      try {
        return JSON.parse(value)
      } catch (error) {
        console.error(error)
        return null
      }
    },
    set: (key, value) => {
      try {
        storage.setItem(key, JSON.stringify(value))
        return true
      } catch (error) {
        console.error(error)
        return false
      }
    },
    remove: (key: string) => {
      const value = storage.getItem(key) ?? null
      if (value === null) return false
      storage.removeItem(key)
      return true
    },
    clear: () => storage.clear(),
  }
}

export default useStorage

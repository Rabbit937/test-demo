import { type PersistedStateOptions } from 'pinia-plugin-persistedstate'

const piniaPersistConfig = (key: string, paths?: string[]) => {
  const presist: PersistedStateOptions = {
    key,
    storage: localStorage,
    paths
  }

  return presist
}

export default piniaPersistConfig

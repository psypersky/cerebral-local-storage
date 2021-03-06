import StorageProviderError from './StorageProviderError'
export { default as StorageProviderError } from './StorageProviderError'

function StorageProvider(options = {}) {
  const target = options.target

  options.json = 'json' in options ? options.json : true
  options.prefix = options.prefix ? options.prefix + '.' : ''

  return {
    get(key) {
      const value = target.getItem(options.prefix + key)

      function resolveValue(value) {
        if (options.json && value) {
          return JSON.parse(value)
        }

        return value
      }

      if (value instanceof Promise) {
        return value.then(resolveValue).catch((error) => {
          throw new StorageProviderError(error)
        })
      }

      return resolveValue(value)
    },
    set(key, value) {
      const maybePromise =
        value === undefined
          ? target.removeItem(options.prefix + key)
          : target.setItem(
              options.prefix + key,
              options.json ? JSON.stringify(value) : value
            )

      if (maybePromise instanceof Promise) {
        return maybePromise.catch((error) => {
          throw new StorageProviderError(error)
        })
      }
    },
    remove(key) {
      const maybePromise = target.removeItem(options.prefix + key)

      if (maybePromise instanceof Promise) {
        return maybePromise.catch((error) => {
          throw new StorageProviderError(error)
        })
      }
    },
  }
}

export default StorageProvider

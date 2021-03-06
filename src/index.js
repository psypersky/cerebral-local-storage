import StorageProvider from './StorageProvider'

export { default as StorageProviderError } from './StorageProviderError'

export default (options) => {

  return ({ app, name }) => {
    app.once('initialized:model', () => {
      const targetStorage = options.target || localStorage

      Object.keys(options.sync || {}).forEach((syncKey) => {
        const value = targetStorage.getItem(options.prefix + syncKey)

        if (!value) {
          return
        }

        const path = options.sync[syncKey].split('.')
        app.model.set(path, options.json ? JSON.parse(value) : value) // Works on V5
      })
    })

    if (options.sync) { // Not tested
      app.on('flush', (changes) => {
        changes.forEach((change) => {
          Object.keys(options.sync).forEach((syncKey) => {
            if (change.path.join('.').indexOf(options.sync[syncKey]) === 0) {
              const value = app.getState(options.sync[syncKey])

              value === undefined
                ? options.target.removeItem(options.prefix + syncKey)
                : options.target.setItem(
                    options.prefix + syncKey,
                    options.json ? JSON.stringify(value) : value
                  )
            }
          })
        })
      })
    }

    return {
      providers: {
        [name]: StorageProvider(options),
      },
    }
  }

}

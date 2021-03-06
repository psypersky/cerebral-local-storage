function removeStorageFactory(key) {
  function removeStorage({ storage, resolve, path }) {
    const maybePromise = storage.remove(resolve.value(key))

    if (maybePromise instanceof Promise && path) {
      return maybePromise
        .then(() => path.success())
        .catch((error) => path.error({ error }))
    } else if (maybePromise instanceof Promise) {
      return maybePromise
    }
  }

  return removeStorage
}

export default removeStorageFactory

# @cerebral/storage

## Install

**NPM**

`npm install @cerebral/storage`

## Description

This module exposes local storage or session storage as a provider,
where it by default parses and serializes to JSON.

## Instantiate

```js
import { Module, Controller } from 'cerebral'
import StorageModule from '@cerebral/storage'

const storage = StorageModule({
  // instance of storage, can be window.localStorage / localStorage,
  // window.sessionStorage / sessionStorage, or asyncStorage on
  // react native. Async storage API is automatically managed
  target: localStorage,
  // Serializes and parses to JSON by default
  json: true,
  // Synchronize state when it changes
  sync: {
    someStorageKey: 'some.state.path'
  },
  // Set prefix for storagekey "somePrefix.someStorageKey"
  prefix: 'somePrefix'
})

const app = Module({
  modules: { storage }
})

const controller = Controller(app)
```

## error

### StorageProviderError

```js
import {StorageProviderError} from '@cerebral/storage'

// Error structure
{
  name: 'StorageProviderError',
  message: 'Some storage error'
  stack: '...'  
}
```

## get

Get data from storage.

_action_

```javascript
function someAction({ storage }) {
  // sync
  const value = storage.get('someKey')
  // async
  return storage.get('someKey').then((value) => ({ value }))
}
```

_operator_

```javascript
import { state, props } from 'cerebral/tags'
import { getStorage } from '@cerebral/storage/operators'

export default [
  // sync and async
  getStorage('someKey'),
  function someAction({ props }) {
    props.value // Whatever was on "someKey"
  }
]
```

## remove

Remove data from storage.

_action_

```javascript
function someAction({ storage }) {
  // sync
  storage.remove('someKey')
  // async
  return storage.remove('someKey')
}
```

_operator_

```javascript
import { state } from 'cerebral/tags'
import { removeStorage } from '@cerebral/storage/operators'

export default [
  // sync and async
  removeStorage(state`currentStorageKey`)
]
```

## set

Write data to storage.

_action_

```javascript
function someAction({ storage }) {
  // sync
  storage.set('someKey', { foo: 'bar' })
  // async
  return storage.set('someKey', { foo: 'bar' })
}
```

_operator_

```javascript
import { state, props } from 'cerebral/tags'
import { setStorage } from '@cerebral/storage/operators'

export default [
  // sync and async
  setStorage(state`currentStorageKey`, props`someData`)
]
```

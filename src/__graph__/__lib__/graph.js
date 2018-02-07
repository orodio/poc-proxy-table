import { bind } from './bind'
import { catchTile } from './tile'
import { catchLook } from './look'

export var graph = {}

const catchType = ctx => {
  const [ type ] = ctx.id.split('|')
  return { ...ctx, type }
}

const is$edge = ctx =>
  true
    && ctx != null
    && typeof ctx === 'object'
    && ctx.$edge != null

export const node = (id, xforms = []) => {
  const $node = bind([
    catchType,
    catchTile,
    catchLook,
    ...xforms,
  ])({ id })

  graph[id] = new Proxy($node, {
    get (target, key, reciever) {
      var value = Reflect.get(target, key)
      if (is$edge(value)) return graph[value.$edge]
      return value
    }
  })

  return graph[id]
}

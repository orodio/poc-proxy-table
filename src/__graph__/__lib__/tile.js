import { bind } from './bind'

const TILE = 'tile'

const isTile = ctx =>
  ctx.type === TILE

const catchMap = ctx => {
  if (!isTile(ctx)) return ctx
  const [ _type, map ] = ctx.id.split('|')
  return { ...ctx, map }
}

const catchX = ctx => {
  if (!isTile(ctx)) return ctx
  const [ _type, _map, x ] = ctx.id.split('|')
  return { ...ctx, x: Number(x) }
}

const catchY = ctx => {
  if (!isTile(ctx)) return ctx
  const [ _type, _map, _x, y ] = ctx.id.split('|')
  return { ...ctx, y: Number(y) }
}

const catchNorth = ctx => {
  if (!isTile(ctx)) return ctx
  const { type, map, x, y } = ctx
  return { ...ctx, north:{ $edge:[ type, map, x, y-1 ].join('|') } }
}

const catchEast = ctx => {
  if (!isTile(ctx)) return ctx
  const { type, map, x, y } = ctx
  return { ...ctx, east:{ $edge:[ type, map, x+1, y ].join('|') } }
}

const catchSouth = ctx => {
  if (!isTile(ctx)) return ctx
  const { type, map, x, y } = ctx
  return { ...ctx, south:{ $edge:[ type, map, x, y+1 ].join('|') } }
}

const catchWest = ctx => {
  if (!isTile(ctx)) return ctx
  const { type, map, x, y } = ctx
  return { ...ctx, west:{ $edge:[ type, map, x-1, y ].join('|') } }
}

export const catchTile = bind([
  catchMap,
  catchX,
  catchY,
  catchNorth,
  catchEast,
  catchSouth,
  catchWest,
])

export const cardinal = tile => [
  tile && tile,
  tile.north && tile.north,
  tile.east && tile.east,
  tile.south && tile.south,
  tile.west && tile.west,
].filter(Boolean)

const normalize = range =>
  Array.from(new Set(range.map(cardinal).reduce((a,b) => [...a, ...b])))

export const r1 = tile => normalize(cardinal(tile))
export const r2 = tile => normalize(r1(tile))
export const r3 = tile => normalize(r2(tile))
export const r4 = tile => normalize(r3(tile))
export const r5 = tile => normalize(r4(tile))
export const r6 = tile => normalize(r5(tile))
export const r7 = tile => normalize(r6(tile))
export const r8 = tile => normalize(r7(tile))
export const r9 = tile => normalize(r8(tile))
export const r10 = tile => normalize(r9(tile))

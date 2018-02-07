import { bind } from './bind'

const LOOK = 'look'

const isLook = ctx =>
  ctx.type === LOOK

const catchStyle = ctx => {
  if (!isLook(ctx)) return ctx
  const [_type, style] = ctx.id.split('|')
  return { ...ctx, style }
}

export const catchLook = bind([
  catchStyle,
])

export const $look = $edge => ctx => ({
  ...ctx,
  look: { $edge }
})

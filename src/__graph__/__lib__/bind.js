export const bind = (xforms = []) => ctx =>
  xforms.reduce((v,fn) => fn(v), ctx)

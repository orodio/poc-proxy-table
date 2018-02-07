import { node, graph } from './__lib__/graph'
import { $look } from './__lib__/look' 

const arr = Array.apply(null, { length: 20 }).map(Function.call, Number)
for (let x of arr) {
  for (let y of arr) {
    node(`tile|a|${x}|${y}`, [ $look('look|grass') ])
  }
}

const dirt = [
  '0|0', '1|0',
  '0|1', '1|1',
  '0|2', '1|2',
  '0|3', '1|3',
  '0|4', '1|4',
  '0|5', '1|5',
  '0|6', '1|6',
  '0|7', '1|7',
  '0|8', '1|8',
  '0|9', '1|9',
  '0|10', '1|10',
  '0|11', '1|11',
  '0|12', '1|12',
  '0|13', '1|13',
  '0|14', '1|14',
  '0|15', '1|15',
  '0|16', '1|16',
  '0|17', '1|17',
  '0|18', '1|18',
  '0|19', '1|19',

  '7|7',
  '15|3',
  '9|6',
  '3|9',
  '7|15',
  '6|7',
  '13|12',
]

for (let d of dirt) graph[`tile|a|${ d }`]['look'] = { $edge: 'look|dirt' }

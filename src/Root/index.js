import React from 'react'
import { graph } from '../__graph__'
import { cardinal, r1, r2, r3, r4, r5, r6, r7, r8, r9, r10 } from '../__graph__/__lib__/tile'
import styled from 'styled-components'

const NX = 11
const NY = 11
const TILE_SIZE = 36

const Svg = styled.svg`
  background:#303030;
  width:${TILE_SIZE * NX}px;
  height:${TILE_SIZE * NY}px;
  border:1px slid rgba(0,0,0,0.1);
  border-radius:3px;
`
const Tile = styled.rect`
  fill:rgba(255,255,255,0.1);
  ${ p => (p.look||{}).style === 'grass' && 'fill:green;' }
  ${ p => (p.look||{}).style === 'dirt' && 'fill:saddlebrown;' }
  ${ p => (p.look||{}).style === 'road' && 'fill:brown;' }
  width:${TILE_SIZE}px;
  height:${TILE_SIZE}px;
  stroke:#303030;
`

const Char = styled.path`
  fill:tomato;
`

const Character = ({ facing, transform }) =>
  <Char transform={transform} d={{
    NORTH: 'M18,12 L12,24 L24,24 Z',
    EAST: 'M24,18 L12,24 L12,12 Z',
    SOUTH: 'M18,24 L12,12 L24,12 Z',
    WEST: 'M12,18, L24,12 L24,24 Z',
  }[facing]}/>

const Label = styled.text`
  font-size:10;
  fill:#303030;
`

const Wrapper = styled.div`
  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`

const Controls = styled.div`
  margin-top:20px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`

const mtx = (x,y) =>
  `matrix(1,0,0,1,${x},${y})`

export class Root extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      n: graph['tile|a|0|0'],
      facing: 'NORTH'
    }
  }

  north = () => {
    if (this.state.n.north) this.setState({ n: this.state.n.north })
    this.setState({ facing: 'NORTH' })
  }

  east = () => {
    if (this.state.n.east) this.setState({ n: this.state.n.east })
    this.setState({ facing: 'EAST' })
  }

  south = () => {
    if (this.state.n.south) this.setState({ n: this.state.n.south })
    this.setState({ facing: 'SOUTH' })
  }

  west = () => {
    if (this.state.n.west) this.setState({ n: this.state.n.west })
    this.setState({ facing: 'WEST' })
  }

  componentDidMount () {
    document.addEventListener('keydown', e => {
      switch (e.keyCode) {
        case 38: return this.north()
        case 39: return this.east()
        case 40: return this.south()
        case 37: return this.west()
      }
    })
  }

  render () {
    const { n, facing } = this.state

    return <Wrapper>
      <Svg>
        <g transform={mtx(-(n.x - 5) * TILE_SIZE, -(n.y - 5) * TILE_SIZE)}>
          { r9(n).map(node =>
            <g key={node.id} transform={mtx(node.x * TILE_SIZE, node.y * TILE_SIZE)}>
              <Tile look={node.look}/>
            </g>
          )}
        </g>
        <Character facing={facing} transform={mtx(5 * TILE_SIZE, 5 * TILE_SIZE)}/>
      </Svg>
      <Controls>
        <div>
          <button onClick={this.north}>north</button>
        </div>
        <div>
          <button onClick={this.west}>west</button>
          <small>({ n.x },{ n.y })</small>
          <button onClick={this.east}>east</button>
        </div>
        <div>
          <button onClick={this.south}>south</button>
        </div>
      </Controls>
    </Wrapper>
  }
}

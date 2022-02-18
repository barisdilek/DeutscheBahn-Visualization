import React, { Component } from 'react'
import infrastructure from '../data/infrastructure.json';

export class Image extends Component {

  state = {
    data: infrastructure
  }

  getData() {
    this.setState({data : infrastructure})
  }

  componentDidMount() {
    this.getData();
  }
  SetPathId(i) {
    var nodes = this.state.data.tracks[i].nodes
    return "line"+ nodes[0] + nodes[1];
  }
  SetCircleId(i) {
    return "point"+ i;
  }
  SetPoints(i) {
    var nodes = this.state.data.tracks[i].nodes
    let pA = this.state.data.nodes[nodes[0]];
    let pB = this.state.data.nodes[nodes[1]];

    let pABDifX = (pA.x - pB.x) * -1;
    let pBBDifY = (pA.y - pB.y) * -1;

    return `M  ${pA.x} ${pA.y} l ${pABDifX} ${pBBDifY}`;
  }


  render() {
    return (
      <svg  viewBox="-540 -128 1080 256" >
        {Object.keys(this.state.data.tracks).map((i) => (
          <path id={this.SetPathId(i)} d={this.SetPoints(i)} stroke="black" strokeWidth="2" fill="none" />
        ))}
        <g stroke="black" strokeWidth="2" fill="blue">
        {Object.keys(this.state.data.nodes).map((i) => (
          <circle id={this.SetCircleId(i)} cx={this.state.data.nodes[i].x} cy={this.state.data.nodes[i].y} r="4" />
        ))}
        </g>
        {/* <g fontSize="22" fontFamily="sans-serif" fill="black" stroke="none" text-anchor="middle">
        {Object.keys(this.state.data.nodes).map((i) => (
          <text x={this.state.data.nodes[i].x} y={this.state.data.nodes[i].y} dy="40">{i}</text>
        ))}
        </g> */}
      </svg>
    )
  }
}

export default Image;

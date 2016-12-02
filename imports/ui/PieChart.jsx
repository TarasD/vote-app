import React, { Component } from 'react';

import Arc from './Arc';

export default class PieChart extends Component {
  constructor() {
    super();
    this.pie = d3.layout.pie()
        .value((d) => d);
    // this.colors = d3.scale.category20();
    this.colors = d3.scale.ordinal()
        .range(["red", "green"]);
  }

  arcGenerator(d, i) {
    return (
        <Arc key={`arc-${i}`}
                    data={d}
                    innerRadius={this.props.innerRadius}
                    outerRadius={this.props.outerRadius}
                    color={this.colors(i)} />
    );
  }

  render() {
    let pie = this.pie(this.props.data),
        translate = `translate(${this.props.x}, ${this.props.y})`;
    return (
        <g transform={translate}>
          {pie.map((d, i) => this.arcGenerator(d, i))}
        </g>
    )
  }
}

import React, { Component } from 'react';
import {Motion, spring} from 'react-motion';

export default class PieChart extends Component {
  constructor(props) {
    super(props);
    this.arc = d3.svg.arc()
        .innerRadius(props.innerRadius)
        .outerRadius(props.outerRadius);

    this.pie = d3.layout.pie()
        .value((d) => d);
    // this.colors = d3.scale.category20();
    this.colors = d3.scale.ordinal()
        .range(["green", "red"]);
  }

  arcGenerator(d, i) {
    // let springParams = { stiffness: 300, damping: 6 };
    return (
        <Motion
            key={i}
            defaultStyle={{
              startAngle: d.startAngle,
              endAngle: d.endAngle,
              padAngle: d.padAngle,
            }}
            style={{
              startAngle: spring(d.startAngle),
              endAngle: spring(d.endAngle),
              padAngle: spring(d.padAngle)
            }}>
          {value => <path
              fill={this.colors(i)}
              d={this.arc(value)}/>}
        </Motion>

    );

    // <path key={`arc-${i}`}
    //       d={this.arc(d)}
    //       style={{fill: this.colors(i)}}>
    // </path>
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

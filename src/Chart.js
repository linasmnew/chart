import React, { Component } from "react";
import Raphael from "raphael";

const CHART_GUTTER = 20;
const yAxisCordinates = {
  x: 10,
  y: 24
};
const xAxisTextCordinates = {
  x: 25,
  y: 10
};

class Chart extends Component {
  constructor(props) {
    super(props);
    this.xAxisShapeCordinates = {
      x: 70,
      y: 20 * this.props.json.yAxis.length, // shape's height x number of elements
      w: 50,
      h: 20
    };

    this.canvasHeight =
      this.xAxisShapeCordinates.h * this.props.json.yAxis.length + 20;

    this.canvasWidth =
      this.props.json.xAxis.length * this.xAxisShapeCordinates.x +
      this.xAxisShapeCordinates.x -
      this.xAxisShapeCordinates.w;
  }

  componentDidMount() {
    // Create a canvas
    this.paper = Raphael(this.el, this.canvasWidth, this.canvasHeight);
    this.paper.canvas.style.backgroundColor = "#eee";

    // Setup y-axis
    this.yAxis = this.paper.set();
    this.constructYAxis();

    // Setup x-axis
    this.xAxisShapes = this.paper.set();
    this.xAxisText = this.paper.set();
    this.constructXAxis();
  }

  /*
   On new props, update cordinates and axis's
  */
  componentDidUpdate() {
    this.updateCordinates();
    this.constructYAxis();
    this.constructXAxis();
  }

  render() {
    return (
      <div
        style={{
          float: "left",
          verticalAlign: "top"
        }}
        ref={input => {
          this.el = input;
        }}
      />
    );
  }

  updateCordinates() {
    this.xAxisShapeCordinates.y =
      this.xAxisShapeCordinates.h * this.props.json.yAxis.length; // shape's height x number of elements

    this.paper.setSize(
      this.props.json.xAxis.length * this.xAxisShapeCordinates.x +
        this.xAxisShapeCordinates.x -
        this.xAxisShapeCordinates.w,
      this.xAxisShapeCordinates.h * this.props.json.yAxis.length + 20
    );
  }

  constructYAxis() {
    if (this.yAxis) {
      this.yAxis.remove();
      this.yAxis = this.paper.set();
    }

    this.props.json.yAxis.forEach((element, index) => {
      if (index == 0) {
        this.yAxis.push(
          this.paper.text(
            yAxisCordinates.x,
            this.xAxisShapeCordinates.y +
              this.xAxisShapeCordinates.h -
              yAxisCordinates.y,
            element
          )
        );
      } else {
        this.yAxis.push(
          this.paper.text(
            yAxisCordinates.x,
            this.xAxisShapeCordinates.y +
              this.xAxisShapeCordinates.h -
              this.xAxisShapeCordinates.h * index -
              yAxisCordinates.y,
            element
          )
        );
      }
    });
  }

  constructXAxis() {
    if (this.xAxisShapes && this.xAxisText) {
      this.xAxisShapes.remove();
      this.xAxisText.remove();
      this.xAxisShapes = this.paper.set();
      this.xAxisText = this.paper.set();
    }

    this.props.json.xAxis.forEach((data, index) => {
      this.xAxisText.push(
        this.paper.text(
          index == 0
            ? this.xAxisShapeCordinates.x - xAxisTextCordinates.x
            : this.xAxisShapeCordinates.x -
              xAxisTextCordinates.x +
              index * this.xAxisShapeCordinates.x,
          this.xAxisShapeCordinates.y +
            this.xAxisShapeCordinates.h -
            xAxisTextCordinates.y,
          data.label
        )
      );

      this.xAxisShapes.push(
        this.paper
          .rect(
            index == 0
              ? this.xAxisShapeCordinates.x - this.xAxisShapeCordinates.w
              : this.xAxisShapeCordinates.x * index + CHART_GUTTER,
            this.xAxisShapeCordinates.y - this.xAxisShapeCordinates.h,
            this.xAxisShapeCordinates.w,
            this.xAxisShapeCordinates.h
          )
          .attr({ fill: "#ccc", stroke: "none" })
          .transform(
            `r180,t0,${(this.xAxisShapeCordinates.h * data.value -
              this.xAxisShapeCordinates.h) /
              // dividing by 2 because sizing is done from the shapes center
              2},s1,${data.value}`
          )
      );
    });
  }
}

export default Chart;

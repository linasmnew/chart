import React, { Component } from "react";
import Chart from "./Chart";

class App extends Component {
  state = {
    json: {
      yAxis: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      xAxis: [
        { label: "a", value: 1 },
        { label: "b", value: 2 },
        { label: "c", value: 3 },
        { label: "d", value: 4 },
        { label: "e", value: 5 }
      ]
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      json: JSON.parse(e.target.chartdata.value)
    });
  };

  render() {
    return (
      <div className="wrapper">
        <form onSubmit={this.handleSubmit}>
          <textarea name="chartdata" spellCheck="false">
            {JSON.stringify(this.state.json)}
          </textarea>
          <input type="submit" value="Update" />
        </form>
        <Chart json={this.state.json} />
      </div>
    );
  }
}

export default App;

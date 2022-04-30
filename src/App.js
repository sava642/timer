
import React from 'react';

export default class App extends React.Component {
  state = {
    count: 1,
    isCounting: false,
  };
  myTimer = null;
  handleStart = () => {

    this.myTimer = setInterval(() => (
      this.setState({ count: this.state.count += 1 })

    ), 1000)
    this.setState({ isCounting: true })
  }
  handleStop = () => {
    this.setState({ isCounting: false })
    clearInterval(this.myTimer);
  }
  handleReset = () => {
    localStorage.removeItem('timerStorage')
    this.setState({ count: 0, isCounting: false })
  }


  componentDidMount() {
    const tmrStrg = localStorage.getItem('timerStorage')
    console.log("страница обновилась")
    if (tmrStrg) {
      this.setState({ count: this.state.count = +tmrStrg })
    }
  }


  componentDidUpdate() {
    localStorage.setItem('timerStorage', this.state.count)
  }

  componentWillUnmount() {
    console.log("демонтирование")
    clearInterval(this.myTimer);
  }


  render() {
    return (
      <div className="app">
        <h1>React Timer</h1>
        <h3>{this.state.count}</h3>
        {!this.state.isCounting ? (
          <button onClick={this.handleStart}>Start</button>
        ) : (
          <button onClick={this.handleStop}>Stop</button>
        )}
        <button onClick={this.handleReset}>Reset</button>
      </div>
    );
  }
}


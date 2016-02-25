"use strict"

import React from 'react'
import * as helper from '../helpers.js'

class Timer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      timerIsRunning: false,
      secondsLeft: 300
    }
  }

  startTimer() {
    if (!this.state.timerIsRunning) {
      let timer = setInterval(() => {
        if (this.state.secondsLeft > 0) {
          this.setState({
            secondsLeft: this.state.secondsLeft - 1
          })
        } else {
          alert('out of time!')
          clearInterval(timer)
          this.setState({
            secondsLeft: 300
          })
        }
      }, 1000)
    }
  }

  render() {

    return (
      <div>
        <div>{helper.displayAsMinutes(this.state.secondsLeft)}</div>
        <button onClick={() => this.startTimer()}>Start Timer (5 Min)</button>
      </div>
    )

  }
}

export default Timer

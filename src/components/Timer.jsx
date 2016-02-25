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

  componentWillMount() {
    document.addEventListener("keypress", (e) => this.handleKeypress(e, this))
  }

  handleKeypress(e, _this) {
    if (e.code == "KeyQ") {
      _this.stopTimer()
    }
  }

  startTimer() {
    this.setState({
      secondsLeft: 300
    })

    let timer = setInterval(() => {
      if (!this.state.timerIsRunning && this.state.secondsLeft != 300) {
        clearInterval(timer)
      } else if (this.state.secondsLeft > 0) {
        this.tickTimer()
      } else {
        alert('out of time!')
        clearInterval(timer)
        this.setState({
          timerIsRunning: false
        })
      }
    }, 1000)
  }

  tickTimer() {
    this.setState({
      secondsLeft: this.state.secondsLeft - 1,
      timerIsRunning: true
    })
  }

  stopTimer() {
    this.setState({
      timerIsRunning: false
    })
  }

  displayTimer() {
    if (this.state.timerIsRunning) {
      return (
        <div className="timer">
          {helper.displayAsMinutes(this.state.secondsLeft)}
          <h4>press "Q" to quit</h4>
        </div>
      )
    } else {
      return null
    }
  }

  render() {

    return (
      <div>
        { this.displayTimer() }
        <button
          className="timerButton"
          onClick={() => this.startTimer()}>Start Timer (5 Min)</button>
      </div>
    )

  }
}

export default Timer

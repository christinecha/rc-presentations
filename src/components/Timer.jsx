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
      _this.stopMusic()
    }
  }

  startTimer() {
    this.setState({
      secondsLeft: 300
    })

    let audio = document.getElementById("timerMusic")
    audio.src = helper.randomMusicFile()

    let timer = setInterval(() => {
      if (!this.state.timerIsRunning && this.state.secondsLeft != 300) {
        clearInterval(timer)
      } else if (this.state.secondsLeft > 0) {
        this.tickTimer()
      } else {
        this.playMeOff()
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

  playMeOff() {
    let audio = document.getElementById("timerMusic")
    audio.play()
    audio.volume = 0

    let increaseVol = setInterval(() => {
      if (audio.volume >= 0.9) {
        clearInterval(increaseVol)
      } else {
        audio.volume = audio.volume + 0.1
        console.log('inc', audio.volume)
      }
    }, 3000)

    setTimeout(() => {
      let decreaseVol = setInterval(() => {
        if (audio.volume <= 0.1) {
          clearInterval(decreaseVol)
        } else {
          audio.volume = audio.volume - 0.1
          console.log('dec', audio.volume)
        }
      }, 3000)
    }, 40000)
  }

  stopMusic() {
    let audio = document.getElementById("timerMusic")
    audio.pause()
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
      <div className="timerContainer">
        { this.displayTimer() }
        <button
          className="timerButton"
          onClick={() => this.startTimer()}>Start Timer (5 Min)</button>
        <h5>press "Q" to stop the music, too</h5>
      </div>
    )

  }
}

export default Timer

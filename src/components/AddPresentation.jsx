"use strict"

import React from 'react'
import Firebase from 'firebase'
let ref = new Firebase("https://rc-presentations.firebaseio.com/")


class AddPresentation extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      titleInput: "",
      presenterInput: "",
      notice: ""
    }
  }

  updateInput(label, e) {
    let newInputObj = {}
    newInputObj[label] = e.target.value
    this.setState(newInputObj)
  }

  addEntryInFirebase(e) {
    if (document.getElementsByClassName("presentation").length >= 9) {
      e.preventDefault()
      this.displayNotice("aw gee, it's all booked!")
    } else if (this.state.presenterInput.length > 0) {
      ref.child("presentations").push({
        title: this.state.titleInput,
        presenter: this.state.presenterInput,
        lastUpdated: Firebase.ServerValue.TIMESTAMP
      })
    } else {
      e.preventDefault()
      this.displayNotice("Please add your name")
    }
  }

  displayNotice(msg) {
    this.setState({
      notice: msg
    })
    setTimeout(() => {
      this.setState({
        notice: ""
      })
    }, 1000)
  }

  getNotice() {
    if (this.state.notice.length > 0) {
      return (
        <div className="notice">
          {this.state.notice}
        </div>
      )
    } else {
      return null
    }
  }

  render() {
    let entryData = {
      title: this.state.titleInput,
      presenter: this.state.presenterInput,
      lastUpdated: Firebase.ServerValue.TIMESTAMP
    }

    return (
      <form>
        <input
          className="title"
          placeholder="presentation title"
          value={this.state.titleInput}
          onChange={(e) => this.updateInput("titleInput", e)} />
        <input
          placeholder="Your Name"
          value={this.state.presenterInput}
          onChange={(e) => this.updateInput("presenterInput", e)} />
        <button onClick={(e) => this.addEntryInFirebase(e)}>ADD</button>
        { this.getNotice() }
      </form>
    )
  }
}

export default AddPresentation

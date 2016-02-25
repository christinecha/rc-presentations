"use strict"

import React from 'react'
import Firebase from 'firebase'
let ref = new Firebase("https://rc-presentations.firebaseio.com/")


class Presentation extends React.Component {

  constructor(props) {
    super(props)
    const { presenter, title } = props.presentation

    this.state = {
      titleInput: title,
      presenterInput: presenter,
      notice: ""
    }
  }

  updateInput(label, e) {
    let newInputObj = {}
    newInputObj[label] = e.target.value

    this.setState(newInputObj)
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

  updateEntryInFirebase(e) {
    if (this.state.presenterInput.length > 0) {
      ref.child("presentations").child(this.props.index).update({
        title: this.state.titleInput,
        presenter: this.state.presenterInput,
        lastUpdated: Firebase.ServerValue.TIMESTAMP
      })
      this.displayNotice("updated entry")
    } else {
      e.preventDefault()
      this.displayNotice("please add your name")
    }
  }

  removeEntryInFirebase() {
    ref.child("presentations").child(this.props.index).remove()
    location.reload()
  }

  render() {
    const {
      index,
      presentation
    } = this.props

    return (
      <div className="presentation">
        <input
          className="title"
          placeholder="Untitled"
          value={this.state.titleInput}
          onChange={(e) => this.updateInput("titleInput", e)} />
        <input
          value={this.state.presenterInput}
          onChange={(e) => this.updateInput("presenterInput", e)} />
        <button
          onClick={(e) => this.updateEntryInFirebase(e)}>UPDATE</button>
        <button
          className="remove"
          onClick={() => this.removeEntryInFirebase()}>REMOVE</button>
        { this.getNotice() }
      </div>
    )
  }
}

export default Presentation

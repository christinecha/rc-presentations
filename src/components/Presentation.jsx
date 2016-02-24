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
      presenterInput: presenter
    }
  }

  updateInput(label, e) {
    let newInputObj = {}
    newInputObj[label] = e.target.value

    this.setState(newInputObj)
  }

  updateEntryInFirebase() {
    ref.child("presentations").child(this.props.index).update({
      title: this.state.titleInput,
      presenter: this.state.presenterInput
    })
  }

  render() {
    const {
      index,
      presentation,
      updateEntry
    } = this.props

    let entryData = {
      title: this.state.titleInput,
      presenter: this.state.presenterInput
    }

    return (
      <div>
        <input
          value={this.state.titleInput}
          onChange={(e) => this.updateInput("titleInput", e)} />
        <input
          value={this.state.presenterInput}
          onChange={(e) => this.updateInput("presenterInput", e)} />
        <button onClick={() => this.updateEntryInFirebase()}>UPDATE</button>
      </div>
    )
  }
}

export default Presentation

"use strict"

import React from 'react'
import { connect } from 'react-redux'
import * as action from '../actions.js'
import * as helper from '../helpers.js'
import Presentation from './Presentation.jsx'
import AddPresentation from './AddPresentation.jsx'
import Timer from './Timer.jsx'

export class PresentationsApp extends React.Component {

  getPresentations() {
    const { data } = this.props

    let presentationSlots = []

    if (data && Object.keys(data)) {
      presentationSlots = Object.keys(data)
    }

    return presentationSlots.map((key, i) => {
      return (
        <Presentation
          key={i}
          index={key}
          presentation={data[key]} />
      )
    })
  }

  render() {
    const { data } = this.props

    return (
      <div>
        <img src="./src/assets/rc_logo.png" />
        <h2>Thursday Presentations at RC</h2>
        <div className="presentations">
          { this.getPresentations() }
          <hr />
          <AddPresentation />
        </div>
        <Timer />
      </div>
    )
  }
}

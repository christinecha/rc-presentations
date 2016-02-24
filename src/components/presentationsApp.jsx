"use strict"

import React from 'react'
import { connect } from 'react-redux'
import * as action from '../actions.js'
import Presentation from './Presentation.jsx'

export class PresentationsApp extends React.Component {

  getPresentations(presentations) {
    const { data } = this.props
    console.log(data)

    return data.map((presentation, i) => {
      return (
        <Presentation
          key={i}
          index={i}
          presentation={presentation} />
      )
    })
  }

  render() {
    const { data } = this.props

    return (
      <div>
        { this.getPresentations(data) }
      </div>
    )
  }
}

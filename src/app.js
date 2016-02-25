"use strict"

import React from 'react'
import ReactDOM from 'react-dom'
import Firebase from 'firebase'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducer.js'
import * as action from './actions.js'
import { PresentationsApp } from './components/presentationsApp.jsx'

const ref = new Firebase("https://rc-presentations.firebaseio.com/")
let today = new Date()
let todayUnix = today.getTime()
let last12Hours = todayUnix - (1000 * 60 * 60 * 12)

ref.child("presentations").orderByChild("lastUpdated").startAt(last12Hours).once("value", (snapshot) => {

  ReactDOM.render(
    <PresentationsApp data={snapshot.val()} />,
    document.getElementById('presentationsApp')
  )

})

"use strict"

import React from 'react'
import ReactDOM from 'react-dom'
import Firebase from 'firebase'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducer from './reducer.js'
import * as action from './actions.js'

import { PresentationsApp } from './components/presentationsApp.jsx'

// const store = createStore(reducer)
const ref = new Firebase("https://rc-presentations.firebaseio.com/")

ref.on("child_added", (snapshot) => {

  // store.dispatch({
  //   type: 'SET_INITIAL_STATE',
  //   data: snapshot.val()
  // })

  ReactDOM.render(
    <PresentationsApp data={snapshot.val()} />,
    document.getElementById('presentationsApp')
  )

})

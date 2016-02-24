"use strict"

import Firebase from 'firebase'
let ref = new Firebase("https://rc-presentations.firebaseio.com/")


export const updateEntryInFirebase = (path, value) => {

  path.update(value, () => {
    ref.once("value", (snapshot) => {

      let data = snapshot.val()

      console.log('resolved')
      return ({
        type: 'UPDATE_ENTRY',
        data: data
      })

    })
  })

}

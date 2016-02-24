"use strict"

import * as helper from './helpers.js'

export const UPDATE_ENTRY = (path, value) => {

  return helper.updateEntryInFirebase(path, value)

}

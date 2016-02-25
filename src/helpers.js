"use strict"

export const displayAsMinutes = (timeInSeconds) => {
  let minutes = Math.floor(timeInSeconds / 60)
  let seconds = timeInSeconds % 60
  let timeString = fixedNumOfDigits(minutes, 2) + ':' + fixedNumOfDigits(seconds, 2)

  return timeString
}

export const fixedNumOfDigits = (value, numOfDigits) => {
  let stringifiedValue = value.toString()
  let finalDisplay = ''

  if (stringifiedValue.length < numOfDigits) {
    for (let i = 0; i < numOfDigits - stringifiedValue.length; i++) {
      finalDisplay += '0'
    }
    finalDisplay += stringifiedValue
  } else {
    finalDisplay = stringifiedValue
  }

  return finalDisplay
}

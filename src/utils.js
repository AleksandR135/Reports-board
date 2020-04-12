export const getNewFilterState = (filter, name, isChecked) => {
  const idx = filter.indexOf(name)
  const isFound = idx !== -1

  let newState

  if (isFound && !isChecked) {
    newState = [...filter]
    newState.splice(idx, 1)
  } else if (!isFound && isChecked) {
    newState = [...filter, name]
  }

  return newState
}

export const getOptions = (reportList, property) => {
  const languageMap = reportList.reduce((acc, report) => {
    acc[report[property]] = true
    return acc
  }, {})

  return Object.keys(languageMap)
}
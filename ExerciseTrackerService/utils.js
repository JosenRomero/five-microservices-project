export const dateToTimestamp = (date) => {

  let mydate = (date.includes("-")) ? date.replaceAll("-", ",") : date

  return Date.parse(mydate)

}

export const formatDate = (date) => {

  const formattedDate = (date) ? new Date(date.replaceAll("-", ",")).toDateString() : new Date().toDateString()

  const timestamps = dateToTimestamp(formattedDate)

  return { formattedDate, timestamps }

}

export const checkFiltersForLogs = (obj) => {

  const { from, to, _id } = obj;

  let filters = { userID: _id  }

  let fromValue = (from) ? { $gte: dateToTimestamp(from) } : null
  let toValue = (to) ? { $lte: dateToTimestamp(to) } : null

  if(fromValue || toValue) filters.timestamps = { ...fromValue, ...toValue }

  return filters

}

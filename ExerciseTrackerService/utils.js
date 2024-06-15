
export const formatDate = (date) => {

  const formattedDate = (date) ? new Date(date.replaceAll("-", ",")).toDateString() : new Date().toDateString()

  const timestamps = Date.parse(formattedDate)

  return { formattedDate, timestamps }

}

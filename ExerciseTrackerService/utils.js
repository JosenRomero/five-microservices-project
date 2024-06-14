
export const formatDate = (date) => new Date(date.replaceAll("-", ",")).toDateString()

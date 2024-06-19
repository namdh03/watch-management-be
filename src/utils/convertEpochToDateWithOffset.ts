const convertEpochToDateWithOffset = (epoch: number) => {
  const date = new Date(epoch * 1000)
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
}

export default convertEpochToDateWithOffset

interface Result {
  success: boolean
  errMsg?: string
  data: any
}

export const getResult = (data: any, errMsg?: string): Result => {
  if (errMsg) {
    return {
      success: false,
      errMsg,
      data,
    }
  }
  return {
    success: true,
    data,
  }
}

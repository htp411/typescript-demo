interface Result {
  success: boolean
  code: number
  errMsg?: string
  data: any
}

export const getResult = (data: any, code: number, errMsg?: string): Result => {
  if (errMsg) {
    return {
      success: false,
      errMsg,
      data,
      code,
    }
  }
  return {
    success: true,
    data,
    code,
  }
}

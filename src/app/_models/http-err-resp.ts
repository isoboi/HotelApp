export interface HttpErrResp {
  code: string,
  message: string,
  details: string,
  data: {
    additionalProp1: string,
    additionalProp2: string,
    additionalProp3: string
  },
  validationErrors: Array<HttpValidationError>
}

interface HttpValidationError {
  message: string,
  members: Array<string>
}

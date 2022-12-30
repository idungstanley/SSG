export interface selectedUserType {
  id: string
  name?: string
}

export interface formikConfig {
  initValues: {
    email: string
    password: string
  }
  validationSchema: {
    email?: string
    password?: string
  }
  buttonTitle: string
}
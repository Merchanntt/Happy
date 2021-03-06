import {ErrorRequestHandler} from 'express'
import { ValidationError } from 'yup'

interface validationError {
  [key: string]: string[];
}

const errors: ErrorRequestHandler = (error, request, response, next) => {
  if(error instanceof ValidationError) {
    let errors: validationError = {}

    error.inner.forEach(err => {
      errors[err.path] = err.errors;
    })

    return response.status(400).json({  message: 'Validation error', errors })
  }

  console.error(error)

  return response.status(500).json({ message: 'internal server error'})
}

export default errors;
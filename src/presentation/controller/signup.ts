import { HttpRequest,HttpResponse } from "../protocols/http"
import { MissingParamError,InvalidParamError,ServerError } from "../errors"
import { badrequest, serverError } from "../helpers/http-helper"
import { Controller } from "../protocols/controller"
import { EmailValidator } from "../protocols/interface"
export class SignUpController implements Controller{
  private readonly emailValidator: EmailValidator
  
  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle(httpRequest: HttpRequest):HttpResponse{
    try {  
    const requiredField = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredField) { 
      if (!httpRequest.body[field]) { 
        return badrequest(new MissingParamError(field))
      }
    }
    const isValid = this.emailValidator.isValid(httpRequest.body.email)
    if (!isValid) {
      return badrequest(new InvalidParamError('email'))
    }
    } catch (error) {
      return serverError()
    }
  }
}
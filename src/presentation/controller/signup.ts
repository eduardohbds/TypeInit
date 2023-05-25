import { HttpRequest,HttpResponse } from "../protocols/http"
import { MissingParamError } from "../errors/missing-error-params"
import { badrequest } from "../helpers/http-helper"
import { Controller } from "../protocols/controller"
import { EmailValidator } from "../protocols/interface"
import { InvalidParamError } from "../errors/invalid-error-params"
export class SignUpController implements Controller{
  private readonly emailValidator: EmailValidator
  
  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle(httpRequest: HttpRequest):HttpResponse{
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
  }
}
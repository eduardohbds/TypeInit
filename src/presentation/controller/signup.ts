import { HttpRequest,HttpResponse } from "../protocols/http"
import { MissingParamError } from "../errors/missing-error-params"
import { badrequest } from "../helpers/http-helper"
import { Controller } from "../protocols/controller"
export class SignUpController implements Controller{
  handle(httpRequest: HttpRequest):HttpResponse{
    const requiredField = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredField) { 
      if (!httpRequest.body[field]) { 
        return badrequest(new MissingParamError(field))
      }
    }
  }
}
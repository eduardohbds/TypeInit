import { HttpRequest,HttpResponse } from "../protocols/http"
import { MissingParamError } from "../errors/missing-error-params"
import { badrequest } from "../helpers/http-helper"
export class SignUpController{
  handle(httpRequest: HttpRequest):HttpResponse{
    if (!httpRequest.body.name) { 
      return badrequest(new MissingParamError('name'))
    }
    if (!httpRequest.body.email) { 
      return badrequest(new MissingParamError('email'))
    }
  }
}
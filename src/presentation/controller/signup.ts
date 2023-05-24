import { HttpRequest,HttpResponse } from "../protocols/http"
import { MissingParamError } from "../errors/missing-error-params"
import { badrequest } from "../helpers/http-helper"
export class SignUpController{
  handle(httpRequest: HttpRequest):HttpResponse{
    const requiredField=['name','email']
    for (const field of requiredField) { 
      if (!httpRequest.body[field]) { 
        return badrequest(new MissingParamError(field))
      }
    }

  }
}
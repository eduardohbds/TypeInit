import { ServerError } from "../errors/server-error-params";
import { HttpResponse } from "../protocols/http";
export function badrequest(error:Error):HttpResponse {
  return {
    statusCode: 400,
    body: error,
  }
}
export function serverError():HttpResponse {
  return {
    statusCode: 500,
    body: new ServerError,
  }
}
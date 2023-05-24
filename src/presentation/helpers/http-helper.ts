import { HttpResponse } from "../protocols/http";
export function badrequest(error:Error):HttpResponse {
  return {
    statusCode: 400,
    body: error,
  }
}
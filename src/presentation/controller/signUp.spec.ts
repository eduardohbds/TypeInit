import { SignUpController } from "./signup"
import { MissingParamError, InvalidParamError, ServerError } from "../errors"
import { EmailValidator } from "../protocols/interface"

export interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator

}

const makeEmailValidator = () => {
  class EmailValidatorStub implements EmailValidator {
    isValid(value: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}
const makeEmailValidatorWithError = () => {
  class EmailValidatorStub implements EmailValidator {
    isValid(value: string): boolean {
      throw new Error()
    }
  }
  return new EmailValidatorStub()
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const sut = new SignUpController(emailValidatorStub);
  return {
    sut,
    emailValidatorStub
  }
}

describe('SignUp Controller', () => {
  test('should return 400 if no name is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })
})

describe('SignUp Controller', () => {
  test('should return 400 if no email is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
})

describe('SignUp Controller', () => {
  test('should return 400 if no password is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        passwordConfirmation: 'any_password',
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })
})

describe('SignUp Controller', () => {
  test('should return 400 if no passwordConfirmation is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })
})

describe('SignUp Controller', () => {
  test('should return 400 if invalid email is provided', () => {
    const { sut,emailValidatorStub } = makeSut()
    //uma maneira de mockar uma função ou metodo 
    jest.spyOn(emailValidatorStub,'isValid').mockReturnValue(false)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })
})

describe('SignUp Controller', () => {
  test('Should call EmailValidator with correct email', () => {
    const { sut,emailValidatorStub } = makeSut()
    const isValidspy = jest.spyOn(emailValidatorStub,'isValid')
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      }
    }
    sut.handle(httpRequest)
    expect(isValidspy).toHaveBeenCalledWith('email@mail.com')
  })
})

describe('SignUp Controller', () => {
  test('should return 500 if throws a error', () => {

    const emailValidatorStub = makeEmailValidatorWithError()
    const sut = new SignUpController(emailValidatorStub);
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})
import { API_PATH } from '@api/constant';
import { privateRequest, request } from '@api/request';
import { ForgetResetFormSchema } from '@components/Authentication/Forms/Schema/forget-reset';
import { LoginFormSchema } from '@components/Authentication/Forms/Schema/login';
import { RegisterFormSchema } from '@components/Authentication/Forms/Schema/register';
import { Remember } from '@custom-types/otp';

import { ForgetResponsePayload, LoginResponsePayload, OtpType, RegisterResponsePayload } from './auth.type';

export const loginService = (values: LoginFormSchema) => {
  return privateRequest<LoginResponsePayload>(request.post, API_PATH.AUTH_LOGIN, {
    data: {
      username: values.username,
      password: values.password
    }
  })
}

export const registerService = (values: RegisterFormSchema) => {
  return privateRequest<RegisterResponsePayload>(request.post, API_PATH.AUTH_REGISTER, {
    data: {
      username: values.username,
      email: values.email,
      password: values.password
    }
  })
}

export const activateService = (otpData: Remember, verification_code: string) => {
  return privateRequest<null>(request.post, API_PATH.AUTH_ACTIVATE, {
    data: {
      authId: otpData.user_id,
      hashCode: otpData.hash_code,
      verificationCode: verification_code
    }
  })
}

export const resendActivateService = (email: string, auth_id: number) => {
  return privateRequest<RegisterResponsePayload>(request.post, API_PATH.AUTH_RESEND_OTP, {
    data: {
      email,
      authId: auth_id,
      type: OtpType.Register
    }
  })
}

export const forgetPasswordService = (email: string) => {
  return privateRequest<ForgetResponsePayload>(request.post, API_PATH.AUTH_FORGET_PASSWORD, {
    data: {
      email
    }
  })
}

export const forgetConfirmPasswordService = (hash_code: string, verification_code: string) => {
  return privateRequest<ForgetResponsePayload>(request.post, API_PATH.AUTH_CONFIRM_FORGET_PASSWORD, {
    data: {
      hashCode: hash_code,
      verificationCode: verification_code
    }
  })
}

export const forgetResetPasswordService = (otpData: Remember, values: ForgetResetFormSchema) => {
  return privateRequest<null>(request.post, API_PATH.AUTH_RESET_PASSWORD, {
    data: {
      hashCode: otpData.hash_code,
      newPassword: values.password,
      verificationCode: otpData.verification_code
    }
  })
}

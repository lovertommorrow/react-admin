import { createElement } from "react";

import PasswordLogin from "@/pages/login/components/password-login";
import CodeLogin from "@/pages/login/components/code-login";
import RegisterPassword from "@/pages/login/components/register-password";
import ForgetPassword from "@/pages/login/components/forget-password";


export const FORM_COMPONENT_MAP = {
  login: createElement(PasswordLogin),
  register: createElement(RegisterPassword),
  forgotPassword: createElement(ForgetPassword),
  codeLogin: createElement(CodeLogin),
};

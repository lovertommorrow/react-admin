import { createElement } from "react";

import PasswordLogin from "./components/password-login";
import CodeLogin from "./components/code-login";
import RegisterPassword from "./components/register-password";
import ForgetPassword from "./components/forget-password";


export const FORM_COMPONENT_MAP = {
  login: createElement(PasswordLogin),
  register: createElement(RegisterPassword),
  forgotPassword: createElement(ForgetPassword),
  codeLogin: createElement(CodeLogin),
};

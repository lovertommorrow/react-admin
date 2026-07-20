
import request from "@/utils/request";
import type { LoginInfo } from "./types";

const USER_API = "/user";

export const getUserInfo = () => {
  return request({
    url: USER_API,
    method: "get",
  });
};


export const login = (data: LoginInfo) => {
  return request({
    url: `/auth/login`,
    method: "post",
    data,
  })
};

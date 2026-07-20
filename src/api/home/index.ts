
import request from "@/utils/request";

const USER_API = "/home";

export const getUserInfo = () => {
  return request({
    url: USER_API,
    method: "get",
  });
};

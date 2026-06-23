
import request from "@/utils/request";

const USER_API = "/user";

export const getUserInfo = () => {
  return request({
    url: USER_API,
    method: "get",
  });
};  

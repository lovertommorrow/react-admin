import type { UserInfoType } from "@/api/user/types";

import { create } from "zustand";

const initialState = {
  id: "",
  avatar: "",
  username: "",
  email: "",
  phoneNumber: "",
  description: "",
  roles: [],
};

type UserState = UserInfoType;

interface UserAction {
  getUserInfo: () => Promise<UserInfoType>
  reset: () => void
};

export const useUserStore = create<UserState & UserAction>()(

  set => ({
    ...initialState,
    getUserInfo: async () => {
      const response = await Promise.resolve({
        result: {
          id: "1",
          avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          username: "Admin",
          email: "<EMAIL>",
          phoneNumber: "1234567890",
          description: "manager",
          roles: ["admin"],
        }
      });
      set({
        ...initialState,
        ...response.result,
      });
      return response.result;
    },

    reset: () => {
      return set({
        ...initialState,
      });
    },

  }),

);

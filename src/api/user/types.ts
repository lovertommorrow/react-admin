export interface LoginInfo {
  username: string;
  password: string;
}

export interface UserInfoType {
	id: string
	avatar: string
	username: string
	email: string
	phoneNumber: string
	description: string
	roles: Array<string>
}
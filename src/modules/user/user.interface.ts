export type TUser = {
  name: string;
  email: string;
  phone: string;
  password: string;
  address?: string;
  role?: "admin" | "user";
  profilePicture?: string;
};

export interface User{
    avatar: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
}
export interface UserInfo{
  page: Number;
  per_page: Number;
  total: Number;
  total_pages: Number;
  data: User[];
}

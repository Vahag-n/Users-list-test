export { userReducer } from "./model/reducer/userList";
export { fetchUsers, deleteUser } from "./model/actions/userList";
export { getUsersList } from "./model/selectors/userList";

export { UserList } from "./ui/UserList/UserList";
export { UserDetails } from "./ui/UserDetails/UserDetails";

export type { UserState } from "./model/reducer/userList";
export type { User } from "./model/types/user";

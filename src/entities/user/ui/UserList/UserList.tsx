import { memo } from "react";

import { User } from "entities/user";

import { UserItem } from "../UserItem/UserItem";

import scss from "./UserList.module.scss";

interface UserListProps {
  users: User[];
  searchQuery: string;
  handleOpenUserDetails: (userId: number) => () => void;
}

export const UserList = memo((props: UserListProps) => {
  const { users, searchQuery, handleOpenUserDetails } = props;
  console.count();
  return (
    <div className={scss.userList}>
      {users.map((user) => {
        return (
          <div
            key={user.id}
            className={scss.userItemWrapper}
            onClick={handleOpenUserDetails(user.id)}
          >
            <UserItem user={user} searchTerm={searchQuery} />
          </div>
        );
      })}
    </div>
  );
});

import { memo } from "react";

import { User, deleteUser } from "entities/user";

import { HighlightableText } from "shared/ui/HighlightableText/HighlightableText";
import { Button } from "shared/ui/Button/Button";
import { useAppDispatch } from "shared/hooks/useAppDispatch/useAppDispatch";

import scss from "./UserItem.module.scss";

interface UserItemProps {
  user: User;
  searchTerm: string;
}

export const UserItem = memo((props: UserItemProps) => {
  const { user, searchTerm } = props;
  const dispatch = useAppDispatch();

  const handleDeleteUserById = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(deleteUser(user.id));
  };

  return (
    <div className={scss.userItem}>
      <div className={scss.content}>
        <div className={scss.field}>
          <span className={scss.label}>Email:</span>
          <HighlightableText content={user.email} searchTerm={searchTerm} />
        </div>

        <div>
          <div className={scss.field}>
            <span className={scss.label}>Name:</span>
            <HighlightableText content={user.name} searchTerm={searchTerm} />
          </div>
          <div className={scss.field}>
            <span className={scss.label}>Username:</span>
            <HighlightableText
              content={user.username}
              searchTerm={searchTerm}
            />
          </div>
        </div>
      </div>

      <div className={scss.actions}>
        <Button onClick={handleDeleteUserById}>Remove</Button>
      </div>
    </div>
  );
});

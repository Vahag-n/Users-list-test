import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import {
  User,
  UserDetails,
  UserList,
  fetchUsers,
  getUsersList,
} from "entities/user";

import { Input } from "shared/ui/Input/Input";
import { useAppDispatch } from "shared/hooks/useAppDispatch/useAppDispatch";
import { Loader } from "shared/ui/Loader/Loader";
import { useThrottledValue } from "shared/hooks/useThrottledValue/useThrottledValue";
import { Modal } from "shared/ui/Modal/Modal";

import scss from "./MainPage.module.scss";

const searchCriteria: (keyof User)[] = ["name", "email", "username"];

function filterByProperties<T>(
  data: T[],
  searchCriteria: (keyof T)[],
  searchTerm: string
) {
  return data.filter((item: T) => {
    return searchCriteria.some((criteria: keyof T) => {
      const value = item[criteria];
      if (typeof value === "string") {
        return value.toLowerCase().includes(searchTerm.toLowerCase());
      }

      return false;
    });
  });
}

const MainPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openUserDetails, setOpenUserDetails] = useState(false);
  const [openedUserId, setOpenedUserId] = useState<number | null>(null);
  const throttledValue = useThrottledValue({
    value: searchQuery,
    throttleMs: 1000,
  });
  const dispatch = useAppDispatch();
  const { data, error, loadingForList, loadingForItem } =
    useSelector(getUsersList);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleOpenUserDetails = useCallback(
    (userId: number) => () => {
      setOpenedUserId(userId);
      setOpenUserDetails(true);
    },
    []
  );

  const handleInputChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const filteredUsers = useMemo(
    () => filterByProperties(data ?? [], searchCriteria, throttledValue),
    [throttledValue, data]
  );

  if (error) {
    return <h1>Sorry Unable to fetch data!</h1>;
  }

  if (loadingForList) return <Loader className="center" />;

  if (!error && !loadingForList && !data?.length)
    return <h1>There is no data!</h1>;

  return (
    <div className={scss.mainPage}>
      <div className={scss.head}>
        <Input onChange={handleInputChange} placeholder="Search for user" />
      </div>
      {loadingForItem && <Loader className="center" />}
      <UserList
        users={filteredUsers}
        searchQuery={throttledValue}
        handleOpenUserDetails={handleOpenUserDetails}
      />
      <Modal
        lazy
        isOpen={openUserDetails}
        onClose={() => setOpenUserDetails(false)}
      >
        <UserDetails userId={openedUserId as number} />
      </Modal>
    </div>
  );
};

export default MainPage;

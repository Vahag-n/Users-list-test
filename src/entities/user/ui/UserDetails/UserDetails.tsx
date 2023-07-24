import { useCallback } from "react";
import { User } from "entities/user";

import { Loader } from "shared/ui/Loader/Loader";
import { api } from "shared/api/api";
import { useApiRequest } from "shared/hooks/useApiRequest/useApiRequest";

import scss from "./UserDetails.module.scss";

interface UserDetailsProps {
  userId: number;
}

export const UserDetails = (props: UserDetailsProps) => {
  const { userId } = props;
  const getUser = useCallback(() => api.get(`users/${userId}`), [userId]);
  const { data, loading } = useApiRequest<User>(getUser);

  return (
    <>
      <div className={scss.userDetails}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className={scss.addressInfo}>
              <div className={scss.col}>
                <div className={scss.field}>
                  <span className={scss.label}>City:</span>
                  <span className={scss.value}>{data?.address.city}</span>
                </div>
                <div className={scss.field}>
                  <span className={scss.label}>Street:</span>
                  <span className={scss.value}>{data?.address.street}</span>
                </div>
              </div>
              <div className={scss.col}>
                <div className={scss.field}>
                  <span className={scss.label}>Suite:</span>
                  <span className={scss.value}>{data?.address.suite}</span>
                </div>
                <div className={scss.field}>
                  <span className={scss.label}>Zip Code:</span>
                  <span className={scss.value}>{data?.address.zipcode}</span>
                </div>
              </div>
            </div>
            <div className={scss.componyInfo}>
              <div className={scss.field}>
                <span className={scss.label}>Company Name:</span>
                <span className={scss.value}>{data?.company.name}</span>
              </div>
              <div className={scss.field}>
                <span className={scss.label}>Catch Phrase:</span>
                <span className={scss.value}>{data?.company.catchPhrase}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

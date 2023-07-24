import { Dispatch } from "redux";
import { RootState } from "app/providers/StoreProvider/config/store";

import { api } from "shared/api/api";

import { User } from "../types/user";

export enum GetUsersActionTypes {
  FETCH_USER_REQUEST = "FETCH_USER_REQUEST",
  FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS",
  FETCH_USER_FAILURE = "FETCH_USER_FAILURE",
}

export enum DeleteUserActionTypes {
  DELETE_USER_REQUEST = "DELETE_USER_REQUEST",
  DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS",
  DELETE_USER_FAILURE = "DELETE_ITEM_FAILURE",
}

export interface EntityAction<T> {
  type: string;
  payload: T;
}

export interface EntityErrorAction {
  type: string;
  error: string;
}
//FETCH LIST
interface FetchUserRequestAction {
  type: GetUsersActionTypes.FETCH_USER_REQUEST;
}

interface FetchUserSuccessAction {
  type: GetUsersActionTypes.FETCH_USER_SUCCESS;
  payload: { data: User[] };
}

interface FetchUserFailureAction {
  type: GetUsersActionTypes.FETCH_USER_FAILURE;
  error: string;
}

// DLETE USER
interface DeleteUserRequestAction {
  type: DeleteUserActionTypes.DELETE_USER_REQUEST;
}

interface DeleteUserSuccessAction {
  type: DeleteUserActionTypes.DELETE_USER_SUCCESS;
  payload: { data: User[] };
}

interface DeleteUserFailureAction {
  type: DeleteUserActionTypes.DELETE_USER_FAILURE;
  error: string;
}

export type GetUsersActions =
  | FetchUserRequestAction
  | FetchUserSuccessAction
  | FetchUserFailureAction;

export type DeleteUserActions =
  | DeleteUserRequestAction
  | DeleteUserSuccessAction
  | DeleteUserFailureAction;

// FETCH LIST
export const fetchUsersRequest = (): GetUsersActions => ({
  type: GetUsersActionTypes.FETCH_USER_REQUEST,
});

export const fetchUsersSuccess = (data: User[]): GetUsersActions => ({
  type: GetUsersActionTypes.FETCH_USER_SUCCESS,
  payload: { data },
});

export const fetchUsersFailure = (error: string): GetUsersActions => ({
  type: GetUsersActionTypes.FETCH_USER_FAILURE,
  error,
});

// DELETE USER
export const deleteUserRequest = (): DeleteUserActions => ({
  type: DeleteUserActionTypes.DELETE_USER_REQUEST,
});

export const deleteUserSuccess = (data: User[]): DeleteUserActions => ({
  type: DeleteUserActionTypes.DELETE_USER_SUCCESS,
  payload: { data },
});

export const deleteUserFailure = (error: string): DeleteUserActions => ({
  type: DeleteUserActionTypes.DELETE_USER_FAILURE,
  error,
});

export const fetchUsers = () => {
  return async (dispatch: Dispatch<GetUsersActions>) => {
    dispatch(fetchUsersRequest());

    try {
      const response = await api.get("/users");
      await new Promise((res) => {
        setTimeout(() => {
          res(response);
        }, 2000);
      });

      dispatch(fetchUsersSuccess(response.data));
    } catch (error) {
      dispatch(fetchUsersFailure("Failed to fetch data."));
    }
  };
};

export const deleteUser = (userId: number) => {
  return async (
    dispatch: Dispatch<DeleteUserActions>,
    getState: () => RootState
  ) => {
    dispatch(deleteUserRequest());

    try {
      console.log("%c getState ===>", "color: #0a95ff", getState());
      await api.delete(`/users/${userId}`);
      const { users } = getState();
      const newUsersList =
        users?.data?.filter((user) => user.id !== userId) ?? [];
      dispatch(deleteUserSuccess(newUsersList));
    } catch (error) {
      dispatch(deleteUserFailure("Failed to delete item"));
    }
  };
};

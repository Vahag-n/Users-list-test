import { User } from "../types/user";
import {
  GetUsersActions,
  GetUsersActionTypes,
  DeleteUserActionTypes,
  DeleteUserActions,
} from "../actions/userList";

export interface UserState {
  data: User[] | null;
  loadingForList: boolean;
  loadingForItem: boolean;
  error: string | null;
}

type CombinedActions = GetUsersActions | DeleteUserActions;

const initialState: UserState = {
  data: null,
  loadingForList: false,
  loadingForItem: false,
  error: null,
};

export const userReducer = (
  state = initialState,
  action: CombinedActions
): UserState => {
  switch (action.type) {
    case GetUsersActionTypes.FETCH_USER_REQUEST:
      return { ...state, loadingForList: true, error: null };
    case GetUsersActionTypes.FETCH_USER_SUCCESS:
      return { ...state, loadingForList: false, data: action.payload.data };
    case GetUsersActionTypes.FETCH_USER_FAILURE:
      return { ...state, loadingForList: false, error: action.error };
    case DeleteUserActionTypes.DELETE_USER_REQUEST:
      return { ...state, loadingForItem: true, error: null };
    case DeleteUserActionTypes.DELETE_USER_SUCCESS:
      return { ...state, data: action.payload.data, loadingForItem: false };
    case DeleteUserActionTypes.DELETE_USER_FAILURE:
      return { ...state, loadingForItem: false, error: action.error };
    default:
      return state;
  }
};

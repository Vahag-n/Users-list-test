import {
  legacy_createStore as createStore,
  applyMiddleware,
  Store,
  combineReducers,
  compose,
  AnyAction,
} from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import { userReducer } from "entities/user";

import { StateSchema } from "./StateSchema";

const middleware = [thunk]; // You can add more middleware if required

const composeEnhancers =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers<StateSchema>({
  users: userReducer,
});

export function createReduxStore(initialState: StateSchema): Store<RootState> {
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  );

  return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
export type RootState = ReturnType<typeof rootReducer>;
export type TypedDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

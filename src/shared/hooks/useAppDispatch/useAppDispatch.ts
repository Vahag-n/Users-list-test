import { useDispatch } from "react-redux";

import { TypedDispatch } from "app/providers/StoreProvider/config/store";

export const useAppDispatch = () => useDispatch<TypedDispatch>();

import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { DispatchType, StateType } from "../store/root";

export const useAppSelector: TypedUseSelectorHook<StateType> = useSelector;
export const useAppDispatch = () => useDispatch<DispatchType>();
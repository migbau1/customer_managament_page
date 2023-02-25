import { useContext } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./app/store";
import { AuthContext } from "./context/Auth.context";



export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAuth = function useAuth() {
    const  contextValue = useContext(AuthContext)
    return contextValue
}
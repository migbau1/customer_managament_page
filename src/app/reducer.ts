import { combineReducers } from "@reduxjs/toolkit";
import adminSlice from "./slices/admin.slice";
import customerSlice from "./slices/customer.slice";



const createRootReducer = () => combineReducers({
    admins: adminSlice,
    customers: customerSlice
})

export default createRootReducer
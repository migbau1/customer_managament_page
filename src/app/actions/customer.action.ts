import { createAsyncThunk } from "@reduxjs/toolkit";
import { Post } from "../util/api.util";

export const customerLoadsThunk = createAsyncThunk('CUSTOMERS_LOAD',
    async (userData: any = null, { rejectWithValue }) => {
        try {

            const rest = await Post(userData, "/api/admin_list_active_users")
            console.log(rest);

            return { ...rest }
        } catch (error) {
            return rejectWithValue(error)
        }
    })

export const customerCreatedThunk = createAsyncThunk('CUSTOMER_CREATED',
    async (userData: any, { rejectWithValue }) => {
        try {
            console.log(userData);

            const rest = await Post(userData, "/api/customer_created")
            console.log(rest);

            return { ...rest }
        } catch (error) {
            return rejectWithValue(error)
        }
    })

export const customerDeletedThunk = createAsyncThunk('CUSTOMER_DELETED',
    async (id: string, { rejectWithValue }) => {
        try {

            const rest = await Post({}, "/api/customer/" + id)

            return { ...rest }
        } catch (error) {
            return rejectWithValue(error)
        }
    })

export const customerEditedThunk = createAsyncThunk('CUSTOMER_EDITED',
    async (userData: any, { rejectWithValue }) => {
        try {
            
            const rest = await Post(userData, "/api/customer_updated/")

            return { ...rest }
        } catch (error) {
            return rejectWithValue(error)
        }
    })
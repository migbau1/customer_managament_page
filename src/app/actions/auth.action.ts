import { createAsyncThunk } from "@reduxjs/toolkit";
import { Get, Post } from "../util/api.util";

export const loginThunk = createAsyncThunk('ADMIN_LOGIN',
    async (userData: FormData = new FormData(), { rejectWithValue }) => {
        try {
            const email: FormDataEntryValue | null = userData.get("email"),
                password: FormDataEntryValue | null = userData.get("password");

            const rest = await Post({ email, password }, "/api/login")
            console.log(rest);

            return { ...rest }
        } catch (error) {
            return rejectWithValue(error)
        }
    })

export const validatedThunk = createAsyncThunk("ADMIN_VALIDATED", async () => {
    try {
        const rest = await Get("/api/authenticated")
        console.log(rest)
        return rest
    } catch (error) {
        return error
    }
})
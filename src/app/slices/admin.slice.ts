import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, validatedThunk } from "../actions/auth.action";
import { IAdminState } from "../type/admin.type";

const initState: IAdminState = {
    email: "",
    nombre: "",
    isAuthenticated: false,
    isLoading: false,
    token: ""
}

const adminSlice = createSlice({
    name: "admin",
    initialState: initState,
    reducers: {
        logoutAction: (state) => {
            localStorage.setItem(
                "infoSession",
                JSON.stringify([])
            );
            state.isAuthenticated = false
        }
    },
    extraReducers(builder) {
        builder
            .addCase(loginThunk.pending, (state: IAdminState, action: any) => {
                state.isLoading = true;
            })
            .addCase(loginThunk.fulfilled, (state: IAdminState, { payload }: any) => {
                const { nombre, tk, email } = payload;
                localStorage.setItem(
                    "infoSession",
                    JSON.stringify({
                        nombre,
                        tk,
                        email,
                    })
                );
                state.email = email
                state.nombre = nombre
                state.token = tk
                state.isAuthenticated = true
                state.isLoading = false
            })
            .addCase(loginThunk.rejected, (state: IAdminState, action: any) => {
                state.isLoading = false;
            });
        builder
            .addCase(validatedThunk.pending, (state: IAdminState, action: any) => {
                state.isLoading = true;
            })
            .addCase(validatedThunk.fulfilled, (state: IAdminState, { payload }: any) => {
                const { nombre, tk, email } = payload;
                state.email = email
                state.nombre = nombre
                state.token = tk
                state.isAuthenticated = payload.validated
                state.isLoading = false
            })
            .addCase(validatedThunk.rejected, (state: IAdminState, action: any) => {
                localStorage.setItem(
                    "infoSession",
                    JSON.stringify([])
                );
                state.isLoading = false;
                state.isAuthenticated = false
            });
    },
})


export default adminSlice.reducer;

export const { logoutAction } = adminSlice.actions
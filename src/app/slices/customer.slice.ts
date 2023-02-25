import { createSlice } from "@reduxjs/toolkit";
import { customerCreatedThunk, customerDeletedThunk, customerEditedThunk, customerLoadsThunk } from "../actions/customer.action";
import { ICustomerState } from "../type/customer.type";

const initState: ICustomerState = {
    data: [],
    isLoading: false,
    meta: {
        limit: 10,
        offset: 0,
        count: 0
    },
    edit: false,
    selected: {
        nombre: "",
        apellido: "",
        empresa: "",
        email: "",
        id: -1
    }
}

const customerSlice = createSlice({
    name: "customer",
    initialState: initState,
    reducers: {
        setEdit: (state, action) => {
            state.selected = action.payload
            state.edit = !state.edit
        }
    },
    extraReducers(builder) {
        builder.addCase(customerLoadsThunk.pending, (state: ICustomerState, { payload }) => {
            state.isLoading = true
        }).addCase(customerLoadsThunk.fulfilled, (state: ICustomerState, { payload }: any) => {
            const { data, limit, offset } = payload
            state.data = data
            state.meta.count = limit
            state.meta.offset = offset
            state.meta.limit = limit
            state.isLoading = false
        }).addCase(customerLoadsThunk.rejected, (state: ICustomerState, { payload }) => {
            state.isLoading = false
        })

        builder.addCase(customerCreatedThunk.pending, (state: ICustomerState, { payload }) => {
            state.isLoading = true
        }).addCase(customerCreatedThunk.fulfilled, (state: ICustomerState, { payload }: any) => {
            const { data, limit, offset } = payload
            state.data = data
            state.meta.count = limit
            state.meta.offset = offset
            state.meta.limit = limit
            state.isLoading = false
        }).addCase(customerCreatedThunk.rejected, (state: ICustomerState, { payload }) => {
            state.isLoading = false
        });

        builder.addCase(customerDeletedThunk.pending, (state: ICustomerState, { payload }) => {
            state.isLoading = true
        }).addCase(customerDeletedThunk.fulfilled, (state: ICustomerState, { payload }: any) => {
            const { data, limit, offset } = payload
            state.data = data
            state.meta.count = limit
            state.meta.offset = offset
            state.meta.limit = limit
            state.isLoading = false
        }).addCase(customerDeletedThunk.rejected, (state: ICustomerState, { payload }) => {
            state.isLoading = false
        })
        builder.addCase(customerEditedThunk.pending, (state: ICustomerState, { payload }) => {
            state.isLoading = true
        }).addCase(customerEditedThunk.fulfilled, (state: ICustomerState, { payload }: any) => {
            const { data, limit, offset } = payload
            state.data = data
            state.meta.count = limit
            state.meta.offset = offset
            state.meta.limit = limit
            state.isLoading = false
        }).addCase(customerEditedThunk.rejected, (state: ICustomerState, { payload }) => {
            state.isLoading = false
        })
    },

})


export default customerSlice.reducer;
export const { setEdit } = customerSlice.actions

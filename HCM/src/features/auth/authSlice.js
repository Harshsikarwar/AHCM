import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,

    user: {
        id: null,
        employeeId: null,
        name: "",
        email: "",
        role: "",
        districtId: null,
        centreId: null,
    },
};

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        loginSuccess: (state, action) => {
            const { access, refresh, user } = action.payload;

            state.isAuthenticated = true;
            state.accessToken = access;
            state.refreshToken = refresh;
            state.user = user;
        },

        logout: (state) => {
            state.isAuthenticated = false;
            state.accessToken = null;
            state.refreshToken = null;

            state.user = initialState.user;

            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
        },

        updateUser: (state, action) => {
            state.user = {
                ...state.user,
                ...action.payload,
            };
        },
    },
});

export const {
    loginSuccess,
    logout,
    updateUser,
} = authSlice.actions;

export default authSlice.reducer;
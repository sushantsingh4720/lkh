import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import useAxios from "../utils/axiosInstance";
const axios = useAxios();
interface User {
  // Define the properties of the User object as needed
  id?: string;
  name?: string;
  email?: string;
}

interface AuthState {
  token: string | null;
  loggedUser: User;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem("token") || null,
  loggedUser: {},
  isAuthenticated: false,
  loading: true,
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: User; token: string }>) {
      const { user, token } = action.payload;
      localStorage.setItem("token", action.payload.token);
      axios.defaults.headers["token"] = action.payload.token;
      return {
        ...state,
        isAuthenticated: true,
        loggedUser: user,
        token: token,
        loading: false,
      };
    },
    logout(state) {
      localStorage.removeItem("token");
      axios.defaults.headers["token"] = null;
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loggedUser: {},
        loading: false,
      };
    },
    loadUser(state, action: PayloadAction<{ user: User }>) {
      const { user } = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        loggedUser: user,
        loading: false,
      };
    },
  },
});

export default AuthSlice.reducer;
export const { login, logout, loadUser } = AuthSlice.actions;

import { createSlice } from "@reduxjs/toolkit";
const userLogin = createSlice({
  name: "Auth",
  initialState: { value: JSON.parse(localStorage.getItem("USER")) || null },
  reducers: {
    AuthLogin: (state, action) => {
      localStorage.setItem("USER", JSON.stringify(action.payload));
      state.value = action.payload;
    },
    AuthLogout: (state) => {
      localStorage.removeItem("USER");
      state.value = null;
    },
  },
});

export const { AuthLogin, AuthLogout } = userLogin.actions;
export default userLogin.reducer;

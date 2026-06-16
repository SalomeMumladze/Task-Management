import { createSlice } from "@reduxjs/toolkit";
import storage from "@/shared/store/storage";

const initialState = {
  sidebarOpen: storage.getBool("sidebarOpen", false),
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSidebarOpenAction(state, action) {
      state.sidebarOpen = action.payload;
      storage.set("sidebarOpen", action.payload);
    },
  },
});

export const { setSidebarOpenAction } = uiSlice.actions;

export default uiSlice.reducer;

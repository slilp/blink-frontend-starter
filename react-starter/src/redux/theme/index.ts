import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface IThemeState {
  theme: string;
}

// Define the initial state using that type
const initialState: IThemeState = {
  theme: "light",
};

export const themeModeSlice = createSlice({
  name: "themeMode",
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<IThemeState>) => {
      state.theme = action.payload.theme;
    },
  },
});

export const { changeTheme } = themeModeSlice.actions;

export const themeModeSelector = (state: RootState) => state.themeMode;

export default themeModeSlice.reducer;

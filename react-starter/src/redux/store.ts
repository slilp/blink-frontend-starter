import { configureStore } from "@reduxjs/toolkit";
import covidSlice from "./covid";
import themeModeSlice from "./theme";

export const store = configureStore({
  reducer: {
    themeMode: themeModeSlice,
    covid: covidSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

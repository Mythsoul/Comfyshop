import { configureStore } from "@reduxjs/toolkit";
import authslice from "./Authslice";
const Store = configureStore({
  reducer: {
    auth: authslice,
  },
});

export default Store;
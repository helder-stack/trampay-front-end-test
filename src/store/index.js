import { createWrapper } from "next-redux-wrapper";
import root from "./reducers/index";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: root,
});

export default store
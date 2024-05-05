import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import modalSlice from "../Slices/modalSlice";

export const store = configureStore({
	reducer: {
		modal: modalSlice,
	},

	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({ })

	},
});

setupListeners(store.dispatch);
export * from "../Slices/modalSlice";
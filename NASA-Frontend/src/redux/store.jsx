import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./index";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
    key: "root",
    storage, // defaults to localStorage for web
    version: 1, // version is used to handle state migrations
    whitelist: ["user","exoplanets"] // only user will be persisted in local storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});

export const persistor = persistStore(store);
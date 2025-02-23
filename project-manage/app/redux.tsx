// without persistant storage
/* 
"use client";

import { useRef } from "react";
import { useDispatch, useSelector, TypedUseSelectorHook, Provider} from "react-redux";
import {combineReducers, configureStore} from "@reduxjs/toolkit"
import {setupListeners} from "@reduxjs/toolkit/query"
import globalReducer from "@/state"
import {api} from "@/state/api"

const rootReducer = combineReducers({
    global:globalReducer,
    [api.reducerPath]: api.reducer
})


export const makeStore = () =>{
   return configureStore({
    reducer:rootReducer,
    middleware:(getDefault) => getDefault().concat(api.middleware),
   });
};

REDUX TYPES

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"]

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;



 REDUX PROVIDER 

export default function StoreProvider({ children}:{children: React.ReactNode}){
     const storeRef = useRef<AppStore>(null);

     if(!storeRef.current){
        storeRef.current = makeStore();
        setupListeners(storeRef.current.dispatch);
     }
     return <Provider store={storeRef.current}>{children}</Provider>

    }

*/

"use client"

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist"


import createWebStorage from "redux-persist/es/storage/createWebStorage";
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { useDispatch, TypedUseSelectorHook, useSelector, Provider } from "react-redux"
import { useRef } from "react";
import globalReducer from "@/state"
import { api } from "@/state/api"
const createNoopStorage = () => {
    return {
        getItem(_key: any) {
            return Promise.resolve(null)
        },
        setItem(_key: any) {
            return Promise.resolve()
        },
        removeItem(_key: any) {
            return Promise.resolve()
        }
    }
}

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();


const persistConfig = {
    key: "root",
    storage,
    whitelist: ['global']
}


const rootReducer = combineReducers({
    global: globalReducer,
    [api.reducerPath]: api.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

/* REDUX STORE */

export const makeStore = () => {
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefault) =>
            getDefault({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }).concat(api.middleware),
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"]

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export default function StoreProvider({ children }: { children: React.ReactNode }) {
    const storeRef = useRef<AppStore>(null);

    if (!storeRef.current) {
        storeRef.current = makeStore();
        setupListeners(storeRef.current.dispatch);
    }
    return <Provider store={storeRef.current}>{children}</Provider>

}
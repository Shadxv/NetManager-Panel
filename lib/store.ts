import { configureStore } from '@reduxjs/toolkit';
import preferencesReducer from './features/preferencesSlice';
import popupReducer from './features/popupSlice';
import accountReducer from './features/accountSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            preferences: preferencesReducer,
            popups: popupReducer,
            account: accountReducer
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
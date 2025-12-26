import { configureStore } from '@reduxjs/toolkit';
import preferencesReducer from './features/preferencesSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            preferences: preferencesReducer,
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
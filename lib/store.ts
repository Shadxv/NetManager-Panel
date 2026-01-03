import { configureStore } from '@reduxjs/toolkit';
import preferencesReducer from './features/preferencesSlice';
import popupReducer from './features/popupSlice'; // Importujemy nowy slice

export const makeStore = () => {
    return configureStore({
        reducer: {
            preferences: preferencesReducer,
            popups: popupReducer,
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
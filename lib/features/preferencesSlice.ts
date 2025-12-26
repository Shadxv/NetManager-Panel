import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PreferencesState {
    theme: 'light' | 'dark';
    language: 'pl' | 'en';
}

const initialState: PreferencesState = {
    theme: 'dark',
    language: 'pl',
};

export const preferencesSlice = createSlice({
    name: 'preferences',
    initialState,
    reducers: {
        initPreferences: (state, action: PayloadAction<PreferencesState>) => {
            return action.payload;
        },
        setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
            state.theme = action.payload;
        },
        setLanguage: (state, action: PayloadAction<'pl' | 'en'>) => {
            state.language = action.payload;
        },
    },
});

export const { setTheme, setLanguage, initPreferences } = preferencesSlice.actions;
export default preferencesSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PopupType = 'success' | 'error';

export interface Popup {
    id: string;
    type: 'success' | 'error';
    message: string;
    params?: Record<string, string | number>;
}

interface PopupState {
    popups: Popup[];
}

const initialState: PopupState = {
    popups: [],
};

const popupSlice = createSlice({
    name: 'popups',
    initialState,
    reducers: {
        addPopup: (state, action: PayloadAction<Omit<Popup, 'id'>>) => {
            const id = Date.now().toString();
            state.popups.push({ ...action.payload, id });
            if (state.popups.length > 5) state.popups.shift();
        },
        removePopup: (state, action: PayloadAction<string>) => {
            state.popups = state.popups.filter((p) => p.id !== action.payload);
        },
    },
});

export const { addPopup, removePopup } = popupSlice.actions;
export default popupSlice.reducer;
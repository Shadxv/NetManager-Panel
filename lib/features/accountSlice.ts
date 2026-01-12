import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Account {
    id: string;
    email: string;
    name?: string;
    surname?: string;
    avatar?: string;
    roleId?: string;
    roleIndex: number;
    permissions: number;
    additionalPermissions: number;
}

export type AuthStatus = 'IDLE' | 'AUTHENTICATED' | 'REQUIRES_SETUP' | 'REQUIRES_PASSWORD_RESET';

interface AccountState {
    token: string | null;
    user: Account | null;
    status: AuthStatus;
    isHydrated: boolean;
}

const initialState: AccountState = {
    token: null,
    user: null,
    status: 'IDLE',
    isHydrated: false,
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ token: string; user: Account; status: AuthStatus }>
        ) => {
            const { token, user, status } = action.payload;
            state.token = token;
            state.user = user;
            state.status = status;

            if (typeof window !== 'undefined') {
                localStorage.setItem('nm_auth_token', token);
            }
        },

        logout: (state) => {
            state.token = null;
            state.user = null;
            state.status = 'IDLE';
            state.isHydrated = true;

            if (typeof window !== 'undefined') {
                localStorage.removeItem('nm_auth_token');
            }
        },

        updateUser: (state, action: PayloadAction<Partial<Account>>) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            }
        },

        setHydrated: (state) => {
            state.isHydrated = true;
        }
    },
});

export const { setCredentials, logout, updateUser , setHydrated} = accountSlice.actions;
export default accountSlice.reducer;
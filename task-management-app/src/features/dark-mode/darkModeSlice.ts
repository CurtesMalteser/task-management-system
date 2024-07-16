import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const prefersDarkMode = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

interface DarkModeState {
    mode: string;
}

const initialState: DarkModeState = {
    mode: prefersDarkMode(),
};

const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState,
    reducers: {
        setDarkMode: (state, action: PayloadAction<string>) => {
            state.mode = action.payload;
            const selectedMode = action.payload === 'auto' ? prefersDarkMode() : action.payload;
            document.querySelector('html')?.setAttribute('data-bs-theme', selectedMode);
        },
    },
});

export const { setDarkMode } = darkModeSlice.actions;

export const darkModeSelector = (state: RootState) => state.darkMode.mode;

export default darkModeSlice.reducer;
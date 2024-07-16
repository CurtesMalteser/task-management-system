import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const getMode = (mode: string) => mode === 'auto' ? prefersDarkMode() : mode;

const setAppMode = (mode: string) => {
    const selectedMode = getMode(mode);
    document.querySelector('html')?.setAttribute('data-bs-theme', selectedMode);
    return selectedMode;
}

const prefersDarkMode = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

interface DarkModeState {
    mode: string;
}

const initialState: DarkModeState = {
    mode: setAppMode(prefersDarkMode()),
};

const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState,
    reducers: {
        setDarkMode: (state, action: PayloadAction<string>) => {
            state.mode = action.payload;
            setAppMode(state.mode);
        },
    },
});

export const { setDarkMode } = darkModeSlice.actions;

export const darkModeSelector = (state: RootState) => state.darkMode.mode;
export const isDarkModeSelector = createSelector(
    (state: RootState) => state.darkMode.mode,
    (mode) => getMode(mode) === 'dark'
);

export default darkModeSlice.reducer;
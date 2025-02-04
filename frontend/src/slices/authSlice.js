import { createSlice } from '@reduxjs/toolkit'; // Updated import statement

const initialState = {
    token: (() => {
        try {
            const token = localStorage.getItem('token');
            return token ? JSON.parse(token) : null;
        } catch (error) {
            console.error('Failed to parse token from localStorage', error);
            return null; // Return null if parsing fails
        }
    })(),
    signupData: null, // Added default values for other state properties
    loading: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setSignupData(state, action) {
            state.signupData = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setToken(state, action) {
            state.token = action.payload;
        }
    }
});

export const { setToken, setLoading, setSignupData } = authSlice.actions;
export default authSlice.reducer;

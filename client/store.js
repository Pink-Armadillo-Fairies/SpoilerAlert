import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import episodeReducer from './episodeSlice';

const store = configureStore({
    reducer: {
        login: loginReducer,
        episode: episodeReducer,
    }
});

export default store;
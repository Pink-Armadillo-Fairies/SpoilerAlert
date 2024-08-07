import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  show: 'Bridgerton',
  season: '',
  episode: '',
  message: '',
  watchParty: [],
  seeComments: false,
};

const episodeSlice = createSlice({
  name: 'episodeUpdate',
  initialState,
  reducers: {
    //log in successful
    updateSeason: (state, action) => {
      state.season = action.payload;
      console.log('state.season:', state.season);
    },
    updateEpisode: (state, action) => {
      state.episode = action.payload;
      console.log('state.episode:', state.episode);
    },
    updateMessage: (state, action) => {
      state.message = action.payload;
      console.log('state.message:', state.message);
    },
    updateWatchParty: (state, action) => {
      console.log(action);
      const watch = action.payload;

      console.log('watch', watch);

      return { ...initialState, watchParty: watch };
    },
    updateSeeComments: (state, action) => {
      state.seeComments = !state.seeComments;
    },
  },
});

export const {
  updateSeason,
  updateEpisode,
  updateMessage,
  updateWatchParty,
  updateSeeComments,
} = episodeSlice.actions;
export default episodeSlice.reducer;

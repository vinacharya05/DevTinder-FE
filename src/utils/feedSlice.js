import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: 'feed',
    initialState: null,
    reducers: {
        addFeed: (state, action) => action.payload, 
        removeFeed: (state, action) => state.filter(s => s._id !== action.payload), 
    }
});

export default feedSlice.reducer;
export const {addFeed, removeFeed} = feedSlice.actions;
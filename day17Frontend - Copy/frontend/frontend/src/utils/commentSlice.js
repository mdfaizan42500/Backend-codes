import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "commentSlice",
  initialState: {
    isOpen: false,
  comments: [],
  },
  reducers: {
    setIsOpen(state, action) {
      state.isOpen = action.payload === false ? false : !state.isOpen;
    },
    setComments(state, action) {
  state.comments = action.payload;
},
addComment(state, action) {
  state.comments.push(action.payload);
},
  },
});

export const { setIsOpen , setComments , addComment} = commentSlice.actions;
export default commentSlice.reducer;
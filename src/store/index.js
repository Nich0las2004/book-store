import { configureStore, createSlice } from "@reduxjs/toolkit";

export const initialState = {
  books: 0,
  totalPrice: 0,
  bookDetails: [],
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    increment(state) {
      state.books++;
    },
    decrement(state) {
      if (state.books > 0) {
        state.books--;
      }
    },
    clearData(state){
      state.books = 0;
      state.totalPrice = 0;
      state.bookDetails = [];
    },
    removeBook(state,action){
      state.books -= action.payload
    },
    addBookDetails(state, action) {
      state.bookDetails.push(action.payload);
    },
    updateRepeat(state, action) {
      const { title, repeat } = action.payload;
      return {
        ...state,
        bookDetails: state.bookDetails.map((book) =>
          book.title === title ? { ...book, repeat } : book
        ),
      };
    },
  },
});

const store = configureStore({
  reducer: {
    books: booksSlice.reducer,
  },
});

export const buttonActions = booksSlice.actions;

export default store;

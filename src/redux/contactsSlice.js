import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../redux/operations/thunks';

export const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, { payload }) => {
      state.contacts.items.push(payload);
    },
    removeContact: (state, { payload }) => {
      state.contacts.items = state.contacts.items.filter(
        ({ id }) => id !== payload
      );
    },
    filterContact: (state, { payload }) => {
      state.filter = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addContact, removeContact, filterContact } =
  contactSlice.actions;

export default contactSlice.reducer;

// Selectors

export const getFilter = state => state.contacts.filter;

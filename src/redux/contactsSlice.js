import { createSlice } from '@reduxjs/toolkit';

import { fetchSlice } from './operations/thunks.js';

export const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};

export const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, { payload }) => {
      console.log(fetchSlice);
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

export const getContacts = state => state.contacts;

export const getFilter = state => state.filter;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contacts: [],
  filter: '',
};

export const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, { payload }) => {
      state.contacts.push(payload);
    },
    removeContact: (state, { payload }) => {
      state.contacts = state.contacts.filter(({ id }) => id !== payload);
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

export const getContacts = state => state.storage.contacts;
export const getFilter = state => state.storage.filter;

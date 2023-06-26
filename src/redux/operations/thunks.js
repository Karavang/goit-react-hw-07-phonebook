import { nanoid } from 'nanoid';
import { initialState } from 'redux/contactsSlice';
import { createSlice } from '@reduxjs/toolkit';

const { fetchContacts, deleteContact, addContact } = require('./fetchContacts');

const handlePending = state => {
  state.isLoading = true;
  state.error = '';
};

const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

export const fetchSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder => {
    builder

      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.contacts = payload;
        console.log(payload);
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        const { name, number } = payload;

        state.items.unshift({
          name,
          number,
        });
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.contacts = payload;
        console.log(payload);
      })
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.rejected, handleRejected);
  },
});

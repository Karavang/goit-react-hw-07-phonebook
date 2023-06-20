import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
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
    fetchContacts: (state, { payload }) => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            'https://6474b8d87de100807b1ba095.mockapi.io/contacts'
          );
          console.log(response.data);
          state.contacts.items = [...state.contacts.items, ...response.data];
          console.log(state.contacts.items);
          console.log(initialState);
        } catch (error) {
          console.error('Ошибка при получении данных:', error);
        }
      };

      fetchData();
    },

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
export const { addContact, removeContact, filterContact, fetchContacts } =
  contactSlice.actions;

export default contactSlice.reducer;

// Selectors

export const getContacts = state => state.storage.contacts;

export const getFilter = state => state.storage.filter;

import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://6474b8d87de100807b1ba095.mockapi.io';

export const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const filtrator = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});
console.log(filtrator.actions.setFilter);
export const filterContacts = filtrator.actions.setFilter;
export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, number, id }, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', { name, number, id });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

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
  reducers: {
    setFilter: (state, { payload }) => {
      state.filter = payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.contacts.items = payload;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;

        state.contacts.items = [...state.contacts.items, payload];
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.contacts.items = state.contacts.items.filter(
          ({ id }) => id !== payload.id
        );
      })
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.rejected, handleRejected);
  },
});

export const getContacts = state => state.contacts.contacts.items;
export const getFilter = state => state.contacts.filter;

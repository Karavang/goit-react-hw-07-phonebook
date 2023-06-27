import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
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

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, number }, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', { name, number });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    filterContact: (state, { payload }) => {
      state.filter = payload;
    },
  },
});
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

export const filterContact = (state, { payload }) => {
  state.filter = payload;
  console.log(state);
};

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
      console.log(state);
      console.log(payload);
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
        const { name, number } = payload;
        const date = new Date();
        state.contacts.items.push({
          name,
          number,
          CreatedAt: date.toJSON(),
          id: nanoid(6),
        });
        fetchContacts();
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.contacts.items = state.contacts.items.filter(
          ({ id }) => id !== payload.id
        );
        fetchContacts();
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

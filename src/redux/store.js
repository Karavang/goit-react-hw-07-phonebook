import { configureStore } from '@reduxjs/toolkit';

import { fetchSlice } from './operations/thunks';

export const store = configureStore({
  reducer: { contacts: fetchSlice.reducer },
});

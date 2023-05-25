import React from 'react';
import { useDispatch } from 'react-redux';
import { filterContact } from 'redux/contactsSlice';

export default function Filter() {
  const dispatch = useDispatch();

  return (
    <input
      type="text"
      name="search"
      className="form-control"
      placeholder="Search by name"
      onChange={e => dispatch(filterContact(e.target.value))}
    />
  );
}

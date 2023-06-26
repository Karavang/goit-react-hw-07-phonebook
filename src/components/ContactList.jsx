import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts, getFilter, removeContact } from 'redux/contactsSlice';

import { MdOutlineDeleteOutline } from 'react-icons/md';
import { fetchContacts } from 'redux/operations/thunks';

export default function List() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch, contacts]);

  const filteredContacts = contacts
    ? contacts.filter(contact => {
        console.log(contact);
        contact.name.toLowerCase().includes(filter.toLowerCase());
      })
    : [];
  console.log(filteredContacts);
  const handleDeleteContact = id => {
    dispatch(removeContact(id));
  };

  return (
    <div className="scrollable-list">
      <ul className="listContacts">
        {filteredContacts.map(({ id, name, number }) => (
          <li key={id} className="li-con">
            <b>{name}</b> - {number}
            <button
              className="btn btn-primary add-contact"
              type="button"
              onClick={() => handleDeleteContact(id)}
            >
              <MdOutlineDeleteOutline />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

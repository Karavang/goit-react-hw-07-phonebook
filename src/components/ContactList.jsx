import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getContacts,
  getFilter,
  removeContact,
  fetchContacts,
} from 'redux/contactsSlice';
import { MdOutlineDeleteOutline } from 'react-icons/md';

export default function List() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [contacts]);
  const filteredContacts = contacts
    ? contacts.items.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      )
    : [];

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

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFilter } from 'redux/contactsSlice';
import { deleteContact, getContacts } from 'redux/operations/thunks';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { fetchContacts } from 'redux/operations/thunks';

export default function List() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  console.log(contacts);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  console.log(contacts);
  const filteredContacts = contacts
    ? contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      )
    : [];

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
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
              onClick={() => {
                handleDeleteContact(id);
                dispatch(fetchContacts());
              }}
            >
              <MdOutlineDeleteOutline />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

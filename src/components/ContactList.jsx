import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/Firebase";
import { RxAvatar } from "react-icons/rx";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ContactList = ({ searchQuery }) => {
  const [collections, setcollections] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState({ id: '', name: '', Contactinfo: '' });

  console.log(searchQuery);
  const handleOpen = (contact) => {
    setCurrentContact(contact);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const contactfetch = async () => {
      try {
        const contactref = collection(db, "mycontactsinfo");
        const contactsnapsort = await getDocs(contactref);
        const lists = contactsnapsort.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setcollections(lists);
      } catch (error) {
        console.log(error);
      }
    };
    contactfetch();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "mycontactsinfo", id));
      setcollections(collections.filter((contact) => contact.id !== id));
    } catch (error) {
      console.log("Error deleting contact:", error);
    }
  };

  const handleEdit = async () => {
    try {
      const contactDoc = doc(db, "mycontactsinfo", currentContact.id);
      await updateDoc(contactDoc, {
        name: currentContact.name,
        Contactinfo: currentContact.Contactinfo,
      });
      setcollections(collections.map(contact =>
        contact.id === currentContact.id ? { ...contact, ...currentContact } : contact
      ));
      handleClose();
    } catch (error) {
      console.log("Error updating contact:", error);
    }
  };

  const filteredContacts = searchQuery
  ? collections.filter(contact =>
      contact &&
      ((typeof contact.name === "string" && contact.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
       (typeof contact.Contactinfo === "string" && contact.Contactinfo.toLowerCase().includes(searchQuery.toLowerCase())))
    )
  : collections;


  return (
    <div>
      <div className='contactlist'>
        {filteredContacts.length > 0 ? (filteredContacts.map((contact) => (
          <div key={contact.id} className='contact-item gap-3'>
            <div className='bg-orange-300 p-5 rounded-3xl mt-2 flex gap-5'>
              <div>
                <RxAvatar className='h-[48px] w-[48px] text-orange-600' />
              </div>
              <div>
                <p className='text-[15px] font-semibold'>Name: {contact.name}</p>
                <p className='text-[15px]'>Phone: {contact.Contactinfo}</p>
              </div>
              <div className='ml-7 flex gap-1'>
                <FaEdit className='h-[32px] w-[32px] cursor-pointer' onClick={() => handleOpen(contact)} />
                <MdDelete className='h-[32px] w-[32px] text-purple-800 cursor-pointer' onClick={() => handleDelete(contact.id)} />
              </div>
            </div>
          </div>
        ))) : (<p>No Contact Found</p>)}
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Edit Contact
          </Typography>
          <TextField
            label="Name"
            value={currentContact.name}
            onChange={(e) => setCurrentContact({ ...currentContact, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone"
            value={currentContact.Contactinfo}
            onChange={(e) => setCurrentContact({ ...currentContact, Contactinfo: e.target.value })}
            fullWidth
            margin="normal"
          />
          <Button onClick={handleEdit} variant="contained" color="primary" style={{ marginTop: '20px' }}>
            Save Changes
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ContactList;

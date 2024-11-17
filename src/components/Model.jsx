import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {collection, addDoc} from "firebase/firestore"
import {db} from "../config/Firebase"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>Open Child Modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </>
  );
}

const Model = ({ open, handleClose }) => {
  const [name,setname] = useState("");
  const [phone,setphone]= useState("");
  const handlesubmit = async(e) => {
    e.preventDefault();
  await sendData();
    console.log(name);
    console.log(phone);
  };
 

  const sendData = async()=>{
 try{
  await addDoc(collection(db,"mycontactsinfo"),{
    name:name,
    Contactinfo:phone,
  });
  console.log("Document Succesfully Written!");
 }
 catch(error){

 }

  }
 

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
     <Box
  sx={{
    minHeight: "200px",
    width: "90%", // Default width for smaller screens
    maxWidth: "30%", // For larger screens
    border: "none",
    outline: "none",
    borderRadius: "12px",
    bgcolor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "150px auto", // Center horizontally
    '@media (max-width: 600px)': {
      marginTop: "100px",
      maxWidth: "90%",
    },
  }}
>
  <Box
    component="form"
    sx={{
      justifyContent: "center",
      alignContent: "center",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      width: "100%",
    }}
    noValidate
    autoComplete="off"
    onSubmit={handlesubmit}
  >
    <TextField
      id="outlined-name"
      label="Name"
      variant="outlined"
      onChange={(e) => setname(e.target.value)}
    />
    <TextField
      id="outlined-phone"
      label="Phone No"
      variant="outlined"
      onChange={(e) => setphone(e.target.value)}
    />
    <Button
      type="submit"
      variant="contained"
      sx={{
        marginTop: "10px",
        bgcolor: "rgb(251 146 60)",
      }}
      onClick={handleClose}
    >
      Submit
    </Button>
  </Box>
</Box>

    </Modal>
  );
};

export default Model;

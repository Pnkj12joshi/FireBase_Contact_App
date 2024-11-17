import React, { useEffect, useState } from 'react';
import logo from './image/logos_firebase.png';
import { IoIosSearch } from 'react-icons/io';
import { AiFillPlusCircle } from 'react-icons/ai';
import Model from '../components/Model';

const Navbars = ({ searchQuery, setSearchQuery }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <>
      <div className="w-[361px] h-[60px] rounded-[10px] bg-[#FFFFFF] flex justify-center items-center m-4 gap-4">
        <img src={logo} alt="Firebase Logo" />
        <span className="text-[18px] font-semibold width-[213px]">FireBase Contact App</span>
      </div>
      <div className="flex">
        <div className="w-[295px] h-[40px] ml-[17px] rounded-[10px] flex p-[7px 10px 7px 10px] gap-[10px] mt-1 border-[1px] flex-grow">
          <div className="flex justify-center items-center text-white p-2">
            <IoIosSearch />
          </div>
          <input type="text" placeholder="Search Contact" className="bg-transparent border-none outline-none text-white" value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <AiFillPlusCircle className="text-white h-[52px] w-[52px] ml-4 cursor-pointer" onClick={handleModalOpen} />
      </div>
      <Model open={modalOpen} handleClose={handleModalClose} />
    </>
  );
};

export default Navbars;

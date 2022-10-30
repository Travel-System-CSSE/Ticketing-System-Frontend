import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from '../../src/assets/logo.png'
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../features/authSlice";
import { logout } from "../features/authSlice";
import { Link } from 'react-router-dom'

//navigate to login when logout
const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  //logout
  const onLogout = async () => {
    await dispatch(logout());
    await dispatch(reset());
    navigate("/manager");
  };   
  return (
    <>
    <div
      // className={`flex justify-between w-full px-4 md:px-8 xl:px-12 py-6 items-center fixed top-0 left-0 z-40 transition ${isScrolled && 'bg-[#141414]'
      //   }`}
      className={'flex justify-between w-full px-4 md:px-8 xl:px-12 py-6 items-center  top-0 left-0 z-40 transition bg-[#F5DAA5]'}
    >
      {/* Logo */}
      <Link
          to={'/'}
          className='flex items-center gap-x-2 md:mr-12 lg:mr-16 cursor-pointer'
        >
          <img src={Logo} alt='website-logo' />
          <p className='text-2xl font-medium text-black font-[Domine]'>
            Transport For anywhere in SL
          </p>
        </Link>      
        <div className='hidden md:flex items-center gap-x-3 text-black font-[Poppins] '>
          <button
            className='px-4 py-1 rounded-md hover:scale-110 hover:font-extrabold'
            
          >
            <div className='flex '>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
              </svg>
              <div className='pl-2'>
                REVIEW
              </div>
            </div>
          </button>
          <button
            className='px-4 py-1 rounded-md hover:scale-110 hover:font-extrabold'
            
          >
            <div className='flex'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
              <div className='pl-2'>
                ALERTS
              </div>
            </div>
          </button>
          <button
            className='px-4 py-1 rounded-md hover:scale-110 hover:font-extrabold'
            
          >
            <div className='flex'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div className='pl-2'  onClick={onLogout}>
                SIGN OUT
              </div>
            </div>
          </button>
        </div>
    </div>

  </>
  );
};

export default NavBar;

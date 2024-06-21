import React, { useState } from "react";
import classes from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {

let valid=Cookies.get("valid")
let validto=Cookies.get("validto")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const msisdn = Cookies.get('msisdn');
  console.log("msisdn in cookies", msisdn);

  const Unsuburl = `/unsub?msisdn=${msisdn}`;

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleUnsubscribe = async () => {
    try {
      const response = await axios.post(Unsuburl);
      console.log('Unsubscribe response:', response.data);

      if (response.data.statusCode === '0') {
        toast.success(response.data.message);
        Cookies.remove('msisdn');
        Cookies.remove('valid')
        Cookies.remove('validto')
        navigate('/login');
      } else if (response.data.statusCode === '1') {
        toast.error(response.data.message);
      } else {
        toast.error("Error occurred!");
      }

      setIsDropdownOpen(false);
    } catch (error) {
      console.error('Error during unsubscribe:', error);
      setIsDropdownOpen(false);
    }
  };

  // Format dates
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto">

      <nav className="px-10 container mx-auto flex justify-center py-5">
        <div className={classes.logo_container}>
          <Link>
            <img src="/assets/images/toonflix.png" alt="Logo" className={classes.image} onClick={() => navigate("/home")} />
          </Link>
        </div>

        <div className="mt-3">
          <button
            id="dropdownDefaultButton"
            onClick={toggleDropdown}
            className="text-white bg-[#FF4003] text-sm font-bold focus:outline-none rounded-lg px-10 py-2.5"
            type="button"
          >
            My Account
          </button>
          <div id="dropdown" className={`z-10 ${isDropdownOpen ? 'block' : 'hidden'} bg-black border border-orange-600 divide-y divide-gray-100 rounded-lg shadow mt-2 w-40 dark:bg-gray-700`}>
            <ul className="py-1 text-sm text-gray-100 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              <li className="border-b-1 shadow-sm">
                <a className="block px-2 py-1 text-center font-bold hover:bg-orange-600 dark:hover:bg-orange-600">KIDSZONEPRO</a>
              </li>
              <li className="border-b-1 shadow-sm">
                <a className="block px-2 py-1 hover:bg-orange-600">Started: {formatDate(valid)}</a>
              </li>
              <li className="border-b-2 shadow-sm">
                <a className="block px-2 py-1 hover:bg-orange-600 dark:hover:bg-orange-600">Valid To: {formatDate(validto)}</a>
              </li>
              <li>
                <a href="#" onClick={handleUnsubscribe} className="block px-2 py-3 text-center hover:bg-orange-600 font-bold">UNSUBSCRIBE</a>
              </li>
            </ul>
          </div>
        </div>
        <ToastContainer />
      </nav>
    </div>
  );
};

export default Navbar;

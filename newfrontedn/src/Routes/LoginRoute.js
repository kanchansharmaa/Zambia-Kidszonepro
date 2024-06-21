import React, { useState,useEffect } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { pre } from "../api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../Components/Loader";
import classes from "../Components/Navbar.module.css";
import Cookies from 'js-cookie'
const LoginRoute = () => {
  // const navigate=useNavigate();
  // useEffect(()=>{
  //   navigate("/demo");
  // },[])
  const [number, setNumber] = useState("");
  const navigate=useNavigate();
  const [loading,setLoading]=useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (number.trim().length > 0) {
      try {
        setLoading(true);
        let formattedNumber = number.startsWith("260") ? number : `260${number}`;
        const res = await axios.get(`/checkuser?msisdn=${formattedNumber}`);
        console.log("response", res.data)
        if (res?.data?.status == 1) {
          setLoading(false);
          Cookies.set('msisdn', formattedNumber)
          setTimeout(() => {
            navigate('/home')
          }, 1000);
        } else {
          setLoading(false);
          toast.error("You are not subscribed!");
        }
      } catch (error) {
        setLoading(false);
        toast.error(error?.message);
      }
    } else {
      toast.error("Number cannot be empty!");
    }
  };
  return (
    <>
      {/* <Navbar /> */}
      <div className="mt-10 w-full flex justify-center">
        
        <div className="p-8 bg-black w-1/4 border rounded-lg max-[800px]:w-3/4">
        <div className="flex justify-center">
        <img src="/assets/images/toonflix.png" alt="Logo" className='w-40 h-40 ' onClick={() => navigate("/home")} />

        </div>
          <form className="max-w-sm mx-auto" onSubmit={submitHandler}>
            <h1 className="md:text-3xl text-2xl  text-gray-100 font-bold text-center">Login to Enjoy !</h1>
            <div className="mb-5 py-5">
              <label
                className="block mb-2 text-sm font-medium text-gray-50 dark:text-white"
              >
                Your Number
              </label>
              <input
                type="number"
                id="number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="********83"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-center ">

                        <button
                          type="submit"
                          disabled={loading}
                          className="text-white bg-[#790000] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Login
                        </button>
            </div>
          </form>
          <div>
            {loading && <Loader />}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginRoute;

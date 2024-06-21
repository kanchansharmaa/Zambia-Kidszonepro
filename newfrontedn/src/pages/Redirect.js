import React, { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Redirect = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();


  useEffect(() => {
  

    const params = {};
    for (const [key, value] of searchParams) {
      params[key] = value;
    }

    console.log(params);
    const statusCode = params.statusCode;
    let msisdn = params.msisdn;

    if (statusCode === '200') {
      Cookies.set('msisdn', msisdn,{expires:1});
      toast.success("Subscribed Successfully");
      setTimeout(() => {
        navigate('/home');
     
      }, 1000);
    } else if (statusCode === '201') {
      Cookies.set('msisdn', msisdn ,{expires:1});
      toast.success("Already Subscribed");
      setTimeout(() => {
        navigate('/home');
     
      }, 1000);
    } else if (statusCode === '203') {
      toast.error("Billing Failed");
      setTimeout(() => {
        navigate('/error');
     
      }, 1000);
    } else {
      navigate('/error');
    
    }
  }, []);

  return (
    <div className='container mx-auto flex justify-center py-[110px]'>
      Redirecting...
    </div>
  );
}

export default Redirect;

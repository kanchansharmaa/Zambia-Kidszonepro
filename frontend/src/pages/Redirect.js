import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Redirect = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // useEffect(() => {
  
  //   const statusCode = searchParams.get('statusCode');

   
  //   if (statusCode === '200') {
     
  //     navigate('/home');
  //   } else {
    
  //     navigate('/error'); 
  //   }
  // }, [navigate, searchParams]);

  return (
    <div className='container mx-auto flex justify-center py-[110px]'>
      Redirecting...
    </div>
  );
}

export default Redirect;

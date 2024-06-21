import React from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

const GetMsisdn = () => {
  const [q] = useSearchParams();
  const url ='/get-headers';

  const handleButtonClick = async (e) => {
    e.preventDefault(); 

    try {
      const response = await axios.get(url);
      console.log("response data ===", response.data);

      // Assuming response.data.url contains the URL you showed in your example
      const responseUrl = response.data.url;
      const urlObj = new URL(responseUrl);
      const queryParams = new URLSearchParams(urlObj.search);

      const cgurl = queryParams.get('cgurl'); // Extract the 'cgurl' parameter
      if (cgurl) {
        // Parse the CGURL and append the necessary parameters
        const cgUrlObj = new URL(cgurl);
        const cgParams = new URLSearchParams(cgUrlObj.search);
        cgParams.set('packName', 'kidszone_d'); // Set the packname parameter
        cgParams.set('redirectUrl', 'http://zm.kidszonepro.com/redirect'); // Set the redirectUrl parameter
        cgUrlObj.search = cgParams.toString(); // Update the search parameters
// http://zm.kidszonepro.com/redirect
        console.log('Updated CGURL:', cgUrlObj.toString());

        // Optionally, you can redirect to the updated URL
        window.location.replace(cgUrlObj.toString());
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className='container mx-auto flex justify-center py-[100px] px-5 md:px-0'>
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
        <form className="space-y-6" action="#">
          <h1 className='text-center font-medium text-xl'>CLICK THE BUTTON</h1>
          <button 
            onClick={handleButtonClick}  
            type="submit" 
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            CLICK
          </button>
        </form>
      </div>
    </div>
  );
}

export default GetMsisdn;

import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import VideoGrid from "../Components/VideoGrid";
import { imagesApi, pre, videosApi } from "../api/api";
import axios from "axios";
import Layout from "../Components/Layout";
import Loader from "../Components/Loader";
import Carousel from "../Components/Carousel";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from 'js-cookie'
const HomeRoute = () => {
  const navigate = useNavigate();
  const [msisdn, setMsisdn] = useState("");
  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [valid,setValid]=useState('')
  const [validto,setValidto]=useState('')
 const [details,setDetails]=useState([])
  const num=Cookies.get("msisdn")
  console.log("num in cokkies home", num)


  if(!num || num==undefined || num==null){
    navigate('/login')
  }
  // const location = useLocation();
  // const msisdnn = new URLSearchParams(location.search).get("msisdn");

  // useEffect(() => {
  //   setMsisdn(msisdnn);
  // }, []);

  const fetchDataFromBackend = async () => {
    try {
      const res = await axios.get(`${pre}/${videosApi}`);
      console.log("data", res.data)
      const res2 = await axios.get(`${pre}/${imagesApi}`);
      setImages(res2?.data);
      setVideos(res?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error?.message);
    }
  };

  const checkSubscription = async () => {
    try {
      const res = await axios.get(`/checkuser?msisdn=${num}`);
      if (res?.data?.status == 0) {
        navigate("/");
      } else {
        console.log("details\n", res.data.detail)
        setDetails(res.data.detail)
        Cookies.set("valid",res.data.detail[0].lastbilled_date)
        Cookies.set("validto",res.data.detail[0].nextbilled_date)
        // setValid(res.data.detail[0].lastbilled_date)
        // setValidto(res.data.detail[0].nextbilled_date)
        fetchDataFromBackend();
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    checkSubscription();
  }, [num]);

  useEffect(()=>{
    fetchDataFromBackend();
  },[])

  return (
    <>
      <Navbar/>
      <Layout>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="py-4">
              <Carousel images={images} />
              {/* <Carousel images={images} msisdn={msisdn} /> */}
            </div>
            <div className="pb-4">
              {/* <VideoGrid videos={videos} msisdn={msisdn} /> */}
              <VideoGrid videos={videos} />
            </div>
          </>
        )}
      </Layout>
    </>
  );
};

export default HomeRoute;

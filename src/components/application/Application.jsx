import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getAnApplicationRoute, getStepper } from "../../utils/Endpoint";

import TrackerVertical from "../stepper/TrackerVertical";
import RightSide from "./tracking/RightSide";
import ReqLoader from "../loading/ReqLoader";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Application = () => {
  const instance = useAxiosPrivate();

  const [loader, setLoader] = useState(false);
  const { id, stepperId } = useParams();
  const [data, setData] = useState({});
  const [application, setApplication] = useState({});
  const [stepper, setStepper] = useState([]);

  const getApplication = async () => {
    try {
      await instance
        .get(`${getAnApplicationRoute}/${id}`)
        .then((res) => {
          setData(res?.data);
          console.log(res?.data);
          setApplication(res?.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const GetStepperData = async () => {
    await instance
      .get(`${getStepper}/${stepperId}`)
      .then((res) => {
        setStepper(res?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    window.scroll(0, 0);
    getApplication();
    GetStepperData();
  }, [id]);

  const fnToCallGetFn = () => {
    getApplication();
    GetStepperData();
  };

  // console.log(application);

  return (
    <div className="container mx-auto w-full h-full pt-10 pb-28 ">
      {/* welcome Card */}
      <div className="bg-primary_colors p-5 rounded-xl ">
        <h1 className="text-white md:text-2xl font-bold my-3">
          Welcome To The Application Of{" "}
          <span className="capitalize"> {data?.studentName}</span>
        </h1>
        <div className="text-white mt-5 flex items-center justify-around gap-4">
          <div className="flex  flex-col justify-start w-full">
            <h5 className="font-bold">Name</h5>
            <h5 className="text-sm capitalize">{data?.studentName}</h5>
          </div>
          <div className="flex  flex-col justify-start w-full">
            <h5 className="font-bold">Country</h5>
            <h5 className="text-sm capitalize">{data?.country}</h5>
          </div>
          <div className="flex  flex-col justify-start w-full">
            <h5 className="font-bold">Intake</h5>
            <h5 className="text-sm capitalize">{stepper?.intake}</h5>
          </div>

          <div className="flex  flex-col justify-start w-full">
            <h5 className="font-bold">University</h5>
            <h5 className="text-sm capitalize">{stepper?.university}</h5>
          </div>

          <div className="flex  flex-col justify-start w-full">
            <h5 className="font-bold">Program</h5>
            <h5 className="text-sm capitalize">{stepper?.program}</h5>
          </div>

          <div className="flex  flex-col justify-start w-full">
            <h5 className="font-bold">Through</h5>
            <h5 className="text-sm capitalize">{stepper?.through}</h5>
          </div>
        </div>
      </div>

      {/* Tracking process */}
      <div className="w-full p-2 border mt-5 rounded-xl bg-white shadow-xl overflow-hidden">
        <h1 className="p-3 px-5 font-bold">Tracking Progress</h1>
        <hr />
        {/* <div className="hidden md:block mt-3 absolute z-20 bg-white text-sm p-3 px-5">
          <h1 className="font-semibold ">#Acknowledgement Number: </h1>
          <h5 className="text-xs"> {data._id}</h5>
        </div> */}

        {/* Tracking  */}
        <div className="w-full h-[850px] flex flex-col md:flex-row p-3 px-5">
          <div className="w-full md:w-1/4 overflow-scroll order-2 md:order-1">
            <div className="md:mt-5">
              {/* <div className=" md:hidden my-3 z-20 bg-white text-sm">
                <h1 className="font-semibold ">#Acknowledgement Number:</h1>
                <h5>{data._id}</h5>
              </div> */}
              <TrackerVertical data={stepper} />
            </div>
          </div>
          <div className="rounded-lg bg-[#F9F9F9] w-full md:w-3/4 mt-3 p-5 order-1">
            <RightSide
              data={stepper}
              cb={fnToCallGetFn}
              application={application}
            />
          </div>
        </div>
      </div>
      {loader && <ReqLoader />}
    </div>
  );
};

export default Application;

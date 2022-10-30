import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "../../NavBar";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import { avgbusspeed } from "../../../constants";

//navigate to login when logout
const AddRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [stopData, setStopData] = useState([]);
  // data
  const [rname, setRname] = useState("");
  const [bus, setBus] = useState("");
  const [startPoint, setStartPoint] = useState("");
  const [startTime, setStartTime] = useState("");
  const [stopname, setStopname] = useState("");
  const [stopTime, setStopTime] = useState("");

  //dsialed
  const [disable, setDisable] = useState(false);

  const AddRoute = async () => {
    console.log("user",user.user.name)
    
    if (!rname) {
      toast.error("enter a Route Name");
      return;
    }
    if (bus.length === 0) {
      toast.error("allocate a bus");
      return;
    }
    if (!startPoint) {
      toast.error("enter startPoint");
      return;
    }
    if (!startTime) {
      toast.error("enter startTime");
      return;
    }
    if (stopData.length === 0) {
      toast.error("enter atleast one Stop");
      return;
    }
    var endtime = stopData.map((rank, i, row) => {
      if (i + 1 === stopData.length) {
        console.log("rank",rank.stopTime)
        return rank.stopTime
      }
    });
    
    const finalstoptime=endtime[endtime.length-1]  
    

    var a = moment(finalstoptime, "HH:mm");
    var b = moment(startTime, "HH:mm");
    console.log('b',b)
    //get diference in minutes
    const timediff = a.diff(b, "minutes");
    a.diff(b, "minutes", true);
    //distance from start point
    const distance = Math.ceil((timediff / 60) * avgbusspeed);
    console.log('distance',distance)
    try {
       const response = await axios.post(
      "http://localhost:5000/api/v1/route/addroute",
      {
        "Routename": rname,
        "bus": bus,
        "startpoint": startPoint,
        "stops": stopData,
        "starttime": startTime,
        "endtime": finalstoptime,
        "totdistance": distance,
        "addedby":user.user.name
      }
    );
    await toast.success("added successfully");
    navigate("/ManagerDashboard");
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.msg);
    }
   
    
  };

  //validation
  const AddStop = (e) => {
    if (!startTime) {
      toast.error("start time not added");
      return;
    }
    if (startTime >= stopTime) {
      toast.error("stoptime cannot be before start time");
      return;
    }
    const skillToCheck = stopname;
    const index = stopData.findIndex(
      ({ stopname }) => stopname === skillToCheck
    );
    if (index !== -1) {
      toast.info("Stop already added", { theme: "dark" });
      return;
    }
    let err = 0;
    if (stopData.length > 0) {
      stopData.map((rank, i, row) => {
        if (i + 1 === stopData.length) {
          if (rank.stopTime >= stopTime) {
            err = 1;
          } else {
            err = 2;
          }
        }
      });
    }
    console.log("err", err);
    if (err === 1) {
      toast.error("stoptime cannot be before prev time");
      return;
    }
    var distance = 0;
    if (stopData.length === 0) {
      var a = moment(stopTime, "HH:mm");
      var b = moment(startTime, "HH:mm");
      //get diference in minutes
      const timediff = a.diff(b, "minutes");
      a.diff(b, "minutes", true);
      //distance from start point
      distance = Math.ceil((timediff / 60) * avgbusspeed);
    } else {
      stopData.map((rank, i, row) => {
        if (i + 1 === stopData.length) {
          a = moment(stopTime, "HH:mm");
          b = moment(rank.stopTime, "HH:mm");
          //get diference in minutes
          const timediff = a.diff(b, "minutes");
          console.log("timedif", timediff);
          distance = Math.ceil((timediff / 60) * avgbusspeed);
          //distance=distance-rank.stopDistance
        }
      });
    }
    const data = {
      stopname: stopname,
      stopDistance: distance,
      index: stopData.length + 1,
      stopTime: stopTime,
    };

    setStopData([...stopData, data]);
    setDisable(true);
    console.log("stopData", stopData);
  };
  const timeedit = () => {
    console.log("time edit");
    // setDisable(false)
    // stopData.map(a=>{
    //   a.
    // })
  };

  return (
    <>
      {/* <button onClick={()=>{navigate('/ManagerDashboard')}} >Back</button>
        add route */}
      <NavBar />
      <div className="pl-10 pr-10 pt-5 w-full h-full">
        {/* back button */}
        <div>
          {" "}
          <div className="flex w-full bg-r">
            <button
              onClick={() => {
                navigate("/ManagerDashboard");
              }}
              type="button"
              class=" text-white bg-[#7789c3] hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                />
              </svg>

              <div className="pl-2 text">Back</div>
            </button>
            <div className="pl-4">
              <button
                onClick={AddRoute}
                type="button"
                class=" text-white bg-[#77c377] hover:bg-green-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>

                <div className="pl-2 text">Save</div>
              </button>
            </div>
          </div>
          {/* form */}
          <div className="flex justify-center w-full ">
            <div className="pt-4 w-1/2">
              <p className="font-sans text-xl font-bold">Enter Route Name</p>
              <input
                type="text"
                placeholder="Colombo Route"
                className="bg-gray-50 shadow-md h-12 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-full p-2.5"
                onChange={(e) => {
                  setRname(e.target.value);
                }}
              />
            </div>
            <div className="pt-4 pl-4 w-1/2">
              <p className="font-sans text-xl font-bold">Allocate Bus</p>
              <select
                id="countries"
                className="bg-gray-50 shadow-md h-12 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-full p-2.5"
                onChange={(e) => {
                  setBus(e.target.value);
                }}
              >
                <option selected>Choose a bus</option>
                <option value="C001">C001</option>
                <option value="C002">C002</option>
                <option value="C003">C003</option>
                <option value="C004">C004</option>
              </select>
            </div>
          </div>
          {/* route plan part */}
          <div className="flex justify-center w-full ">
            <div className="pt-10 w-1/2">
              <p className="font-sans text-xl font-bold">
                Enter Starting Point
              </p>
              <input
                type="text"
                placeholder="Colombo Route"
                className="bg-gray-50 shadow-md h-12 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-full p-2.5"
                onChange={(e) => {
                  setStartPoint(e.target.value);
                }}
              />
            </div>
            <div className="pt-10 pl-4 w-1/4">
              <>
                {disable === true && (
                  <p className="font-sans text-xl font-bold">
                    Enter Starting Time{" "}
                    <button
                      className="text-sm font-medium  text-blue-600 underline"
                      onClick={timeedit}
                    >
                      Update table with new start time
                    </button>
                  </p>
                )}
                {disable === false && (
                  <p className="font-sans text-xl font-bold">
                    Enter Starting Time{" "}
                  </p>
                )}
                <input
                  type="time"
                  placeholder="8:30pm"
                  className="bg-gray-50 shadow-md h-12 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-full p-2.5"
                  onChange={(e) => {
                    setStartTime(e.target.value);
                  }}
                />
              </>
            </div>
          </div>
          <div className="flex justify-center ≈ pt-12">
            <div className="pt-4 w-full pl-56 pr-56">
              <p className="font-sans text-xl font-bold">Next Stop</p>
              <div className=" w-full">
                <input
                  type="text"
                  placeholder="Bus Stop Name"
                  onChange={(e) => {
                    setStopname(e.target.value);
                    e.target.value("");
                  }}
                  className="bg-gray-50 shadow-md  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-4/5  p-2.5"
                />
                <input
                  type="time"
                  // min={startTime}
                  placeholder="Distance from prev stop"
                  onChange={(e) => {
                    setStopTime(e.target.value);
                  }}
                  className="bg-gray-50 shadow-md  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-1/5  p-2.5"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center pt-12">
            <button onClick={AddStop}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-10 h-10"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="grid justify-items-center  w-full">
            {stopData.length !== 0 && (
              <>
                <div class="overflow-x-auto relative w-full pt-4">
                  <table class="w-full text-sm text-left text-black ">
                    <thead class="text-xs uppercase bg-[#F5DAA4] text-black">
                      <tr>
                        <th scope="col" class="py-3 px-6">
                          Stop
                        </th>
                        <th scope="col" class="py-3 px-6">
                          Stop Name
                        </th>
                        <th scope="col" class="py-3 px-6">
                          Distance
                        </th>
                        <th scope="col" class="py-3 px-6">
                          Arival time
                        </th>
                        {/* <th scope="col" class="py-3 px-6">
                          Remove
                        </th> */}
                      </tr>
                    </thead>
                    {stopData.map((stop) => (
                      <tbody>
                        <tr class="bg-gray-50 shadow-md  border border-gray-300 text-gray-900 text-sm rounded-lg">
                          <td class="py-4 px-6">{stop.index}</td>
                          <td class="py-4 px-6">{stop.stopname}</td>
                          <td class="py-4 px-6">{stop.stopDistance}Km</td>
                          <td class="py-4 px-6">
                            {moment(stop.stopTime, "HH:mm").format("hh:mm A")}
                          </td>
                          {/* <td class="py-4 px-6">Remove</td> */}
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </>
            )}
          </div>
          {/* route plan part */}
        </div>
      </div>
    </>
  );
};

export default AddRoute;

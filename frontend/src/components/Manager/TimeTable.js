import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ViewRoutes from "./Sub-Components/ViewRoutes";
import generatePDF from "../../utils/report";

//navigate to login when logout
const TimeTable = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [routes, setRoutes] = useState([]);
  const [viewWin, setViewWin] = useState(false);
  const [id, setID] = useState([]);

  //get all routes
  const getAllroutes = async () => {
    const res = await axios.get("http://localhost:5000/api/v1/route/getroutes");
    console.log(res.data.routes);
    setRoutes(res.data.routes);
  };

  //delete route
  const delroute = async (id) => {
    console.log("res", id);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/route/delroute",
        {
          id: id,
        }
      );
      console.log("res", res);
      toast.success("deleted");
    } catch (error) {
      toast.error("error del");
    }
    getAllroutes();
  };

  //view one route
  const viewRoute = async (route) => {
    setID(route);
    setViewWin(true);
  };
  //generate report
  const genReport = async () => {
    const res = await axios.get("http://localhost:5000/api/v1/route/report");
    
    generatePDF(res.data.report,res.data.totalUsers,user.user.name)
  };
  useEffect(() => {
    getAllroutes();
  }, []);
  return (
    <>
      <h1 className="text-xl pl-4 pt-4">Manage Time Tables</h1>
      {viewWin === false && (
        <div className="w-full pl-4 pt-4 pr-4">
          {/* search and add */}
          <div className="flex w-full">
            <div className="w-1/4">
              <form>
                <label
                  for="default-search"
                  class="mb-2 text-sm font-medium sr-only text-gray-300"
                >
                  Search
                </label>
              </form>
            </div>
            <div className="flex justify-end h-full w-full">
              <button
                onClick={genReport}
                type="button"
                class=" text-white bg-[#8bc377] hover:bg-[#44cb12] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-3.5 text-center inline-flex items-center "
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
                    d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                  />
                </svg>
                <div>Generate Report</div>
              </button>
              <div className="pr-4"></div>
              <button
                onClick={() => {
                  navigate("/addroute");
                }}
                type="button"
                class=" text-white bg-[#7789c3] hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-3.5 text-center inline-flex items-center "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 pr-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                <div>Add New Route</div>
              </button>
            </div>
          </div>
          {/* table */}
          <div class="overflow-x-auto relative pt-2">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs  uppercase bg-[#fdcd6b] text-gray-900">
                <tr>
                  <th scope="col" class="py-3 px-6">
                    Route Name
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Created By
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Allocated bus
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Start time
                  </th>
                  <th scope="col" class="py-3 px-6">
                    End time
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Total distance
                  </th>
                  <th scope="col" class="py-3 px-6"></th>
                </tr>
              </thead>
              <tbody>
                {routes.map((route) => (
                  <tr class="bg-[#f3e2c0] border-gray-700">
                    <th
                      scope="row"
                      class="py-4 px-6 font-medium text-[#414141] whitespace-nowrap"
                    >
                      <button
                        onClick={(e) => {
                          viewRoute(route);
                        }}
                        className="hover:text-[#2e6aff] hover:underline"
                      >
                        {" "}
                        {route.Routename}{" "}
                      </button>
                    </th>
                    <th
                      scope="row"
                      class="py-4 px-6 font-medium text-[#414141] whitespace-nowrap"
                    >
                      {route.addedby}
                    </th>
                    <th
                      scope="row"
                      class="py-4 px-6 font-medium text-[#414141] whitespace-nowrap"
                    >
                      {route.bus}
                    </th>
                    <th
                      scope="row"
                      class="py-4 px-6 font-medium text-[#414141] whitespace-nowrap"
                    >
                      {route.starttime}
                    </th>
                    <th
                      scope="row"
                      class="py-4 px-6 font-medium text-[#414141] whitespace-nowrap"
                    >
                      {route.endtime}
                    </th>
                    <th
                      scope="row"
                      class="py-4 px-6 font-medium text-[#414141] whitespace-nowrap"
                    >
                      {route.totdistance}Km
                    </th>
                    <th
                      scope="row"
                      class="py-4 px-6 font-medium text-[#414141] whitespace-nowrap"
                    >
                      <div className="flex">
                        {/* <div><button  class="text-white   bg-[#5d8e62] hover:bg-[#379540] focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-2 py-1 ">Update</button></div> */}
                        <div className="pl-4">
                          <button
                            onClick={() => {
                              delroute(route._id);
                            }}
                            class="text-white   bg-[#8e5d5d] hover:bg-[#953737] focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-2 py-1 "
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {viewWin === true && <ViewRoutes id={id} setViewWin={setViewWin} />}
    </>
  );
};

export default TimeTable;

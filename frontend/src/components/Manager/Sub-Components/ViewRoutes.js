import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//navigate to login when logout
const ViewRoutes = ({ id, setViewWin }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  console.log(id);
  return (
    <div className="w-full pl-4 pt-4 pr-4">
      {/* search and add */}
      <div className=" w-full">
        <div>
          <button
            onClick={() => {
              setViewWin(false);
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
        </div>
        <br />
        <div className="h-full w-full overflow-auto ">
          <br />
          <div className="mb-4 overflow-hidden bg-[#fbd995] border-2  shadow b sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Route Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Route ID: {id._id}
              </p>
            </div>

            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-[#f3e2c0] px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Route Name:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {id.Routename}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Added By
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {id.addedby}
                  </dd>
                </div>
                <div className="bg-[#f3e2c0] px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Allocated bus:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {id.bus}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Created On:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {/* {id.createdAt} */}
                    {moment(id.createdAt).utc().format("YYYY-MM-DD")}
                  </dd>
                </div>
                {/* {moment(eventApply.viewData.createdAt).utc().format('YYYY-MM-DD')} */}
                <div className="bg-[#f3e2c0] px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Start Point:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {id.startpoint}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Start Time:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {/* {id.createdAt} */}
                    {id.starttime}
                  </dd>
                </div>
                <div className="bg-[#f3e2c0] px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Total Distance:
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {id.totdistance}Km
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="font-sans text-xl pl-2">Route</div>
          <div className="mb-4 flex justify-center overflow-hidden bg-white border-2 shadow b sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs  uppercase bg-[#fdcd6b] text-gray-900">
                <tr>
                  <th scope="col" class="py-3 px-6">
                    Stop No
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Stop Name
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Arival Time at Stop
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Distance From Previouse STop
                  </th>
                </tr>
              </thead>
              <tbody>
                {id.stops.map((route) => (
                  <tr class="bg-[#f3e2c0] border-gray-700">
                    <th
                      scope="row"
                      class="py-4 px-6 font-medium text-[#414141] whitespace-nowrap"
                    >
                      {route.index}
                    </th>
                    <th
                      scope="row"
                      class="py-4 px-6 font-medium text-[#414141] whitespace-nowrap"
                    >
                      {route.stopname}
                    </th>
                    <th
                      scope="row"
                      class="py-4 px-6 font-medium text-[#414141] whitespace-nowrap"
                    >
                      {route.stopTime}
                    </th>
                    <th
                      scope="row"
                      class="py-4 px-6 font-medium text-[#414141] whitespace-nowrap"
                    >
                      {route.stopDistance}Km{" "}
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRoutes;

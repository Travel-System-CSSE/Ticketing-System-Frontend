import React ,{useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import ViewRoutes from "./Sub-Components/ViewRoutes";


//navigate to login when logout
const TimeTable = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  const [routes,setRoutes]=useState([])
  const [viewWin,setViewWin]=useState(false)
  const [id,setID]=useState([])

  const getAllroutes = async () => {
    const res = await axios.get('http://localhost:5000/api/v1/route/getroutes')
    console.log(res.data.routes)
    setRoutes(res.data.routes)
  }

  const delroute = async (id) => {
    console.log('res',id)
    try {
      const res = await axios.post('http://localhost:5000/api/v1/route/delroute',{
        "id":id
      }) 
      console.log('res',res)
      toast.success("deleted");
    } catch (error) {
      toast.error("error del");
    }
    getAllroutes()
  }

  const viewRoute = async (route) => {
    
    setID(route)
    setViewWin(true)
  }
  useEffect(() => {
    getAllroutes()
  }, [])

  return (
    <>
      <h1 className="text-xl pl-4 pt-4">Manage Time Tables</h1>
      {viewWin===false && (
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
              <div class="relative">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-500 dark:text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  class="block p-4 pl-10 w-full text-sm text-gray-900 bg-[#fdcd6b] rounded-lg  dark:placeholder-black"
                  placeholder="Search Routs"
                  required
                />
                <button
                  type="submit"
                  class="text-white absolute right-2.5 bottom-2.5 bg-[#7789c3] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
                >
                  Search
                </button>
              </div>
            </form>
          </div>
          <div className="flex justify-end h-full w-full">
            <button
                onClick={()=>{ navigate('/addroute')}}
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
                 <button onClick={(e)=>{viewRoute(route)}} className="hover:text-[#2e6aff] hover:underline"> {route.Routename} </button>
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
                    <div className="pl-4"><button onClick={()=>{delroute(route._id)}} class="text-white   bg-[#8e5d5d] hover:bg-[#953737] focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-2 py-1 ">Delete</button></div>
                  </div>
                </th>
              </tr>
               ))}
            </tbody>
          </table>
        </div>
      </div>
      )}
      {viewWin===true && (
        <ViewRoutes id={id} setViewWin={setViewWin}/>
      )}
      
    </>
  );
};

export default TimeTable;

import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../components/NavBar";
import BGImage from '../assets/bg.png'
import { useState } from "react";
import TimeTable from "../components/Manager/TimeTable"
import axios from "axios";
import generatePDF from "../utils/report";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const [menueopt, setMenueopt] = useState('TIMETABLES')
  //generate report
  const genReport = async () => {
    const res = await axios.get("http://localhost:5000/api/v1/route/report");
    
    generatePDF(res.data.report,res.data.totalUsers,user.user.name)
  };
  //if status is false user has not set account therfore load user info component

  return (
    <>
      <NavBar />
      <div className="flex h-screen">
        <div className="w-1/5  bg-[#F5DAA5]" >
          {/* sidebar */}
          <div class="grid grid-rows h-screen pt-10 justify-center">
            <button className="w-76 text-2xl" onClick={() => { setMenueopt("DashBoard") }}>DashBoard</button>
            <button className="w-76 text-2xl" onClick={() => { setMenueopt("TOKEN") }}>TOKEN</button>
            <button className="w-76 text-2xl" onClick={() => { setMenueopt("TIMETABLES") }}>TIMETABLES</button>
            <button className="w-76 text-2xl" onClick={() => { setMenueopt("FINANCES") }}>FINANCES</button>
            <button className="w-76 text-2xl" onClick={() => { setMenueopt("EMPLOYEES") }}>EMPLOYEES</button>
            <button className="w-76 text-2xl" onClick={() => { setMenueopt("PASSENGERS") }}>PASSENGERS</button>
            <button className="w-76 text-xl" onClick={genReport}>REPORTS</button>

          </div>
        </div>
        <div className="w-full">
          {menueopt !== 'TIMETABLES' && (
            <>
              comming soon
            </>
          )}
          {menueopt === 'TIMETABLES' && (
            <>
              <TimeTable />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;


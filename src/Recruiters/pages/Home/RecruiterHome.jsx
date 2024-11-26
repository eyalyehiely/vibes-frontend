import React, { useState, useEffect } from "react";
import CardDataStats from "../../../components/CardDataStats";
import RecruiterDefaultLayout from "../../components/RecruiterDefaultLayout";
import CompanyBoard from "../../components/CompanyBoard";
import getRecruiterJobs from "../../functions/crud/getRecruiterJobs";
import { jwtDecode } from "jwt-decode";
import RecruiterProfile from "./RecruiterProfile";
import { RiPagesLine } from "react-icons/ri";
import { LiaUserFriendsSolid } from "react-icons/lia";

function RecruiterHome() {
  const [jobs, setJobs] = useState([]);
  const token = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens")).access
    : null;
  const decodedToken = jwtDecode(token);
  const recruiter_id = decodedToken.user_id;

  useEffect(() => {
    if (token) {
      getRecruiterJobs(recruiter_id, token, setJobs);
    }
  }, [token]);

  return (
    <div style={{ backgroundColor: "#f7f4e3" }}>
      <RecruiterDefaultLayout>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
          {" "}
          <CompanyBoard />
          <CardDataStats
            title="Total Jobs"
            total={jobs.length || "No available data"}
            rate="0.43%"
            levelUp
          >
            <RiPagesLine size={20} color="purple" />
          </CardDataStats>
          <CardDataStats
            title="Total Users"
            total="3.456"
            rate="0.95%"
            levelDown
          >
            <LiaUserFriendsSolid size={20} color="purple" />
          </CardDataStats>
        </div>
        <br />
        <RecruiterProfile />
      </RecruiterDefaultLayout>
    </div>
  );
}

export default RecruiterHome;

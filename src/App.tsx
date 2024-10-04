import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import TalentHome from './Talents/pages/Dashboard/TalentHome';
import TalentProfile from './Talents/pages/TalentProfile';
import TalentSignUp from './Talents/pages/TalentSignUp';
import TalentContactUs from './Talents/pages/TalentContactUs'
import MySearchings from './Talents/pages/MySearchings'

import TalentInbox from './Talents/pages/TalentInbox'
import TalentMessages from './Talents/pages/TalentMessages'



// Companies:
import CompanySignUp from './Companies/pages/CompanySignUp'
import CompanyHome from './Companies/pages/Dashboard/CompanyHome.jsx'
import CompanyProfile from './Companies/pages/CompanyProfile'
import RecruitersPage from './Companies/pages/CompanyRecruitersPage.jsx'
import AvailableJobs from './Companies/pages/AvailableJobs'
import CompanyContactUs from './Companies/pages/CompanyContactUs.jsx';
import Payment from './Companies/pages/Payment/Payment.jsx'
import TalentsPage from './Companies/pages/TalentsPage'
import CompanyMessages from './Companies/pages/CompanyMessages'


// Recruiters
import RecruiterHome from './Recruiters/pages/Dashboard/RecruiterHome'
import RecruiterProfile from './Recruiters/pages/RecruiterProfile'
import RecruiterContactUs from './Recruiters/pages/RecruiterContactUs.jsx';
import MyColleagues from './Recruiters/pages/MyColleagues.jsx'
import RecruiterJobs from './Recruiters/pages/RecruiterJobs.jsx'
import Messages from './Recruiters/pages/Messages.jsx';






// Auth:
import ResetPassword from './GeneralPages/ResetPassword.jsx';
import ChangePassword from './GeneralPages/ChangePassword.jsx';
import SignIn from './GeneralPages/SignIn.jsx';


// General:
import PricingTables from './GeneralPages/PricingTables.jsx';
import ErrorPage from './GeneralPages/ErrorPage.jsx';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Faqs from './GeneralPages/Faqs.js';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
    
      <Routes>
        {/* Talent */}
      <Route
          path="/auth/talent/signup"
          element={
            <>
              <PageTitle title="Signup | Talent-Bridge" />
              <TalentSignUp />
            </>
          }
        />
        <Route
          path='talent/home'
          element={
            <>
              <PageTitle title="Talent Home | Talent-Bridge" />
              <TalentHome />
            </>
          }
        />

        <Route
          path="/talent/profile"
          element={
            <>
              <PageTitle title="Profile | Talent-Bridge" />
              <TalentProfile />
            </>
          }
        />


        <Route
          path="/talent/inbox"
          element={
            <>
              <PageTitle title="inbox | Talent-Bridge" />
              <TalentInbox />
            </>
          }
        /> 

        <Route
          path="/talent/messages"
          element={
            <>
              <PageTitle title="messages | Talent-Bridge" />
              <TalentMessages />
            </>
          }
        />      

      
        <Route
          path="/talent/contactUs"
          element={
            <>
              <PageTitle title="Contact Us | Talent-Bridge" />
              <TalentContactUs />
            </>
          }
        />

        <Route
          path="/faqs"
          element={
            <>
              <PageTitle title="Faqs | Talent-Bridge" />
              <Faqs />
            </>
          }
        />

        <Route
          path="/talent/searchings"
          element={
            <>
              <PageTitle title="My searchings | Talent-Bridge" />
              <MySearchings />
            </>
          }
        />



{/* ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----  */}
        
        
        {/* Auth */}

        <Route
          path="/"
          element={
            <>
              <PageTitle title="Signin | Talent-Bridge" />
              <SignIn />
            </>
          }
        />
        
        <Route
          path="/auth/reset-password"
          element={
            <>
              <PageTitle title="Reset Password | Talent-Bridge" />
              <ResetPassword />
            </>
          }
        />

          <Route
            path="/auth/reset-password/:token"
            element={
              <>
                <PageTitle title="Change Password | Talent-Bridge" />
                <ChangePassword />
              </>
            }
          />
        {/* ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----  */}
        {/* Company */}

        <Route
          path="/auth/company/signup"
          element={
            <>
              <PageTitle title="Signup | Talent-Bridge" />
              <CompanySignUp />
            </>
          }
        />

        
        <Route
          path="/company/home"
          element={
            <>
              <PageTitle title="Company Home | Talent-Bridge" />
              <CompanyHome />
            </>
          }
        />


        <Route
          path="/company/profile"
          element={
            <>
              <PageTitle title="Profile | Talent-Bridge" />
              <CompanyProfile />
            </>
          }
        />

        <Route
          path="/company/recruiters"
          element={
            <>
              <PageTitle title="recruiters | Talent-Bridge" />
              <RecruitersPage />
            </>
          }
        />


        <Route
          path="/company/available-jobs"
          element={
            <>
              <PageTitle title="Available-Jobs | Talent-Bridge" />
              <AvailableJobs />
            </>
          }
        />

        <Route
          path="/company/messages"
          element={
            <>
              <PageTitle title="Available-Jobs | Talent-Bridge" />
              <CompanyMessages />
            </>
          }
        />


        <Route
          path="/company/ContactUs"
          element={
            <>
              <PageTitle title="Contact Us | Talent-Bridge" />
              <CompanyContactUs />
            </>
          }
        />

        <Route
          path="/company/payment"
          element={
            <>
              <PageTitle title="Payment | Talent-Bridge" />
              <Payment />
            </>
          }
        />


          <Route
          path="/jobs/:job_id/talents"
          element={

            <>
              <PageTitle title="search talents | Talent-Bridge" />
              <TalentsPage />
            </>
          }
        />


          <Route
          path="/company/messages"
          element={

            <>
              <PageTitle title="Messages | Talent-Bridge" />
              <CompanyMessages />
            </>
          }
        />

{/* ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----  */}
        {/* Recruiters */}

        <Route
          path="/recruiter/home"
          element={
            <>
              <PageTitle title="Company Home | Talent-Bridge" />
              <RecruiterHome />
            </>
          }
        />


        <Route
          path="/recruiter/profile"
          element={
            <>
              <PageTitle title="Recruiter Profile | Talent-Bridge" />
              <RecruiterProfile />
            </>
          }
        />


        <Route
          path="/recruiter/contact_us"
          element={
            <>
              <PageTitle title="Contact Us | Talent-Bridge" />
              <RecruiterContactUs />
            </>
          }
        />


        <Route
          path="/recruiter/my_colleagues"
          element={
            <>
              <PageTitle title="My Colleagues | Talent-Bridge" />
              <MyColleagues />
            </>
          }
        />


        <Route
          path="/recruiter/jobs"
          element={
            <>
              <PageTitle title="My jobs | Talent-Bridge" />
              <RecruiterJobs />
            </>
          }
        />


        <Route
          path="/recruiter/messages"
          element={
            <>
              <PageTitle title="Messages | Talent-Bridge" />
              <Messages />
            </>
          }
        />



{/* ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- */}

        {/* general */}


       
        
  
        <Route
          path="/pages/pricing-tables"
          element={
            <>
              <PageTitle title="Pricing Tables | Talent-Bridge" />
              <PricingTables />
            </>
          }
        />
        <Route
          path="/pages/error-page"
          element={
            <>
              <PageTitle title="Error Page | Talent-Bridge" />
              <ErrorPage />
            </>
          }
        />
        
        
      </Routes>
    </>
  );
}

export default App;

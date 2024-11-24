import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import TalentHome from './Talents/pages/Dashboard/TalentHome';
import TalentProfile from './Talents/pages/TalentProfile';
import TalentSignUp from './Talents/pages/TalentSignUp';
import TalentContactUs from './Talents/pages/TalentContactUs'
import MySearchings from './Talents/pages/MySearchings'
import CompleteProfile from './Talents/components/CompleteProfile'
// import TalentInbox from './Talents/pages/TalentInbox'
// import TalentMessages from './Talents/pages/TalentMessages'



// Companies:
import CompanySignUp from './Companies/pages/CompanySignUp'
import CompanyHome from './Companies/pages/Dashboard/CompanyHome.jsx'
import CompanyProfile from './Companies/pages/CompanyProfile'
import RecruitersPage from './Companies/pages/CompanyRecruitersPage.jsx'
import AvailableJobs from './Companies/pages/AvailableJobs'
import CompanyContactUs from './Companies/pages/CompanyContactUs.jsx';
import Payment from './Companies/pages/Payment/Payment.jsx'
import CompanyTalentsPage from './Companies/pages/CompanyTalentsPage'
// import CompanyMessages from './Companies/pages/CompanyMessages'
import CreateNotificationBoard from  './Companies/pages/CreateNotificationBoard'


// Recruiters
import RecruiterHome from './Recruiters/pages/Home/RecruiterHome.jsx'
import RecruiterContactUs from './Recruiters/pages/RecruiterContactUs.jsx';
import MyColleagues from './Recruiters/pages/Colleagues/MyColleagues.jsx'
import RecruiterJobs from './Recruiters/pages/Jobs/RecruiterJobs.jsx'
import Messages from './Recruiters/pages/Messages.jsx';
import RecruiterTalentsPage from './Recruiters/pages/SearchTalents/RecruiterTalentsPage.jsx'
import RecruiterTags from './Recruiters/pages/Tags/RecruiterTags.jsx'
import ReadTalentProfile from './Recruiters/pages/Tags/ReadTalentProfile'
import Calendar from './Recruiters/pages/Calendar'







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
import Main from './GeneralPages/About/Main'

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
          path="/complete-profile"
          element={
          <>
            <PageTitle title='complete-profile | Talent-Bridge'/>
            <CompleteProfile />
          </>
          }
        />



        {/* <Route
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
        />       */}

      
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
          path="/signin"
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

        {/* <Route
          path="/company/messages"
          element={
            <>
              <PageTitle title="Messages | Talent-Bridge" />
              <CompanyMessages />
            </>
          }
        /> */}


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
          path="/company/jobs/:job_id/talents"
          element={

            <>
              <PageTitle title="search talents | Talent-Bridge" />
              <CompanyTalentsPage />
            </>
          }
        />


          {/* <Route
          path="/company/messages"
          element={

            <>
              <PageTitle title="Messages | Talent-Bridge" />
              <CompanyMessages />
            </>
          }
        /> */}

        <Route
          path="/company/Notifications"
          element={

            <>
              <PageTitle title="Notifications | Talent-Bridge" />
              <CreateNotificationBoard />
            </>
          }
        />
{/* ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----  */}
        {/* Recruiters */}

        <Route
          path="/recruiter/home"
          element={
            <>
              <PageTitle title="Recruiter Home | Talent-Bridge" />
              <RecruiterHome />
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
          path="/recruiter/tags"
          element={
            <>
              <PageTitle title="My tags | Talent-Bridge" />
              <RecruiterTags />
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

        <Route
          path="/recruiter/calendar"
          element={
            <>
              <PageTitle title="Calendar | Talent-Bridge" />
              <Calendar />
            </>
          }
        />


        <Route
          path="/recruiter/jobs/:job_id/talents"
          element={

            <>
              <PageTitle title="Search Talents | Talent-Bridge" />
              <RecruiterTalentsPage />
            </>
          }
        />

        <Route
          path="/recruiter/talents/:talent_id/"
          element={
            <>
              <PageTitle title="Talent Profile | Talent-Bridge" />
              <ReadTalentProfile />
            </>
          }
        />



{/* ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- */}

        {/* general */}
        <Route
          path="/"
          element={
            <>
              <PageTitle title="Info | Talent-Bridge" />
              <Main />
            </>
          }
        />

       
      
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

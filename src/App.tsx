import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import TalentHome from './Talents/pages/Dashboard/TalentHome';
import TalentProfile from './Talents/pages/TalentProfile';
import ContactUs from './GeneralPages/ContactUs.jsx';
import PricingTables from './GeneralPages/PricingTables.jsx';
import ErrorPage from './GeneralPages/ErrorPage.jsx';
import ResetPassword from './GeneralPages/ResetPassword.jsx';
import TalentSignIn from './Talents/pages/TalentSignIn';
import TalentSignUp from './Talents/pages/TalentSignUp';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';



// Companies:
import CompanySignUp from './Companies/pages/CompanySignUp'
import CompanyHome from './Companies/pages/Dashboard/CompanyHome.jsx'


// Recruiters
import RecruiterHome from './Recruiters/pages/Dashboard/RecruiterHome'



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
{/* ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----  */}
        
        
        {/* Auth */}

        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | Talent-Bridge" />
              <TalentSignIn />
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






{/* ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- */}

        {/* general */}


      <Route
          path="/ContactUs"
          element={
            <>
              <PageTitle title="Contact Us | Talent-Bridge" />
              <ContactUs />
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

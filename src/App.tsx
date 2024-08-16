import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import ECommerce from './pages/Dashboard/ECommerce';
import Analytics from './pages/Dashboard/Analytics';
import Marketing from './pages/Dashboard/Marketing';
import CRM from './pages/Dashboard/CRM';
import Stocks from './pages/Dashboard/Stocks';
import Calendar from './pages/Calendar';
import Profile from './pages/Profile';
import TaskKanban from './pages/Task/TaskKanban';
import TaskList from './pages/Task/TaskList';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Tables from './pages/Tables/Tables';
import Settings from './pages/Pages/Settings';
import FileManager from './pages/Pages/FileManager';
import DataTables from './pages/Pages/DataTables';
import PricingTables from './pages/Pages/PricingTables';
import ErrorPage from './pages/Pages/ErrorPage';
import MailSuccess from './pages/Pages/MailSuccess';
import Messages from './pages/Messages';
import Inbox from './pages/Inbox';
import Invoice from './pages/Invoice';
import BasicChart from './pages/Chart/BasicChart';
import AdvancedChart from './pages/Chart/AdvancedChart';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import ButtonsGroup from './pages/UiElements/ButtonsGroup';
import Badge from './pages/UiElements/Badge';
import Breadcrumbs from './pages/UiElements/Breadcrumbs';
import Cards from './pages/UiElements/Cards';
import Dropdowns from './pages/UiElements/Dropdowns';
import Modals from './pages/UiElements/Modals';
import Tabs from './pages/UiElements/Tabs';
import Tooltips from './pages/UiElements/Tooltips';
import Popovers from './pages/UiElements/Popovers';
import Accordion from './pages/UiElements/Accordion';
import Notifications from './pages/UiElements/Notifications';
import Pagination from './pages/UiElements/Pagination';
import Progress from './pages/UiElements/Progress';
import Carousel from './pages/UiElements/Carousel';
import Images from './pages/UiElements/Images';
import Videos from './pages/UiElements/Videos';
import ResetPassword from './pages/Authentication/ResetPassword';
import SignIn from './pages/Authentication/TalentSignIn';
import SignUp from './pages/Authentication/SignUp';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import ProFormElements from './pages/Form/ProFormElements';
import ProFormLayout from './pages/Form/ProFormLayout';
import ProTables from './pages/Tables/ProTables';
import TermsConditions from './pages/Pages/TermsConditions';
import Faq from './pages/Pages/Faq';
import Teams from './pages/Pages/Teams';
import Avatars from './pages/UiElements/Avatars';
import List from './pages/UiElements/List';
import Spinners from './pages/UiElements/Spinners';
import ComingSoon from './pages/Authentication/ComingSoon';
import TwoStepVerification from './pages/Authentication/TwoStepVerification';
import UnderMaintenance from './pages/Authentication/UnderMaintenance';


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
        <Route
          index
          element={
            <>
              <PageTitle title="eCommerce Dashboard | Talent-Bridge" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/dashboard/analytics"
          element={
            <>
              <PageTitle title="Analytics Dashboard | Talent-Bridge" />
              <Analytics />
            </>
          }
        />
        <Route
          path="/dashboard/marketing"
          element={
            <>
              <PageTitle title="Marketing Dashboard | Talent-Bridge" />
              <Marketing />
            </>
          }
        />
        <Route
          path="/dashboard/crm"
          element={
            <>
              <PageTitle title="CRM Dashboard | Talent-Bridge" />
              <CRM />
            </>
          }
        />
        <Route
          path="/dashboard/stocks"
          element={
            <>
              <PageTitle title="Stocks Dashboard | Talent-Bridge" />
              <Stocks />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | Talent-Bridge - Tailwind CSS Admin Dashboard Template" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | Talent-Bridge" />
              <Profile />
            </>
          }
        />
        <Route
          path="/tasks/task-list"
          element={
            <>
              <PageTitle title="Task List | Talent-Bridge" />
              <TaskList />
            </>
          }
        />
        <Route
          path="/tasks/task-kanban"
          element={
            <>
              <PageTitle title="Task Kanban | Talent-Bridge" />
              <TaskKanban />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | Talent-Bridge" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/pro-form-elements"
          element={
            <>
              <PageTitle title="Pro Form Elements | Talent-Bridge" />
              <ProFormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | Talent-Bridge" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/forms/pro-form-layout"
          element={
            <>
              <PageTitle title="Pro Form Layout | Talent-Bridge" />
              <ProFormLayout />
            </>
          }
        />
        <Route
          path="/tables/tables"
          element={
            <>
              <PageTitle title="Tables | Talent-Bridge" />
              <Tables />
            </>
          }
        />
        <Route
          path="/tables/pro-tables"
          element={
            <>
              <PageTitle title="Pro Tables | Talent-Bridge" />
              <ProTables />
            </>
          }
        />
        <Route
          path="/tables/pro-tables"
          element={
            <>
              <PageTitle title="Tables | Talent-Bridge" />
              <Tables />
            </>
          }
        />
        <Route
          path="/pages/settings"
          element={
            <>
              <PageTitle title="Settings | Talent-Bridge" />
              <Settings />
            </>
          }
        />
        <Route
          path="/pages/file-manager"
          element={
            <>
              <PageTitle title="File Manager | Talent-Bridge" />
              <FileManager />
            </>
          }
        />
        <Route
          path="/pages/data-tables"
          element={
            <>
              <PageTitle title="Data Tables | Talent-Bridge" />
              <DataTables />
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
        <Route
          path="/pages/faq"
          element={
            <>
              <PageTitle title="Faq's | Talent-Bridge" />
              <Faq />
            </>
          }
        />
        <Route
          path="/pages/team"
          element={
            <>
              <PageTitle title="Terms & Conditions | Talent-Bridge" />
              <Teams />
            </>
          }
        />
        <Route
          path="/pages/terms-conditions"
          element={
            <>
              <PageTitle title="Terms & Conditions | Talent-Bridge" />
              <TermsConditions />
            </>
          }
        />
        <Route
          path="/pages/mail-success"
          element={
            <>
              <PageTitle title="Mail Success | Talent-Bridge" />
              <MailSuccess />
            </>
          }
        />
        <Route
          path="/messages"
          element={
            <>
              <PageTitle title="Messages | Talent-Bridge" />
              <Messages />
            </>
          }
        />
        <Route
          path="/inbox"
          element={
            <>
              <PageTitle title="Inbox | Talent-Bridge" />
              <Inbox />
            </>
          }
        />
        <Route
          path="/invoice"
          element={
            <>
              <PageTitle title="Invoice | Talent-Bridge" />
              <Invoice />
            </>
          }
        />
        <Route
          path="/chart/basic-chart"
          element={
            <>
              <PageTitle title="Basic Chart | Talent-Bridge" />
              <BasicChart />
            </>
          }
        />
        <Route
          path="/chart/advanced-chart"
          element={
            <>
              <PageTitle title="Advanced Chart | Talent-Bridge" />
              <AdvancedChart />
            </>
          }
        />
        <Route
          path="/ui/accordion"
          element={
            <>
              <PageTitle title="Accordion | Talent-Bridge" />
              <Accordion />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | Talent-Bridge" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/avatars"
          element={
            <>
              <PageTitle title="Avatars | Talent-Bridge" />
              <Avatars />
            </>
          }
        />
        <Route
          path="/ui/badge"
          element={
            <>
              <PageTitle title="Badge | Talent-Bridge" />
              <Badge />
            </>
          }
        />
        <Route
          path="/ui/breadcrumbs"
          element={
            <>
              <PageTitle title="Breadcrumbs | Talent-Bridge" />
              <Breadcrumbs />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | Talent-Bridge" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/ui/buttons-group"
          element={
            <>
              <PageTitle title="Buttons Groupo | Talent-Bridge" />
              <ButtonsGroup />
            </>
          }
        />
        <Route
          path="/ui/cards"
          element={
            <>
              <PageTitle title="Cards | Talent-Bridge" />
              <Cards />
            </>
          }
        />
        <Route
          path="/ui/carousel"
          element={
            <>
              <PageTitle title="Carousel | Talent-Bridge" />
              <Carousel />
            </>
          }
        />
        <Route
          path="/ui/dropdowns"
          element={
            <>
              <PageTitle title="Dropdowns | Talent-Bridge" />
              <Dropdowns />
            </>
          }
        />
        <Route
          path="/ui/images"
          element={
            <>
              <PageTitle title="Images | Talent-Bridge" />
              <Images />
            </>
          }
        />
        <Route
          path="/ui/list"
          element={
            <>
              <PageTitle title="List | Talent-Bridge" />
              <List />
            </>
          }
        />
        <Route
          path="/ui/modals"
          element={
            <>
              <PageTitle title="Modals | Talent-Bridge" />
              <Modals />
            </>
          }
        />
        <Route
          path="/ui/notifications"
          element={
            <>
              <PageTitle title="Notifications | Talent-Bridge" />
              <Notifications />
            </>
          }
        />
        <Route
          path="/ui/pagination"
          element={
            <>
              <PageTitle title="Pagination | Talent-Bridge" />
              <Pagination />
            </>
          }
        />
        <Route
          path="/ui/popovers"
          element={
            <>
              <PageTitle title="Popovers | Talent-Bridge" />
              <Popovers />
            </>
          }
        />
        <Route
          path="/ui/progress"
          element={
            <>
              <PageTitle title="Progress | Talent-Bridge" />
              <Progress />
            </>
          }
        />
        <Route
          path="/ui/spinners"
          element={
            <>
              <PageTitle title="Spinners | Talent-Bridge" />
              <Spinners />
            </>
          }
        />
        <Route
          path="/ui/tabs"
          element={
            <>
              <PageTitle title="Tabs | Talent-Bridge" />
              <Tabs />
            </>
          }
        />
        <Route
          path="/ui/tooltips"
          element={
            <>
              <PageTitle title="Tooltips | Talent-Bridge" />
              <Tooltips />
            </>
          }
        />
        <Route
          path="/ui/videos"
          element={
            <>
              <PageTitle title="Videos | Talent-Bridge" />
              <Videos />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | Talent-Bridge" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | Talent-Bridge" />
              <SignUp />
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
          path="/auth/coming-soon"
          element={
            <>
              <PageTitle title="Coming Soon | Talent-Bridge" />
              <ComingSoon />
            </>
          }
        />
        <Route
          path="/auth/two-step-verification"
          element={
            <>
              <PageTitle title="2 Step Verification | Talent-Bridge" />
              <TwoStepVerification />
            </>
          }
        />
        <Route
          path="/auth/under-maintenance"
          element={
            <>
              <PageTitle title="Under Maintenance | Talent-Bridge" />
              <UnderMaintenance />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;

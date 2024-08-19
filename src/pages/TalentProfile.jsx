import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import React, { useState, useEffect } from "react";
import userThree from "../images/user/user-03.png";
import DefaultLayout from "../layout/DefaultLayout";
import getResidence from "../functions/getResidence";
import getLanguages from "../functions/getLanguages";
import saveTalentInfo from "../functions/talents/saveTalentInfo";
import getTalentDetails from "../functions/talents/getTalentDetails";

const TalentProfile = () => {
  const [talent, setTalent] = useState({});
  const [filteredResidence, setFilteredResidence] = useState([]);
  const [residenceSearchQuery, setResidenceSearchQuery] = useState("");
  const [residenceResults, setResidenceResults] = useState([]);
  const [languagesResult, setLanguagesResult] = useState([]);
  const [filteredlanguages, setFilteredlanguages] = useState([]);
  const [languagesSearchQuery, setLanguagesSearchQuery] = useState("");
  const [profileFormData, setprofileFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "male",
    email: "",
    password: "",
    phone_number: "",
    residence: "",
    languages: [],
    job_type: "office",
    job_sitting: "",
    field_of_interest: [],
    social_links: "",
    skills: [],
    work_history: [],
    companies_black_list: [],
    about_me: "",
    is_open_to_work: false,
    cv: "",
    recommendation_letter: "",
  });

  // useEffect(() => {
  //   if (token) {
  //     getTalentDetails(token, setTalent);
  //   }
  // }, [token]);

  // residence
  useEffect(() => {
    getResidence(setResidenceResults);
  }, []);

  useEffect(() => {
    if (residenceSearchQuery) {
      const query = residenceSearchQuery.toLowerCase();
      setFilteredResidence(
        residenceResults.filter((residence) =>
          residence.toLowerCase().includes(query)
        )
      );
    } else {
      setFilteredResidence(residenceResults);
    }
  }, [residenceSearchQuery, residenceResults]);

  const handleResidenceSearchChange = (e) => {
    setResidenceSearchQuery(e.target.value);
  };

  // languages

  useEffect(() => {
    getLanguages(setLanguagesResult);
  }, []);

  useEffect(() => {
    if (languagesSearchQuery) {
      const query = languagesSearchQuery.toLowerCase();
      setFilteredlanguages(
        languagesResult.filter((languages) =>
          languages.toLowerCase().includes(query)
        )
      );
    } else {
      setFilteredlanguages(languagesResult);
    }
  }, [languagesSearchQuery, languagesResult]);

  const handleLanguagesSearchChange = (e) => {
    setLanguagesSearchQuery(e.target.value);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setprofileFormData({
      ...profileFormData,
      [id]: id === "email" ? value.toLowerCase() : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission logic here
  };

  const {
    first_name,
    last_name,
    phone_number,
    email,
    gender,
    residence,
    profile_pic,
    job_type,
    job_sitting,
    field_of_interest,
    social_links,
    skills,
    languages,
    work_history,
    companies_black_list,
    about_me,
    is_open_to_work,
    cv,
    recommendation_letter,
  } = profileFormData;

  const handlePersonalInfoSubmit = (e) => {
    e.preventDefault();
    saveTalentInfo(profileFormData);
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Profile" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Talent Information
                </h3>
              </div>
              <div className="p-7">
                <form action="#" onSubmit={handleSubmit}>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    {/* first name */}
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="firstName"
                      >
                        First Name:{talent.first_name}
                      </label>
                    </div>

                    {/* last name */}
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="lastName"
                      >
                        Last Name: {talent.last_name}
                      </label>
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="gender"
                      >
                        Gender: {talent.gender}
                      </label>
                    </div>

                    {/* phone number */}
                    <div>
                      <div className="w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="phoneNumber"
                        >
                          Phone Number: {talent.phone_number}
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    {/* email */}
                    <div className="w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="emailAddress"
                      >
                        Email Address: {talent.email}
                      </label>
                    </div>

                    <div className="w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="residence"
                      >
                        Residence: {talent.residence}
                      </label>
                      {/* <span
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="residence"
                      id="residence"
                      list="residenceList"
                      value={talent.residence}
                      onChange={handleChange}
                      required
                    />
                    <datalist id="residenceList">
                      {filteredResidence.map((residence, index) => (
                        <option key={index} value={residence} />
                      ))}
                    </datalist> */}
                    </div>
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    {/* job type */}
                    <div className="w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="jobType"
                      >
                        Job Type: {talent.job_type}
                      </label>
                    </div>

                    {/* job sitting */}
                    <div className="w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="job sitting"
                      >
                        job sitting: {talent.job_sitting}
                      </label>
                    </div>
                  </div>

                  {/* field_of_interest */}
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="FieldsOfInterest"
                      >
                        Fields of interest: {talent.field_of_interest}
                      </label>
                    </div>

                    {/* social_links */}
                    <div className="w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="socialLinks"
                      >
                        Social links: {talent.social_links}
                      </label>
                    </div>
                  </div>
                  <br />

                  {/* skills */}
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="skills"
                      >
                        Skills: {talent.skills}
                      </label>
                    </div>

                    {/* languages */}
                    <div className="w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="languages"
                      >
                        Languages:
                      </label>
                      {/* <span
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="languages"
                        id="languages"
                        list="languagesList"
                        value={talent.languages}
                        onChange={handleChange}
                        required
                      />
                      <datalist id="languagesList">
                        {filteredlanguages.map((languages, index) => (
                          <option key={index} value={languages} />
                        ))}
                      </datalist> */}
                    </div>
                  </div>

                  {/* work history */}
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="workHistory"
                      >
                        Work history: {talent.work_history}
                      </label>
                    </div>

                    {/* company black list */}
                    <div className="w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="CompanyBlackList"
                      >
                        Companies black list: {talent.companies_black_list}
                      </label>
                    </div>
                  </div>

                  {/* about me */}
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="about me"
                    >
                      About Me:
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">{talent.about_me}</span>
                    </div>
                  </div>

                  {/* is open to work */}
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="about me"
                    >
                      Are you open to work ?
                      <span
                        type="checkbox"
                        name="isOpenToWork"
                        id="isOpenToWork"
                        onChange={handleChange}
                        value={talent.is_open_to_work}
                      ></span>
                    </label>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Docs */}

          {/* profile pic */}
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Your Profile photo
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-14 w-14 rounded-full">
                      <img src={userThree} alt="User" />
                    </div>
                    <div>
                      <span className="mb-1.5 text-black dark:text-white">
                        Edit your Profile photo
                      </span>
                    </div>
                  </div>

                  <div
                    id="FileUpload"
                    className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
                  >
                    <span
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                      onChange={(e) => console.log(e.target.files[0])} // handle file upload here
                    />
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                        {/* SVG for file upload icon */}
                      </span>
                      <p>
                        <span className="text-primary">Click to upload</span> or
                        drag and drop
                      </p>
                      <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                      <p>(max, 800 X 800px)</p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                      onClick={() => console.log("Save photo")}
                    >
                      Save
                    </button>

                    <button
                      className="flex justify-center rounded bg-danger px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                      onClick={() => console.log("Save letter")}
                    >
                      Delete
                    </button>
                  </div>
                </form>
              </div>

              {/* CV */}
              <div className="col-span-5 xl:col-span-2">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Your CV
                    </h3>
                  </div>

                  <div className="p-7">
                    <form action="#">
                      <div
                        id="FileUpload"
                        className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
                      >
                        <span
                          type="file"
                          accept="application/pdf"
                          className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                          onChange={(e) => console.log(e.target.files[0])} // handle file upload here
                        />
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                            {/* SVG for file upload icon */}
                          </span>
                          <p>
                            <span className="text-primary">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="mt-1.5">PDF files only</p>
                          <p>(max, 800 X 800px)</p>
                        </div>
                      </div>

                      <div className="flex justify-end gap-4.5">
                        <button
                          className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                          type="submit"
                          onClick={() => console.log("Save cv")}
                        >
                          Save
                        </button>

                        <button
                          className="flex justify-center rounded bg-danger px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                          type="submit"
                          onClick={() => console.log("Delete cv")}
                        >
                          Delete
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* recommendation letter */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Your recommendation letter
                    </h3>
                  </div>
                  <div className="p-7">
                    <form action="#">
                      <div
                        id="FileUpload"
                        className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
                      >
                        <span
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                          onChange={(e) => console.log(e.target.files[0])} // handle file upload here
                        />
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                            {/* SVG for file upload icon */}
                          </span>
                          <p>
                            <span className="text-primary">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                          <p>(max, 800 X 800px)</p>
                        </div>
                      </div>

                      <div className="flex justify-end gap-4.5">
                        <button
                          className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                          type="submit"
                          onClick={() => console.log("Save letter")}
                        >
                          Save
                        </button>

                        <button
                          className="flex justify-center rounded bg-danger px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                          type="submit"
                          onClick={() => console.log("Save letter")}
                        >
                          Delete
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default TalentProfile;

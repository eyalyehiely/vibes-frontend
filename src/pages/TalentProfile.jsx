import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import React, { useState, useEffect } from "react";
import userThree from "../images/user/user-03.png";
import DefaultLayout from "../layout/DefaultLayout";
import getResidence from "../functions/getResidence";
import getLanguages from "../functions/getLanguages";

const TalentProfile = () => {
  const [filteredResidence, setFilteredResidence] = useState([]);
  const [residenceSearchQuery, setResidenceSearchQuery] = useState("");
  const [residenceResults, setResidenceResults] = useState([]);
  const [languagesResult,setLanguagesResult] = useState([])
  const [filteredlanguages, setFilteredlanguages] = useState([]);
  const [languagesSearchQuery, setLanguagesSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "male",
    email: "",
    password: "",
    phone_number: "",
    residence: "",
    languages: [],
  });


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
    setFormData({
      ...formData,
      [id]: id === "email" ? value.toLowerCase() : value,
    });
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission logic here
  };

  const { first_name, last_name, phone_number, email, gender, residence,languages } =
    formData;

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Profile" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Personal Information
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
                        First Name<span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          {/* SVG here */}
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="firstName"
                          id="firstName"
                          value={first_name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* last name */}
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="lastName"
                      >
                        Last Name<span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          {/* SVG here */}
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="lastName"
                          id="lastName"
                          value={last_name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="w-full">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="gender"
                    >
                      Gender<span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        {/* SVG here */}
                      </span>
                      <select
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        name="gender"
                        id="gender"
                        value={gender}
                        onChange={handleChange}
                        required
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <br />
                  {/* phone number */}
                  <div>
                    <div className="w-full">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Phone Number
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        value={phone_number}
                        maxLength={15}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <br />
                  {/* email */}
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="emailAddress"
                    >
                      Email Address<span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        {/* SVG here */}
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="email"
                        name="emailAddress"
                        id="emailAddress"
                        value={email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="residence"
                    >
                      Residence
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="residence"
                      id="residence"
                      list="residenceList"
                      value={residence}
                      onChange={handleChange}
                      required
                    />
                    <datalist id="residenceList">
                      {filteredResidence.map((residence, index) => (
                        <option key={index} value={residence} />
                      ))}
                    </datalist>
                  </div>

                  

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="button"
                      onClick={() =>
                        setFormData({
                          first_name: "",
                          last_name: "",
                          gender: "זכר",
                          email: "",
                          password: "",
                          phone_number: "",
                          residence: "",
                          bio: "",
                        })
                      }
                    >
                      Cancel
                    </button>
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
                    <input
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
            </div>
          </div>
        </div>
      </div>




      {/* profession Data */}

      <div className="mx-auto max-w-270">
        <br />
        <br />
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                Profession Information
                </h3>
              </div>
              <div className="p-7">
                <form action="#" onSubmit={handleSubmit}>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    {/* job type */}
                    <div className="w-full">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="jobType"
                      >
                        Job Type
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          {/* SVG here */}
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="lastName"
                          id="lastName"
                          value={last_name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* job sitting */}
                  <div className="w-full">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="job sitting"
                    >
                      job sitting
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        {/* SVG here */}
                      </span>
                      <select
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        name="job sitting"
                        id="job sitting"
                        // value={}
                        onChange={handleChange}
                      >
                        <option value="office">Office</option>
                        <option value="remote">Remote</option>
                        <option value="hybrid">Hybrid</option>
                        <option value="other">Other</option>

                      </select>
                    </div>
                  </div>
                  <br />
                  {/* field_of_interest */}
                  <div>
                    <div className="w-full">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Fields of interest
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        value={phone_number}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <br />
                  {/* social_link */}
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="socialLink"
                    >
                      Social link 
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        {/* SVG here */}
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="url"
                        name="socialLink"
                        id="socialLink"
                        value={email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                    {/* skills */}
                  <div className="mb-5.5">
                  <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="skills"
                    >
                      Skills
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="skills"
                      id="skills"
                      list="skillsList"
                      // value={skills}
                      onChange={handleChange}
                      required
                    />
                    
                  </div>

                  {/* languages */}
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="languages"
                    >
                      Languages
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="languages"
                      id="languages"
                      list="languagesList"
                      value={languages}
                      onChange={handleChange}
                      required
                    />
                    <datalist id="languagesList">
                      {filteredlanguages.map((languages, index) => (
                        <option key={index} value={languages} />
                      ))}
                    </datalist>
                  </div>



                  {/* work history */}

                  {/* skills */}
                  <div className="mb-5.5">
                  <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="workHistory"
                    >
                      Work history
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="workHistory"
                      id="workHistory"
                      // value={work}
                      onChange={handleChange}
                    />
                    
                  </div>


                  {/* company black list */}

                  <div className="mb-5.5">
                  <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="CompanyBlackList"
                    >
                      Company black list
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="CompanyBlackList"
                      id="CompanyBlackList"
                      // value={work}
                      onChange={handleChange}
                    />
                    
                  </div>

                  {/* about me */}
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="about me"
                    >
                      About Me
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        {/* SVG here */}
                      </span>
                      <textarea
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        name="aboutMe"
                        id="aboutMe"
                        rows={6}
                        placeholder="Write about you."
                        // value={formData.about me}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                  
                  
                  {/* is open to work */}
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="about me">
                      Are you open to work ? 
                      
                      <input
                        type="checkbox"
                        name="isOpenToWork"
                        id="isOpenToWork"
                        onChange={handleChange}
                      ></input>
                    </label>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="submit"
                    >
                      Cancel
                    </button>
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
                    <input
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
              <br />
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
                    <input
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
    </DefaultLayout>
  );
};

export default TalentProfile;

import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import getTalentDetails from '../../functions/talents/getTalentDetails';
// import updateUser from '../../functions/users/updateUser';

function EditTalentProfile({ card }) {
  const [show, setShow] = useState(false);
  const [talent, setTalent] = useState({});
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    gender: "male",
    email: "",
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

  const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null;

  useEffect(() => {
    if (token) {
        getTalentDetails(token, setTalent);
    }
  }, [token]);

  const handleClose = () => {
    setShow(false);
    setData({
      first_name: talent.first_name || '',
      last_name: talent.last_name || '',
      email: talent.email || '',
      gender: talent.gender || '',
      phone_number:talent.phone_number || "",
      residence:talent.residence || "",
      languages:talent.languages || [],
      job_type:talent.job_type|| "office",
      job_sitting:talent.job_sitting || "",
      field_of_interest:talent.field_of_interest ||  [],
      social_links:talent.social_links || "",
      skills:talent.skills || [],
      work_history: talent.work_history || [],
      companies_black_list: talent.companies_black_list || [],
      about_me:talent.about_me || "",
      is_open_to_work: talent.is_open_to_work || false,
      cv:talent.cv || "",
      recommendation_letter:talent.recommendation_letter || "",
    });
  };

  const handleShow = () => {
    setShow(true);
    setData({
      first_name: talent.first_name || '',
      last_name: talent.last_name || '',
      email: talent.email || '',
      gender: talent.gender || '',
      life_status: talent.life_status || '',
      num_of_children: talent.num_of_children || 0,
      phone_number: talent.phone_number || '',
      birth_date: talent.birth_date || '',
      profession: talent.profession || '',
      address: talent.address || '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatetalent(token, setTalent, data, handleClose);
  };

  return (
    <>
        <Button onClick={handleShow} variant="primary" className="d-flex align-items-center">
            <span className="ml-2">עריכה</span>
            <svg className="w-4 h-4 text-slate-500 dark:text-slate-400" viewBox="0 0 16 16">
                <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
            </svg>
        </Button>


      <Modal show={show} onHide={handleClose} centered dir="rtl">
        <Modal.Header>
          <Modal.Title>Talent</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFirstName">
              <Form.Label>שם פרטי<span className="text-rose-500">*</span></Form.Label>
              <Form.Control
                type="input"
                name="first_name"
                value={data.first_name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>שם משפחה<span className="text-rose-500">*</span></Form.Label>
              <Form.Control
                type="input"
                name="last_name"
                value={data.last_name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>אימייל<span className="text-rose-500">*</span></Form.Label>
              <Form.Control
                type="input"
                name="email"
                value={data.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formGender">
              <Form.Label>מגדר<span className="text-rose-500">*</span></Form.Label>
              <Form.Control
                as="select"
                name="gender"
                value={data.gender}
                onChange={handleChange}
                required
                >
                <option value={data.gender}>{data.gender}</option>
                <option value="נקבה">נקבה</option>
                <option value="זכר">זכר</option>
                <option value="אחר">אחר</option>
            </Form.Control>
              
            </Form.Group>
            
            <Form.Group controlId="formLifeStatus">
              <Form.Label>סטטוס<span className="text-rose-500">*</span></Form.Label>
              <Form.Control
                as="select"
                name="life_status"
                value={data.life_status}
                onChange={handleChange}
                required
              >
                <option value={data.life_status}>{data.life_status}</option>
                <option value="רווק/ה">רווק/ה</option>
                <option value="נשוי/ה">נשוי/ה</option>
                <option value="גרוש/ה">גרוש/ה</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formNumChildren">
              <Form.Label>מספר ילדים<span className="text-rose-500">*</span></Form.Label>
              <Form.Control
                type="number"
                name="num_of_children"
                value={data.num_of_children}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPhoneNumber">
              <Form.Label>מספר טלפון<span className="text-rose-500">*</span></Form.Label>
              <Form.Control
                type="input"
                name="phone_number"
                value={data.phone_number}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBirthDate">
              <Form.Label>תאריך לידה<span className="text-rose-500">*</span></Form.Label>
              <Form.Control
                type="input"
                name="birth_date"
                value={data.birth_date}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formProfession">
              <Form.Label>מקצוע<span className="text-rose-500">*</span></Form.Label>
              <Form.Control
                type="input"
                name="profession"
                value={data.profession}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label>עיר מגורים<span className="text-rose-500">*</span></Form.Label>
              <Form.Control
                type="input"
                name="address"
                value={data.address}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Button variant="success" type="submit" className="mt-3">
              שמור
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            סגור
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditTalentProfile;

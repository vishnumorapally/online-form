import React, { useState } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  max-width: 500px;
  margin: 50px auto;
  padding: 30px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #007bff;
  color: #fff;
  border: none;
  font-size: 18px;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: #0056b3;
  }
`;

const SuccessMessage = styled.p`
  color: green;
  font-size: 16px;
  margin-top: 15px;
  background: #e6ffed;
  padding: 10px;
  border-radius: 5px;
  display: ${(props) => (props.show ? "block" : "none")};
`;

const Form = () => {
  const [formData, setFormData] = useState({
    name: "", fatherName: "", email: "", gender: "",
    phone: "", address: "", dob: "", bloodGroup: "",
    lastDonation: "", disease: "", allergies: "", cardiac: "",
    bleeding: ""
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8070/api/form/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({  // Clear the form after submission
          name: "", fatherName: "", email: "", gender: "",
          phone: "", address: "", dob: "", bloodGroup: "",
          lastDonation: "", disease: "", allergies: "", cardiac: "",
          bleeding: ""
        });

        // Hide success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert("Form Submission Failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <FormContainer>
      <Title>Online Form</Title>
      <form onSubmit={handleSubmit}>
        <Input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        <Input type="text" name="fatherName" placeholder="Father's Name" value={formData.fatherName} onChange={handleChange} required />
        <Input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
        <Select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </Select>
        <Input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
        <Input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <Input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        <Input type="text" name="bloodGroup" placeholder="Blood Group" value={formData.bloodGroup} onChange={handleChange} required />
        <Input type="date" name="lastDonation" placeholder="Last Donation Date" value={formData.lastDonation} onChange={handleChange} />
        <Input type="text" name="disease" placeholder="Disease (if any)" value={formData.disease} onChange={handleChange} />
        <Input type="text" name="allergies" placeholder="Allergies (if any)" value={formData.allergies} onChange={handleChange} />
        <Input type="text" name="cardiac" placeholder="Cardiac Conditions (if any)" value={formData.cardiac} onChange={handleChange} />
        <Input type="text" name="bleeding" placeholder="Bleeding Disorders (if any)" value={formData.bleeding} onChange={handleChange} />
        <Button type="submit">Submit</Button>
      </form>
      <SuccessMessage show={success}>Form Submitted Successfully!</SuccessMessage>
    </FormContainer>
  );
};

export default Form;

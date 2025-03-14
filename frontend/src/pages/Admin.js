import React, { useEffect, useState } from "react";
import styled from "styled-components";

const AdminContainer = styled.div`
  max-width: 900px;
  margin: 50px auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
`;

const Th = styled.th`
  background: #007bff;
  color: white;
  padding: 10px;
  text-align: left;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  font-size: 14px;
`;

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch user data from the backend
    fetch("http://localhost:8070/api/form/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false); // Data is fetched
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false); // Stop loading in case of error
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Show loading text while fetching
  }

  return (
    <AdminContainer>
      <Title>Admin Panel - User Details</Title>
      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Phone</Th>
            <Th>Blood Group</Th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={index}>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.phone}</Td>
                <Td>{user.bloodGroup}</Td>
              </tr>
            ))
          ) : (
            <tr>
              <Td colSpan="4">No users found.</Td>
            </tr>
          )}
        </tbody>
      </Table>
    </AdminContainer>
  );
};

export default Admin;

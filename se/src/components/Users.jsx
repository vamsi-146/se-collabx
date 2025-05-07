import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>All Users</h2>
      {users.map(user => (
        <div key={user._id}>
          <p>{user.name} - {user.email}</p>
        </div>
      ))}
    </div>
  );
};

export default Users;

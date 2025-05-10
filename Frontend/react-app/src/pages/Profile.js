import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8002/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data);
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      {user ? (
        <pre>{JSON.stringify(user, null, 2)}</pre>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
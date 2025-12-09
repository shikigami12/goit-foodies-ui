import { useState } from 'react';
import { Link } from 'react-router-dom';

export const UserBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = { name: 'User', avatar: null }; // TODO: Get from Redux store

  return (
    <div>
      <button type="button" onClick={() => setIsOpen(!isOpen)}>
        <img src={user.avatar || '/default-avatar.png'} alt={user.name} />
        <span>{user.name}</span>
      </button>
      {isOpen && (
        <div>
          <Link to="/user/:id">Profile</Link>
          <button type="button">Log out</button>
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

interface UserList {
  name: string;
  email: string;
  avatar: string;
}

interface HomeProps {
  userList: UserList[];
}
const placeholderImage = 'https://via.placeholder.com/49';

const Home: React.FC<HomeProps> = ({ userList }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<UserList[]>([]);
  const [filterUser, setFilterUser] = useState<UserList[]>([]);
  const [prevSelectedUser, setPrevSelectedUser] = useState<UserList | null>(null);

  useEffect(() => {
    setPrevSelectedUser(selectedUser[selectedUser.length - 1] || null);
  }, [selectedUser]);

  const handleSearch = (text: string) => {
    setSearchText(text);
    const filtered = userList.filter(user => user.name.toLowerCase().includes(text.toLowerCase()));
    const filterUserSelectedList = selectedUser.filter(selected => selected.name.toLowerCase().includes(text.toLowerCase()));
    setFilterUser(filtered.filter(user => !filterUserSelectedList.some(selected => selected.name === user.name)));
  }

  const handleSelectUser = (user: UserList) => {
    setSelectedUser([...selectedUser, user]);
    setFilterUser(prevFilterUser => prevFilterUser.filter(item => item !== user));
    setSearchText('');
  }

  const handleRemove = (user: UserList) => {
    setSelectedUser(selectedUser.filter(item => item.name !== user.name));
    setFilterUser([...filterUser, user]);
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && filterUser.length > 0 && searchText === '') {
      handleSelectUser(filterUser[0]);
    } else if (e.key === 'Backspace' && selectedUser.length > 0 && searchText === '') {
      // Use prevSelectedUser here
      console.log('Previous Selected User:', prevSelectedUser);
      handleRemove(prevSelectedUser!);
    }
  };

  return (
    <div style={{ padding: '16px', margin: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ marginBottom: '16px', display: 'flex', gap: '10px' }}>
        {selectedUser.map((user, index) => (
          <div
            key={index}
            style={{
              gap: '10px',
              marginRight: '10px',
              marginBottom: '10px',
              padding: '10px',
              borderRadius: '8px',
              color: 'red',
              backgroundColor: 'yellow',
              display: 'flex',
              alignItems: 'center',
              fontSize: '10px',
            }}
            onClick={() => handleRemove(user)}
          >
            <h1 style={{ margin: '0' }}>{user.name}</h1>
            <FaTimes style={{ color: 'red', cursor: 'pointer', height: '20px' }} onClick={() => handleRemove(user)} />
          </div>
        ))}
      </div>
      <input
        name="search"
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        onKeyDown={handleKeyPress}
        style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '10px' }}
        placeholder='Search User ...'
      />
      <div style={{ marginTop: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'gray' }}>
        {filterUser.map((user, index) => (
          <div
            key={index}
            onClick={() => handleSelectUser(user)}
            style={{
              padding: '2px',
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'row',
              gap: '10px',
              alignItems: 'center',
              width: '50vh',
            }}
          >
            <img src={user.avatar || placeholderImage} style={{ height: '50px', width: '50px', borderRadius: '50%', backgroundColor: 'red', overflow: 'hidden' }} />
            <div style={{ marginTop: '1px', }}>
              <p>{user.name}</p>
              <p>{user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

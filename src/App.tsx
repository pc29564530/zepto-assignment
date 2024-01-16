import React, {useState} from 'react';
import './App.css';
import Home from './Home';

interface UserList {
  name: string;
  email: string;
  avatar: string;
}
const userList: UserList[] = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://via.placeholder.com/50',
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://via.placeholder.com/50',
  },
  {
    name: 'Bob Johnson',
    email: 'bob@example.com',
    avatar: 'https://via.placeholder.com/50',
  },
  {
    name: 'Alice Williams',
    email: 'alice@example.com',
    avatar: 'https://via.placeholder.com/50',
  },
];

function App() {

  return (
    <div className="App">
      <Home userList={userList}/>
    </div>
  );
}

export default App;

import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [userName, setUserName] = useState('');
  const [photourl , setphotourl] = useState('');
  const [Name , setname] = useState('');
  const [goto , setgoto] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get(`https://api.github.com/search/users?q=${userName}`)
      .then((response) => {
        const data = response.data;
        if(data.items.length > 0)
        {
        const user = data.items[0];
        const name = user.login;
        const url = user.avatar_url;
        const html_url = user.html_url;
        setname(name);
        setphotourl(url);
        setgoto(html_url);

        console.log(data);
        }
        else
        {
          setname('No such profile');
          setphotourl('');
          setgoto('');
        }
      })
      .catch((error) => {
        console.log(error);
      });
      setUserName('');
  }

  return (
    <div className="App">
      <h1 className='header'>Github User Search</h1>

      <span className='user-name'>Enter UserName</span>
      <form onSubmit={handleSubmit}>
        <input
          className='username-input'
          type='text'
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button type='submit'>Search</button>
      </form>
      <div className='result'>
        <h3>{Name}</h3>
        <img src={photourl} alt='test'></img>
        <a href={goto} className='go-to'>Go to github </a>
      </div>
    </div>
  );
}

export default App;
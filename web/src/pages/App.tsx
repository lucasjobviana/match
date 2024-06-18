import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Principal from './Principal'
import Login from './Login';
import Profile from './Profile';
import MatchContainer from './MatchContainer';
import { useMatchContext } from '../context/MatchContext';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { useLoginContext } from '../context/LoginContext';
import itsmatch from '../../src/assets/itsamatch.png';
import { TUser } from '../Type';
import './Principal.css';
import { arrayBufferToBase64 } from '../util/util';

function App() {
  const { user } = useLoginContext();
  const { setNewMatches, newMatches, setMatches, matches } = useMatchContext();
  const [showMatch, setShowMatch] = useState(false);

  // console.clear()
  console.log(matches)

  useEffect(() => {
    console.log('effect2');console.log(newMatches, newMatches.length,user)
    if (newMatches.length > 0) {
      setShowMatch(true);
    }
  }, [newMatches]);

    useEffect(() => {
    if (user) {
      const socket = io('http://192.168.100.3:3001/', { query: { user: user.id } });
//

      socket.on('newMessage', (message) => {
        console.log('recebi uma nova mensagem  ')
        const messageObject = JSON.parse(message);
        console.log(messageObject)
        const targetMatch = matches.find((m) =>m.matchId === messageObject.match);
        console.log(matches)
        console.log(matches[0].matchId)
        console.log(messageObject.matchId)
        console.log(matches.find((m)=>m.matchId === messageObject.matchId))
        targetMatch.messages.push(messageObject);
        console.log(targetMatch)
        setMatches([targetMatch])
        // setNewMatches((prevMatchDev) => [...prevMatchDev, JSON.parse(dev)]);
      });

      socket.on('match', (dev) => {
        console.log('deu match do ',dev)
        setNewMatches((prevMatchDev) => [...prevMatchDev, JSON.parse(dev)]);
      });

      return () => socket.disconnect();
    }
  }, [user, matches]);

  const handleClickMatchSpan = (newUser: TUser) => {
    setShowMatch(false);
    setTimeout(() => {
      setNewMatches((prevMatchDev) => {
        const a = prevMatchDev.filter((user) => user.id !== newUser.id);
        return a;
      });
    }, 0);
  };

  const target = newMatches.map((mat)=>{
    const urls = mat.images?.map((image: { fileData: ArrayBuffer; fileName: string }) => {
      return `data:image/png;base64,${arrayBufferToBase64(image.fileData.data)}`;
    }) || [''];
    return {
    ...mat,
    imageUrls: urls[0]

  }})
  
  if(newMatches.length > 0){
    const firstTargetImage = target && target[0].imageUrls ? target[0].imageUrls:''; //target[0].imageUrls[0] : '';
    console.log(firstTargetImage)
     return (<>
     {newMatches && newMatches.length > 0 && target && (
      <div className={`match-container ${showMatch ? 'show' : 'hide'}`}>
        <img src={itsmatch} alt="It's a match" />
        <img className="avatar" src={firstTargetImage} alt="Dev avatar" />
        <strong>{target[0].name}</strong>
        <p>{target[0].resume}</p>
        <button type="button" onClick={() => handleClickMatchSpan(newMatches[0])}>FECHAR</button>
      </div>
    )} 
     </>)
  }

  return (<>
    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/user/:id" element={<Principal  />} />
      <Route path="/user/:id/profile" element={<Profile  />} />
      <Route path="/user/:id/matches" element={<MatchContainer  />} />
      <Route path="*" element={<Navigate to="/" />} /> 
    </Routes>
  </Router>
  </>
  )
}

export default App

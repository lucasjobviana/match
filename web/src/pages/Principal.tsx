import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Link, useNavigate } from 'react-router-dom';
import { getAllUsers } from '../services/api/users';
import logo from '../../src/assets/logo3.png';
import like from '../../src/assets/like.svg';
import dislike from '../../src/assets/dislike.svg';
import itsmatch from '../../src/assets/itsamatch.png';
import { TUser } from '../Type';
import LikedContainer from './LikedContainer';
import { useLoginContext } from '../context/LoginContext';
import LoggedUserDetailContainer from './LoggedUserDetailContainer';
import UnlikedContainer from './UnlikedContainer';
import './Principal.css';
import MatchContainer from './MatchContainer';

export default function Principal() {
  const [potentialUsers, setPotentialUsers] = useState<TUser[]>([]);
  const [matchDev, setMatchDev] = useState<TUser | null>(null);
  // const [newMatchId, setNewMatchId] = useState<number| null>(null);
  const { user, setUser, like_to, dislike_to } = useLoginContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUsers() {
      if (user) {
        const u = await getAllUsers(user.username);
        setPotentialUsers(u);
        setCurrentIndex(0);
        setCurrentPhotoIndex(0);
      }
    }
    loadUsers();
  }, [user]);//ok

  useEffect(() => {//&& potentialUsers.length > 0
    if (user) {
      const socket = io('http://192.168.200.110:3001', {
        query: { user: user.id },
      });

      socket.on('match', (dev) => {
        // setMatchDev(dev);
        console.log('setando o id do dev no match event')
        console.log(dev)
        setMatchDev(JSON.parse(dev));
        // const newMatchUser = potentialUsers.find((u) => u.id === dev) || user.relatedUsers?.find(u => u.id = dev);
        // if (newMatchUser) {
        //   setMatchDev(newMatchUser || null);
        // }
      });

      return () => socket.disconnect();
    }
  }, [user]);//potentialUsers

  // useEffect(()=>{
  //   if(user && newMatchId){
  //     const newMatch = user.relatedUsers?.find((u)=>u.id === newMatchId);
  //     console.log('setando o matchdev ', newMatchId)
  //     console.log(newMatch)
  //     console.log(user)
  //     setMatchDev(newMatch||null)
  //     // setMatchDev(user.likeTo?.find((u)=>u.id === newMatchId))
  //   }else{console.log('else no user,newMatchId')}
  // }, [user, newMatchId]);

  async function handleLike(targetId) {
    await like_to(user.id, targetId);
    setCurrentIndex(currentIndex + 1);
    setCurrentPhotoIndex(0);
  }

  async function handleDislike(targetId) {
    await dislike_to(user.id, targetId);
    setCurrentIndex(currentIndex + 1);
    setCurrentPhotoIndex(0);
  }

  function handlePhotoClick(event) {
    const currentUser = potentialUsers[currentIndex];
    const photoCount = currentUser.imageUrls.length;
    const clickX = event.clientX;
    const imgElement = event.target;
    const imgRect = imgElement.getBoundingClientRect();
    const imgCenterX = imgRect.left + imgRect.width / 2;

    if (clickX < imgCenterX) {
      setCurrentPhotoIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : photoCount - 1));
    } else {
      setCurrentPhotoIndex((prevIndex) => (prevIndex < photoCount - 1 ? prevIndex + 1 : 0));
    }
  }

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const handleClickMatchSpan = (matchDev) => {
    console.log(matchDev)
    console.log(user)
    // const matches = user?.matchedUsers;
    // const newUser = user;
    // // newUser && newUser.matchedUsers && newUser?.matchedUsers.push(matchDev);
    // console.log(newUser?.matchedUsers)
    // console.log(newUser?.matchedUsers?.find((u)=>u.id === matchDev.id));
    // if(!newUser?.matchedUsers?.find((u)=>u.id === matchDev.id)){
    //   // setUser(newUser)
    // }
    setMatchDev(null);
  }
  const currentUser = potentialUsers[currentIndex];

  return (
    <>
      <div id="logged-user-detail-container">
        <button type="button" onClick={() => navigate(`/user/${user.id}/profile`)}>
          Editar Perfil
        </button>

        <button type="button" onClick={() => handleLogout()}>
          Logout
        </button>

        <LoggedUserDetailContainer />
      </div>
      <div id="container-wrapper">
        <div id="side-container-left">
          <LikedContainer />
          <UnlikedContainer />
        </div>
        <div className="main-container">
          <Link to="/">
            <img src={logo} alt="Tinjob" className="logo" />
          </Link>
          {potentialUsers.length > 0 && currentIndex < potentialUsers.length ? (
            <ul>
              <li key={currentUser.id}>
                <footer>
                  <strong>{currentUser.name || currentUser.username}</strong>
                  <p>{currentUser?.resume}</p>
                  {currentUser.imageUrls && currentUser.imageUrls.length > 0 ? (
                    <img
                      src={currentUser.imageUrls[currentPhotoIndex]}
                      alt={`Profile ${currentPhotoIndex}`}
                      className="profile-image"
                      onClick={handlePhotoClick}
                    />
                  ) : (
                    <div className="profile-image" />
                  )}
                </footer>
                <div className="buttons">
                  <button type="button" onClick={() => handleDislike(currentUser.id)}>
                    <img src={dislike} alt="Dislike" />
                  </button>
                  <button type="button" onClick={() => handleLike(currentUser.id)}>
                    <img src={like} alt="Like" />
                  </button>
                </div>
              </li>
            </ul>
          ) : (
            <div className="empty">Nenhum usuário encontrado...</div>
          )}
          
           {matchDev && (//matchDev.imageUrls && (
            <div className="match-container">
              <img src={itsmatch} alt="It's a match" />
              {/* <img className="avatar" src={matchDev.imageUrls[0]} alt="Dev avatar" /> */}
              <strong>{matchDev.name}</strong>
              <p>{matchDev.resume}</p>
              <button type="button" onClick={() => handleClickMatchSpan(matchDev)}>FECHAR</button>
            </div>
          )} 
          
        </div>
        <div id="side-container-right">
          <MatchContainer matched={user?.matchedUsers} isNewMatch={matchDev} />
        </div>
      </div>
    </>
  );
}
//{matchDev?.imageUrls?[0]}

import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Link, useNavigate, redirect, Navigate } from 'react-router-dom';
import { getAllUsers } from '../services/api/users';
import logo from '../../src/assets/logo3.png';
import like from '../../src/assets/like.svg';
import dislike from '../../src/assets/dislike.svg';
import { TUser } from '../Type';
import LikedContainer from './LikedContainer';
import { useLoginContext } from '../context/LoginContext';
import LoggedUserDetailContainer from './LoggedUserDetailContainer';
import UnlikedContainer from './UnlikedContainer';
import './Principal.css';

export default function Principal() {
  const [users, setUsers] = useState<TUser[]>([]);
  const [matchDev, setMatchDev] = useState(null);
  const { user, setUser, like_to, dislike_to } = useLoginContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUsers() {
      const u = await getAllUsers(user?.username);
      setUsers(u);
      setCurrentIndex(0);
      setCurrentPhotoIndex(0); 
    }
    console.log('chammmmmmarei____________________________ loadUsers()')
    console.log(user)
    loadUsers();
  }, [user]);

  useEffect(() => {
    // const lsUserId = localStorage.getItem('loggedUserId');
    if(user){
      // alert('atualizando o socket do usuario')
      const socket = io('http://192.168.200.110:3001', {
        query: { user: user.id },
      });
  
      socket.on('match', (dev) => {
        alert('match no dev')
        console.log(dev)
        setMatchDev(dev);
      });
    }
  }, [user]);

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
    const currentUser = users[currentIndex];
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
    navigate('/')
  }
   

  const currentUser = users[currentIndex];

  return (
    <>
      <div id="logged-user-detail-container">
        <button type="button" onClick={() => navigate(`/user/${user.id}/profile`)}>
          Editar Perfil
        </button>

        <button type="button" onClick={() => handleLogout()}>
          Editar Perfil
        </button>
        
         
        
        
         
        <LoggedUserDetailContainer />
      </div>
      <div id="container-wrapper">
        <div id="like-container">
          <LikedContainer />
        </div>
        <div className="main-container">
          <Link to="/">
            <img src={logo} alt="Tinjob" className='logo' />
          </Link>
          {users.length > 0 && currentIndex < users.length ? (
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
          {matchDev && (
            <div className="match-container">
              <button type="button" onClick={() => setMatchDev(null)}>FECHAR</button>
            </div>
          )}
        </div>
        <div id="dislike-container">
          <UnlikedContainer />
        </div>
      </div>
    </>
  );
}

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllUsers as getNextPotentialUser } from '../services/api/users';
import logo from '../../src/assets/logo3.png';
import like from '../../src/assets/like.svg';
import dislike from '../../src/assets/dislike.svg';
import { TUser } from '../Type';
import { useLoginContext } from '../context/LoginContext';
import LoggedUserDetailContainer from './LoggedUserDetailContainer';

export default function Principal() {
  const [potentialMatchUser, setPotentialMatchUser] = useState<TUser|null>(null);
  const { user, setUser, like_to, dislike_to } = useLoginContext();
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
  });

  useEffect(() => {
    async function loadUsers() {
      if (user) {
        const u = await getNextPotentialUser(user.username, user.id);
        setPotentialMatchUser(u);
        setCurrentPhotoIndex(0);
      }
    }
    loadUsers();
  }, [user]);

  async function handleLike(targetId:number) {
    await like_to(user.id, targetId);
    // setCurrentPhotoIndex(0);
  }

  async function handleDislike(targetId:number) {
    await dislike_to(user.id, targetId);
    // setCurrentIndex(currentIndex + 1);
    // setCurrentPhotoIndex(0);
  }

  function handlePhotoClick(event) {
    const photoCount = potentialMatchUser?.imageUrls?.length || 0;
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

  return (
    <>
      <div id="logged-user-detail-container">
        <button type="button" onClick={() => navigate(`/user/${user.id}/profile`)}>Editar Perfil</button>
        <button type="button" onClick={() => handleLogout()}>Logout</button>
        <LoggedUserDetailContainer />
      </div>
      <div id="container-wrapper">
        {/* <div id="side-container-left">
          <LikedContainer />
          <UnlikedContainer />
        </div> */}
        <div className="main-container">
          <Link to="/">
            <img src={logo} alt="Tinjob" className="logo" />
          </Link>
          {potentialMatchUser ? (
            <ul>
              <li key={potentialMatchUser.id}>
                <footer>
                  <strong>{potentialMatchUser.name || potentialMatchUser.username}</strong>
                  <p>{potentialMatchUser?.resume}</p>
                  {potentialMatchUser.imageUrls && potentialMatchUser.imageUrls.length > 0 ? (
                    <img
                      src={potentialMatchUser.imageUrls[currentPhotoIndex]}
                      alt={`Profile ${currentPhotoIndex}`}
                      className="profile-image"
                      onClick={handlePhotoClick}
                    />
                  ) : (
                    <div className="profile-image" />
                  )}
                </footer>
                <div className="buttons">
                  <button type="button" onClick={() => handleDislike(potentialMatchUser.id)}>
                    <img src={dislike} alt="Dislike" />
                  </button>
                  <button type="button" onClick={() => handleLike(potentialMatchUser.id)}>
                    <img src={like} alt="Like" />
                  </button>
                </div>
              </li>
            </ul>
          ) : (
            <div className="empty">Nenhum usuário encontrado...</div>
          )}
        </div>
       {user && (
         <button onClick={()=>navigate(`/user/${user.id}/matches`)}  >matches</button>
       )} 
      </div>
    </>
  );
}
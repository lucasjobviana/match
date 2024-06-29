import { useNavigate } from 'react-router-dom';
import homeIcon from '../../src/assets/home.svg';
import profileIcon from '../../src/assets/profile.svg';
import matchesIcon from '../../src/assets/matches.svg';
import logoutIcon from '../../src/assets/logout.svg';

export default function BottomNav({ user, handleLogout }) {
  const navigate = useNavigate();

  return (
    <div className="bottom-nav">
      <button onClick={() => navigate(`/`)}>
        <img src={homeIcon} alt="Home" />
      </button>
      <button onClick={() => navigate(`/user/${user.id}/profile`)}>
        <img src={profileIcon} alt="Perfil" />
      </button>
      <button onClick={() => navigate(`/user/${user.id}/matches`)}>
        <img src={matchesIcon} alt="Matches" />
      </button>
      <button onClick={handleLogout}>
        <img src={logoutIcon} alt="Logout" />
      </button>
    </div>
  );
}

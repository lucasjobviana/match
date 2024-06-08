import { useLoginContext } from '../context/LoginContext';

export default function LoggedUserDetailContainer() {
  const { user } = useLoginContext();
  return (
    <div className="user-detail-container">
      {user ? (
        <div>
          <h1>{user.name}</h1>
          {
            user.imageUrls &&
                    <img  key={0} src={user.imageUrls[0]} className='profile-image' />
          }
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
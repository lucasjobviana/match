import like from '../../src/assets/like.svg';
import { useLoginContext } from '../context/LoginContext';
import { TUser } from '../Type';
 
export default function UnlikedContainer() {
  const { user, undislike_to } = useLoginContext();

  async function handleLike(id:number) {
     await undislike_to(user?.id,id);
  }
  
  return (
    <div className="unliked-container">
      { user && user.dislikeUsers && user.dislikeUsers.length > 0 ? (
        <ul>
          {
          user.dislikeUsers.map((u:TUser) => (
            <li key={u.id}>
              <footer>
                <strong>{u.name || u.username}</strong>
              </footer>
              <div className="buttons">
                <button type="button" onClick={() => handleLike(u.id)}>
                   <img src={like} alt="Like" /> 
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
         <div className="empty">Nenhum usuário encontrado...</div>
      )}
    </div>
  );
}

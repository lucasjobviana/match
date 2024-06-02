import like from '../../src/assets/like.svg';
import { useLoginContext } from '../context/LoginContext';
import { TUser } from '../Type';
 
export default function MatchContainer() {
  const { user, unlike_to } = useLoginContext();

  async function handleLike(id:number) {
     await unlike_to(user?.id,id);
  }
  
  return (
    <div className="matches-container">
      { user && user.matches && user.matches.length > 0 ? (
        <ul>
          {
          user.matches.map((u:TUser) => (
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

import dislike from '../assets/dislike.svg';
import { useLoginContext } from '../context/LoginContext';
import { TUser } from '../Type';

export default function LikedContainer() {
  const { user, unlike_to } = useLoginContext();

  async function handledisLike(id:number) {
     await unlike_to(user?.id,id);
  }
  
  return (
    <div className="liked-container">
      { user && user.relatedUsers && user.relatedUsers.length > 0 ? (
        <ul>
          {user.relatedUsers.map((u:TUser) => (
            <li key={u.id}>
              <footer>
                <strong>{u.name || u.username}</strong>
              </footer>
              <div className="buttons">
                <button type="button" onClick={() => handledisLike(u.id)} >
                   <img src={dislike} alt="Dislike" /> 
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

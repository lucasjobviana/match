import like from '../../src/assets/like.svg';
import { useEffect } from 'react';
import { useLoginContext } from '../context/LoginContext';
import { useMatchContext } from '../context/MatchContext';
import { TUser } from '../Type';
 
export default function MatchContainer({isNewMatch}) {
  const { user, unlike_to } = useLoginContext();
  const { matches, load_matches} = useMatchContext();

  useEffect(() => {   
    if(user){
      load_matches(user?.id);
    }
  }, [isNewMatch]);//ok

  async function handleLike(id:number) {
     await unlike_to(user?.id,id);
  }
  
  return (
    <div className="matches-container">
      { user && matches && matches.length > 0 ? (
        <ul>
          {
          matches.map((u:TUser) => (
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

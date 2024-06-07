import like from '../../src/assets/like.svg';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useLoginContext } from '../context/LoginContext';
import { TUser } from '../Type';
 
export default function MatchContainer({matched,isNewMatch}) {
  const { user, unlike_to } = useLoginContext();
  const [matches, setMatches] = useState<TUser[] | []>([]);
  console.log('lllll lll l lll')
  console.log(matched)

  useEffect(() => {
    console.log('atualizando matches')
    async function loadUsers() {
      if (user) {
        const users = await api.get('/users/matchs', {
          headers: {
            id: user.id,
          }
        }).then((response: { data: TUser[]; }) => {
          return response.data;
        });
        console.log('matchs atualizado')
        console.log(users)
        setMatches(users);
        // setPotentialUsers(u);
        // setCurrentIndex(0);
        // setCurrentPhotoIndex(0);
      }
    }
    loadUsers();
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

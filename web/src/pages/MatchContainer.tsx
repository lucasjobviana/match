import like from '../../src/assets/like.svg';
import { useEffect } from 'react';
import { useLoginContext } from '../context/LoginContext';
import { useMatchContext } from '../context/MatchContext';
import itsmatch from '../../src/assets/itsamatch.png';
import { TUser } from '../Type';

interface MatchContainerProps {
  newMatches: TUser[];
  setMatchDev: React.Dispatch<React.SetStateAction<TUser[]>>;
}
 
export default function MatchContainer({ newMatches, setMatchDev }: MatchContainerProps) {
  const { user, unlike_to } = useLoginContext();
  const { matches, load_matches} = useMatchContext();

  useEffect(() => {  
    if(user){
      load_matches(user?.id);
    }
  }, [newMatches]);

  async function handleLike(id:number) {
     await unlike_to(user?.id,id);
  }

  const handleClickMatchSpan = (newUser:TUser) => {
    setMatchDev((prevMatchDev) => prevMatchDev.filter((user) => user.id !== newUser.id));
  }

  const target = matches.length > 0 && newMatches.length > 0 ? matches.find(t=>t.id === newMatches[0].id) : null;
  const fistTargetImage = target && target.imageUrls ? target?.imageUrls[0] : '';

  return (
    <div className="matches-container">
    {
      newMatches && newMatches.length > 0 && (
        <div className="match-container">{}
           <img src={itsmatch} alt="It's a match" />
           <img className="avatar" src={fistTargetImage} alt="Dev avatar" />
           <strong>{newMatches[0].name}</strong>
           <p>{newMatches[0].resume}</p>
           <button type="button" onClick={() => handleClickMatchSpan(newMatches[0])}>FECHAR</button>
        </div>
      )
    } 
    
    {
      user && matches && matches.length > 0 ? (
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


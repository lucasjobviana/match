// import { useEffect, useState } from 'react';
// import { useLoginContext } from '../context/LoginContext';
// import { useMatchContext } from '../context/MatchContext';
// import like from '../../src/assets/like.svg';
// import { useNavigate } from 'react-router-dom';

// export default function MatchContainer() {
//   const { user, unlike_to } = useLoginContext();
//   const { matches, load_matches, newMatches } = useMatchContext();
//   const navigate = useNavigate();
//   const [selectedMatch, setSelectedMatch] = useState(null);

//   useEffect(() => {
//     if (!user) {
//       navigate('/');
//       return;
//     }
//   }, [user, navigate]);

//   useEffect(() => {
//     if (user) {
//       load_matches(user.id);
//     }
//   }, [user, newMatches]);

//   useEffect(() => {
//     console.log(matches)
//     if (matches && matches.length > 0) {
//       setSelectedMatch(matches[0]); // Seleciona o primeiro match por padrão
//     }
//   }, [matches]);

//   async function handleLike(id) {
//     console.log(matches)
//     // await unlike_to(user.id, id);
//   }

//   function handleMatchClick(match) {
//     setSelectedMatch(match);
//   }

//   if (!matches) {
//     return <div className="empty">Nenhum usuário encontrado...</div>;
//   }

//   return (
//     <div className="matches-container">
//       <div className="matches-menu">
//         {matches.map((match) => (
//           <img
//             key={match.id}
//             src={match.imageUrls ? match.imageUrls[0] : ''}
//             alt={match.name || match.username}
//             onClick={() => handleMatchClick(match)}
//             className={selectedMatch && selectedMatch.id === match.id ? 'selected' : ''}
//           />
//         ))}
//       </div>

//       {selectedMatch ? (
//         <div className="match-details">
//           <div className="match-header">
//             <img src={selectedMatch.imageUrls ? selectedMatch.imageUrls[0] : ''} alt={selectedMatch.name || selectedMatch.username} />
//             <strong>{selectedMatch.name || selectedMatch.username}</strong>
//           </div>

//           <div className="match-conversation">
//           {   
//             selectedMatch && selectedMatch.messages && 
//             selectedMatch.messages.slice().reverse().map((u) => {
//             const a = u.sender == user.id ? 'left':'right';
//               return (<p key={u.id} style={{textAlign:a
//               }} >{u.content}</p>);
//             })

//           }
//           </div>

//           <div className="buttons">
//             <button type="button" onClick={() => handleLike(selectedMatch.id)}>
//               <img src={like} alt="Like" />
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className="empty">Selecione um usuário...</div>
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from 'react';
import { useLoginContext } from '../context/LoginContext';
import { useMatchContext } from '../context/MatchContext';
import like from '../../src/assets/like.svg';
import { useNavigate } from 'react-router-dom';
 
export default function MatchContainer() {
  const { user } = useLoginContext();
  const { matches, load_matches, newMatches, sendMessage } = useMatchContext();
  const navigate = useNavigate();
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [messageContent, setMessageContent] = useState('');

  useEffect(() => {
    console.log('u_effect[] didMount, matches:')
    console.log(matches);
    console.log("setarei selectedMatch(matches[0])")
    if (matches && matches.length > 0) {
      setSelectedMatch(matches[0]); // Seleciona o primeiro match por padrão
    }
  },[]);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
  }, [user, navigate]);

  useEffect(() => {
    console.log('u_effect newMatches, user:')
    console.log(user)
    console.log(' chamarei loadMatches')
    if (user) {
      load_matches(user.id); 
    } 
  }, [newMatches]);

  useEffect(() => {
    console.log('u_effect matches')
    console.log(matches)
    console.log(selectedMatch)
    const a = matches.find((a)=>a.id === selectedMatch?.id)
    setSelectedMatch(a)
  }, [matches]);


  


  async function handleLike(id) {
    console.log(matches);
    // await unlike_to(user.id, id);
  }

  function handleMatchClick(match) {
    setSelectedMatch(match);
  }

  async function handleSendMessage() {
    if (messageContent.trim() !== '') {
      await sendMessage(user.id, selectedMatch.matchId, messageContent);
      setMessageContent(''); // Limpa o campo de mensagem após enviar
      // Atualize as mensagens do match selecionado
      // load_matches(user.id); // Opcional: você pode chamar isso para recarregar os matches e mensagens
    }
  }

  if (!matches) {
    return <div className="empty">Nenhum usuário encontrado...</div>;
  }

  return (
    <div className="matches-container">
      <div className="matches-menu">
        {matches.map((match) => (
          <img
            key={match.id}
            src={match.imageUrls ? match.imageUrls[0] : ''}
            alt={match.name || match.username}
            onClick={() => handleMatchClick(match)}
            className={selectedMatch && selectedMatch.id === match.id ? 'selected' : ''}
          />
        ))}
      </div>

      {selectedMatch ? (
        <div className="match-details">
          <div className="match-header">
            <img src={selectedMatch.imageUrls ? selectedMatch.imageUrls[0] : ''} alt={selectedMatch.name || selectedMatch.username} />
            <strong>{selectedMatch.name || selectedMatch.username}</strong>
          </div> 

          <div className="match-conversation">
            {   
              selectedMatch && selectedMatch.messages && 
              selectedMatch.messages.map((u) => {
                const alignment = u.sender === user.id ? 'right' : 'left';
                return (
                  <p key={u.id} style={{ textAlign: alignment }}>
                    {u.content}
                  </p>
                );
              })
            }
          </div>

          <div className="message-input-container">
            <input 
              type="text"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              placeholder="Digite sua mensagem..."
            />
            <button type="button" onClick={handleSendMessage}>
              Enviar
            </button>
          </div>

          <div className="buttons">
            <button type="button" onClick={() => handleLike(selectedMatch.id)}>
              <img src={like} alt="Like" />
            </button>
          </div>
        </div>
      ) : (
        <div className="empty">Selecione um usuário...</div>
      )}
    </div>
  );
}

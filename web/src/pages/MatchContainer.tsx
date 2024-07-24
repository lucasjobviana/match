// import { useEffect, useState, useRef } from 'react';
// import { useLoginContext } from '../context/LoginContext';
// import { useMatchContext } from '../context/MatchContext';
// import like from '../../src/assets/like.svg';
// import { useNavigate } from 'react-router-dom';
// import { TUser } from '../Type';

// export default function MatchContainer() { 
//   const { user } = useLoginContext(); 
//   const { matches, load_matches, sendMessage, newMatches } = useMatchContext();
//   const navigate = useNavigate();
//   const [selectedMatch, setSelectedMatch] = useState(null);
//   const [messageContent, setMessageContent] = useState('');
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     console.log('______component did mount match conteiner');
//     console.log(matches);
//     if (matches && matches.length >= 0) {
//       setSelectedMatch(matches[0]); // Seleciona o primeiro match por padrão
//     }
//   }, []);

//   useEffect(() => {
//     console.log('______component did update user, navigate');
//     if (!user) {
//       navigate('/');
//       return;
//     }
//   }, [user, navigate]);

//   useEffect(() => {
//     if (user) {
//       console.log('______novo match na area vou atualizar os matches');
//       console.log(selectedMatch);
//       load_matches(user.id); 
//     } 
//   }, [newMatches]);

//   useEffect(() => {
//     // alert('matches use effect');
//     console.log('_________________________');
//     console.log(selectedMatch);
//     const getSenderOfMaxMessageId = (matches) => {
//       // Concatena todas as mensagens de todos os matches em um único array
//       const allMessages = matches.flatMap(match => match.messages);
    
//       // Encontra a mensagem com o maior id
//       const maxMessage = allMessages.reduce((maxMsg, message) => 
//         message.id > maxMsg.id ? message : maxMsg, 
//         { id: 0 }
//       );
    
//       // Retorna o sender da mensagem com o maior id
//       return maxMessage.sender;
//     };
    
    
//     if(!selectedMatch){
//       setSelectedMatch(matches[0]);
//     }else{
//       const senderOfMaxMessageId = getSenderOfMaxMessageId(matches);
//      console.log(senderOfMaxMessageId);  // Deve retornar 4
//       if(selectedMatch && Number(selectedMatch.id) != Number(senderOfMaxMessageId)){
//         // alert('nao é');
//         const a = matches.find(m=>m.id == Number(senderOfMaxMessageId));
//         if(a){
//           alert(a.name+" enviou msg");
//           //adicionar classe css de nova msg
//         }
        
//       } 
//       const matchUpdated = matches.find((a) => a.id === selectedMatch?.id);
//         setSelectedMatch(matchUpdated);
//     }
//   }, [matches]);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [selectedMatch?.messages]);

//   async function handleLike(id) {
//     console.log(matches);
//     // await unlike_to(user.id, id);
//   }

//   function handleMatchClick(matc) {
//     setSelectedMatch(matc);
//   }

//   async function handleSendMessage() {
//     if (messageContent.trim() !== '') {
//       await sendMessage(user.id, selectedMatch.matchId, messageContent);
//       setMessageContent('');
//     }
//   }

//   function handleKeyDown(event) {
//     if (event.key === 'Enter') {
//       handleSendMessage();
//     }
//   }

//   if (!matches) {
//     return <div className="empty">Nenhum usuário encontrado...</div>;
//   }

//   return (
//     <div className="matches-container">
//       <div>
//         <div className="matches-menu">
//           {matches.map((match) => (
//             <img
//               key={match.id}
//               src={match.imageUrls ? match.imageUrls[0] : ''}
//               alt={match.name || match.username}
//               onClick={() => handleMatchClick(match)}
//               className={selectedMatch && selectedMatch.id === match.id ? 'selected' : ''}
//             />
//           ))}
//         </div>

//         {selectedMatch ? (
//           <div className="match-details">
//             <div className="match-header">
//               <img src={selectedMatch.imageUrls ? selectedMatch.imageUrls[0] : ''} alt={selectedMatch.name || selectedMatch.username} />
//               <strong>{selectedMatch.name || selectedMatch.username}</strong>
//             </div> 

//             <div className="match-conversation">
//               {   
//                 selectedMatch && selectedMatch.messages && 
//                 selectedMatch.messages.map((u) => {
//                   const alignment = u.sender === user.id ? 'right' : 'left';
//                   return (
//                     <p key={u.id} style={{ textAlign: alignment }}>
//                       {u.content}
//                     </p>
//                   );
//                 })
//               }
//               <div ref={messagesEndRef} />
//             </div>

//             <div className="message-input-container">
//               <input 
//                 type="text"
//                 value={messageContent}
//                 onChange={(e) => setMessageContent(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 placeholder="Digite sua mensagem..."
//               />
//               <button type="button" onClick={handleSendMessage}>
//                 Enviar
//               </button>
//             </div>

//             <div className="buttons">
//               <button type="button" onClick={() => handleLike(selectedMatch.id)}>
//                 <img src={like} alt="Like" />
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className="empty">Selecione um usuário...</div>
//         )}
//       </div>
//       </div>  
//   );
// }

///////////////////////////////



// import { useEffect, useState, useRef } from 'react';
// import { useLoginContext } from '../context/LoginContext';
// import { useMatchContext } from '../context/MatchContext';
// import like from '../../src/assets/like.svg';
// import { useNavigate } from 'react-router-dom';

// export default function MatchContainer() { 
//   const { user } = useLoginContext(); 
//   const { matches, load_matches, sendMessage, newMatches } = useMatchContext();
//   const navigate = useNavigate();
//   const [selectedMatch, setSelectedMatch] = useState(null);
//   const [messageContent, setMessageContent] = useState('');
//   const [newMessageAlert, setNewMessageAlert] = useState(false);
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     console.log('______component did mount match container');
//     console.log(matches);
//     if (matches && matches.length >= 0) {
//       setSelectedMatch(matches[0]); // Seleciona o primeiro match por padrão
//     }
//   }, []);

//   useEffect(() => {
//     console.log('______component did update user, navigate');
//     if (!user) {
//       navigate('/');
//       return;
//     }
//   }, [user, navigate]);

//   useEffect(() => {
//     if (user) {
//       console.log('______novo match na area vou atualizar os matches');
//       console.log(selectedMatch);
//       load_matches(user.id); 
//     } 
//   }, [newMatches]);

//   useEffect(() => {
//     const getSenderOfMaxMessageId = (matches) => {
//       const allMessages = matches.flatMap(match => match.messages);
//       const maxMessage = allMessages.reduce((maxMsg, message) => 
//         message.id > maxMsg.id ? message : maxMsg, 
//         { id: 0 }
//       );
//       return maxMessage.sender;
//     };

//     if (!selectedMatch) {
//       setSelectedMatch(matches[0]);
//     } else {
//       const senderOfMaxMessageId = getSenderOfMaxMessageId(matches);
//       console.log(senderOfMaxMessageId); // Deve retornar 4
//       if (selectedMatch && Number(selectedMatch.id) !== Number(senderOfMaxMessageId)) {
//         const a = matches.find(m => m.id === Number(senderOfMaxMessageId));
//         if (a) {
//           alert(a.name + " enviou msg");
//           setNewMessageAlert(true);
//           setTimeout(() => setNewMessageAlert(false), 5000); // Remove a classe após 3 segundos
//         }
//       }
//       const matchUpdated = matches.find((a) => a.id === selectedMatch?.id);
//       setSelectedMatch(matchUpdated);
//     }
//   }, [matches]);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [selectedMatch?.messages]);

//   async function handleLike(id) {
//     console.log(matches);
//     // await unlike_to(user.id, id);
//   }

//   function handleMatchClick(matc) {
//     setSelectedMatch(matc);
//   }

//   async function handleSendMessage() {
//     if (messageContent.trim() !== '') {
//       await sendMessage(user.id, selectedMatch.matchId, messageContent);
//       setMessageContent('');
//     }
//   }

//   function handleKeyDown(event) {
//     if (event.key === 'Enter') {
//       handleSendMessage();
//     }
//   }

//   if (!matches) {
//     return <div className="empty">Nenhum usuário encontrado...</div>;
//   }

//   return (
//     <div className={`matches-container ${newMessageAlert ? 'new-message-alert' : ''}`}>
//       <div>
//         <div className="matches-menu">
//           {matches.map((match) => (
//             <img
//               key={match.id}
//               src={match.imageUrls ? match.imageUrls[0] : ''}
//               alt={match.name || match.username}
//               onClick={() => handleMatchClick(match)}
//               className={selectedMatch && selectedMatch.id === match.id ? 'selected' : ''}
//             />
//           ))}
//         </div>

//         {selectedMatch ? (
//           <div className="match-details">
//             <div className="match-header">
//               <img src={selectedMatch.imageUrls ? selectedMatch.imageUrls[0] : ''} alt={selectedMatch.name || selectedMatch.username} />
//               <strong>{selectedMatch.name || selectedMatch.username}</strong>
//             </div> 

//             <div className="match-conversation">
//               {   
//                 selectedMatch && selectedMatch.messages && 
//                 selectedMatch.messages.map((u) => {
//                   const alignment = u.sender === user.id ? 'right' : 'left';
//                   return (
//                     <p key={u.id} style={{ textAlign: alignment }}>
//                       {u.content}
//                     </p>
//                   );
//                 })
//               }
//               <div ref={messagesEndRef} />
//             </div>

//             <div className="message-input-container">
//               <input 
//                 type="text"
//                 value={messageContent}
//                 onChange={(e) => setMessageContent(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 placeholder="Digite sua mensagem..."
//               />
//               <button type="button" onClick={handleSendMessage}>
//                 Enviar
//               </button>
//             </div>

//             <div className="buttons">
//               <button type="button" onClick={() => handleLike(selectedMatch.id)}>
//                 <img src={like} alt="Like" />
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className="empty">Selecione um usuário...</div>
//         )}
//       </div>
//     </div>  
//   );
// }




///////////////////////////////

import { useEffect, useState, useRef } from 'react';
import { useLoginContext } from '../context/LoginContext';
import { useMatchContext } from '../context/MatchContext';
import like from '../../src/assets/like.svg';
import { useNavigate } from 'react-router-dom';

export default function MatchContainer() { 
  const { user } = useLoginContext(); 
  const { matches, load_matches, sendMessage, newMatches } = useMatchContext();
  const navigate = useNavigate();
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [messageContent, setMessageContent] = useState('');
  const [newMessageAlert, setNewMessageAlert] = useState({});
  const messagesEndRef = useRef(null);

  useEffect(() => {
    console.log('______component did mount match container');
    console.log(matches);
    if (matches && matches.length >= 0) {
      setSelectedMatch(matches[0]); // Seleciona o primeiro match por padrão
    }
  }, []);

  useEffect(() => {
    console.log('______component did update user, navigate');
    if (!user) {
      navigate('/');
      return;
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      console.log('______novo match na area vou atualizar os matches');
      console.log(selectedMatch);
      load_matches(user.id); 
    } 
  }, [newMatches]);

  useEffect(() => {
    const getSenderOfMaxMessageId = (matches) => {
      const allMessages = matches.flatMap(match => match.messages);
      const maxMessage = allMessages.reduce((maxMsg, message) => 
        message.id > maxMsg.id ? message : maxMsg, 
        { id: 0 }
      );
      return maxMessage.sender;
    };

    if (!selectedMatch) {
      setSelectedMatch(matches[0]);
    } else {
      const senderOfMaxMessageId = getSenderOfMaxMessageId(matches);
      console.log(senderOfMaxMessageId); // Deve retornar 4
      if (selectedMatch && Number(selectedMatch.id) !== Number(senderOfMaxMessageId)) {
        const a = matches.find(m => m.id === Number(senderOfMaxMessageId));
        if (a) {
          
          setNewMessageAlert(prevState => ({
            ...prevState,
            [a.id]: true
          }));
        }
      }
      const matchUpdated = matches.find((a) => a.id === selectedMatch?.id);
      setSelectedMatch(matchUpdated);
    }
  }, [matches]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedMatch?.messages]);

  useEffect(() => {
    if(selectedMatch && newMessageAlert[selectedMatch.id]){
      setNewMessageAlert(prevState => ({
        ...prevState,
        [selectedMatch.id]: false
      }));
    }
   

  }, [selectedMatch]);

  async function handleLike(id) {
    console.log(matches);
    // await unlike_to(user.id, id);
  }

  function handleMatchClick(matc) {
    setSelectedMatch(matc);
  }

  async function handleSendMessage() {
    if (messageContent.trim() !== '') {
      await sendMessage(user.id, selectedMatch.matchId, messageContent);
      setMessageContent('');
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  }

  if (!matches) {
    return <div className="empty">Nenhum usuário encontrado...</div>;
  }

  return (
    <div className="matches-container">
      <div>
        <div className="matches-menu">
          {matches.map((match) => (
            <img
              key={match.id}
              src={match.imageUrls ? match.imageUrls[0] : ''}
              alt={match.name || match.username}
              onClick={() => handleMatchClick(match)}
//            className={selectedMatch && selectedMatch.id === match.id ? 'selected' : ''}

              className={`${selectedMatch && selectedMatch.id === match.id ? 'selected' : ''} ${newMessageAlert[match.id] ? 'new-message-alert' : ''}`}
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
              <div ref={messagesEndRef} />
            </div>

            <div className="message-input-container">
              <input 
                type="text"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                onKeyDown={handleKeyDown}
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
    </div>  
  );
}

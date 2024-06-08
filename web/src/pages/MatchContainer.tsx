// import like from '../../src/assets/like.svg';
// import { useEffect, useState } from 'react';
// import { useLoginContext } from '../context/LoginContext';
// import { useMatchContext } from '../context/MatchContext';
// import itsmatch from '../../src/assets/itsamatch.png';
// import { TUser } from '../Type';

// interface MatchContainerProps {
//   newMatches: TUser[];
//   setMatchDev: React.Dispatch<React.SetStateAction<TUser[]>>;
// }
 
// export default function MatchContainer({ newMatches, setMatchDev }: MatchContainerProps) {
//   const { user, unlike_to } = useLoginContext();
//   const { matches, load_matches} = useMatchContext();
//   const [showMatch, setShowMatch] = useState(false);

//   useEffect(() => {  
//     if(user){
//       load_matches(user?.id);
//     }
//   }, [newMatches]);

//   useEffect(() => {
//     if (newMatches.length > 0) {
//       setShowMatch(true);
//       const timer = setTimeout(() => setShowMatch(false), 5000); // Hide after 5 seconds
//       return () => clearTimeout(timer);
//     }
//   }, [newMatches]);

//   async function handleLike(id:number) {
//      await unlike_to(user?.id,id);
//   }

//   const handleClickMatchSpan = (newUser:TUser) => {
//     // setTimeout(()=>{
//       setMatchDev((prevMatchDev) => prevMatchDev.filter((user) => user.id !== newUser.id));
//       setShowMatch(false);
//     // },1500);
//   }

//   const target = matches.length > 0 && newMatches.length > 0 ? matches.find(t=>t.id === newMatches[0].id) : null;
//   const fistTargetImage = target && target.imageUrls ? target?.imageUrls[0] : '';

//   return (
//     <div className="matches-container">
//     { 
//       newMatches && newMatches.length > 0 && target && (
//         <div className={`match-container ${showMatch ? 'show' : ''}`}>
//            <img src={itsmatch} alt="It's a match" />
//            <img className="avatar" src={fistTargetImage} alt="Dev avatar" />
//            <strong>{target.name}</strong>
//            <p>{target.resume}</p>
//            <button type="button" onClick={() => handleClickMatchSpan(newMatches[0])}>FECHAR</button>
//         </div>
//       )
//     } 
    
//     {
//       user && matches && matches.length > 0 ? (
//         <ul>
//           {
//           matches.map((u:TUser) => (
//             <li key={u.id}>
//               <footer>
//                 <strong>{u.name || u.username}</strong>
//               </footer>
//               <div className="buttons">
//                 <button type="button" onClick={() => handleLike(u.id)}>
//                     <img src={like} alt="Like" /> 
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//     ) : (
//       <div className="empty">Nenhum usuário encontrado...</div>
//     )}
//     </div>
//   );
// }

// import React, { useEffect, useState } from 'react';
// import { useLoginContext } from '../context/LoginContext';
// import { useMatchContext } from '../context/MatchContext';
// import itsmatch from '../../src/assets/itsamatch.png';
// import like from '../../src/assets/like.svg';
// import { TUser } from '../Type';

// export default function MatchContainer({ newMatches, setMatchDev }) {
//   const { user, unlike_to } = useLoginContext();
//   const { matches, load_matches } = useMatchContext();
//   const [showMatch, setShowMatch] = useState(false);

//   useEffect(() => {
//     if (user) {
//       load_matches(user.id);
//     }
//   }, [newMatches]);

//   useEffect(() => {
//     if (newMatches.length > 0) {
//       setShowMatch(true);
//       const timer = setTimeout(() => setShowMatch(false), 5000); // Hide after 5 seconds
//       return () => clearTimeout(timer);
//     }
//   }, [newMatches]);

//   async function handleLike(id: number) {
//     await unlike_to(user.id, id);
//   }

//   const handleClickMatchSpan = (newUser: TUser) => {
//     setMatchDev((prevMatchDev) => prevMatchDev.filter((user) => user.id !== newUser.id));
//   };

//   const target = matches.find(t => t.id === newMatches[0]?.id);
//   const firstTargetImage = target && target.imageUrls ? target.imageUrls[0] : '';

//   return (
//     <div className="matches-container">
//       {newMatches && newMatches.length > 0 && (
//         <div className={`match-container ${showMatch ? 'show' : ''}`}>
//           <img src={itsmatch} alt="It's a match" />
//           <img className="avatar" src={firstTargetImage} alt="Dev avatar" />
//           <strong>{newMatches[0].name}</strong>
//           <p>{newMatches[0].resume}</p>
//           <button type="button" onClick={() => handleClickMatchSpan(newMatches[0])}>FECHAR</button>
//         </div>
//       )}
//       {user && matches && matches.length > 0 ? (
//         <ul>
//           {matches.map((u) => (
//             <li key={u.id}>
//               <footer>
//                 <strong>{u.name || u.username}</strong>
//               </footer>
//               <div className="buttons">
//                 <button type="button" onClick={() => handleLike(u.id)}>
//                   <img src={like} alt="Like" />
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <div className="empty">Nenhum usuário encontrado...</div>
//       )}
//     </div>
//   );
// }
import React, { useEffect, useState } from 'react';
import { useLoginContext } from '../context/LoginContext';
import { useMatchContext } from '../context/MatchContext';
import itsmatch from '../../src/assets/itsamatch.png';
import like from '../../src/assets/like.svg';
import { TUser } from '../Type';

export default function MatchContainer({ newMatches, setMatchDev }) {
  const { user, unlike_to } = useLoginContext();
  const { matches, load_matches } = useMatchContext();
  const [showMatch, setShowMatch] = useState(false);

  useEffect(() => {
    if (user) {
      load_matches(user.id);
    }
  }, [newMatches]);

  useEffect(() => {
    if (newMatches.length > 0) {
      setShowMatch(true);
    }
  }, [newMatches]);

  async function handleLike(id: number) {
    await unlike_to(user.id, id);
  }

  const handleClickMatchSpan = (newUser: TUser) => {
    setShowMatch(false);
    setTimeout(() => {
      setMatchDev((prevMatchDev) => prevMatchDev.filter((user) => user.id !== newUser.id));
    }, 1000); // Tempo da transição em milissegundos
  };

  // const target = matches.find(t => t.id === newMatches[0]?.id);
  // const firstTargetImage = target && target.imageUrls ? target.imageUrls[0] : '';

  const target = matches.length > 0 && newMatches.length > 0 ? matches.find(t=>t.id === newMatches[0].id) : null;
  const firstTargetImage = target && target.imageUrls ? target?.imageUrls[0] : '';

  return (
    <div className="matches-container">
      {newMatches && newMatches.length > 0 && target && (
        <div className={`match-container ${showMatch ? 'show' : 'hide'}`}>
          <img src={itsmatch} alt="It's a match" />
          <img className="avatar" src={firstTargetImage} alt="Dev avatar" />
          <strong>{target.name}</strong>
          <p>{target.resume}</p>
          <button type="button" onClick={() => handleClickMatchSpan(newMatches[0])}>FECHAR</button>
        </div>
      )}
      {user && matches && matches.length > 0 ? (
        <ul>
          {matches.map((u) => (
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

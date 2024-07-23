import { createContext, useContext, useEffect, useState } from "react";
import { IReactRCProps } from "./IReactDom";
import { useLoginContext } from "./LoginContext";
import { useMatchContext } from "./MatchContext";
import io from 'socket.io-client';
import itsmatch from '../assets/itsamatch.png';
import { arrayBufferToBase64 } from "../util/util";
 
 
interface INotificationContext {
    // matches: TUser[] | [];
    // setMatches: (matches: TUser[] | []) => void;
    // newMatches: TUser[] | [];
    // setNewMatches: (matches: TUser[]| []) => void;
    // load_matches: (userId:number) => {};//sendMessage(user.id, selectedMatch.id, messageContent);
    // sendMessage: (userId:number, matchId:number, messageContent:string) => {}
} 

interface INotificationProviderProps extends IReactRCProps {}

const NotificationContext = createContext({} as INotificationContext);
 
export const NotificationProvider = ({children}) => {
    const { user } = useLoginContext();
  const { setNewMatches, newMatches, setMatches, matches } = useMatchContext();
  const [showMatch, setShowMatch] = useState(false);
  

  useEffect(() => {
    if (newMatches.length > 0) {
      setShowMatch(true);
    }
  }, [newMatches]);

  useEffect(() => {
    if (user) {
      const socket = io('http://182.30.0.11:3001/', { query: { user: user.id } });

      socket.on('newMessage', (message) => {
        const messageObject = JSON.parse(message);
        const targetMatchIndex = matches.findIndex((m) => m.matchId === messageObject.matchId);
        if (targetMatchIndex !== -1) {
            const newMatchs = [...matches];
            const updatedMatch = { ...newMatchs[targetMatchIndex] };
            updatedMatch.messages = [...updatedMatch.messages, messageObject];
            newMatchs[targetMatchIndex] = updatedMatch;
            console.log('adicionando no newMessage')
            console.log(newMatchs)
            setMatches(newMatchs);
        } else {
            console.error('Match não encontrado');
        }
      });

      socket.on('match', (dev) => {
        setNewMatches((prevMatchDev) => [...prevMatchDev, JSON.parse(dev)]);
      });

      return () => socket.disconnect();
    }
  }, [user, matches]);

  const handleClickMatchSpan = (newUser: TUser) => {
    setShowMatch(false);
    setTimeout(() => {
      setNewMatches((prevMatchDev) => {
        const a = prevMatchDev.filter((user) => user.id !== newUser.id);
        return a;
      });
    }, 0);
  };

  const target = newMatches.map((mat)=>{
    const urls = mat.images?.map((image: { fileData: ArrayBuffer; fileName: string }) => {
      return `data:image/png;base64,${arrayBufferToBase64(image.fileData.data)}`;
    }) || [''];
    return {
    ...mat,
    imageUrls: urls[0]

  }})
  let span = (<></>);
  if(newMatches.length > 0){ 
    const firstTargetImage = target && target[0].imageUrls ? target[0].imageUrls:''; 
      span =  (<>
     {newMatches && newMatches.length > 0 && target && (
      <div className={`match-container ${showMatch ? 'show' : 'hide'}`}>
        <img src={itsmatch} alt="It's a match" />
        <img className="avatar" src={firstTargetImage} alt="Dev avatar" />
        <strong>{target[0].name}</strong>
        <p>{target[0].resume}</p>
        <button type="button" onClick={() => handleClickMatchSpan(newMatches[0])}>FECHAR</button>
      </div>
    )} 
     </>)
  }

   

 
    return(
        <NotificationContext.Provider value={{}}>
            {span}
            {children}
            
        </NotificationContext.Provider>);
}

export const useNotificationContext = () => {
    return useContext(NotificationContext);
}
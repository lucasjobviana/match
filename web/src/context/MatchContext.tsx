import { createContext, useCallback, useContext, useState } from "react";
import { TUser } from "../Type"; 
import { loadMatches, sendMessageTo } from "../services/api"
import { IReactRCProps } from "./IReactDom";
 
interface IMatchContext {
    matches: TUser[] | [];
    setMatches: (matches: TUser[] | []) => void;
    newMatches: TUser[] | [];
    setNewMatches: (matches: TUser[]| []) => void;
    load_matches: (userId:number) => {};//sendMessage(user.id, selectedMatch.id, messageContent);
    sendMessage: (userId:number, matchId:number, messageContent:string) => {}
} 

interface IMatchProviderProps extends IReactRCProps {}

const MatchContext = createContext({} as IMatchContext);

export const MatchProvider = ({children}) => {
    const [matches, setMatches] = useState<TUser[] |[]>([]);
    const [newMatches, setNewMatches] = useState<TUser[]>([]);
    
    const load_matches = async( userId:number) =>{
        const matches = await loadMatches(userId);
        console.log(matches)
        setMatches(matches);
    };
 
    const sendMessage =  async(userId:number, matchId:number, content:string) => {
        const match = await sendMessageTo(userId, matchId, content);
        const targetMatch = matches.find((m)=>m.matchId === matchId  )
        targetMatch.messages.push(match);
        console.log(matches)
        console.log(match)
        console.log(targetMatch)
        // setMatches({
        //     ...targetMatch,
        // });
    }

    return(
        <MatchContext.Provider value={{
            matches, setMatches, load_matches, newMatches, setNewMatches,sendMessage
        }}>
            {children}
        </MatchContext.Provider>);
}

export const useMatchContext = () => {
    return useContext(MatchContext);
}
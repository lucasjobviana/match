import { createContext, useCallback, useContext, useState } from "react";
import { TUser } from "../Type"; 
import { loadMatches } from "../services/api"
import { IReactRCProps } from "./IReactDom";

interface IMatchContext {
    matches: TUser[] | [];
    setMatches: (matches: TUser[] | []) => void;
    load_matches: (userId:number) => {};
} 

interface IMatchProviderProps extends IReactRCProps {}

const MatchContext = createContext({} as IMatchContext);

export const MatchProvider = ({children}) => {
    const [matches, setMatches] = useState<TUser[] |[]>([]);
    
    const load_matches = useCallback( async( userId:number) =>{
        const matches = await loadMatches(userId);
        setMatches(matches);
    },[matches]);

    return(
        <MatchContext.Provider value={{matches, setMatches, load_matches}}>
            {children}
        </MatchContext.Provider>);
}

export const useMatchContext = () => {
    return useContext(MatchContext);
}
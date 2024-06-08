import { createContext, useCallback, useContext, useState } from "react";
import { TUser } from "../Type"; 
import { unlikeTo, likeTo, dislikeTo, undislikeTo, login, updateUser } from "../services/api"
import { IReactRCProps } from "./IReactDom";

interface ILoginContext {
    user: TUser | null;
    setUser: (user: TUser | null) => {};
    log_in: (username: string, password: string) => {};
    like_to: (idLoggedUser:number, idTargetUser:number) => {}
    unlike_to: (idLoggedUser:number, idTargetUser:number) => {}
    dislike_to: (idLoggedUser:number, idTargetUser:number) => {}
    undislike_to: (idLoggedUser:number, idTargetUser:number) => {}
    update_user: (idLoggedUser:number, formData:FormData ) => {}
}

interface ILoginProviderProps extends IReactRCProps {}

const LoginContext = createContext({} as ILoginContext);

export const LoginUserProvider = ({children}) => {
    const [user, setUser] = useState( null );
    
    const log_in = useCallback( async(username:string, password:string) =>{
        const loggedUser = await login(username, password);
        setUser(loggedUser);
    },[user]);

    const like_to = useCallback( async (idLoggedUser:number, idTargetUser:number) => {
        const loggedUser = await likeTo(idLoggedUser, idTargetUser);
        setUser(loggedUser);
    }, [user]);

    const unlike_to = useCallback( async (idLoggedUser:number, idTargetUser:number) => {
        const loggedUser = await unlikeTo(idLoggedUser, idTargetUser);
        setUser(loggedUser);
    }, [user]);

    const dislike_to = useCallback( async (idLoggedUser:number, idTargetUser:number) => {
        const loggedUser = await dislikeTo(idLoggedUser, idTargetUser);
        setUser(loggedUser);
    }, [user]);

    const undislike_to = useCallback( async (idLoggedUser:number, idTargetUser:number) => {
        const loggedUser = await undislikeTo(idLoggedUser, idTargetUser);
        setUser(loggedUser);
    }, [user]);

    const update_user = useCallback( async (idLoggedUser:number, formData:FormData) => {
        console.log('----userconnnnnnnnntext-----');
        console.log(formData)
        for (const pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
          }
        const loggedUser = await updateUser(idLoggedUser, formData);
        console.log(loggedUser)
        setUser(loggedUser);
    }, [user]);

    return(
        <LoginContext.Provider value={{user, setUser, log_in, like_to, unlike_to, dislike_to, undislike_to, update_user}}>
            {children}
        </LoginContext.Provider>);
}

export const useLoginContext = () => {
    return useContext(LoginContext);
}
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../context/LoginContext";
import BottomNav from "./BottomNav";

function App({children}) {
  const { setUser, user } = useLoginContext();
  const navigate = useNavigate(); 
   
  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return(<>
  
  {children}
  {user && <BottomNav user={user} handleLogout={handleLogout} />}
  </>
  )

  // return (<>
  //   <Router>
  //   <Routes>
  //     <Route path="/" element={<Login />} />
  //     <Route path="/user/:id" element={<Principal  />} />
  //     <Route path="/user/:id/profile" element={<Profile  />} />
  //     <Route path="/user/:id/matches" element={<MatchContainer  />} />
  //     <Route path="*" element={<Navigate to="/" />} /> 
  //   </Routes>
  // </Router>
  // </>
  // )
}

export default App

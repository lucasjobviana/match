import { useEffect, useState } from 'react';
import './Login.css';
import { register } from '../services/api'; // Adicione a função register para o serviço de cadastro
import { useNavigate } from 'react-router-dom';
import { useLoginContext } from '../context/LoginContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false); // Estado para alternar entre login e cadastro
  const { user, log_in } = useLoginContext();
  const navigate = useNavigate();
  console.log('login')//navigate(`/user/${user.id}`)

  useEffect(() => {
    if (user) {
      localStorage.setItem('loggedUserId',user.id.toString())
      navigate(`/user/${user.id}`);
    }
  }, [user, navigate]);


  async function handleSubmit(e) {
    e.preventDefault();
    console.log('handleSubmit', isRegister)
 
    if (isRegister) {
      try {
        const newUser = await register(username, password);
        alert('Usuário cadastrado com sucesso');
        setIsRegister(false); 
      } catch (error) {
        alert('ja')
      }
    } else {
      try {
        console.log('chamarei log_in')
        const loggedInUser = await log_in(username, password);
        console.log(loggedInUser);
      } catch (error) {
        alert(error.message);
      }
    }
  }

  return !user ? (
    <div className="login-container">
      <form onSubmit={(e)=> handleSubmit(e)}>
        <input 
          placeholder="Digite o seu usuário"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input 
          type='password' 
          placeholder='Senha'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">{isRegister ? 'Cadastrar' : 'Entrar'}</button>
      </form>
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'Já tem uma conta? Entrar' : 'Não tem uma conta? Cadastrar'}
      </button>
    </div>
  ) : (
     null
  );
}
import { useHistory } from 'react-router-dom';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleImage from '../assets/images/google-icon.svg';
import { Button } from '../components/Button/Button';

import '../styles/auth.scss';
import { useAuth } from '../hooks/useAuth';
import { FormEvent } from 'react';
import { useState } from 'react';
import { database } from '../services/firebase';


export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle} = useAuth()
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }
  
  history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if(roomCode.trim() === ''){
    return;
  }

  const roomRef = await database.ref(`rooms/${roomCode}`).get();

  if (!roomRef.exists()) {
    alert("Room doesn't exists.");
    return;
  }

  if (roomRef.val().endedAt) {
    alert('Room already closed');
    return;
  }
  history.push(`/rooms/${roomCode}`)
}
  return (
    <div id="page-auth">
    <aside>
      <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
      <strong>Cria salas de Q&amp;A ao-vivo</strong>
      <p>Tire suas dúvidas da audiência em tempo-real</p>
    </aside>
    <main>
      <div className="main-content">
        <img src={logoImg} alt="logo do LetMeAsk" />
        <button className="create-room" onClick={handleCreateRoom}>
          <img src={googleImage} alt="Logo do google para fazer login" />
          Crie sua sala com o Google 
        </button>
        <div className="separator">
          Ou entre em uma sala
        </div>
        <form onSubmit = {handleJoinRoom}>
          <input 
          type="text"
          placeholder="Digite o código da sala"
          onChange={event => setRoomCode(event.target.value)}
          value={roomCode}
          />
          <Button type="submit">Entre na sala</Button>
        </form>
      </div>
    </main>
  </div>
  )}
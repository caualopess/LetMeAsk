import { Link, useHistory } from 'react-router-dom';
import { FormEvent } from 'react'
//import { useAuth } from '../hooks/useAuth'
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
//import googleImage from '../assets/images/google-icon.svg';
import { Button } from '../components/Button/Button';
import '../styles/auth.scss';
import { useState } from 'react';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

export function NewRoom() {
  const { user } = useAuth()
  const [newRoom, setNewRoom] = useState('');
  const history = useHistory();

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
    console.log(newRoom);
    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      tittle: newRoom,
      authorId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`)
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
        <h2>Crie uma nova sala!</h2>
        <form onSubmit = {handleCreateRoom}>
          <input 
          type="text"
          placeholder="Nome da sala"
          onChange={event => setNewRoom(event.target.value)}
          value={newRoom}>
          </input>
          <Button type="submit">Criar sala</Button>
        </form>
        <p>
          Quer entrar em uma sala existente? <Link to="/">Clique Aqui</Link>
        </p>
      </div>
    </main>
  </div>
  )}
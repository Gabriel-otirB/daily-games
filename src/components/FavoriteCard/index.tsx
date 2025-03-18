"use client"
import { useState } from 'react';
import { FiEdit, FiX } from 'react-icons/fi';

const FavoriteCard = () => {

  const [input, setInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [gameName, setGameName] = useState("");

  function handleButton() {
    setShowInput(!showInput);

    if (input !== '') {
      setGameName(input);
    }

    setInput('');
  }

  return (
    <div className='w-full bg-gray-900 p-4 h-44 text-white rounded-lg flex justify-between flex-col'>
      {showInput ? (
        <div className='flex items-center justify-center gap-3'>
          <input
            className='w-full rounded-md h-8 text-black bg-white px-2'
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className='cursor-pointer'
            onClick={handleButton}>
            <FiX size={24} />
          </button>
        </div>
      ) : (
        <button
          className='cursor-pointer self-start hover:scale-110 duration-200 transition-all'
          onClick={handleButton}
        >
          <FiEdit size={24} color='#fff' />
        </button>
      )}

      {gameName && (
        <div>
          <span className='text-white'>Jogo Favorito:</span>
          <p className='font-bold text-white text-wrap'>{gameName}</p>
        </div>
      )}

      {!gameName && (<p className='font-bold text-white'>Adicionar jogo</p>)}
    </div>
  )
}

export default FavoriteCard;
import { useCallback, useEffect, useState } from "react"
import words from './wordList.json'
import './style.css'
import Video from './images/background.mp4'
import { HangmanWords } from "./HangmanWords"
import { Keyboard } from "./Keyboard"
import {HangmanDrawing} from './HangmanDrawing'

function getWord() {
  return words[Math.floor(Math.random() * words.length)]
}

function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord)
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  const incorrectLetters = guessedLetters.filter(
    letter => !wordToGuess.includes(letter)
  )
  
  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter))

  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isWinner || isLoser) return

    setGuessedLetters(currentLetters => [...currentLetters, letter])
  },[guessedLetters, isWinner, isLoser])
  
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

      if (!key.match(/^[a-z]$/)) return

      e.preventDefault()
      addGuessedLetter(key)
    }

    document.addEventListener('keypress', handler)

    return () => {
      document.removeEventListener('keypress', handler)
    }
  },[guessedLetters])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

      if (key !== "Enter") return

      e.preventDefault()
      setGuessedLetters([])
      setWordToGuess(getWord())
    }

    document.addEventListener('keypress', handler)

    return () => {
      document.removeEventListener('keypress', handler)
    }
  }, [])

  return <div className="window">
    <video src={Video} autoPlay muted loop></video>
  <div className="container">
      <div className="statusGame">
        {isWinner && 'Winner - Refresh to try again!'}
        {isLoser && 'Nice Try! - Refresh to try again!'}
      </div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWords reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess}/>
      <div style={{alignSelf: 'stretch'}}>
        <Keyboard activeLetters={guessedLetters.filter(letter => 
          wordToGuess.includes(letter)
        )} inactiveLatters={incorrectLetters} addGuessedLetter={addGuessedLetter} />
      </div>
    </div>
  </div> 
}

export default App
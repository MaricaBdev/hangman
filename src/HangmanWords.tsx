type HangmanWordsProps = {
    guessedLetters: string[],
    wordToGuess: string,
    reveal?: boolean 
}

export function HangmanWords({guessedLetters, wordToGuess, reveal=false} : HangmanWordsProps) {

    return (
        <div style={{display:"flex", gap: '0.25em', fontSize: '6rem', fontWeight: 'bold', textTransform: 'uppercase', fontFamily: 'monospace', color: 'white'}}>
            {wordToGuess.split("").map((letter, index) => (
                <span style={{borderBottom: '.1em solid white'}} key={index}>
                    <span style={{visibility: guessedLetters.includes(letter) || reveal ? 'visible' : 'hidden', color: !guessedLetters.includes(letter) && reveal ? '#B63654' : 'white'}}>
                        {letter}
                    </span>
                </span>
            ))}
            
        </div>
    )
}
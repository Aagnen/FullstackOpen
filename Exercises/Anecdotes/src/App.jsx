import { useState } from 'react'

const Button = ({ points, setPoints, voteFor, setWinner }) => {
  const handleVote = () => {
    const copy = [...points]
    copy[voteFor] +=1
    setPoints(copy)

    const maxVote = Math.max(...copy);
    const winnerIndex = copy.indexOf(maxVote)
    setWinner(winnerIndex)
  }

  return (
    <button onClick={handleVote}>
      vote
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [winner, setWinner] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  return (
    <div>
      {anecdotes[selected]}
      <p>has {points[selected]} votes</p>
      <p></p>
      {/* <button onClick={()=> console.log(getRandomInt(anecdotes.length))}>
        Next anecdote
      </button> */}
      <Button points={points} setPoints={setPoints} voteFor={selected} setWinner={setWinner}/>
      <button onClick={()=> setSelected(getRandomInt(anecdotes.length))}>
        Next anecdote
      </button>
      <h1>Anecdote with most votes</h1>
      {anecdotes[winner]}
    </div>
  )
}

export default App
import { useState } from 'react'

//#region text
// const Statistics = ({ good, neutral, bad }) => {
//   let all = good + bad + neutral
//   if (all === 0){
//     return(
//       <div>
//         <h1>statistics</h1>
//         <p>No feedback given</p>
//       </div>
//       )
//   }
//   else {
//     return(
//       <div>
//         <h1>statistics</h1>
//         <p>good {good}</p>
//         <p>neutral {neutral}</p>
//         <p>bad {bad}</p>
//         <p>all {all}</p>
//         <p>average {all/3}</p>
//         <p>positive {good / all *100}</p>
//       </div>
//       )
//   }
// }
//#endregion
//#region Table
const Statistics = ({ good, neutral, bad }) => {
    let all = good + bad + neutral
    if (all === 0){
      return(
        <div>
          <h1>statistics</h1>
          <p>No feedback given</p>
        </div>
        )
    }
    else {
      return(
        <div>
          <h1>statistics</h1>
          <table>
            <tbody>
              <tr>
                <td>good</td>
                <td>{good}</td>
              </tr>
              <tr>
                <td>neutral</td>
                <td>{neutral}</td>
              </tr>
              <tr>
                <td>bad</td>
                <td>{bad}</td>
              </tr>
              <tr>
                <td>all</td>
                <td>{all}</td>
              </tr>
              <tr>
                <td>average</td>
                <td>{(all/3).toFixed(2)}</td>
              </tr>
              <tr>
                <td>positive</td>
                <td>{(good / all *100).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        )
    }
  }
//#endregion

const Butt = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Butt handleClick={() => setGood(good + 1)} text='good' />
      <Butt handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Butt handleClick={() => setBad(bad + 1)} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
//#region beforeRefactor
// import { useState } from 'react'

// //#region without deconstruction
// // const Hello = (props) => {
// //   const age = props.age
// //   const name = props.name
// //#endregion
// //#region longer decnstruction
// // const Hello = (props) => {
//   // const { name, age } = props // deconstruction - does the same
// //#endregion
// const Hello = ({ name, age }) => {// deconstruction - does the same
//   const bornYear = () => new Date().getFullYear() - age
  
//   const now = new Date()
//   const a = 10
//   const b = 20
//   console.log(now, a+b)

//   return (
//     <div>
//       <p>Hello {name}. You are {age} years old. Now is {now.toString()}</p>
//       <p>So You were probably born in {bornYear()}</p>
//       <p>{a} + {b} = {a+b}</p>
//     </div>
//   )
// }

// const App = (props) => {
//   const age = 26
//   // const {counter} = props
//   const [ counter, setCounter ] = useState(0)
//   //#region timeout
//   // setTimeout(
//   //   () => setCounter(counter + 1),
//   //   1000
//   // )
//   //#endregion

//   const handleClick = () => {
//     console.log('clicked')
//   }

//   return(
//     <div>
//       <h2>{ counter }</h2>
//       <p></p>
//       <h1>Pozdrowienia</h1>
//       <Hello name='Agnes' age={age} />
//       <button onClick={() => setCounter(counter + 1)}>
//         +
//       </button>
//       <button onClick={handleClick}>
//         + log
//       </button>
//       <button onClick={() => setCounter(0)}>
//         zero
//       </button>
//     </div>
//   )
// }

// export default App
//#endregion

//#region MAIN
// import { useState } from 'react'

// const Display = ({counter, total}) => <div><h2>{counter} : {total}</h2></div>

// const History = (props) => {
//   if (props.allClicks.length === 0) {
//     return (
//       <div>
//         the app is used by pressing the buttons
//       </div>
//     )
//   }
//   return (
//     <div>
//       button press history: {props.allClicks.join(' ')}
//     </div>
//   )
// }

// const Button = ({ onClick, text }) => <button onClick={onClick}> {text} </button>

// const Hello = ({ name, age }) => {// deconstruction - does the same
//   const bornYear = () => new Date().getFullYear() - age
//   return (
//     <div>
//       <p>Hello {name}. You are {age} years old.</p>
//       <p>So You were probably born in {bornYear()}</p>
//     </div>
//   )
// }

// const App = (props) => {
//   const [ counter, setCounter ] = useState(0)
//   const [allClicks, setAll] = useState([])
//   const [total, setTotal] = useState(0)

//   const increaseByOne = () => { 
//     setAll(allClicks.concat('+1 '))
//     setCounter(counter + 1) 
//     setTotal(total +1)
//   } 
//   const decreaseByOne = () => {
//     setAll(allClicks.concat('-1 '))
//     setCounter(counter - 1)
//     setTotal(total +1)
//   } 
//   const setToZero = () => { 
//     setAll(allClicks.concat('0 '))
//     setCounter(0)
//     setTotal(total +1)
//   } 

//   // debugger

//   return(
//     <div>
//       <Display counter={counter} total={total}/>
//       <h1>Pozdrowienia</h1>
//       <Button
//         onClick={increaseByOne}
//         text='plus'
//       />
//       <Button
//         onClick={decreaseByOne}
//         text='minus'
//       />
//       <Button
//         onClick={setToZero}
//         text='zero'
//       />
//       <Hello name='Agnes' age='26' />
//       <History allClicks={allClicks} />
//     </div>
//   )
// }

// export default App
//#endregion

//#region Revision
import { useState } from 'react'

const App = () => {
  const [value, setValue] = useState(10)

  const hello = (who) => () => console.log('hello', who)
  const setToValue = (newValue) => () => {
    console.log('new value', newValue)
    setValue(newValue)
  }


  return (
    <div>
      {value}
      <button onClick={hello('Agnes')}>Hello Agnes</button>
      <button onClick={hello('World')}>Hello World</button>
      <button onClick={hello()}>Hello</button>

      <button onClick={setToValue(666)}>Devil</button>
      <button onClick={setToValue(0)}>Reset</button>
      <button onClick={setToValue(value + 1)}>Increment</button>
    </div>
  )
}

export default App
//#endregion
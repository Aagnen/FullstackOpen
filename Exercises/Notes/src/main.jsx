import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

//#region ServerGet
// import axios from 'axios'
// const promise = axios.get('http://localhost:3001/notes')
// console.log(promise)
// promise.then(response => {
//   console.log(response)
// })

// axios
//   .get('http://localhost:3001/notes')
//   .then(response => {
//     const notes = response.data
//     console.log(response)
//     ReactDOM
//       .createRoot(document.getElementById('root'))
//       .render(<App notes={notes}/>)
//   })
//#endregion

ReactDOM.createRoot(document.getElementById("root")).render(<App />);


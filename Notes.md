# General
Course from [Helsinki University Fullstack Open](https://fullstackopen.com/en/)

# Classes
## 0 Fundamentals
- Always keep the Developer Console open
  - Fn-F12 or ctrl-shift-i
## 1 React
- starting app from template
    ```
    npm create vite@latest part1 -- --template react
    cd part1
    npm install
    npm run dev
    ```
- basic JavaScript function
    ```
    () => (
        <div>
            <p>Hello world</p>
        </div>
    )
    ```
    or this
    ```
    const App = () => {
        return (
            <div>
            <p>Hello world</p>
            </div>
        )
    }
    ```
  - the inside is JSX, not html
  - In practice, JSX is much like HTML with the distinction that with JSX you can easily embed dynamic content by writing appropriate JavaScript within curly braces
  - The compilation is handled by Babel
### JS
- const vs let
- objects
    ```
    const object3 = {
        name: {
            first: 'Dan',
            last: 'Abramov',
        },
        grades: [2, 3, 5, 3],
        department: 'Stanford University',
    }
    ```
-  deconstruction
  ```
  const Hello = (props) => {
  const { name, age } = props }
  ```
### State
    ```
    import { useState } from 'react'
    const [ counter, setCounter ] = useState(0)
    ```
### Event handling
    const App = () => {
        const [ counter, setCounter ] = useState(0)

        const handleClick = () => {
            console.log('clicked')
        }

        return (
            <div>
            <div>{counter}</div>
            <button onClick={handleClick}>
                plus
            </button>
            </div>
            )
    }
or
    ```
    <button onClick={() => console.log('clicked')}>
    ```

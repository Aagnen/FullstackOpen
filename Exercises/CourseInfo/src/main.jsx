import ReactDOM from 'react-dom/client'

import App from './App'
import Courses from './Courses'

ReactDOM.createRoot(document.getElementById('root')).render(<App courses={Courses}/>)
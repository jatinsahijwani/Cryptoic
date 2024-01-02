import { useState } from 'react'
import LoginRegister from './components/loginregister';
import { BrowserRouter , Routes , Route} from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <BrowserRouter>
    <Routes>
      <Route index element={<LoginRegister/>} />
      <Route path='/home' element={<LoginRegister />}/>
      
    </Routes>
    </BrowserRouter> */}
      <LoginRegister />
    </>
  )
}

export default App


import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Cadastro from './pages/cadastro/Cadastro'
import Home from './pages/home/Home'
import Header from './components/header/Header'
import Agendamento from './pages/agendamento/Agendamento'
import Login from './pages/login/Login'
import Inicio from './pages/inicio/Inicio'

import Conta from './pages/conta/Conta'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Inicio/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/cadastro' element={<Cadastro />}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/agendamento' element={<Agendamento/>}></Route>
        <Route path='/conta' element={<Conta/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Cadastro from './pages/cadastro/Cadastro'
import Home from './pages/home/Home'
import Funcionalidade from './pages/conta/opcoes_nav/funcionalidades'
import Agendamento from './pages/agendamento/Agendamento'
import Login from './pages/login/Login'
import Inicio from './pages/inicio/Inicio'
import Admin from './admin/Admin'
import Perfil from './pages/conta/perfil/Perfil'
import Campo from './admin/campos/Campos'

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
        <Route path='/func' element={<Funcionalidade/>}></Route>
        <Route path='/perfil' element={<Perfil/>}></Route>
        <Route path='/admin' element={<Admin/>}></Route>
        <Route path='/campo' element={<Campo/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

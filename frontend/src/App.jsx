import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Cadastro from './pages/cadastro/Cadastro'
import Home from './pages/home/Home'
import Funcionalidade from './pages/conta/opcoes_nav/Funcionalidade'
import Agendamento from './pages/agendamento/Agendamento'
import Login from './pages/login/Login'
import Inicio from './pages/inicio/Inicio'
import Admin from './admin/Admin'
import Perfil from './pages/conta/perfil/perfil'
import Configuracoes from "./pages/conta/config/Configuracoes"
import Seguranca from "./pages/conta/seguranca/Seguranca"
import HistoricoReservas from "./pages/conta/historicoReservas/HistoricoReservas"
import SorteadorTime from "./pages/conta/sorteadorTime/SorteadorTime"
import Campo from './admin/campos/Campos'
import Agendamentoadm from './admin/agendamentosadm/Agendamentoadm'
import GerenciarUsuarios from './admin/gerenciar/Gerenciar-adm'
import { Protected } from './components/rotaProtected/Protected'
import {ProtectedAdmin} from './components/rotaProtected/ProtectedAdmin';


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>

        //rotas publicas
        <Route path='/' element={<Inicio/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/cadastro' element={<Cadastro />}></Route>


        //rotas protegidas
        <Route path='/home' element={<Protected><Home /></Protected>}></Route>
        <Route path='/agendamento' element={<Protected><Agendamento/></Protected>}></Route>
        <Route path='/func' element={<Protected><Funcionalidade/></Protected>}></Route>
        <Route path='/conta/perfil' element={<Protected><Perfil/></Protected>}></Route>
        <Route path='/conta/configuracoes' element={<Protected><Configuracoes/></Protected>}></Route>
        <Route path='/conta/seguranca' element={<Protected><Seguranca/></Protected>}></Route>
        <Route path='/conta/historico' element={<Protected><HistoricoReservas/></Protected>}></Route>
        <Route path='/conta/sorteador' element={<Protected><SorteadorTime/></Protected>}></Route>

        //rota admin
        <Route path='/admin' element={<ProtectedAdmin><Admin/></ProtectedAdmin>}></Route>
        <Route path='/admin/campo' element={<ProtectedAdmin><Campo/></ProtectedAdmin>}></Route>
        <Route path='/admin/gerenciarUsuarios' element={<ProtectedAdmin><GerenciarUsuarios/></ProtectedAdmin>}></Route>
        <Route path='/admin/agendamento' element={<ProtectedAdmin><Agendamentoadm/></ProtectedAdmin>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

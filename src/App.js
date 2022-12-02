import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import Editor from './components/Editor';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';

const ROLES = {
  'Employee': 1,
  'Manager': 2,
  'Admin': 3
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        {/* public route */}
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="linkpage" element={<LinkPage/>}/>
        <Route path="unauthorized" element={<Unauthorized/>}/>

        {/* protected route */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Employee, ROLES.Manager, ROLES.Admin]}/>}>
          <Route path="/" element={<Home/>}/>
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.Manager]}/>}>
          <Route path="editor" element={<Editor/>}/>
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]}/>}>
          <Route path="admin" element={<Admin/>}/>
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]}/>}>
          <Route path="lounge" element={<Lounge/>}/>
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing/>}/>
      </Route>
    </Routes>
  );
}

export default App;
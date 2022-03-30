import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import SignUp from './pages/SignUp/SignUp';
import UserManagement from './pages/UserManagement/UserManagement';
import UserSignUpTemplate from './templates/LoginTemplate/UserSignUpTemplate';
import Login from './pages/Login/Login';
import UserManagementTemplate from './templates/ManagementTemplate/UserManagementTemplate';

function App() {
  return <>

    <UserSignUpTemplate exact path='/' Component={SignUp} />
    <UserSignUpTemplate exact path='/login' Component={Login} />
    <UserManagementTemplate exact path='/usermanagement' Component={UserManagement} />
    <UserSignUpTemplate exact path='/logout' Component={Login} />
  </>
}

export default App;

import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import PostPage from './components/views/PostPage/PostPage'
import WritePage from './components/views/WritePage/WritePage'
import Auth from './hoc/auth'
function App() {
  return (
    <Router>
      <div>

        <Switch>
          <Route exact path={['/','/@:name']} component={Auth(LandingPage, null)}/>

          <Route exact path="/login" component={Auth(LoginPage, false)}/>

          <Route exact path="/register" component={Auth(RegisterPage, false)}/>

          <Route path="/write" component={Auth(WritePage)}/>

          <Route path="/@:name/:postId" component={Auth(PostPage)}/>

        </Switch>
      </div>
    </Router>
    
  );
}



export default App;

import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

//홈 페이지
import LandingPage from './components/views/LandingPage/LandingPage'
//로그인 페이지
import LoginPage from './components/views/LoginPage/LoginPage'
//회원가입 페이지
import RegisterPage from './components/views/RegisterPage/RegisterPage'
//포스트 페이지
import PostPage from './components/views/PostPage/PostPage'
//글쓰기 페이지
import WritePage from './components/views/WritePage/WritePage'


//hoc 인증 
import Auth from './hoc/auth'
function App() {
  return (
    <Router>
      <div>

        <Switch>
          <Route exact path={['/','/@:name']} component={Auth(LandingPage, null)}/>
          <Route exact path="/login" component={Auth(LoginPage, false)}/>

          <Route exact path="/register" component={Auth(RegisterPage, false)}/>

          <Route path="/write" component={Auth(WritePage, true)}/>

          <Route path="/write/:postId" component={Auth(WritePage, true)}/>

          <Route path="/:postId" component={Auth(PostPage, null)}/>

          

        </Switch>
      </div>
    </Router>
    
  );
}



export default App;

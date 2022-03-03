// Librairie
import React, {useState , useEffect} from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import routes from './config/routes';
import fire from './config/firebase';

// Composants
import Layout from './hoc/Layout/Layout'
import Home from'./Containers/Home/Home';
import Contact from './Components/Contact/Contact';
import Articles from './Containers/Articles/Articles';
import Article from './Containers/Articles/Article/Article';
import ManageArticle from './Containers/Admin/ManageArticle/ManageArticle';
import PageNotFound from './Components/PageNotFound/PageNotFound';
import Authentification from './Containers/Security/Authentification';

function App() {
  const [user, setUser] = useState('');

  // ComponentDidMount
  useEffect(()=>{
    authListener()
  },[])

  function authListener(){
    fire.auth().onAuthStateChanged(user =>{
      if(user){
        setUser(user)
      }else{
        setUser('')
      }
    });
  };

  return (
    <div className="App">
      <Layout user={user} >
        <Switch>
          {!user ? <Route exact path={routes.AUTHENTIFICATION} component={Authentification} /> : null}
          <Route exact path={routes.HOME} component={Home} />
          <Route  path={routes.CONTACT} component={Contact} />
          <Route exact path={routes.ARTICLES} component={Articles} />
          <Route exact path={routes.ARTICLES + '/:slug'} component={Article}/>
          {user ? <Route exact path={  routes.MANAGE_ARTICLE} component={ManageArticle}/> : null}
          <Route component={PageNotFound }/>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;

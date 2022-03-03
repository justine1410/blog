// librairie
import React from "react";
import classes from './Navigation.module.css';
import routes from '../../../config/routes';
import fire from "../../../config/firebase";
import { withRouter } from "react-router";


// Composants
import NavigationItem from './NavigationItem/NavigationItem';



function Navigation(props){

    // Fonction
    function logoutClickedHandler(){
        fire.auth().signOut();
        props.history.replace(routes.AUTHENTIFICATION)
    }

    return(
           <ul className= {classes.Navigation} >
                {props.user ? <NavigationItem exact to={routes.HOME}>Accueil</NavigationItem> : null}
                {props.user ? <NavigationItem to={routes.ARTICLES} >Articles</NavigationItem> : null}
                {props.user.email == "johndoe@google.com" ? <NavigationItem exact to={  routes.MANAGE_ARTICLE}>Ajouter</NavigationItem> : null}
                {props.user ? <NavigationItem to={routes.CONTACT}>Contact</NavigationItem> : null}
                {!props.user ? <NavigationItem to={routes.AUTHENTIFICATION} > Authentification </NavigationItem> : null}
                {props.user ? <button onClick={logoutClickedHandler} className="submit" >Déconnexion</button> : null}
           </ul>
    )

}

export default withRouter(Navigation);
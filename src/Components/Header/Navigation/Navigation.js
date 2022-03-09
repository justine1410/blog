// librairie
import React from "react";
import classes from './Navigation.module.css';
import routes from '../../../config/routes';
import fire from "../../../config/firebase";
import { withRouter } from "react-router";
import { toast } from 'react-toastify'


// Composants
import NavigationItem from './NavigationItem/NavigationItem';

function Navigation(props){

    // Fonction
    function logoutClickedHandler(){
        fire.auth().signOut();
        toast.success('À bientôt !')
        props.history.replace(routes.AUTHENTIFICATION)
    }

    return(
           <ul className= {classes.Navigation} >
                <NavigationItem exact to={routes.HOME}>Accueil</NavigationItem> 
                <NavigationItem to={routes.ARTICLES} >Articles</NavigationItem> 
                {props.user.email == 'justine1410@live.fr' ? <NavigationItem exact to={  routes.MANAGE_ARTICLE}>Ajouter</NavigationItem> : null}
                {props.user ? <NavigationItem to={routes.CONTACT}>Contact</NavigationItem> : null}
                {!props.user ? <NavigationItem to={routes.AUTHENTIFICATION} > Authentification </NavigationItem> : null}
                {props.user ? <button onClick={logoutClickedHandler} className="submit" >Déconnexion</button> : null}
           </ul>
    )

}

export default withRouter(Navigation);
// librairie
import React from "react";
import classes from './Header.module.css'
import { useHistory } from 'react-router-dom';

// Composant
import Navigation from "./Navigation/Navigation";

function Header(props){

    // fonction
    const history = useHistory()
    function returnAccueil(){
        let url = '/accueil'
        history.push(url) 
    }

    return(
        <header className={classes.Header} >
            <div className= {['container', classes.flex].join(' ')} >
                <div className={classes.logo} >
                    <img onClick={ returnAccueil } src={require("./img/chat.png")} alt="" />
                </div>
                <nav>
                    <Navigation user={props.user} />
                </nav>
            </div>
            
        </header>
    );
}

export default Header;

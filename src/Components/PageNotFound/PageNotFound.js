// Librairie
import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './PageNotFound.module.css'

function PageNotFound(){
    return( 
        <div className={classes.redirect}>
            <h1>Oups !</h1>
            <p>La page que vous recherchez semble introuvable</p>
            <NavLink to='/' >
                Retourner à la page d'accueil
            </NavLink>
        </div>

    );
}

export default PageNotFound;
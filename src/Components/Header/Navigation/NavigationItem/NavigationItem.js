// Librairies
import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';
import PropTypes from 'prop-types'

// composant


function NavigationItem(props){

    return(
        <li className={classes.NavigationItem} >
            <NavLink  
                exact={props.exact} to={props.to} 
                activeClassName= {classes.active} 
            >
                {props.children} 
            </NavLink>
        </li>
    )
}

NavigationItem.propTypes ={
    exact : PropTypes.bool,
    to : PropTypes.string,
    children : PropTypes.string
};

export default NavigationItem;
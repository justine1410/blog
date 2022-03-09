// Librairie
import React from 'react';
import { Route } from 'react-router-dom';
import classes from './Contact.module.css';


function Contact(props){

    // fonction
    const siteClickedHandler= ()=>{
        props.history.push(props.match.url + '/site')
    }

    const gitClickedHandler = ()=>{
        props.history.replace(props.match.url + '/git')
    }

    const linkedinClickedHandler = ()=>{
        props.history.replace(props.match.url + '/linkedin')
    }

    return (
        <>
            <h1 className={classes.h1}>Contact</h1>
            <p>Vous pouvez vois le reste de mon travail à ces adresses</p>
            <button onClick={ siteClickedHandler } className={ classes.button }> Portfolio </button >
            <button onClick={ gitClickedHandler } className={ classes.button }> GitHub </button>
            <button onClick={ linkedinClickedHandler } className={ classes.button }> GitHub </button>

                  
            <Route path ={props.match.url + '/site'} render = {()=> 
                <div className={classes.contact}>
                    <a  href="https://fidweb-dev.fr">fidweb</a>
                </div>
            } />
            <Route path ={props.match.url + '/git' }render={()=> 
                <div className={classes.contact} >
                    <a  href="https://github.com/justine1410">GitHub</a>
                </div>
            } />

            <Route path ={props.match.url + '/linkedin'} render = {()=> 
                <div className={classes.contact}>
                    <a  href="https://www.linkedin.com/in/justinefidel/">Linkedin</a>
                </div>
            } />
        </>
    )
}

export default Contact

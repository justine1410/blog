// Librairie
import React from 'react';
import { Route } from 'react-router-dom';
import classes from './Contact.module.css';


function Contact(props){

    // fonction
    const emailClickedHandler= ()=>{
        props.history.push(props.match.url + '/email')
    }

    const callClickedHandler = ()=>{
        props.history.replace(props.match.url + '/telephone')
    }

    return (
        <>
            <h1 className={classes.h1}>Contact</h1>
            <p>Par quel moyen de contact souhaitez vous échanger ?</p>
            <button onClick={ emailClickedHandler } className={ classes.button }> Email </button >
            <button onClick={ callClickedHandler } className={ classes.button }> Téléphone </button>
                  
            <Route path ={props.match.url + '/email'} render = {()=> 
                <div className={classes.contact}>
                    <a  href="mailto:johndoe@google.com">johndoe@google.com"</a>
                </div>
            } />
            <Route path ={props.match.url + '/telephone' }render={()=> 
                <p className={classes.contact}> 06 06 06 06 06 </p>
            } />
        </>
    )
}

export default Contact

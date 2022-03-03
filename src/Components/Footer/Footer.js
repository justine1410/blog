// Librairie
import React from "react";
import classes from './Footer.module.css';

function Footer(){
    return(
       <footer className={classes.Footer} >
           <div className="container">
               2022 &#xA9; Blog
           </div>
       </footer>
    );
}

export default Footer
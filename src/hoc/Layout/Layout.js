// Librairie
import React from 'react';
import classes from './Layout.module.css';
import 'react-toastify/dist/ReactToastify.css';

// Composants
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer'; 
import { ToastContainer } from 'react-toastify';
 
function Layout(props){
    return(
        <div className={classes.Layout} >
            <Header user={props.user} />

            <div className={classes.content} >
                {props.children}
            </div>

            <ToastContainer 
                autoClose = "3000"
                position = "top-center"
                pauseOnHover = "false"
            />

            <Footer/>
            
        </div>
    ); 

}


export default Layout;
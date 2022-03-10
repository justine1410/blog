//Librairie
import React, { useState, useEffect }from 'react';
import { Link } from 'react-router-dom';
import routes from '../../config/routes';
import classes from'./Home.module.css';

import axios from '../../config/axios-firebase'

// Composant
import DisplayedArticles from '../../Components/displayedArticles/displayedArticles';

function Home(){

        // States
        const [articles, setArticles] = useState([])

        // ComponentDidMount
        useEffect(()=>{
            axios.get('/articles.json')
            .then(response=>{
                let articlesArray = [];

                for(let key in response.data){
                    articlesArray.push({
                        ...response.data[key],
                        id:key
                    })
                }

                // Chronologie
                articlesArray.reverse()

                // Trier
                articlesArray = articlesArray.filter(article => article.brouillon == "false");

                // Limite à 3
                articlesArray = articlesArray.slice(0, 3);

                setArticles(articlesArray)
            })
            .catch(error=>{
                console.log(error);
            })

    
        },[])

        
    useEffect(()=>{
        document.title = 'Accueil';

    })
    
    
    return (
        <>
            <h1>Accueil</h1>
            <p>
                Je vous présente un blog réalisé avec REACT et Firebase, <br/>
                <br/>
                Ce site est une version très simple d'un blog il devrait évoluer avec le temp
            </p>
            <DisplayedArticles articles={articles} />
            <div className= {classes.button}>
                <Link  to={routes.ARTICLES}>
                    Voir tous les articles &nbsp;
                </Link>
            </div>
            
        </>
    )

}

export default Home;
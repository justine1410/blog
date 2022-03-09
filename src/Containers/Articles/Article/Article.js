// Librairie
import React, {useState, useEffect} from "react";
import axios from '../../../config/axios-firebase';
import classes from './Article.module.css';
import routes from '../../../config/routes'
import { Link } from "react-router-dom";
import fire from '../../../config/firebase';

function Article(props){

    // State
    const [article, setArticle] = useState({})
    const [user, setUser] = useState('')
    

    // ComponentDitMount

    useEffect(()=>{
        axios.get('/articles.json?orderBy="slug"&equalTo="'+props.match.params.slug + '"')
        .then(response=>{
            console.log(response);
            if(Object.keys(response.data).length === 0){
               props.history.push(routes.HOME)
            }
            else{
                for (let key in response.data){
                    setArticle({
                        ...response.data[key],
                        id:key
                    });
                }
            }
           
        })
        .catch(error=>{
            console.log(error);
        })
    }, [])

    useEffect(()=>{
        authListener()
      },[])
    


    // Fonction
    function deleteClickedHandler(){
        fire.auth().currentUser.getIdToken()
            .then(token=>{
                axios.delete('/articles/'+article.id+ ".json?auth="+token )
                .then(res =>{
                    props.history.replace(routes.HOME);
                })
                .catch(error=>{
                    console.log(error);
                })
            })
            .catch(error=>{
                console.log(error);
            })
       
    }    


    function authListener(){
        fire.auth().onAuthStateChanged(user =>{
          if(user){
            setUser(user)
            console.log(user.email);
          }else{
            setUser('')
          }
        });
      };


    // Variable
    let date = new Date(article.date).toLocaleDateString('fr-FR');


    return(
        <div className="container">
            <h1>{article.titre} </h1>
            <div className={classes.content}>
                <div className={classes.lead} >
                    {article.accroche}
                </div>
                {article.contenu}
                <div className={classes.button} >
                    <Link to={{
                        pathname:   routes.MANAGE_ARTICLE,
                        state: { article: article}

                    }}>
                        {user.email == 'justine1410@live.fr' ? <button >Mofidier</button> : null}
                    </Link>

                    {user.email == 'justine1410@live.fr'? <button onClick={deleteClickedHandler} >Supprimer</button> : null}
                </div>
            </div>
        
            <div className={classes.author}>
                <b>{article.auteur} </b>
                <span>
                    Publié le : {date}
                </span>
            </div>

            
        </div>
    );
}

export default Article



// Librairie
import React from "react";
import classes from './displayedArticles.module.css'

// Composant
import DisplayedArticle from "./displayedArticle/displayedArticle";

function DisplayedArticles(props){

    let articles = props.articles.map(article =>(
        <DisplayedArticle 
            key={article.id}
            article = {article} 
        />
    ));

    
    return (
        <section className={[classes.displayedArticles, 'container'].join(' ')} >
            {articles}
        </section>
    );
}

export default DisplayedArticles
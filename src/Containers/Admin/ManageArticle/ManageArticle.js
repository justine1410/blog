// Librairie
import React, { useState, useEffect } from "react";
import classes from './ManageArticle.module.css'
import axios from '../../../config/axios-firebase';
import routes from '../../../config/routes';
import {checkValidity} from '../../../shared/utility';
import fire from '../../../config/firebase'

// Composant
import Input from '../../../Components/UI/Input/Input'

function ManageArticle(props){

    // State
    const [inputs, setInputs] = useState({
        titre:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder: "Titre de l'article"
            },
            value: props.location.state && props.location.state.article ? props.location.state.article.titre : '',
            label: 'titre',
            valid: props.location.state && props.location.state.article ? true : false,
            validation:{
                required: true,
                minLength: 5,
                maxLength: 85,
            },
            touched: false,
            errorMessage: 'Le titre doit avoir entre 5 et 85 caractères'

        },
        // files:{
        //     elementType:'input',
        //     elementConfig:{
        //         type:'file',
        //         placeholder: ""
        //     },
        //     value: '',
        //     label: 'photo',
        //     valid: props.location.state && props.location.state.article ? true : false,
        //     validation:{ },
        //     touched: false,
        //     errorMessage: ''

        // },
        accroche:{
            elementType:'textarea',
            elementConfig:{ },
            value: props.location.state && props.location.state ? props.location.state.article.accroche : '',
            label : "accroche de l'article",
            valid: props.location.state && props.location.state.article ? true : false,
            validation:{
                required: true,
                minLength:10,
                maxLength: 140
            },
            touched: false,
            errorMessage: "L'accroche ne doit pas être vide et doit être comprise entre 10 et 140 caractères."
        },
        contenu:{
            elementType:'textarea',
            elementConfig:{ },
            value: props.location.state && props.location.state.article ? props.location.state.article.contenu : '',
            label : "Contenu de l'article",
            valid: props.location.state && props.location.state.article ? true : false,
            validation:{
                required: true,
            },
            touched: false,
            errorMessage: 'Le contenu ne doit pas être vide.'

        },
        auteur:{
            elementType:'input',
            elementConfig:{
                type: 'text',
                placeholder: "Auteur de l'article"
            },
            value: props.location.state && props.location.state.article ? props.location.state.article.auteur : '',
            label: 'Auteur',
            valid: props.location.state && props.location.state.article ? true : false,
            validation:{
                required: true,
            },
            touched: false,
            errorMessage: 'Il doit y avoir un auteur pour cet article'

        },
        brouillon:{
            elementType:'select',
            elementConfig:{
                options:[
                    {value:true, displayValue : 'Brouillon'},
                    {value: false, displayValue: 'Publié'}
                ]
            },
            value: props.location.state && props.location.state.article ? props.location.state.article.brouillon : '',
            label:'Etat',
            valid: true,
            validation:{},
        },
       
    });

    const [valid, setValid] = useState(false);

    // Variables
    const formElementsArray = [];
    for (let key in inputs){
        formElementsArray.push({
            id: key,
            config: inputs[key]
        });
    }

    const [user, setUser] = useState('');

    useEffect(()=>{
        authListener()
      },[])

    function authListener(){
        fire.auth().onAuthStateChanged(user=>{
            if(user){
                setUser(user.uid) 
                console.log(user.uid);
              }else{
                setUser('')
              }
        })
    }

    // fonction

    function inputChangedHandler(event,id){

        // Change la valeur
        const nouveauxInputs ={...inputs};
        nouveauxInputs[id].value = event.target.value;
        nouveauxInputs[id].touched = true;
        
        // Vérification de la valeur
        nouveauxInputs[id].valid = checkValidity(event.target.value, nouveauxInputs[id].validation);
        setInputs(nouveauxInputs);

        // Verification du formulaire
        let formIsValid = true;
        for(let input in nouveauxInputs){
            formIsValid = nouveauxInputs[input].valid && formIsValid;
        }
        setValid(formIsValid);
    };

    function generateSlug (str){
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();
      
        // remove accents, swap ñ for n, etc
        var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
        var to   = "aaaaeeeeiiiioooouuuunc------";
        for (var i=0, l=from.length ; i<l ; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }
    
        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes
    
        return str;
    }
    function formHandler(event){
        event.preventDefault();

        const slug = generateSlug(inputs.titre.value)

        const article ={
        
           titre:inputs.titre.value,
        //    files:inputs.files,
           contenu : inputs.contenu.value,
           auteur : inputs.auteur.value,
           brouillon : inputs.brouillon.value,
           accroche : inputs.accroche.value,
           date: Date.now(),
           slug: slug,
           userId:user

       };

       fire.auth().currentUser.getIdToken()
       .then(token =>{
           if(props.location.state && props.location.state.article){
               axios.put('/articles/'+props.location.state.article.id +'.json?auth='+ token , article)
               .then(response=>{
                   props.history.replace(routes.ARTICLES + '/' + article.slug)
   
               })
               .catch(error =>{
                   console.log(error);
               })
          }
          else{
               axios.post('/articles.json?auth='+token , article)
               .then(response=>{
                   console.log(response);
                   props.history.replace(routes.ARTICLES)
       
               })
               .catch(error =>{
                   console.log(error);
               })
   
          }
       })
       .catch(error=>{
           console.log(error);
       })
       
    }

    let form =(
        <form className="Form" onSubmit={(e) => formHandler(e)}>
            {formElementsArray.map(formElement=>(
                <Input
                    key={formElement.id}
                    id={formElement.id}
                    value={formElement.config.value}
                    label={formElement.config.label}
                    type={formElement.config.elementType}
                    config={formElement.config.elementConfig}
                    valid={formElement.config.valid}
                    touched = {formElement.config.touched}
                    errorMessage={formElement.config.errorMessage}
                    changed={ (e) => inputChangedHandler(e,formElement.id)}
                    
                 />
                
            ))}
            
            <input className="submit" type="submit" value="Ajouter un article" disabled={!valid} />

        </form>
    );

    return(
        <div className="container">
            {props.location.state && props.location.state.article ?
                
                <h1>Modifier</h1>
                :
                <h1>Ajouter</h1>
            }
            {form}
           
        </div>
    )
}

export default ManageArticle;
// Libraire
import React,{useState, useEffect} from "react";
import {checkValidity} from '../../shared/utility';
import classes from './Authentification.module.css';
import fire from "../../config/firebase";

// Composant
import Input from '../../Components/UI/Input/Input';
import routes from '../../config/routes';


function Authentification(props){

    // State
    const [inputs, setInputs] = useState({
        email:{
            elementType:'input',
            elementConfig:{
                type:'email',
                placeholder: "Email"
            },
            value: '',
            label: 'Adresse email',
            valid: false,
            validation:{
                required: true,
                email: true
            },
            touched: false,
            errorMessage: "L'adresse email n'est pas valide"

        },
        password:{
            elementType:'input',
            elementConfig:{
                type:'password',
                placeholder: "Mot de passe"
            },
            value: '',
            label: 'Mot de passe',
            valid: false,
            validation:{
                required: true,
                minLength: 6
            },
            touched: false,
            errorMessage: "Le mot de passe doit être renseigner est contenir minimum 6 caractères"

        },

    })
    
    const [valid, setValid] = useState(false);

    const [emailError, setEmailError] = useState(false);
    const [loginError, setLoginError] = useState(false);
    // function


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

    function registerClickedHandler(){
        const user ={
                email : inputs.email.value,
                password : inputs.password.value,
        };

        fire
            .auth()
            .createUserWithEmailAndPassword(user.email, user.password )
            .then(response =>{
                props.history.replace(routes.HOME)
            })
            .catch(error=>{
                // Adresse email en doublon
                switch(error.code){
                    case 'auth/email-already-in-use':
                        setEmailError(true);
                        break;
                }
                console.log(error);
            });
    };

    function loginClickedHandler(){
        const user ={
                email : inputs.email.value,
                password : inputs.password.value,
        };

        fire
            .auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then(response=>{
                console.log(response);
                props.history.replace(routes.HOME)
            })
            .catch(error=>{
                switch(error.code){
                    case "auth/invalide-email" :
                    case"auth/user-disabled":
                    case "auth/user-not-found":
                        setLoginError(true);
                        break;
                }
                console.log(error);
            })

    };

    function formHandler(e){
        e.preventDefault()
    };

    // Variables
    const formElementsArray = [];
    for (let key in inputs){
        formElementsArray.push({
            id: key,
            config: inputs[key]
        });
    }

    let form =(
    <>
        <form onSubmit={(e)=>formHandler(e)} >
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
            
            <div>
                <button onClick={loginClickedHandler} className="submit" disabled={!valid} >Connexion</button>
                <button onClick={registerClickedHandler} className= "submit" disabled={!valid} >Insciption</button>
            </div>
        </form>

    </>
    );

    

    return(
        <div className={classes.formulaire}>
            <h1>Connexion</h1>
            <div className="Form">
                {loginError ? 
                    <div className={classes.alert} >
                        <p>
                            Impossible de vous authentifier.</p> 
                    </div>: null
                }
                {emailError? 
                    <div className={classes.alert} >
                        <p>Cette adresse email est déjà utilisée.</p> 
                    </div>: null
                }
                {form}
            </div>
            {/* <div className={classes.connexion} >
                <h3>Compte admin</h3>
                <p>Mail : johnDoe@google.com</p>
                <p>Mdp : azerty</p>
            </div>
 */}
        </div>
    )
}

export default Authentification
import styles from '../../styles/user.module.css';
import React from 'react';
import LinkButton from '../../components/UI/Button/LinkButton/linkButton';
import Cookies from 'cookies'
class User extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user:this.props.user
        }
    }
    render(){

        return (
        <div className={styles.container}>

            <div className={styles.body}>
              
            <div className={styles.form}>
                <h2 className={styles.naslov}>Moj profil</h2>
                <p className="podaci">{this.state.user.ime}</p>
                <p className="podaci">{this.state.user.adresa}</p>
                <p className="podaci">{this.state.user.postanski_broj} {this.state.user.grad}</p>
                <p className="podaci">Serbia</p>
                <p className="podaci">{this.state.user.email}</p>
                <p className="podaci">{this.state.user.telefon}</p>
                <div className={styles.blok}>
                    <LinkButton link="/logout" styles={styles.logout}>Odjavi se</LinkButton>
                    <LinkButton link="/user/edit" styles={styles.edit}>Uredi profil</LinkButton>
                </div>
            </div>
            
            </div>

        </div>
        )
    }
}
export async function getServerSideProps({req,res}){
        var user = ""
        var email = ""
        var cookies = new Cookies(req,res)
        var authToken = cookies.get('auth-token')
        if(authToken == undefined){
            res.writeHead(307,{Location:'/'})
             res.end();
        }
        await fetch('http://localhost:3000/api/checkauth',
            {headers:{'auth-token':authToken}}).then(res => res.json())
        .then(data => {
           email = data.email
        })

        await fetch('http://localhost:3000/api/getuser',{
                method:'POST',
                body:JSON.stringify({email:email})
            }).then(res => res.json()).then(data => {
                user = data.user
            })
        
        return{
           props:{
            user:user
           }
        }
}
export default User;
import React from 'react';
import styles from './korisnici.module.css';
import Korisnik from './Korisnik/index';

const korisnici = ({users,deletefunc}) => {
    return(
        <div className={styles.korisnici}>
        
            {users.map(user =>
             <Korisnik key={user.id} deletefunc={deletefunc} id={user.id} ime={user.ime+` `+user.prezime} adresa={user.adresa} datum={user.created} rabat={user.rabat}/>)}
            
        </div>
        
    );
}

export default korisnici;
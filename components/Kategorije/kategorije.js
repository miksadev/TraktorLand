import React from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Kategorija from './kategorija/kategorija';
import styles from './kategorije.module.css';
import Link from 'next/link';


const kategorije = ({cat}) => {
    return(
        <Aux>
            {/* <h3 className={styles.naslov}>KATEGORIJE</h3> */}
            <div className={styles.kategorije}>
               {cat.map(item => <Kategorija top2="19" top="20" src={"kategorije/"+item.name.toLowerCase()+".png"} 
                    link={"/webshop/"+item.name.toLowerCase()}>{item.name}</Kategorija>)}
            </div>
            
        </Aux>
    );
}

export default kategorije;
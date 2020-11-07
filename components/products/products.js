import React from 'react';
import Product from './product/product';
import styles from './products.module.css';
import Item from '../Item/item';
const products = ({data,mdata,backroute,search,user}) => {
    
    
    return(
        <div className={styles.products}>
        	{mdata.length == 0 || mdata == "empty" ? "" : <Item backroute={backroute} proizvod={mdata}/>}
            {data.map((prod) => <Product user={user} search={search} tip={prod["tip"]} backroute={backroute} key={prod["id"]} id={prod["id"]} name={prod["ime"]} price={prod["mp_cena"]} src={prod["thumb"]} sifra={prod["sifra"]} kolicina={prod["kolicina"]}
            	rabat_1 = {prod["rabat_1"]} rabat_2 = {prod["rabat_2"]} rabat_3 = {prod["rabat_3"]}
             />)}
            
        </div>
    );
}

export default products;
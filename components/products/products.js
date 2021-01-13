import React from 'react';
import Product from './product/product';
import styles from './products.module.css';
import Item from '../Item/item';
const products = ({data,mdata,backroute,search,user,type}) => {

    
    return(
        <div className={styles.products}>
        	{mdata.length == 0 || mdata == "empty" ? "" : <Item user={user} backroute={backroute} proizvod={mdata}/>}
            {data.map((prod) => <Product user={user} search={search} tip={type != undefined ? type:prod['kategorija'].toLowerCase()} backroute={backroute} key={prod["productid"]} id={prod["productid"]} name={prod["name"]} price={prod["price"]} src={prod["thumb"]} sifra={prod["code"]} kolicina={prod["qty"]}
            	rabat_1 = {prod["rabat_1"]} rabat_2 = {prod["rabat_2"]} rabat_3 = {prod["rabat_3"]}
             />)}
            
        </div>
    );
}

export default products;
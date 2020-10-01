import React from 'react';
import Product from './product/product';
import styles from './products.module.css';
import Item from '../Item/item';
const products = ({data,mdata,backroute}) => {
    
    return(
        <div className={styles.products}>
        	{mdata.length == 0 || mdata == "empty" ? "" : <Item proizvod={mdata}/>}
            {data.map((prod) => <Product backroute={backroute} key={prod["id"]} id={prod["id"]} name={prod["ime"]} price={prod["mp_cena"]} src={prod["thumb"]} />)}
            
        </div>
    );
}

export default products;
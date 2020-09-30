import React from 'react';
import Product from './product/product';
import styles from './products.module.css';
import Item from '../Item/item';

const products = () => {
    return(
        <div className={styles.products}>
            <Item/>
            <Product id="1" name="Sunce rotirajuci sakupljac - komplet" price="70800" src="/product.png" />
            <Product id="2" name="Sunce sakupljac Sunce " price="8480" src="/product.png" />
            <Product id="3" name="- komplet" price="70800" src="/product.png" />
            <Product id="4" name="Sunce rotirajuci sakupljac - komplet" price="70800" src="/product.png" />
            <Product id="5" name="Sunce rotirajuci sakupljac - komplet" price="70800" src="/product.png" />
            <Product id="6" name="Sunce rotirajuci sakupljac - komplet" price="70800" src="/product.png" />
        </div>
    );
}

export default products;
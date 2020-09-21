import React from 'react';
import Product from './product/product';
import styles from './products.module.css';

const products = () => {
    return(
        <div className={styles.products}>
            <Product name="Sunce rotirajuci sakupljac - komplet" price="70.800" src="/product.png" />
            <Product name="Sunce rotirajuci sakupljac Sunce " price="8.480" src="/product.png" />
            <Product name="Sunce rotirajuci sakupljac - komplet" price="70.800" src="/product.png" />
            <Product name="Sunce rotirajuci sakupljac - komplet" price="70.800" src="/product.png" />
            <Product name="Sunce rotirajuci sakupljac - komplet" price="70.800" src="/product.png" />
            <Product name="Sunce rotirajuci sakupljac - komplet" price="70.800" src="/product.png" />
        </div>
    );
}

export default products;
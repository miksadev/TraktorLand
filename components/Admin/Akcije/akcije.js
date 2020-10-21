import React from 'react';
import styles from './akcije.module.css';
import Akcija from './Akcija/akcija';

const akcije = () => {
    return(
        <div className={styles.akcije}>
            <Akcija img="/product.png" ime="Sunce rotirajuci sakupljac" sifra="123456"/>
            <Akcija img="/product.png" ime="Sunce rotirajuci sakupljac" sifra="123456"/>
            <Akcija img="/product.png" ime="Sunce rotirajuci sakupljac" sifra="123456"/>
            <Akcija img="/product.png" ime="Sunce rotirajuci sakupljac" sifra="123456"/>
            <Akcija img="/product.png" ime="Sunce rotirajuci sakupljac" sifra="123456"/>
            <Akcija img="/product.png" ime="Sunce rotirajuci sakupljac" sifra="123456"/>
            <Akcija img="/product.png" ime="Sunce rotirajuci sakupljac" sifra="123456"/>
        </div>
    )
}

export default akcije;
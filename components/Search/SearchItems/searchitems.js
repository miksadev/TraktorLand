import React from 'react';
import styles from './searchitems.module.css';
import SearchItem from './SearchItem/searchItem';

const searchItems = (props) => {
    return(
        <div className={styles.search}>
            <SearchItem img="/product.png" ime="Sunce rotirajuci sakupljac" cena="3000"/>
            <SearchItem img="/product.png" ime="Sunce rotirajuci sakupljac" cena="3000"/>
            <SearchItem img="/product.png" ime="Sunce rotirajuci sakupljac" cena="3000"/>
            <SearchItem img="/product.png" ime="Sunce rotirajuci sakupljac" cena="3000"/>
            <SearchItem img="/product.png" ime="Sunce rotirajuci sakupljac" cena="3000"/>
            <SearchItem img="/product.png" ime="Sunce rotirajuci sakupljac" cena="3000"/>
            <SearchItem img="/product.png" ime="Sunce rotirajuci sakupljac" cena="3000"/>
            <SearchItem img="/product.png" ime="Sunce rotirajuci sakupljac" cena="3000"/>
        </div>
    );
}

export default searchItems;

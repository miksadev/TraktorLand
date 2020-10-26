import React from 'react';
import styles from './search.module.css';
import SearchItems from './SearchItems/searchitems.js';

const search = (props) => {
    return(
        <div className={styles.search}>
            <div className={styles.more}>
                Klikni da pogledas jos 53 proizvoda!
            </div>
            <SearchItems/>
        </div>
    );
}

export default search;

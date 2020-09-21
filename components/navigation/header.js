import React from 'react';
import Logo from '../UI/logo';
import styles from '../../styles/Header.module.css';
import Search from '../navigation/navitems/search/search';
import Navitems from '../navigation/navitems/navitems';

const header = () => {

    return (
        <header className={styles.header}>
            <Logo/>
            <Search/>
            <Navitems/>
        </header>
    );
}


export default header;
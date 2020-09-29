import React from 'react';
import Logo from '../UI/Logo/logo';
import styles from '../../styles/Header.module.css';
import Search from '../UI/Search/search';
import Navitems from './navitems/navitems';
import Dropdown from '../UI/DropDown/dropdown';
import CartIcon from '../UI/CartIcon/carticon';
import UserIcon from '../UI/UserIcon/usericon';

const header = () => {

    return (
        <header className={styles.header}>
            <Logo/>
            <Search/>
            <Navitems/>
            {/* <Dropdown/> */}
            <CartIcon/>
            <UserIcon/>
        </header>
    );
}


export default header;
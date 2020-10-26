import React from 'react';
import Logo from '../UI/Logo/logo';
import styles from '../../styles/Header.module.css';
import Search from '../UI/Search/search';
import Navitems from './navitems/navitems';
import Dropdown from '../UI/DropDown/dropdown';
import CartIcon from '../UI/CartIcon/carticon';
import UserIcon from '../UI/UserIcon/usericon';
import Menu from '../UI/HamburgerMenu/hamburger';

const header = () => {

    return (
        <header className={styles.header}>
            <div className={styles.headerbig}>
                <Logo/>
                <Search/>
                <Navitems/>
                {/* <Dropdown/> */}
                <UserIcon/>
                <CartIcon/>
            </div>
            <div className={styles.responsive}>
                <Logo styles={styles.logos}/>
                <Menu/>
                <div className={styles.nema}>
                    
                </div>
                <CartIcon/>
            </div>
            
        </header>
    );
}


export default header;
import React, {useState} from 'react';
import Logo from '../UI/Logo/logo';
import styles from '../../styles/Header.module.css';
import Search from '../UI/Search/search';
import Navitems from './navitems/navitems';
import Dropdown from '../UI/DropDown/dropdown';
import CartIcon from '../UI/CartIcon/carticon';
import UserIcon from '../UI/UserIcon/usericon';
import Menu from '../UI/HamburgerMenu/hamburger';
import Link from 'next/link';
import DropHeader from './dropHeader/dropHeader';

const header = () => {
    const [search , setSearch] = useState(false);
    const [open, setOpen] = useState(false);

    const onClickHandler = () => {
        setOpen(!open);
    }
    const searchHeandler = () => {
        setSearch(!search);
    }

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
                {search ? null : <Logo styles={styles.logos}/>}
                <Menu open={open} onclickhandler={onClickHandler}/>
                { search ? <Search styles={styles.responsivesearch} input={styles.responsiveinput}/> : null}
                <img onClick={searchHeandler} className={styles.searchicon} src={search ? "/header/x.png" : "/header/search.png"} alt=""/>
                <CartIcon/>
                { open ? <DropHeader/> : null }
            </div>
            
        </header>
    );
}


export default header;
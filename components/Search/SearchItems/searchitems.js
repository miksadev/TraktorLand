import React from 'react';
import styles from './searchitems.module.css';
import SearchItem from './SearchItem/searchItem';
import Link from 'next/link';
const searchItems = ({data}) => {
	
    return(
        <div className={styles.search}>
            {data.map(item => 
               <Link  key={item.id} href={`/webshop/${item.tip}/${item.id}`}><a> <SearchItem  img={item.thumb} ime={item.ime} cena={item.mp_cena}/> </a></Link>
                )}
         
        </div>
    );
}

export default searchItems;

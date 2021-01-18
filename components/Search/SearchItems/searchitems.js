import {useEffect} from 'react';
import styles from './searchitems.module.css';
import SearchItem from './SearchItem/searchItem';
import Link from 'next/link';
const searchItems = ({data}) => {
	
    return(
        <div className={styles.search}>
            {data.map(item => 
               <Link  key={item.productid} href={`/webshop/${item.kategorija.toLowerCase()}/${item.productid}`}><a> <SearchItem  img={item.thumb} ime={item.name} cena={item.price}/> </a></Link>
                )}
         
        </div>
    );
}

export default searchItems;

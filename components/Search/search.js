import styles from './search.module.css';
import SearchItems from './SearchItems/searchitems.js';
import Link from 'next/link';
const search = ({data,search}) => {
    return(
    	<>
        {data.length != 0  ? <div className={styles.search}>
            {data.length > 10 ? <div className={styles.more}>
                <Link href={`/search/${search}`}><a>Klikni da pogledas jos {data.length-10} proizvoda!</a></Link>
            </div> : null}
            <SearchItems data={data}/>
        </div> : null}
        </>
    );
}

export default search;

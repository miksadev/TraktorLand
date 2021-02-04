import Aux from '../../hoc/Auxiliary/Auxiliary';
import Kategorija from './kategorija/kategorija';
import styles from './kategorije.module.css';
import Link from 'next/link';


const kategorije = () => {
    return(
        <Aux>
            {/* <h3 className={styles.naslov}>KATEGORIJE</h3> */}
            <div className={styles.kategorije}>
                <Kategorija top2="19" top="20" src="kategorije/traktori.svg" link="/webshop/traktori">Traktori</Kategorija>
                <Kategorija top2="22.48" top="24" src="kategorije/beraci.svg" link="/webshop/beraci" >Berači</Kategorija>
                <Kategorija top2="22" top="21" src="kategorije/kombajni.svg" link="/webshop/kombajni">Kombajni</Kategorija>
                <Kategorija top2="22.72" top="25.72" src="kategorije/freze.svg" link="/webshop/freze">Freze</Kategorija>
                <Kategorija top2="8" top="8" sir="300" src="kategorije/poljmasine.svg" link="/webshop/delovi">Delovi Za <br></br>Poljoprivredne Mašine</Kategorija>
                <Kategorija top2="14" top="14" sir="300" src="kategorije/poljmeh.svg" link="/webshop/mehanizacija">Poljoprivredna Mehanizacija</Kategorija>
                <Kategorija top2="42" top="44" src="kategorije/ostalo.svg" link="/webshop/ostalo">Ostalo</Kategorija>
            </div>
            
        </Aux>
    );
}

export default kategorije;
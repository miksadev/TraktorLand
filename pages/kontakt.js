import styles from '../styles/kontakt.module.css'
import ConInfo from '../components/UI/contactinfo/contactinfo';
import GoogleMaps from '../components/UI/GoogleMap/googleMap';
import ConBlockInfo from '../components/UI/contactinfo/ConBlockInfo';

export default function Kontakt() {
  return (
    <div className={styles.container}>

        <div className={styles.body}>
          <h1 className={styles.naslov}>KONTAKT</h1>
          <div className={styles.ConInfo}>
            <ConInfo/>
          </div>
          <p className={styles.opis}>
          Dobrodosli na nasu kontakt stranicu. Mozete nas kontaktirati na navedin telefon ili mail, a mozete nas pronaci i na adresi Knez Mihajlova, br.56 u Beogradu
          </p>
          
          <div className={styles.maps}>
            {/* <GoogleMaps/> */}
            <img className={styles.mapaimg} src="maps.png" alt=""/>
          </div>
          <ConBlockInfo/>

          <div className={styles.onama}>
            <h3>O NAMA</h3>
            <p>
            Tr Marjanović je firma osnovana 1994. godine što čini više od 25 godina iskustva u prodaji delova za traktore, kombajne, berače, freze, poljomehanizaciju...<br></br>
            Razvoj, kao i svaki drugi bio je težak ali ne i nedostižan, te smo danas u skladu sa vremenom i modernizacijom za vas tu i na ovoj adresi. Pored svih proizvoda koje možete videti u našem maloprodajnom objektu, dajemo mogućnost poručivanja i ovim putem.
            <br></br>
            <br></br>
            Ono što našem poslovanju daje pečat jeste:<br></br>
            - adekvatan odnos cene i kvaliteta. <br></br>
            - stručna pomoć pri kupovini delova i mehanizacije.<br></br>
            -Dostupnost potrebnih delova i dostava istih u najkraćem roku.<br></br>
            <br></br>
            Zahvaljujuci svemu navedenom, 2012. godine postali smo generalni zastupnici firme "Termometal" iz Ade, sto smo i dan danas, te i ova informacija govori o profesionalnosti i ozbiljnosti nase firme.
            </p>
          </div>


          
          
        </div>
       

    </div>
  )
}

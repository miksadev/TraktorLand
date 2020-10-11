import styles from '../../../styles/login.module.css';
import Form from '../../../components/Form/form';
import Input from '../../../components/UI/Input/input';
import Submit from '../../../components/UI/Button/Submit/submit';

export default function Kontakt() {
  return (
    <div className={styles.container}>
        <div className={styles.body}>
            <Form formname="Detalji Narudzbine">
                <Input   inputtype="input" requiered label="Ime" placeholder="npr. Petar" name="ime" type="text"></Input>
                <Input   inputtype="input" requiered label="Prezime" placeholder="npr. Petrovic" name="prezime" type="text"></Input>
                <Input  inputtype="input" requiered label="Telefon" placeholder="npr. 060/123/45-67" name="telefon" type="text"></Input>
                <Input   inputtype="input" requiered label="E-mail" placeholder="npr. vasaadresa@gmail.com" name="email" type="email"></Input>
                <div className={styles.line}></div>
                <Input   inputtype="input" requiered label="Adresa" placeholder="npr. Cara Dusana 26" name="adresa" type="text"></Input>
                <Input  inputtype="input" requiered label="Grad" placeholder="npr. Beograd" name="grad" type="text"></Input>
                <Input  inputtype="input" requiered label="Postanski br." placeholder="npr. 11000" name="postanskibroj" type="text"></Input>
                {/* <div className={styles.line}></div> */}
                <div className={styles.block}><Submit styles={styles.loginbutton}>Zavrsi narudzbinu</Submit></div>
            </Form>
        </div>
    </div>
  );
}

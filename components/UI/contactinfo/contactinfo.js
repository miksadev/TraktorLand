import Aux from '../../../hoc/Auxiliary/Auxiliary';
import styles from './contactinfo.module.css';

const coninfo = () => {
    return (
        <Aux>
            <div className={styles.coninfo}>
                <img className={styles.phoneimg} src="call.png" alt=""/>
                <img className={styles.mailimg} src="mail.png" alt=""/>
                <div className={styles.line}></div>
                <h3 className={styles.phone}>381/61 214 21 13</h3>
                <h3 className={styles.mail}>info@traktorland.rs</h3>
            </div>
        </Aux>

    );
}

export default coninfo;
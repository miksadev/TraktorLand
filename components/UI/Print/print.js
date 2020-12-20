import React from 'react';
import styles from './print.module.css';
import Logo from '../Logo/logo';
const print = (props) => {
    let i=0;
    let cena=0;
    let poros=0;
    let pdv=0;
    let cenara=0;
    
    return(
        <div className={styles.print}>
        <Logo/>
        <h2>Podaci porucioca: </h2>
        <h3>{props.data.ime_prezime}</h3>
        <h3>{props.data.adresa + " " + props.data.grad + " "+ props.data.postanski_broj}</h3>
        <h3>{"Telefon: " +props.data.telefon}</h3>
        <h3>{"E-mail: " +props.data.email}</h3>
        <h3>{"Datum i vreme porudzbine : " + props.data.created +" "+ props.data.time}</h3>
            <table>
                <tr>
                    <th>R.B.</th>
                    <th>sifra</th>
                    <th>Ime</th>
                    <th>Kolicina</th>
                    <th>Cena po komadu</th>
                    <th>Rabat</th>
                    <th>Stopa PDV</th>
                    <th>Poreska osnovica</th>
                    
                    <th>Iznos PDV</th>
                    <th>Cena</th>
                    <th>Cena sa Rabatom</th>
                </tr>
                {
                    
                props.orders.map(order => {
                    poros+=order.vp_cena*order.qty; 
                    pdv+=0.2*order.vp_cena*order.qty;
                    cena+=order.qty*order.mp_cena;
                    cenara+=order.mp_cena*order.qty * (1 - props.data.rabat/100);
                    return(
                        <tr>
                            <td>{i++}</td>
                            <td>{order.sifra}</td>
                            <td style={{maxWidth: "200px"}}>{order.ime}</td>
                            <td>{order.qty}</td>
                            <td>{Number(order.vp_cena).toFixed(2)}</td>
                            <td>{props.data.rabat}</td>
                            <td>20%</td>
                            <td>{Number(order.vp_cena*order.qty).toFixed(2)}</td>
                            <td>{Number(0.2*order.vp_cena*order.qty).toFixed(2)}</td>
                            <td>{Number(order.qty*order.mp_cena).toFixed(2)}</td>
                            <td>{Number(order.mp_cena*order.qty * (1 - props.data.rabat/100)).toFixed(2)}</td>
                        </tr>
                    );
                }                    
                )}
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>Ukupno:</td>
                    <td>{Number(poros).toFixed(2)}</td>
                    <td>{Number(pdv).toFixed(2)}</td>
                    <td>{Number(cena).toFixed(2)}</td>
                    <td>{Number(cenara).toFixed(2)}</td>
                </tr>
            </table>
            </div>
    );
}

export default print;
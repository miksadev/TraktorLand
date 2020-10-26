import React from 'react';
import styles from './Search.module.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Search from '../../Search/search';

const search = (props) => {
    let style = [styles.Search];
    
    let inputstyle = [styles.input];
    {props.input ?  inputstyle.push(props.input) : null}
    {props.styles ?  style.push(props.styles) : null}
    return (
        <Aux>
            <div className={style.join(' ')}>
                <div className={styles.lupica}>
                    <img src="/search.png" alt=""/>
                </div>
                <input className={inputstyle.join(' ')} type="text" placeholder="Pretrazite..."/>
                <Search styles={props.input}/>
            </div>
            
        </Aux> 
    )
}

export default search;
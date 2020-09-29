import React from 'react';
import Input from '../../components/UI/Input/input';
import styles from '../../styles/login.module.css';

const login = () => {
    return (
        <div className={styles.login}>
            <Input inputtype="input"></Input>
        </div>
        
    );
}

export default login;
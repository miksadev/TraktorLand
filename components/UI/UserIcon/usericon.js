import React from 'react';
import styles from './usericon.module.css';
import Link from 'next/link';

const usericon = () => {
    return(
        <Link href="/login"><img className={styles.usericon} src="/header/user.png" alt=""/></Link>
    );
}

export default usericon;
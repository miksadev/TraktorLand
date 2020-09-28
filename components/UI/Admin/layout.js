import React from 'react';
import styles from './layout.module.css';
import Logo from '../logo';
import Link from 'next/link';
const layout = () => {
    return (
        <div className={styles.adminLayout}>
            <Logo/>
            <Link href="/admin/orderi"><div className={styles.linkovi}>Orderi</div></Link>
            <Link href="/admin/proizvodi"><div className={styles.linkovi}>Proizvodi</div></Link>
            <Link href="/admin/korisnici"><div className={styles.linkovi}>Korisnici</div></Link>
        </div>
    );
}

export default layout;
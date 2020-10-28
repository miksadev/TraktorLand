import React, {useState} from 'react';
import Head from 'next/head';
import Layout from '../../components/UI/Admin/layout';


const adminLayout = (props) => {
    const [open , setOpen] = useState(true);

    return (
        <>
            <Head>
            <title>TraktorLand</title>
            <link rel="icon" href="/favicon.ico" />
            <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet"></link>
            <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap" rel="stylesheet"></link>
            </Head>
            {open ? <Layout/> : null}
            {props.children}
        </>
    );
}

export default adminLayout;
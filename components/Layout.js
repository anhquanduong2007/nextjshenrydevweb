import React from 'react';
import NavBarMenu from './NavBarMenu';
import Head from "next/head";
// thằng head của nextjs này nó chính là cái phần head như ở trong file html thôi
const Layout = ({ children }) => {
    return (
        <div>
            <Head>
                <title>Document</title>
            </Head>

            <header>
                <NavBarMenu />
            </header>

            <main style={{ padding: ".5rem 20px" }}>{children}</main>
        </div>
    );
};

export default Layout;
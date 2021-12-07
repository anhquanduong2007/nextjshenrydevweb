import Link from 'next/link';
import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';

const NavBarMenu = () => {
    return (
        <Navbar bg="dark" variant="dark" style={{ padding: ".5rem 20px" }}>
            <Navbar.Brand>My Next App</Navbar.Brand>
            <Nav>
                <Link href="/" passHref>
                    <Nav.Link>Home</Nav.Link>
                </Link>
                <Link href="/posts" passHref>
                    {/* theo như trang chủ có nói: If you're using a custom component that wraps an <a> tag, 
                make sure to add passHref thì ở đây nếu cái Link của mình mà bọc 1 thẻ a nào đó thì hãy đảm bảo
                có thuộc tính passHref do chúng ta đang duplicate nên không chạy được */}
                    <Nav.Link>Posts</Nav.Link>
                </Link>
                <Link href="/about" passHref>
                    <Nav.Link >About</Nav.Link>
                </Link>
                <Link href="/jokes/random" passHref>
                    <Nav.Link >Jokes</Nav.Link>
                </Link>
                <Link href="/books" passHref>
                    <Nav.Link >Books</Nav.Link>
                </Link>
            </Nav>
        </Navbar>
    );
};

export default NavBarMenu;
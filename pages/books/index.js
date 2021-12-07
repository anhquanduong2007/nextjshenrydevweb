import Link from 'next/link';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Layout from '../../components/Layout';
import { getBooks } from "../../lib/book";
const Books = ({ books }) => {
    return (
        <Layout>
            {books.map((book) => (
                <Card key={book.bookName} className="my-3 shadow">
                    <Card.Body>
                        <Card.Title>{book.bookName}</Card.Title>
                        <Card.Text>{book.bookContent}</Card.Text>
                        <Link href="/" passHref>
                            <Button variant="dark">Back</Button>
                        </Link>
                    </Card.Body>
                </Card>
            ))}
        </Layout>
    );
};
export const getStaticProps = async () => {
    const books = await getBooks();
    console.log(books);
    return {
        props: { books }
    }
}
export default Books;

import Link from 'next/link';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Layout from '../../components/Layout';
import { getRandomJoke } from "../../lib/joke";
const Random = ({ joke }) => {
    return (
        <Layout>
            <Card>
                <Card.Body>
                    <Card.Title>Here`s your random joke for today</Card.Title>
                    <Card.Text>{joke.value}</Card.Text>
                    <Link href="/posts" passHref>
                        <Button variant="dark">Back</Button>
                    </Link>
                </Card.Body>
            </Card>
        </Layout>
    );
};
export const getServerSideProps = async () => {
    /**
     * Dữ liệu phụ thuộc vào mỗi request, nhưng mà vẫn tạo ra HTML tĩnh cho fron-end, nên vẫn tốt cho SEO 
     */
    const joke = await getRandomJoke();
    if (!joke) {
        // return {
        //     notFound: true -> 404 page
        // }
        return {
            redirect: {
                destination: '/posts', // joke đang sập muốn người dùng về posts
                parmanet: false
            }
        }
    }
    return {
        props: { joke }
    }
}
export default Random;
/**
 * Thế thì bây giờ đã đến lúc chúng ta đặt ra câu hỏi là, ơ kia là những dữ liệu tĩnh thế thi đến lúc chúng ta
 * gặp dữ liệu động thì sẽ như thế nào tức là bây giờ dữ liệu thật sự là nó phụ thuộc vào mỗi một cái request từ
 * phía người dùng và nó không thể nào lấy được dữ liệu tĩnh nếu như mà không biết cái thông tin của cái request
 * đến từ phía người dùng nó có thể là cookie , session, token hay bất kể cái gì đấy. Thế thì làm thế nảo để
 * chúng ta làm cái trò này. Chúng ta vừa làm kiểu thứ 1 là lấy kiểu dữ liệu kiểu tĩnh, còn lấy kiểu dữ liệu động
 * thì nó gọi là server-side-rendering thì cái này nó sẽ phải tạo ra 1 cái html khác nhau cho mỗi một lần mà người
 * dùng người ta request vào, mỗi một cái request khác nhau nó sẽ phải lật đật chạy đi lấy dữ liệu dựa theo cái người
 * dùng phụ thuộc vào cái request của người dùng đấy, xong sau đó nó lại lật đật chạy đi nó render sang html sau đó
 * nó trả lại cho phía front-end của chúng ta. Để mô phỏng cho cái này chúng ta sẽ sử dụng "https://api.chucknorris.io/jokes/random"
 * với cái api này mỗi khi call thì chúng ta sẽ có 1 id và 1 value khác nhau. Thế thì chúng ta tạm thời coi như chỗ này
 * đây là những request đến từ phía người dùng mà nó khác nhau mỗi lần để chúng ta mô phỏng được cái này, tuy nhiên
 * trong thực tế chúng ta có thể có rất nhiều những thông tin từ phía người dùng ví dụ người dùng đã đăng nhập rồi và
 * mỗi một người dùng có 1 cookie khác nhau, có một lựa chọn khác nhau chẳng hạn, tại vì cái này chúng ta k có
 * đăng nhập, đăng xuất nên chúng ta lấy cái này, coi như mỗi một lần người dùng request vào cái app của chúng ta,
 * chúng ta sẽ đưa ra 1 cái joke khác nhau, coi như nó phụ thuộc vào request người dùng đi mặc dù thực chất là
 * 100% là nó không phụ thuộc rồi.
 */
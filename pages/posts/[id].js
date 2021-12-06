import Link from 'next/link';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Layout from '../../components/Layout';
import { getPostIds, getPostsById } from "../../lib/post";
const Post = ({ post }) => {
    return (
        <Layout>
            <Card className="my-3 shadow">
                <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.body}</Card.Text>
                    <Link href="/posts" passHref>
                        {/* Như ở đây chúng ta nói là 1 thẻ Link bao trong thẻ a nào đó thì mới cần passHref nhưng nếu
                    ở đây mà muốn custom thẻ Link này bên trong là các thẻ khác thì vẫn cần passHref mặc dù không
                    có vẫn dùng được nhưng nó sẽ cảnh báo là cần nên cứ cho vào cho chắc */}
                        <Button variant="dark">Back</Button>
                    </Link>
                </Card.Body>
            </Card>
        </Layout>
    );
};
// Lấy dữ liệu tĩnh, nhưng lấy dữ liệu tĩnh nào thì còn phụ thuộc vào path params
export const getStaticPaths = async () => {
    const paths = await getPostIds();
    return {
        paths,
        fallback: false, // bất kỳ path nào không return bởi getStaticPaths sẽ tới trang 404
    }
}
export const getStaticProps = async ({ params }) => {
    const post = await getPostsById(params.id);
    return {
        props: {
            post
        }
    }
}
export default Post;
/**
 * Ở trong cái này chúng ta sẽ quay lại với câu hỏi là những cái này nó có phụ thuộc vào cái request người dùng
 * không? tức là bạn a và bạn b cùng vào trong posts/1 thì bạn a có nhìn thấy posts/1 có khác với posts/1 bạn b thấy
 * hay không, câu trả lời là không! già trẻ lớn bé ai vào trong posts/1 này đều thấy cái post sô 1 này hết thế
 * nên ở đây chúng ta cần 1 cơ chế nào đấy để chúng ta có thể khai báo với cả next rằng là trong cái posts của
 * chúng ta là đang có 5 cái post thế bây giờ lúc nãy chúng ta thấy là khi mà chúng muốn chạy npm run build thì next
 * nó đã tự động lấy 5 cái post về và nó biến thành hack code hết ở trong html thì bây giờ chúng ta cũng cần phải
 * khai báo điều tương tự đó là, người dùng có thể sẽ ấn vào vào see more, khi người dùng ấn vào see more ở post nào
 * ví dụ như ở post 1 thì nó sẽ ra posts/1, ấn post 2 thì nó ra posts/2 bây giờ ta muốn khi route của nó là posts/1
 * thì hãy hiện thị post số 1 cho t, tương tự với post 2  nhưng mà không được phép lấy ra hiện thi khi mà người dùng
 * người ta request, tại vì cái này người dùng nào cũng nhìn thấy giống nhau tốt nhất là mày hãy lấy trước đó coi như thực
 * ra chính là bảo rằng là ở trong cái trong posts của t có 5 post m hãy đi lấy dữ liệu của từng post 1 về đây hack
 * code thành html trước để phục vụ cho cái công việc khi người dùng vào post nào thì nó chỉ việc hiển thị qua thôi. Nên ở
 * đây ta sẽ dùng getStaticPaths
 */



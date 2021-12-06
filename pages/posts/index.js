import Link from 'next/link';
import React from 'react';
import { Card } from 'react-bootstrap';
import Layout from '../../components/Layout';
import { getPosts } from "../../lib/post";
const Posts = ({ posts }) => {

    /*const posts = [
        {
            id: 1,
            title: "Post 1",
            body: "My post 1 body"
        },
        {
            id: 2,
            title: "Post 2",
            body: "My post 2 body"
        }
    ]
    */

    /**
     * Ở đây chúng ta sẽ không hack code thế này mà chúng ta sẽ sử dụng next, để mà lấy được cái data từ cái api này
     * "https://jsonplaceholder.typicode.com/posts" thế thì bây giờ chúng ta sẽ học 1 cái cơ bản đầu tiên của nextjs
     * đó là, cái content của cái page, cái nội dung của cái page mà phụ thuộc vào data ngoài và cái này sẽ được
     * pre-render ở phía server tức là người dùng đến cái http://localhost:3000/posts này này thì ở cái server chúng
     * ta sẽ render cái đó ra và nó sẽ trả lại toàn bộ html cho trang này.
     */
    return (
        <Layout>
            {posts.map((post) => (
                <Card key={post.id} style={{ margin: "1rem 0" }} className="shadow">
                    <Card.Body>
                        <Card.Title>{post.title}</Card.Title>
                        <Card.Text>{post.body}</Card.Text>
                        <Link href={`/posts/${post.id}`} passHref>
                            <Card.Link>See More</Card.Link>
                        </Link>

                    </Card.Body>
                </Card>
            ))}
        </Layout>
    );
};
// Get static data from backend /db /api
export const getStaticProps = async () => {
    /**
     * Khi mà chúng ta cần phải lấy dữ liệu TĨNH - là những dữ liệu chúng ta có thể lấy được trước khi cái request
     * của người dùng cập bến. Ví dụ nếu chúng ta vào cái http://localhost:3000/posts này chúng ta hiện ra 5 cái
     * posts thì bây giờ chúng ta có thể nghĩ rằng là già trẻ lớn bé gì vào cái trang này thì nó cũng chỉ ra 5 
     * cái posts và mỗi cái posts này với mỗi người nhìn vào sẽ là giống nhau nên chúng ta sẽ sử dụng cái 
     * getStaticProps để lấy được 5 cái posts này trước và chúng ta sẽ render ra html chuẩn để phục vụ cho người dùng.
     * Mấu chốt ở đây là khi bạn làm 1 cái gì đấy hãy lặp 1 câu hỏi là có nên sử dụng getStaticProps để lấy dữ liệu
     * hay không thì hãy tự đặt câu hỏi cho mình là liệu dữ liệu này nó có thay đổi, nó có phụ thuộc vào mỗi một 
     * request mà người dùng gửi tới hay không, nếu mà người dùng khác nhau chúng ta đưa ra dữ liệu khác nhau thì chúng
     * ta không được phép sử dụng getStaticProps. Và cái hay của getStaticProps này là khi chúng ta chạy build, tức là
     * cho việc sản xuất cái app của chúng ta để đưa lên thì nó sẽ gửi cái request và chuyển hết thành dạng
     * html cứng tức là khi người dùng truy cập đến cái trang post này nó sẽ không phải tạo ra 1 cái request tới cái
     * api nữa thì nó sẽ load nhanh hơn rất nhiều và nó cũng tốt cho cái việc SEO ý là chạy npm run build thì cái html của
     * cái trang posts này sẽ được tạo luôn rồi.
     */
    const posts = await getPosts();
    return {
        props: { posts }
    }
}

export default Posts;
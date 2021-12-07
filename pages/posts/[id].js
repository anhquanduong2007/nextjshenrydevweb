import Link from 'next/link';
import React from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import Layout from '../../components/Layout';
import { getPostIds, getPostsById } from "../../lib/post";
import { useRouter } from 'next/router';
const Post = ({ post }) => {
    const router = useRouter();
    // Nếu trang chưa tạp ra, isFallback của router === true thì trang tạm thời sau đây sẽ được render
    if (router.isFallback) {
        return (
            <Spinner animation="border" role="status" variant="dark">
                <span className="sr-only">LOADING....</span>
            </Spinner>
        )
    }
    // khi getStaticProps() chạy xong lần đầu tiên. thì in ra trang hoàn chỉnh ở dưới
    /**
     * Câu hỏi đặt ra là thế các lần sau nó có phải làm như thế này không thì câu tl là không. Sau khi chạy xong lần
     * đầu tiên thì nó sẽ tự động. Ví dụ ở đây đang chạy với trang số 6, nó sẽ tự động đưa cái trang này vào danh sách
     * pre-rendered. Tức là cái getStaticPaths đang từ 1->5 sau khi chạy xong nó sẽ là 1->6 nên sau đó
     * nó sẽ không phải tạo ra cái trang tạm thời như ở trên kia nữa.
     */
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
    const paths = await getPostIds(5);
    return {
        // fallback: false,  bất kỳ path nào không return bởi getStaticPaths sẽ tới trang 404
        fallback: true,
        paths,
    }
}
export const getStaticProps = async ({ params }) => {
    const post = await getPostsById(params.id);
    return {
        props: {
            post
        },
        revalidate: 1,
        /**
         * Nếu như chúng ta đang ở trang số 7 có tiếu đề là abc gì đó thì chúng ta không muốn rằng là
         * khi bên sever,backend thay đổi gì cái tiếu đề này thành abcxyz chẳng hạn chúng ta muốn render
         * cái đó mà do cái này pre-render html cái abc đã bị hackcode nên nó sẽ chỉ ra abc thôi nên cái 
         * revalidate: 1 này ý nghĩa của nó là bất kỳ khi nào người dùng có 1 ai đấy mà nó sẽ truy cập vào
         * trang posts/7 này thì tự nó sẽ gửi đi 1 request để nó xem xem ở phía database có cập nhật hay không
         * nếu mà có cập nhật thì nó sẽ tự pre-render 1 trang html hackcode khác để cập nhật dữ liệu mới. Số 1
         * này có nghĩa là cái việc mà đi tìm xem database nó đã bị thay đổi hay không nó chỉ diễn ra nhiều nhất là
         * 1 lần trong vòng 1s. còn ví dụ nếu là 10 thì là nhiều lần 10 lần trong vòng 1s. 
         */
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



/**
 * Như đã nói thì nếu chúng ta lấy 5 post đi, khi chúng ta chạy npm run build thì nó lật đật chạy đi lấy 5 lần
 * cái post riêng lẻ đó thế thì hay hình dung là nếu chúng ta lấy 100 cái hay 1000 cái thì sao chẳng lẽ chúng ta
 * cũng trả lại 100,1000 phát như thế thì rõ ràng chắc chắn nó rất là lâu và đương nhiên là khi mà những trang web lớn
 * nó lên đến hàng nghìn, hàng mười nghìn thì không bao giờ chúng ta có chuyện lấy như thế được mặc dù chúng ta biết
 * nó là dữ liệu gọi là dữ liệu kiểu tĩnh static data - dữ liệu không thay đổi tuy nhiên chúng ta không thể nào làm
 * như thế được tại vì thời gian build của chúng ta nó sẽ rất lâu.  Ở đây sửa lại code 1 chút, chúng ta sẽ lấy ra 10 posts
 * nhưng với mỗi cái post chỉ lấy ra 5 cái thôi cứ hiểu rằng khi mà chúng ta chạy npm run build thì chúng ta ra lệnh
 * cho nó thôi lấy 10 cái thì nhiều quá m lấy tạm cho t 5 cái thôi nên nó sẽ trả lại cho chúng ta 5 cái id tĩnh và
 * lúc quay lại code khi ấn vào post 1->5 thì hoàn thoàn bth nhưng từ post 5->10 thì nó lại notfound ngay. Tại vì next nó
 * sẽ hiều là m sử dụng getStaticPaths và getStaticProps nhưng làm thế nào mà m lười quá m chỉ cho t có đúng 5 cái
 * static thôi lấy cho t có mỗi một cái id từ 1->5 thôi thế thì ok cái lúc build t chỉ chạy đi lấy đúng 5 cái post đầu
 * tiên thôi nên lúc đầu mày có nói với t là có từ 6 -> 10 đâu mà bây giờ m muốn t giải quyết thế nào được. Thế thì trong
 * trường hợp này chúng ta sẽ chỉnh cái fallback: false -> true. Nếu như theo cái lúc đầu thì fallback là false thì
 * bất kỳ 1 cái path nào không được trả lại bởi cái getStaticPaths tức là cái 6->10 thì nó sẽ tới trang 404 nên khi chúng
 * ta không muốn nó tới trang 404 nữa, chúng ta muốn nhìn thấy post 6->10 đồng thời không muốn đi lấy 1 phát 10 post về
 * thế thì khổ quá nên trung chúng ta sẽ để fallback là true. Cái fallback là true có nghĩa là khi nào mà cái paths mà nó
 * không return ngay lập tức ở đây là 6->10 ý thì sẽ show trang "tạm thời" => đợi getStaticProps chạy => khi nào getStaticProps
 * chạy xong nó sẽ return trang hoàn chỉnh
 */



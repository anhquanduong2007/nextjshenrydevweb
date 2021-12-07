import fs from "fs";
import path from "path";

const booksDir = path.join(process.cwd(), 'books');
/**
 * Ở đây thông thường chúng ta dùng dirname tuy nhiên ở trong next nơi chạy code nó lại khác với cái nơi mình viết
 * code thế nên là nextjs nó khuyên cáo không nên dùng dirname khi mà mình muốn đọc từ file hệ thống ra mà nên dùng
 * process.cwd() -> cái này sẽ luôn luôn trả lại cái thư mục hiện hành mà chúng ta đang làm việc ở trong đấy. Ví dụ
 * ở trong đây khi mình đang chạy code này mình đang trong nextjshenrydevweb thì cái nextjshenrydevweb chính là kết
 * quả của process.cwd()
 */
export const getBooks = () => {
    const bookFileNames = fs.readdirSync(booksDir);
    const booksData = bookFileNames.map(bookFileName => {
        const fullBookPath = path.join(booksDir, bookFileName);
        const bookContent = fs.readFileSync(fullBookPath, 'utf8');
        return {
            bookName: bookFileName.replace(/\.txt$/, ''),
            bookContent,
            fullBookPath,
            booksDir
        }
    })
    return booksData;
}
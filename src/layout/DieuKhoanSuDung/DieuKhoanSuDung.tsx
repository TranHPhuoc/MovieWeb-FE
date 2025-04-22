import styles from './DieuKhoanSuDung.module.scss';

export const DieuKhoanSuDung = () => {
  return (
    
    <div className={styles.container}>
      <div className="netflix-bg" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}></div>
      <div className={styles.content}>
        <h1>Điều Khoản Sử Dụng - 1302Movies</h1>
        <p>
          Chào mừng bạn đến với 1302Movies – Phim hay cả rổ, nền tảng xem phim trực tuyến miễn phí hàng đầu. 
          Để đảm bảo trải nghiệm tốt nhất cho tất cả người dùng, 1302Movies xây dựng và duy trì các điều khoản 
          sử dụng dưới đây. Bằng việc truy cập và sử dụng dịch vụ của 1302Movies, bạn đồng ý tuân thủ các điều 
          khoản này. Vui lòng đọc kỹ để hiểu rõ quyền và nghĩa vụ của bạn.
        </p>

        <section>
          <h2>1. Chấp Nhận Điều Khoản Sử Dụng</h2>
          <p>
            Khi sử dụng dịch vụ của 1302Movies, bạn chấp nhận rằng. Bạn đã đọc, hiểu và đồng ý với các điều 
            khoản sử dụng này. Nếu bạn không đồng ý với bất kỳ điều khoản nào, vui lòng không tiếp tục truy cập 
            hoặc sử dụng 1302Movies.
          </p>
        </section>

        <section>
          <h2>2. Đăng Ký Tài Khoản</h2>
          <p>Khi đăng ký tài khoản tại 1302Movies, bạn cam kết:</p>
          <ul>
            <li>Cung cấp thông tin chính xác, đầy đủ và luôn cập nhật.</li>
            <li>Bảo mật thông tin đăng nhập của mình. 1302Movies không chịu trách nhiệm cho bất kỳ mất mát hoặc thiệt hại nào liên quan đến việc tiết lộ thông tin tài khoản.</li>
            <li>Không sử dụng tài khoản của mình để thực hiện các hành vi vi phạm pháp luật hoặc gây tổn hại cho 1302Movies và người dùng khác.</li>
          </ul>
        </section>

        <section>
          <h2>3. Hành Vi Bị Cấm</h2>
          <p>Khi sử dụng 1302Movies, bạn đồng ý không:</p>
          <ul>
            <li>Đăng tải, chia sẻ hoặc phát tán bất kỳ nội dung nào vi phạm quyền sở hữu trí tuệ, pháp luật hoặc quyền riêng tư của người khác.</li>
            <li>Thực hiện các hành vi gây hại cho hệ thống, cố gắng truy cập trái phép vào máy chủ hoặc tài khoản của người dùng khác.</li>
            <li>Sử dụng 1302Movies với mục đích thương mại mà không có sự đồng ý bằng văn bản từ chúng tôi.</li>
          </ul>
        </section>

        <section>
          <h2>4. Bảo Mật Thông Tin</h2>
          <p>
            1302Movies cam kết bảo vệ thông tin cá nhân của bạn. Vui lòng tham khảo Chính Sách Riêng Tư của 
            chúng tôi để hiểu rõ cách chúng tôi thu thập, sử dụng và bảo mật thông tin cá nhân của bạn.
          </p>
        </section>

        <section>
          <h2>5. Quyền Thay Đổi Dịch Vụ</h2>
          <p>1302Movies có quyền:</p>
          <ul>
            <li>Thay đổi, cập nhật hoặc ngừng cung cấp bất kỳ nội dung hoặc dịch vụ nào trên nền tảng mà không cần thông báo trước.</li>
            <li>Xóa bỏ hoặc tạm ngừng tài khoản của bạn nếu phát hiện hành vi vi phạm các điều khoản sử dụng hoặc các quy định pháp luật có liên quan.</li>
          </ul>
        </section>

        <section>
          <h2>6. Miễn Trừ Trách Nhiệm</h2>
          <p>1302Movies cam kết nỗ lực cung cấp dịch vụ với chất lượng tốt nhất, nhưng chúng tôi không chịu trách nhiệm về:</p>
          <ul>
            <li>Bất kỳ gián đoạn nào trong quá trình truy cập hoặc sự cố kỹ thuật.</li>
            <li>Nội dung do bên thứ ba cung cấp hoặc bất kỳ lỗi hay mất mát nào do sử dụng nội dung trên 1302Movies.</li>
            <li>Các thiệt hại gián tiếp, ngẫu nhiên hoặc hậu quả phát sinh từ việc sử dụng hoặc không thể sử dụng dịch vụ của chúng tôi.</li>
          </ul>
        </section>

        <section>
          <h2>7. Thay Đổi Điều Khoản Sử Dụng</h2>
          <p>
            Chúng tôi có thể cập nhật điều khoản sử dụng theo thời gian để phù hợp với các thay đổi trong hoạt 
            động và dịch vụ. Khi điều khoản thay đổi, chúng tôi sẽ đăng tải bản cập nhật lên trang web và gửi 
            thông báo đến người dùng khi cần thiết. Việc tiếp tục sử dụng dịch vụ sau khi điều khoản được cập 
            nhật đồng nghĩa với việc bạn đồng ý với các điều khoản mới.
          </p>
        </section>
      </div>
    </div>
  );
}; 
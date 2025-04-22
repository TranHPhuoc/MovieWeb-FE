import styles from './footer.module.scss';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.socialLinks}>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <FacebookIcon />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <TwitterIcon />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <InstagramIcon />
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                        <YouTubeIcon />
                    </a>
                </div>

                <div className={styles.links}>
                    <div className={styles.linkColumn}>
                        <h3>Thông tin</h3>
                        <Link to="/gioi-thieu">Giới thiệu</Link>
                        <Link to="/lien-he">Liên hệ</Link>
                        <Link to="/chinh-sach-bao-mat">Chính sách bảo mật</Link>
                        <Link to="/dieu-khoan-su-dung">Điều khoản sử dụng</Link>
                    </div>

                    <div className={styles.linkColumn}>
                        <h3>Phim</h3>
                        <Link to="/movie/popular">Phim phổ biến</Link>
                        <Link to="/movie/trending">Phim thịnh hành</Link>
                        <Link to="/movies-favourite">Phim yêu thích</Link>
                    </div>
                </div>

                <div className={styles.copyright}>
                    <p>© 1302Movies. Tất cả quyền được bảo lưu.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
import  { useState, useEffect } from 'react';
import { Fab } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Kiểm tra vị trí scroll để hiển thị/ẩn button
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Xử lý scroll to top với animation mượt
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <Fab
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            backgroundColor: '#e50914',
            zIndex: 1000,
            opacity: 0.8,
            transition: 'opacity 0.3s',
            '&:hover': {
              opacity: 1,
              backgroundColor: '#b2070e',
            },
          }}
        >
          <KeyboardArrowUpIcon sx={{ color: 'white' }} />
        </Fab>
      )}
    </>
  );
};

export default ScrollToTopButton; 
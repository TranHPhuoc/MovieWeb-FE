import styles from './Comments.module.scss';
import { Comment } from "../../types/comments";
import noAvatar from '../../assets/Images/noAvatar.jpg';

interface CommentListProps {
  comments: Comment[];
}

const CommentList = ({ comments }: CommentListProps) => {
  return (
    <div className={styles.commentSection}>
      <h2 className={styles.title}>Bình luận</h2>
      <div className={styles.commentsList}>
        {comments.length === 0 ? (
          <p className={styles.emptyMessage}>Chưa có bình luận nào.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className={styles.comment}>
              <img
                src={noAvatar}
                alt={comment.userId.name}
                className={styles.userAvatar}
              />
              <div className={styles.commentContent}>
                <div className={styles.commentHeader}>
                  <span className={styles.userName}>{comment.userId.name}</span>
                  <span className={styles.date}>
                    {new Date(comment.createdAt).toLocaleString("vi-VN")}
                  </span>
                </div>
                <p>{comment.content}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentList;

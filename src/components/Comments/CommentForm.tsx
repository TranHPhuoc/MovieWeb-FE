// components/CommentForm.tsx
import { useState } from 'react';
import styles from './Comments.module.scss';

interface CommentFormProps {
  onSubmit: (content: string) => Promise<void>;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    await onSubmit(content);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.commentForm}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your comment..."
        className={styles.commentInput}
      />
      <button type="submit" className={styles.submitButton}>
        Post Comment
      </button>
    </form>
  );
};

export default CommentForm;

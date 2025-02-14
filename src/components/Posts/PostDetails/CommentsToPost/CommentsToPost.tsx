import { FC, memo } from 'react';
import { Comment } from '../../../../types/Comment';

interface Props {
  comment: Comment;
  onDeleteComment: (userId: number) => void;
}

export const CommentsToPost: FC<Props> = memo((props) => {
  const {
    comment,
    onDeleteComment,
  } = props;

  return (
    <article
      className="message is-small"
      data-cy="Comment"
    >
      <div className="message-header">
        <a
          href={`mailto:${comment.email}`}
          data-cy="CommentAuthor"
        >
          {comment.name}
        </a>

        <button
          data-cy="CommentDelete"
          type="button"
          className="delete is-small"
          aria-label="delete"
          onClick={() => onDeleteComment(comment.id)}
        >
          delete button
        </button>
      </div>

      <div
        className="message-body"
        data-cy="CommentBody"
      >
        {comment.body}
      </div>
    </article>
  );
});

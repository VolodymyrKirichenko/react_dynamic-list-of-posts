import { FC, memo } from 'react';
import { NewCommentForm } from '../../NewCommentForm/NewCommentForm';
import { Post } from '../../../types/Post';
import { PostInfo } from './PostInfo/PostInfo';
import { CommentsToPost } from './CommentsToPost/CommentsToPost';
import { Loader } from '../../Loader';
import { useDetails } from './hooks/useDetails';

interface Props {
  post: Post;
}

export const PostDetails: FC<Props> = memo((props) => {
  const { post } = props;
  const {
    comments,
    isErrorLoading,
    isVisibleForm,
    removeComments,
    handleVisibleForm,
    loadComments,
  } = useDetails({ post });

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <PostInfo post={post} />

        <div className="block">
          {isErrorLoading && (
            <Loader />
          )}

          {isErrorLoading && (
            <div className="notification is-danger" data-cy="CommentsError">
              {isErrorLoading}
            </div>
          )}

          {!comments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          <p className="title is-4">Comments:</p>

          {comments.map(comment => (
            <CommentsToPost
              key={comment.id}
              comment={comment}
              onDeleteComment={removeComments}
            />
          ))}

          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={handleVisibleForm}
          >
            Write a comment
          </button>
        </div>

        {isVisibleForm && (
          <NewCommentForm
            onLoad={loadComments}
            post={post}
          />
        )}
      </div>
    </div>
  );
});

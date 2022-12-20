import {
  FC, useCallback, useEffect, useState,
} from 'react';
import { NewCommentForm } from '../../NewCommentForm/NewCommentForm';
import { Post } from '../../../types/Post';
import { deleteComments, getComments } from '../../../api/comments';
import { Comment } from '../../../types/Comment';
import { PostInfo } from './PostInfo/PostInfo';
import { CommentsToPost } from './CommentsToPost/CommentsToPost';
import { Loader } from '../../Loader';
import { ErrorType } from '../../../types/ErrorType';

interface Props {
  post: Post;
  selectedPostId: number | undefined;
}

export const PostDetails: FC<Props> = (props) => {
  const { post, selectedPostId } = props;

  const [comments, setComments] = useState<Comment[]>([]);
  const [
    isErrorLoading,
    setIsErrorLoading,
  ] = useState<ErrorType>(ErrorType.None);
  const [isVisibleForm, setIsVisibleForm] = useState(false);

  const handleVisibleForm = useCallback(() => {
    setIsVisibleForm(true);
  }, []);

  const loadComments = useCallback(async (postId: number | undefined) => {
    setIsErrorLoading(ErrorType.LoadComments);
    try {
      if (post) {
        const commentsFromServer = await getComments(postId);

        setComments(commentsFromServer);
        setIsErrorLoading(ErrorType.None);
      }
    } catch {
      setIsErrorLoading(ErrorType.LoadComments);
    }
  }, [selectedPostId]);

  const removeComments = useCallback(async (userId: number) => {
    try {
      await deleteComments(userId);

      loadComments(selectedPostId);
    } catch {
      setIsErrorLoading(ErrorType.LoadComments);
    }
  }, [selectedPostId]);

  useEffect(() => {
    loadComments(selectedPostId);
  }, [selectedPostId]);

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
};

import { useCallback, useEffect, useState } from 'react';
import { Post } from '../../../../types/Post';
import { Comment } from '../../../../types/Comment';
import { ErrorType } from '../../../../types/ErrorType';
import { deleteComments, getComments } from '../../../../api/comments';

interface Options {
  post: Post;
}

export const useDetails = (options: Options) => {
  const { post } = options;

  const [comments, setComments] = useState<Comment[]>([]);
  const [
    isErrorLoading,
    setIsErrorLoading,
  ] = useState<ErrorType>(ErrorType.None);
  const [isVisibleForm, setIsVisibleForm] = useState(false);

  const handleVisibleForm = useCallback(() => {
    setIsVisibleForm(true);
  }, []);

  const loadComments = useCallback(async (postId: number) => {
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
  }, []);

  const removeComments = useCallback(async (userId: number) => {
    try {
      await deleteComments(userId);

      loadComments(post?.id);
    } catch {
      setIsErrorLoading(ErrorType.LoadComments);
    }
  }, [post.id]);

  useEffect(() => {
    loadComments(post.id);
  }, [post.id]);

  return {
    comments,
    isErrorLoading,
    isVisibleForm,
    removeComments,
    handleVisibleForm,
    loadComments,
  };
};

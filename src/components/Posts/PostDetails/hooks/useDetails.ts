import { useCallback, useEffect, useState } from 'react';
import { Post } from '../../../../types/Post';
import { Comment } from '../../../../types/Comment';
import { ErrorType } from '../../../../types/ErrorType';
import { deleteComments, getComments } from '../../../../api/comments';

interface Options {
  post: Post;
  selectedPostId: number | undefined;
}

export const useDetails = (options: Options) => {
  const { post, selectedPostId } = options;

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

  return {
    comments,
    isErrorLoading,
    isVisibleForm,
    removeComments,
    handleVisibleForm,
    loadComments,
  };
};

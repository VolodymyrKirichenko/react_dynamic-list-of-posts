import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

export const getComments = async (postId: number | undefined) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const deleteComments = async (userId: number) => {
  return client.delete(`/comments/${userId}`);
};

export const createComments = async (comment: Omit<Comment, 'id'>) => {
  const {
    postId, body, email, name,
  } = comment;

  return client.post<Comment>('/comments', {
    postId, body, email, name,
  });
};

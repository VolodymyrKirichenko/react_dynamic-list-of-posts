import { useCallback, useEffect, useState } from 'react';
import { Post } from '../../../types/Post';
import { User } from '../../../types/User';
import { ErrorType } from '../../../types/ErrorType';
import { getUsers } from '../../../api/users';
import { getPosts } from '../../../api/posts';

export const useApp = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<ErrorType>(ErrorType.None);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const isPosts = posts.length !== 0;

  const loadUsers = useCallback(async () => {
    try {
      const usersFromServer = await getUsers();

      setUsers(usersFromServer);
    } catch {
      setError(ErrorType.LoadUsers);
    }
  }, []);

  const loadPosts = useCallback(async (userId: number) => {
    try {
      const postsFromServer = await getPosts(userId);

      setPosts(postsFromServer);
    } catch {
      setError(ErrorType.LoadPosts);
    }
  }, []);

  const selectingPost = useCallback(async (user: User) => {
    setSelectedUser(user);
  }, []);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    setSelectedPost(null);

    if (selectedUser) {
      loadPosts(selectedUser.id);
    } else {
      setPosts([]);
    }
  }, [selectedUser?.id]);

  return {
    posts,
    users,
    error,
    isPosts,
    selectedUser,
    selectedPost,
    selectingPost,
    setSelectedPost,
  };
};

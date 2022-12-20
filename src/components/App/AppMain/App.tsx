import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from '../../Posts/PostList/PostsList';
import { PostDetails } from '../../Posts/PostDetails/PostDetails';
import { UserSelector } from '../../Users/UserSelector/UserSelector';
import { Post } from '../../../types/Post';
import { User } from '../../../types/User';
import { getUsers } from '../../../api/users';
import { getPosts } from '../../../api/posts';
import { ErrorType } from '../../../types/ErrorType';
import { Error } from '../AppError/Error';

export const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<ErrorType>(ErrorType.None);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  onSelect={selectingPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!users && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {error && (
                  <Error error={error} />
                )}

                {posts.length === 0 && selectedUser && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {posts.length !== 0 && (
                  <PostsList
                    posts={posts}
                    onPostSelected={setSelectedPost}
                    selectedPostId={selectedPost?.id}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames(
              'tile', 'is-parent', 'is-8-desktop', 'Sidebar',
              { 'Sidebar--open': selectedPost },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && (
                <PostDetails
                  post={selectedPost}
                  selectedPostId={selectedPost?.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

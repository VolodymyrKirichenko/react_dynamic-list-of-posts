import { FC } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import classNames from 'classnames';
import { PostsList } from '../../Posts/PostList/PostsList';
import { PostDetails } from '../../Posts/PostDetails/PostDetails';
import { UserSelector } from '../../Users/UserSelector/UserSelector';
import { AppError } from '../AppError/AppError';
import { useApp } from '../hooks/useApp';

export const App: FC = () => {
  const {
    posts,
    users,
    error,
    isPosts,
    selectedPost,
    selectedUser,
    selectingPost,
    setSelectedPost,
  } = useApp();

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
                  <AppError error={error} />
                )}

                {!isPosts && selectedUser && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {isPosts && (
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
            <div className="tile is-child box is-success">
              {selectedPost && (
                <PostDetails post={selectedPost} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

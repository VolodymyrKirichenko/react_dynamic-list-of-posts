import { FC, memo } from 'react';
import { Post } from '../../../types/Post';
import { PostCard } from '../Post/PostСard';

interface Props {
  posts: Post[];
  onPostSelected: (post: Post | null) => void,
  selectedPostId: number | undefined;
}

export const PostsList: FC<Props> = memo((props) => {
  const { posts, onPostSelected, selectedPostId = 0 } = props;

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {posts.map(post => {
            const isPostSelected = post.id === selectedPostId;

            return (
              <PostCard
                key={post.id}
                post={post}
                onPostSelected={onPostSelected}
                isPostSelected={isPostSelected}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
});

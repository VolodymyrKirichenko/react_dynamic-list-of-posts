import { FC, memo } from 'react';
import cn from 'classnames';
import { Post } from '../../../types/Post';

interface Props {
  post: Post;
  onPostSelected: (post: Post | null) => void,
  selectedPostId: number | undefined;
}

export const PostCard: FC<Props> = memo((props) => {
  const { post, selectedPostId, onPostSelected } = props;

  return (
    <tr data-cy="Post">
      <td data-cy={post.id}>{post.id}</td>

      <td data-cy="PostTitle">
        {post.title}
      </td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={cn('button', 'is-link', {
            'is-light': selectedPostId !== post.id,
          })}
          onClick={() => onPostSelected(
            selectedPostId === post.id ? null : post,
          )}
        >
          {selectedPostId === post.id ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
});

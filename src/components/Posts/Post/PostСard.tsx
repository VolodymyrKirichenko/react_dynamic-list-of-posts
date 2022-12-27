import { FC, memo } from 'react';
import cn from 'classnames';
import { Post } from '../../../types/Post';

interface Props {
  post: Post;
  onPostSelected: (post: Post | null) => void,
  isPostSelected: boolean;
}

export const PostCard: FC<Props> = memo((props) => {
  const { post, isPostSelected, onPostSelected } = props;

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
            'is-light': !isPostSelected,
          })}
          onClick={() => onPostSelected(
            isPostSelected ? null : post,
          )}
        >
          {isPostSelected ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
});

import { FC, memo } from 'react';
import { Post } from '../../../../types/Post';

interface Props {
  post: Post;
}

export const PostInfo: FC<Props> = memo((props) => {
  const { post } = props;

  return (
    <div className="block">
      <h2 data-cy="PostTitle">
        {post?.title}
      </h2>

      <p data-cy="PostBody">
        {post?.body}
      </p>
    </div>
  );
});

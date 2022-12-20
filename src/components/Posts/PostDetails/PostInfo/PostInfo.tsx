import { FC } from 'react';
import { Post } from '../../../../types/Post';

interface Props {
  post: Post;
}

export const PostInfo: FC<Props> = (props) => {
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
};

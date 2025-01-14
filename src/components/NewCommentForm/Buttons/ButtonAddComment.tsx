import { FC, memo } from 'react';
import cn from 'classnames';

interface Props {
  isLoading: boolean;
}

export const ButtonAddComment: FC<Props> = memo((props) => {
  const { isLoading } = props;

  return (
    <div className="control">
      <button
        type="submit"
        className={cn('button', 'is-link', {
          'is-loading': isLoading,
        })}
      >
        Add
      </button>
    </div>
  );
});

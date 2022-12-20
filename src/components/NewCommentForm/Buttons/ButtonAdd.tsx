import { FC } from 'react';
import cn from 'classnames';

interface Props {
  isLoading: string
}

export const ButtonAdd: FC<Props> = (props) => {
  const { isLoading } = props;

  return (
    <div className="control">
      <button
        type="submit"
        className={cn(
          'button', 'is-link', {
            'is-loading': isLoading,
          },
        )}
      >
        Add
      </button>
    </div>
  );
};

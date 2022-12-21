import { FC } from 'react';
import cn from 'classnames';

interface Props {
  isError: boolean;
  isFilled: boolean;
  onReset: () => void;
}

export const ButtonClearForm: FC<Props> = (props) => {
  const { isError, isFilled, onReset } = props;

  return (
    <div className="control">
      <button
        type="button"
        className={cn('button', 'is-link', {
          'is-light': !isFilled && !isError,
        })}
        onClick={onReset}
      >
        Clear
      </button>
    </div>
  );
};

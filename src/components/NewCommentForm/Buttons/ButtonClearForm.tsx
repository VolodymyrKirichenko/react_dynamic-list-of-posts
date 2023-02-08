import { FC, memo } from 'react';
import cn from 'classnames';

interface Props {
  isError: boolean;
  isFilled: boolean;
  onReset: () => void;
}

export const ButtonClearForm: FC<Props> = memo((props) => {
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
});

import { FC, memo } from 'react';
import { Loader } from '../../Loader';
import { ErrorType } from '../../../types/ErrorType';

interface Props {
  error: ErrorType;
}

export const AppError: FC<Props> = memo((props) => {
  const { error } = props;

  return (
    <div>
      <Loader />

      <div
        className="notification is-danger"
        data-cy="PostsLoadingError"
      >
        {error}
      </div>
    </div>
  );
});

import { FC } from 'react';
import { Loader } from '../../Loader';
import { ErrorType } from '../../../types/ErrorType';

interface Props {
  error: ErrorType;
}

export const Error: FC<Props> = (props) => {
  const { error } = props;

  return (
    <>
      <Loader />

      <div
        className="notification is-danger"
        data-cy="PostsLoadingError"
      >
        {error}
      </div>
    </>
  );
};

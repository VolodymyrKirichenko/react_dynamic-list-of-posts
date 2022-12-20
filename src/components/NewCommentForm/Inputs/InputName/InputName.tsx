import { ChangeEvent, FC } from 'react';
import cn from 'classnames';
import { ErrorType } from '../../../../types/ErrorType';

interface Props {
  name: string
  nameError: string;
  onChangeName: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InputName: FC<Props> = (props) => {
  const { nameError, name, onChangeName } = props;

  return (
    <div className="field" data-cy="NameField">
      <label className="label" htmlFor="comment-author-name">
        Author Name
      </label>

      <div className="control has-icons-left has-icons-right">
        <input
          type="text"
          name="name"
          id="comment-author-name"
          placeholder="Name Surname"
          className={cn('input', {
            'is-danger': nameError,
          })}
          value={name}
          onChange={onChangeName}
        />

        <span className="icon is-small is-left">
          <i className="fas fa-user" />
        </span>

        {nameError && (
          <span
            className="icon is-small is-right has-text-danger"
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        )}
      </div>

      {nameError && (
        <p className="help is-danger" data-cy="ErrorMessage">
          {ErrorType.InputNameError}
        </p>
      )}
    </div>
  );
};

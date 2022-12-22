import { ChangeEvent, FC, memo } from 'react';
import cn from 'classnames';
import { ErrorType } from '../../../../types/ErrorType';

interface Props {
  email: string;
  emailError: string;
  onChangeEmail: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InputEmail: FC<Props> = memo((props) => {
  const { email, emailError, onChangeEmail } = props;

  return (
    <div className="field" data-cy="EmailField">
      <label className="label" htmlFor="comment-author-email">
        Author Email
      </label>

      <div className="control has-icons-left has-icons-right">
        <input
          type="text"
          name="email"
          id="comment-author-email"
          placeholder="email@test.com"
          className={cn('input', {
            'is-danger': emailError,
          })}
          value={email}
          onChange={onChangeEmail}
        />

        <span className="icon is-small is-left">
          <i className="fas fa-envelope" />
        </span>

        {emailError && (
          <span
            className="icon is-small is-right has-text-danger"
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        )}
      </div>

      {emailError && (
        <p className="help is-danger" data-cy="ErrorMessage">
          {ErrorType.InputEmailError}
        </p>
      )}
    </div>
  );
});

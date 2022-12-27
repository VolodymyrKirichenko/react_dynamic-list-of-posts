import { ChangeEvent, FC, memo } from 'react';
import cn from 'classnames';
import { ErrorType } from '../../../../types/ErrorType';

interface Props {
  value: string;
  error: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const InputBody: FC<Props> = memo((props) => {
  const { value, error, onChange } = props;

  return (
    <div className="field" data-cy="BodyField">
      <label className="label" htmlFor="comment-body">
        Comment Text
      </label>

      <div className="control">
        <textarea
          id="comment-body"
          name="body"
          placeholder="Type comment here"
          className={cn('textarea', {
            'is-danger': error,
          })}
          value={value}
          onChange={onChange}
        />
      </div>

      {error && (
        <p className="help is-danger" data-cy="ErrorMessage">
          {ErrorType.InputBodyError}
        </p>
      )}
    </div>
  );
});

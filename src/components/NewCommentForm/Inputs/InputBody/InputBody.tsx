import { ChangeEvent, FC } from 'react';
import cn from 'classnames';
import { ErrorType } from '../../../../types/ErrorType';

interface Props {
  body: string;
  bodyError: string;
  onChangeBody: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const InputBody: FC<Props> = (props) => {
  const { body, bodyError, onChangeBody } = props;

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
            'is-danger': bodyError,
          })}
          value={body}
          onChange={onChangeBody}
        />
      </div>

      {bodyError && (
        <p className="help is-danger" data-cy="ErrorMessage">
          {ErrorType.InputBodyError}
        </p>
      )}
    </div>
  );
};

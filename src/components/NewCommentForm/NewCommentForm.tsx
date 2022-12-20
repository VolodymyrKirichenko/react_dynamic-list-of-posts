import React, {
  ChangeEvent, FC, useCallback, useState,
} from 'react';
import { createComments } from '../../api/comments';
import { Post } from '../../types/Post';
import { Loader } from '../Loader';
import { InputName } from './Inputs/InputName/InputName';
import { InputEmail } from './Inputs/InputEmail/InputEmail';
import { InputBody } from './Inputs/InputBody/InputBody';
import { ButtonAdd } from './Buttons/ButtonAdd';
import { ButtonClear } from './Buttons/ButtonClear';
import { ErrorType } from '../../types/ErrorType';

interface Props {
  onLoad: (postId: number) => void;
  post: Post;
}

export const NewCommentForm: FC<Props> = (props) => {
  const { onLoad, post } = props;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [nameError, setNameError] = useState<ErrorType>(ErrorType.None);
  const [emailError, setEmailError] = useState<ErrorType>(ErrorType.None);
  const [bodyError, setBodyError] = useState<ErrorType>(ErrorType.None);
  const [isLoading, setIsLoading] = useState<ErrorType>(ErrorType.None);
  const [errorLoading, setErrorLoading] = useState<ErrorType>(ErrorType.None);

  const trimName = name.trim();
  const trimEmail = email.trim();
  const trimBody = body.trim();
  const validator = [trimName, trimEmail, trimBody];
  const validatorErrors = [nameError, emailError, bodyError];
  const isFilled = validator.some(el => el.length > 0);
  const isError = validatorErrors.some(error => error.length > 0);

  const handleChangeName = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
      setNameError(ErrorType.None);
    }, [],
  );

  const handleChangeEmail = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      setEmailError(ErrorType.None);
    }, [],
  );

  const handleChangeBody = useCallback(
    async (e: ChangeEvent<HTMLTextAreaElement>) => {
      setBody(e.target.value);
      setBodyError(ErrorType.None);
    }, [],
  );

  const addComment = useCallback(async () => {
    setNameError(trimName.length === 0
      ? ErrorType.InputNameError
      : ErrorType.None);
    setEmailError(trimEmail.length === 0
      ? ErrorType.InputNameError
      : ErrorType.None);
    setBodyError(trimBody.length === 0
      ? ErrorType.InputBodyError
      : ErrorType.None);

    if (trimName.length === 0
      || trimEmail.length === 0
      || trimBody.length === 0) {
      return;
    }

    const newComment = {
      postId: post.id,
      name,
      email,
      body,
    };

    try {
      setIsLoading(ErrorType.LoadingButton);

      await createComments(newComment);
      onLoad(newComment.postId);
      setName('');
      setEmail('');
      setBody('');
    } catch {
      setErrorLoading(ErrorType.LoadAddComments);
    } finally {
      setIsLoading(ErrorType.None);
    }
  }, [name, email, body]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    addComment();
  }, [name, email, body]);

  const resetForm = useCallback(async () => {
    setName('');
    setEmail('');
    setBody('');
    setIsLoading(ErrorType.None);
    setNameError(ErrorType.None);
    setBodyError(ErrorType.None);
    setEmailError(ErrorType.None);
    setErrorLoading(ErrorType.None);
  }, []);

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={(e) => handleSubmit(e)}
    >
      {errorLoading && (
        <Loader />
      )}

      <InputName
        name={name}
        nameError={nameError}
        onChangeName={handleChangeName}
      />

      <InputEmail
        email={email}
        emailError={emailError}
        onChangeEmail={handleChangeEmail}
      />

      <InputBody
        body={body}
        bodyError={bodyError}
        onChangeBody={handleChangeBody}
      />

      <div className="field is-grouped">
        <ButtonAdd isLoading={isLoading} />
        <ButtonClear
          isError={isError}
          isFilled={isFilled}
          onReset={resetForm}
        />
      </div>
    </form>
  );
};

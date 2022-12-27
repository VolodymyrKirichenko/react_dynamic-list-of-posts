import React, {
  ChangeEvent, useCallback, useState,
} from 'react';
import { Post } from '../../../types/Post';
import { ErrorType } from '../../../types/ErrorType';
import { createComments } from '../../../api/comments';

interface Options {
  onLoad: (postId: number) => void;
  post: Post;
}

export const useForm = (options: Options) => {
  const { onLoad, post } = options;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState<ErrorType>(ErrorType.None);
  const [emailError, setEmailError] = useState<ErrorType>(ErrorType.None);
  const [bodyError, setBodyError] = useState<ErrorType>(ErrorType.None);
  const [errorLoading, setErrorLoading] = useState<ErrorType>(ErrorType.None);

  const trimName = name.trim();
  const trimEmail = email.trim();
  const trimBody = body.trim();
  const isNameError = trimName.length === 0;
  const isEmailError = trimEmail.length === 0;
  const isBodyError = trimBody.length === 0;
  const validator = [trimName, trimEmail, trimBody];
  const validatorErrors = [nameError, emailError, bodyError];
  const isFilled = validator.some(el => el.length > 0);
  const isError = validatorErrors.some(error => error.length > 0);

  const handleChangeName = useCallback(async (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setName(e.target.value);
    setNameError(ErrorType.None);
  }, []);

  const handleChangeEmail = useCallback(async (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setEmail(e.target.value);
    setEmailError(ErrorType.None);
  }, []);

  const handleChangeBody = useCallback(async (
    e: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setBody(e.target.value);
    setBodyError(ErrorType.None);
  }, []);

  const addComment = useCallback(async () => {
    if (isNameError) {
      setNameError(ErrorType.InputNameError);
    }

    if (isEmailError) {
      setEmailError(ErrorType.InputEmailError);
    }

    if (isBodyError) {
      setBodyError(ErrorType.InputBodyError);
    }

    if (isNameError || isEmailError || isBodyError) {
      return;
    }

    const newComment = {
      postId: post.id,
      name: trimName,
      email: trimEmail,
      body: trimBody,
    };

    try {
      setIsLoading(true);

      await createComments(newComment);

      onLoad(newComment.postId);

      setName('');
      setEmail('');
      setBody('');
    } catch {
      setErrorLoading(ErrorType.LoadAddComments);
    } finally {
      setIsLoading(false);
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

    setNameError(ErrorType.None);
    setBodyError(ErrorType.None);
    setEmailError(ErrorType.None);
  }, []);

  return {
    name,
    body,
    email,
    isError,
    isFilled,
    isLoading,
    nameError,
    bodyError,
    resetForm,
    emailError,
    errorLoading,
    handleSubmit,
    handleChangeBody,
    handleChangeName,
    handleChangeEmail,
  };
};

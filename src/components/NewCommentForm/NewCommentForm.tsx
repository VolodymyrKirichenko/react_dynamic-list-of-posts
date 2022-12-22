import { FC, memo } from 'react';
import { Post } from '../../types/Post';
import { Loader } from '../Loader';
import { InputName } from './Inputs/InputName/InputName';
import { InputEmail } from './Inputs/InputEmail/InputEmail';
import { InputBody } from './Inputs/InputBody/InputBody';
import { ButtonAddComment } from './Buttons/ButtonAddComment';
import { ButtonClearForm } from './Buttons/ButtonClearForm';
import { useForm } from './hooks/useForm';

interface Props {
  onLoad: (postId: number) => void;
  post: Post;
}

export const NewCommentForm: FC<Props> = memo((props) => {
  const { post, onLoad } = props;
  const {
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
  } = useForm({ onLoad, post });

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
        <ButtonAddComment isLoading={isLoading} />
        <ButtonClearForm
          isError={isError}
          isFilled={isFilled}
          onReset={resetForm}
        />
      </div>
    </form>
  );
});

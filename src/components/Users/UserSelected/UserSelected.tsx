import { FC, memo } from 'react';
import cn from 'classnames';
import { User } from '../../../types/User';

interface Props {
  user: User;
  isUserSelected: boolean;
  onUserSelected: (user: User) => void;
}

export const SelectedUser: FC<Props> = memo((props) => {
  const { user, isUserSelected, onUserSelected } = props;

  return (
    <a
      href={`#${user.id}`}
      className={cn('dropdown-item', {
        'is-active': isUserSelected,
      })}
      onClick={() => onUserSelected(user)}
    >
      {user.name}
    </a>
  );
});

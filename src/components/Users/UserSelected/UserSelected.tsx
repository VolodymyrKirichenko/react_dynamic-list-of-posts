import { FC, memo } from 'react';
import cn from 'classnames';
import { User } from '../../../types/User';

interface Props {
  user: User;
  selectedUserName: string;
  onUserSelected: (user: User) => void;
}

export const SelectedUser: FC<Props> = memo((props) => {
  const { user, selectedUserName, onUserSelected } = props;

  return (
    <a
      href={`#${user.id}`}
      className={cn('dropdown-item', {
        'is-active': selectedUserName === user.name,
      })}
      onClick={() => onUserSelected(user)}
    >
      {user.name}
    </a>
  );
});

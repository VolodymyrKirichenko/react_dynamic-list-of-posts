import { FC, memo, useState } from 'react';
import cn from 'classnames';
import { User } from '../../../types/User';
import { SelectedUser } from '../UserSelected/UserSelected';
import {
  DropdownSelectButton,
} from './DropdownSelectButton/DropdownSelectButton';

interface Props {
  users: User[];
  onSelect: (user: User) => void;
}

export const UserSelector: FC<Props> = memo((props) => {
  const { users, onSelect } = props;

  const [selectedUserName, setSelectedUserName] = useState('Choose a user');
  const [selectUser, setSelectUser] = useState(false);

  const handleUserSelected = (user: User) => {
    onSelect(user);
    setSelectUser(false);
    setSelectedUserName(user.name);
  };

  const handleVisible = (isVisible: boolean) => {
    setSelectUser(isVisible);
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', {
        'is-active': selectUser,
      })}
    >
      <DropdownSelectButton
        selectUser={selectUser}
        selectedUserName={selectedUserName}
        onVisible={handleVisible}
      />

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map((user) => {
            const isUserSelected = user.name === selectedUserName;

            return (
              <SelectedUser
                key={user.id}
                user={user}
                onUserSelected={handleUserSelected}
                isUserSelected={isUserSelected}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
});

import { FC, memo } from 'react';

interface Props {
  selectUser: boolean;
  selectedUserName: string;
  onVisible: (b: boolean) => void;
}

export const DropdownSelectButton: FC<Props> = memo((props) => {
  const { selectUser, selectedUserName, onVisible } = props;

  return (
    <div className="dropdown-trigger">
      <button
        type="button"
        className="button"
        aria-haspopup="true"
        aria-controls="dropdown-menu"
        onClick={() => onVisible(!selectUser)}
      >
        <span>{selectedUserName || 'Choose a user'}</span>

        <span className="icon is-small">
          <i className="fas fa-angle-down" aria-hidden="true" />
        </span>
      </button>
    </div>
  );
});

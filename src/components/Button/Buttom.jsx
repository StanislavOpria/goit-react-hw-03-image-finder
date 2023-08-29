import { AddButton } from './Button.styled';

export const Button = ({ onClick }) => {
  return (
    <AddButton type="click" onClick={onClick}>
      Load more
    </AddButton>
  );
};

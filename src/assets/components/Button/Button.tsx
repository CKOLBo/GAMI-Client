import { useNavigate } from 'react-router-dom';

interface ButtonProps {
  text: string;
  to?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  color?: string;
}

export default function Button({
  text,
  to,
  onClick,
  color = 'bg-main-1',
}: ButtonProps) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);
    if (to) navigate(to);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`
        ${color}
        rounded-lg
        w-38
        h-16
        cursor-pointer
        text-white
        font-bold
        text-2xl
      `}
    >
      {text}
    </button>
  );
}

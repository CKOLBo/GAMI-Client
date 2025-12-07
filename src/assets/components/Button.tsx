import { useNavigate } from 'react-router-dom';

interface ButtonProps {
  text: string;
  to: string;
}

export default function Button({ text, to }: ButtonProps) {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => navigate(to)}
        type="button"
        className="rounded-[10px] bg-main-1 w-38 h-16 text-white font-bold text-2xl"
      >
        {text}
      </button>
    </div>
  );
}

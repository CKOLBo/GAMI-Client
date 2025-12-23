import Search from '@/assets/svg/post/Search';

interface InputSearchProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter?: () => void;
}

export default function InputSearch({
  placeholder = '익명 게시판 검색',
  value,
  onChange,
  onEnter,
}: InputSearchProps) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={(e) => e.key === 'Enter' && onEnter?.()}
        className="w-100 h-16 pl-16 pr-6 rounded-full border border-gray-4 bg-[#F9F9F9] text-2xl font-bold outline-none focus:border-main-1"
      />
      <div className="absolute left-8 px-5 top-1/2 -translate-1/2">
        <Search />
      </div>
    </div>
  );
}

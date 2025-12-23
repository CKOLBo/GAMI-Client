import Profile from '@/assets/svg/profile/Profile';

interface RequestItemProps {
  name: string;
  onCancel: () => void;
}

export default function RequestItem({ name, onCancel }: RequestItemProps) {
  return (
    <div className="mb-2 px-4 2xl:px-6 py-4 2xl:py-5 rounded-lg hover:bg-white-1 cursor-pointer transition-colors flex items-center gap-4 2xl:gap-5">
      <div className="flex-shrink-0">
        <div className="w-12 2xl:w-14 h-12 2xl:h-14 rounded-full flex items-center justify-center">
          <Profile width={40} height={40} />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-base 2xl:text-lg font-semibold text-gray-1 mb-1 truncate">
          {name}님한테 요청을 보냈어요.
        </p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onCancel();
        }}
        className="px-4 2xl:px-5 py-2 2xl:py-2.5 rounded-lg bg-white text-gray-1 text-sm 2xl:text-base font-semibold hover:bg-[#f5f5f5] transition-colors whitespace-nowrap flex-shrink-0"
      >
        취소
      </button>
    </div>
  );
}

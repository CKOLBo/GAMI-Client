import Profile from '@/assets/svg/profile/Profile';

interface MentorProps {
  name: string;
  generation: number;
  major: string;
  onApply?: () => void;
}

export default function Mentor({
  name,
  generation,
  major,
  onApply,
}: MentorProps) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white-1 p-3">
      <div className="flex items-center gap-5 h-[228px]">
        <Profile />

        <div>
          <p className="font-semibold text-gray-1">{name}</p>

          <div className="mt-3 flex gap-2">
            <span className="rounded bg-main-1 px-2 py-0.5 text-white text-bold">
              {generation}기
            </span>
            <span className="rounded bg-main-2 px-2 py-0.5 text-white text-bold">
              {major}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={onApply}
        className="rounded-3xl border border-none bg-white px-4 py-2 text-sm hover:bg-gray-100 transition"
      >
        멘토 신청
      </button>
    </div>
  );
}

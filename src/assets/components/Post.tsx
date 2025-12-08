import { useState } from 'react';
import Hart from '@/assets/svg/Hart';
import Comment from '@/assets/svg/Comment';
import Report from '@/assets/svg/Report';

export default function Post() {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="flex flex-row justify-between">
      <div>
        <div>
          <p className="font-bold text-[32px]">제목이 들어갈 곳</p>
          <p className="text-gray-3 text-2xl font-bold">내용이 들어갈 곳</p>
        </div>
        <div>
          <p>익명</p>
          <p>1시간 전</p>
        </div>
      </div>

      <div className="flex flex-row">
        <button className="h-[28px]" onClick={() => setIsLiked(!isLiked)}>
          <Hart isSelect={isLiked} />
        </button>
        <button className="h-[28px]">
          <Comment />
        </button>
        <button className="h-[28px]">
          <Report />
        </button>
      </div>
    </div>
  );
}

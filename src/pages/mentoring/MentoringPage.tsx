import Sidebar from '@/assets/components/Sidebar';
import Mentor from '@/assets/components/mentor/Mentor';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface MentorData {
  id: number;
  name: string;
  gender: string;
  generation: number;
  major: string;
}

export default function MentoringPage() {
  const [mentors, setMentors] = useState<MentorData[]>([]);

  useEffect(() => {
    axios
      .get('/data/mockMentors.json')
      .then((res) => {
        setMentors(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <main className="flex-1 p-25">
        <div className="mb-32 flex items-center">
          <h1 className="text-[40px] font-semibold text-gray-1">
            멘토링 |<span className="text-[32px] text-gray-2"> 랜덤 멘토링</span>
          </h1>

          <input
            type="text"
            placeholder="전공 또는 멘토의 이름을 입력해주세요."
            className="ml-25 w-150 rounded-full border px-4 py-2 text-[24px] text-gray-3 focus:outline-none font-bold"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
          {mentors.map((mentor) => (
            <Mentor
              key={mentor.id}
              name={mentor.name}
              generation={mentor.generation}
              major={mentor.major}
              onApply={() => {
                console.log(`${mentor.name} 멘토 신청`);
              }}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

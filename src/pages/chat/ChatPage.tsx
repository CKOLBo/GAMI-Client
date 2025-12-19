import Sidebar from '@/assets/components/Sidebar';
import Logo from '@/assets/svg/logo/Logo';
import Profile from '@/assets/svg/profile/Profile';
import BellIcon from '@/assets/svg/common/BellIcon';
import SearchIcon from '@/assets/svg/main/SearchIcon';

interface ChatItem {
  id: string;
  name: string;
  lastMessage: string;
}

export default function ChatPage() {
  const chatList: ChatItem[] = [
    {
      id: '1',
      name: '9기 문강현',
      lastMessage: '최근 한 대화 대화대화화대대대대',
    },
    {
      id: '2',
      name: '9기 문강현',
      lastMessage: '최근 한 대화 대화대화화대대대대',
    },
    {
      id: '3',
      name: '9기 문강현',
      lastMessage: '최근 한 대화 대화대화화대대대대',
    },
    {
      id: '4',
      name: '9기 문강현',
      lastMessage: '최근 한 대화 대화대화화대대대대',
    },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-45 2xl:ml-55 flex">
        <div className="w-96 2xl:w-[480px] border-r border-gray-2 bg-white flex flex-col">
          <div className="px-6 2xl:px-8 pt-6 2xl:pt-8 pb-4 2xl:pb-5 border-b border-gray-2">
            <div className="flex items-center justify-between mb-4 2xl:mb-5">
              <h2 className="text-xl 2xl:text-2xl font-semibold text-gray-3">
                채팅 | 요청
              </h2>
              <BellIcon className="text-gray-3" />
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Q 검색"
                className="w-full h-12 2xl:h-14 pl-12 2xl:pl-14 pr-4 rounded-full border border-gray-2 bg-[#F9F9F9] text-base 2xl:text-lg outline-none focus:border-main-2"
              />
              <div className="absolute left-4 2xl:left-5 top-1/2 -translate-y-1/2">
                <SearchIcon className="text-gray-3" />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {chatList.map((chat) => (
              <div
                key={chat.id}
                className="px-6 2xl:px-8 py-4 2xl:py-5 border-b border-gray-2 hover:bg-[#F9F9F9] cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-4 2xl:gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-12 2xl:w-14 h-12 2xl:h-14 rounded-full bg-gray-2 flex items-center justify-center">
                      <Profile width={40} height={40} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base 2xl:text-lg font-semibold text-gray-1 mb-1 truncate">
                      {chat.name}
                    </h3>
                    <p className="text-sm 2xl:text-base text-gray-3 truncate">
                      {chat.lastMessage}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center bg-white">
          <div className="text-center">
            <div className="mb-8 2xl:mb-12 flex justify-center">
              <Logo size="lg" />
            </div>
            <p className="text-2xl 2xl:text-3xl font-bold text-main-2 mb-2 2xl:mb-3">
              멘토와 멘티를 바로 연결하는
            </p>
            <p className="text-xl 2xl:text-2xl font-semibold text-gray-3">
              맞춤형 멘토링 서비스
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


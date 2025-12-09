import InputSearch from '@/assets/components/InputSearch';
import Button from '@/assets/components/Button';
import Post from '@/assets/components/Post';

export default function PostPage() {
  const posts = [
    {
      id: 1,
      title: '제목이 들어갈 곳',
      content: '내용이 들어갈 곳',
      author: '익명',
      timeAgo: '1시간 전',
      likeCount: 3,
      commentCount: 0,
    },
    {
      id: 2,
      title: '제목이 들어갈 곳',
      content: '내용이 들어갈 곳',
      author: '익명',
      timeAgo: '14건 전',
      likeCount: 3,
      commentCount: 0,
    },
    {
      id: 3,
      title: '제목이 들어갈 곳',
      content: '내용이 들어갈 곳',
      author: '익명',
      timeAgo: '1시간 전',
      likeCount: 3,
      commentCount: 0,
    },
    {
      id: 4,
      title: '제목이 들어갈 곳',
      content: '내용이 들어갈 곳',
      author: '익명',
      timeAgo: '1시간 전',
      likeCount: 3,
      commentCount: 0,
    },
  ];

  return (
    <div className="w-full">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
        <div
          className="flex flex-col lg:flex-row items-start lg:items-center
                        my-4 sm:my-6 lg:my-16
                        gap-3 lg:gap-20"
        >
          <div className="w-full lg:w-auto shrink-0">
            <p className="text-xl sm:text-2xl lg:text-4xl font-bold">
              익명 게시판
            </p>
          </div>

          <div
            className="flex flex-col sm:flex-row w-full flex-wrap
                          items-stretch sm:items-center
                          gap-3 sm:gap-4 justify-between"
          >
            <div className="w-full sm:flex-1 max-w-[400px]">
              <InputSearch />
            </div>

            <div className="flex flex-wrap gap-3 sm:gap-4 lg:gap-6">
              <Button text="글 쓰기" to="" />
              <Button text="내가 쓴 글" to="" />
            </div>
          </div>
        </div>

        <div className="border-t-2 border-gray-2">
          {posts.map((post) => (
            <Post
              key={post.id}
              title={post.title}
              content={post.content}
              author={post.author}
              timeAgo={post.timeAgo}
              likeCount={post.likeCount}
              commentCount={post.commentCount}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

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
      <div className="max-w-[75vw] mx-auto px-[0.83vw] lg:px-[1.25vw]">
        <div className="flex flex-col lg:flex-row items-start lg:items-center my-[0.83vw] sm:my-[1.25vw] lg:my-[3.33vw] gap-[0.83vw] lg:gap-[5.21vw]">
          <div className="w-full lg:w-auto shrink-0">
            <p className="text-[1.25vw] sm:text-[1.56vw] lg:text-[2.08vw] xl:text-[2.08vw] font-bold">
              익명 게시판
            </p>
          </div>

          <div className="flex flex-col sm:flex-row w-full flex-wrap items-stretch sm:items-center gap-[0.63vw] sm:gap-[0.83vw] justify-between">
            <div className="w-full sm:flex-1 max-w-[20.83vw]">
              <InputSearch />
            </div>

            <div className="flex flex-wrap gap-[0.63vw] sm:gap-[0.83vw] lg:gap-[1.25vw]">
              <Button text="글 쓰기" to="/post/write" />
              <Button text="내가 쓴 글" to="/post/my" />
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

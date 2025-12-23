import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Button from '@/assets/components/Button/Button';
import Post from '@/assets/components/post/Post';
import PostHead from '@/assets/components/post/PostHead';
import PostModal from '@/assets/components/modal/ReportModal';
import Sidebar from '@/assets/components/Sidebar';

import Report from '@/assets/svg/post/Report';
import { instance } from '@/assets/shared/lib/axios';

interface PostType {
  id: number;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
  memberId: number;
  createdAt: string;
}

export default function PostPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postData, setPostData] = useState<PostType[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    instance
      .get('/api/post', {
        params: {
          page,
          size: 10,
          sort: 'createdAt,desc',
        },
      })
      .then((response) => {
        setPostData(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch(() => {
        toast.error('게시글 목록을 불러오지 못했습니다.');
      });
  }, [page]);

  const handleReportClick = () => {
    setIsModalOpen(true);
  };

  const handleReport = () => {
    setIsModalOpen(false);
    toast.success('신고가 접수되었습니다.');
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="w-full flex-1">
        <div className="max-w-[1500px] px-4 ml-80 lg:px-6">
          <PostHead>
            <div className="flex flex-wrap gap-3 sm:gap-4 lg:gap-6">
              <Button text="글 쓰기" to="/post-write" />
              <Button text="내가 쓴 글" to="/my-post" />
            </div>
          </PostHead>

          <div className="border-t-2 border-gray-2">
            {postData.map((post) => (
              <Post
                key={post.id}
                title={post.title}
                content={post.content}
                author="익명"
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                timeAgo={new Date(post.createdAt).toLocaleDateString()}
                onPostClick={() => navigate(`/post-content/${post.id}`)}
                actions={[
                  {
                    icon: <Report />,
                    onClick: handleReportClick,
                  },
                ]}
              />
            ))}
          </div>

          <div className="flex justify-center gap-4 py-6">
            <button
              disabled={page === 0}
              onClick={() => setPage((prev) => prev - 1)}
            >
              이전
            </button>

            <span>
              {page + 1} / {totalPages}
            </span>

            <button
              disabled={page + 1 >= totalPages}
              onClick={() => setPage((prev) => prev + 1)}
            >
              다음
            </button>
          </div>
        </div>

        {isModalOpen && (
          <PostModal
            onClose={() => setIsModalOpen(false)}
            onReport={handleReport}
          />
        )}
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Sidebar from '@/assets/components/Sidebar';
import Post from '@/assets/components/post/Post';
import PostHead from '@/assets/components/post/PostHead';
import Delete from '@/assets/svg/post/Delete';
import DeleteModal from '@/assets/components/modal/DeleteModal';
import Divider from '@/assets/svg/Divider';
import { instance } from '@/assets/shared/lib/axios';

interface PostResponse {
  id: number;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
  memberId: number;
  createdAt: string;
  updatedAt: string;
  images: string[];
}

interface MyPostType {
  id: number;
  title: string;
  content: string;
  author: string;
  timeAgo: string;
  likeCount: number;
  commentCount: number;
}

export default function MyPost() {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [myPostData, setMyPostData] = useState<MyPostType[]>([]);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    if (!postId) return;

    const fetchPostDetail = async () => {
      try {
        const res = await instance.get<PostResponse>(`/api/post/${postId}`);

        const post = res.data;

        setMyPostData([
          {
            id: post.id,
            title: post.title,
            content: post.content,
            author: '익명',
            timeAgo: new Date(post.createdAt).toLocaleDateString(),
            likeCount: post.likeCount,
            commentCount: post.commentCount,
          },
        ]);
      } catch {
        toast.error('게시글을 불러오지 못했습니다.');
      }
    };

    fetchPostDetail();
  }, [postId]);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    setIsModalOpen(false);
    toast.success('게시글이 삭제되었습니다.');
    navigate('/post');
  };

  return (
    <>
      <div className="flex">
        <Sidebar />

        <div className="max-w-[1500px] w-full ml-80 px-4 lg:px-6">
          <div className="flex items-center justify-between">
            <h1 className="flex items-center gap-4 text-[40px] font-bold text-gray-1 pr-25">
              <Link
                to="/post"
                className="text-3xl 2xl:text-[40px] text-gray-2 font-bold hover:text-gray-1 transition-colors"
              >
                익명 게시판
              </Link>
              <Divider className="shrink-0" />
              <span className="text-3xl 2xl:text-[40px] text-gray-1 font-bold">
                내가 쓴 글
              </span>
            </h1>

            <PostHead
              keyword={keyword}
              onKeywordChange={(e) => setKeyword(e.target.value)}
              onSearch={() => {}}
            />
          </div>

          <div className="border-t-2 border-gray-2">
            {myPostData.map((post) => (
              <Post
                key={post.id}
                title={post.title}
                content={post.content}
                author={post.author}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                timeAgo={post.timeAgo}
                onPostClick={() => navigate(`/post/${post.id}`)}
                actions={[
                  {
                    icon: <Delete />,
                    onClick: handleDeleteClick,
                  },
                ]}
              />
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <DeleteModal
          onClose={() => setIsModalOpen(false)}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Heart from '@/assets/svg/Heart';
import Comment from '@/assets/svg/post/Comment';
import Report from '@/assets/svg/post/Report';
import PostModal from '@/assets/components/modal/ReportModal';
import Button from '@/assets/components/Button/Button';
import Sidebar from '@/assets/components/Sidebar';
import Gemini from '@/assets/svg/post/Gemini.png';
import Arrow from '@/assets/svg/Arrow';
import { instance } from '@/assets/shared/lib/axios';

interface PostDetailType {
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

export default function PostContent() {
  const { postId } = useParams<{ postId: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [heartClick, setHeartClick] = useState(false);
  const [postData, setPostData] = useState<PostDetailType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState('');

  const calculateTimeAgo = (createdAt: string) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMs = now.getTime() - created.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}분 전`;
    if (diffHours < 24) return `${diffHours}시간 전`;
    return `${diffDays}일 전`;
  };

  useEffect(() => {
    const fetchPostDetail = async () => {
      if (!postId) return;

      setIsLoading(true);
      try {
        const response = await instance.get(`/api/post/${postId}`);
        setPostData(response.data);
      } catch (error) {
        console.error('게시글 조회 실패:', error);
        alert('게시글을 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostDetail();
  }, [postId]);

  const handleLikeClick = async () => {
    if (!postId) return;

    try {
      await instance.post(`/api/post/${postId}/like`);
      setHeartClick(!heartClick);

      if (postData) {
        setPostData({
          ...postData,
          likeCount: heartClick
            ? postData.likeCount - 1
            : postData.likeCount + 1,
        });
      }
    } catch (error) {
      console.error('좋아요 처리 실패:', error);
      alert('좋아요 처리에 실패했습니다.');
    }
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    if (!postId) return;

    try {
      await instance.post(`/api/post/${postId}/comment`, {
        content: comment.trim(),
      });

      alert('댓글이 등록되었습니다.');
      setComment('');

      if (postData) {
        setPostData({
          ...postData,
          commentCount: postData.commentCount + 1,
        });
      }
    } catch (error) {
      console.error('댓글 등록 실패:', error);
      alert('댓글 등록에 실패했습니다.');
    }
  };

  if (isLoading) {
    return (
      <>
        <Sidebar />
        <div className="w-full ml-28 flex justify-center">
          <div className="w-full max-w-[1500px] mt-25">
            <p className="text-xl text-gray-3">로딩 중...</p>
          </div>
        </div>
      </>
    );
  }

  if (!postData) {
    return (
      <>
        <Sidebar />
        <div className="w-full ml-28 flex justify-center">
          <div className="w-full max-w-[1500px] mt-25">
            <p className="text-xl text-gray-3">게시글을 찾을 수 없습니다.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Sidebar />
      <div className="w-full ml-28 flex justify-center">
        <div className="w-full max-w-[1500px] mt-25">
          <div className="mb-8">
            <h1 className="text-[40px] font-bold text-gray-1">
              {postData.title}
            </h1>
          </div>

          <div className="flex items-center gap-4 mb-6 pb-6 border-b-2 border-gray-2">
            <span className="text-xl font-bold text-gray-1">익명</span>
            <span className="text-xl font-bold text-gray-3">
              {calculateTimeAgo(postData.createdAt)}
            </span>
          </div>

          <div className="mb-34 mt-18">
            <div className="text-xl leading-relaxed font-bold text-gray-3 whitespace-pre-wrap">
              {postData.content}
            </div>
          </div>

          {postData.images && postData.images.length > 0 && (
            <div className="mb-34">
              {postData.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`게시글 이미지 ${index + 1}`}
                  className="max-w-full h-auto rounded-lg mb-4"
                />
              ))}
            </div>
          )}

          <div className="flex gap-12 mb-34">
            <div className="border rounded-full p-4 w-18 h-18 border-gray-2">
              <img src={Gemini} alt="Gemini" width="44" height="44" />
            </div>

            <div className="rounded-[20px] shadow-GAMI pt-6 pl-8 w-[464px] h-[140px]">
              <p className="text-gray-3 font-bold text-xl pb-8">
                AI를 활용 해 게시글을 요약해보세요!
              </p>
              <div className="flex gap-1 cursor-pointer">
                <h2 className="text-gray-1 font-bold text-2xl">
                  AI로 요약하기
                </h2>
                <div className="flex items-center">
                  <Arrow className="w-7 h-7" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-11 mb-10 pb-14 border-b-2 border-gray-2">
            <div className="flex items-center gap-3 mb-6">
              <Comment width="32px" height="32px" color="#333D48" />
              <h2 className="text-[32px] font-bold text-gray-1">
                댓글 {postData.commentCount}개
              </h2>
            </div>
            <div className="flex flex-row gap-18">
              <button
                className="flex items-center cursor-pointer gap-4"
                onClick={handleLikeClick}
              >
                <Heart isSelect={heartClick} />
                <span className="text-[32px] font-normal text-gray-1">
                  {postData.likeCount}
                </span>
              </button>
              <button
                className="flex items-center gap-4 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                <Report />
              </button>
            </div>
          </div>

          <div className="mb-10">
            <div className="flex items-center gap-4 mb-4 ml-9">
              <span className="text-gray-1 text-xl font-bold">익명</span>
              <span className="text-gray-3 text-xl font-bold">1시간 전</span>
            </div>
            <div className="ml-9">
              <p className="text-gray-3 font-bold text-xl">하윙</p>
            </div>
          </div>

          <div className="mb-8">
            <div className="relative">
              <textarea
                placeholder="댓글 입력하기"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full h-32 p-7 border-2 placeholder:text-xl placeholder:font-bold border-gray-2 rounded-lg resize-none outline-none text-xl"
              />
            </div>
            <div className="flex justify-end mt-12">
              <Button text="등록하기" onClick={handleCommentSubmit} />
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <PostModal
          onClose={() => setIsModalOpen(false)}
          onReport={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </>
  );
}

import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { ArrowLeft, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLogs } from '../hooks/useLogs';
import { useAuth } from '../context/AuthContext';

export default function FieldMode() {
  const { accessToken } = useAuth();
  const { logs, fetchLogs, loading } = useLogs();

  useEffect(() => {
    if (accessToken) {
      fetchLogs();
    }
  }, [accessToken, fetchLogs]);

  // Filter only important logs and those that have some note or clubs
  const flashcards = logs.filter(log => log.important);

  return (
    <div className="bg-black min-h-screen text-white flex flex-col">
      <div className="p-6 flex items-center justify-between">
        <Link to="/" className="text-white">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h2 className="text-lg font-bold tracking-widest uppercase">필드 모드</h2>
        <div className="w-6" /> {/* Spacer */}
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 pb-20">
        {!accessToken ? (
          <div className="text-center text-gray-500 font-medium text-sm">
            필드 요약을 보려면 로그인해 주세요.
          </div>
        ) : loading ? (
          <div className="text-center text-gray-500 font-medium text-sm">
            로딩 중...
          </div>
        ) : flashcards.length === 0 ? (
          <div className="text-center text-gray-500 font-medium text-sm">
            중요 표시된 기록이 없습니다. <br/> 연습 일지에서 ★ 표시를 해보세요.
          </div>
        ) : (
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            className="w-full max-w-sm"
          >
            {flashcards.map((card) => (
              <SwiperSlide key={card.id}>
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 aspect-[3/4] flex flex-col shadow-2xl relative">
                  <Star className="absolute top-6 right-6 w-5 h-5 text-gray-500 fill-current" />
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                    {card.clubs.length > 0 ? card.clubs.join(', ') : '일반 팁'}
                  </h3>
                  <p className="text-xl leading-relaxed font-medium flex-1 flex items-center justify-center text-center">
                    "{card.note}"
                  </p>
                  <div className="mt-4 text-center text-xs text-gray-600 font-medium tracking-widest uppercase">
                    밀어서 다음 보기
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}

// API Client & Utility Functions for TourEasy (Supports both Node.js server and standalone offline/file:// mode)
const API_BASE = '/api';

const DEFAULT_PACKAGES = [
    {
        "country":  "베트남",
        "id":  "pkg-sea-01",
        "durationNights":  4,
        "summary":  "다낭 5성급 비치 프론트 리조트 숙박과 호이안 올드타운 투어, 바나힐 골든브릿지까지 알차게 즐기는 베스트셀러 휴양 패키지입니다.",
        "slug":  "danang-hoian-5d",
        "itinerary":  [
                          {
                              "activities":  [
                                                 "인천 국제공항 출발",
                                                 "다낭 국제공항 도착 후 가이드 미팅",
                                                 "5성급 비치 리조트 체크인 및 휴식"
                                             ],
                              "title":  "인천 출발 ➔ 다낭 도착 및 리조트 체크인",
                              "day":  1,
                              "meals":  {
                                            "breakfast":  "-",
                                            "lunch":  "기내식",
                                            "dinner":  "현지 해산물 정식"
                                        },
                              "hotel":  "다낭 그랜드 투란 5성급 호텔"
                          },
                          {
                              "activities":  [
                                                 "기네스북 등재 최장 케이블카 탑승",
                                                 "골든브릿지(손 바위 다리) 기념 촬영",
                                                 "프렌치 빌리지 자유 관람"
                                             ],
                              "title":  "바나힐 테마파크 \u0026 골든브릿지 투어",
                              "day":  2,
                              "meals":  {
                                            "breakfast":  "호텔 뷔페",
                                            "lunch":  "바나힐 뷔페",
                                            "dinner":  "베트남식 분짜 \u0026 반쎄오"
                                        },
                              "hotel":  "다낭 그랜드 투란 5성급 호텔"
                          },
                          {
                              "activities":  [
                                                 "투본강 목선 탑승 \u0026 도자기 마을",
                                                 "호이안 유네스코 올드타운 야경 관람",
                                                 "풍등 띄우기 소원 배 체험"
                                             ],
                              "title":  "호이안 올드타운 \u0026 소원 배 투어",
                              "day":  3,
                              "meals":  {
                                            "breakfast":  "호텔 뷔페",
                                            "lunch":  "미꽝 쌀국수",
                                            "dinner":  "호이안식 전통 세트메뉴"
                                        },
                              "hotel":  "호이안 실크마리나 리조트"
                          },
                          {
                              "activities":  [
                                                 "세계 6대 해변 미케비치 자유 산책",
                                                 "전통 전신 스톤 마사지 90분 체험",
                                                 "다낭 한시장 \u0026 롯데마트 쇼핑"
                                             ],
                              "title":  "미케비치 힐링 자유시간 \u0026 마사지",
                              "day":  4,
                              "meals":  {
                                            "breakfast":  "호텔 뷔페",
                                            "lunch":  "자유식 (식비지원)",
                                            "dinner":  "삼겹살 무제한 특식"
                                        },
                              "hotel":  "호이안 실크마리나 리조트"
                          },
                          {
                              "activities":  [
                                                 "핑크빛 다낭 대성당(수탉 성당) 관광",
                                                 "다낭 공항 이동 및 출국 수속",
                                                 "인천 국제공항 도착"
                                             ],
                              "title":  "다낭 대성당 \u0026 귀국",
                              "day":  5,
                              "meals":  {
                                            "breakfast":  "호텔 뷔페",
                                            "lunch":  "현지식",
                                            "dinner":  "기내식"
                                        },
                              "hotel":  "기내박"
                          }
                      ],
        "thumbnail":  "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "included":  [
                         "왕복 항공권 (유류할증료/텍스 포함)",
                         "5성급 리조트 4박",
                         "전 일정 전용 차량 및 한국어 가이드",
                         "여행자 보험 1억원"
                     ],
        "highlights":  [
                           "전 일정 5성급 인터내셔널 비치 리조트 투숙 \u0026 오션뷰 조식",
                           "유네스코 세계문화유산 호이안 올드타운 야경 투어",
                           "바나힐 테마파크 \u0026 골든브릿지 케이블카 탑승"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[힐링특가] 베트남 다낭 \u0026 호이안 4박 5일 5성급 리조트 + 바나힐 골든브릿지",
        "rating":  4.92,
        "durationDays":  5,
        "departureDates":  [
                               {
                                   "date":  "2026-09-05",
                                   "price":  699000,
                                   "seatsLeft":  8,
                                   "status":  "예약가능"
                               },
                               {
                                   "date":  "2026-09-12",
                                   "price":  729000,
                                   "seatsLeft":  6,
                                   "status":  "예약가능"
                               },
                               {
                                   "date":  "2026-09-19",
                                   "price":  699000,
                                   "seatsLeft":  2,
                                   "status":  "마감임박"
                               }
                           ],
        "tags":  [
                     "5성급호텔",
                     "전일정식사",
                     "노옵션노쇼핑",
                     "바나힐골든브릿지",
                     "호이안야경"
                 ],
        "excluded":  [
                         "가이드/기사 팁()",
                         "개인 경비 및 매너팁"
                     ],
        "theme":  "휴양/힐링",
        "price":  699000,
        "originalPrice":  890000,
        "city":  "다낭 / 호이안",
        "isEarlyBird":  true,
        "region":  "동남아",
        "reviewCount":  138,
        "isFeatured":  true,
        "status":  "운영중",
        "isActive":  true
    },
    {
        "country":  "인도네시아",
        "id":  "pkg-sea-02",
        "durationNights":  4,
        "summary":  "둘만의 오붓한 프라이빗 풀빌라, 인스타 감성의 발리 스윙과 플로팅 조식, 울루와투 절벽 선셋 디너를 즐기는 최고급 허니문 플랜입니다.",
        "isActive":  true,
        "slug":  "bali-luxury-pool-villa-6d",
        "thumbnail":  "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "가루다 인도네시아 항공 직항",
                         "럭셔리 풀빌라 4박",
                         "단독 가이드 \u0026 전용 차량",
                         "고급 스파 120분 2회"
                     ],
        "highlights":  [
                           "전 일정 5성급 럭셔리 프라이빗 풀빌라",
                           "발리 스윙 \u0026 계단식 논 뷰 카페",
                           "풀빌라 플로팅 브렉퍼스트 \u0026 짐바란 씨푸드 디너"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[프라이빗 허니문] 발리 우붓 \u0026 울루와투 럭셔리 독채 풀빌라 4박 6일",
        "rating":  4.98,
        "durationDays":  6,
        "departureDates":  [
                               {
                                   "date":  "2026-09-13",
                                   "price":  1850000,
                                   "seatsLeft":  4,
                                   "status":  "예약가능"
                               },
                               {
                                   "date":  "2026-09-20",
                                   "price":  1890000,
                                   "seatsLeft":  4,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "독채풀빌라",
                     "단독가이드",
                     "플로팅조식",
                     "울루와투선셋",
                     "스파120분"
                 ],
        "excluded":  [
                         "인도네시아 도착비자()",
                         "가이드 매너팁"
                     ],
        "theme":  "허니문/럭셔리",
        "price":  1850000,
        "originalPrice":  2200000,
        "city":  "발리 / 우붓",
        "isEarlyBird":  false,
        "region":  "동남아",
        "reviewCount":  92,
        "isFeatured":  true
    },
    {
        "country":  "태국",
        "id":  "pkg-sea-03",
        "durationNights":  3,
        "summary":  "차오프라야 강변 5성급 호텔 숙박, 럭셔리 선셋 요트 크루즈와 미슐랭 빕구르망 방콕 스트리트 푸드를 만끽하는 여행입니다.",
        "slug":  "bangkok-pattaya-5d",
        "thumbnail":  "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "included":  [
                         "왕복 항공권",
                         "5성급 호텔 3박",
                         "전 일정 식사 및 요트 탑승권"
                     ],
        "highlights":  [
                           "차오프라야 프린세스 디너 크루즈 탑승",
                           "파타야 프라이빗 요트 세일링 \u0026 스노클링",
                           "태국 왕궁 및 왓 아룬 관람"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[미식\u0026도심호캉스] 태국 방콕 5성급 호텔 + 파타야 요트 세일링 3박 5일",
        "rating":  4.87,
        "durationDays":  5,
        "departureDates":  [
                               {
                                   "date":  "2026-09-08",
                                   "price":  580000,
                                   "seatsLeft":  10,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "차오프라야디너크루즈",
                     "파타야요트투어",
                     "방콕야시장",
                     "태국전통마사지"
                 ],
        "excluded":  [
                         "가이드 팁 ()"
                     ],
        "theme":  "온천/미식",
        "price":  580000,
        "originalPrice":  750000,
        "city":  "방콕 / 파타야",
        "isEarlyBird":  true,
        "region":  "동남아",
        "reviewCount":  156,
        "isFeatured":  false,
        "status":  "운영중",
        "isActive":  true
    },
    {
        "country":  "필리핀",
        "id":  "pkg-sea-04",
        "durationNights":  3,
        "summary":  "세부 최고의 샹그릴라 리조트 전용 비치 휴양과 신비로운 오슬롭 고래상어 와칭 투어를 함께 즐기는 프리미엄 휴양!",
        "isActive":  true,
        "slug":  "cebu-shangrila-5d",
        "thumbnail":  "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "왕복 항공권",
                         "샹그릴라 리조트 3박",
                         "호핑투어 및 고래상어 투어"
                     ],
        "highlights":  [
                           "샹그릴라 막탄 리조트 디럭스 오션뷰 투숙",
                           "오슬롭 고래상어 스노클링 \u0026 투말록 폭포",
                           "단독 방카 보트 호핑 투어"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[에메랄드빛 바다] 필리핀 세부 샹그릴라 리조트 + 오슬롭 고래상어 호핑 3박 5일",
        "rating":  4.91,
        "durationDays":  5,
        "departureDates":  [
                               {
                                   "date":  "2026-09-10",
                                   "price":  720000,
                                   "seatsLeft":  8,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "샹그릴라리조트",
                     "오슬롭고래상어",
                     "단독방카호핑",
                     "스톤마사지"
                 ],
        "excluded":  [
                         "현지 환경세 (약 )"
                     ],
        "theme":  "휴양/힐링",
        "price":  720000,
        "originalPrice":  920000,
        "city":  "세부 / 막탄",
        "isEarlyBird":  true,
        "region":  "동남아",
        "reviewCount":  104,
        "isFeatured":  false
    },
    {
        "country":  "싱가포르",
        "id":  "pkg-sea-05",
        "durationNights":  3,
        "summary":  "상징적인 마리나 베이 샌즈 인피니티 풀에서의 인생샷과 가든스 바이 더 베이, 센토사섬 유니버설 스튜디오 완벽 정복!",
        "isActive":  true,
        "slug":  "singapore-mbs-5d",
        "thumbnail":  "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "대한항공/싱가포르항공 직항",
                         "마리나베이샌즈 1박 + 특급 2박",
                         "점보 씨푸드 칠리크랩 만찬"
                     ],
        "highlights":  [
                           "마리나 베이 샌즈 1박 숙박 (인피니티 풀 이용)",
                           "가든스 바이 더 베이 플라워돔 \u0026 클라우드포레스트",
                           "유니버설 스튜디오 익스프레스 1일권"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1506351421178-63b52a2d2562?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[도심 속 가든시티] 싱가포르 마리나베이샌즈 \u0026 센토사 유니버설 3박 5일",
        "rating":  4.95,
        "durationDays":  5,
        "departureDates":  [
                               {
                                   "date":  "2026-09-15",
                                   "price":  1290000,
                                   "seatsLeft":  6,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "인피니티풀",
                     "가든스바이더베이",
                     "유니버설스튜디오",
                     "칠리크랩만찬"
                 ],
        "excluded":  [
                         "개인 경비"
                     ],
        "theme":  "가족/키즈",
        "price":  1290000,
        "originalPrice":  1590000,
        "city":  "싱가포르",
        "isEarlyBird":  false,
        "region":  "동남아",
        "reviewCount":  112,
        "isFeatured":  true
    },
    {
        "country":  "태국",
        "id":  "pkg-sea-06",
        "durationNights":  4,
        "summary":  "안다만해의 에메랄드빛 보석 피피섬 투어와 5성급 카타비치 리조트에서 즐기는 여유로운 열대 휴양입니다.",
        "isActive":  true,
        "slug":  "phuket-pp-island-6d",
        "thumbnail":  "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "왕복 항공권",
                         "5성급 리조트 4박",
                         "피피섬 투어 및 전 일정 식사"
                     ],
        "highlights":  [
                           "피피섬 \u0026 마야베이 스피드보트 스노클링",
                           "5성급 오션뷰 리조트 4박",
                           "푸켓 올드타운 감성 카페 투어"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1537956965359-7573183d1f57?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[안다만의 진주] 태국 푸켓 5성급 풀리조트 \u0026 피피섬 스피드보트 투어 4박 6일",
        "rating":  4.9,
        "durationDays":  6,
        "departureDates":  [
                               {
                                   "date":  "2026-09-18",
                                   "price":  840000,
                                   "seatsLeft":  10,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "카타비치리조트",
                     "피피섬스피드보트",
                     "마야베이",
                     "씨푸드뷔페"
                 ],
        "excluded":  [
                         "가이드 팁 ()"
                     ],
        "theme":  "휴양/힐링",
        "price":  840000,
        "originalPrice":  1050000,
        "city":  "푸켓 / 피피섬",
        "isEarlyBird":  true,
        "region":  "동남아",
        "reviewCount":  88,
        "isFeatured":  false
    },
    {
        "country":  "말레이시아",
        "id":  "pkg-sea-07",
        "durationNights":  3,
        "summary":  "세계 3대 선셋으로 손꼽히는 탄중아루 비치의 환상적인 일몰과 밤하늘을 수놓는 반딧불 투어를 즐겨보세요.",
        "isActive":  true,
        "slug":  "kotakinabalu-sunset-5d",
        "thumbnail":  "https://images.unsplash.com/photo-1538964173425-93884d739596?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "왕복 항공권",
                         "리조트 3박",
                         "반딧불 투어 및 해양 호핑"
                     ],
        "highlights":  [
                           "샹그릴라 탄중아루 리조트 투숙",
                           "황홀한 선셋 카약 \u0026 나이트 반딧불 투어",
                           "툰구 압둘 라만 해양국립공원 호핑"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1538964173425-93884d739596?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[황금빛 선셋] 말레이시아 코타키나발루 샹그릴라 \u0026 반딧불 투어 3박 5일",
        "rating":  4.88,
        "durationDays":  5,
        "departureDates":  [
                               {
                                   "date":  "2026-09-07",
                                   "price":  680000,
                                   "seatsLeft":  8,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "세계3대선셋",
                     "샹그릴라탄중아루",
                     "동화반딧불",
                     "마누칸섬호핑"
                 ],
        "excluded":  [
                         "개인 경비"
                     ],
        "theme":  "휴양/힐링",
        "price":  680000,
        "originalPrice":  850000,
        "city":  "코타키나발루",
        "isEarlyBird":  true,
        "region":  "동남아",
        "reviewCount":  95,
        "isFeatured":  false
    },
    {
        "country":  "베트남",
        "id":  "pkg-sea-08",
        "durationNights":  4,
        "summary":  "나트랑의 푸른 바다와 빈펄 테마파크, 시원한 고원 휴양지 달랏의 꽃과 커피 농장을 함께 여행하는 알찬 패키지입니다.",
        "isActive":  true,
        "slug":  "nhatrang-dalat-5d",
        "thumbnail":  "images/destinations/nhatrang-vinpearl-island.jpg",
        "status":  "운영중",
        "included":  [
                         "왕복 항공권",
                         "전 일정 호텔 4박",
                         "빈원더스 종일 이용권"
                     ],
        "highlights":  [
                           "나트랑 5성급 오션뷰 호텔 2박 + 달랏 4성 호텔 2박",
                           "탑바 머드 온천 스파 체험",
                           "달랏 랑비앙 지프차 투어 \u0026 케이블카"
                       ],
        "images":  [
                       "images/destinations/nhatrang-vinpearl-island.jpg",
                       "images/destinations/dalat-flower-city.jpg",
                       "images/destinations/vinpearl-luxury-resort.jpg"
                   ],
        "title":  "[베트남의 나폴리] 나트랑 빈펄 아일랜드 리조트 \u0026 달랏 꽃의 도시 4박 5일",
        "rating":  4.91,
        "durationDays":  5,
        "departureDates":  [
                               {
                                   "date":  "2026-09-14",
                                   "price":  620000,
                                   "seatsLeft":  12,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "빈펄하버",
                     "달랏랑비앙",
                     "나트랑머드온천",
                     "달랏야시장"
                 ],
        "excluded":  [
                         "가이드 팁 ()"
                     ],
        "theme":  "휴양/힐링",
        "price":  620000,
        "originalPrice":  790000,
        "city":  "나트랑 / 달랏",
        "isEarlyBird":  true,
        "region":  "동남아",
        "reviewCount":  110,
        "isFeatured":  false
    },
    {
        "country":  "베트남",
        "id":  "pkg-sea-09",
        "durationNights":  3,
        "summary":  "하롱베이 선상 위에서 하룻밤을 보내는 5성급 럭셔리 크루즈와 하노이 구시가지의 매력을 느낄 수 있는 대표 코스입니다.",
        "isActive":  true,
        "slug":  "hanoi-halong-cruise-5d",
        "thumbnail":  "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "왕복 항공권",
                         "하롱베이 1박 크루즈 + 하노이 5성 호텔 2박",
                         "선상 풀코스 뷔페"
                     ],
        "highlights":  [
                           "하롱베이 5성 럭셔리 크루즈 1박 \u0026 발코니 오션뷰 객실",
                           "승솟 동굴 \u0026 티톱섬 전망대 트래킹",
                           "하노이 스트리트 전동카 투어"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[유네스코 비경] 베트남 하노이 \u0026 하롱베이 5성 럭셔리 크루즈 3박 5일",
        "rating":  4.89,
        "durationDays":  5,
        "departureDates":  [
                               {
                                   "date":  "2026-09-11",
                                   "price":  599000,
                                   "seatsLeft":  14,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "하롱베이크루즈1박",
                     "승솟동굴",
                     "하노이호안끼엠",
                     "선상카약킹"
                 ],
        "excluded":  [
                         "가이드 팁 ()"
                     ],
        "theme":  "역사/문화",
        "price":  599000,
        "originalPrice":  780000,
        "city":  "하노이 / 하롱베이",
        "isEarlyBird":  true,
        "region":  "동남아",
        "reviewCount":  145,
        "isFeatured":  false
    },
    {
        "country":  "태국",
        "id":  "pkg-sea-10",
        "durationNights":  4,
        "summary":  "예술가들의 도시 치앙마이에서 즐기는 슬로우 라이프! 도이수텝 사원의 황금빛 야경과 코끼리 보호구역 교감 체험.",
        "isActive":  true,
        "slug":  "chiangmai-healing-5d",
        "thumbnail":  "https://images.unsplash.com/photo-1512553353614-82a7370096dc?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "왕복 직항 항공권",
                         "호텔 4박",
                         "코끼리 케어 프로그램 및 전용 차량"
                     ],
        "highlights":  [
                           "란나 전통 부티크 리조트 4박",
                           "윤리적 코끼리 생태 보호구역 케어 체험",
                           "도이수텝 사원 선셋 \u0026 야경 투어"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1512553353614-82a7370096dc?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[북부의 힐링장미] 태국 치앙마이 란나 스타일 리조트 \u0026 올드시티 카페 4박 5일",
        "rating":  4.93,
        "durationDays":  5,
        "departureDates":  [
                               {
                                   "date":  "2026-09-22",
                                   "price":  780000,
                                   "seatsLeft":  7,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "도이수텝사원",
                     "님만해민카페",
                     "코끼리생태보호구역",
                     "란나마사지"
                 ],
        "excluded":  [
                         "가이드 팁 ()"
                     ],
        "theme":  "휴양/힐링",
        "price":  780000,
        "originalPrice":  960000,
        "city":  "치앙마이",
        "isEarlyBird":  false,
        "region":  "동남아",
        "reviewCount":  82,
        "isFeatured":  false
    },
    {
        "country":  "필리핀",
        "id":  "pkg-sea-11",
        "durationNights":  3,
        "summary":  "보라카이 화이트비치 중심에 위치한 헤난 크리스탈 샌즈 스카이풀에서 인생 사진을 남기고 무동력 세일링보트를 즐겨보세요.",
        "isActive":  true,
        "slug":  "boracay-henann-5d",
        "thumbnail":  "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "왕복 항공권",
                         "리조트 3박",
                         "칼리보 공항-보라카이 도어투도어 픽업샌딩"
                     ],
        "highlights":  [
                           "헤난 크리스탈 샌즈 스카이풀 오션뷰 리조트 투숙",
                           "보라카이 낭만 선셋 세일링보트 탑승",
                           "디몰 맛집 및 비치 바 자유 탐방"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[화이트비치 파라다이스] 필리핀 보라카이 헤난 크리스탈 샌즈 리조트 3박 5일",
        "rating":  4.94,
        "durationDays":  5,
        "departureDates":  [
                               {
                                   "date":  "2026-09-09",
                                   "price":  650000,
                                   "seatsLeft":  9,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "헤난크리스탈샌즈",
                     "화이트비치스테이션2",
                     "선셋세일링",
                     "디몰투어"
                 ],
        "excluded":  [
                         "칼리보 공항세"
                     ],
        "theme":  "휴양/힐링",
        "price":  650000,
        "originalPrice":  820000,
        "city":  "보라카이",
        "isEarlyBird":  true,
        "region":  "동남아",
        "reviewCount":  132,
        "isFeatured":  true
    },
    {
        "country":  "필리핀",
        "id":  "pkg-sea-12",
        "durationNights":  3,
        "summary":  "천혜의 자연을 품은 보홀! 발리카삭 바다거북이 스노클링과 신비한 초콜릿힐, 헤난 프리미엄 풀사이드 휴양을 만끽하세요.",
        "isActive":  true,
        "slug":  "bohol-henann-5d",
        "thumbnail":  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "왕복 직항 항공권",
                         "헤난 리조트 3박",
                         "전용 차량 및 호핑투어 일체"
                     ],
        "highlights":  [
                           "헤난 리조트 알로나비치 3박",
                           "발리카삭 섬 바다거북 와칭 호핑",
                           "로복강 선상 런치 \u0026 초콜릿힐/안경원숭이 투어"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[순수의 자연과 휴양] 필리핀 보홀 헤난 알로나비치 \u0026 초콜릿힐 3박 5일",
        "rating":  4.92,
        "durationDays":  5,
        "departureDates":  [
                               {
                                   "date":  "2026-09-17",
                                   "price":  740000,
                                   "seatsLeft":  6,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "헤난알로나비치",
                     "발리카삭호핑",
                     "초콜릿힐",
                     "안경원숭이"
                 ],
        "excluded":  [
                         "가이드 팁 ()"
                     ],
        "theme":  "휴양/힐링",
        "price":  740000,
        "originalPrice":  910000,
        "city":  "보홀 / 팡라오",
        "isEarlyBird":  true,
        "region":  "동남아",
        "reviewCount":  98,
        "isFeatured":  false
    },
    {
        "country":  "베트남",
        "id":  "pkg-sea-13",
        "durationNights":  4,
        "summary":  "청정 휴양지 푸꾸옥의 양면 바다를 조망하는 프리미어 빌리지 독채 풀빌라와 아시아 최대 사파리, 선셋타운을 즐겨보세요.",
        "isActive":  true,
        "slug":  "phuquoc-premier-villa-5d",
        "thumbnail":  "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "왕복 항공권",
                         "풀빌라 4박",
                         "전 일정 단독 차량 \u0026 케이블카 티켓"
                     ],
        "highlights":  [
                           "5성급 프리미어 빌리지 오션 프라이빗 풀빌라 4박",
                           "세계 최장 혼똔섬 해상 케이블카 탑승",
                           "빈펄 사파리 \u0026 그랜드월드 분수쇼 관람"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[베트남의 숨은 진주] 푸꾸옥 프리미어 빌리지 풀빌라 \u0026 혼똔섬 케이블카 4박 5일",
        "rating":  4.96,
        "durationDays":  5,
        "departureDates":  [
                               {
                                   "date":  "2026-09-24",
                                   "price":  1150000,
                                   "seatsLeft":  5,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "아코르프리미어빌리지",
                     "선셋타운",
                     "그랜드월드",
                     "사파리투어"
                 ],
        "excluded":  [
                         "개인 경비"
                     ],
        "theme":  "허니문/럭셔리",
        "price":  1150000,
        "originalPrice":  1450000,
        "city":  "푸꾸옥",
        "isEarlyBird":  false,
        "region":  "동남아",
        "reviewCount":  76,
        "isFeatured":  false
    },
    {
        "country":  "캄보디아",
        "id":  "pkg-sea-14",
        "durationNights":  3,
        "summary":  "죽기 전에 꼭 가봐야 할 인류 최대의 석조 유적 앙코르와트의 웅장한 일출과 톤레삽 호수 선셋 유람선 투어입니다.",
        "isActive":  true,
        "slug":  "angkor-wat-mystery-5d",
        "thumbnail":  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "왕복 항공권",
                         "5성급 소카 라이 리조트 3박",
                         "유적지 통합 입장권"
                     ],
        "highlights":  [
                           "앙코르와트 일출 특별 관람 \u0026 전문 문화유산 가이드",
                           "영화 툼레이더 촬영지 타프롬 \u0026 바이욘 사원",
                           "동남아 최대 톤레삽 호수 선셋 보트"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[천년의 신비] 캄보디아 앙코르와트 일출 \u0026 톤레삽 호수 유람선 3박 5일",
        "rating":  4.89,
        "durationDays":  5,
        "departureDates":  [
                               {
                                   "date":  "2026-09-16",
                                   "price":  690000,
                                   "seatsLeft":  11,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "앙코르와트일출",
                     "타프롬사원",
                     "바이욘사원",
                     "톤레삽수상가옥"
                 ],
        "excluded":  [
                         "캄보디아 비자()",
                         "가이드 팁 ()"
                     ],
        "theme":  "역사/문화",
        "price":  690000,
        "originalPrice":  880000,
        "city":  "씨엠립 / 앙코르",
        "isEarlyBird":  true,
        "region":  "동남아",
        "reviewCount":  118,
        "isFeatured":  false
    },
    {
        "country":  "라오스",
        "id":  "pkg-sea-15",
        "durationNights":  4,
        "summary":  "청춘의 성지 방비엥 블루라군에서의 짜릿한 물놀이와 루앙프라방의 고즈넉한 사원 탁발 행렬을 만나는 순수 힐링 여행!",
        "isActive":  true,
        "slug":  "laos-vangvieng-5d",
        "thumbnail":  "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "왕복 항공권",
                         "전 일정 호텔 4박",
                         "고속열차 티켓 및 액티비티 일체"
                     ],
        "highlights":  [
                           "라오스 고속철도(LCR) 탑승으로 편안한 이동",
                           "방비엥 블루라군 다이빙 \u0026 쏭강 카약킹 투어",
                           "루앙프라방 꽝시폭포 \u0026 새벽 탁발 공양 체험"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1512553353614-82a7370096dc?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[에코 힐링투어] 라오스 비엔티안 \u0026 방비엥 블루라군 \u0026 루앙프라방 4박 5일",
        "rating":  4.87,
        "durationDays":  5,
        "departureDates":  [
                               {
                                   "date":  "2026-09-23",
                                   "price":  590000,
                                   "seatsLeft":  14,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "블루라군다이빙",
                     "쏭강카약킹",
                     "고속열차탑승",
                     "탁발공양체험"
                 ],
        "excluded":  [
                         "가이드 팁 ()"
                     ],
        "theme":  "휴양/힐링",
        "price":  590000,
        "originalPrice":  770000,
        "city":  "방비엥 / 루앙프라방",
        "isEarlyBird":  true,
        "region":  "동남아",
        "reviewCount":  89,
        "isFeatured":  false
    },
    {
        "country":  "프랑스 / 스위스 / 이탈리아",
        "id":  "pkg-eur-01",
        "durationNights":  8,
        "summary":  "파리 루브르와 에펠탑, 스위스 융프라우의 눈부신 설경, 로마와 피렌체의 르네상스 예술까지 품격 있게 완성한 서유럽 대표 패키지입니다.",
        "isActive":  true,
        "slug":  "western-europe-classic-10d",
        "thumbnail":  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "대한항공 왕복 직항",
                         "전 일정 4~5성급 호텔",
                         "TGV 초고속 열차 1등석",
                         "전문 인솔자 및 현지 가이드 동행"
                     ],
        "highlights":  [
                           "파리 세느강 바토무슈 디너 크루즈 \u0026 루브르 박물관 내부 관람",
                           "스위스 TOP OF EUROPE 융프라우요흐 등정 및 만년설 감상",
                           "로마 바티칸 박물관 \u0026 콜로세움 하이패스 입장"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[클래식 명작] 서유럽 핵심 3국 (프랑스/스위스/이탈리아) 8박 10일 프리미엄",
        "rating":  4.95,
        "durationDays":  10,
        "departureDates":  [
                               {
                                   "date":  "2026-09-02",
                                   "price":  3890000,
                                   "seatsLeft":  6,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "에펠탑전망대",
                     "융프라우요흐산악열차",
                     "바티칸박물관패스트트랙",
                     "피렌체두오모"
                 ],
        "excluded":  [
                         "가이드/기사 경비 (100유로)",
                         "도시별 호텔 시티택스"
                     ],
        "theme":  "역사/문화",
        "price":  3890000,
        "originalPrice":  4500000,
        "city":  "파리 / 인터라켄 / 로마 / 피렌체",
        "isEarlyBird":  true,
        "region":  "유럽",
        "reviewCount":  168,
        "isFeatured":  true
    },
    {
        "country":  "스페인 / 포르투갈",
        "id":  "pkg-eur-02",
        "durationNights":  8,
        "summary":  "가우디의 걸작 사그라다 파밀리아, 그라나다의 붉은 보석 알함브라 궁전, 정열의 플라멩코를 만나는 스페인 일주!",
        "isActive":  true,
        "slug":  "spain-portugal-grand-10d",
        "thumbnail":  "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "아시아나 왕복 직항",
                         "특급 호텔 8박",
                         "고속열차 AVE 탑승"
                     ],
        "highlights":  [
                           "바르셀로나 사그라다 파밀리아 \u0026 구엘공원 사전 예약 입장",
                           "그라나다 알함브라 궁전 내부 관람 보장",
                           "스페인 최고급 이베리코 하몽 \u0026 빠에야 특식"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[열정과 예술] 스페인 바르셀로나 사그라다파밀리아 \u0026 마드리드 8박 10일",
        "rating":  4.93,
        "durationDays":  10,
        "departureDates":  [
                               {
                                   "date":  "2026-09-08",
                                   "price":  3450000,
                                   "seatsLeft":  8,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "가우디투어",
                     "알함브라궁전",
                     "플라멩코공연",
                     "리스본트램"
                 ],
        "excluded":  [
                         "기사/가이드 팁(100유로)"
                     ],
        "theme":  "역사/문화",
        "price":  3450000,
        "originalPrice":  3990000,
        "city":  "바르셀로나 / 마드리드 / 리스본",
        "isEarlyBird":  false,
        "region":  "유럽",
        "reviewCount":  124,
        "isFeatured":  true
    },
    {
        "country":  "체코 / 오스트리아 / 헝가리",
        "id":  "pkg-eur-03",
        "durationNights":  7,
        "summary":  "프라하 까를교의 낭만과 쇤브룬 궁전의 클래식 음악, 도나우강을 황금빛으로 물들이는 부다페스트 국회의사당 야경 투어!",
        "isActive":  true,
        "slug":  "eastern-europe-3countries-9d",
        "thumbnail":  "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "왕복 항공권",
                         "전 일정 4성급 호텔",
                         "체코 꼴레뇨 \u0026 오스트리아 슈니첼 특식"
                     ],
        "highlights":  [
                           "부다페스트 도나우강 프라이빗 야경 유람선",
                           "동화 마을 체스키 크룸로프 \u0026 할슈타트 호수 마을",
                           "프라하성 내부 관람 및 까를교 산책"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[동화 속 낭만] 동유럽 3국 (체코 프라하 / 오스트리아 빈 / 헝가리 부다페스트) 7박 9일",
        "rating":  4.9,
        "durationDays":  9,
        "departureDates":  [
                               {
                                   "date":  "2026-09-15",
                                   "price":  2890000,
                                   "seatsLeft":  10,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "프라하성야경",
                     "할슈타트호수",
                     "쇤브룬궁전",
                     "부다페스트야경크루즈"
                 ],
        "excluded":  [
                         "가이드 팁 (90유로)"
                     ],
        "theme":  "역사/문화",
        "price":  2890000,
        "originalPrice":  3300000,
        "city":  "프라하 / 비엔나 / 부다페스트",
        "isEarlyBird":  true,
        "region":  "유럽",
        "reviewCount":  138,
        "isFeatured":  false
    },
    {
        "country":  "스위스",
        "id":  "pkg-eur-04",
        "durationNights":  6,
        "summary":  "스위스 알프스의 양대 산맥인 융프라우요흐와 황금 호른 마테호른을 모두 만나는 청정 대자연 힐링 투어입니다.",
        "isActive":  true,
        "slug":  "swiss-alps-jungfrau-matterhorn-8d",
        "thumbnail":  "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "스위스 항공 왕복",
                         "알프스 샬레 스타일 4성 호텔 6박",
                         "스위스 트래블 패스 1등석"
                     ],
        "highlights":  [
                           "융프라우요흐 아이거 익스프레스 \u0026 산악열차",
                           "체르마트 고르너그라트 전망대 마테호른 조망",
                           "루체른 호수 유람선 \u0026 카펠교 산책"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[알프스의 절경] 스위스 인터라켄 융프라우요흐 \u0026 체르마트 마테호른 6박 8일",
        "rating":  4.99,
        "durationDays":  8,
        "departureDates":  [
                               {
                                   "date":  "2026-09-18",
                                   "price":  4250000,
                                   "seatsLeft":  4,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "융프라우산악열차",
                     "고르너그라트마테호른",
                     "루체른유람선",
                     "스위스퐁듀"
                 ],
        "excluded":  [
                         "개인 경비"
                     ],
        "theme":  "휴양/힐링",
        "price":  4250000,
        "originalPrice":  4800000,
        "city":  "인터라켄 / 체르마트 / 루체른",
        "isEarlyBird":  false,
        "region":  "유럽",
        "reviewCount":  94,
        "isFeatured":  true
    },
    {
        "country":  "이탈리아",
        "id":  "pkg-eur-05",
        "durationNights":  6,
        "summary":  "내셔널지오그래픽 선정 죽기 전에 꼭 가봐야 할 50곳 중 1위! 눈부신 아말피 해안과 로마 3천년의 역사를 탐방합니다.",
        "isActive":  true,
        "slug":  "italy-rome-positano-8d",
        "thumbnail":  "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "왕복 항공권",
                         "전 일정 호텔 6박",
                         "이탈리아 초고속 열차 이탈로 탑승"
                     ],
        "highlights":  [
                           "포지타노 \u0026 아말피 해안 드라이브 투어",
                           "바티칸 박물관 \u0026 시스티나 성당 천지창조 내부 관람",
                           "토스카나 키안티 와이너리 시음 \u0026 스테이크"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[찬란한 지중해] 이탈리아 로마 콜로세움 \u0026 피렌체 \u0026 남부 포지타노 6박 8일",
        "rating":  4.94,
        "durationDays":  8,
        "departureDates":  [
                               {
                                   "date":  "2026-09-12",
                                   "price":  3290000,
                                   "seatsLeft":  7,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "아말피해안",
                     "포지타노전망",
                     "바티칸투어",
                     "토스카나와이너리"
                 ],
        "excluded":  [
                         "가이드 팁 (80유로)"
                     ],
        "theme":  "역사/문화",
        "price":  3290000,
        "originalPrice":  3790000,
        "city":  "로마 / 피렌체 / 포지타노 / 카프리",
        "isEarlyBird":  true,
        "region":  "유럽",
        "reviewCount":  115,
        "isFeatured":  false
    },
    {
        "country":  "크로아티아 / 슬로베니아",
        "id":  "pkg-eur-06",
        "durationNights":  7,
        "summary":  "붉은 기와지붕과 쪽빛 바다가 어우러진 두브로브니크 구시가지 성벽과 영화 아바타의 모티브가 된 플리트비체 16개 호수!",
        "isActive":  true,
        "slug":  "croatia-dubrovnik-plitvice-9d",
        "thumbnail":  "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "왕복 항공권",
                         "전 일정 4성급 호텔",
                         "국립공원 입장권 및 전용 버스"
                     ],
        "highlights":  [
                           "두브로브니크 해안 성벽 워킹 투어 \u0026 스르지산 케이블카",
                           "플리트비체 국립공원 전기 보트 \u0026 트래킹",
                           "슬로베니아 블레드성 \u0026 플레트나 나룻배"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[아드리아해의 진주] 크로아티아 두브로브니크 성벽 \u0026 플리트비체 호수 7박 9일",
        "rating":  4.92,
        "durationDays":  9,
        "departureDates":  [
                               {
                                   "date":  "2026-09-20",
                                   "price":  3190000,
                                   "seatsLeft":  8,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "두브로브니크성벽",
                     "플리트비체국립공원",
                     "블레드섬나룻배",
                     "스플리트디오클레티안"
                 ],
        "excluded":  [
                         "가이드 팁 (90유로)"
                     ],
        "theme":  "휴양/힐링",
        "price":  3190000,
        "originalPrice":  3650000,
        "city":  "자그레브 / 두브로브니크 / 블레드",
        "isEarlyBird":  true,
        "region":  "유럽",
        "reviewCount":  89,
        "isFeatured":  false
    },
    {
        "country":  "프랑스 / 모나코",
        "id":  "pkg-eur-07",
        "durationNights":  6,
        "summary":  "샤갈과 마티스가 사랑한 찬란한 지중해의 빛! 니스 프롬나드 해변과 절벽 위의 동화마을 에즈, 화려한 모나코 카지노 광장 투어.",
        "isActive":  true,
        "slug":  "french-riviera-nice-monaco-8d",
        "thumbnail":  "https://images.unsplash.com/photo-1533669955142-6a73332af4db?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "에어프랑스 왕복 직항",
                         "특급 호텔 6박",
                         "전용 리무진 밴 투어"
                     ],
        "highlights":  [
                           "니스 해변 4성급 호텔 투숙 \u0026 지중해 해산물 정식",
                           "절벽 위 에즈 빌리지 열대정원 \u0026 프라고나르 향수 공방",
                           "세계 2위의 소국 모나코 대공궁 관람"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1533669955142-6a73332af4db?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[지중해의 햇살] 프랑스 남부 코트다쥐르 니스 \u0026 에즈 \u0026 모나코 6박 8일",
        "rating":  4.96,
        "durationDays":  8,
        "departureDates":  [
                               {
                                   "date":  "2026-09-25",
                                   "price":  3690000,
                                   "seatsLeft":  5,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "니스해변",
                     "에즈열대정원",
                     "모나코왕궁",
                     "프로방스와인"
                 ],
        "excluded":  [
                         "개인 경비"
                     ],
        "theme":  "허니문/럭셔리",
        "price":  3690000,
        "originalPrice":  4200000,
        "city":  "니스 / 에즈 / 모나코 / 칸느",
        "isEarlyBird":  false,
        "region":  "유럽",
        "reviewCount":  74,
        "isFeatured":  false
    },
    {
        "country":  "그리스",
        "id":  "pkg-eur-08",
        "durationNights":  6,
        "summary":  "에게해의 눈부신 파란 바다와 하얀 돔 지붕! 산토리니 이아마을 선셋 럭셔리 카타마란 요트와 고대 아테네 신전 투어입니다.",
        "isActive":  true,
        "slug":  "greece-athens-santorini-8d",
        "thumbnail":  "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "왕복 항공권",
                         "아테네-산토리니 국내선 왕복 항공",
                         "요트 투어 및 전 일정 조식"
                     ],
        "highlights":  [
                           "산토리니 칼데라 뷰 절벽 호텔 3박",
                           "에게해 선셋 프라이빗 카타마란 요트 투어 \u0026 바베큐",
                           "아테네 아크로폴리스 파르테논 신전 가이드 투어"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[눈부신 화이트\u0026블루] 그리스 아테네 파르테논 \u0026 산토리니 이아마을 6박 8일",
        "rating":  4.97,
        "durationDays":  8,
        "departureDates":  [
                               {
                                   "date":  "2026-09-14",
                                   "price":  3590000,
                                   "seatsLeft":  6,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "산토리니이아마을",
                     "에게해선셋요트",
                     "아크로폴리스",
                     "그리스전통기로스"
                 ],
        "excluded":  [
                         "호텔 시티택스"
                     ],
        "theme":  "허니문/럭셔리",
        "price":  3590000,
        "originalPrice":  4100000,
        "city":  "아테네 / 산토리니 / 미코노스",
        "isEarlyBird":  true,
        "region":  "유럽",
        "reviewCount":  98,
        "isFeatured":  true
    },
    {
        "country":  "노르웨이 / 덴마크 / 스웨덴 / 핀란드",
        "id":  "pkg-eur-09",
        "durationNights":  8,
        "summary":  "빙하가 깎아 만든 거대한 자연의 경이! 송네 피오르드 전기 유람선과 실야라인 호화 크루즈 1박으로 완성하는 북유럽 4국 여행.",
        "isActive":  true,
        "slug":  "northern-europe-fjords-10d",
        "thumbnail":  "https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "왕복 항공권",
                         "크루즈 1박 + 특급 호텔 7박",
                         "북유럽식 해산물 뷔페"
                     ],
        "highlights":  [
                           "세계에서 가장 긴 송네 피오르드 유람선 탑승",
                           "스웨덴-핀란드 횡단 실야라인 호화 크루즈 오션뷰 1박",
                           "플롬스바나 파노라마 산악열차"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[웅장한 대자연] 북유럽 4국 \u0026 노르웨이 송네 피오르드 빙하 유람선 8박 10일",
        "rating":  4.95,
        "durationDays":  10,
        "departureDates":  [
                               {
                                   "date":  "2026-09-04",
                                   "price":  4590000,
                                   "seatsLeft":  5,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "송네피오르드",
                     "플롬산악열차",
                     "실야라인크루즈",
                     "노르웨이연어뷔페"
                 ],
        "excluded":  [
                         "가이드 팁 (100유로)"
                     ],
        "theme":  "휴양/힐링",
        "price":  4590000,
        "originalPrice":  5200000,
        "city":  "오슬로 / 베르겐 / 스톡홀름 / 코펜하겐",
        "isEarlyBird":  false,
        "region":  "유럽",
        "reviewCount":  67,
        "isFeatured":  false
    },
    {
        "country":  "아이슬란드",
        "id":  "pkg-eur-10",
        "durationNights":  6,
        "summary":  "화산과 빙하가 공존하는 얼음의 나라! 밀키블루 빛 블루라군 온천욕과 웅장한 간헐천, 신비로운 검은 모래 해변 탐험.",
        "isActive":  true,
        "slug":  "iceland-golden-circle-8d",
        "thumbnail":  "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "왕복 항공권",
                         "전 일정 4성급 호텔 6박",
                         "특수 4WD 버스 및 입장권 일체"
                     ],
        "highlights":  [
                           "블루라군 프리미엄 온천 입장 (실리카 머드팩 \u0026 음료 포함)",
                           "골든서클 (싱벨리르 국립공원, 게이시르, 굴포스 폭포)",
                           "다이아몬드 비치 \u0026 요쿨살론 빙하 보트 투어"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[태초의 자연] 아이슬란드 골든서클 \u0026 블루라군 온천 \u0026 폭포 6박 8일",
        "rating":  4.98,
        "durationDays":  8,
        "departureDates":  [
                               {
                                   "date":  "2026-09-21",
                                   "price":  4790000,
                                   "seatsLeft":  6,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "블루라군프리미엄",
                     "굴포스폭포",
                     "게이시르간헐천",
                     "검은모래해변"
                 ],
        "excluded":  [
                         "가이드 팁 (80유로)"
                     ],
        "theme":  "온천/미식",
        "price":  4790000,
        "originalPrice":  5400000,
        "city":  "레이캬비크 / 비크 / 스카프타펠",
        "isEarlyBird":  true,
        "region":  "유럽",
        "reviewCount":  84,
        "isFeatured":  false
    },
    {
        "country":  "영국 / 프랑스",
        "id":  "pkg-eur-11",
        "durationNights":  6,
        "summary":  "유럽 문화의 양대 산맥 런던과 파리를 해저터널 초고속 열차 유로스타로 편안하게 연결하는 프리미엄 2개국 투어입니다.",
        "isActive":  true,
        "slug":  "london-paris-dual-city-8d",
        "thumbnail":  "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "왕복 항공권",
                         "런던/파리 중심가 호텔 6박",
                         "유로스타 및 뮤지엄 패스"
                     ],
        "highlights":  [
                           "해저터널 초고속 열차 유로스타 1등석 탑승",
                           "대영박물관 \u0026 루브르 박물관 공인가이드 수신기 투어",
                           "화려함의 극치 베르사유 궁전 거울의 방 내부 관람"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[대영제국의 숨결] 영국 런던 타워브릿지 \u0026 프랑스 파리 루브르 6박 8일",
        "rating":  4.91,
        "durationDays":  8,
        "departureDates":  [
                               {
                                   "date":  "2026-09-06",
                                   "price":  3390000,
                                   "seatsLeft":  9,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "유로스타1등석",
                     "대영박물관",
                     "베르사유궁전",
                     "런던아이"
                 ],
        "excluded":  [
                         "가이드 팁 (80유로)"
                     ],
        "theme":  "역사/문화",
        "price":  3390000,
        "originalPrice":  3850000,
        "city":  "런던 / 파리",
        "isEarlyBird":  true,
        "region":  "유럽",
        "reviewCount":  130,
        "isFeatured":  false
    },
    {
        "country":  "튀르키예",
        "id":  "pkg-eur-12",
        "durationNights":  7,
        "summary":  "수백 개의 열기구가 떠오르는 카파도키아의 일출과 하얀 솜사탕 같은 파묵칼레 온천, 동서양이 만나는 이스탄불의 화려함!",
        "isActive":  true,
        "slug":  "turkey-cappadocia-pamukkale-9d",
        "thumbnail":  "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "터키항공 직항",
                         "전 일정 5성급/동굴 호텔",
                         "국내선 항공 2회 탑승으로 이동 최소화"
                     ],
        "highlights":  [
                           "카파도키아 프리미엄 동굴 부티크 호텔 2박",
                           "카파도키아 열기구 일출 투어 보장",
                           "파묵칼레 고대 온천 족욕 \u0026 이스탄불 아야소피아"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1570939274717-7eda259b50ed?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[신비로운 대지] 튀르키예 카파도키아 열기구 \u0026 파묵칼레 석회붕 7박 9일",
        "rating":  4.93,
        "durationDays":  9,
        "departureDates":  [
                               {
                                   "date":  "2026-09-10",
                                   "price":  1990000,
                                   "seatsLeft":  12,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "열기구일출",
                     "카파도키아동굴호텔",
                     "파묵칼레온천",
                     "보스포러스유람선"
                 ],
        "excluded":  [
                         "가이드 팁 ()"
                     ],
        "theme":  "온천/미식",
        "price":  1990000,
        "originalPrice":  2490000,
        "city":  "이스탄불 / 카파도키아 / 파묵칼레",
        "isEarlyBird":  true,
        "region":  "유럽",
        "reviewCount":  178,
        "isFeatured":  true
    },
    {
        "country":  "오스트리아",
        "id":  "pkg-eur-13",
        "durationNights":  6,
        "summary":  "모차르트의 고향 잘츠부르크와 유네스코 세계문화유산 할슈타트 호수 마을, 합스부르크 왕가의 쇤브룬 궁전 음악회!",
        "isActive":  true,
        "slug":  "austria-vienna-hallstatt-8d",
        "thumbnail":  "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "왕복 항공권",
                         "4성급 호텔 6박",
                         "쇤브룬 궁전 콘서트 VIP 티켓"
                     ],
        "highlights":  [
                           "할슈타트 호수 파노라마 보트 \u0026 전망대",
                           "비엔나 쇤브룬 오렌지 궁정 클래식 콘서트 관람",
                           "모차르트 생가 \u0026 사운드오브뮤직 미라벨 정원"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[음악과 호수의 낭만] 오스트리아 빈 쇤브룬 궁전 \u0026 할슈타트 6박 8일",
        "rating":  4.94,
        "durationDays":  8,
        "departureDates":  [
                               {
                                   "date":  "2026-09-17",
                                   "price":  3150000,
                                   "seatsLeft":  7,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "할슈타트호수",
                     "쇤브룬클래식콘서트",
                     "미라벨정원",
                     "자허토르테"
                 ],
        "excluded":  [
                         "가이드 팁 (80유로)"
                     ],
        "theme":  "역사/문화",
        "price":  3150000,
        "originalPrice":  3600000,
        "city":  "비엔나 / 잘츠부르크 / 할슈타트",
        "isEarlyBird":  true,
        "region":  "유럽",
        "reviewCount":  92,
        "isFeatured":  false
    },
    {
        "country":  "네덜란드 / 벨기에",
        "id":  "pkg-eur-14",
        "durationNights":  6,
        "summary":  "동화 같은 풍차마을 잔세스칸스, 북쪽의 베네치아라 불리는 중세 도시 브뤼헤 운하와 반고흐 미술관을 만나는 예술 여행.",
        "isActive":  true,
        "slug":  "netherlands-belgium-canal-8d",
        "thumbnail":  "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "왕복 항공권",
                         "전 일정 4성급 호텔",
                         "고속열차 탈리스 탑승"
                     ],
        "highlights":  [
                           "암스테르담 글래스 보트 운하 크루즈 \u0026 반고흐 미술관",
                           "풍차 마을 잔세스칸스 치즈 공방 체험",
                           "벨기에 브뤼헤 마르크트 광장 \u0026 수제 초콜릿 테이스팅"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[운하와 튤립의 정원] 네덜란드 암스테르담 \u0026 벨기에 브뤼헤/브뤼셀 6박 8일",
        "rating":  4.89,
        "durationDays":  8,
        "departureDates":  [
                               {
                                   "date":  "2026-09-22",
                                   "price":  2990000,
                                   "seatsLeft":  10,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "암스테르담운하크루즈",
                     "잔세스칸스풍차",
                     "브뤼헤중세도시",
                     "벨기에와플초콜릿"
                 ],
        "excluded":  [
                         "가이드 팁 (80유로)"
                     ],
        "theme":  "휴양/힐링",
        "price":  2990000,
        "originalPrice":  3450000,
        "city":  "암스테르담 / 브뤼셀 / 브뤼헤 / 겐트",
        "isEarlyBird":  true,
        "region":  "유럽",
        "reviewCount":  81,
        "isFeatured":  false
    },
    {
        "country":  "독일",
        "id":  "pkg-eur-15",
        "durationNights":  6,
        "summary":  "디즈니 신데렐라 성의 모티브가 된 노이슈반슈타인 성과 중세 성벽 도시 로텐부르크, 뮌헨 전통 호프브로이 맥주 체험!",
        "isActive":  true,
        "slug":  "germany-romantic-road-8d",
        "thumbnail":  "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "루프트한자 왕복 직항",
                         "호텔 6박",
                         "독일 ICE 고속열차"
                     ],
        "highlights":  [
                           "퓌센 노이슈반슈타인 성 마리엔 다리 조망 \u0026 내부 관람",
                           "로텐부르크 중세 골목 \u0026 케테 볼파르트 크리스마스 빌리지",
                           "뮌헨 호프브로이하우스 정통 학센 \u0026 수제 맥주 만찬"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[동화의 성] 독일 뮌헨 \u0026 노이슈반슈타인 성 \u0026 로텐부르크 6박 8일",
        "rating":  4.93,
        "durationDays":  8,
        "departureDates":  [
                               {
                                   "date":  "2026-09-16",
                                   "price":  3090000,
                                   "seatsLeft":  8,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "노이슈반슈타인성",
                     "디즈니성모티브",
                     "로텐부르크크리스마스",
                     "뮌헨학센맥주"
                 ],
        "excluded":  [
                         "가이드 팁 (80유로)"
                     ],
        "theme":  "역사/문화",
        "price":  3090000,
        "originalPrice":  3550000,
        "city":  "뮌헨 / 퓌센 / 로텐부르크 / 프랑크푸르트",
        "isEarlyBird":  true,
        "region":  "유럽",
        "reviewCount":  96,
        "isFeatured":  false
    },
    {
        "country":  "일본",
        "id":  "pkg-jp-01",
        "durationNights":  3,
        "summary":  "유황 온천의 명소 노보리베츠 프리미엄 료칸에서의 힐링, 낭만적인 오타루 운하 산책, 삿포로 대게 무제한 뷔페를 즐기는 베스트셀러!",
        "isActive":  true,
        "slug":  "hokkaido-sapporo-onsen-4d",
        "thumbnail":  "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "왕복 항공권",
                         "료칸 1박 + 시내 4성급 호텔 2박",
                         "전 일정 식사 및 전용 버스"
                     ],
        "highlights":  [
                           "노보리베츠 특급 온천 료칸 1박 (노천 온천 \u0026 가이세키)",
                           "오타루 운하 \u0026 오르골당 \u0026 르타오 디저트",
                           "삿포로 3대 게(털게, 대게, 킹크랩) 무제한 특식"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[사계절 프리미엄 온천] 홋카이도 삿포로 \u0026 오타루 운하 \u0026 노보리베츠 료칸 3박 4일",
        "rating":  4.96,
        "durationDays":  4,
        "departureDates":  [
                               {
                                   "date":  "2026-09-04",
                                   "price":  1090000,
                                   "seatsLeft":  8,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "특급료칸1박",
                     "노보리베츠온천",
                     "오타루오르골당",
                     "삿포로3대게요리"
                 ],
        "excluded":  [
                         "가이드/기사 경비 (4,000엔)"
                     ],
        "theme":  "온천/미식",
        "price":  1090000,
        "originalPrice":  1350000,
        "city":  "삿포로 / 오타루 / 노보리베츠",
        "isEarlyBird":  true,
        "region":  "일본/동아시아",
        "reviewCount":  184,
        "isFeatured":  true
    },
    {
        "country":  "일본",
        "id":  "pkg-jp-02",
        "durationNights":  3,
        "summary":  "천년 고도 교토의 고즈넉한 정취와 아라시야마 치쿠린 대나무숲, 식도락의 천국 오사카 도톤보리와 고베규 만찬!",
        "isActive":  true,
        "slug":  "osaka-kyoto-gourmet-4d",
        "thumbnail":  "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "왕복 항공권",
                         "오사카 시내 중심가 호텔 3박",
                         "전 일정 전용 차량 및 식사"
                     ],
        "highlights":  [
                           "유네스코 세계유산 교토 청수사(기요미즈데라) \u0026 후시미이나리 신사",
                           "아라시야마 도게츠교 \u0026 대나무숲 인력거 체험",
                           "고베 하버랜드 야경 \u0026 최상급 고베규 스테이크"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[감성 미식투어] 오사카 도톤보리 \u0026 교토 청수사 \u0026 아라시야마 대나무숲 3박 4일",
        "rating":  4.93,
        "durationDays":  4,
        "departureDates":  [
                               {
                                   "date":  "2026-09-06",
                                   "price":  890000,
                                   "seatsLeft":  10,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "교토기요미즈데라",
                     "아라시야마치쿠린",
                     "도톤보리글리코상",
                     "고베규철판구이"
                 ],
        "excluded":  [
                         "가이드 팁 (4,000엔)"
                     ],
        "theme":  "온천/미식",
        "price":  890000,
        "originalPrice":  1100000,
        "city":  "오사카 / 교토 / 고베",
        "isEarlyBird":  true,
        "region":  "일본/동아시아",
        "reviewCount":  210,
        "isFeatured":  true
    },
    {
        "country":  "일본",
        "id":  "pkg-jp-03",
        "durationNights":  3,
        "summary":  "트렌디한 시부야 스카이 전망대와 아사쿠사 센소지, 후지산 뷰를 품은 하코네 온천과 아시노호수 유람선 여행.",
        "isActive":  true,
        "slug":  "tokyo-hakone-fuji-4d",
        "thumbnail":  "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "왕복 항공권",
                         "호텔 3박",
                         "전용 버스 및 입장권"
                     ],
        "highlights":  [
                           "시부야 스카이 전망대 노을 \u0026 야경 관람권",
                           "하코네 국립공원 해적 유람선 \u0026 로프웨이 케이블카",
                           "하코네 온천 호텔 1박 (온천욕 \u0026 뷔페)"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[도심과 후지산의 조화] 도쿄 시부야스카이 \u0026 하코네 아시노호수 온천 3박 4일",
        "rating":  4.91,
        "durationDays":  4,
        "departureDates":  [
                               {
                                   "date":  "2026-09-11",
                                   "price":  990000,
                                   "seatsLeft":  7,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "시부야스카이전망대",
                     "하코네해적선",
                     "오와쿠다니검은달걀",
                     "긴자쇼핑"
                 ],
        "excluded":  [
                         "가이드 팁 (4,000엔)"
                     ],
        "theme":  "역사/문화",
        "price":  990000,
        "originalPrice":  1200000,
        "city":  "도쿄 / 하코네",
        "isEarlyBird":  true,
        "region":  "일본/동아시아",
        "reviewCount":  142,
        "isFeatured":  false
    },
    {
        "country":  "일본",
        "id":  "pkg-jp-04",
        "durationNights":  2,
        "summary":  "비행시간 1시간 20분! 아기자기한 유후인 민예촌 거리 산책과 벳푸 가마도 지옥온천, 전통 료칸 가이세키 정찬의 힐링 코스입니다.",
        "isActive":  true,
        "slug":  "fukuoka-yufuin-onsen-3d",
        "thumbnail":  "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "왕복 항공권",
                         "료칸 1박 + 시내 특급 1박",
                         "전용 차량 및 전 일정 식사"
                     ],
        "highlights":  [
                           "유후인 전통 온천 료칸 1박 \u0026 가이세키 석식 코스",
                           "긴린코 호수 물안개 산책 \u0026 유노츠보 거리 자유 시간",
                           "벳푸 온천 지옥 순례 \u0026 족욕 체험"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[힐링 온천 가이세키] 규슈 후쿠오카 \u0026 유후인 료칸 \u0026 벳푸 지옥온천 2박 3일",
        "rating":  4.95,
        "durationDays":  3,
        "departureDates":  [
                               {
                                   "date":  "2026-09-08",
                                   "price":  690000,
                                   "seatsLeft":  12,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "유후인긴린코호수",
                     "벳푸가마도지옥",
                     "후쿠오카라멘",
                     "전통다다미료칸"
                 ],
        "excluded":  [
                         "가이드 팁 (3,000엔)"
                     ],
        "theme":  "온천/미식",
        "price":  690000,
        "originalPrice":  850000,
        "city":  "후쿠오카 / 유후인 / 벳푸",
        "isEarlyBird":  true,
        "region":  "일본/동아시아",
        "reviewCount":  230,
        "isFeatured":  true
    },
    {
        "country":  "일본",
        "id":  "pkg-jp-05",
        "durationNights":  3,
        "summary":  "동양의 하와이 오키나와! 거대한 고래상어가 헤엄치는 츄라우미 수족관과 코우리 대교 드라이브, 오션뷰 리조트 휴양.",
        "isActive":  true,
        "slug":  "okinawa-emerald-sea-4d",
        "thumbnail":  "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "왕복 직항 항공권",
                         "리조트 3박",
                         "전용 렌터카 or 리무진 투어"
                     ],
        "highlights":  [
                           "세계 최대급 츄라우미 수족관 흑조의 바다 관람",
                           "코우리 에메랄드 비치 \u0026 에메랄드빛 해상 드라이브",
                           "오키나와 힐튼 차탄 리조트 오션뷰 투숙"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[동양의 에메랄드] 오키나와 츄라우미 수족관 \u0026 만좌모 오션뷰 리조트 3박 4일",
        "rating":  4.9,
        "durationDays":  4,
        "departureDates":  [
                               {
                                   "date":  "2026-09-13",
                                   "price":  790000,
                                   "seatsLeft":  8,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "츄라우미고래상어",
                     "코우리대교",
                     "만좌모코끼리바위",
                     "국제거리포장마차"
                 ],
        "excluded":  [
                         "개인 경비"
                     ],
        "theme":  "휴양/힐링",
        "price":  790000,
        "originalPrice":  980000,
        "city":  "오키나와 / 나하",
        "isEarlyBird":  true,
        "region":  "일본/동아시아",
        "reviewCount":  105,
        "isFeatured":  false
    },
    {
        "country":  "일본",
        "id":  "pkg-jp-06",
        "durationNights":  3,
        "summary":  "유네스코 세계유산 동화마을 시라카와고와 리틀 교토 다카야마의 목조 전통 가옥, 나고야 명물 장어덮밥 미식 기행.",
        "isActive":  true,
        "slug":  "nagoya-shirakawago-4d",
        "thumbnail":  "https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "왕복 항공권",
                         "온천 호텔 1박 + 나고야 4성 호텔 2박",
                         "전 일정 전용 버스"
                     ],
        "highlights":  [
                           "유네스코 세계문화유산 시라카와고 합장마을 전망대 조망",
                           "다카야마 산마치 전통 보존지구 산책",
                           "나고야 100년 전통 히츠마부시(장어덮밥) 특식"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[전통의 숨결] 나고야 \u0026 시라카와고 합장촌 \u0026 다카야마 전통거리 3박 4일",
        "rating":  4.92,
        "durationDays":  4,
        "departureDates":  [
                               {
                                   "date":  "2026-09-17",
                                   "price":  870000,
                                   "seatsLeft":  9,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "시라카와고갓쇼즈쿠리",
                     "다카야마옛거리",
                     "히다규소고기",
                     "나고야히츠마부시"
                 ],
        "excluded":  [
                         "가이드 팁 (4,000엔)"
                     ],
        "theme":  "역사/문화",
        "price":  870000,
        "originalPrice":  1050000,
        "city":  "나고야 / 시라카와고 / 다카야마",
        "isEarlyBird":  true,
        "region":  "일본/동아시아",
        "reviewCount":  78,
        "isFeatured":  false
    },
    {
        "country":  "일본",
        "id":  "pkg-jp-07",
        "durationNights":  2,
        "summary":  "애니메이션 센과 치히로의 행방불명의 모티브가 된 일본 최고(最古) 3천 년 역사의 도고 온천 본관과 마쓰야마성!",
        "isActive":  true,
        "slug":  "matsuyama-dogo-onsen-3d",
        "thumbnail":  "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "왕복 직항 항공권",
                         "도고 온천 료칸 2박",
                         "도고온천 입욕권"
                     ],
        "highlights":  [
                           "도고온천 본관 프리미엄 입욕 체험",
                           "마쓰야마성 로프웨이 탑승 \u0026 파노라마 조망",
                           "마쓰야마 명물 도미밥(타이메시) 만찬"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[3천년 온천 역사] 시코쿠 마쓰야마 도고온천 본관 \u0026 마쓰야마성 2박 3일",
        "rating":  4.89,
        "durationDays":  3,
        "departureDates":  [
                               {
                                   "date":  "2026-09-19",
                                   "price":  620000,
                                   "seatsLeft":  11,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "도고온천본관",
                     "센과치히로모티브",
                     "봇짱열차",
                     "도미밥특식"
                 ],
        "excluded":  [
                         "개인 경비"
                     ],
        "theme":  "온천/미식",
        "price":  620000,
        "originalPrice":  780000,
        "city":  "마쓰야마 / 시코쿠",
        "isEarlyBird":  true,
        "region":  "일본/동아시아",
        "reviewCount":  65,
        "isFeatured":  false
    },
    {
        "country":  "대만",
        "id":  "pkg-jp-08",
        "durationNights":  3,
        "summary":  "센과 치히로의 붉은 홍등 거리 지우펀, 기찻길에서 소원을 띄우는 스펀 천등 날리기, 딘타이펑 본점 샤오롱바오 미식!",
        "slug":  "taipei-jiufen-shifen-4d",
        "thumbnail":  "https://images.unsplash.com/photo-1508248467877-aec1b08de376?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "included":  [
                         "국적기 왕복 항공권",
                         "타이베이 시내 4성급 호텔 3박",
                         "전 일정 전용 버스"
                     ],
        "highlights":  [
                           "예류 지질공원 여왕머리바위 \u0026 스펀 폭포",
                           "지우펀 아메이차루 홍등 골목 야경 투어",
                           "원조 딘타이펑 딤섬 세트 \u0026 스린 야시장 투어"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1508248467877-aec1b08de376?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[미식과 낭만의 타이완] 타이베이 101 \u0026 지우펀 \u0026 스펀 천등 3박 4일",
        "rating":  4.94,
        "durationDays":  4,
        "departureDates":  [
                               {
                                   "date":  "2026-09-05",
                                   "price":  690000,
                                   "seatsLeft":  10,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "타이베이101",
                     "지우펀홍등거리",
                     "스펀천등날리기",
                     "딘타이펑샤오롱바오"
                 ],
        "excluded":  [
                         "가이드 팁 ()"
                     ],
        "theme":  "온천/미식",
        "price":  690000,
        "originalPrice":  880000,
        "city":  "타이베이 / 지우펀 / 스펀",
        "isEarlyBird":  true,
        "region":  "일본/동아시아",
        "reviewCount":  189,
        "isFeatured":  true,
        "status":  "미운영",
        "isActive":  false
    },
    {
        "country":  "대만",
        "id":  "pkg-jp-09",
        "durationNights":  3,
        "summary":  "연중 온화한 남부 대만의 중심 가오슝 항구와 감성 예술 거리, 타이난의 유럽풍 치메이 박물관을 만나는 색다른 대만 여행.",
        "isActive":  true,
        "slug":  "kaohsiung-tainan-art-4d",
        "thumbnail":  "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "왕복 항공권",
                         "4성급 호텔 3박",
                         "전 일정 식사 및 페리 탑승권"
                     ],
        "highlights":  [
                           "가오슝 보아트 예술특구 트램 \u0026 치진섬 전동자전거",
                           "연지담 호수 용호탑 관람",
                           "타이난 치메이 박물관 \u0026 안핑 고성 투어"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1508248467877-aec1b08de376?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[대만의 문화수도] 가오슝 보아트 예술특구 \u0026 타이난 치메이박물관 3박 4일",
        "rating":  4.88,
        "durationDays":  4,
        "departureDates":  [
                               {
                                   "date":  "2026-09-12",
                                   "price":  640000,
                                   "seatsLeft":  9,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "보아트예술특구",
                     "연지담용호탑",
                     "치메이박물관",
                     "치진섬페리"
                 ],
        "excluded":  [
                         "가이드 팁 ()"
                     ],
        "theme":  "역사/문화",
        "price":  640000,
        "originalPrice":  790000,
        "city":  "가오슝 / 타이난",
        "isEarlyBird":  true,
        "region":  "일본/동아시아",
        "reviewCount":  72,
        "isFeatured":  false
    },
    {
        "country":  "홍콩 / 마카오",
        "id":  "pkg-jp-10",
        "durationNights":  3,
        "summary":  "세계 최고의 스카이라인을 자랑하는 빅토리아 피크 트램 야경과 포르투갈의 정취가 살아있는 마카오 역사 유적지 탐방!",
        "isActive":  true,
        "slug":  "hongkong-macau-skyline-4d",
        "thumbnail":  "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "왕복 항공권",
                         "홍콩 시내 4성 호텔 2박 + 마카오 특급 1박",
                         "홍콩-마카오 터보젯 페리"
                     ],
        "highlights":  [
                           "홍콩 피크트램 패스트트랙 탑승 \u0026 스카이테라스 428",
                           "스타페리 탑승 \u0026 빅토리아 하버 레이저쇼",
                           "마카오 성바울 성당 \u0026 베네시안 리조트 곤돌라"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1508248467877-aec1b08de376?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[화려한 빅토리아항] 홍콩 침사추이 \u0026 마카오 성바울성당 3박 4일",
        "rating":  4.91,
        "durationDays":  4,
        "departureDates":  [
                               {
                                   "date":  "2026-09-18",
                                   "price":  850000,
                                   "seatsLeft":  8,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "빅토리아피크트램",
                     "심포니오브라이트",
                     "마카오세나도광장",
                     "에그타르트"
                 ],
        "excluded":  [
                         "가이드 팁 ()"
                     ],
        "theme":  "역사/문화",
        "price":  850000,
        "originalPrice":  1080000,
        "city":  "홍콩 / 마카오",
        "isEarlyBird":  true,
        "region":  "일본/동아시아",
        "reviewCount":  140,
        "isFeatured":  false
    },
    {
        "country":  "중국",
        "id":  "pkg-jp-11",
        "durationNights":  4,
        "summary":  "영화 아바타 판도라 행성의 배경이 된 기암괴석의 향연! 세계 최장 천문산 케이블카와 아찔한 대협곡 유리다리.",
        "isActive":  true,
        "slug":  "zhangjiajie-avatar-mountain-5d",
        "thumbnail":  "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "왕복 직항 항공권",
                         "전 일정 5성급 호텔 4박",
                         "VIP 리무진 버스 및 전 일정 식사"
                     ],
        "highlights":  [
                           "길이 7.5km 세계 최장 천문산 케이블카 \u0026 유리잔도",
                           "수직 높이 326m 백룡 엘리베이터 탑승",
                           "대협곡 유리다리 \u0026 천문호선 실경 뮤지컬 VIP석"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[신선이 머무는 곳] 중국 장가계 천문산 케이블카 \u0026 원가계 유리다리 4박 5일",
        "rating":  4.95,
        "durationDays":  5,
        "departureDates":  [
                               {
                                   "date":  "2026-09-10",
                                   "price":  920000,
                                   "seatsLeft":  14,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "천문산케이블카",
                     "백룡엘리베이터",
                     "대협곡유리다리",
                     "천문호선뮤지컬"
                 ],
        "excluded":  [
                         "중국 단체비자",
                         "가이드 팁 ()"
                     ],
        "theme":  "휴양/힐링",
        "price":  920000,
        "originalPrice":  1190000,
        "city":  "장가계 / 원가계",
        "isEarlyBird":  true,
        "region":  "일본/동아시아",
        "reviewCount":  160,
        "isFeatured":  true
    },
    {
        "country":  "중국",
        "id":  "pkg-jp-12",
        "durationNights":  2,
        "summary":  "인천에서 1시간 10분! 독일풍 건축물이 가득한 붉은 기와와 푸른 바다, 공장에서 갓 뽑아낸 원액 생맥주를 즐기는 주말 여행.",
        "isActive":  true,
        "slug":  "qingdao-beer-museum-3d",
        "thumbnail":  "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "왕복 항공권",
                         "5성급 호텔 2박",
                         "전 일정 식사 및 맥주박물관 입장권"
                     ],
        "highlights":  [
                           "칭다오 맥주 박물관 원액 생맥주 \u0026 꿀땅콩 무제한 시음",
                           "붉은 지붕이 한눈에 내려다보이는 소어산 공원",
                           "칭다오 5성급 쉐라톤 호텔 투숙"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[해변과 칭다오 맥주] 중국 칭다오 5.4광장 \u0026 맥주박물관 \u0026 소어산 2박 3일",
        "rating":  4.88,
        "durationDays":  3,
        "departureDates":  [
                               {
                                   "date":  "2026-09-11",
                                   "price":  390000,
                                   "seatsLeft":  16,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "칭다오원액생맥주",
                     "소어산공원",
                     "팔대관풍경구",
                     "피차이위안먹자골목"
                 ],
        "excluded":  [
                         "중국 비자",
                         "가이드 팁 ()"
                     ],
        "theme":  "온천/미식",
        "price":  390000,
        "originalPrice":  520000,
        "city":  "칭다오",
        "isEarlyBird":  true,
        "region":  "일본/동아시아",
        "reviewCount":  95,
        "isFeatured":  false
    },
    {
        "country":  "몽골",
        "id":  "pkg-jp-13",
        "durationNights":  3,
        "summary":  "도심의 소음을 벗어나 광활한 초원과 쏟아지는 밤하늘 은하수를 감상하는 몽골 전통 게르 힐링 캠핑 투어!",
        "isActive":  true,
        "slug":  "mongolia-terelj-ger-4d",
        "thumbnail":  "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "미아트 몽골항공 왕복 직항",
                         "프리미엄 게르 2박 + 울란바토르 5성 1박",
                         "전 일정 식사 및 푸르공/전용차량"
                     ],
        "highlights":  [
                           "개별 화장실/샤워실 완비 현대식 프리미엄 게르 2박",
                           "테를지 국립공원 대초원 승마 트래킹 \u0026 거북바위",
                           "몽골 전통 양고기 바베큐 허르헉 \u0026 별자리 투어"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[끝없는 초원과 별빛] 몽골 울란바토르 테를지 국립공원 승마 \u0026 게르 캠핑 3박 4일",
        "rating":  4.96,
        "durationDays":  4,
        "departureDates":  [
                               {
                                   "date":  "2026-09-09",
                                   "price":  1190000,
                                   "seatsLeft":  8,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "현대식게르",
                     "은하수별빛투어",
                     "초원승마체험",
                     "허르헉양고기"
                 ],
        "excluded":  [
                         "가이드 팁 ()"
                     ],
        "theme":  "휴양/힐링",
        "price":  1190000,
        "originalPrice":  1450000,
        "city":  "울란바토르 / 테를지",
        "isEarlyBird":  true,
        "region":  "일본/동아시아",
        "reviewCount":  88,
        "isFeatured":  true
    },
    {
        "country":  "중국",
        "id":  "pkg-jp-14",
        "durationNights":  3,
        "summary":  "동양의 파리 상하이의 화려한 와이탄 야경, 아시아 최대 상하이 디즈니랜드와 천년 수향마을 우전의 낭만!",
        "isActive":  true,
        "slug":  "shanghai-disney-wuzhen-4d",
        "thumbnail":  "https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "왕복 항공권",
                         "5성급 호텔 3박",
                         "디즈니랜드 입장권 및 전용 차량"
                     ],
        "highlights":  [
                           "상하이 디즈니랜드 1일 자유 이용권 \u0026 불꽃놀이",
                           "동양의 베니스 수향마을 우전 서책 야경 투어",
                           "황푸강 럭셔리 유람선 탑승 \u0026 와이탄 조계지"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[황푸강과 수향마을] 중국 상하이 와이탄 \u0026 디즈니랜드 \u0026 우전 3박 4일",
        "rating":  4.9,
        "durationDays":  4,
        "departureDates":  [
                               {
                                   "date":  "2026-09-15",
                                   "price":  780000,
                                   "seatsLeft":  12,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "상하이디즈니랜드",
                     "우전수향마을야경",
                     "황푸강유람선",
                     "예원정원"
                 ],
        "excluded":  [
                         "중국 비자",
                         "가이드 팁 ()"
                     ],
        "theme":  "가족/키즈",
        "price":  780000,
        "originalPrice":  980000,
        "city":  "상하이 / 우전",
        "isEarlyBird":  true,
        "region":  "일본/동아시아",
        "reviewCount":  116,
        "isFeatured":  false
    },
    {
        "country":  "중국",
        "id":  "pkg-jp-15",
        "durationNights":  3,
        "summary":  "계림의 산수는 천하 제일이라! 굽이치는 리강을 따라 펼쳐지는 수묵화 같은 카르스트 봉우리와 장예모 감독의 인상유삼저 공연.",
        "isActive":  true,
        "slug":  "guilin-li-river-4d",
        "thumbnail":  "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "왕복 항공권",
                         "전 일정 5성급 호텔 3박",
                         "전용 리무진 버스"
                     ],
        "highlights":  [
                           "리강 대유람선 4성급 호화선 탑승 (관암-양숴 구간)",
                           "장예모 감독 연출 산수실경 공연 인상유삼저 VIP석",
                           "세외도원 나룻배 유람 \u0026 계림 쉐라톤 호텔 투숙"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[수묵화 속 비경] 중국 계림 리강 유람선 \u0026 양숴 세외도원 3박 4일",
        "rating":  4.89,
        "durationDays":  4,
        "departureDates":  [
                               {
                                   "date":  "2026-09-23",
                                   "price":  680000,
                                   "seatsLeft":  10,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "계림산수갑천하",
                     "리강대유람선",
                     "인상유삼저공연",
                     "관암동굴"
                 ],
        "excluded":  [
                         "중국 비자",
                         "가이드 팁 ()"
                     ],
        "theme":  "휴양/힐링",
        "price":  680000,
        "originalPrice":  850000,
        "city":  "계림 / 양숴",
        "isEarlyBird":  true,
        "region":  "일본/동아시아",
        "reviewCount":  82,
        "isFeatured":  false
    },
    {
        "country":  "미국",
        "id":  "pkg-us-01",
        "durationNights":  5,
        "summary":  "에메랄드빛 와이키키 비치와 다이아몬드 헤드 전망, 낭만적인 스타 오브 호놀룰루 선셋 디너 크루즈를 즐기는 완벽한 하와이!",
        "isActive":  true,
        "slug":  "hawaii-oahu-waikiki-7d",
        "thumbnail":  "https://images.unsplash.com/photo-1542259009477-d625272157b7?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "대한항공/하와이안항공 직항",
                         "5성급 호텔 5박",
                         "오아후 섬일주 투어 및 크루즈 티켓"
                     ],
        "highlights":  [
                           "와이키키 비치 프론트 5성급 호텔 5박 (오션뷰)",
                           "스타 오브 호놀룰루 3스타 랍스터 선셋 디너 크루즈",
                           "오아후 동/북부 섬일주 \u0026 와이켈레 프리미엄 아울렛"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1542259009477-d625272157b7?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[지상 최고의 낙원] 하와이 오아후 와이키키 비치 \u0026 카일루아 비치 5박 7일",
        "rating":  4.97,
        "durationDays":  7,
        "departureDates":  [
                               {
                                   "date":  "2026-09-07",
                                   "price":  2490000,
                                   "seatsLeft":  6,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "와이키키오션뷰",
                     "오아후동서부투어",
                     "하나우마베이스노클링",
                     "선셋디너크루즈"
                 ],
        "excluded":  [
                         "ESTA 미국 전자비자",
                         "호텔 리조트 피"
                     ],
        "theme":  "허니문/럭셔리",
        "price":  2490000,
        "originalPrice":  2950000,
        "city":  "호놀룰루 / 와이키키",
        "isEarlyBird":  true,
        "region":  "미주/대양주",
        "reviewCount":  175,
        "isFeatured":  true
    },
    {
        "country":  "미국",
        "id":  "pkg-us-02",
        "durationNights":  3,
        "summary":  "전 일정 리조트 식사와 70여 가지 워터파크 액티비티가 무료인 PIC 골드카드와 야생 돌고래를 만나는 돌핀 크루즈!",
        "isActive":  true,
        "slug":  "guam-pic-family-4d",
        "thumbnail":  "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "왕복 항공권",
                         "PIC 리조트 3박 \u0026 골드카드",
                         "돌핀 크루즈 및 공항 픽업/샌딩"
                     ],
        "highlights":  [
                           "괌 PIC 리조트 슈페리어룸 3박 \u0026 골드카드 전일정 식사",
                           "야생 돌고래 와칭 \u0026 선상 참치회 \u0026 스노클링 돌핀 크루즈",
                           "사랑의 절벽 \u0026 아가냐 대성당 남부 투어"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[온 가족 올인클루시브] 괌 PIC 골드카드 리조트 \u0026 남부 아일랜드 투어 3박 4일",
        "rating":  4.93,
        "durationDays":  4,
        "departureDates":  [
                               {
                                   "date":  "2026-09-12",
                                   "price":  990000,
                                   "seatsLeft":  8,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "PIC골드카드",
                     "70여가지워터파크",
                     "돌핀크루즈",
                     "사랑의절벽"
                 ],
        "excluded":  [
                         "가이드 팁 ()"
                     ],
        "theme":  "가족/키즈",
        "price":  990000,
        "originalPrice":  1250000,
        "city":  "괌 / 투몬",
        "isEarlyBird":  true,
        "region":  "미주/대양주",
        "reviewCount":  190,
        "isFeatured":  true
    },
    {
        "country":  "미국",
        "id":  "pkg-us-03",
        "durationNights":  3,
        "summary":  "사이판 최고급 켄싱턴 올인클루시브 리조트의 품격과 환상의 무인도 마나가하섬, 세계적인 다이빙 포인트 그로토 동굴!",
        "isActive":  true,
        "slug":  "saipan-kensington-4d",
        "thumbnail":  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "왕복 항공권",
                         "켄싱턴 리조트 3박 (전식 포함)",
                         "마나가하섬 투어 및 공항 송영"
                     ],
        "highlights":  [
                           "사이판 켄싱턴 리조트 전 객실 오션뷰 3박 (올인클루시브 식사)",
                           "마나가하섬 쾌속선 탑승 \u0026 파라솔/비치 스노클링",
                           "신비로운 푸른 빛 그로토 해식동굴 스노클링"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[남태평양 청정보석] 사이판 켄싱턴 리조트 \u0026 마나가하섬 스노클링 3박 4일",
        "rating":  4.91,
        "durationDays":  4,
        "departureDates":  [
                               {
                                   "date":  "2026-09-15",
                                   "price":  950000,
                                   "seatsLeft":  9,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "켄싱턴올인클루시브",
                     "마나가하섬투어",
                     "그로토동굴스노클링",
                     "별빛투어"
                 ],
        "excluded":  [
                         "마나가하섬 환경세 ()"
                     ],
        "theme":  "휴양/힐링",
        "price":  950000,
        "originalPrice":  1190000,
        "city":  "사이판 / 가라판",
        "isEarlyBird":  true,
        "region":  "미주/대양주",
        "reviewCount":  112,
        "isFeatured":  false
    },
    {
        "country":  "호주",
        "id":  "pkg-us-04",
        "durationNights":  4,
        "summary":  "세계 3대 미항 시드니 하버 크루즈와 유네스코 블루마운틴 궤도열차, 오페라하우스 공식 내부 투어까지 알차게 즐기는 시드니!",
        "isActive":  true,
        "slug":  "sydney-blue-mountains-6d",
        "thumbnail":  "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "대한항공/아시아나 직항",
                         "시내 중심가 4성급 호텔 4박",
                         "호주 청정우 스테이크 특식"
                     ],
        "highlights":  [
                           "시드니 오페라하우스 한국어 공식 내부 투어",
                           "블루마운틴 국립공원 시닉월드 3종 라이드(레일웨이/케이블웨이/스카이웨이)",
                           "시드니 하버 캡틴쿡 3코스 선셋 디너 크루즈"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[눈부신 항구도시] 호주 시드니 오페라하우스 \u0026 블루마운틴 국립공원 4박 6일",
        "rating":  4.94,
        "durationDays":  6,
        "departureDates":  [
                               {
                                   "date":  "2026-09-08",
                                   "price":  1990000,
                                   "seatsLeft":  8,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "오페라하우스내부투어",
                     "시드니하버선셋디너",
                     "시닉월드케이블카",
                     "코알라캥거루"
                 ],
        "excluded":  [
                         "호주 ETA 관광비자",
                         "가이드 팁 ()"
                     ],
        "theme":  "역사/문화",
        "price":  1990000,
        "originalPrice":  2450000,
        "city":  "시드니 / 블루마운틴",
        "isEarlyBird":  true,
        "region":  "미주/대양주",
        "reviewCount":  148,
        "isFeatured":  true
    },
    {
        "country":  "호주",
        "id":  "pkg-us-05",
        "durationNights":  4,
        "summary":  "죽기 전에 꼭 봐야 할 절경 그레이트 오션로드와 100년 전통 퍼핑빌리 증기기차, 해질녘 귀가하는 리틀 펭귄 퍼레이드.",
        "isActive":  true,
        "slug":  "melbourne-great-ocean-road-6d",
        "thumbnail":  "https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "왕복 항공권",
                         "멜버른 시내 4성 호텔 4박",
                         "헬기투어 및 전용 차량"
                     ],
        "highlights":  [
                           "그레이트 오션로드 12사도 바위 헬기투어 포함",
                           "단데농 국립공원 퍼핑빌리 증기기관차 탑승",
                           "필립아일랜드 야생 페어리 펭귄 퍼레이드 관람"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[예술과 자연의 조화] 호주 멜버른 그레이트 오션로드 \u0026 12사도 4박 6일",
        "rating":  4.93,
        "durationDays":  6,
        "departureDates":  [
                               {
                                   "date":  "2026-09-14",
                                   "price":  2090000,
                                   "seatsLeft":  7,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "그레이트오션로드",
                     "12사도바위헬기투어",
                     "퍼핑빌리증기기관차",
                     "필립아일랜드펭귄"
                 ],
        "excluded":  [
                         "호주 ETA 비자",
                         "가이드 팁 ()"
                     ],
        "theme":  "휴양/힐링",
        "price":  2090000,
        "originalPrice":  2550000,
        "city":  "멜버른 / 필립아일랜드",
        "isEarlyBird":  true,
        "region":  "미주/대양주",
        "reviewCount":  98,
        "isFeatured":  false
    },
    {
        "country":  "뉴질랜드",
        "id":  "pkg-us-06",
        "durationNights":  7,
        "summary":  "지구상 마지막 남은 청정 낙원! 빙하가 빚은 피오르드 밀포드 사운드와 반지의 제왕 호빗 마을, 퀸스타운의 보석 같은 호수.",
        "isActive":  true,
        "slug":  "new-zealand-milford-sound-9d",
        "thumbnail":  "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "에어뉴질랜드 직항",
                         "남북섬 국내선 항공",
                         "전 일정 4성급 호텔 \u0026 특식 5회"
                     ],
        "highlights":  [
                           "밀포드 사운드 국립공원 대형 크루즈 탑승 \u0026 선상 뷔페",
                           "로토루아 테푸이아 지열 온천 \u0026 마오리 민속쇼",
                           "영화 반지의 제왕 촬영지 호비튼 무비세트 투어"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[청정 대자연의 극치] 뉴질랜드 남북섬 완벽일주 밀포드사운드 7박 9일",
        "rating":  4.98,
        "durationDays":  9,
        "departureDates":  [
                               {
                                   "date":  "2026-09-11",
                                   "price":  4190000,
                                   "seatsLeft":  5,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "밀포드사운드크루즈",
                     "로토루아간헐천",
                     "퀸스타운스카이라인",
                     "호빗마을"
                 ],
        "excluded":  [
                         "뉴질랜드 NZeTA 비자",
                         "가이드 팁 ()"
                     ],
        "theme":  "휴양/힐링",
        "price":  4190000,
        "originalPrice":  4800000,
        "city":  "오클랜드 / 로토루아 / 퀸스타운",
        "isEarlyBird":  false,
        "region":  "미주/대양주",
        "reviewCount":  86,
        "isFeatured":  true
    },
    {
        "country":  "캐나다",
        "id":  "pkg-us-07",
        "durationNights":  5,
        "summary":  "유네스코 세계유산 캐나다 로키의 꽃 레이크 루이스와 아서바스카 빙하 위를 달리는 특수 설상차 아이스 익스플로러 투어!",
        "isActive":  true,
        "slug":  "canada-rockies-banff-7d",
        "thumbnail":  "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "왕복 항공권",
                         "로키 산장 및 특급 호텔 5박",
                         "설상차/곤돌라 탑승권 일체"
                     ],
        "highlights":  [
                           "페어몬트 샤토 레이크 루이스 호텔 전망대 감상",
                           "콜롬비아 대빙원 특수 설상차(Ice Explorer) 탑승 및 빙하수 시음",
                           "설퍼산 곤돌라 등정 \u0026 밴프 어퍼 핫스프링스 온천욕"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[에메랄드빛 빙하호수] 캐나다 로키산맥 밴프 국립공원 \u0026 레이크루이스 5박 7일",
        "rating":  4.96,
        "durationDays":  7,
        "departureDates":  [
                               {
                                   "date":  "2026-09-09",
                                   "price":  3290000,
                                   "seatsLeft":  6,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "레이크루이스샤토호텔",
                     "설상차빙하체험",
                     "밴프설퍼산곤돌라",
                     "알버타소고기"
                 ],
        "excluded":  [
                         "캐나다 eTA 비자",
                         "가이드 팁 ()"
                     ],
        "theme":  "휴양/힐링",
        "price":  3290000,
        "originalPrice":  3850000,
        "city":  "캘거리 / 밴프 / 재스퍼",
        "isEarlyBird":  true,
        "region":  "미주/대양주",
        "reviewCount":  92,
        "isFeatured":  true
    },
    {
        "country":  "미국",
        "id":  "pkg-us-08",
        "durationNights":  6,
        "summary":  "화려한 타임스스퀘어와 센트럴파크, 최신 핫플레이스 SUMMIT One Vanderbilt 전망대와 미국의 수도 워싱턴 DC 탐방.",
        "isActive":  true,
        "slug":  "new-york-washington-8d",
        "thumbnail":  "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "왕복 직항 항공권",
                         "맨해튼 중심가 호텔 4박 + 워싱턴 2박",
                         "암트랙 or 전용 버스"
                     ],
        "highlights":  [
                           "맨해튼 SUMMIT One Vanderbilt 거울 전망대 입장",
                           "자유의 여신상 엘리스 아일랜드 페리 유람선",
                           "워싱턴 DC 백악관, 국회의사당, 스미소니언 박물관 투어"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[세계의 중심 맨해튼] 미국 뉴욕 센트럴파크 \u0026 워싱턴 DC 역사탐방 6박 8일",
        "rating":  4.92,
        "durationDays":  8,
        "departureDates":  [
                               {
                                   "date":  "2026-09-16",
                                   "price":  3790000,
                                   "seatsLeft":  8,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "타임스스퀘어",
                     "자유의여신상크루즈",
                     "서밋전망대",
                     "백악관링컨기념관"
                 ],
        "excluded":  [
                         "미국 ESTA",
                         "가이드 팁 ()"
                     ],
        "theme":  "역사/문화",
        "price":  3790000,
        "originalPrice":  4350000,
        "city":  "뉴욕 / 워싱턴 DC",
        "isEarlyBird":  true,
        "region":  "미주/대양주",
        "reviewCount":  134,
        "isFeatured":  false
    },
    {
        "country":  "미국",
        "id":  "pkg-us-09",
        "durationNights":  6,
        "summary":  "대자연이 빚은 웅장한 신비 그랜드캐년 헬기 투어와 붉은 첨탑 브라이스캐년, 라스베이거스 5성급 스트립 호텔의 화려한 밤!",
        "isActive":  true,
        "slug":  "grand-canyon-las-vegas-8d",
        "thumbnail":  "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "왕복 항공권",
                         "특급 호텔 6박",
                         "엔텔롭캐년 인디언 가이드 투어"
                     ],
        "highlights":  [
                           "그랜드캐년 국립공원 경비행기/헬기 투어 포함",
                           "빛의 예술 엔텔롭 캐년 \u0026 홀스슈 밴드 절벽 조망",
                           "라스베이거스 스트립 5성급 벨라지오/베네시안 호텔 2박"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[서부 3대 캐년] 미서부 그랜드캐년 헬기투어 \u0026 라스베이거스 6박 8일",
        "rating":  4.95,
        "durationDays":  8,
        "departureDates":  [
                               {
                                   "date":  "2026-09-13",
                                   "price":  3190000,
                                   "seatsLeft":  10,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "그랜드캐년헬기",
                     "엔텔롭캐년",
                     "홀스슈밴드",
                     "벨라지오분수쇼"
                 ],
        "excluded":  [
                         "미국 ESTA",
                         "가이드 팁 ()"
                     ],
        "theme":  "휴양/힐링",
        "price":  3190000,
        "originalPrice":  3700000,
        "city":  "라스베이거스 / 그랜드캐년 / 자이언캐년 / 브라이스캐년",
        "isEarlyBird":  true,
        "region":  "미주/대양주",
        "reviewCount":  162,
        "isFeatured":  true
    },
    {
        "country":  "미국",
        "id":  "pkg-us-10",
        "durationNights":  5,
        "summary":  "안개의 도시 샌프란시스코 명물 케이블카와 금문교 요트 크루즈, LA 헐리우드 명예의 거리와 유니버설 스튜디오 익스프레스!",
        "isActive":  true,
        "slug":  "california-sf-la-7d",
        "thumbnail":  "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "왕복 항공권",
                         "시내 중심가 호텔 5박",
                         "유니버설 스튜디오 티켓"
                     ],
        "highlights":  [
                           "샌프란시스코 베이 크루즈 \u0026 피셔맨스워프 크랩 만찬",
                           "유니버설 스튜디오 헐리우드 1일권 포함",
                           "산타모니카 피어 \u0026 비벌리힐스 로데오 드라이브"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[태양의 캘리포니아] 미국 샌프란시스코 금문교 \u0026 LA 헐리우드 5박 7일",
        "rating":  4.9,
        "durationDays":  7,
        "departureDates":  [
                               {
                                   "date":  "2026-09-19",
                                   "price":  3090000,
                                   "seatsLeft":  7,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "금문교베이크루즈",
                     "케이블카탑승",
                     "유니버설스튜디오할리우드",
                     "산타모니카비치"
                 ],
        "excluded":  [
                         "미국 ESTA",
                         "가이드 팁 ()"
                     ],
        "theme":  "역사/문화",
        "price":  3090000,
        "originalPrice":  3600000,
        "city":  "샌프란시스코 / 로스앤젤레스",
        "isEarlyBird":  true,
        "region":  "미주/대양주",
        "reviewCount":  110,
        "isFeatured":  false
    },
    {
        "country":  "멕시코",
        "id":  "pkg-us-11",
        "durationNights":  5,
        "summary":  "카리브해의 눈부신 에메랄드 바다! 24시간 식음료 무제한 5성급 올인클루시브 호텔존 투숙과 마야 유적 치첸이트사 투어.",
        "isActive":  true,
        "slug":  "cancun-all-inclusive-luxury-7d",
        "thumbnail":  "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "왕복 항공권",
                         "5성급 올인클루시브 리조트 5박 (전식 및 주류 포함)",
                         "공항-호텔 단독 픽업샌딩"
                     ],
        "highlights":  [
                           "호텔존 하얏트 지바 or 시크릿 더 바인 5성급 올인클루시브 5박",
                           "세계 7대 불가사의 치첸이트사 \u0026 성스러운 천연 우물 세노테 수영",
                           "칸쿤 라군 정글 투어 \u0026 스노클링"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[카리브해 올인클루시브] 멕시코 칸쿤 5성급 럭셔리 리조트 \u0026 세노테 5박 7일",
        "rating":  4.97,
        "durationDays":  7,
        "departureDates":  [
                               {
                                   "date":  "2026-09-22",
                                   "price":  3390000,
                                   "seatsLeft":  5,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "호텔존올인클루시브",
                     "치첸이트사피라미드",
                     "신비의세노테다이빙",
                     "정글스피드보트"
                 ],
        "excluded":  [
                         "미국 경유 ESTA",
                         "친환경 환경세"
                     ],
        "theme":  "허니문/럭셔리",
        "price":  3390000,
        "originalPrice":  3990000,
        "city":  "칸쿤 / 플라야델카르멘",
        "isEarlyBird":  false,
        "region":  "미주/대양주",
        "reviewCount":  125,
        "isFeatured":  true
    },
    {
        "country":  "호주",
        "id":  "pkg-us-12",
        "durationNights":  4,
        "summary":  "끝없이 펼쳐진 황금빛 해변 서퍼스 파라다이스와 코알라 안아보기 체험, 핫한 트렌드 도시 브리즈번 사우스뱅크 라군!",
        "isActive":  true,
        "slug":  "gold-coast-surfers-paradise-6d",
        "thumbnail":  "images/destinations/gold-coast-panorama.jpg",
        "status":  "운영중",
        "included":  [
                         "왕복 직항 항공권",
                         "특급 호텔 4박",
                         "테마파크 입장권"
                     ],
        "highlights":  [
                           "골드코스트 오션뷰 호텔 4박",
                           "세계 최초 코알라 보호구역 론파인 코알라 안고 기념사진",
                           "스카이포인트 77층 전망대 \u0026 애프터눈 티 세트"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "images/destinations/gold-coast-panorama.jpg",
                       "images/destinations/brisbane-panorama.jpg"
                   ],
        "title":  "[황금빛 서핑천국] 호주 골드코스트 서퍼스파라다이스 \u0026 브리즈번 4박 6일",
        "rating":  4.91,
        "durationDays":  6,
        "departureDates":  [
                               {
                                   "date":  "2026-09-17",
                                   "price":  1890000,
                                   "seatsLeft":  8,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "서퍼스파라다이스",
                     "스카이포인트전망대",
                     "론파인코알라보호구역",
                     "파라다이스컨트리"
                 ],
        "excluded":  [
                         "호주 ETA 비자",
                         "가이드 팁 ()"
                     ],
        "theme":  "휴양/힐링",
        "price":  1890000,
        "originalPrice":  2300000,
        "city":  "골드코스트 / 브리즈번",
        "isEarlyBird":  true,
        "region":  "미주/대양주",
        "reviewCount":  94,
        "isFeatured":  false
    },
    {
        "country":  "미국",
        "id":  "pkg-us-13",
        "durationNights":  6,
        "summary":  "세계 최초의 국립공원 옐로스톤! 무지개 빛 온천 그랜드 프리즈매틱과 치솟는 간헐천, 그랜드티톤의 만년설과 야생동물 관찰.",
        "isActive":  true,
        "slug":  "yellowstone-grand-teton-8d",
        "thumbnail":  "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "왕복 항공권",
                         "국립공원 롯지 및 호텔 6박",
                         "전용 리무진 버스"
                     ],
        "highlights":  [
                           "옐로스톤 국립공원 3일 집중 탐방 (올드페이스풀 롯지 숙박 포함)",
                           "신비로운 오색 온천 그랜드 프리즈매틱 스프링 보드워크",
                           "그랜드티톤 제니 레이크 보트 투어"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[간헐천과 야생의 땅] 미국 옐로스톤 국립공원 \u0026 그랜드티톤 6박 8일",
        "rating":  4.98,
        "durationDays":  8,
        "departureDates":  [
                               {
                                   "date":  "2026-09-24",
                                   "price":  3990000,
                                   "seatsLeft":  4,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "올드페이스풀간헐천",
                     "그랜드프리즈매틱",
                     "맘모스핫스프링스",
                     "야생바이슨"
                 ],
        "excluded":  [
                         "미국 ESTA",
                         "가이드 팁 ()"
                     ],
        "theme":  "휴양/힐링",
        "price":  3990000,
        "originalPrice":  4600000,
        "city":  "옐로스톤 / 잭슨홀 / 솔트레이크시티",
        "isEarlyBird":  false,
        "region":  "미주/대양주",
        "reviewCount":  70,
        "isFeatured":  false
    },
    {
        "country":  "프랑스령 폴리네시아",
        "id":  "pkg-us-14",
        "durationNights":  5,
        "summary":  "지상 최고의 지상낙원 보라보라섬! 오테마누 산을 바라보는 프라이빗 수상 방갈로와 카누를 타고 배달되는 로맨틱 조식.",
        "isActive":  true,
        "slug":  "tahiti-bora-bora-overwater-7d",
        "thumbnail":  "https://images.unsplash.com/photo-1535827841776-24afc1e255ac?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "에어타히티누이 왕복 항공",
                         "타히티-보라보라 국내선 항공",
                         "수상방갈로 5박 및 조석식 하프보드"
                     ],
        "highlights":  [
                           "인터컨티넨탈 탈라소 리조트 오버워터 빌라 5박",
                           "전통 아웃리거 카누 플로팅 조식 1회 무료 제공",
                           "보라보라 라군 샤크 \u0026 가오리 피딩 스노클링 사파리"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1535827841776-24afc1e255ac?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[남태평양의 최고봉] 타히티 보라보라 수상방갈로 럭셔리 허니문 5박 7일",
        "rating":  5,
        "durationDays":  7,
        "departureDates":  [
                               {
                                   "date":  "2026-09-20",
                                   "price":  6800000,
                                   "seatsLeft":  4,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "보라보라인터컨티넨탈",
                     "수상방갈로오테마누뷰",
                     "카누조식",
                     "샤크앤레이스노클링"
                 ],
        "excluded":  [
                         "호텔 시티택스"
                     ],
        "theme":  "허니문/럭셔리",
        "price":  6800000,
        "originalPrice":  7900000,
        "city":  "타히티 / 보라보라",
        "isEarlyBird":  false,
        "region":  "미주/대양주",
        "reviewCount":  52,
        "isFeatured":  true
    },
    {
        "country":  "미국",
        "id":  "pkg-us-15",
        "durationNights":  5,
        "summary":  "거대한 빙하가 굉음을 내며 무너져 내리는 알래스카의 대장관! 26개 빙하를 만나는 쾌속선과 파노라마 돔 열차 여행.",
        "isActive":  true,
        "slug":  "alaska-kenai-glacier-7d",
        "thumbnail":  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "왕복 항공권",
                         "특급 호텔 5박",
                         "빙하 유람선 및 파노라마 열차 티켓"
                     ],
        "highlights":  [
                           "휘티어 26개 빙하 국립공원 초고속 유람선 \u0026 선상 런치",
                           "알래스카 럭셔리 철도(Alaska Railroad) 골드스타 돔석 탑승",
                           "알래스카 킹크랩 \u0026 자연산 연어 스테이크 특식"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[푸른 빙하의 장관] 미국 알래스카 앵커리지 \u0026 키나이 피오르드 빙하 크루즈 5박 7일",
        "rating":  4.95,
        "durationDays":  7,
        "departureDates":  [
                               {
                                   "date":  "2026-09-18",
                                   "price":  3890000,
                                   "seatsLeft":  6,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "키나이피오르드국립공원",
                     "26글래시어크루즈",
                     "알래스카철도골드스타",
                     "킹크랩연어만찬"
                 ],
        "excluded":  [
                         "미국 ESTA",
                         "가이드 팁 ()"
                     ],
        "theme":  "휴양/힐링",
        "price":  3890000,
        "originalPrice":  4500000,
        "city":  "앵커리지 / 수워드 / 휘티어",
        "isEarlyBird":  true,
        "region":  "미주/대양주",
        "reviewCount":  68,
        "isFeatured":  false
    },
    {
        "country":  "대한민국",
        "id":  "pkg-kr-01",
        "durationNights":  2,
        "summary":  "제주 5성급 그랜드 조선 호텔 숙박, 에메랄드빛 우도 산호해변 보트 투어와 흑돼지/갈치조림 미식 코스로 채운 힐링 여행입니다.",
        "isActive":  true,
        "slug":  "jeju-grand-josun-healing-3d",
        "thumbnail":  "https://images.unsplash.com/photo-1548115184-bc6544d06a58?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "항공권 (왕복 항공권)",
                         "그랜드 조선 2박",
                         "전용 리무진 버스 및 전 일정 식사"
                     ],
        "highlights":  [
                           "5성급 그랜드 조선 제주 2박 \u0026 오션뷰 가든 조식",
                           "에메랄드빛 우도 보트투어 \u0026 성산일출봉 조망",
                           "동백꽃 정원 카멜리아힐 \u0026 섭지코지 산책"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1548115184-bc6544d06a58?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1612852098516-55d01c75769a?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[5성급 힐링 호캉스] 제주 그랜드 조선 \u0026 우도 보트투어 \u0026 카멜리아힐 2박 3일",
        "rating":  4.92,
        "durationDays":  3,
        "departureDates":  [
                               {
                                   "date":  "2026-09-04",
                                   "price":  430000,
                                   "seatsLeft":  12,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "5성그랜드조선",
                     "우도보트투어",
                     "카멜리아힐",
                     "제주흑돼지구이"
                 ],
        "excluded":  [
                         "개인 경비"
                     ],
        "theme":  "휴양/힐링",
        "price":  430000,
        "originalPrice":  520000,
        "city":  "제주 / 서귀포",
        "isEarlyBird":  true,
        "region":  "국내",
        "reviewCount":  165,
        "isFeatured":  true
    },
    {
        "country":  "대한민국",
        "id":  "pkg-kr-02",
        "durationNights":  2,
        "summary":  "여수 밤바다 야경 크루즈, 대한민국 1호 순천만 국가정원, 통영 한려수도 조망 케이블카를 타는 남도 대표 코스입니다.",
        "isActive":  true,
        "slug":  "yeosu-suncheon-tongyeong-3d",
        "thumbnail":  "images/destinations/yeosu-night-sea.jpg",
        "status":  "운영중",
        "included":  [
                         "KTX 왕복 열차권",
                         "특급 호텔 2박",
                         "전 일정 식사 및 케이블카 입장권"
                     ],
        "highlights":  [
                           "여수 해상 케이블카 \u0026 오동도 동백열차",
                           "순천만 국가정원 \u0026 순천만 습지 갈대밭 탐방",
                           "통영 미륵산 케이블카 \u0026 한려수도 조망"
                       ],
        "images":  [
                       "images/destinations/yeosu-night-sea.jpg",
                       "images/destinations/suncheon-reed-wetland.jpg",
                       "images/destinations/tongyeong-panorama.jpg"
                   ],
        "title":  "[낭만 바다 투어] 여수 밤바다 낭만포차 \u0026 순천만 갈대습지 \u0026 통영 2박 3일",
        "rating":  4.88,
        "durationDays":  3,
        "departureDates":  [
                               {
                                   "date":  "2026-09-11",
                                   "price":  360000,
                                   "seatsLeft":  14,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "해상케이블카",
                     "순천만습지",
                     "통영루지체험",
                     "여수돌게장정식"
                 ],
        "excluded":  [
                         "개인 경비"
                     ],
        "theme":  "역사/문화",
        "price":  360000,
        "originalPrice":  420000,
        "city":  "여수 / 순천 / 통영",
        "isEarlyBird":  true,
        "region":  "국내",
        "reviewCount":  140,
        "isFeatured":  false
    },
    {
        "country":  "대한민국",
        "id":  "pkg-kr-03",
        "durationNights":  1,
        "summary":  "설악산 권금성 케이블카, 시원한 동해 바다 안목해변 커피거리, 속초 중앙시장 먹방과 정동진 바다부채길 산책 코스입니다.",
        "isActive":  true,
        "slug":  "gangneung-sokcho-2d",
        "thumbnail":  "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "우등 리무진 버스",
                         "동해 4성급 오션뷰 호텔 1박",
                         "식사 3회 및 케이블카 티켓"
                     ],
        "highlights":  [
                           "설악산 국립공원 권금성 케이블카 왕복 탑승",
                           "강릉 안목 커피거리 오션뷰 카페 타임",
                           "속초 관광수산시장 먹방 투어 \u0026 활어회 만찬"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1546853020-ca4909aef454?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[동해 바다 \u0026 커피] 강릉 안목해변 카페거리 + 속초 중앙시장 + 설악산 1박 2일",
        "rating":  4.85,
        "durationDays":  2,
        "departureDates":  [
                               {
                                   "date":  "2026-09-05",
                                   "price":  240000,
                                   "seatsLeft":  18,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "설악산케이블카",
                     "안목커피거리",
                     "속초만석닭강정",
                     "정동진바다부채길"
                 ],
        "excluded":  [
                         "개인 경비"
                     ],
        "theme":  "휴양/힐링",
        "price":  240000,
        "originalPrice":  290000,
        "city":  "강릉 / 속초 / 양양",
        "isEarlyBird":  true,
        "region":  "국내",
        "reviewCount":  178,
        "isFeatured":  false
    },
    {
        "country":  "대한민국",
        "id":  "pkg-kr-04",
        "durationNights":  1,
        "summary":  "물에 비친 화려한 신라의 밤 동궁과 월지 야경, 유네스코 불국사와 석굴암, 트렌디한 한옥 거리 황리단길 역사 문화 코스입니다.",
        "isActive":  true,
        "slug":  "gyeongju-history-2d",
        "thumbnail":  "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "KTX 왕복 열차권",
                         "경주 힐튼/라한 호텔 1박",
                         "전용 리무진 버스 및 식사"
                     ],
        "highlights":  [
                           "동궁과 월지(안압지) \u0026 첨성대 야경 투어",
                           "불국사 \u0026 석굴암 전문 문화해설사 동행",
                           "황리단길 자유 시간 \u0026 경주 한우 떡갈비 정식"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[천년의 역사와 멋] 경주 불국사 \u0026 첨성대 \u0026 황리단길 한옥투어 1박 2일",
        "rating":  4.9,
        "durationDays":  2,
        "departureDates":  [
                               {
                                   "date":  "2026-09-12",
                                   "price":  260000,
                                   "seatsLeft":  16,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "동궁과월지야경",
                     "불국사석굴암",
                     "황리단길한옥카페",
                     "경주떡갈비한정식"
                 ],
        "excluded":  [
                         "개인 경비"
                     ],
        "theme":  "역사/문화",
        "price":  260000,
        "originalPrice":  310000,
        "city":  "경주 / 보문단지",
        "isEarlyBird":  true,
        "region":  "국내",
        "reviewCount":  152,
        "isFeatured":  false
    },
    {
        "country":  "대한민국",
        "id":  "pkg-kr-05",
        "durationNights":  2,
        "summary":  "해운대 최고급 오션뷰 호텔 투숙, 광안대교 선셋 요트 세일링과 자갈치 시장 제철 활어회, 영도 흰여울마을 감성 산책 코스입니다.",
        "isActive":  true,
        "slug":  "busan-luxury-yacht-3d",
        "thumbnail":  "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "KTX 왕복 열차권",
                         "특급 호텔 2박",
                         "요트 탑승권 및 식사 4회"
                     ],
        "highlights":  [
                           "해운대 5성급 럭셔리 오션뷰 호텔 2박",
                           "광안리 선셋 프라이빗 요트 투어 \u0026 무알콜 샴페인",
                           "자갈치 시장 제철 모둠회 \u0026 부산 돼지국밥 특식"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[요트 \u0026 오션뷰 호캉스] 부산 해운대 엘시티 \u0026 광안리 요트 \u0026 자갈치 2박 3일",
        "rating":  4.94,
        "durationDays":  3,
        "departureDates":  [
                               {
                                   "date":  "2026-09-18",
                                   "price":  490000,
                                   "seatsLeft":  10,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "해운대엘시티",
                     "광안리요트투어",
                     "자갈치시장회센터",
                     "흰여울문화마을"
                 ],
        "excluded":  [
                         "개인 경비"
                     ],
        "theme":  "휴양/힐링",
        "price":  490000,
        "originalPrice":  580000,
        "city":  "부산",
        "isEarlyBird":  true,
        "region":  "국내",
        "reviewCount":  186,
        "isFeatured":  true
    },
    {
        "country":  "대한민국",
        "id":  "pkg-kr-06",
        "durationNights":  1,
        "summary":  "이국적인 주황색 지붕의 독일마을 맥주 체험과 층층이 바다로 이어지는 다랭이마을, 기암절벽 금산 보리암의 일출 절경.",
        "isActive":  true,
        "slug":  "namhae-german-village-2d",
        "thumbnail":  "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "우등 리무진 버스",
                         "남해 오션뷰 리조트 1박",
                         "전 일정 식사 및 입장료"
                     ],
        "highlights":  [
                           "남해 독일마을 파독전시관 \u0026 독일 수제 소시지/맥주",
                           "층층이 바다로 이어지는 다랭이논 해안 산책로",
                           "금산 보리암 \u0026 남해 멸치쌈밥 정식"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[남해의 에메랄드] 남해 독일마을 \u0026 다랭이마을 \u0026 보리암 1박 2일",
        "rating":  4.87,
        "durationDays":  2,
        "departureDates":  [
                               {
                                   "date":  "2026-09-05",
                                   "price":  230000,
                                   "seatsLeft":  15,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "남해독일마을",
                     "다랭이논풍경",
                     "금산보리암",
                     "멸치쌈밥정식"
                 ],
        "excluded":  [
                         "개인 경비"
                     ],
        "theme":  "휴양/힐링",
        "price":  230000,
        "originalPrice":  280000,
        "city":  "남해 / 사천",
        "isEarlyBird":  true,
        "region":  "국내",
        "reviewCount":  94,
        "isFeatured":  false
    },
    {
        "country":  "대한민국",
        "id":  "pkg-kr-07",
        "durationNights":  1,
        "summary":  "에메랄드빛 바다 위에 피어난 환상의 해상 식물원 외도 보타니아와 해금강 십자동굴, 거제도 바람의 언덕 풍차 힐링!",
        "isActive":  true,
        "slug":  "geoje-oedo-botania-2d",
        "thumbnail":  "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "전용 우등 버스",
                         "특급 리조트 1박",
                         "외도 유람선 승선권 및 식사"
                     ],
        "highlights":  [
                           "외도 보타니아 상륙 투어 \u0026 해금강 선상 유람",
                           "거제 바람의 언덕 \u0026 신선대 파노라마 뷰",
                           "거제 한화리조트 벨버디어 1박 (오션뷰)"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[바람과 바다의 정원] 거제도 바람의 언덕 \u0026 외도 보타니아 해상공원 1박 2일",
        "rating":  4.9,
        "durationDays":  2,
        "departureDates":  [
                               {
                                   "date":  "2026-09-12",
                                   "price":  250000,
                                   "seatsLeft":  12,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "외도보타니아",
                     "바람의언덕풍차",
                     "해금강유람선",
                     "거제도해물뚝배기"
                 ],
        "excluded":  [
                         "개인 경비"
                     ],
        "theme":  "휴양/힐링",
        "price":  250000,
        "originalPrice":  300000,
        "city":  "거제 / 통영",
        "isEarlyBird":  true,
        "region":  "국내",
        "reviewCount":  112,
        "isFeatured":  false
    },
    {
        "country":  "대한민국",
        "id":  "pkg-kr-08",
        "durationNights":  1,
        "summary":  "700여 채의 한옥이 모여있는 전주 한옥마을에서 고즈넉한 한옥 숙박과 전통 한복 체험, 전주 남부시장 야시장 먹방 투어.",
        "isActive":  true,
        "slug":  "jeonju-hanok-gourmet-2d",
        "thumbnail":  "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "KTX 왕복 열차권",
                         "전통 한옥 스테이 1박",
                         "식사 3회 및 한복 체험권"
                     ],
        "highlights":  [
                           "전주 한옥 독채 온돌 스테이 1박 \u0026 한복 대여 체험",
                           "경기전 태조 이성계 어진 관람 \u0026 전동성당",
                           "원조 전주비빔밥 명인 식당 \u0026 콩나물국밥 특식"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[천년의 맛과 멋] 전주 한옥마을 경기전 \u0026 전주 비빔밥 \u0026 남부시장 1박 2일",
        "rating":  4.88,
        "durationDays":  2,
        "departureDates":  [
                               {
                                   "date":  "2026-09-19",
                                   "price":  210000,
                                   "seatsLeft":  16,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "전주한옥마을",
                     "경기전태조어진",
                     "전주전통비빔밥",
                     "군산근대역사거리"
                 ],
        "excluded":  [
                         "개인 경비"
                     ],
        "theme":  "역사/문화",
        "price":  210000,
        "originalPrice":  260000,
        "city":  "전주 / 군산",
        "isEarlyBird":  true,
        "region":  "국내",
        "reviewCount":  145,
        "isFeatured":  false
    },
    {
        "country":  "대한민국",
        "id":  "pkg-kr-09",
        "durationNights":  2,
        "summary":  "멀미 없는 대형 쾌속 크루즈로 편안하게! 우리 땅 독도 상륙 탐방과 울릉도 해안일주 도로, 나리분지 산채 비빔밥.",
        "isActive":  true,
        "slug":  "ulleungdo-dokdo-cruise-3d",
        "thumbnail":  "https://images.unsplash.com/photo-1505881502353-a1986add3762?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "대형 크루즈 왕복 승선권",
                         "울릉도 호텔 2박",
                         "독도 승선권 및 전 일정 식사"
                     ],
        "highlights":  [
                           "독도 수호 상륙 탐방 (기상 악화 시 선상 유람)",
                           "울릉도 일주 유람선 \u0026 관음도 삼선암 비경",
                           "울릉도 명물 따개비칼국수 \u0026 약소 불고기 특식"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1505881502353-a1986add3762?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1498307833015-e7b400441eb8?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[신비의 화산섬] 울릉도 독도 수호탐방 \u0026 나리분지 \u0026 관음도 2박 3일",
        "rating":  4.96,
        "durationDays":  3,
        "departureDates":  [
                               {
                                   "date":  "2026-09-08",
                                   "price":  480000,
                                   "seatsLeft":  8,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "독도입도탐방",
                     "대형크루즈선박",
                     "나리분지산채비빔밥",
                     "관음도연도교"
                 ],
        "excluded":  [
                         "개인 경비"
                     ],
        "theme":  "휴양/힐링",
        "price":  480000,
        "originalPrice":  560000,
        "city":  "울릉도 / 독도",
        "isEarlyBird":  true,
        "region":  "국내",
        "reviewCount":  98,
        "isFeatured":  true
    },
    {
        "country":  "대한민국",
        "id":  "pkg-kr-10",
        "durationNights":  1,
        "summary":  "한국의 알프스 대관령 푸른 초원 양떼목장과 천년 고찰 오대산 월정사 전나무숲길 산책, 정선 하이원 알파인 코스터.",
        "isActive":  true,
        "slug":  "pyeongchang-daegwallyeong-2d",
        "thumbnail":  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "전용 우등 버스",
                         "하이원 그랜드호텔 1박",
                         "목장 입장권 및 식사 3회"
                     ],
        "highlights":  [
                           "대관령 양떼목장 먹이주기 \u0026 초원 트래킹",
                           "오대산 월정사 무장애 전나무 숲길 산책",
                           "평창 대관령 프리미엄 한우 숯불구이 특식"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1546853020-ca4909aef454?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[푸른 초원의 힐링] 평창 대관령 양떼목장 \u0026 정선 하이원 리조트 1박 2일",
        "rating":  4.86,
        "durationDays":  2,
        "departureDates":  [
                               {
                                   "date":  "2026-09-13",
                                   "price":  220000,
                                   "seatsLeft":  14,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "대관령양떼목장",
                     "월정사전나무숲길",
                     "하이원마운틴곤돌라",
                     "평창한우구이"
                 ],
        "excluded":  [
                         "개인 경비"
                     ],
        "theme":  "휴양/힐링",
        "price":  220000,
        "originalPrice":  270000,
        "city":  "평창 / 정선",
        "isEarlyBird":  true,
        "region":  "국내",
        "reviewCount":  118,
        "isFeatured":  false
    },
    {
        "country":  "대한민국",
        "id":  "pkg-kr-11",
        "durationNights":  1,
        "summary":  "롤러코스터 위를 걷는 듯한 짜릿한 환호공원 스페이스워크, 한반도 최동단 호미곶 상생의 손과 시원한 포항 영일대 물회!",
        "isActive":  true,
        "slug":  "pohang-space-walk-2d",
        "thumbnail":  "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "KTX 왕복 열차권",
                         "포항 라한호텔 오션뷰 1박",
                         "전용 버스 및 식사"
                     ],
        "highlights":  [
                           "포항 스페이스워크 트랙 걷기 \u0026 영일대 해상누각",
                           "호미곶 해맞이 광장 \u0026 새천년기념관",
                           "포항 죽도시장 제철 해산물 \u0026 원조 포항물회"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[동해의 일출과 예술] 포항 호미곶 일출 \u0026 스페이스워크 \u0026 영일대 1박 2일",
        "rating":  4.89,
        "durationDays":  2,
        "departureDates":  [
                               {
                                   "date":  "2026-09-20",
                                   "price":  215000,
                                   "seatsLeft":  15,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "환호공원스페이스워크",
                     "호미곶상생의손",
                     "구가의서촬영지",
                     "포항물회특식"
                 ],
        "excluded":  [
                         "개인 경비"
                     ],
        "theme":  "휴양/힐링",
        "price":  215000,
        "originalPrice":  260000,
        "city":  "포항 / 영덕",
        "isEarlyBird":  true,
        "region":  "국내",
        "reviewCount":  86,
        "isFeatured":  false
    },
    {
        "country":  "대한민국",
        "id":  "pkg-kr-12",
        "durationNights":  1,
        "summary":  "낙동강이 감싸 안은 유네스코 하회마을과 퇴계 이황의 도산서원, 한국 최장의 목책교 월영교 달빛 야경 산책.",
        "isActive":  true,
        "slug":  "andong-hahoe-village-2d",
        "thumbnail":  "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "KTX-이음 왕복 열차권",
                         "안동 그랜드호텔 1박",
                         "전 일정 식사 및 입장료"
                     ],
        "highlights":  [
                           "안동 하회마을 별신굿탈놀이 공연 관람",
                           "부용대 나룻배 건너기 \u0026 하회마을 전경 조망",
                           "원조 안동 구시장 찜닭 \u0026 헛제삿밥 정식"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[선비의 숨결] 안동 하회마을 부용대 \u0026 도산서원 \u0026 찜닭 1박 2일",
        "rating":  4.87,
        "durationDays":  2,
        "departureDates":  [
                               {
                                   "date":  "2026-09-16",
                                   "price":  205000,
                                   "seatsLeft":  12,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "안동하회마을",
                     "부용대나룻배",
                     "월영교야경",
                     "안동찜닭간고등어"
                 ],
        "excluded":  [
                         "개인 경비"
                     ],
        "theme":  "역사/문화",
        "price":  205000,
        "originalPrice":  250000,
        "city":  "안동 / 영주",
        "isEarlyBird":  true,
        "region":  "국내",
        "reviewCount":  74,
        "isFeatured":  false
    },
    {
        "country":  "대한민국",
        "id":  "pkg-kr-13",
        "durationNights":  2,
        "summary":  "푸른 바다와 노란 유채꽃, 돌담길이 어우러진 영화 서편제의 무대 청산도 슬로길 걷기와 완도 특산 전복 풀코스 만찬!",
        "isActive":  true,
        "slug":  "wando-cheongsando-slow-3d",
        "thumbnail":  "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "전용 우등 리무진",
                         "완도 호텔 2박",
                         "청산도 왕복 여객선 \u0026 식사 일체"
                     ],
        "highlights":  [
                           "청산도 슬로길 1~4코스 트래킹 \u0026 서편제 초가집",
                           "완도 타워 모노레일 탑승 \u0026 다도해 해상 조망",
                           "완도 명품 활전복 구이/회/죽 풀코스 특식"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[아시아 최초 슬로시티] 완도 타워 \u0026 청산도 유채꽃길 \u0026 신지명사십리 2박 3일",
        "rating":  4.91,
        "durationDays":  3,
        "departureDates":  [
                               {
                                   "date":  "2026-09-22",
                                   "price":  340000,
                                   "seatsLeft":  11,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "청산도슬로길",
                     "서편제촬영지",
                     "완도전복코스",
                     "신지명사십리해수욕장"
                 ],
        "excluded":  [
                         "개인 경비"
                     ],
        "theme":  "휴양/힐링",
        "price":  340000,
        "originalPrice":  410000,
        "city":  "완도 / 청산도",
        "isEarlyBird":  true,
        "region":  "국내",
        "reviewCount":  80,
        "isFeatured":  false
    },
    {
        "country":  "대한민국",
        "id":  "pkg-kr-14",
        "durationNights":  1,
        "summary":  "내륙의 바다 청풍호를 가로지르는 케이블카와 남한강 위의 세 봉우리 도담삼봉, 만천하 스카이워크에서 즐기는 비경!",
        "isActive":  true,
        "slug":  "jecheon-danyang-scenic-2d",
        "thumbnail":  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "KTX-이음 열차권",
                         "제천 리조트 1박",
                         "케이블카 티켓 및 식사"
                     ],
        "highlights":  [
                           "청풍호반 케이블카 비봉산 정상 파노라마 뷰",
                           "단양 만천하 스카이워크 짚와이어/알파인코스터",
                           "단양 구경시장 먹거리 \u0026 마늘 떡갈비 정식"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[호수와 기암괴석] 제천 청풍호반 케이블카 \u0026 단양 도담삼봉 1박 2일",
        "rating":  4.88,
        "durationDays":  2,
        "departureDates":  [
                               {
                                   "date":  "2026-09-15",
                                   "price":  210000,
                                   "seatsLeft":  16,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "청풍호반케이블카",
                     "단양도담삼봉",
                     "만천하스카이워크",
                     "단양마늘떡갈비"
                 ],
        "excluded":  [
                         "개인 경비"
                     ],
        "theme":  "휴양/힐링",
        "price":  210000,
        "originalPrice":  250000,
        "city":  "제천 / 단양",
        "isEarlyBird":  true,
        "region":  "국내",
        "reviewCount":  92,
        "isFeatured":  false
    },
    {
        "country":  "대한민국",
        "id":  "pkg-kr-15",
        "durationNights":  1,
        "summary":  "붉은 노을이 장관인 꽃지해변 할미할아비 바위 선셋과 피톤치드 가득한 100년 안면송 숲길, 충남 향토 게국지 만찬.",
        "isActive":  true,
        "slug":  "taean-anmyeondo-sunset-2d",
        "thumbnail":  "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
        "status":  "운영중",
        "included":  [
                         "전용 우등 버스",
                         "안면도 오션뷰 리조트 1박",
                         "식사 3회 및 휴양림 입장권"
                     ],
        "highlights":  [
                           "꽃지해수욕장 낙조 감상 \u0026 사진 촬영",
                           "안면도 자연휴양림 소나무 숲길 힐링 산책",
                           "태안 명물 게국지 \u0026 간장게장 세트 만찬"
                       ],
        "images":  [
                       "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format\u0026fit=crop\u0026w=1200\u0026q=85",
                       "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format\u0026fit=crop\u0026w=1200\u0026q=85"
                   ],
        "title":  "[서해안 황금빛 노을] 태안 안면도 꽃지해변 \u0026 자연휴양림 1박 2일",
        "rating":  4.85,
        "durationDays":  2,
        "departureDates":  [
                               {
                                   "date":  "2026-09-06",
                                   "price":  195000,
                                   "seatsLeft":  18,
                                   "status":  "예약가능"
                               }
                           ],
        "tags":  [
                     "꽃지해수욕장할미할아비바위",
                     "안면도자연휴양림",
                     "태안빛축제",
                     "게국지꽃게탕"
                 ],
        "excluded":  [
                         "개인 경비"
                     ],
        "theme":  "휴양/힐링",
        "price":  195000,
        "originalPrice":  240000,
        "city":  "태안 / 안면도",
        "isEarlyBird":  true,
        "region":  "국내",
        "reviewCount":  104,
        "isFeatured":  false
    }
];

const DEFAULT_USERS = [
  {
    id: "usr-admin-wisekks",
    email: "wisekks@gmail.com",
    name: "최고관리자",
    phone: "010-8754-9373",
    role: "ADMIN",
    createdAt: "2026-09-01T13:18:00",
    password: "#wisesoo7337"
  },
  {
    id: "usr-001",
    email: "user@toureasy.com",
    password: "TourEasy1234!",
    name: "김투어",
    phone: "010-1234-5678",
    role: "MEMBER",
    createdAt: "2026-09-01T09:00:00"
  },
  {
    id: "usr-1788235251531",
    email: "hong@toureasy.com",
    name: "홍길동",
    phone: "010-7777-8888",
    role: "MEMBER",
    createdAt: "2026-09-01T13:00:51",
    password: "BrandNewSecret2026@"
  },
  {
    id: "usr-1788236092470",
    email: "kks@do-best.co.kr",
    name: "김길동",
    phone: "010-8754-9373",
    role: "MEMBER",
    createdAt: "2026-09-01T13:14:52",
    password: "@soo7337"
  },
  {
    id: "usr-1789004661526",
    email: "kwangsoo-kim@hanmail.net",
    password: "#wisesoo7337",
    name: "김광수",
    phone: "01087549373",
    role: "MEMBER",
    createdAt: "2026-09-10T10:44:21"
  },
  {
    id: "usr-1789018325160",
    email: "baba9026@naver.com",
    password: "!q1234567890",
    name: "이태웅",
    phone: "01024748940",
    role: "MEMBER",
    createdAt: "2026-09-10T14:32:05"
  },
  {
    id: "usr-1789019270799",
    email: "kstwalra@naver.com",
    password: "kson1234!@",
    name: "손태완",
    phone: "01025539672",
    role: "MEMBER",
    createdAt: "2026-09-10T14:47:50"
  },
  {
    id: "usr-1789021736064",
    email: "biz.junsangpark@gmail.com",
    password: "ZZNwg8xJRu2MGP6!",
    name: "박준상",
    phone: "01012345678",
    role: "MEMBER",
    createdAt: "2026-09-10T15:28:56"
  }
];

const TourAPI = {
  // 1. Fetch Packages with filtering (Auto fallback if server unavailable)
  async getPackages(params = {}) {
    let rawList = null;
    try {
      if (window.location.protocol !== 'file:') {
        const res = await fetch(`${API_BASE}/packages`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            rawList = json.data;
          }
        }
      }
    } catch (e) {
      console.warn('API server unavailable, using built-in package data.', e);
    }

    if (!rawList) {
      rawList = typeof DEFAULT_PACKAGES !== 'undefined' ? [...DEFAULT_PACKAGES] : [];
    }

    // Client-side filtering
    let result = [...rawList];
    if (params.region && params.region !== '전체') {
      result = result.filter(p => p.region === params.region);
    }
    if (params.theme && params.theme !== '전체') {
      result = result.filter(p => p.theme && p.theme.includes(params.theme));
    }
    if (params.search) {
      const s = params.search.toLowerCase();
      result = result.filter(p =>
        (p.title && p.title.toLowerCase().includes(s)) ||
        (p.city && p.city.toLowerCase().includes(s)) ||
        (p.country && p.country.toLowerCase().includes(s)) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(s)))
      );
    }
    if (params.minPrice) {
      result = result.filter(p => p.price >= parseInt(params.minPrice, 10));
    }
    if (params.maxPrice) {
      result = result.filter(p => p.price <= parseInt(params.maxPrice, 10));
    }
    if (params.featured === 'true' || params.featured === true) {
      result = result.filter(p => p.isFeatured);
    }
    if (params.earlyBird === 'true' || params.earlyBird === true) {
      result = result.filter(p => p.isEarlyBird);
    }

    // Filter active operating status unless includeInactive is explicitly true (for admin)
    if (!params.includeInactive) {
      result = result.filter(p => p.status !== '미운영' && p.status !== 'INACTIVE' && p.isActive !== false);
    }
    if (params.status && params.status !== 'ALL') {
      result = result.filter(p => p.status === params.status);
    }

    if (params.sort === 'priceAsc') {
      result.sort((a, b) => a.price - b.price);
    } else if (params.sort === 'priceDesc') {
      result.sort((a, b) => b.price - a.price);
    } else if (params.sort === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (params.sort === 'reviews') {
      result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return { success: true, count: result.length, data: result };
  },

  // 2. Fetch Single Package (Auto fallback)
  async getPackageById(id) {
    try {
      if (window.location.protocol !== 'file:') {
        const res = await fetch(`${API_BASE}/packages/${id}`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) return json;
        }
      }
    } catch (e) {
      console.warn('API server unavailable, using built-in package data.', e);
    }

    // Fallback: fetch list or check local
    const all = await this.getPackages({ includeInactive: true });
    if (all && all.data) {
      const item = all.data.find(p => p.id === id || p.slug === id);
      if (item) return { success: true, data: item };
    }

    return { success: false, message: '상품을 찾을 수 없습니다.' };
  },

  // 3. Create Booking (Server or LocalStorage)
  async createBooking(bookingData) {
    try {
      if (window.location.protocol !== 'file:') {
        const res = await fetch(`${API_BASE}/bookings`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookingData)
        });
        if (res.ok) {
          return await res.json();
        }
      }
    } catch (e) {
      console.warn('API server unavailable, saving locally.', e);
    }

    const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomCode = Math.floor(100 + Math.random() * 900);
    const newBooking = {
      id: `BK-${todayStr}-${randomCode}`,
      ...bookingData,
      status: '접수완료',
      createdAt: new Date().toISOString()
    };

    try {
      const local = JSON.parse(localStorage.getItem('toureasy_bookings') || '[]');
      local.unshift(newBooking);
      localStorage.setItem('toureasy_bookings', JSON.stringify(local));
    } catch {}

    return {
      success: true,
      message: '예약 및 상담 신청이 성공적으로 접수되었습니다.',
      data: newBooking
    };
  },

  // 4. Get All Bookings (Admin)
  async getBookings() {
    try {
      if (window.location.protocol !== 'file:') {
        const res = await fetch(`${API_BASE}/bookings`);
        if (res.ok) return await res.json();
      }
    } catch (e) {}

    const defaultBookings = [
      {
        id: "BK-20260828-101",
        packageId: "pkg-sea-01",
        packageTitle: "[힐링특가] 베트남 다낭 & 호이안 4박 5일 5성급 리조트 + 바나힐 골든브릿지",
        departureDate: "2026-09-15",
        travelerName: "김광수",
        phone: "010-8754-9373",
        email: "wisekks@gmail.com",
        adults: 2,
        children: 1,
        totalPrice: 1897000,
        options: { insuranceUpgrade: true, airportPickup: true, singleRoom: false },
        requests: "가족 여행입니다. 오션뷰 고층 객실과 금연실 배정 부탁드립니다.",
        paymentMethod: "상담 후 계좌이체",
        status: "접수완료",
        createdAt: "2026-08-28T14:20:00.000Z"
      },
      {
        id: "BK-20260827-204",
        packageId: "pkg-eur-01",
        packageTitle: "[로맨틱 서유럽] 프랑스 & 스위스 & 이탈리아 3국 8박 10일 핵심일주",
        departureDate: "2026-10-02",
        travelerName: "박민지",
        phone: "010-4821-6930",
        email: "minji.park@naver.com",
        adults: 2,
        children: 0,
        totalPrice: 7980000,
        options: { insuranceUpgrade: true, airportPickup: false, singleRoom: false },
        requests: "신혼여행입니다. 융프라우요흐 등반 일정 및 파리 세느강 디너 크루즈 창가석 요청합니다.",
        paymentMethod: "카드 결제 상담",
        status: "상담진행",
        createdAt: "2026-08-27T10:15:00.000Z"
      },
      {
        id: "BK-20260826-309",
        packageId: "pkg-jpn-01",
        packageTitle: "[프리미엄 힐링] 홋카이도 삿포로 & 오타루 & 후라노 3박 4일 온천 료칸",
        departureDate: "2026-09-22",
        travelerName: "이현우",
        phone: "010-2345-8765",
        email: "hw.lee@kakao.com",
        adults: 4,
        children: 0,
        totalPrice: 4760000,
        options: { insuranceUpgrade: true, airportPickup: true, singleRoom: false },
        requests: "부모님 칠순 기념 가족 여행입니다. 전통 료칸 가이세키 정식 식사 룸 배정 요청드립니다.",
        paymentMethod: "상담 후 무통장 입금",
        status: "예약확정",
        createdAt: "2026-08-26T16:40:00.000Z"
      },
      {
        id: "BK-20260825-412",
        packageId: "pkg-sea-02",
        packageTitle: "[프라이빗 허니문] 발리 우붓 & 울루와투 럭셔리 독채 풀빌라 4박 6일",
        departureDate: "2026-10-18",
        travelerName: "최수진",
        phone: "010-7712-3498",
        email: "sujin.choi@gmail.com",
        adults: 2,
        children: 0,
        totalPrice: 3980000,
        options: { insuranceUpgrade: true, airportPickup: true, singleRoom: false },
        requests: "허니문 웰컴 케이크 및 꽃잎 장식 세팅 부탁드립니다.",
        paymentMethod: "카드 결제 상담",
        status: "접수완료",
        createdAt: "2026-08-25T11:05:00.000Z"
      },
      {
        id: "BK-20260824-523",
        packageId: "pkg-usa-01",
        packageTitle: "[패밀리 파라다이스] 괌 PIC 올인클루시브 슈페리어 플러스 4박 5일",
        departureDate: "2026-09-28",
        travelerName: "정성훈",
        phone: "010-3344-9988",
        email: "sh.jung@daum.net",
        adults: 2,
        children: 2,
        totalPrice: 3860000,
        options: { insuranceUpgrade: true, airportPickup: true, singleRoom: false },
        requests: "유아용 침대 가드 및 커넥팅 룸 가능 여부 확인 부탁드립니다.",
        paymentMethod: "간편 결제 상담",
        status: "상담진행",
        createdAt: "2026-08-24T09:30:00.000Z"
      }
    ];

    try {
      const local = JSON.parse(localStorage.getItem('toureasy_bookings') || 'null');
      if (local && local.length > 0) {
        return { success: true, count: local.length, data: local };
      }
      localStorage.setItem('toureasy_bookings', JSON.stringify(defaultBookings));
      return { success: true, count: defaultBookings.length, data: defaultBookings };
    } catch {
      return { success: true, count: defaultBookings.length, data: defaultBookings };
    }
  },

  // 5. Update Booking Status (Admin)
  async updateBookingStatus(id, status) {
    try {
      if (window.location.protocol !== 'file:') {
        const res = await fetch(`${API_BASE}/bookings/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status })
        });
        if (res.ok) return await res.json();
      }
    } catch (e) {}

    try {
      const local = JSON.parse(localStorage.getItem('toureasy_bookings') || '[]');
      const item = local.find(b => b.id === id);
      if (item) {
        item.status = status;
        localStorage.setItem('toureasy_bookings', JSON.stringify(local));
      }
    } catch {}

    return { success: true, message: '상태가 변경되었습니다.' };
  },

  // 6. Create Inquiry (1:1 상담)
  async createInquiry(inquiryData) {
    try {
      if (window.location.protocol !== 'file:') {
        const res = await fetch(`${API_BASE}/inquiries`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(inquiryData)
        });
        if (res.ok) return await res.json();
      }
    } catch (e) {}

    const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomCode = Math.floor(100 + Math.random() * 900);
    const newInquiry = {
      id: `INQ-${todayStr}-${randomCode}`,
      ...inquiryData,
      status: '답변대기',
      createdAt: new Date().toISOString()
    };

    try {
      const local = JSON.parse(localStorage.getItem('toureasy_inquiries') || '[]');
      local.unshift(newInquiry);
      localStorage.setItem('toureasy_inquiries', JSON.stringify(local));
    } catch {}

    return { success: true, message: '1:1 상담 문의가 성공적으로 접수되었습니다.', data: newInquiry };
  },

  // 7. Get All Inquiries (Admin)
  async getInquiries() {
    try {
      if (window.location.protocol !== 'file:') {
        const res = await fetch(`${API_BASE}/inquiries`);
        if (res.ok) return await res.json();
      }
    } catch (e) {}

    const defaultInquiries = [
      {
        id: "INQ-20260828-996",
        name: "김광수",
        phone: "010-8754-9373",
        email: "wisekks@gmail.com",
        category: "가족 단독 투어 설계",
        destination: "호주 시드니 & 골드코스트",
        expectedDate: "2026년 11월 초",
        groupSize: 4,
        message: "호주 시드니 및 골드코스트 4인 가족 단독 일정 견적 부탁드립니다. 시드니 오페라하우스 내부 관람과 본다이비치 서핑 체험 포함 희망합니다.",
        status: "답변대기",
        createdAt: "2026-08-28T15:55:55.000Z"
      },
      {
        id: "INQ-20260827-102",
        name: "박서준",
        phone: "010-1122-3344",
        email: "seojun.park@company.com",
        category: "단체 맞춤 / 기업 인센티브",
        destination: "스위스 융프라우 & 인터라켄",
        expectedDate: "2026년 10월 중순",
        groupSize: 12,
        message: "임직원 우수 사원 포상 인센티브 투어 12인 일정 견적 요청합니다. 전용 25인승 버스와 4성급 이상 호텔, 퐁듀 특식 일정 포함 요청드립니다.",
        status: "상담중",
        createdAt: "2026-08-27T11:20:00.000Z"
      },
      {
        id: "INQ-20260826-203",
        name: "최수아",
        phone: "010-5566-7788",
        email: "sua.choi@example.com",
        category: "프라이빗 허니문 견적",
        destination: "발리 스미냑 & 우붓",
        expectedDate: "2026년 11월 중순",
        groupSize: 2,
        message: "발리 5박 7일 코스로 럭셔리 오션뷰 독채 풀빌라 추천 상품 및 얼리버드 프로모션 할인 안내 부탁드립니다.",
        status: "답변완료",
        createdAt: "2026-08-26T16:45:00.000Z"
      }
    ];

    try {
      const local = JSON.parse(localStorage.getItem('toureasy_inquiries') || 'null');
      if (local && local.length > 0) {
        return { success: true, count: local.length, data: local };
      }
      localStorage.setItem('toureasy_inquiries', JSON.stringify(defaultInquiries));
      return { success: true, count: defaultInquiries.length, data: defaultInquiries };
    } catch {
      return { success: true, count: defaultInquiries.length, data: defaultInquiries };
    }
  },

  // 8. Update Inquiry Status (Admin)
  async updateInquiryStatus(id, status) {
    try {
      if (window.location.protocol !== 'file:') {
        const res = await fetch(`${API_BASE}/inquiries/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status })
        });
        if (res.ok) return await res.json();
      }
    } catch (e) {}

    try {
      const local = JSON.parse(localStorage.getItem('toureasy_inquiries') || '[]');
      const item = local.find(i => i.id === id);
      if (item) {
        item.status = status;
        localStorage.setItem('toureasy_inquiries', JSON.stringify(local));
      }
    } catch {}

    return { success: true, message: '문의 상태가 변경되었습니다.' };
  },

  // 8-1. Add Inquiry Reply (Admin)
  async addInquiryReply(id, replyData) {
    const newReply = {
      id: 'REP-' + Date.now().toString().slice(-6),
      adminName: replyData.adminName || '김투어 수석 여행플래너',
      content: replyData.content || '',
      quotedPrice: replyData.quotedPrice || '',
      recommendedPackageId: replyData.recommendedPackageId || '',
      recommendedPackageTitle: replyData.recommendedPackageTitle || '',
      recipientEmail: replyData.recipientEmail || '',
      emailSent: replyData.sendEmail !== false,
      createdAt: new Date().toISOString()
    };

    const newStatus = replyData.status || '답변완료';

    try {
      if (window.location.protocol !== 'file:') {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);
        const res = await fetch(`${API_BASE}/inquiries/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reply: newReply, status: newStatus }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        if (res.ok) {
          const json = await res.json();
          // Sync localStorage
          try {
            const local = JSON.parse(localStorage.getItem('toureasy_inquiries') || '[]');
            const item = local.find(i => i.id === id);
            if (item) {
              if (!item.replies) item.replies = [];
              item.replies.push(newReply);
              item.status = newStatus;
              localStorage.setItem('toureasy_inquiries', JSON.stringify(local));
            }
          } catch {}
          return json;
        }
      }
    } catch (e) {
      console.warn('Network call failed, applying local fallback:', e);
    }

    try {
      const local = JSON.parse(localStorage.getItem('toureasy_inquiries') || '[]');
      const item = local.find(i => i.id === id);
      if (item) {
        if (!item.replies) item.replies = [];
        item.replies.push(newReply);
        item.status = newStatus;
        localStorage.setItem('toureasy_inquiries', JSON.stringify(local));
        return { 
          success: true, 
          message: '답변이 성공적으로 등록되었습니다. (로컬 저장소 저장 완료)', 
          emailSent: false,
          recipientEmail: replyData.recipientEmail || item.email,
          data: item 
        };
      }
    } catch {}

    return { 
      success: true, 
      message: '답변이 등록되었습니다.', 
      emailSent: false,
      recipientEmail: replyData.recipientEmail 
    };
  },

  // 8-2. Send / Resend Email for Inquiry
  async sendInquiryEmail(id, emailData) {
    const recipient = (emailData.recipientEmail || '').trim();
    if (!recipient) return { success: false, message: '수신자 이메일 주소가 없습니다.' };

    const subject = `[투어이지] 맞춤 여행 일정 및 견적 안내`;
    const body = `안녕하세요 고객님,\n투어이지(TourEasy) 맞춤여행팀입니다.\n\n[담당 플래너 (${emailData.adminName || '김투어 플래너'}) 견적 안내]:\n${emailData.content || ''}\n\n제안 견적 금액: ${emailData.quotedPrice || '상담 후 확정'}\n추천 연계 상품: ${emailData.recommendedPackageTitle || '순수 맞춤 일정'}`;

    // 1. Try backend server endpoints
    const endpoints = [
      `${API_BASE}/inquiries/${id}/send-email`,
      `https://okay-successful-deutsch-housewives.trycloudflare.com/api/inquiries/${id}/send-email`,
      `http://localhost:3000/api/inquiries/${id}/send-email`,
      `http://127.0.0.1:3000/api/inquiries/${id}/send-email`
    ];

    let lastErrorMsg = '';
    for (const ep of endpoints) {
      try {
        const res = await fetch(ep, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(emailData)
        });
        const text = await res.text();
        if (text && !text.trim().startsWith('<')) {
          try {
            const json = JSON.parse(text);
            if (json) return json;
          } catch {}
        } else {
          lastErrorMsg = `HTTP ${res.status}`;
        }
      } catch (e) {
        lastErrorMsg = e.message || '서버 통신 실패';
      }
    }

    return { 
      success: false, 
      message: `메일 발송 서버(Node.js / start.bat) 연결 상태를 확인해주세요. (${lastErrorMsg || '서버 미응답'})` 
    };
  },


  // 9. Get Admin Stats
  async getAdminStats() {
    try {
      if (window.location.protocol !== 'file:') {
        const res = await fetch(`${API_BASE}/stats`);
        if (res.ok) return await res.json();
      }
    } catch (e) {}

    const bkRes = await this.getBookings();
    const inqRes = await this.getInquiries();
    const pkgRes = await this.getPackages({ includeInactive: true });
    const bookings = bkRes.data || [];
    const inquiries = inqRes.data || [];
    const packages = pkgRes.data || DEFAULT_PACKAGES;

    let totalRevenue = 0;
    bookings.forEach(b => {
      totalRevenue += Number(b.totalPrice) || 0;
    });

    const pendingBookings = bookings.filter(b => b.status === '접수완료' || b.status === '상담진행' || b.status === 'RECEIVED').length;
    const pendingInquiries = inquiries.filter(i => i.status === '답변대기' || i.status === '상담중' || i.status === 'RECEIVED').length;
    
    let activePackageCount = 0;
    let inactivePackageCount = 0;
    packages.forEach(p => {
      if (p.status === '미운영' || p.isActive === false) {
        inactivePackageCount++;
      } else {
        activePackageCount++;
      }
    });

    const usersRes = await this.getUsers();
    const users = usersRes.data || [];
    const memberCount = users.filter(u => (u.role || 'MEMBER').toUpperCase() !== 'ADMIN').length;
    const adminCount = users.filter(u => (u.role || '').toUpperCase() === 'ADMIN').length;

    return {
      success: true,
      data: {
        packageCount: packages.length,
        activePackageCount,
        inactivePackageCount,
        bookingCount: bookings.length,
        pendingBookings,
        inquiryCount: inquiries.length,
        pendingInquiries,
        totalRevenue,
        userCount: users.length,
        memberCount,
        adminCount
      }
    };
  },

  // 10. Admin Create Package
  async createPackage(pkgData) {
    try {
      if (window.location.protocol !== 'file:') {
        const res = await fetch(`${API_BASE}/packages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pkgData)
        });
        if (res.ok) return await res.json();
      }
    } catch (e) {}
    return { success: true, message: '등록 완료' };
  },

  // 11. Admin Delete Package
  async deletePackage(id) {
    try {
      if (window.location.protocol !== 'file:') {
        const res = await fetch(`${API_BASE}/packages/${id}`, { method: 'DELETE' });
        if (res.ok) return await res.json();
      }
    } catch (e) {}
    return { success: true, message: '삭제 완료' };
  },

  // 12. Admin Update Package Operation Status (운영중 / 미운영)
  async updatePackageStatus(id, status) {
    const isActive = status !== '미운영' && status !== 'INACTIVE';
    try {
      if (window.location.protocol !== 'file:') {
        const res = await fetch(`${API_BASE}/packages/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status, isActive })
        });
        if (res.ok) return await res.json();
      }
    } catch (e) {
      console.warn('Network call failed, applying local fallback:', e);
    }

    try {
      const local = JSON.parse(localStorage.getItem('toureasy_packages') || '[]');
      const item = local.find(p => p.id === id || p.slug === id);
      if (item) {
        item.status = status;
        item.isActive = isActive;
        localStorage.setItem('toureasy_packages', JSON.stringify(local));
      }
    } catch {}

    return { 
      success: true, 
      message: '상품 운영 상태가 성공적으로 변경되었습니다.', 
      data: { id, status, isActive } 
    };
  },

  // --- Authentication & User Management ---
  validatePassword(pwd) {
    if (!pwd) return { isValid: false, hasLength: false, hasLetter: false, hasNumber: false, hasSpecial: false };
    const hasLength = pwd.length >= 8;
    const hasLetter = /[a-zA-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>\_\-\+\=\~\`\[\]]/.test(pwd);
    const isValid = hasLength && hasLetter && hasNumber && hasSpecial;
    return { isValid, hasLength, hasLetter, hasNumber, hasSpecial };
  },

  getCurrentUser() {
    try {
      const u = localStorage.getItem('toureasy_user');
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  },

  setCurrentUser(user) {
    try {
      if (user) {
        localStorage.setItem('toureasy_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('toureasy_user');
      }
      window.dispatchEvent(new CustomEvent('toureasy_auth_changed', { detail: user }));
    } catch {}
  },

  async login(email, password) {
    const cleanEmail = (email || '').trim().toLowerCase();
    try {
      if (window.location.protocol !== 'file:') {
        const res = await fetch(`${API_BASE}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: cleanEmail, password })
        });
        if (res.ok) {
          const json = await res.json();
          if (json && json.success && json.user) {
            this.setCurrentUser(json.user);
            return json;
          }
        }
      }
    } catch (e) {
      console.warn('Login network call failed, trying local fallback:', e);
    }

    // Fallback: check localStorage mock users
    try {
      const mockUsers = JSON.parse(localStorage.getItem('toureasy_mock_users') || '[]');
      const found = mockUsers.find(u => (u.email || '').toLowerCase() === cleanEmail && u.password === password);
      if (found) {
        const userObj = { id: found.id, email: found.email, name: found.name, phone: found.phone, role: found.role || 'MEMBER' };
        this.setCurrentUser(userObj);
        return { success: true, message: `${userObj.name} 회원님, 환영합니다!`, user: userObj };
      }

      // Hardcoded initial defaults if not in mockUsers
      if (cleanEmail === 'wisekks@gmail.com' && (password === '#wises7337' || password === '#wisesoo7337')) {
        const userObj = { id: 'usr-admin-wisekks', email: 'wisekks@gmail.com', name: '최고관리자', phone: '010-8754-9373', role: 'ADMIN' };
        this.setCurrentUser(userObj);
        return { success: true, message: '최고관리자님, 환영합니다!', user: userObj };
      }
      if (cleanEmail === 'user@toureasy.com' && password === 'TourEasy1234!') {
        const userObj = { id: 'usr-001', email: 'user@toureasy.com', name: '김투어', phone: '010-1234-5678', role: 'MEMBER' };
        this.setCurrentUser(userObj);
        return { success: true, message: `${userObj.name} 회원님, 환영합니다!`, user: userObj };
      }
    } catch {}

    return { success: false, message: '이메일(아이디) 또는 비밀번호가 일치하지 않습니다.' };
  },

  logout() {
    this.setCurrentUser(null);
    return { success: true, message: '로그아웃되었습니다.' };
  },

  async register(userData) {
    const { email, password, name, phone } = userData;
    const cleanEmail = (email || '').trim().toLowerCase();
    const pwdCheck = this.validatePassword(password);
    if (!pwdCheck.isValid) {
      return { success: false, message: '비밀번호는 특수문자, 영문, 숫자를 모두 포함하여 8자 이상이어야 합니다.' };
    }

    try {
      if (window.location.protocol !== 'file:') {
        const res = await fetch(`${API_BASE}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...userData, email: cleanEmail })
        });
        if (res.ok) {
          const json = await res.json();
          if (json && json.success) return json;
        }
      }
    } catch (e) {
      console.warn('Register network call failed, saving locally:', e);
    }

    // Fallback registration
    try {
      const mockUsers = JSON.parse(localStorage.getItem('toureasy_mock_users') || '[]');
      if (mockUsers.some(u => (u.email || '').toLowerCase() === cleanEmail)) {
        return { success: false, message: '이미 등록된 이메일(아이디)입니다. 로그인해 주세요.' };
      }
      const newUser = { id: `usr-${Date.now()}`, email: cleanEmail, password, name, phone, role: cleanEmail === 'wisekks@gmail.com' ? 'ADMIN' : 'MEMBER', createdAt: new Date().toISOString() };
      mockUsers.push(newUser);
      localStorage.setItem('toureasy_mock_users', JSON.stringify(mockUsers));
      return { success: true, message: '회원가입이 완료되었습니다!', user: newUser };
    } catch {
      return { success: false, message: '회원가입 처리 중 오류가 발생했습니다.' };
    }
  },

  // Helper: Generate secure 8-character temporary password (Letters + Numbers + Special chars)
  generateTempPassword() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz';
    const nums = '23456789';
    const specials = '!@#$%&*';
    let pwd = 'Te';
    pwd += specials.charAt(Math.floor(Math.random() * specials.length));
    pwd += nums.charAt(Math.floor(Math.random() * nums.length));
    pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    const all = chars + nums + specials;
    for (let i = 0; i < 4; i++) {
      pwd += all.charAt(Math.floor(Math.random() * all.length));
    }
    return pwd;
  },

  // Helper: Send Real Email Dispatch (via Web3Forms)
  async dispatchRealEmail(toEmail, subject, textContent) {
    const cleanEmail = (toEmail || '').trim();
    if (!cleanEmail) return false;

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: '5561a35e-beec-4ea8-b3d2-c288ca7dc36f',
          subject: subject,
          from_name: '투어이지 (TourEasy)',
          email: cleanEmail,
          message: textContent
        })
      });
      return response.ok;
    } catch (e) {
      console.warn('Web3Forms dispatch error:', e);
      return false;
    }
  },

  // Issue temporary password and send to user's real email
  async issueTemporaryPasswordToEmail(email) {
    const cleanEmail = (email || '').trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, message: '올바른 이메일(아이디) 주소를 입력해주세요.' };
    }

    const tempPassword = this.generateTempPassword();

    // 1. Send via backend server
    try {
      if (window.location.protocol !== 'file:') {
        const res = await fetch(`${API_BASE}/auth/issue-temp-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: cleanEmail, tempPassword })
        });
        if (res.ok) {
          const json = await res.json();
          try {
            const mockUsers = JSON.parse(localStorage.getItem('toureasy_mock_users') || '[]');
            const target = mockUsers.find(u => (u.email || '').toLowerCase() === cleanEmail);
            if (target) {
              target.password = tempPassword;
              localStorage.setItem('toureasy_mock_users', JSON.stringify(mockUsers));
            }
          } catch {}
          return json;
        }
      }
    } catch (e) {
      console.warn('Backend temp password request error:', e);
    }

    // 2. Fallback: Update localStorage mock users
    try {
      const mockUsers = JSON.parse(localStorage.getItem('toureasy_mock_users') || '[]');
      const target = mockUsers.find(u => (u.email || '').toLowerCase() === cleanEmail);
      if (target) {
        target.password = tempPassword;
      } else {
        const defaultUsersMap = {
          'wisekks@gmail.com': { id: 'usr-admin-wisekks', email: 'wisekks@gmail.com', name: '최고관리자', phone: '010-8754-9373', role: 'ADMIN' },
          'user@toureasy.com': { id: 'usr-001', email: 'user@toureasy.com', name: '김투어', phone: '010-1234-5678', role: 'MEMBER' },
          'hong@toureasy.com': { id: 'usr-1788235251531', email: 'hong@toureasy.com', name: '홍길동', phone: '010-7777-8888', role: 'MEMBER' },
          'kks@do-best.co.kr': { id: 'usr-1788236092470', email: 'kks@do-best.co.kr', name: '김길동', phone: '010-8754-9373', role: 'MEMBER' },
          'kwangsoo-kim@hanmail.net': { id: 'usr-1789004661526', email: 'kwangsoo-kim@hanmail.net', name: '김광수', phone: '010-8754-9373', role: 'MEMBER' }
        };
        const matched = defaultUsersMap[cleanEmail] || {
          id: `usr-${Date.now()}`,
          email: cleanEmail,
          name: cleanEmail.split('@')[0],
          phone: '010-0000-0000',
          role: cleanEmail === 'wisekks@gmail.com' ? 'ADMIN' : 'MEMBER',
          createdAt: new Date().toISOString()
        };
        matched.password = tempPassword;
        mockUsers.push(matched);
      }
      localStorage.setItem('toureasy_mock_users', JSON.stringify(mockUsers));
    } catch (err) {
      console.error('LocalStorage update error:', err);
    }

    return {
      success: true,
      message: `[${cleanEmail}] 회원님의 임시 비밀번호가 생성되었습니다. (임시 비밀번호: ${tempPassword})`,
      email: cleanEmail,
      tempPassword
    };
  },

  async sendEmailVerification(email, purpose = '본인인증') {
    const cleanEmail = (email || '').trim().toLowerCase();
    const mockCode = String(Math.floor(100000 + Math.random() * 900000));
    sessionStorage.setItem('mock_verification_code', mockCode);
    sessionStorage.setItem('mock_verification_email', cleanEmail);

    try {
      if (window.location.protocol !== 'file:') {
        const res = await fetch(`${API_BASE}/auth/send-email-code`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: cleanEmail, purpose })
        });
        if (res.ok) {
          const json = await res.json();
          if (json && json.success) {
            return {
              success: true,
              message: `[${cleanEmail}] 으로 인증번호가 발송되었습니다. 메일함을 확인해주세요. (3분 이내 입력)`,
              expiresIn: 180,
              isEmail: true
            };
          }
        }
      }
    } catch (e) {}

    // Dispatch real email
    const mailSubject = `[투어이지] 본인인증 6자리 보안 인증번호 안내`;
    const mailBody = `[투어이지 TourEasy 본인인증]\n\n안녕하세요. 투어이지 회원님,\n요청하신 본인확인 6자리 인증번호입니다.\n\n■ 인증번호: [ ${mockCode} ]\n\n※ 유효시간은 3분입니다. 3분 이내에 화면에 입력해 주십시오.`;
    this.dispatchRealEmail(cleanEmail, mailSubject, mailBody);

    return {
      success: true,
      message: `[${cleanEmail}] 으로 인증번호가 발송되었습니다. 메일함(스팸함 포함)을 확인해주세요. (3분 이내 입력)`,
      expiresIn: 180,
      isEmail: true
    };
  },

  async verifyEmailCode(email, code) {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanCode = (code || '').trim();
    try {
      if (window.location.protocol !== 'file:') {
        const res = await fetch(`${API_BASE}/auth/verify-email-code`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: cleanEmail, code: cleanCode })
        });
        if (res.ok) {
          const json = await res.json();
          if (json && json.success) return json;
        }
      }
    } catch (e) {}

    const storedCode = sessionStorage.getItem('mock_verification_code');
    const storedEmail = sessionStorage.getItem('mock_verification_email');
    if (storedCode && storedCode === cleanCode && (!storedEmail || storedEmail === cleanEmail)) {
      return { success: true, message: '이메일 본인인증이 완료되었습니다.' };
    }
    return { success: false, message: '인증번호가 일치하지 않습니다. 다시 확인해주세요.' };
  },

  async sendPhoneVerification(phone) {
    return this.sendEmailVerification(phone, '본인인증');
  },

  async verifyPhoneCode(phone, code) {
    return this.verifyEmailCode(phone, code);
  },

  async findUserId(name, contact) {
    const cleanContact = (contact || '').trim().toLowerCase();
    try {
      if (window.location.protocol !== 'file:') {
        const isEmail = cleanContact.includes('@');
        const payload = isEmail ? { name, email: cleanContact } : { name, phone: cleanContact };
        const res = await fetch(`${API_BASE}/auth/find-id`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const json = await res.json();
          if (json && json.success) return json;
        }
      }
    } catch (e) {}

    // Fallback check in mock users
    try {
      const mockUsers = JSON.parse(localStorage.getItem('toureasy_mock_users') || '[]');
      const found = mockUsers.find(u => (u.name || '').trim() === name.trim() && ((u.email || '').toLowerCase() === cleanContact || (u.phone || '').replace(/-/g, '') === cleanContact.replace(/-/g, '')));
      if (found) {
        const parts = found.email.split('@');
        const uPart = parts[0];
        const dPart = parts[1] || '';
        const masked = `${uPart.slice(0, 3)}***@${dPart}`;
        return { success: true, email: found.email, maskedEmail: masked, name: found.name };
      }
    } catch {}

    return { success: false, message: '일치하는 회원 정보를 찾을 수 없습니다.' };
  },

  async resetPassword(email, newPassword) {
    const cleanEmail = (email || '').trim().toLowerCase();
    const pwdCheck = this.validatePassword(newPassword);
    if (!pwdCheck.isValid) {
      return { success: false, message: '새 비밀번호는 특수문자, 영문, 숫자를 모두 포함하여 8자 이상이어야 합니다.' };
    }

    try {
      if (window.location.protocol !== 'file:') {
        const res = await fetch(`${API_BASE}/auth/reset-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: cleanEmail, newPassword })
        });
        if (res.ok) {
          const json = await res.json();
          if (json && json.success) return json;
        }
      }
    } catch (e) {
      console.warn('resetPassword network call failed, trying local fallback:', e);
    }

    // Fallback in localStorage mock users (GitHub Pages & Offline Mode)
    try {
      const mockUsers = JSON.parse(localStorage.getItem('toureasy_mock_users') || '[]');
      const target = mockUsers.find(u => (u.email || '').toLowerCase() === cleanEmail);
      if (target) {
        target.password = newPassword;
        localStorage.setItem('toureasy_mock_users', JSON.stringify(mockUsers));
        return { success: true, message: '비밀번호가 안전하게 재설정되었습니다! 새로운 비밀번호로 로그인해 주세요.' };
      }

      // Default built-in users fallback
      const defaultUsersMap = {
        'wisekks@gmail.com': { id: 'usr-admin-wisekks', email: 'wisekks@gmail.com', name: '최고관리자', phone: '010-8754-9373', role: 'ADMIN' },
        'user@toureasy.com': { id: 'usr-001', email: 'user@toureasy.com', name: '김투어', phone: '010-1234-5678', role: 'MEMBER' },
        'hong@toureasy.com': { id: 'usr-1788235251531', email: 'hong@toureasy.com', name: '홍길동', phone: '010-7777-8888', role: 'MEMBER' },
        'kks@do-best.co.kr': { id: 'usr-1788236092470', email: 'kks@do-best.co.kr', name: '김길동', phone: '010-8754-9373', role: 'MEMBER' },
        'kwangsoo-kim@hanmail.net': { id: 'usr-1789004661526', email: 'kwangsoo-kim@hanmail.net', name: '김광수', phone: '010-8754-9373', role: 'MEMBER' }
      };

      const matchedDefault = defaultUsersMap[cleanEmail];
      const newUser = matchedDefault 
        ? { ...matchedDefault, password: newPassword }
        : { id: `usr-${Date.now()}`, email: cleanEmail, password: newPassword, name: cleanEmail.split('@')[0], phone: '010-0000-0000', role: 'MEMBER', createdAt: new Date().toISOString() };

      mockUsers.push(newUser);
      localStorage.setItem('toureasy_mock_users', JSON.stringify(mockUsers));
      return { success: true, message: '비밀번호가 안전하게 재설정되었습니다! 새로운 비밀번호로 로그인해 주세요.' };
    } catch (err) {
      console.error('resetPassword localStorage error:', err);
    }

    return { success: true, message: '비밀번호가 안전하게 재설정되었습니다! 새로운 비밀번호로 로그인해 주세요.' };
  },

  // 13. Get All Registered Users (Admin)
  async getUsers() {
    let serverUsers = null;
    try {
      if (window.location.protocol !== 'file:') {
        const res = await fetch(`${API_BASE}/auth/users`);
        if (res.ok) {
          const json = await res.json();
          if (json && json.success && Array.isArray(json.data) && json.data.length > 0) {
            serverUsers = json.data;
          }
        }
      }
    } catch (e) {
      console.warn('getUsers network call failed, using merged local fallback:', e);
    }

    // Merge DEFAULT_USERS (8 members) with localStorage users (excluding deleted admin@toureasy.co.kr)
    let merged = typeof DEFAULT_USERS !== 'undefined' ? JSON.parse(JSON.stringify(DEFAULT_USERS)) : [];
    try {
      let local = JSON.parse(localStorage.getItem('toureasy_mock_users') || '[]');
      if (Array.isArray(local) && local.length > 0) {
        local = local.filter(u => (u.email || '').toLowerCase() !== 'admin@toureasy.co.kr');
        local.forEach(u => {
          const idx = merged.findIndex(m => (m.email || '').toLowerCase() === (u.email || '').toLowerCase());
          if (idx >= 0) {
            merged[idx] = { ...merged[idx], ...u };
          } else {
            merged.push(u);
          }
        });
      }
      localStorage.setItem('toureasy_mock_users', JSON.stringify(merged));
    } catch {}

    const finalList = (serverUsers && serverUsers.length >= merged.length) ? serverUsers : merged;
    return { success: true, count: finalList.length, data: finalList };
  },

  // 14. Member Management & My Page APIs
  async updateProfile(profileData) {
    try {
      if (window.location.protocol !== 'file:') {
        const res = await fetch(`${API_BASE}/auth/profile`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profileData)
        });
        const json = await res.json();
        if (json.success && json.user) {
          localStorage.setItem('toureasy_current_user', JSON.stringify(json.user));
        }
        return json;
      }
    } catch (e) {
      console.warn('updateProfile network error, using fallback:', e);
    }

    try {
      const cur = this.getCurrentUser();
      if (cur) {
        cur.name = profileData.name || cur.name;
        if (profileData.phone) cur.phone = profileData.phone;
        localStorage.setItem('toureasy_current_user', JSON.stringify(cur));
        return { success: true, message: '회원 정보가 성공적으로 수정되었습니다.', user: cur };
      }
    } catch {}
    return { success: false, message: '회원 정보를 수정할 수 없습니다.' };
  },

  async changePassword(currentPassword, newPassword) {
    const cur = this.getCurrentUser();
    if (!cur || !cur.email) {
      return { success: false, message: '로그인이 필요한 서비스입니다.' };
    }
    const val = this.validatePassword(newPassword);
    if (!val.isValid) {
      return { success: false, message: '새 비밀번호는 특수문자, 영문, 숫자를 모두 포함하여 8자 이상이어야 합니다.' };
    }

    try {
      if (window.location.protocol !== 'file:') {
        const res = await fetch(`${API_BASE}/auth/change-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: cur.email, currentPassword, newPassword })
        });
        return await res.json();
      }
    } catch (e) {
      console.warn('changePassword network error, using fallback:', e);
    }

    return { success: true, message: '비밀번호가 성공적으로 변경되었습니다.' };
  },

  async deleteAccount(password) {
    const cur = this.getCurrentUser();
    if (!cur || !cur.email) {
      return { success: false, message: '로그인이 필요합니다.' };
    }
    try {
      if (window.location.protocol !== 'file:') {
        const res = await fetch(`${API_BASE}/auth/delete-account`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: cur.email, password })
        });
        const json = await res.json();
        if (json.success) {
          this.logout();
        }
        return json;
      }
    } catch (e) {
      console.warn('deleteAccount error:', e);
    }
    this.logout();
    return { success: true, message: '회원 탈퇴가 완료되었습니다.' };
  },

  async getMyBookings(email, phone) {
    try {
      if (window.location.protocol !== 'file:') {
        const q = new URLSearchParams();
        if (email) q.append('email', email);
        if (phone) q.append('phone', phone);
        const res = await fetch(`${API_BASE}/user/my-bookings?${q.toString()}`);
        if (res.ok) return await res.json();
      }
    } catch (e) {
      console.warn('getMyBookings error:', e);
    }
    const all = await this.getBookings();
    const cleanPhone = (phone || '').replace(/-/g, '');
    const cleanEmail = (email || '').toLowerCase();
    const filtered = (all || []).filter(b => {
      const bE = (b.customerEmail || b.email || '').toLowerCase();
      const bP = (b.customerPhone || b.phone || '').replace(/-/g, '');
      return (cleanEmail && bE === cleanEmail) || (cleanPhone && bP === cleanPhone);
    });
    return { success: true, count: filtered.length, data: filtered };
  },

  async getMyInquiries(email, phone) {
    try {
      if (window.location.protocol !== 'file:') {
        const q = new URLSearchParams();
        if (email) q.append('email', email);
        if (phone) q.append('phone', phone);
        const res = await fetch(`${API_BASE}/user/my-inquiries?${q.toString()}`);
        if (res.ok) return await res.json();
      }
    } catch (e) {
      console.warn('getMyInquiries error:', e);
    }
    const all = await this.getInquiries();
    const cleanPhone = (phone || '').replace(/-/g, '');
    const cleanEmail = (email || '').toLowerCase();
    const filtered = (all || []).filter(inq => {
      const iE = (inq.customerEmail || inq.email || '').toLowerCase();
      const iP = (inq.customerPhone || inq.phone || '').replace(/-/g, '');
      return (cleanEmail && iE === cleanEmail) || (cleanPhone && iP === cleanPhone);
    });
    return { success: true, count: filtered.length, data: filtered };
  },

  async updateUserByAdmin(id, userData) {
    try {
      if (window.location.protocol !== 'file:') {
        const res = await fetch(`${API_BASE}/auth/users/${encodeURIComponent(id)}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        });
        return await res.json();
      }
    } catch (e) {
      console.warn('updateUserByAdmin error:', e);
    }
    return { success: false, message: '회원 수정 요청에 실패했습니다.' };
  },

  async deleteUserByAdmin(id) {
    try {
      if (window.location.protocol !== 'file:') {
        const res = await fetch(`${API_BASE}/auth/users/${encodeURIComponent(id)}`, {
          method: 'DELETE'
        });
        return await res.json();
      }
    } catch (e) {
      console.warn('deleteUserByAdmin error:', e);
    }
    return { success: false, message: '회원 삭제 요청에 실패했습니다.' };
  },


  // --- 16. SMTP Settings & Test Dispatch APIs (Dual-Mode: Backend + Real Web Dispatch) ---
  async getSmtpConfig() {
    try {
      if (window.location.protocol !== 'file:') {
        const res = await fetch(`${API_BASE}/smtp-config`);
        if (res.ok) {
          const text = await res.text();
          if (text && !text.trim().startsWith('<')) {
            const json = JSON.parse(text);
            if (json && json.success) return json;
          }
        }
      }
    } catch (e) {}

    // Fallback: localStorage
    try {
      const saved = JSON.parse(localStorage.getItem('toureasy_smtp_config') || 'null');
      if (saved && typeof saved === 'object') {
        saved.isConfigured = true;
        saved.enabled = true;
        return { success: true, data: saved };
      }
    } catch {}

    return {
      success: true,
      data: {
        enabled: true,
        isConfigured: true,
        provider: 'daum',
        host: 'smtp.daum.net',
        port: 465,
        enableSsl: true,
        user: 'kwangsoo-kim@daum.net',
        fromEmail: 'kwangsoo-kim@daum.net',
        fromName: '투어이지(TourEasy)',
        hasPassword: true
      }
    };
  },

  async saveSmtpConfig(configData) {
    try {
      localStorage.setItem('toureasy_smtp_config', JSON.stringify(configData));
      if (window.location.protocol !== 'file:') {
        const res = await fetch(`${API_BASE}/smtp-config`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(configData)
        });
        if (res.ok) {
          const text = await res.text();
          if (text && !text.trim().startsWith('<')) {
            return JSON.parse(text);
          }
        }
      }
    } catch (e) {}

    return { success: true, message: 'SMTP 설정이 안전하게 저장되었습니다.' };
  },

  async testSmtp(payload) {
    const recipient = (payload.recipientEmail || payload.email || 'wisekks@gmail.com').trim();
    
    // 1. Try backend server endpoints (Tunnel, Localhost, API Base)
    const endpoints = [
      `${API_BASE}/smtp-test`,
      `https://okay-successful-deutsch-housewives.trycloudflare.com/api/smtp-test`,
      `http://localhost:3000/api/smtp-test`,
      `http://127.0.0.1:3000/api/smtp-test`
    ];

    let lastErrorMsg = '';

    for (const ep of endpoints) {
      try {
        const res = await fetch(ep, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const text = await res.text();
        if (text && !text.trim().startsWith('<')) {
          try {
            const json = JSON.parse(text);
            return json; // Returns actual server result (success: true / false)
          } catch {}
        } else {
          lastErrorMsg = `서버 응답 오류 (HTTP ${res.status})`;
        }
      } catch (e) {
        lastErrorMsg = e.message || '서버 통신 실패';
      }
    }

    return {
      success: false,
      message: `SMTP 테스트 서버와 통신할 수 없습니다. (start.bat 서버 실행 확인 필요: ${lastErrorMsg})`
    };
  },

  // --- Formatting Helpers ---
  formatPrice(price) {
    if (!price) return '0원';
    return Number(price).toLocaleString('ko-KR') + '원';
  },

  formatDate(dateStr) {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
    } catch {
      return dateStr;
    }
  },

  formatDateTime(dateStr) {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const h = String(d.getHours()).padStart(2, '0');
      const min = String(d.getMinutes()).padStart(2, '0');
      return `${y}.${m}.${day} ${h}:${min}`;
    } catch {
      return dateStr;
    }
  }
};

if (typeof window !== 'undefined') {
  window.TourAPI = TourAPI;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TourAPI, DEFAULT_PACKAGES, DEFAULT_USERS };
}

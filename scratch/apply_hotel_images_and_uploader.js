const fs = require('fs');
const path = require('path');

const hotels = [
  // 1. 국내 / 제주 (6개)
  {
    id: "htl-kr-01",
    name: "시그니엘 서울 (Signiel Seoul)",
    nameEn: "Signiel Seoul",
    region: "국내",
    city: "서울 송파구 잠실",
    country: "대한민국",
    star: 5,
    rating: 4.96,
    reviewCount: 320,
    pricePerNight: 650000,
    originalPrice: 750000,
    thumbnail: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85"
    ],
    amenities: ["스카이라인 전망", "인피니티 실내풀", "미슐랭 다이닝", "투숙객 전용 라운지", "사우나 & 스파", "무료 발렛"],
    roomTypes: [
      { name: "그랜드 디럭스 룸", price: 650000, maxGuests: 2, bed: "더블 킹 베드 1개" },
      { name: "프리미어 시티뷰 룸", price: 780000, maxGuests: 3, bed: "퀸 베드 2개" },
      { name: "시그니엘 스위트 룸", price: 1200000, maxGuests: 4, bed: "킹 베드 1개 + 거실" }
    ],
    checkIn: "15:00",
    checkOut: "11:00",
    summary: "롯데월드타워 76층~101층에 위치하여 서울의 파노라마 스카이라인을 조망할 수 있는 대한민국 최고층 럭셔리 랜드마크 호텔입니다.",
    status: "운영중"
  },
  {
    id: "htl-kr-02",
    name: "제주 신라호텔 (The Shilla Jeju)",
    nameEn: "The Shilla Jeju",
    region: "국내",
    city: "제주 서귀포 중문",
    country: "대한민국",
    star: 5,
    rating: 4.94,
    reviewCount: 428,
    pricePerNight: 480000,
    originalPrice: 580000,
    thumbnail: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=85"
    ],
    amenities: ["사계절 야외 온수풀", "글램핑 빌리지", "오션뷰 테라스", "키즈 플레이랩", "더 파크뷰 조식", "카바나"],
    roomTypes: [
      { name: "스탠다드 산전망 룸", price: 480000, maxGuests: 2, bed: "더블 또는 트윈" },
      { name: "디럭스 바다전망 룸", price: 590000, maxGuests: 3, bed: "더블 + 싱글" },
      { name: "코너 스위트 오션뷰", price: 920000, maxGuests: 4, bed: "킹 베드 1개 + 거실" }
    ],
    checkIn: "14:00",
    checkOut: "11:00",
    summary: "이국적인 중문 바다 전망과 사계절 야외 온수풀, 수준 높은 다이닝으로 완벽한 힐링을 선사하는 대한민국 대표 럭셔리 리조트입니다.",
    status: "운영중"
  },
  {
    id: "htl-kr-03",
    name: "파라다이스 호텔 부산 (Paradise Hotel Busan)",
    nameEn: "Paradise Hotel Busan",
    region: "국내",
    city: "부산 해운대구",
    country: "대한민국",
    star: 5,
    rating: 4.91,
    reviewCount: 310,
    pricePerNight: 390000,
    originalPrice: 460000,
    thumbnail: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85"
    ],
    amenities: ["오션스파 씨메르", "야외 인피니티풀", "키즈 빌리지", "온더플레이트 뷔페", "카지노", "해운대 백사장 직결"],
    roomTypes: [
      { name: "디럭스 시티뷰", price: 390000, maxGuests: 2, bed: "더블 베드" },
      { name: "디럭스 오션 테라스", price: 470000, maxGuests: 3, bed: "더블 + 싱글" },
      { name: "스위트 오션뷰", price: 790000, maxGuests: 4, bed: "킹 베드 1개" }
    ],
    checkIn: "15:00",
    checkOut: "11:00",
    summary: "해운대 해변과 맞닿은 천혜의 오션뷰와 사계절 야외 온천 씨메르를 보유한 부산 최고의 오션 라이프스타일 호텔입니다.",
    status: "운영중"
  },
  {
    id: "htl-kr-04",
    name: "그랜드 조선 제주 (Grand Josun Jeju)",
    nameEn: "Grand Josun Jeju",
    region: "국내",
    city: "제주 서귀포 중문",
    country: "대한민국",
    star: 5,
    rating: 4.92,
    reviewCount: 245,
    pricePerNight: 350000,
    originalPrice: 420000,
    thumbnail: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=85"
    ],
    amenities: ["루프탑 성인 전용 피크풀", "가든풀", "아리아 뷔페", "키즈 전용 층", "사우나", "피트니스"],
    roomTypes: [
      { name: "디럭스 킹 룸", price: 350000, maxGuests: 2, bed: "킹 베드 1개" },
      { name: "디럭스 트윈 풀뷰", price: 390000, maxGuests: 3, bed: "더블 + 싱글" },
      { name: "키즈 스위트", price: 580000, maxGuests: 4, bed: "더블 + 키즈 벙커베드" }
    ],
    checkIn: "15:00",
    checkOut: "11:00",
    summary: "조선호텔 100년의 헤리티지와 제주의 아름다운 자연이 조화를 이루는 프리미엄 호캉스 리조트입니다.",
    status: "운영중"
  },
  {
    id: "htl-kr-05",
    name: "세인트존스 호텔 강릉 (St. John's Hotel)",
    nameEn: "St. John's Hotel Gangneung",
    region: "국내",
    city: "강원 강릉시 강문동",
    country: "대한민국",
    star: 4,
    rating: 4.88,
    reviewCount: 380,
    pricePerNight: 220000,
    originalPrice: 280000,
    thumbnail: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85"
    ],
    amenities: ["인피니티 풀 2개", "반려견 동반 객실", "소나무 숲 산책로", "오션뷰 카페", "조식 뷔페", "사우나"],
    roomTypes: [
      { name: "슈페리어 더블", price: 220000, maxGuests: 2, bed: "더블 베드" },
      { name: "골져스 오션 더블", price: 280000, maxGuests: 2, bed: "오션뷰 킹 베드" },
      { name: "주니어 스위트 파셜오션", price: 420000, maxGuests: 4, bed: "더블 베드 2개" }
    ],
    checkIn: "16:00",
    checkOut: "11:00",
    summary: "동해 바다와 곰솔림 솔숲을 품은 강릉 최대 규모의 오션 프론트 힐링 호텔입니다.",
    status: "운영중"
  },
  {
    id: "htl-kr-06",
    name: "그랜드 하얏트 서울 (Grand Hyatt Seoul)",
    nameEn: "Grand Hyatt Seoul",
    region: "국내",
    city: "서울 용산구 한남동",
    country: "대한민국",
    star: 5,
    rating: 4.93,
    reviewCount: 290,
    pricePerNight: 420000,
    originalPrice: 510000,
    thumbnail: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85"
    ],
    amenities: ["남산 & 한강 전망", "야외 가든 수영장", "더 테라스 뷔페", "클럽 라운지", "스파 & 피트니스", "야외 아이스링크(동계)"],
    roomTypes: [
      { name: "스탠다드 남산뷰 킹", price: 420000, maxGuests: 2, bed: "킹 베드 1개" },
      { name: "프리미엄 한강뷰 트윈", price: 510000, maxGuests: 3, bed: "트윈 베드 2개" },
      { name: "그랜드 익스큐티브 스위트", price: 850000, maxGuests: 4, bed: "킹 베드 + 전용 라운지" }
    ],
    checkIn: "15:00",
    checkOut: "11:00",
    summary: "남산의 수려한 자연과 서울 도심 야경, 한강 뷰를 동시에 만끽할 수 있는 특급 호텔의 정수입니다.",
    status: "운영중"
  },

  // 2. 동남아 / 휴양지 (8개)
  {
    id: "htl-sea-01",
    name: "인터컨티넨탈 다낭 선 페닌슐라 리조트",
    nameEn: "InterContinental Danang Sun Peninsula Resort",
    region: "동남아",
    city: "베트남 다낭 손트라",
    country: "베트남",
    star: 5,
    rating: 4.98,
    reviewCount: 360,
    pricePerNight: 550000,
    originalPrice: 680000,
    thumbnail: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85"
    ],
    amenities: ["프라이빗 전용 비치", "케이블카 트램", "미슐랭 3스타 셰프 레스토랑", "하른 헤리티지 스파", "인피니티 풀"],
    roomTypes: [
      { name: "리조트 클래식 오션뷰", price: 550000, maxGuests: 2, bed: "킹 베드 1개" },
      { name: "테라스 스위트 오션뷰", price: 720000, maxGuests: 3, bed: "킹 베드 + 데이베드" },
      { name: "선 페닌슐라 풀빌라 1베드룸", price: 1350000, maxGuests: 2, bed: "프라이빗 풀 + 킹 베드" }
    ],
    checkIn: "15:00",
    checkOut: "12:00",
    summary: "세계적인 건축가 빌 벤슬리가 설계한 손트라 반도의 환상적인 럭셔리 비치 프론트 리조트입니다.",
    status: "운영중"
  },
  {
    id: "htl-sea-02",
    name: "아야나 리조트 앤 스파 발리 (AYANA Resort Bali)",
    nameEn: "AYANA Resort Bali",
    region: "동남아",
    city: "인도네시아 발리 짐바란",
    country: "인도네시아",
    star: 5,
    rating: 4.96,
    reviewCount: 450,
    pricePerNight: 420000,
    originalPrice: 520000,
    thumbnail: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=85"
    ],
    amenities: ["세계적 명소 락바(Rock Bar)", "14개 테마 수영장", "탈라소테라피 스파", "프라이빗 쿠부 비치", "플로팅 조식"],
    roomTypes: [
      { name: "리조트 뷰 룸", price: 420000, maxGuests: 2, bed: "킹 또는 트윈" },
      { name: "오션뷰 룸", price: 530000, maxGuests: 3, bed: "오션뷰 킹 베드" },
      { name: "더 빌라스 원베드룸 풀빌라", price: 1100000, maxGuests: 2, bed: "전용 풀빌라 + 버틀러" }
    ],
    checkIn: "15:00",
    checkOut: "12:00",
    summary: "짐바란 절벽 위에서 인도양의 환상적인 일몰을 감상할 수 있는 발리 최고의 허니문 & 패밀리 리조트입니다.",
    status: "운영중"
  },
  {
    id: "htl-sea-03",
    name: "더 페닌슐라 방콕 (The Peninsula Bangkok)",
    nameEn: "The Peninsula Bangkok",
    region: "동남아",
    city: "태국 방콕 차오프라야",
    country: "태국",
    star: 5,
    rating: 4.94,
    reviewCount: 290,
    pricePerNight: 380000,
    originalPrice: 470000,
    thumbnail: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85"
    ],
    amenities: ["전 객실 리버뷰", "차오프라야강 전용 셔틀보트", "3단 계단식 야외 수영장", "페닌슐라 스파", "리버사이드 조식"],
    roomTypes: [
      { name: "디럭스 리버뷰 룸", price: 380000, maxGuests: 2, bed: "킹 베드 1개" },
      { name: "그랜드 디럭스 발코니 룸", price: 460000, maxGuests: 3, bed: "킹 베드 + 발코니" },
      { name: "익스큐티브 스위트", price: 820000, maxGuests: 4, bed: "리버뷰 파노라마 스위트" }
    ],
    checkIn: "14:00",
    checkOut: "12:00",
    summary: "차오프라야 강변에 우뚝 솟아 전 객실에서 유유히 흐르는 강 전망과 최상의 호스피탈리티를 경험할 수 있습니다.",
    status: "운영중"
  },
  {
    id: "htl-sea-04",
    name: "반얀트리 푸켓 (Banyan Tree Phuket)",
    nameEn: "Banyan Tree Phuket",
    region: "동남아",
    city: "태국 푸켓 방타오 비치",
    country: "태국",
    star: 5,
    rating: 4.95,
    reviewCount: 210,
    pricePerNight: 620000,
    originalPrice: 760000,
    thumbnail: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=85"
    ],
    amenities: ["전 객실 단독 풀빌라", "라구나 챔피언십 골프장", "반얀트리 스파 아카데미", "선셋 크루즈", "자전거 무료 대여"],
    roomTypes: [
      { name: "반얀 풀빌라 1베드룸", price: 620000, maxGuests: 2, bed: "전용 수영장 + 킹 베드" },
      { name: "세레니티 풀빌라", price: 790000, maxGuests: 3, bed: "라군뷰 프라이빗 풀" },
      { name: "2베드룸 풀빌라 스위트", price: 1400000, maxGuests: 6, bed: "대형 풀 + 2침실 + 다이닝" }
    ],
    checkIn: "15:00",
    checkOut: "12:00",
    summary: "울창한 열대 석호에 둘러싸인 최고급 프라이빗 풀빌라로, 진정한 휴식과 웰니스를 선사합니다.",
    status: "운영중"
  },
  {
    id: "htl-sea-05",
    name: "마리나 베이 샌즈 싱가포르 (Marina Bay Sands)",
    nameEn: "Marina Bay Sands Singapore",
    region: "동남아",
    city: "싱가포르 마리나 베이",
    country: "싱가포르",
    star: 5,
    rating: 4.97,
    reviewCount: 680,
    pricePerNight: 750000,
    originalPrice: 890000,
    thumbnail: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85"
    ],
    amenities: ["57층 옥상 인피니티 풀", "스카이파크 전망대", "복합 쇼핑몰 직결", "미슐랭 스타 다이닝", "카지노 & 아트사이언스"],
    roomTypes: [
      { name: "디럭스 룸 시티뷰", price: 750000, maxGuests: 2, bed: "킹 베드 1개" },
      { name: "프리미어 룸 가든뷰", price: 860000, maxGuests: 3, bed: "퀸 베드 2개" },
      { name: "샌즈 스위트룸", price: 1600000, maxGuests: 4, bed: "스위트 전용 라운지 포함" }
    ],
    checkIn: "15:00",
    checkOut: "11:00",
    summary: "세계 최대 규모의 루프탑 인피니티 풀에서 싱가포르 도심 뷰를 내려다보는 세계적인 랜드마크 호텔입니다.",
    status: "운영중"
  },
  {
    id: "htl-sea-06",
    name: "샹그릴라 보라카이 리조트 & 스파 (Shangri-La Boracay)",
    nameEn: "Shangri-La Boracay",
    region: "동남아",
    city: "필리핀 보라카이 야팍",
    country: "필리핀",
    star: 5,
    rating: 4.93,
    reviewCount: 195,
    pricePerNight: 490000,
    originalPrice: 600000,
    thumbnail: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85"
    ],
    amenities: ["2개 프라이빗 비치", "전용 스피드보트 픽업", "치 스파(CHI Spa)", "클리프사이드 시레나 다이닝", "키즈존"],
    roomTypes: [
      { name: "디럭스 씨뷰 룸", price: 490000, maxGuests: 2, bed: "킹 베드" },
      { name: "프리미어 씨뷰 발코니", price: 610000, maxGuests: 3, bed: "더블 + 싱글" },
      { name: "트리하우스 빌라 오션뷰", price: 1250000, maxGuests: 2, bed: "독채 럭셔리 빌라" }
    ],
    checkIn: "14:00",
    checkOut: "12:00",
    summary: "보라카이 북단 한적한 절벽과 두 개의 전용 해변에 위치하여 온전한 프라이빗 휴식을 보장합니다.",
    status: "운영중"
  },
  {
    id: "htl-sea-07",
    name: "포시즌스 리조트 치앙마이 (Four Seasons Chiang Mai)",
    nameEn: "Four Seasons Resort Chiang Mai",
    region: "동남아",
    city: "태국 치앙마이 매림",
    country: "태국",
    star: 5,
    rating: 4.97,
    reviewCount: 180,
    pricePerNight: 580000,
    originalPrice: 710000,
    thumbnail: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85"
    ],
    amenities: ["논 테라스 전망", "전통 태국식 웰니스 스파", "인피니티 논뷰 수영장", "쿠킹 클래스", "요가 파빌리온"],
    roomTypes: [
      { name: "가든 파빌리온 룸", price: 580000, maxGuests: 2, bed: "킹 베드 1개" },
      { name: "라이스 테라스 파빌리온", price: 730000, maxGuests: 3, bed: "라이스 테라스 파노라마" },
      { name: "풀 빌라 1베드룸", price: 1300000, maxGuests: 2, bed: "프라이빗 정원 & 풀" }
    ],
    checkIn: "15:00",
    checkOut: "12:00",
    summary: "치앙마이 산자락 논뷰 테라스와 전통 란나 양식이 어우러진 자연 속 하이엔드 힐링 생츄어리입니다.",
    status: "운영중"
  },
  {
    id: "htl-sea-08",
    name: "두짓타니 괌 리조트 (Dusit Thani Guam Resort)",
    nameEn: "Dusit Thani Guam Resort",
    region: "동남아",
    city: "미국 괌 투몬베이",
    country: "미국령 괌",
    star: 5,
    rating: 4.92,
    reviewCount: 410,
    pricePerNight: 430000,
    originalPrice: 530000,
    thumbnail: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=85"
    ],
    amenities: ["투몬베이 정면 오션뷰", "야외 인피니티 비치풀", "테바라나 럭셔리 스파", "알프레도 스테이크하우스", "쇼핑몰 연결"],
    roomTypes: [
      { name: "디럭스 오션프론트 룸", price: 430000, maxGuests: 2, bed: "킹 베드 1개" },
      { name: "프리미어 오션프론트 트윈", price: 520000, maxGuests: 4, bed: "퀸 베드 2개" },
      { name: "스튜디오 오션뷰 스위트", price: 890000, maxGuests: 4, bed: "스위트룸 + 라운지" }
    ],
    checkIn: "15:00",
    checkOut: "12:00",
    summary: "에메랄드빛 투몬 비치를 가장 가까이에서 즐길 수 있는 괌 최고의 5성급 인터내셔널 리조트입니다.",
    status: "운영중"
  },

  // 3. 일본 / 동아시아 (6개)
  {
    id: "htl-jp-01",
    name: "호시노야 도쿄 (Hoshinoya Tokyo)",
    nameEn: "Hoshinoya Tokyo",
    region: "일본/동아시아",
    city: "일본 도쿄 오테마치",
    country: "일본",
    star: 5,
    rating: 4.99,
    reviewCount: 220,
    pricePerNight: 850000,
    originalPrice: 1050000,
    thumbnail: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1542259009-5599b101962d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85"
    ],
    amenities: ["도심 속 최상층 천연온천", "다다미 라운지(오차노마)", "가이세키 갓포 요리", "전통 다도 체험", "다다미 플로어"],
    roomTypes: [
      { name: "유리(Yuri) 다다미 킹", price: 850000, maxGuests: 2, bed: "전통 퓨전 킹베드" },
      { name: "사쿠라(Sakura) 트윈 룸", price: 980000, maxGuests: 3, bed: "트윈 베드 2개" },
      { name: "키쿠(Kiku) 이그제큐티브 스위트", price: 1650000, maxGuests: 4, bed: "코너 대형 스위트" }
    ],
    checkIn: "15:00",
    checkOut: "12:00",
    summary: "도쿄 금융 중심지 오테마치에서 신발을 벗고 들어서는 도심형 탑티어 럭셔리 전통 료칸입니다.",
    status: "운영중"
  },
  {
    id: "htl-jp-02",
    name: "콘래드 오사카 (Conrad Osaka)",
    nameEn: "Conrad Osaka",
    region: "일본/동아시아",
    city: "일본 오사카 나카노시마",
    country: "일본",
    star: 5,
    rating: 4.95,
    reviewCount: 310,
    pricePerNight: 520000,
    originalPrice: 630000,
    thumbnail: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85"
    ],
    amenities: ["40층 하늘 위의 로비", "실내 온수 수영장", "파노라마 오사카 시티뷰", "콘래드 스파", "애트모스 다이닝"],
    roomTypes: [
      { name: "디럭스 킹 룸", price: 520000, maxGuests: 2, bed: "킹 베드 1개" },
      { name: "프리미엄 뷰 트윈 룸", price: 620000, maxGuests: 3, bed: "트윈 베드 2개" },
      { name: "이그제큐티브 코너 스위트", price: 1050000, maxGuests: 4, bed: "라운지 포함 스위트" }
    ],
    checkIn: "15:00",
    checkOut: "12:00",
    summary: "'하늘 위의 주소'라 불리며 오사카 스카이라인을 360도로 조망할 수 있는 모던 럭셔리 호텔입니다.",
    status: "운영중"
  },
  {
    id: "htl-jp-03",
    name: "후후 교토 (Fufu Kyoto)",
    nameEn: "Fufu Kyoto",
    region: "일본/동아시아",
    city: "일본 교토 난젠지",
    country: "일본",
    star: 5,
    rating: 4.97,
    reviewCount: 165,
    pricePerNight: 690000,
    originalPrice: 840000,
    thumbnail: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1542259009-5599b101962d?auto=format&fit=crop&w=1200&q=85"
    ],
    amenities: ["객실 내 천연 편백나무 온천", "일본식 정원 정취", "교토 제철 가이세키", "히노키 향 가득한 스위트", "조용한 숲세권"],
    roomTypes: [
      { name: "스타일리시 킹 온천룸", price: 690000, maxGuests: 2, bed: "킹 베드 + 실내 온천" },
      { name: "프레셔스 스위트 가든뷰", price: 880000, maxGuests: 3, bed: "가든 테라스 온천" },
      { name: "럭셔리 코너 스위트", price: 1350000, maxGuests: 4, bed: "대형 히노키 노천탕" }
    ],
    checkIn: "15:00",
    checkOut: "11:00",
    summary: "유서 깊은 난젠지 사찰 인근 정원 속에 자리하여 모든 객실에서 프라이빗 천연 온천욕을 즐길 수 있습니다.",
    status: "운영중"
  },
  {
    id: "htl-jp-04",
    name: "슈잔테이 클럽 조잔케이 삿포로 (Shuhoutei Club Jozankei)",
    nameEn: "Shuzantei Club Jozankei Sapporo",
    region: "일본/동아시아",
    city: "일본 삿포로 조잔케이",
    country: "일본",
    star: 5,
    rating: 4.92,
    reviewCount: 190,
    pricePerNight: 410000,
    originalPrice: 500000,
    thumbnail: "https://images.unsplash.com/photo-1542259009-5599b101962d?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1542259009-5599b101962d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85"
    ],
    amenities: ["설경 노천온천", "홋카이도 게 요리 특식", "무료 사케 바 라운지", "프라이빗 대절 온천탕", "계곡 뷰 테라스"],
    roomTypes: [
      { name: "일본식 화양실", price: 410000, maxGuests: 2, bed: "트윈 베드 + 다다미" },
      { name: "노천탕 딸린 디럭스 룸", price: 580000, maxGuests: 3, bed: "개별 노천 온천탕" },
      { name: "VIP 스위트 룸", price: 920000, maxGuests: 4, bed: "최고급 계곡뷰 스위트" }
    ],
    checkIn: "15:00",
    checkOut: "11:00",
    summary: "사계절 설경과 단풍이 장관인 조잔케이 계곡에서 최고급 온천욕과 제철 홋카이도 미식을 즐기는 성인 전용 료칸입니다.",
    status: "운영중"
  },
  {
    id: "htl-jp-05",
    name: "호텔 더 미츠이 교토 (HOTEL THE MITSUI KYOTO)",
    nameEn: "HOTEL THE MITSUI KYOTO Luxury Collection",
    region: "일본/동아시아",
    city: "일본 교토 니조성 앞",
    country: "일본",
    star: 5,
    rating: 4.98,
    reviewCount: 175,
    pricePerNight: 780000,
    originalPrice: 950000,
    thumbnail: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85"
    ],
    amenities: ["지하 천연 온천 수영장(서멀 스프링)", "300년 된 고택 대문", "니조성 전망 정원", "이탈리안 & 일식 파인다이닝"],
    roomTypes: [
      { name: "디럭스 가든룸", price: 780000, maxGuests: 2, bed: "킹 베드 1개" },
      { name: "니조 스위트 오션뷰", price: 1100000, maxGuests: 3, bed: "니조성 정면 조망" },
      { name: "온센 스위트", price: 1850000, maxGuests: 2, bed: "프라이빗 정원 노천온천" }
    ],
    checkIn: "15:00",
    checkOut: "12:00",
    summary: "세계문화유산 니조성 정문에 위치하여 일본의 정원 미학과 천연 온천을 현대적으로 재해석한 럭셔리 호텔입니다.",
    status: "운영중"
  },
  {
    id: "htl-jp-06",
    name: "하얏트 리젠시 세라가키 아일랜드 오키나와",
    nameEn: "Hyatt Regency Seragaki Island Okinawa",
    region: "일본/동아시아",
    city: "일본 오키나와 온나손",
    country: "일본",
    star: 5,
    rating: 4.93,
    reviewCount: 260,
    pricePerNight: 360000,
    originalPrice: 450000,
    thumbnail: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=85"
    ],
    amenities: ["섬 전체 단독 리조트", "바다와 연결된 라군풀", "해양 액티비티 센터", "오키나와 식자재 뷔페", "스파 & 요가"],
    roomTypes: [
      { name: "스탠다드 오션뷰 킹", price: 360000, maxGuests: 2, bed: "킹 베드 1개" },
      { name: "오션프론트 트윈 룸", price: 440000, maxGuests: 4, bed: "더블 베드 2개" },
      { name: "세라가키 아일랜드 스위트", price: 890000, maxGuests: 4, bed: "파노라마 오션뷰 스위트" }
    ],
    checkIn: "15:00",
    checkOut: "11:00",
    summary: "오키나와 본섬과 다리로 이어진 세라가키 섬 전체에 위치하여 360도 청정 에메랄드 바다를 만끽할 수 있습니다.",
    status: "운영중"
  },

  // 4. 유럽 (5개)
  {
    id: "htl-eu-01",
    name: "리츠 파리 (Ritz Paris)",
    nameEn: "Ritz Paris",
    region: "유럽",
    city: "프랑스 파리 방돔 광장",
    country: "프랑스",
    star: 5,
    rating: 4.99,
    reviewCount: 280,
    pricePerNight: 1450000,
    originalPrice: 1750000,
    thumbnail: "https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85"
    ],
    amenities: ["샤넬 스파(Chanel Spa)", "실내 그리스풍 수영장", "헤밍웨이 바", "방돔 광장 뷰", "최고급 버틀러 서비스"],
    roomTypes: [
      { name: "슈페리어 룸", price: 1450000, maxGuests: 2, bed: "킹 베드 1개" },
      { name: "디럭스 스위트 룸", price: 2100000, maxGuests: 3, bed: "클래식 프렌치 스위트" },
      { name: "프레스티지 스위트 방돔", price: 3800000, maxGuests: 4, bed: "역사적 랜드마크 스위트" }
    ],
    checkIn: "15:00",
    checkOut: "12:00",
    summary: "코코 샤넬과 헤밍웨이가 사랑한 파리 럭셔리의 정점이자 전 세계 호텔의 기준이 된 유서 깊은 팰리스 호텔입니다.",
    status: "운영중"
  },
  {
    id: "htl-eu-02",
    name: "더 사보이 런던 (The Savoy London)",
    nameEn: "The Savoy London",
    region: "유럽",
    city: "영국 런던 코벤트가든",
    country: "영국",
    star: 5,
    rating: 4.96,
    reviewCount: 310,
    pricePerNight: 980000,
    originalPrice: 1200000,
    thumbnail: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85"
    ],
    amenities: ["템스강 파노라마 전망", "전설적인 아메리칸 바", "고든 램지 사보이 그릴", "전통 애프터눈 티", "사보이 버틀러"],
    roomTypes: [
      { name: "슈페리어 퀸 룸", price: 980000, maxGuests: 2, bed: "퀸 베드 1개" },
      { name: "디럭스 킹 템스 리버뷰", price: 1350000, maxGuests: 3, bed: "템스강 뷰 킹베드" },
      { name: "퍼스널리티 스위트", price: 2400000, maxGuests: 4, bed: "명사들이 머문 스위트" }
    ],
    checkIn: "15:00",
    checkOut: "12:00",
    summary: "1889년 개관 이래 영국 왕실과 세계적 명사들의 사랑을 받아온 런던 템스 강변의 독보적인 랜드마크 호텔입니다.",
    status: "운영중"
  },
  {
    id: "htl-eu-03",
    name: "호텔 몬테 로사 체르마트 (Hotel Monte Rosa)",
    nameEn: "Hotel Monte Rosa Zermatt",
    region: "유럽",
    city: "스위스 체르마트 마터호른",
    country: "스위스",
    star: 4,
    rating: 4.93,
    reviewCount: 160,
    pricePerNight: 530000,
    originalPrice: 640000,
    thumbnail: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1542259009-5599b101962d?auto=format&fit=crop&w=1200&q=85"
    ],
    amenities: ["마터호른 황금빛 설경 조망", "알프스 정통 스파 & 사우나", "스위스 정통 퐁듀 레스토랑", "스키 리프트 셔틀"],
    roomTypes: [
      { name: "클래식 더블룸", price: 530000, maxGuests: 2, bed: "더블 베드 1개" },
      { name: "슈페리어 마터호른뷰", price: 680000, maxGuests: 3, bed: "마터호른 발코니 룸" },
      { name: "알파인 주니어 스위트", price: 950000, maxGuests: 4, bed: "알프스 스위트" }
    ],
    checkIn: "15:00",
    checkOut: "11:00",
    summary: "마터호른 최초 등정의 역사를 간직한 유서 깊은 부티크 호텔로, 객실 발코니에서 웅장한 알프스 영봉을 조망합니다.",
    status: "운영중"
  },
  {
    id: "htl-eu-04",
    name: "벨몬드 호텔 치프리아니 베네치아 (Belmond Hotel Cipriani)",
    nameEn: "Belmond Hotel Cipriani Venice",
    region: "유럽",
    city: "이탈리아 베네치아 주데카 섬",
    country: "이탈리아",
    star: 5,
    rating: 4.97,
    reviewCount: 140,
    pricePerNight: 1200000,
    originalPrice: 1450000,
    thumbnail: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85"
    ],
    amenities: ["올림픽 규격 해수 수영장", "산마르코 광장 전용 모터보트", "오로(Oro) 미슐랭 레스토랑", "카사노바 정원 스파"],
    roomTypes: [
      { name: "더블 가든뷰 룸", price: 1200000, maxGuests: 2, bed: "킹 베드 1개" },
      { name: "주니어 라군뷰 스위트", price: 1650000, maxGuests: 3, bed: "베네치아 라군 조망" },
      { name: "팔라디안 스위트", price: 3100000, maxGuests: 4, bed: "독채급 대형 스위트" }
    ],
    checkIn: "15:00",
    checkOut: "12:00",
    summary: "산마르코 광장에서 전용 보트로 단 5분, 베네치아 라군과 비밀 정원을 품은 세계 최고의 리조트 호텔입니다.",
    status: "운영중"
  },
  {
    id: "htl-eu-05",
    name: "호텔 아츠 바르셀로나 (Hotel Arts Barcelona)",
    nameEn: "Hotel Arts Barcelona",
    region: "유럽",
    city: "스페인 바르셀로나 해변",
    country: "스페인",
    star: 5,
    rating: 4.94,
    reviewCount: 230,
    pricePerNight: 670000,
    originalPrice: 820000,
    thumbnail: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85"
    ],
    amenities: ["지중해 오션프론트 뷰", "43 더 스파(43 The Spa)", "미슐랭 2스타 에노테카", "2개 야외 수영장", "프랭크 게리 금붕어 조형물"],
    roomTypes: [
      { name: "디럭스 씨뷰 룸", price: 670000, maxGuests: 2, bed: "킹 베드 1개" },
      { name: "이그제큐티브 스위트 파노라마", price: 920000, maxGuests: 3, bed: "바르셀로나 시티&바다뷰" },
      { name: "더 펜트하우스 1베드룸", price: 1750000, maxGuests: 2, bed: "초고층 복층 펜트하우스" }
    ],
    checkIn: "15:00",
    checkOut: "12:00",
    summary: "바르셀로네타 해변가에 우뚝 솟아 푸른 지중해와 가우디의 예술 도시 바르셀로나를 한눈에 품는 럭셔리 호텔입니다.",
    status: "운영중"
  },

  // 5. 미주 / 대양주 (5개)
  {
    id: "htl-us-01",
    name: "할레쿨라니 하와이 오아후 (Halekulani Oahu)",
    nameEn: "Halekulani Oahu Waikiki",
    region: "미주/대양주",
    city: "미국 하와이 호놀룰루 와이키키",
    country: "미국",
    star: 5,
    rating: 4.98,
    reviewCount: 390,
    pricePerNight: 890000,
    originalPrice: 1100000,
    thumbnail: "https://images.unsplash.com/photo-1542259009-5599b101962d?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1542259009-5599b101962d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85"
    ],
    amenities: ["카틀레야 난초 모자이크 수영장", "라 메르(La Mer) 프렌치 다이닝", "스파 할레쿨라니", "와이키키 비치 직결", "다이아몬드헤드 뷰"],
    roomTypes: [
      { name: "가든 코트야드 룸", price: 890000, maxGuests: 2, bed: "킹 베드 1개" },
      { name: "오션뷰 룸", price: 1080000, maxGuests: 3, bed: "와이키키 오션뷰 킹" },
      { name: "다이아몬드헤드 오션프론트 프라임", price: 1650000, maxGuests: 4, bed: "최고 명당 스위트" }
    ],
    checkIn: "15:00",
    checkOut: "12:00",
    summary: "'천국 같은 집'이라는 뜻의 할레쿨라니는 와이키키 해변 가장 중심에서 하와이 최고의 품격과 환대를 선사합니다.",
    status: "운영중"
  },
  {
    id: "htl-us-02",
    name: "더 플라자 뉴욕 (The Plaza Hotel NYC)",
    nameEn: "The Plaza Hotel New York",
    region: "미주/대양주",
    city: "미국 뉴욕 맨해튼 5번가",
    country: "미국",
    star: 5,
    rating: 4.96,
    reviewCount: 340,
    pricePerNight: 1150000,
    originalPrice: 1400000,
    thumbnail: "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85"
    ],
    amenities: ["센트럴파크 정면 뷰", "팜 코트(The Palm Court) 애프터눈 티", "겔랑 스파", "5번가 쇼핑가 직결", "화이트 글러브 버틀러"],
    roomTypes: [
      { name: "플라자 킹 룸", price: 1150000, maxGuests: 2, bed: "킹 베드 1개" },
      { name: "센트럴파크 뷰 룸", price: 1550000, maxGuests: 3, bed: "센트럴파크 조망 킹" },
      { name: "에드워디안 스위트", price: 2800000, maxGuests: 4, bed: "고급 거실 & 침실 스위트" }
    ],
    checkIn: "15:00",
    checkOut: "12:00",
    summary: "센트럴 파크 5번가 입구에 위치한 뉴욕의 영원한 상징이자 수많은 영화와 역사의 배경이 된 최고급 럭셔리 호텔입니다.",
    status: "운영중"
  },
  {
    id: "htl-us-03",
    name: "벨라지오 호텔 라스베이거스 (Bellagio Las Vegas)",
    nameEn: "Bellagio Hotel & Casino Las Vegas",
    region: "미주/대양주",
    city: "미국 라스베이거스 스트립",
    country: "미국",
    star: 5,
    rating: 4.93,
    reviewCount: 520,
    pricePerNight: 390000,
    originalPrice: 490000,
    thumbnail: "https://images.unsplash.com/photo-1581351123004-757df051db8e?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1581351123004-757df051db8e?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85"
    ],
    amenities: ["벨라지오 분수쇼 정면 뷰", "실내 보태니컬 가든", "5개 야외 지중해풍 수영장", "태양의 서커스 'O' 쇼 극장", "카지노"],
    roomTypes: [
      { name: "리조트 킹 룸", price: 390000, maxGuests: 2, bed: "킹 베드 1개" },
      { name: "파운틴 뷰 킹 룸 (분수쇼 전망)", price: 490000, maxGuests: 3, bed: "분수쇼 정면 킹베드" },
      { name: "벨라지오 펜트하우스 스위트", price: 990000, maxGuests: 4, bed: "초호화 분수뷰 스위트" }
    ],
    checkIn: "15:00",
    checkOut: "11:00",
    summary: "라스베이거스 스트립의 심장부에서 세계적인 분수쇼와 지중해풍 이탈리아 럭셔리의 정수를 경험할 수 있습니다.",
    status: "운영중"
  },
  {
    id: "htl-us-04",
    name: "파크 하얏트 시드니 (Park Hyatt Sydney)",
    nameEn: "Park Hyatt Sydney",
    region: "미주/대양주",
    city: "호주 시드니 하버",
    country: "호주",
    star: 5,
    rating: 4.97,
    reviewCount: 260,
    pricePerNight: 920000,
    originalPrice: 1150000,
    thumbnail: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85"
    ],
    amenities: ["오페라하우스 정면 파노라마", "루프탑 온수 수영장", "하버사이드 프라이빗 다이닝", "24시간 전담 버틀러", "록스 역사지구 직결"],
    roomTypes: [
      { name: "시티 하버 킹", price: 920000, maxGuests: 2, bed: "킹 베드 1개" },
      { name: "오페라 뷰 디럭스 룸", price: 1250000, maxGuests: 3, bed: "오페라하우스 정면 조망" },
      { name: "코브 스위트 하버뷰", price: 2100000, maxGuests: 4, bed: "발코니 하버뷰 스위트" }
    ],
    checkIn: "15:00",
    checkOut: "11:00",
    summary: "시드니 하버 바로 앞, 오페라하우스와 하버브리지를 손에 잡힐 듯 바라보는 호주 최고의 럭셔리 워터프론트 호텔입니다.",
    status: "운영중"
  },
  {
    id: "htl-us-05",
    name: "힐튼 괌 리조트 & 스파 (Hilton Guam Resort)",
    nameEn: "Hilton Guam Resort & Spa",
    region: "미주/대양주",
    city: "미국 괌 타무닝",
    country: "미국령 괌",
    star: 5,
    rating: 4.90,
    reviewCount: 340,
    pricePerNight: 320000,
    originalPrice: 390000,
    thumbnail: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85"
    ],
    amenities: ["리조파크 워터파크", "스노클링 비치 직결", "로이즈(Roy's) 하와이안 다이닝", "인피니티 풀", "테니스 코트"],
    roomTypes: [
      { name: "메인 타워 오션뷰", price: 320000, maxGuests: 2, bed: "더블 또는 트윈" },
      { name: "프리미어 타워 이그제큐티브", price: 410000, maxGuests: 3, bed: "전용 라운지 포함 킹" },
      { name: "타시 클럽 오션프론트", price: 560000, maxGuests: 4, bed: "바다 바로 앞 프리미엄동" }
    ],
    checkIn: "15:00",
    checkOut: "12:00",
    summary: "투몬만의 남쪽 언덕에 위치하여 시원한 파노라마 오션뷰와 다양한 테마 워터파크를 갖춘 가족 및 연인들의 인기 리조트입니다.",
    status: "운영중"
  }
];

// 1. Update DEFAULT_HOTELS in js/api.js
const apiJsPath = path.join(__dirname, '..', 'js', 'api.js');
let apiContent = fs.readFileSync(apiJsPath, 'utf8');

const sIdx = apiContent.indexOf('const DEFAULT_HOTELS = [');
const eIdx = apiContent.indexOf('const DEFAULT_PACKAGES =', sIdx);

if (sIdx !== -1 && eIdx !== -1) {
  const newConst = `const DEFAULT_HOTELS = ${JSON.stringify(hotels, null, 2)};\n\n`;
  apiContent = apiContent.slice(0, sIdx) + newConst + apiContent.slice(eIdx);
  fs.writeFileSync(apiJsPath, apiContent, 'utf8');
  console.log('Successfully updated js/api.js with high quality 30 hotel images.');
}

// 2. Update admin.html with 5-photo PC Uploaders for Hotel Modals
const adminHtmlPath = path.join(__dirname, '..', 'admin.html');
let adminHtml = fs.readFileSync(adminHtmlPath, 'utf8');

// Replace modal-new-hotel and modal-edit-hotel with full 5-photo uploaders
const newModalsFull = `
  <!-- 1. New Hotel Modal with 5-Photo PC & URL Gallery Uploader -->
  <div id="modal-new-hotel" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 hidden overflow-y-auto">
    <div class="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200 overflow-hidden my-auto">
      <div class="p-5 bg-gradient-to-r from-teal-800 to-slate-900 text-white flex items-center justify-between shrink-0">
        <div class="flex items-center gap-2">
          <i data-lucide="building" class="w-5 h-5 text-teal-400"></i>
          <h3 class="font-bold text-sm">신규 특급 호텔 / 리조트 상품 등록</h3>
        </div>
        <button onclick="closeModal('modal-new-hotel')" class="text-slate-400 hover:text-white transition cursor-pointer">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <form id="form-new-hotel" onsubmit="handleSaveNewHotel(event)" class="p-6 space-y-5 overflow-y-auto flex-grow text-xs">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block font-bold text-slate-700 mb-1">호텔명 (국문) *</label>
            <input type="text" id="nh-name" required placeholder="예: 시그니엘 서울" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500 font-bold">
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">호텔 영문명</label>
            <input type="text" id="nh-name-en" placeholder="예: Signiel Seoul" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500">
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label class="block font-bold text-slate-700 mb-1">지역 구분 *</label>
            <select id="nh-region" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500 font-bold">
              <option value="국내">대한민국 / 제주</option>
              <option value="동남아">동남아 / 휴양지</option>
              <option value="일본/동아시아">일본 / 동아시아</option>
              <option value="유럽">유럽</option>
              <option value="미주/대양주">미주 / 대양주</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">국가 *</label>
            <input type="text" id="nh-country" required placeholder="예: 대한민국, 베트남" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500">
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">도시 / 위치 *</label>
            <input type="text" id="nh-city" required placeholder="예: 서울 송파구, 다낭" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500">
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label class="block font-bold text-slate-700 mb-1">호텔 등급 (성급)</label>
            <select id="nh-star" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500 font-bold">
              <option value="5" selected>★★★★★ 5성급 럭셔리</option>
              <option value="4">★★★★ 4성급 프리미엄</option>
              <option value="3">★★★ 3성급 스탠다드</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">1박 판매가 (원) *</label>
            <input type="number" id="nh-price" required placeholder="예: 450000" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500 font-bold text-teal-700">
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">정상가 (원)</label>
            <input type="number" id="nh-original-price" placeholder="예: 550000" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500">
          </div>
        </div>

        <!-- 1. Representative Thumbnail Upload -->
        <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
          <div class="flex items-center justify-between">
            <label class="block font-bold text-slate-800">대표 썸네일 이미지 *</label>
            <div class="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-200 text-[11px]">
              <button type="button" onclick="switchNewHotelThumbMode('file')" id="nh-tab-thumb-file" class="px-2 py-0.5 rounded bg-teal-600 text-white font-bold">내 PC 파일</button>
              <button type="button" onclick="switchNewHotelThumbMode('url')" id="nh-tab-thumb-url" class="px-2 py-0.5 rounded text-slate-600 hover:bg-slate-100">웹 URL</button>
            </div>
          </div>

          <div id="nh-thumb-file-box" class="flex items-center gap-3">
            <div class="w-20 h-16 rounded-xl bg-slate-200 overflow-hidden border border-slate-300 shrink-0">
              <img id="nh-preview-thumb" src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85" class="w-full h-full object-cover" alt="Preview">
            </div>
            <div class="flex-grow space-y-1">
              <input type="file" id="nh-thumb-file-input" accept="image/*" onchange="handleNewHotelThumbFile(event)" class="text-[11px] text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-teal-600 file:text-white hover:file:bg-teal-700 cursor-pointer">
              <p class="text-[10px] text-slate-400">내 PC에서 대표 사진을 선택하세요 (PNG, JPG, WebP)</p>
            </div>
          </div>

          <div id="nh-thumb-url-box" class="hidden">
            <input type="url" id="nh-thumbnail-url" placeholder="https://images.unsplash.com/..." oninput="document.getElementById('nh-preview-thumb').src = this.value;" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500">
          </div>
        </div>

        <!-- 2. Multi-Photo Gallery Uploader (Up to 5 images) -->
        <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
          <div class="flex items-center justify-between">
            <div>
              <label class="block font-bold text-slate-800">호텔 갤러리 추가 사진 (최대 5장)</label>
              <span class="text-[10.5px] text-slate-400">PC 내 사진을 다중 선택하여 최대 5장까지 등록할 수 있습니다.</span>
            </div>
            <span class="text-xs font-bold text-teal-700 font-mono"><span id="nh-gallery-count">0</span> / 5개</span>
          </div>

          <div class="flex flex-wrap gap-2">
            <label class="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-2xs transition cursor-pointer">
              <i data-lucide="upload-cloud" class="w-3.5 h-3.5"></i>
              <span>📁 PC 사진 추가 (다중 선택)</span>
              <input type="file" id="nh-gallery-file-input" multiple accept="image/*" onchange="handleNewHotelGalleryFiles(event)" class="hidden">
            </label>
            <button type="button" onclick="promptAddNewHotelGalleryUrl()" class="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer">
              <i data-lucide="link" class="w-3.5 h-3.5"></i> 웹 URL 추가
            </button>
          </div>

          <!-- Gallery Thumbnails Grid -->
          <div id="nh-gallery-list" class="grid grid-cols-3 sm:grid-cols-5 gap-2.5 pt-1">
            <div class="col-span-full py-4 text-center text-slate-400 text-[11px] bg-white rounded-xl border border-dashed border-slate-200">
              등록된 추가 갤러리 사진이 없습니다. 상단 버튼으로 사진을 등록해보세요.
            </div>
          </div>
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-1">부대시설 태그 (쉼표 구분)</label>
          <input type="text" id="nh-amenities" placeholder="예: 스카이라인 전망, 인피니티풀, 미슐랭 다이닝, 사우나 & 스파, 무료 발렛" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500">
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-1">호텔 소개 요약</label>
          <textarea id="nh-summary" rows="3" placeholder="호텔의 주요 특징 및 조망, 편의시설 안내..." class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500"></textarea>
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-1">운영 상태</label>
          <select id="nh-status" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500 font-bold">
            <option value="운영중">🟢 운영중 (고객 노출)</option>
            <option value="미운영">⚪ 미운영 (고객 숨김)</option>
          </select>
        </div>

        <div class="pt-4 border-t border-slate-100 flex items-center justify-end gap-2 shrink-0">
          <button type="button" onclick="closeModal('modal-new-hotel')" class="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-bold transition cursor-pointer">
            취소
          </button>
          <button type="submit" class="px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold transition shadow-md cursor-pointer">
            호텔 상품 등록 완료
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- 2. Edit Hotel Modal with 5-Photo PC & URL Gallery Uploader -->
  <div id="modal-edit-hotel" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 hidden overflow-y-auto">
    <div class="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200 overflow-hidden my-auto">
      <div class="p-5 bg-gradient-to-r from-teal-900 to-slate-900 text-white flex items-center justify-between shrink-0">
        <div class="flex items-center gap-2">
          <i data-lucide="edit-3" class="w-5 h-5 text-teal-400"></i>
          <div>
            <h3 class="font-bold text-sm">호텔 상품 정보 수정</h3>
            <span class="text-[10px] text-teal-300 font-mono" id="edit-hotel-id-badge">ID: -</span>
          </div>
        </div>
        <button onclick="closeModal('modal-edit-hotel')" class="text-slate-400 hover:text-white transition cursor-pointer">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <form id="form-edit-hotel" onsubmit="handleSaveEditHotel(event)" class="p-6 space-y-5 overflow-y-auto flex-grow text-xs">
        <input type="hidden" id="eh-id">

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block font-bold text-slate-700 mb-1">호텔명 (국문) *</label>
            <input type="text" id="eh-name" required class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500 font-bold">
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">호텔 영문명</label>
            <input type="text" id="eh-name-en" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500">
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label class="block font-bold text-slate-700 mb-1">지역 구분 *</label>
            <select id="eh-region" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500 font-bold">
              <option value="국내">대한민국 / 제주</option>
              <option value="동남아">동남아 / 휴양지</option>
              <option value="일본/동아시아">일본 / 동아시아</option>
              <option value="유럽">유럽</option>
              <option value="미주/대양주">미주 / 대양주</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">국가 *</label>
            <input type="text" id="eh-country" required class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500">
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">도시 / 위치 *</label>
            <input type="text" id="eh-city" required class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500">
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label class="block font-bold text-slate-700 mb-1">호텔 등급 (성급)</label>
            <select id="eh-star" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500 font-bold">
              <option value="5">★★★★★ 5성급 럭셔리</option>
              <option value="4">★★★★ 4성급 프리미엄</option>
              <option value="3">★★★ 3성급 스탠다드</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">1박 판매가 (원) *</label>
            <input type="number" id="eh-price" required class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500 font-bold text-teal-700">
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">정상가 (원)</label>
            <input type="number" id="eh-original-price" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500">
          </div>
        </div>

        <!-- 1. Edit Representative Thumbnail Upload -->
        <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
          <div class="flex items-center justify-between">
            <label class="block font-bold text-slate-800">대표 썸네일 이미지 *</label>
            <div class="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-200 text-[11px]">
              <button type="button" onclick="switchEditHotelThumbMode('file')" id="eh-tab-thumb-file" class="px-2 py-0.5 rounded bg-teal-600 text-white font-bold">내 PC 파일</button>
              <button type="button" onclick="switchEditHotelThumbMode('url')" id="eh-tab-thumb-url" class="px-2 py-0.5 rounded text-slate-600 hover:bg-slate-100">웹 URL</button>
            </div>
          </div>

          <div id="eh-thumb-file-box" class="flex items-center gap-3">
            <div class="w-20 h-16 rounded-xl bg-slate-200 overflow-hidden border border-slate-300 shrink-0">
              <img id="eh-preview-thumb" src="" class="w-full h-full object-cover" alt="Preview">
            </div>
            <div class="flex-grow space-y-1">
              <input type="file" id="eh-thumb-file-input" accept="image/*" onchange="handleEditHotelThumbFile(event)" class="text-[11px] text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-teal-600 file:text-white hover:file:bg-teal-700 cursor-pointer">
              <p class="text-[10px] text-slate-400">내 PC에서 새로운 대표 사진을 선택하세요</p>
            </div>
          </div>

          <div id="eh-thumb-url-box" class="hidden">
            <input type="url" id="eh-thumbnail-url" placeholder="https://images.unsplash.com/..." oninput="document.getElementById('eh-preview-thumb').src = this.value;" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500">
          </div>
        </div>

        <!-- 2. Edit Multi-Photo Gallery Uploader (Up to 5 images) -->
        <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
          <div class="flex items-center justify-between">
            <div>
              <label class="block font-bold text-slate-800">호텔 갤러리 추가 사진 (최대 5장)</label>
              <span class="text-[10.5px] text-slate-400">PC 내 사진을 다중 선택하여 최대 5장까지 등록할 수 있습니다.</span>
            </div>
            <span class="text-xs font-bold text-teal-700 font-mono"><span id="eh-gallery-count">0</span> / 5개</span>
          </div>

          <div class="flex flex-wrap gap-2">
            <label class="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-2xs transition cursor-pointer">
              <i data-lucide="upload-cloud" class="w-3.5 h-3.5"></i>
              <span>📁 PC 사진 추가 (다중 선택)</span>
              <input type="file" id="eh-gallery-file-input" multiple accept="image/*" onchange="handleEditHotelGalleryFiles(event)" class="hidden">
            </label>
            <button type="button" onclick="promptAddEditHotelGalleryUrl()" class="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer">
              <i data-lucide="link" class="w-3.5 h-3.5"></i> 웹 URL 추가
            </button>
          </div>

          <!-- Gallery Thumbnails Grid -->
          <div id="eh-gallery-list" class="grid grid-cols-3 sm:grid-cols-5 gap-2.5 pt-1">
            <!-- Rendered dynamically -->
          </div>
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-1">부대시설 태그 (쉼표 구분)</label>
          <input type="text" id="eh-amenities" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500">
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-1">호텔 소개 요약</label>
          <textarea id="eh-summary" rows="3" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500"></textarea>
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-1">운영 상태</label>
          <select id="eh-status" class="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-teal-500 font-bold">
            <option value="운영중">🟢 운영중 (고객 노출)</option>
            <option value="미운영">⚪ 미운영 (고객 숨김)</option>
          </select>
        </div>

        <div class="pt-4 border-t border-slate-100 flex items-center justify-end gap-2 shrink-0">
          <button type="button" onclick="closeModal('modal-edit-hotel')" class="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-bold transition cursor-pointer">
            취소
          </button>
          <button type="submit" class="px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold transition shadow-md cursor-pointer">
            수정 내용 저장
          </button>
        </div>
      </form>
    </div>
  </div>
`;

// Replace existing modals in admin.html
const m1Start = adminHtml.indexOf('<!-- 1. New Hotel Modal');
const m2End = adminHtml.indexOf('</div>\n  </div>', adminHtml.indexOf('<!-- 2. Edit Hotel Modal'));

if (m1Start !== -1 && m2End !== -1) {
  const sliceEnd = m2End + '</div>\n  </div>'.length;
  adminHtml = adminHtml.slice(0, m1Start) + newModalsFull.trim() + adminHtml.slice(sliceEnd);
}

// 3. Update JavaScript logic in admin.html for 5-photo uploaders
const uploaderJsLogic = `
    // --- Hotel 5-Photo Gallery & Thumbnail Upload State & Handlers ---
    let currentNewHotelThumbnail = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85';
    let currentNewHotelImages = [];

    let currentEditHotelThumbnail = '';
    let currentEditHotelImages = [];

    // New Hotel Thumbnail Modes
    function switchNewHotelThumbMode(mode) {
      const fBtn = document.getElementById('nh-tab-thumb-file');
      const uBtn = document.getElementById('nh-tab-thumb-url');
      const fBox = document.getElementById('nh-thumb-file-box');
      const uBox = document.getElementById('nh-thumb-url-box');
      if (mode === 'file') {
        if (fBtn) fBtn.className = 'px-2 py-0.5 rounded bg-teal-600 text-white font-bold';
        if (uBtn) uBtn.className = 'px-2 py-0.5 rounded text-slate-600 hover:bg-slate-100';
        if (fBox) fBox.classList.remove('hidden');
        if (uBox) uBox.classList.add('hidden');
      } else {
        if (uBtn) uBtn.className = 'px-2 py-0.5 rounded bg-teal-600 text-white font-bold';
        if (fBtn) fBtn.className = 'px-2 py-0.5 rounded text-slate-600 hover:bg-slate-100';
        if (uBox) uBox.classList.remove('hidden');
        if (fBox) fBox.classList.add('hidden');
      }
    }
    window.switchNewHotelThumbMode = switchNewHotelThumbMode;

    function handleNewHotelThumbFile(event) {
      const file = event.target.files && event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        currentNewHotelThumbnail = e.target.result;
        const img = document.getElementById('nh-preview-thumb');
        if (img) img.src = currentNewHotelThumbnail;
      };
      reader.readAsDataURL(file);
    }
    window.handleNewHotelThumbFile = handleNewHotelThumbFile;

    // New Hotel Gallery (Up to 5 images)
    function renderNewHotelGalleryImages() {
      const container = document.getElementById('nh-gallery-list');
      const countEl = document.getElementById('nh-gallery-count');
      if (countEl) countEl.textContent = currentNewHotelImages.length;
      if (!container) return;

      if (currentNewHotelImages.length === 0) {
        container.innerHTML = \`
          <div class="col-span-full py-4 text-center text-slate-400 text-[11px] bg-white rounded-xl border border-dashed border-slate-200">
            등록된 추가 갤러리 사진이 없습니다. 상단 버튼으로 사진을 등록해보세요.
          </div>
        \`;
        return;
      }

      container.innerHTML = currentNewHotelImages.map((img, idx) => \`
        <div class="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-900 aspect-video shadow-2xs">
          <img src="\${img}" class="w-full h-full object-cover group-hover:scale-105 transition duration-200" alt="Gallery">
          <button type="button" onclick="removeNewHotelGalleryImage(\${idx})" class="absolute top-1 right-1 w-5 h-5 bg-rose-600/90 hover:bg-rose-600 text-white rounded-md flex items-center justify-center shadow-sm opacity-90 group-hover:opacity-100 transition cursor-pointer" title="삭제">
            <i data-lucide="trash-2" class="w-3 h-3"></i>
          </button>
          <span class="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/60 text-white text-[9px] font-mono font-bold">#\${idx + 1}</span>
        </div>
      \`).join('');
      if (window.lucide) lucide.createIcons();
    }
    window.renderNewHotelGalleryImages = renderNewHotelGalleryImages;

    function handleNewHotelGalleryFiles(event) {
      const files = Array.from(event.target.files || []);
      if (files.length === 0) return;

      const remainingSlots = 5 - currentNewHotelImages.length;
      if (remainingSlots <= 0) {
        alert('갤러리 사진은 최대 5장까지만 등록 가능합니다.');
        event.target.value = '';
        return;
      }

      const filesToLoad = files.slice(0, remainingSlots);
      let loaded = 0;
      filesToLoad.forEach(f => {
        if (!f.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = (e) => {
          currentNewHotelImages.push(e.target.result);
          loaded++;
          if (loaded >= filesToLoad.length) {
            renderNewHotelGalleryImages();
          }
        };
        reader.readAsDataURL(f);
      });
      event.target.value = '';
    }
    window.handleNewHotelGalleryFiles = handleNewHotelGalleryFiles;

    function promptAddNewHotelGalleryUrl() {
      if (currentNewHotelImages.length >= 5) {
        alert('갤러리 사진은 최대 5장까지만 등록 가능합니다.');
        return;
      }
      const url = prompt('추가할 호텔 갤러리 이미지 웹 URL을 입력해주세요:');
      if (url && url.trim().startsWith('http')) {
        currentNewHotelImages.push(url.trim());
        renderNewHotelGalleryImages();
      }
    }
    window.promptAddNewHotelGalleryUrl = promptAddNewHotelGalleryUrl;

    function removeNewHotelGalleryImage(idx) {
      currentNewHotelImages.splice(idx, 1);
      renderNewHotelGalleryImages();
    }
    window.removeNewHotelGalleryImage = removeNewHotelGalleryImage;


    // Edit Hotel Thumbnail Modes
    function switchEditHotelThumbMode(mode) {
      const fBtn = document.getElementById('eh-tab-thumb-file');
      const uBtn = document.getElementById('eh-tab-thumb-url');
      const fBox = document.getElementById('eh-thumb-file-box');
      const uBox = document.getElementById('eh-thumb-url-box');
      if (mode === 'file') {
        if (fBtn) fBtn.className = 'px-2 py-0.5 rounded bg-teal-600 text-white font-bold';
        if (uBtn) uBtn.className = 'px-2 py-0.5 rounded text-slate-600 hover:bg-slate-100';
        if (fBox) fBox.classList.remove('hidden');
        if (uBox) uBox.classList.add('hidden');
      } else {
        if (uBtn) uBtn.className = 'px-2 py-0.5 rounded bg-teal-600 text-white font-bold';
        if (fBtn) fBtn.className = 'px-2 py-0.5 rounded text-slate-600 hover:bg-slate-100';
        if (uBox) uBox.classList.remove('hidden');
        if (fBox) fBox.classList.add('hidden');
      }
    }
    window.switchEditHotelThumbMode = switchEditHotelThumbMode;

    function handleEditHotelThumbFile(event) {
      const file = event.target.files && event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        currentEditHotelThumbnail = e.target.result;
        const img = document.getElementById('eh-preview-thumb');
        if (img) img.src = currentEditHotelThumbnail;
      };
      reader.readAsDataURL(file);
    }
    window.handleEditHotelThumbFile = handleEditHotelThumbFile;

    // Edit Hotel Gallery (Up to 5 images)
    function renderEditHotelGalleryImages() {
      const container = document.getElementById('eh-gallery-list');
      const countEl = document.getElementById('eh-gallery-count');
      if (countEl) countEl.textContent = currentEditHotelImages.length;
      if (!container) return;

      if (currentEditHotelImages.length === 0) {
        container.innerHTML = \`
          <div class="col-span-full py-4 text-center text-slate-400 text-[11px] bg-white rounded-xl border border-dashed border-slate-200">
            등록된 추가 갤러리 사진이 없습니다. 상단 버튼으로 사진을 등록해보세요.
          </div>
        \`;
        return;
      }

      container.innerHTML = currentEditHotelImages.map((img, idx) => \`
        <div class="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-900 aspect-video shadow-2xs">
          <img src="\${img}" class="w-full h-full object-cover group-hover:scale-105 transition duration-200" alt="Gallery">
          <button type="button" onclick="removeEditHotelGalleryImage(\${idx})" class="absolute top-1 right-1 w-5 h-5 bg-rose-600/90 hover:bg-rose-600 text-white rounded-md flex items-center justify-center shadow-sm opacity-90 group-hover:opacity-100 transition cursor-pointer" title="삭제">
            <i data-lucide="trash-2" class="w-3 h-3"></i>
          </button>
          <span class="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/60 text-white text-[9px] font-mono font-bold">#\${idx + 1}</span>
        </div>
      \`).join('');
      if (window.lucide) lucide.createIcons();
    }
    window.renderEditHotelGalleryImages = renderEditHotelGalleryImages;

    function handleEditHotelGalleryFiles(event) {
      const files = Array.from(event.target.files || []);
      if (files.length === 0) return;

      const remainingSlots = 5 - currentEditHotelImages.length;
      if (remainingSlots <= 0) {
        alert('갤러리 사진은 최대 5장까지만 등록 가능합니다.');
        event.target.value = '';
        return;
      }

      const filesToLoad = files.slice(0, remainingSlots);
      let loaded = 0;
      filesToLoad.forEach(f => {
        if (!f.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = (e) => {
          currentEditHotelImages.push(e.target.result);
          loaded++;
          if (loaded >= filesToLoad.length) {
            renderEditHotelGalleryImages();
          }
        };
        reader.readAsDataURL(f);
      });
      event.target.value = '';
    }
    window.handleEditHotelGalleryFiles = handleEditHotelGalleryFiles;

    function promptAddEditHotelGalleryUrl() {
      if (currentEditHotelImages.length >= 5) {
        alert('갤러리 사진은 최대 5장까지만 등록 가능합니다.');
        return;
      }
      const url = prompt('추가할 호텔 갤러리 이미지 웹 URL을 입력해주세요:');
      if (url && url.trim().startsWith('http')) {
        currentEditHotelImages.push(url.trim());
        renderEditHotelGalleryImages();
      }
    }
    window.promptAddEditHotelGalleryUrl = promptAddEditHotelGalleryUrl;

    function removeEditHotelGalleryImage(idx) {
      currentEditHotelImages.splice(idx, 1);
      renderEditHotelGalleryImages();
    }
    window.removeEditHotelGalleryImage = removeEditHotelGalleryImage;
`;

// Replace openNewHotelModal, handleSaveNewHotel, openEditHotelModal, handleSaveEditHotel in admin.html
const oldHotelHandlersStart = adminHtml.indexOf('function openNewHotelModal() {');
const oldHotelHandlersEnd = adminHtml.indexOf('window.handleSaveEditHotel = handleSaveEditHotel;', oldHotelHandlersStart) + 'window.handleSaveEditHotel = handleSaveEditHotel;'.length;

const newHotelHandlersFull = `${uploaderJsLogic}

    function openNewHotelModal() {
      const form = document.getElementById('form-new-hotel');
      if (form) form.reset();
      currentNewHotelThumbnail = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85';
      currentNewHotelImages = [];
      document.getElementById('nh-preview-thumb').src = currentNewHotelThumbnail;
      switchNewHotelThumbMode('file');
      renderNewHotelGalleryImages();
      document.getElementById('modal-new-hotel').classList.remove('hidden');
      if (window.lucide) lucide.createIcons();
    }
    window.openNewHotelModal = openNewHotelModal;

    async function handleSaveNewHotel(e) {
      e.preventDefault();
      const amenitiesInput = document.getElementById('nh-amenities')?.value || '';
      const amenitiesArr = amenitiesInput.split(',').map(s => s.trim()).filter(Boolean);

      const thumbVal = (document.getElementById('nh-thumbnail-url')?.value.trim()) || currentNewHotelThumbnail;
      const imagesArr = currentNewHotelImages.length > 0 ? currentNewHotelImages.slice(0, 5) : [thumbVal];

      const payload = {
        name: document.getElementById('nh-name')?.value.trim(),
        nameEn: document.getElementById('nh-name-en')?.value.trim(),
        region: document.getElementById('nh-region')?.value,
        country: document.getElementById('nh-country')?.value.trim(),
        city: document.getElementById('nh-city')?.value.trim(),
        star: Number(document.getElementById('nh-star')?.value) || 5,
        pricePerNight: Number(document.getElementById('nh-price')?.value) || 300000,
        originalPrice: Number(document.getElementById('nh-original-price')?.value) || null,
        thumbnail: thumbVal,
        images: imagesArr,
        amenities: amenitiesArr.length > 0 ? amenitiesArr : ['스파', '수영장', '다이닝'],
        summary: document.getElementById('nh-summary')?.value.trim(),
        status: document.getElementById('nh-status')?.value || '운영중'
      };

      try {
        const res = await TourAPI.createHotel(payload);
        if (res && res.success) {
          showToast('✅ 신규 호텔 상품이 성공적으로 등록되었습니다!');
          closeModal('modal-new-hotel');
          await loadHotelsAdmin();
        } else {
          alert(res?.message || '호텔 등록 실패');
        }
      } catch (err) {
        alert('호텔 등록 중 오류: ' + err.message);
      }
    }
    window.handleSaveNewHotel = handleSaveNewHotel;

    function openEditHotelModal(id) {
      const h = cachedHotelsAdmin.find(item => item.id === id);
      if (!h) {
        alert('호텔 정보를 찾을 수 없습니다.');
        return;
      }

      document.getElementById('eh-id').value = h.id;
      document.getElementById('edit-hotel-id-badge').textContent = \`ID: \${h.id}\`;
      document.getElementById('eh-name').value = h.name || '';
      document.getElementById('eh-name-en').value = h.nameEn || '';
      document.getElementById('eh-region').value = h.region || '국내';
      document.getElementById('eh-country').value = h.country || '';
      document.getElementById('eh-city').value = h.city || '';
      document.getElementById('eh-star').value = h.star || 5;
      document.getElementById('eh-price').value = h.pricePerNight || 0;
      document.getElementById('eh-original-price').value = h.originalPrice || '';
      
      const thumb = h.thumbnail || (h.images && h.images[0]) || '';
      currentEditHotelThumbnail = thumb;
      document.getElementById('eh-preview-thumb').src = thumb;
      document.getElementById('eh-thumbnail-url').value = thumb;
      switchEditHotelThumbMode('file');

      currentEditHotelImages = Array.isArray(h.images) ? [...h.images].slice(0, 5) : (thumb ? [thumb] : []);
      renderEditHotelGalleryImages();

      document.getElementById('eh-amenities').value = Array.isArray(h.amenities) ? h.amenities.join(', ') : (h.amenities || '');
      document.getElementById('eh-summary').value = h.summary || '';
      document.getElementById('eh-status').value = (h.status !== '미운영' && h.isActive !== false) ? '운영중' : '미운영';

      document.getElementById('modal-edit-hotel').classList.remove('hidden');
      if (window.lucide) lucide.createIcons();
    }
    window.openEditHotelModal = openEditHotelModal;

    async function handleSaveEditHotel(e) {
      e.preventDefault();
      const id = document.getElementById('eh-id')?.value;
      if (!id) return;

      const amenitiesInput = document.getElementById('eh-amenities')?.value || '';
      const amenitiesArr = amenitiesInput.split(',').map(s => s.trim()).filter(Boolean);

      const thumbVal = (document.getElementById('eh-thumbnail-url')?.value.trim()) || currentEditHotelThumbnail;
      const imagesArr = currentEditHotelImages.length > 0 ? currentEditHotelImages.slice(0, 5) : [thumbVal];

      const payload = {
        name: document.getElementById('eh-name')?.value.trim(),
        nameEn: document.getElementById('eh-name-en')?.value.trim(),
        region: document.getElementById('eh-region')?.value,
        country: document.getElementById('eh-country')?.value.trim(),
        city: document.getElementById('eh-city')?.value.trim(),
        star: Number(document.getElementById('eh-star')?.value) || 5,
        pricePerNight: Number(document.getElementById('eh-price')?.value) || 300000,
        originalPrice: Number(document.getElementById('eh-original-price')?.value) || null,
        thumbnail: thumbVal,
        images: imagesArr,
        amenities: amenitiesArr,
        summary: document.getElementById('eh-summary')?.value.trim(),
        status: document.getElementById('eh-status')?.value || '운영중'
      };

      try {
        const res = await TourAPI.updateHotel(id, payload);
        if (res && res.success) {
          showToast('✅ 호텔 정보가 성공적으로 수정되었습니다!');
          closeModal('modal-edit-hotel');
          await loadHotelsAdmin();
        } else {
          alert(res?.message || '호텔 수정 실패');
        }
      } catch (err) {
        alert('호텔 수정 중 오류: ' + err.message);
      }
    }
    window.handleSaveEditHotel = handleSaveEditHotel;`;

if (oldHotelHandlersStart !== -1) {
  adminHtml = adminHtml.slice(0, oldHotelHandlersStart) + newHotelHandlersFull + adminHtml.slice(oldHotelHandlersEnd);
}

fs.writeFileSync(adminHtmlPath, adminHtml, 'utf8');
console.log('Successfully updated admin.html with 5-photo uploaders and gallery managers.');

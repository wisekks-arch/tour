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
      { url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=85", caption: "[시그니엘 서울] 롯데월드타워 초고층 파노라마 시티뷰" },
      { url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85", caption: "[시그니엘 서울] 최고급 프리미어 시티뷰 스위트 객실" },
      { url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85", caption: "[시그니엘 서울] 서울 도심 조망 실내 인피니티 풀" },
      { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85", caption: "[시그니엘 서울] 미슐랭 다이닝 & 투숙객 전용 라운지" },
      { url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=85", caption: "[시그니엘 서울] 럭셔리 스파 & 웰니스 사우나" }
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
      { url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85", caption: "[제주 신라호텔] 중문 해변 조망 사계절 야외 온수풀" },
      { url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85", caption: "[제주 신라호텔] 이국적인 야자수 정원 & 글램핑 빌리지" },
      { url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=85", caption: "[제주 신라호텔] 디럭스 오션뷰 테라스 객실" },
      { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85", caption: "[제주 신라호텔] 더 파크뷰 프리미엄 뷔페 다이닝" },
      { url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85", caption: "[제주 신라호텔] 성인 전용 어덜트 풀 카바나" }
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
      { url: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=85", caption: "[파라다이스 호텔 부산] 해운대 오션스파 씨메르 야외 온천" },
      { url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=85", caption: "[파라다이스 호텔 부산] 해운대 해변 인피니티 오션풀" },
      { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85", caption: "[파라다이스 호텔 부산] 디럭스 오션 테라스 객실" },
      { url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85", caption: "[파라다이스 호텔 부산] 온더플레이트 오션뷰 파인다이닝" },
      { url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85", caption: "[파라다이스 호텔 부산] 최고급 파라다이스 스위트룸" }
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
      { url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=85", caption: "[그랜드 조선 제주] 루프탑 성인 전용 피크풀 & 가든" },
      { url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85", caption: "[그랜드 조선 제주] 모던 럭셔리 디럭스 풀뷰 객실" },
      { url: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=85", caption: "[그랜드 조선 제주] 아리아 프리미엄 뷔페 레스토랑" },
      { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85", caption: "[그랜드 조선 제주] 사계절 가든 야외 온수 수영장" }
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
      { url: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=85", caption: "[세인트존스 호텔 강릉] 동해 바다 숲세권 오션 인피니티풀" },
      { url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=85", caption: "[세인트존스 호텔 강릉] 곰솔림 소나무숲 산책로 & 오션뷰" },
      { url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85", caption: "[세인트존스 호텔 강릉] 골져스 오션 더블 발코니 객실" },
      { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85", caption: "[세인트존스 호텔 강릉] 파노라마 오션뷰 라운지 다이닝" }
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
      { url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85", caption: "[그랜드 하얏트 서울] 남산 & 한강 파노라마 야경 조망" },
      { url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=85", caption: "[그랜드 하얏트 서울] 야외 가든 수영장 & 카바나" },
      { url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85", caption: "[그랜드 하얏트 서울] 프리미엄 한강뷰 킹 베드 객실" },
      { url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85", caption: "[그랜드 하얏트 서울] 더 테라스 뷔페 & 그랜드 클럽 라운지" }
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
      { url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85", caption: "[인터컨티넨탈 다낭] 손트라 반도 절벽 럭셔리 오션 빌라" },
      { url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85", caption: "[인터컨티넨탈 다낭] 프라이빗 전용 비치 & 롱풀 수영장" },
      { url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85", caption: "[인터컨티넨탈 다낭] 클래식 오션뷰 테라스 스위트" },
      { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85", caption: "[인터컨티넨탈 다낭] 미슐랭 스타 라 메종 1888 다이닝" },
      { url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=85", caption: "[인터컨티넨탈 다낭] 하른 헤리티지 프라이빗 스파" }
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
      { url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85", caption: "[아야나 리조트 발리] 짐바란 절벽 인피니티 오션풀" },
      { url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85", caption: "[아야나 리조트 발리] 세계적 명소 락바(Rock Bar) 선셋" },
      { url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=85", caption: "[아야나 리조트 발리] 더 빌라스 원베드룸 프라이빗 풀빌라" },
      { url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85", caption: "[아야나 리조트 발리] 인도양 조망 쿠부 프라이빗 비치" }
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
      { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85", caption: "[더 페닌슐라 방콕] 차오프라야 리버사이드 3단 야외 수영장" },
      { url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85", caption: "[더 페닌슐라 방콕] 전 객실 리버뷰 발코니 스위트" },
      { url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85", caption: "[더 페닌슐라 방콕] 페닌슐라 전용 전통 셔틀 보트 & 스파" },
      { url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=85", caption: "[더 페닌슐라 방콕] 리버사이드 테라스 조식 & 라운지" }
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
      { url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85", caption: "[반얀트리 푸켓] 라군 뷰 전용 프라이빗 풀빌라" },
      { url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85", caption: "[반얀트리 푸켓] 열대 정원에 둘러싸인 세레니티 풀" },
      { url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=85", caption: "[반얀트리 푸켓] 반얀트리 스파 아카데미 웰니스" },
      { url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=85", caption: "[반얀트리 푸켓] 챔피언십 라구나 골프 클럽" }
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
      { url: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=85", caption: "[마리나 베이 샌즈 싱가포르] 57층 스카이파크 인피니티 풀" },
      { url: "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?auto=format&fit=crop&w=1200&q=85", caption: "[마리나 베이 샌즈 싱가포르] 싱가포르 도심 파노라마 야경 조망" },
      { url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85", caption: "[마리나 베이 샌즈 싱가포르] 샌즈 프리미어 가든뷰 스위트" },
      { url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85", caption: "[마리나 베이 샌즈 싱가포르] 스카이라인 파인다이닝 & 라운지" }
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
      { url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85", caption: "[샹그릴라 보라카이] 청정 에메랄드 프라이빗 비치" },
      { url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=85", caption: "[샹그릴라 보라카이] 절벽 위 트리하우스 오션 빌라" },
      { url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85", caption: "[샹그릴라 보라카이] 인피니티 씨뷰 메인 풀" },
      { url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=85", caption: "[샹그릴라 보라카이] 치 스파(CHI Spa) 웰니스 파빌리온" }
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
      { url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85", caption: "[포시즌스 리조트 치앙마이] 논 테라스(Rice Terrace) 인피니티 풀" },
      { url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85", caption: "[포시즌스 리조트 치앙마이] 전통 란나 스타일 가든 파빌리온" },
      { url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85", caption: "[포시즌스 리조트 치앙마이] 프라이빗 정원 & 단독 풀빌라" },
      { url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85", caption: "[포시즌스 리조트 치앙마이] 태국 정통 웰니스 스파 파빌리온" }
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
      { url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=85", caption: "[두짓타니 괌 리조트] 투몬베이 정면 에메랄드 오션뷰 풀" },
      { url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85", caption: "[두짓타니 괌 리조트] 디럭스 오션프론트 발코니 킹 룸" },
      { url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=85", caption: "[두짓타니 괌 리조트] 테바라나 럭셔리 스파 & 피트니스" },
      { url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85", caption: "[두짓타니 괌 리조트] 알프레도 스테이크하우스 오션뷰 다이닝" }
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
      { url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=85", caption: "[호시노야 도쿄] 도쿄 도심 최상층 천연온천 오차노마" },
      { url: "https://images.unsplash.com/photo-1542259009-5599b101962d?auto=format&fit=crop&w=1200&q=85", caption: "[호시노야 도쿄] 최고급 다다미 플로어 유리(Yuri) 킹 룸" },
      { url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85", caption: "[호시노야 도쿄] 가이세키 갓포 요리 & 전통 다도 파빌리온" },
      { url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85", caption: "[호시노야 도쿄] 키쿠(Kiku) 프레스티지 스위트" }
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
      { url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85", caption: "[콘래드 오사카] 나카노시마 40층 스카이 로비 360도 파노라마" },
      { url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=85", caption: "[콘래드 오사카] 오사카 도심 야경 조망 디럭스 킹 룸" },
      { url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85", caption: "[콘래드 오사카] 하늘 위의 실내 온수 수영장 & 콘래드 스파" },
      { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85", caption: "[콘래드 오사카] 애트모스 다이닝 & 이그제큐티브 라운지" }
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
      { url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=85", caption: "[후후 교토] 난젠지 일본식 정원 & 프라이빗 숲세권" },
      { url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=85", caption: "[후후 교토] 객실 내 천연 편백나무(히노키) 온천탕" },
      { url: "https://images.unsplash.com/photo-1542259009-5599b101962d?auto=format&fit=crop&w=1200&q=85", caption: "[후후 교토] 교토 제철 가이세키 요리 다이닝" },
      { url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85", caption: "[후후 교토] 프레셔스 가든뷰 스위트 테라스" }
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
      { url: "https://images.unsplash.com/photo-1542259009-5599b101962d?auto=format&fit=crop&w=1200&q=85", caption: "[슈잔테이 조잔케이 삿포로] 홋카이도 설경 계곡 노천온천" },
      { url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=85", caption: "[슈잔테이 조잔케이 삿포로] 노천탕 딸린 디럭스 화양실" },
      { url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85", caption: "[슈잔테이 조잔케이 삿포로] 홋카이도 게 요리 & 사케 라운지" },
      { url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85", caption: "[슈잔테이 조잔케이 삿포로] 프라이빗 대절 온천 파빌리온" }
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
      { url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=85", caption: "[호텔 더 미츠이 교토] 지하 천연 온천 수영장 (서멀 스프링)" },
      { url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=85", caption: "[호텔 더 미츠이 교토] 300년 고택 대문 & 니조성 정원 뷰" },
      { url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85", caption: "[호텔 더 미츠이 교토] 온센 스위트 프라이빗 노천탕" },
      { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85", caption: "[호텔 더 미츠이 교토] 이탈리안 & 일식 파인다이닝 포키(FORNI)" }
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
      { url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=85", caption: "[하얏트 리젠시 세라가키 오키나와] 세라가키 단독 섬 라군풀" },
      { url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85", caption: "[하얏트 리젠시 세라가키 오키나와] 360도 청정 에메랄드 바다 오션뷰" },
      { url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=85", caption: "[하얏트 리젠시 세라가키 오키나와] 오션프론트 트윈 발코니 객실" },
      { url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85", caption: "[하얏트 리젠시 세라가키 오키나와] 오키나와 로컬 파인다이닝 쿠치나" }
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
      { url: "https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&w=1200&q=85", caption: "[리츠 파리] 방돔 광장 헤리티지 팰리스 전경" },
      { url: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=85", caption: "[리츠 파리] 샤넬 스파 그리스풍 실내 수영장" },
      { url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85", caption: "[리츠 파리] 클래식 프렌치 디럭스 스위트" },
      { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85", caption: "[리츠 파리] 전설적인 헤밍웨이 바 & 살롱 프루스트" }
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
      { url: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=85", caption: "[더 사보이 런던] 템스 강변 랜드마크 브리티시 호텔" },
      { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85", caption: "[더 사보이 런던] 템스 리버뷰 럭셔리 킹 스위트" },
      { url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85", caption: "[더 사보이 런던] 전설의 아메리칸 바 & 고든 램지 그릴" },
      { url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85", caption: "[더 사보이 런던] 사보이 전통 로열 애프터눈 티 라운지" }
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
      { url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200&q=85", caption: "[호텔 몬테 로사 체르마트] 알프스 마터호른 영봉 조망 발코니" },
      { url: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=85", caption: "[호텔 몬테 로사 체르마트] 스위스 전통 샬레 목조 슈페리어 룸" },
      { url: "https://images.unsplash.com/photo-1542259009-5599b101962d?auto=format&fit=crop&w=1200&q=85", caption: "[호텔 몬테 로사 체르마트] 알프스 정통 온천 스파 & 사우나" },
      { url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85", caption: "[호텔 몬테 로사 체르마트] 스위스 전통 치즈 퐁듀 다이닝" }
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
      { url: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=1200&q=85", caption: "[벨몬드 치프리아니 베네치아] 베네치아 라군 & 전용 모터보트" },
      { url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=85", caption: "[벨몬드 치프리아니 베네치아] 올림픽 규격 야외 해수 수영장" },
      { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85", caption: "[벨몬드 치프리아니 베네치아] 카사노바 비밀 정원 & 스위트" },
      { url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85", caption: "[벨몬드 치프리아니 베네치아] 오로(Oro) 미슐랭 스타 레스토랑" }
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
      { url: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=85", caption: "[호텔 아츠 바르셀로나] 바르셀로네타 지중해 오션프론트 타워" },
      { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85", caption: "[호텔 아츠 바르셀로나] 프랭크 게리 금붕어 조형물 & 인피니티 풀" },
      { url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85", caption: "[호텔 아츠 바르셀로나] 파노라마 지중해 뷰 이그제큐티브 스위트" },
      { url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85", caption: "[호텔 아츠 바르셀로나] 43 더 스파(43 The Spa) 초고층 웰니스" }
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
      { url: "https://images.unsplash.com/photo-1542259009-5599b101962d?auto=format&fit=crop&w=1200&q=85", caption: "[할레쿨라니 하와이] 와이키키 비치 카틀레야 난초 모자이크 풀" },
      { url: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=85", caption: "[할레쿨라니 하와이] 다이아몬드헤드 오션프론트 프라임 스위트" },
      { url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85", caption: "[할레쿨라니 하와이] 라 메르(La Mer) 프렌치 오션뷰 다이닝" },
      { url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=85", caption: "[할레쿨라니 하와이] 스파 할레쿨라니 폴리네시안 리추얼" }
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
      { url: "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=1200&q=85", caption: "[더 플라자 뉴욕] 센트럴파크 5번가 정면 조망 맨해튼 랜드마크" },
      { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85", caption: "[더 플라자 뉴욕] 팜 코트(The Palm Court) 로열 애프터눈 티" },
      { url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85", caption: "[더 플라자 뉴욕] 에드워디안 럭셔리 센트럴파크 스위트" },
      { url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85", caption: "[더 플라자 뉴욕] 겔랑 럭셔리 스파 & 화이트 글러브 버틀러" }
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
      { url: "https://images.unsplash.com/photo-1581351123004-757df051db8e?auto=format&fit=crop&w=1200&q=85", caption: "[벨라지오 라스베이거스] 벨라지오 분수쇼 정면 호수 뷰" },
      { url: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=1200&q=85", caption: "[벨라지오 라스베이거스] 지중해풍 5개 야외 수영장 & 카바나" },
      { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85", caption: "[벨라지오 라스베이거스] 파운틴 뷰 킹 룸 & 스위트" },
      { url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85", caption: "[벨라지오 라스베이거스] 실내 보태니컬 가든 & 태양의 서커스 'O' 극장" }
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
      { url: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=85", caption: "[파크 하얏트 시드니] 시드니 오페라하우스 정면 워터프론트 조망" },
      { url: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=85", caption: "[파크 하얏트 시드니] 루프탑 온수 수영장 & 하버브리지 뷰" },
      { url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85", caption: "[파크 하얏트 시드니] 오페라 뷰 디럭스 룸 발코니" },
      { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85", caption: "[파크 하얏트 시드니] 하버사이드 프라이빗 다이닝 & 24시 버틀러" }
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
      { url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=85", caption: "[힐튼 괌 리조트] 투몬베이 파노라마 오션뷰 & 리조파크 워터파크" },
      { url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=85", caption: "[힐튼 괌 리조트] 스노클링 비치 직결 인피니티 풀" },
      { url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85", caption: "[힐튼 괌 리조트] 타시 클럽 오션프론트 럭셔리 객실" },
      { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85", caption: "[힐튼 괌 리조트] 로이즈(Roy's) 하와이안 다이닝 레스토랑" }
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

const apiJsPath = path.join(__dirname, '..', 'js', 'api.js');
let content = fs.readFileSync(apiJsPath, 'utf8');

const sIdx = content.indexOf('const DEFAULT_HOTELS = [');
const eIdx = content.indexOf('const DEFAULT_PACKAGES =', sIdx);

if (sIdx !== -1 && eIdx !== -1) {
  const newConst = `const DEFAULT_HOTELS = ${JSON.stringify(hotels, null, 2)};\n\n`;
  content = content.slice(0, sIdx) + newConst + content.slice(eIdx);
  fs.writeFileSync(apiJsPath, content, 'utf8');
  console.log('Successfully updated DEFAULT_HOTELS in js/api.js with enriched 4~5 images and captions matching hotel names.');
}

$ErrorActionPreference = 'Stop'
$shopDir = 'd:\92.SW\shop'
$dataDir = Join-Path $shopDir 'data'

# 1. Categories
$categoriesJson = @'
[
  {
    "id": "cat-fashion",
    "name": "패션 / 의류",
    "icon": "shirt",
    "badge": "NEW",
    "description": "트렌디한 데일리 룩부터 프리미엄 아우터까지",
    "image": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "cat-digital",
    "name": "디지털 / 가전",
    "icon": "laptop",
    "badge": "HOT",
    "description": "스마트한 일상을 위한 최신 스마트 디바이스",
    "image": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "cat-beauty",
    "name": "뷰티 / 케어",
    "icon": "sparkles",
    "badge": "BEST",
    "description": "피부 본연의 건강한 광채를 위한 스킨케어",
    "image": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "cat-living",
    "name": "리빙 / 인테리어",
    "icon": "home",
    "badge": "",
    "description": "감각적인 홈 스타일링과 프리미엄 리빙 아이템",
    "image": "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80"
  },
  {
    "id": "cat-food",
    "name": "푸드 / 키친",
    "icon": "coffee",
    "badge": "SALE",
    "description": "장인의 정성이 담긴 프리미엄 디저트와 다이닝",
    "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80"
  }
]
'@

[System.IO.File]::WriteAllText((Join-Path $dataDir 'categories.json'), $categoriesJson, [System.Text.Encoding]::UTF8)
Write-Host "Generated: categories.json" -ForegroundColor Green

# 2. Products (15+ rich items with full options, specs, reviews, qna)
$productsJson = @'
[
  {
    "id": "prod-01",
    "name": "프리미엄 캐시미어 블렌드 오버핏 코트",
    "category": "패션 / 의류",
    "categoryId": "cat-fashion",
    "price": 289000,
    "originalPrice": 389000,
    "discountRate": 25,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 35,
    "isBest": true,
    "isNew": true,
    "isSale": true,
    "isFreeShipping": true,
    "thumbnail": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "최고급 몽골리안 캐시미어 30% 혼방, 우아한 실루엣과 극강의 보온성",
    "description": "<h3>타임리스 클래식의 정수, 프리미엄 캐시미어 코트</h3><p>엄선된 몽골산 천연 캐시미어와 호주산 메리노 울을 황금비율로 블렌딩하여 가벼우면서도 탁월한 보온성을 선사합니다. 체형을 자연스럽게 커버하는 세미 오버핏 실루엣과 고급 소뿔 단추 마감으로 격식 있는 자리부터 데일리 룩까지 완벽하게 소화합니다.</p><ul><li>원단: 캐시미어 30%, 메리노울 70%</li><li>색상: 오트밀 베이지, 미드나잇 블랙, 차콜 그레이</li><li>드라이클리닝 권장, 전용 슈트케이스 및 옷걸이 동봉</li></ul>",
    "options": [
      {
        "name": "오트밀 베이지 / M(95-100)",
        "stock": 12
      },
      {
        "name": "오트밀 베이지 / L(105)",
        "stock": 8
      },
      {
        "name": "미드나잇 블랙 / M(95-100)",
        "stock": 10
      },
      {
        "name": "미드나잇 블랙 / L(105)",
        "stock": 5
      }
    ],
    "specs": {
      "제조국": "대한민국",
      "제조사": "EasyShop Private Label",
      "소재": "캐시미어 30%, 울 70%",
      "품질보증": "구입일로부터 1년 무상 수선",
      "배송안내": "CJ대한통운 (오후 2시 이전 주문 시 당일 출발)"
    },
    "reviews": [
      {
        "id": "rev-prod-01-1",
        "author": "이*은",
        "rating": 4,
        "date": "2026-09-29",
        "content": "원단 촉감이 정말 부드럽고 가볍습니다. 백화점 100만원대 코트 부럽지 않네요!",
        "likes": 32
      },
      {
        "id": "rev-prod-01-2",
        "author": "박*윤",
        "rating": 5,
        "date": "2026-09-26",
        "content": "오트밀 색상이 너무 고급스러워요. 배송도 하루 만에 와서 대만족입니다.",
        "likes": 30
      },
      {
        "id": "rev-prod-01-3",
        "author": "최*민",
        "rating": 5,
        "date": "2026-09-23",
        "content": "캐시미어 함량이 높아서 그런지 가벼우면서도 바람을 완벽하게 막아주네요.",
        "likes": 29
      },
      {
        "id": "rev-prod-01-4",
        "author": "정*지",
        "rating": 5,
        "date": "2026-09-20",
        "content": "세미 오버핏이라 안에 두꺼운 니트를 입어도 핏이 전혀 망가지지 않습니다.",
        "likes": 27
      },
      {
        "id": "rev-prod-01-5",
        "author": "강*정",
        "rating": 5,
        "date": "2026-09-17",
        "content": "소뿔 단추 디테일과 마감 바느질이 정말 꼼꼼해서 감동했습니다.",
        "likes": 26
      },
      {
        "id": "rev-prod-01-6",
        "author": "조*영",
        "rating": 5,
        "date": "2026-09-14",
        "content": "키 178인데 L사이즈 기장감이 딱 무릎 아래로 떨어져서 너무 멋스럽습니다.",
        "likes": 24
      },
      {
        "id": "rev-prod-01-7",
        "author": "윤*원",
        "rating": 5,
        "date": "2026-09-11",
        "content": "어깨 라인이 자연스럽게 드롭되어서 체형이 훨씬 슬림해 보여요.",
        "likes": 23
      },
      {
        "id": "rev-prod-01-8",
        "author": "장*린",
        "rating": 4,
        "date": "2026-09-08",
        "content": "출근용 데일리 코트로 입고 있는데 동료들이 다 어디서 샀냐고 물어보네요.",
        "likes": 21
      },
      {
        "id": "rev-prod-01-9",
        "author": "임*준",
        "rating": 5,
        "date": "2026-09-05",
        "content": "포장 상태도 전용 슈트케이스에 정성스럽게 담겨와서 선물 받는 기분이었습니다.",
        "likes": 20
      },
      {
        "id": "rev-prod-01-10",
        "author": "한*경",
        "rating": 5,
        "date": "2026-09-02",
        "content": "미드나잇 블랙 구매했는데 원단 윤택감이 은은하게 흘러서 격식 있는 자리에 딱입니다.",
        "likes": 18
      },
      {
        "id": "rev-prod-01-11",
        "author": "오*수",
        "rating": 5,
        "date": "2026-08-30",
        "content": "캐시미어 특유의 부드러움과 울의 탄탄함이 조화로워서 구김도 거의 안 가요.",
        "likes": 17
      },
      {
        "id": "rev-prod-01-12",
        "author": "서*우",
        "rating": 5,
        "date": "2026-08-27",
        "content": "원단 두께 대비 보온성이 정말 뛰어나서 한겨울에도 든든할 것 같아요.",
        "likes": 15
      },
      {
        "id": "rev-prod-01-13",
        "author": "신*희",
        "rating": 5,
        "date": "2026-08-24",
        "content": "주머니 깊이와 안감 라이닝 마감까지 최고급 퀄리티입니다.",
        "likes": 14
      },
      {
        "id": "rev-prod-01-14",
        "author": "권*진",
        "rating": 5,
        "date": "2026-08-21",
        "content": "오트밀 베이지 톤이 너무 노랗지 않고 차분한 크림톤이라 피부톤이 화사해집니다.",
        "likes": 12
      },
      {
        "id": "rev-prod-01-15",
        "author": "황*아",
        "rating": 4,
        "date": "2026-08-18",
        "content": "작년에 다른 브랜드 코트 샀다가 무거워서 후회했는데, 이건 정말 깃털처럼 가볍네요.",
        "likes": 11
      },
      {
        "id": "rev-prod-01-16",
        "author": "안*태",
        "rating": 5,
        "date": "2026-08-15",
        "content": "소매 길이도 손등을 살짝 덮어주는 완벽한 길이감입니다.",
        "likes": 9
      },
      {
        "id": "rev-prod-01-17",
        "author": "송*현",
        "rating": 5,
        "date": "2026-08-12",
        "content": "단추를 풀고 걸쳐도 라펠이 자연스럽게 자리 잡혀서 스타일링하기 편해요.",
        "likes": 8
      },
      {
        "id": "rev-prod-01-18",
        "author": "전*호",
        "rating": 5,
        "date": "2026-08-09",
        "content": "가격 대비 원단 퀄리티가 말이 안 되게 좋습니다. 색상별로 소장하고 싶어요.",
        "likes": 6
      },
      {
        "id": "rev-prod-01-19",
        "author": "홍*훈",
        "rating": 5,
        "date": "2026-08-06",
        "content": "첫 구매인데 이지샵 패션 라인 퀄리티에 신뢰가 팍팍 갑니다!",
        "likes": 5
      },
      {
        "id": "rev-prod-01-20",
        "author": "유*서",
        "rating": 5,
        "date": "2026-08-03",
        "content": "올겨울 가장 잘 산 패션 아이템 1위입니다. 강력 추천드려요.",
        "likes": 3
      }
    ],
    "qnas": [
      {
        "id": "qna-1",
        "author": "박*수",
        "date": "2026-09-02",
        "question": "178cm / 72kg인데 L사이즈 가면 될까요?",
        "answer": "고객님 안녕하세요! 고객님의 체형에는 L(105) 사이즈를 착용하시면 자연스러운 세미 오버핏으로 멋스럽게 착용 가능합니다."
      }
    ]
  },
  {
    "id": "prod-02",
    "name": "에어사운드 노이즈캔슬링 무선 헤드폰 프로",
    "category": "디지털 / 가전",
    "categoryId": "cat-digital",
    "price": 198000,
    "originalPrice": 269000,
    "discountRate": 26,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 42,
    "isBest": true,
    "isNew": false,
    "isSale": true,
    "isFreeShipping": true,
    "thumbnail": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "하이브리드 ANC 45dB 노이즈 차단, 최대 60시간 연속 재생, 고해상도 Hi-Res 오디오",
    "description": "<h3>압도적인 몰입감, 소음 없는 당신만의 사운드 스페이스</h3><p>40mm 티타늄 다이내믹 드라이버 탑재로 깊고 단단한 저음과 맑고 청량한 고음을 전달합니다. 첨단 듀얼 피드백 노이즈 캔슬링 칩셋으로 주변 소음을 실시간 45dB까지 감쇄합니다.</p>",
    "options": [
      {
        "name": "스페이스 그레이",
        "stock": 20
      },
      {
        "name": "매트 실버",
        "stock": 15
      },
      {
        "name": "미드나잇 블루",
        "stock": 7
      }
    ],
    "specs": {
      "블루투스": "v5.4 최신 칩셋",
      "배터리": "ANC 켜짐 시 최대 45시간, 꺼짐 시 60시간",
      "충전": "USB-C 고속 충전 (10분 충전 시 5시간 재생)",
      "무게": "245g 초경량 설계"
    },
    "reviews": [
      {
        "id": "rev-prod-02-1",
        "author": "고*은",
        "rating": 4,
        "date": "2026-09-28",
        "content": "카페에서 공부할 때 쓰는데 소음이 거짓말처럼 사라집니다. 착용감도 편해요.",
        "likes": 34
      },
      {
        "id": "rev-prod-02-2",
        "author": "문*윤",
        "rating": 5,
        "date": "2026-09-25",
        "content": "ANC 성능이 타사 40만원대 플래그십 모델과 견주어도 손색이 없습니다.",
        "likes": 32
      },
      {
        "id": "rev-prod-02-3",
        "author": "양*민",
        "rating": 5,
        "date": "2026-09-22",
        "content": "이어패드 쿠션이 푹신해서 안경을 쓰고 3시간 연속 착용해도 귀가 전혀 안 아파요.",
        "likes": 31
      },
      {
        "id": "rev-prod-02-4",
        "author": "손*지",
        "rating": 5,
        "date": "2026-09-19",
        "content": "음질이 정말 깔끔합니다. 저음의 묵직한 베이스부터 고음 보컬까지 완벽하게 분리되네요.",
        "likes": 29
      },
      {
        "id": "rev-prod-02-5",
        "author": "배*정",
        "rating": 5,
        "date": "2026-09-16",
        "content": "배터리가 괴물입니다. 일주일 내내 출퇴근길에 썼는데 아직 60%나 남아있어요.",
        "likes": 28
      },
      {
        "id": "rev-prod-02-6",
        "author": "백*영",
        "rating": 5,
        "date": "2026-09-13",
        "content": "통화 마이크 품질도 주변 바람 소리를 잘 걸러줘서 상대방이 선명하게 잘 들린다고 합니다.",
        "likes": 26
      },
      {
        "id": "rev-prod-02-7",
        "author": "허*원",
        "rating": 5,
        "date": "2026-09-10",
        "content": "스페이스 그레이 색상 실물이 훨씬 고급스럽고 무광 메탈 질감이 아주 세련됐습니다.",
        "likes": 25
      },
      {
        "id": "rev-prod-02-8",
        "author": "노*린",
        "rating": 4,
        "date": "2026-09-07",
        "content": "블루투스 페어링 속도가 전원 켜자마자 1초 만에 스마트폰과 노트북에 잡히네요.",
        "likes": 23
      },
      {
        "id": "rev-prod-02-9",
        "author": "남*준",
        "rating": 5,
        "date": "2026-09-04",
        "content": "Hi-Res 음원 들을 때 공간감이 대박입니다. 콘서트홀 맨 앞줄에 있는 느낌이에요.",
        "likes": 22
      },
      {
        "id": "rev-prod-02-10",
        "author": "심*경",
        "rating": 5,
        "date": "2026-09-01",
        "content": "비행기 기내 소음 잡는데 진짜 특효약입니다. 여행 필수품으로 무조건 챙겨야 해요.",
        "likes": 20
      },
      {
        "id": "rev-prod-02-11",
        "author": "김*수",
        "rating": 5,
        "date": "2026-08-29",
        "content": "무게가 가벼워서 목에 걸고 다녀도 부담이 전혀 없습니다.",
        "likes": 19
      },
      {
        "id": "rev-prod-02-12",
        "author": "이*우",
        "rating": 5,
        "date": "2026-08-26",
        "content": "접이식 폴딩 구조라 기본 제공되는 하드 케이스에 쏙 들어가 휴대성도 훌륭해요.",
        "likes": 17
      },
      {
        "id": "rev-prod-02-13",
        "author": "박*희",
        "rating": 5,
        "date": "2026-08-23",
        "content": "버튼 조작감도 직관적이고 터치 오작동이 없어서 아주 만족스럽습니다.",
        "likes": 16
      },
      {
        "id": "rev-prod-02-14",
        "author": "최*진",
        "rating": 5,
        "date": "2026-08-20",
        "content": "주변 소리 듣기 모드(트랜스패런시) 전환도 자연스럽고 이질감이 없네요.",
        "likes": 14
      },
      {
        "id": "rev-prod-02-15",
        "author": "정*아",
        "rating": 4,
        "date": "2026-08-17",
        "content": "가성비 노이즈캔슬링 끝판왕입니다. 친구 생일 선물로 하나 더 주문했어요.",
        "likes": 13
      },
      {
        "id": "rev-prod-02-16",
        "author": "강*태",
        "rating": 5,
        "date": "2026-08-14",
        "content": "영상 시청 시 딜레이(레이턴시)가 전혀 안 느껴져서 유튜브, 넷플릭스 볼 때 최고입니다.",
        "likes": 11
      },
      {
        "id": "rev-prod-02-17",
        "author": "조*현",
        "rating": 5,
        "date": "2026-08-11",
        "content": "고속 충전 10분만 해도 반나절은 거뜬히 쓸 수 있어서 급할 때 너무 유용해요.",
        "likes": 10
      },
      {
        "id": "rev-prod-02-18",
        "author": "윤*호",
        "rating": 5,
        "date": "2026-08-08",
        "content": "헤드밴드 장력이 적당해서 머리가 조이지 않고 장시간 몰입하기에 최적입니다.",
        "likes": 8
      },
      {
        "id": "rev-prod-02-19",
        "author": "장*훈",
        "rating": 5,
        "date": "2026-08-05",
        "content": "디자인이 깔끔하고 미니멀해서 어떤 옷에 매치해도 잘 어울립니다.",
        "likes": 7
      },
      {
        "id": "rev-prod-02-20",
        "author": "임*서",
        "rating": 5,
        "date": "2026-08-02",
        "content": "이 가격에 이 수준의 ANC와 음질이라니, 고민 없이 구매하셔도 됩니다!",
        "likes": 5
      }
    ],
    "qnas": []
  },
  {
    "id": "prod-03",
    "name": "글로우 리바이탈라이징 나이트 앰플 세럼 50ml",
    "category": "뷰티 / 케어",
    "categoryId": "cat-beauty",
    "price": 46000,
    "originalPrice": 68000,
    "discountRate": 32,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 80,
    "isBest": true,
    "isNew": true,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "8중 히알루론산 & 펩타이드 콤플렉스, 밤사이 되살아나는 탄력 수분 광채",
    "description": "<h3>피부 깊숙이 채워지는 밤샘 수분 탄력 케어</h3><p>피부 장벽을 탄탄하게 가꿔주는 8중 복합 히알루론산과 콜라겐 생성에 도움을 주는 고농축 펩타이드 성분이 밤사이 지친 피부에 즉각적인 생기를 불어넣어 줍니다.</p>",
    "options": [
      {
        "name": "단품 50ml",
        "stock": 50
      },
      {
        "name": "기획세트 (50ml + 미니어처 15ml 증정)",
        "stock": 30
      }
    ],
    "specs": {
      "용량": "50ml",
      "피부타입": "모든 피부용 (민감성 피부 자극 테스트 완료)",
      "제조국": "대한민국"
    },
    "reviews": [
      {
        "id": "rev-prod-03-1",
        "author": "한*은",
        "rating": 4,
        "date": "2026-09-27",
        "content": "끈적이지 않고 쏙 흡수되는데 다음날 아침 화장이 진짜 잘 먹어요!",
        "likes": 36
      },
      {
        "id": "rev-prod-03-2",
        "author": "오*윤",
        "rating": 5,
        "date": "2026-09-24",
        "content": "속건조가 심해서 환절기마다 각질이 떴는데 이 앰플 쓰고 싹 가라앉았습니다.",
        "likes": 34
      },
      {
        "id": "rev-prod-03-3",
        "author": "서*민",
        "rating": 5,
        "date": "2026-09-21",
        "content": "바르자마자 차오르는 꿀광 피부 표현이 너무 마음에 들어요.",
        "likes": 33
      },
      {
        "id": "rev-prod-03-4",
        "author": "신*지",
        "rating": 5,
        "date": "2026-09-18",
        "content": "민감성 피부라 트러블 걱정했는데 순하고 자극이 전혀 없어서 안심하고 쓰고 있습니다.",
        "likes": 31
      },
      {
        "id": "rev-prod-03-5",
        "author": "권*정",
        "rating": 5,
        "date": "2026-09-15",
        "content": "8중 히알루론산 덕분인지 저녁에 바르고 자면 아침까지 피부가 쫀쫀하고 촉촉해요.",
        "likes": 30
      },
      {
        "id": "rev-prod-03-6",
        "author": "황*영",
        "rating": 5,
        "date": "2026-09-12",
        "content": "스포이드 타입이라 위생적으로 양 조절하기 편하고 용기도 감각적입니다.",
        "likes": 28
      },
      {
        "id": "rev-prod-03-7",
        "author": "안*원",
        "rating": 5,
        "date": "2026-09-09",
        "content": "2주 정도 썼는데 피부 결이 매끄러워지고 톤이 한층 맑아진 느낌입니다.",
        "likes": 27
      },
      {
        "id": "rev-prod-03-8",
        "author": "송*린",
        "rating": 4,
        "date": "2026-09-06",
        "content": "향도 인공향 없이 은은해서 바를 때마다 스파에서 케어받는 기분이에요.",
        "likes": 25
      },
      {
        "id": "rev-prod-03-9",
        "author": "전*준",
        "rating": 5,
        "date": "2026-09-03",
        "content": "기획세트로 미니어처까지 받아서 여행 갈 때 파우치에 쏙 넣어 다니기 딱 좋습니다.",
        "likes": 24
      },
      {
        "id": "rev-prod-03-10",
        "author": "홍*경",
        "rating": 5,
        "date": "2026-08-31",
        "content": "펩타이드 성분 덕인지 팔자 주름과 미세 탄력이 탱탱하게 살아나는 것 같아요.",
        "likes": 22
      },
      {
        "id": "rev-prod-03-11",
        "author": "유*수",
        "rating": 5,
        "date": "2026-08-28",
        "content": "워터리한 제형인데도 보습 유지력이 일반 오일 세럼보다 훨씬 길게 지속됩니다.",
        "likes": 21
      },
      {
        "id": "rev-prod-03-12",
        "author": "고*우",
        "rating": 5,
        "date": "2026-08-25",
        "content": "메이크업 전에 파운데이션에 한 방울 섞어 바르면 하루 종일 들뜸 없이 유지돼요.",
        "likes": 19
      },
      {
        "id": "rev-prod-03-13",
        "author": "문*희",
        "rating": 5,
        "date": "2026-08-22",
        "content": "어머니께도 하나 선물해 드렸는데 피부가 너무 탄탄해졌다고 좋아하시네요.",
        "likes": 18
      },
      {
        "id": "rev-prod-03-14",
        "author": "양*진",
        "rating": 5,
        "date": "2026-08-19",
        "content": "재구매율 1위인 이유가 있네요. 다 쓰면 무조건 2개씩 쟁여둘 예정입니다.",
        "likes": 16
      },
      {
        "id": "rev-prod-03-15",
        "author": "손*아",
        "rating": 4,
        "date": "2026-08-16",
        "content": "흡수력이 빨라서 끈적임 싫어하는 남성분들도 부담 없이 쓰기 좋은 세럼입니다.",
        "likes": 15
      },
      {
        "id": "rev-prod-03-16",
        "author": "배*태",
        "rating": 5,
        "date": "2026-08-13",
        "content": "피부 장벽이 무너져서 붉은기 있었는데 진정 효과가 아주 탁월합니다.",
        "likes": 13
      },
      {
        "id": "rev-prod-03-17",
        "author": "백*현",
        "rating": 5,
        "date": "2026-08-10",
        "content": "바르고 난 뒤 손바닥으로 감싸주면 깊숙이 스며드는 영양감이 느껴집니다.",
        "likes": 12
      },
      {
        "id": "rev-prod-03-18",
        "author": "허*호",
        "rating": 5,
        "date": "2026-08-07",
        "content": "비싼 수입 브랜드 백화점 에센스보다 제 피부엔 이 앰플이 훨씬 잘 맞네요.",
        "likes": 10
      },
      {
        "id": "rev-prod-03-19",
        "author": "노*훈",
        "rating": 5,
        "date": "2026-08-04",
        "content": "성분표도 EWG 안심 등급이라 믿고 쓰는 데일리 필수 스킨케어입니다.",
        "likes": 9
      },
      {
        "id": "rev-prod-03-20",
        "author": "남*서",
        "rating": 5,
        "date": "2026-08-01",
        "content": "탄력과 수분을 동시에 꽉 잡아주는 인생 앰플을 찾았습니다!",
        "likes": 7
      }
    ],
    "qnas": []
  },
  {
    "id": "prod-04",
    "name": "미니멀 무선 마그네틱 터치 LED 무드등",
    "category": "리빙 / 인테리어",
    "categoryId": "cat-living",
    "price": 38000,
    "originalPrice": 55000,
    "discountRate": 30,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 55,
    "isBest": false,
    "isNew": true,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "3단계 색온도 조절, 무단계 디밍, 2000mAh 대용량 배터리 무선 인테리어 조명",
    "description": "<h3>어느 공간에나 감성을 더하는 미니멀 조명</h3><p>알루미늄 바디와 부드러운 디퓨저 렌즈로 눈부심 없는 아늑한 빛을 연출합니다. 마그네틱 베이스로 각도 조절이 자유로우며 벽면, 테이블, 선반 어디에나 거치 가능합니다.</p>",
    "options": [
      {
        "name": "샌드 베이지",
        "stock": 30
      },
      {
        "name": "매트 화이트",
        "stock": 25
      }
    ],
    "specs": {
      "배터리": "2,000mAh 리튬이온",
      "충전방식": "Type-C 포트",
      "색온도": "3000K / 4000K / 5700K"
    },
    "reviews": [
      {
        "id": "rev-prod-04-1",
        "author": "심*은",
        "rating": 4,
        "date": "2026-09-26",
        "content": "침대 협탁에 두고 쓰는데 무단계 디밍 기능으로 눈부심 없이 아늑합니다.",
        "likes": 38
      },
      {
        "id": "rev-prod-04-2",
        "author": "김*윤",
        "rating": 5,
        "date": "2026-09-23",
        "content": "마그네틱으로 각도 조절이 자유로워서 책 읽을 때 원하는 곳에 정확히 빛을 비출 수 있어요.",
        "likes": 36
      },
      {
        "id": "rev-prod-04-3",
        "author": "이*민",
        "rating": 5,
        "date": "2026-09-20",
        "content": "샌드 베이지 색상이 원목 가구랑 찰떡궁합이라 인테리어 오브제로 최고입니다.",
        "likes": 35
      },
      {
        "id": "rev-prod-04-4",
        "author": "박*지",
        "rating": 5,
        "date": "2026-09-17",
        "content": "터치 버튼 반응속도가 부드럽고 3가지 색온도 변경이 직관적이라 편해요.",
        "likes": 33
      },
      {
        "id": "rev-prod-04-5",
        "author": "최*정",
        "rating": 5,
        "date": "2026-09-14",
        "content": "무선이라 캠핑 갈 때나 테라스 나갈 때 간편하게 들고 다닐 수 있어서 실용성 200%입니다.",
        "likes": 32
      },
      {
        "id": "rev-prod-04-6",
        "author": "정*영",
        "rating": 5,
        "date": "2026-09-11",
        "content": "완충하면 최저 밝기로 며칠 동안 충전 없이 쓸 수 있어서 배터리 성능에 놀랐습니다.",
        "likes": 30
      },
      {
        "id": "rev-prod-04-7",
        "author": "강*원",
        "rating": 5,
        "date": "2026-09-08",
        "content": "빛이 플리커 프리라 장시간 켜두어도 눈의 피로감이 전혀 없습니다.",
        "likes": 29
      },
      {
        "id": "rev-prod-04-8",
        "author": "조*린",
        "rating": 4,
        "date": "2026-09-05",
        "content": "수유등으로 사용 중인데 새벽에 아기 깰 때 은은한 불빛으로 켜두기 정말 좋아요.",
        "likes": 27
      },
      {
        "id": "rev-prod-04-9",
        "author": "윤*준",
        "rating": 5,
        "date": "2026-09-02",
        "content": "디자인이 군더더기 없이 심플하고 미니멀해서 방 분위기가 한층 고급스러워졌습니다.",
        "likes": 26
      },
      {
        "id": "rev-prod-04-10",
        "author": "장*경",
        "rating": 5,
        "date": "2026-08-30",
        "content": "벽면에 마그네틱 브라켓 부착해서 갤러리 조명처럼 쓰고 있는데 대만족입니다.",
        "likes": 24
      },
      {
        "id": "rev-prod-04-11",
        "author": "임*수",
        "rating": 5,
        "date": "2026-08-27",
        "content": "Type-C 충전 포트라 스마트폰 충전기로 바로 충전할 수 있어 편리해요.",
        "likes": 23
      },
      {
        "id": "rev-prod-04-12",
        "author": "한*우",
        "rating": 5,
        "date": "2026-08-24",
        "content": "선물용으로 샀는데 포장 패키지도 깔끔하고 받는 분이 너무 좋아하셨습니다.",
        "likes": 21
      },
      {
        "id": "rev-prod-04-13",
        "author": "오*희",
        "rating": 5,
        "date": "2026-08-21",
        "content": "조명 헤드만 떼어서 손전등처럼 비상용으로 활용할 수 있는 점도 큰 장점입니다.",
        "likes": 20
      },
      {
        "id": "rev-prod-04-14",
        "author": "서*진",
        "rating": 5,
        "date": "2026-08-18",
        "content": "빛 퍼짐이 부드러운 디퓨저 렌즈 덕분에 눈부심이 전혀 없네요.",
        "likes": 18
      },
      {
        "id": "rev-prod-04-15",
        "author": "신*아",
        "rating": 4,
        "date": "2026-08-15",
        "content": "집들이 선물로 무조건 추천합니다. 가격 대비 감성과 기능 모두 잡았어요.",
        "likes": 17
      },
      {
        "id": "rev-prod-04-16",
        "author": "권*태",
        "rating": 5,
        "date": "2026-08-12",
        "content": "알루미늄 마감 퀄리티가 견고하고 묵직한 마그네틱 결합력이 안정적입니다.",
        "likes": 15
      },
      {
        "id": "rev-prod-04-17",
        "author": "황*현",
        "rating": 5,
        "date": "2026-08-09",
        "content": "작은 스탠드 하나로 침실 전체 분위기가 호텔 스위트룸처럼 변했어요.",
        "likes": 14
      },
      {
        "id": "rev-prod-04-18",
        "author": "안*호",
        "rating": 5,
        "date": "2026-08-06",
        "content": "자기 전 따뜻한 전구색 3000K 켜두고 음악 들으면 하루 스트레스가 다 풀립니다.",
        "likes": 12
      },
      {
        "id": "rev-prod-04-19",
        "author": "송*훈",
        "rating": 5,
        "date": "2026-08-03",
        "content": "크기도 아담하고 가벼워서 출장 갈 때도 챙겨가고 싶을 정도예요.",
        "likes": 11
      },
      {
        "id": "rev-prod-04-20",
        "author": "전*서",
        "rating": 5,
        "date": "2026-09-29",
        "content": "이지샵에서 구매한 인테리어 소품 중 가장 실용적이고 만족도 높은 제품입니다!",
        "likes": 9
      }
    ],
    "qnas": []
  },
  {
    "id": "prod-05",
    "name": "스페셜티 드립백 커피 시그니처 4종 기프트 세트",
    "category": "푸드 / 키친",
    "categoryId": "cat-food",
    "price": 28000,
    "originalPrice": 35000,
    "discountRate": 20,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 90,
    "isBest": true,
    "isNew": false,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "에티오피아 예가체프, 과테말라 안티구아, 콜롬비아 수프리모 등 최고 등급 20개입",
    "description": "<h3>집에서 즐기는 바리스타의 스페셜티 커피</h3><p>Q-Grader가 직접 엄선하고 당일 로스팅한 신선한 원두만을 질소 충전 드립백에 담았습니다. 간편하게 뜨거운 물만 부어 풍부한 크레마와 아로마를 느껴보세요.</p>",
    "options": [
      {
        "name": "시그니처 버라이어티 20개입",
        "stock": 60
      },
      {
        "name": "다크 로스팅 에디션 20개입",
        "stock": 30
      }
    ],
    "specs": {
      "구성": "드립백 10g x 20개",
      "유통기한": "제조일로부터 1년 (최근 1개월 내 제조품 발송)",
      "포장": "고급 선물용 하드케이스 & 쇼핑백 포함"
    },
    "reviews": [
      {
        "id": "rev-prod-05-1",
        "author": "홍*은",
        "rating": 4,
        "date": "2026-09-25",
        "content": "선물용으로 샀는데 포장도 너무 예쁘고 커피 향이 집안 가득 퍼지네요.",
        "likes": 40
      },
      {
        "id": "rev-prod-05-2",
        "author": "유*윤",
        "rating": 5,
        "date": "2026-09-22",
        "content": "에티오피아 예가체프의 산뜻한 꽃향과 과일 산미가 전문 카페 드립커피 그 자체입니다.",
        "likes": 38
      },
      {
        "id": "rev-prod-05-3",
        "author": "고*민",
        "rating": 5,
        "date": "2026-09-19",
        "content": "원두가 당일 로스팅된 것처럼 신선해서 뜨거운 물 붓자마자 커피 빵이 풍성하게 부풀어 올라요.",
        "likes": 37
      },
      {
        "id": "rev-prod-05-4",
        "author": "문*지",
        "rating": 5,
        "date": "2026-09-16",
        "content": "질소 충전 포장이라 뜯을 때마다 갓 분쇄한 신선한 원두 향이 진동합니다.",
        "likes": 35
      },
      {
        "id": "rev-prod-05-5",
        "author": "양*정",
        "rating": 5,
        "date": "2026-09-13",
        "content": "사무실에서 텀블러에 간편하게 내려 마시기 너무 좋아서 동료들과 같이 마시고 있어요.",
        "likes": 34
      },
      {
        "id": "rev-prod-05-6",
        "author": "손*영",
        "rating": 5,
        "date": "2026-09-10",
        "content": "4가지 원두가 각각 개성이 뚜렷해서 매일 아침 골라 마시는 재미가 쏠쏠합니다.",
        "likes": 32
      },
      {
        "id": "rev-prod-05-7",
        "author": "배*원",
        "rating": 5,
        "date": "2026-09-07",
        "content": "과테말라 안티구아는 스모키하면서도 다크초콜릿 같은 묵직한 바디감이 일품이네요.",
        "likes": 31
      },
      {
        "id": "rev-prod-05-8",
        "author": "백*린",
        "rating": 4,
        "date": "2026-09-04",
        "content": "드립백 필터가 컵에 단단하게 고정되어서 물 부을 때 흔들림 없이 안정적입니다.",
        "likes": 29
      },
      {
        "id": "rev-prod-05-9",
        "author": "허*준",
        "rating": 5,
        "date": "2026-09-01",
        "content": "고급 쇼핑백과 하드케이스 구성이라 명절 선물이나 답례품으로 손색이 없습니다.",
        "likes": 28
      },
      {
        "id": "rev-prod-05-10",
        "author": "노*경",
        "rating": 5,
        "date": "2026-08-29",
        "content": "산미 있는 커피를 안 좋아했는데 콜롬비아 수프리모는 밸런스가 잡혀서 아주 고소해요.",
        "likes": 26
      },
      {
        "id": "rev-prod-05-11",
        "author": "남*수",
        "rating": 5,
        "date": "2026-08-26",
        "content": "가격 대비 원두 퀄리티가 시중 프랜차이즈 드립백보다 훨씬 뛰어납니다.",
        "likes": 25
      },
      {
        "id": "rev-prod-05-12",
        "author": "심*우",
        "rating": 5,
        "date": "2026-08-23",
        "content": "원두 가루 날림 없이 깔끔하게 추출되고 뒤처리도 간편해서 홈카페용으로 딱입니다.",
        "likes": 23
      },
      {
        "id": "rev-prod-05-13",
        "author": "김*희",
        "rating": 5,
        "date": "2026-08-20",
        "content": "주말 브런치에 빵이랑 곁들여 마시면 여기가 바로 유명 핸드드립 카페네요.",
        "likes": 22
      },
      {
        "id": "rev-prod-05-14",
        "author": "이*진",
        "rating": 5,
        "date": "2026-08-17",
        "content": "커피를 좋아하는 부모님께 보내드렸는데 너무 맛있다고 추가 주문해 달라고 하셨습니다.",
        "likes": 20
      },
      {
        "id": "rev-prod-05-15",
        "author": "박*아",
        "rating": 4,
        "date": "2026-08-14",
        "content": "쓴맛 없이 끝 맛이 깔끔하고 은은한 단맛이 맴돌아 디저트 없이도 훌륭합니다.",
        "likes": 19
      },
      {
        "id": "rev-prod-05-16",
        "author": "최*태",
        "rating": 5,
        "date": "2026-08-11",
        "content": "포장 디자인도 세련되고 원두 설명 카드가 동봉되어 있어 알고 마시니 더 맛있어요.",
        "likes": 17
      },
      {
        "id": "rev-prod-05-17",
        "author": "정*현",
        "rating": 5,
        "date": "2026-08-08",
        "content": "아이스로 얼음 가득 채워 내려 마셔도 풍미가 전혀 옅어지지 않고 진합니다.",
        "likes": 16
      },
      {
        "id": "rev-prod-05-18",
        "author": "강*호",
        "rating": 5,
        "date": "2026-08-05",
        "content": "매달 정기구독하고 싶을 정도로 만족스러운 스페셜티 드립백 세트입니다.",
        "likes": 14
      },
      {
        "id": "rev-prod-05-19",
        "author": "조*훈",
        "rating": 5,
        "date": "2026-08-02",
        "content": "커피 애호가라면 꼭 한번 드셔보시길 추천합니다. 절대 후회 안 하실 거예요.",
        "likes": 13
      },
      {
        "id": "rev-prod-05-20",
        "author": "윤*서",
        "rating": 5,
        "date": "2026-09-28",
        "content": "신선도, 맛, 향, 패키지까지 모든 면에서 5점 만점에 5점 드립니다!",
        "likes": 11
      }
    ],
    "qnas": []
  },
  {
    "id": "prod-06",
    "name": "에르고노믹 알루미늄 노트북 거치대 스탠드",
    "category": "디지털 / 가전",
    "categoryId": "cat-digital",
    "price": 45000,
    "originalPrice": 62000,
    "discountRate": 27,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 60,
    "isBest": true,
    "isNew": false,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "풀 CNC 가공 항공 알루미늄, 360도 회전 및 무단 높이/각도 조절, 흔들림 없는 지지력",
    "description": "<h3>바른 자세를 위한 프리미엄 데스크테리어 필수품</h3><p>맥북, 태블릿부터 17인치 대화면 게이밍 노트북까지 완벽 거치 가능한 듀얼 힌지 구조입니다. 열 방출 벤틸레이션 홀로 장시간 사용 시 발열을 효과적으로 낮춰줍니다.</p>",
    "options": [
      {
        "name": "실버",
        "stock": 35
      },
      {
        "name": "스페이스 그레이",
        "stock": 25
      }
    ],
    "specs": {
      "호환": "10인치 ~ 17.3인치 노트북 및 태블릿",
      "재질": "항공 알루미늄 합금 + 실리콘 패드",
      "최대하중": "최대 10kg 지지"
    },
    "reviews": [
      {
        "id": "rev-prod-06-1",
        "author": "장*은",
        "rating": 4,
        "date": "2026-09-29",
        "content": "맥북 16인치 거치했는데 타이핑할 때 흔들림 1도 없이 아주 견고합니다.",
        "likes": 32
      },
      {
        "id": "rev-prod-06-2",
        "author": "임*윤",
        "rating": 5,
        "date": "2026-09-26",
        "content": "듀얼 힌지 관절이 묵직하고 단단해서 원하는 높이와 각도로 완벽하게 고정됩니다.",
        "likes": 30
      },
      {
        "id": "rev-prod-06-3",
        "author": "한*민",
        "rating": 5,
        "date": "2026-09-23",
        "content": "항공 알루미늄 재질이라 고급스럽고 실버 맥북이랑 일체감이 대박이에요.",
        "likes": 29
      },
      {
        "id": "rev-prod-06-4",
        "author": "오*지",
        "rating": 5,
        "date": "2026-09-20",
        "content": "거북목과 어깨 통증이 심했는데 눈높이에 딱 맞추니 자세가 바로잡혀서 살 것 같아요.",
        "likes": 27
      },
      {
        "id": "rev-prod-06-5",
        "author": "서*정",
        "rating": 5,
        "date": "2026-09-17",
        "content": "바닥과 거치면에 두꺼운 실리콘 패드가 덧대어져 있어 노트북 기스 걱정이 없습니다.",
        "likes": 26
      },
      {
        "id": "rev-prod-06-6",
        "author": "신*영",
        "rating": 5,
        "date": "2026-09-14",
        "content": "통풍 벤트 홀이 뚫려 있어서 무거운 작업할 때도 노트북 쿨링이 아주 잘 됩니다.",
        "likes": 24
      },
      {
        "id": "rev-prod-06-7",
        "author": "권*원",
        "rating": 5,
        "date": "2026-09-11",
        "content": "접어서 납작하게 만들 수 있어 카페나 공유 오피스 갈 때 파우치에 넣어 다니기 좋아요.",
        "likes": 23
      },
      {
        "id": "rev-prod-06-8",
        "author": "황*린",
        "rating": 4,
        "date": "2026-09-08",
        "content": "17인치 무거운 게이밍 노트북도 끄떡없이 안정적으로 버텨주는 내구성에 감탄했습니다.",
        "likes": 21
      },
      {
        "id": "rev-prod-06-9",
        "author": "안*준",
        "rating": 5,
        "date": "2026-09-05",
        "content": "360도 회전 베이스를 돌릴 때 '딸깍딸깍' 손맛이 너무 좋고 화면 공유할 때 최고예요.",
        "likes": 20
      },
      {
        "id": "rev-prod-06-10",
        "author": "송*경",
        "rating": 5,
        "date": "2026-09-02",
        "content": "데스크테리어의 완성입니다. 책상 위 공간이 넓어지고 키보드 수납도 깔끔해졌어요.",
        "likes": 18
      },
      {
        "id": "rev-prod-06-11",
        "author": "전*수",
        "rating": 5,
        "date": "2026-08-30",
        "content": "동봉된 렌치로 장력을 손쉽게 조절할 수 있어서 오랫동안 변형 없이 쓸 수 있겠네요.",
        "likes": 17
      },
      {
        "id": "rev-prod-06-12",
        "author": "홍*우",
        "rating": 5,
        "date": "2026-08-27",
        "content": "아이패드로 드로잉할 때도 흔들리지 않고 탄탄하게 지지해 줍니다.",
        "likes": 15
      },
      {
        "id": "rev-prod-06-13",
        "author": "유*희",
        "rating": 5,
        "date": "2026-08-24",
        "content": "재택근무 필수템입니다. 이거 쓰고부터 하루 종일 일해도 목 피로도가 절반으로 줄었어요.",
        "likes": 14
      },
      {
        "id": "rev-prod-06-14",
        "author": "고*진",
        "rating": 5,
        "date": "2026-08-21",
        "content": "마감 처리가 매끄러워 날카로운 모서리 없이 안전하게 잘 만들어졌습니다.",
        "likes": 12
      },
      {
        "id": "rev-prod-06-15",
        "author": "문*아",
        "rating": 4,
        "date": "2026-08-18",
        "content": "알루미늄 두께가 두껍고 묵직해서 흔들리는 저가형 플라스틱 거치대와는 차원이 다릅니다.",
        "likes": 11
      },
      {
        "id": "rev-prod-06-16",
        "author": "양*태",
        "rating": 5,
        "date": "2026-08-15",
        "content": "스페이스 그레이 색상도 모던하고 데스크 셋업에 너무 잘 어울립니다.",
        "likes": 9
      },
      {
        "id": "rev-prod-06-17",
        "author": "손*현",
        "rating": 5,
        "date": "2026-08-12",
        "content": "회사 동료들에게 다 추천해서 저희 팀 절반이 이 거치대로 바꿨습니다.",
        "likes": 8
      },
      {
        "id": "rev-prod-06-18",
        "author": "배*호",
        "rating": 5,
        "date": "2026-08-09",
        "content": "높이 조절 폭이 넓어서 서서 일하는 스탠딩 워크 모드로도 활용 가능해요.",
        "likes": 6
      },
      {
        "id": "rev-prod-06-19",
        "author": "백*훈",
        "rating": 5,
        "date": "2026-08-06",
        "content": "가격 이상의 완성도와 품질을 보여주는 알루미늄 거치대입니다.",
        "likes": 5
      },
      {
        "id": "rev-prod-06-20",
        "author": "허*서",
        "rating": 5,
        "date": "2026-08-03",
        "content": "노트북 쓰시는 분들은 무조건 구매하세요. 삶의 질이 수직 상승합니다!",
        "likes": 3
      }
    ],
    "qnas": []
  },
  {
    "id": "prod-07",
    "name": "프렌치 린넨 100% 루즈핏 스트라이프 셔츠",
    "category": "패션 / 의류",
    "categoryId": "cat-fashion",
    "price": 79000,
    "originalPrice": 119000,
    "discountRate": 33,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 48,
    "isBest": false,
    "isNew": true,
    "isSale": true,
    "isFreeShipping": true,
    "thumbnail": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "프랑스 노르망디산 프리미엄 린넨, 자연스러운 구김과 쾌적한 쿨링 터치",
    "description": "<h3>자연을 닮은 편안함, 내추럴 프렌치 린넨</h3><p>피부에 닿는 순간 시원한 청량감을 주는 100% 최고급 프렌치 린넨으로 제작되었습니다. 여유 있는 오버핏 패턴으로 단독 착용은 물론 가벼운 아우터 셔츠로도 훌륭합니다.</p>",
    "options": [
      {
        "name": "스카이블루 스트라이프 / M",
        "stock": 18
      },
      {
        "name": "스카이블루 스트라이프 / L",
        "stock": 12
      },
      {
        "name": "클래식 네이비 스트라이프 / M",
        "stock": 10
      },
      {
        "name": "클래식 네이비 스트라이프 / L",
        "stock": 8
      }
    ],
    "specs": {
      "소재": "프렌치 린넨 100%",
      "세탁": "찬물 단독 울코스 손세탁 권장",
      "원산지": "대한민국"
    },
    "reviews": [
      {
        "id": "rev-prod-07-1",
        "author": "노*은",
        "rating": 4,
        "date": "2026-09-28",
        "content": "프랑스산 린넨이라 그런지 피부에 닿는 촉감이 까슬거리지 않고 아주 시원합니다.",
        "likes": 34
      },
      {
        "id": "rev-prod-07-2",
        "author": "남*윤",
        "rating": 5,
        "date": "2026-09-25",
        "content": "스카이블루 스트라이프 색감이 청량해서 청바지나 슬랙스 어디에나 잘 어울려요.",
        "likes": 32
      },
      {
        "id": "rev-prod-07-3",
        "author": "심*민",
        "rating": 5,
        "date": "2026-09-22",
        "content": "자연스러운 구김마저 멋스러운 프렌치 무드가 물씬 풍기는 셔츠입니다.",
        "likes": 31
      },
      {
        "id": "rev-prod-07-4",
        "author": "김*지",
        "rating": 5,
        "date": "2026-09-19",
        "content": "루즈핏 패턴이 여유로워서 체형 커버도 잘 되고 핏이 정말 스타일리시합니다.",
        "likes": 29
      },
      {
        "id": "rev-prod-07-5",
        "author": "이*정",
        "rating": 5,
        "date": "2026-09-16",
        "content": "단추를 두 개 풀고 소매를 롤업해서 입으면 캐주얼하면서도 세련된 느낌이 나요.",
        "likes": 28
      },
      {
        "id": "rev-prod-07-6",
        "author": "박*영",
        "rating": 5,
        "date": "2026-09-13",
        "content": "여름철 에어컨 바람 부는 실내나 휴양지 리조트룩 아우터로 걸치기 딱 좋습니다.",
        "likes": 26
      },
      {
        "id": "rev-prod-07-7",
        "author": "최*원",
        "rating": 5,
        "date": "2026-09-10",
        "content": "통기성이 뛰어나서 땀이 차도 금방 마르고 하루 종일 쾌적하게 착용할 수 있어요.",
        "likes": 25
      },
      {
        "id": "rev-prod-07-8",
        "author": "정*린",
        "rating": 4,
        "date": "2026-09-07",
        "content": "원단 봉제선과 카라 각이 탄탄하게 잡혀있어 세탁 후에도 모양 변형이 적습니다.",
        "likes": 23
      },
      {
        "id": "rev-prod-07-9",
        "author": "강*준",
        "rating": 5,
        "date": "2026-09-04",
        "content": "클래식 네이비 스트라이프도 추가 구매했는데 슬림해 보이고 차분해서 너무 좋아요.",
        "likes": 22
      },
      {
        "id": "rev-prod-07-10",
        "author": "조*경",
        "rating": 5,
        "date": "2026-09-01",
        "content": "단추 자개 디테일이 고급스러워서 백화점 고가 브랜드 셔츠 느낌이 납니다.",
        "likes": 20
      },
      {
        "id": "rev-prod-07-11",
        "author": "윤*수",
        "rating": 5,
        "date": "2026-08-29",
        "content": "기장감이 엉덩이를 살짝 덮어주어 바지 안에 넣어 입거나 빼서 입기 모두 좋아요.",
        "likes": 19
      },
      {
        "id": "rev-prod-07-12",
        "author": "장*우",
        "rating": 5,
        "date": "2026-08-26",
        "content": "휴가철 바닷가에서 수영복 위에 가볍게 걸쳐 입었는데 사진이 너무 잘 나왔어요.",
        "likes": 17
      },
      {
        "id": "rev-prod-07-13",
        "author": "임*희",
        "rating": 5,
        "date": "2026-08-23",
        "content": "린넨 특유의 뻣뻣함이 없고 워싱 가공이 잘 되어 있어 첫 착용부터 부드럽습니다.",
        "likes": 16
      },
      {
        "id": "rev-prod-07-14",
        "author": "한*진",
        "rating": 5,
        "date": "2026-08-20",
        "content": "남녀공용으로 커플룩으로 맞춰 입었는데 둘 다 핏이 예쁘게 떨어집니다.",
        "likes": 14
      },
      {
        "id": "rev-prod-07-15",
        "author": "오*아",
        "rating": 4,
        "date": "2026-08-17",
        "content": "봄부터 한여름, 초가을까지 3계절 내내 손이 자주 갈 데일리 셔츠입니다.",
        "likes": 13
      },
      {
        "id": "rev-prod-07-16",
        "author": "서*태",
        "rating": 5,
        "date": "2026-08-14",
        "content": "포장도 옷걸이와 함께 비닐 커버에 깔끔하게 배송되어 구김 없이 잘 받았습니다.",
        "likes": 11
      },
      {
        "id": "rev-prod-07-17",
        "author": "신*현",
        "rating": 5,
        "date": "2026-08-11",
        "content": "원단 밀도가 적당해서 비침 걱정 없이 단독으로 입기에 아주 좋습니다.",
        "likes": 10
      },
      {
        "id": "rev-prod-07-18",
        "author": "권*호",
        "rating": 5,
        "date": "2026-08-08",
        "content": "스타일과 시원함을 둘 다 챙길 수 있는 최고의 린넨 셔츠입니다.",
        "likes": 8
      },
      {
        "id": "rev-prod-07-19",
        "author": "황*훈",
        "rating": 5,
        "date": "2026-08-05",
        "content": "주변에서 셔츠 어디서 샀냐는 칭찬 많이 들었습니다. 강력 추천해요!",
        "likes": 7
      },
      {
        "id": "rev-prod-07-20",
        "author": "안*서",
        "rating": 5,
        "date": "2026-08-02",
        "content": "퀄리티 대비 가격이 너무 착해서 색상별로 소장 가치 100%입니다.",
        "likes": 5
      }
    ],
    "qnas": []
  },
  {
    "id": "prod-08",
    "name": "울트라 슬림 기계식 무선 블루투스 키보드",
    "category": "디지털 / 가전",
    "categoryId": "cat-digital",
    "price": 129000,
    "originalPrice": 169000,
    "discountRate": 23,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 38,
    "isBest": true,
    "isNew": true,
    "isSale": false,
    "isFreeShipping": true,
    "thumbnail": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "로우 프로파일 게이트론 적축/갈축, Mac/Windows 동시 지원 멀티페어링",
    "description": "<h3>얇고 경쾌한 프리미엄 타건감</h3><p>두께 18mm의 초슬림 디자인으로 손목 받침대 없이도 장시간 편안한 타이핑을 제공합니다. 3개 기기 동시 연결 블루투스 5.1 및 유선 Type-C 모드를 모두 지원합니다.</p>",
    "options": [
      {
        "name": "저소음 갈축 (부드러운 구분감)",
        "stock": 20
      },
      {
        "name": "리니어 적축 (조용하고 빠른 입력)",
        "stock": 18
      }
    ],
    "specs": {
      "키 레이아웃": "84키 텐키리스 컴팩트",
      "백라이트": "화이트 LED 15가지 이펙트",
      "배터리": "4000mAh (최대 200시간 사용)"
    },
    "reviews": [
      {
        "id": "rev-prod-08-1",
        "author": "송*은",
        "rating": 4,
        "date": "2026-09-27",
        "content": "로우 프로파일 갈축 타건감이 쫀득하고 손목 피로가 없어서 타이핑이 즐겁습니다.",
        "likes": 36
      },
      {
        "id": "rev-prod-08-2",
        "author": "전*윤",
        "rating": 5,
        "date": "2026-09-24",
        "content": "두께가 얇아서 팜레스트 없이 책상에 착 붙여 써도 손목 각도가 편안해요.",
        "likes": 34
      },
      {
        "id": "rev-prod-08-3",
        "author": "홍*민",
        "rating": 5,
        "date": "2026-09-21",
        "content": "블루투스로 맥북, 아이패드, 윈도우 PC 3대를 원터치로 번갈아 쓰는데 딜레이가 없습니다.",
        "likes": 33
      },
      {
        "id": "rev-prod-08-4",
        "author": "유*지",
        "rating": 5,
        "date": "2026-09-18",
        "content": "화이트 백라이트 이펙트가 과하지 않고 세련되어 야간 작업할 때 감성 터집니다.",
        "likes": 31
      },
      {
        "id": "rev-prod-08-5",
        "author": "고*정",
        "rating": 5,
        "date": "2026-09-15",
        "content": "키캡 폰트 각인이 깔끔하고 PBT 질감이 보들보들해서 지문이나 기름이 안 묻어요.",
        "likes": 30
      },
      {
        "id": "rev-prod-08-6",
        "author": "문*영",
        "rating": 5,
        "date": "2026-09-12",
        "content": "텐키리스 84키 컴팩트 배열이라 마우스 움직일 수 있는 데스크 공간이 훨씬 넓어졌습니다.",
        "likes": 28
      },
      {
        "id": "rev-prod-08-7",
        "author": "양*원",
        "rating": 5,
        "date": "2026-09-09",
        "content": "배터리 용량이 4000mAh라 한 번 충전하고 한 달 넘게 무선으로 쓰는 중입니다.",
        "likes": 27
      },
      {
        "id": "rev-prod-08-8",
        "author": "손*린",
        "rating": 4,
        "date": "2026-09-06",
        "content": "저소음 갈축이라 사무실에서 눈치 보이지 않고 기분 좋은 도각도각 소리를 즐길 수 있어요.",
        "likes": 25
      },
      {
        "id": "rev-prod-08-9",
        "author": "배*준",
        "rating": 5,
        "date": "2026-09-03",
        "content": "Mac 전용 멀티미디어 펑션키가 완벽 호환되어 밝기/음량 조절이 순정과 똑같습니다.",
        "likes": 24
      },
      {
        "id": "rev-prod-08-10",
        "author": "백*경",
        "rating": 5,
        "date": "2026-08-31",
        "content": "풀 알루미늄 프레임이라 얇지만 묵직하게 바닥에 고정되어 통울림이 없습니다.",
        "likes": 22
      },
      {
        "id": "rev-prod-08-11",
        "author": "허*수",
        "rating": 5,
        "date": "2026-08-28",
        "content": "블루투스 5.1 연결 안정성이 뛰어나서 게임할 때도 끊김 없이 즉각 반응하네요.",
        "likes": 21
      },
      {
        "id": "rev-prod-08-12",
        "author": "노*우",
        "rating": 5,
        "date": "2026-08-25",
        "content": "동봉된 Type-C 패브릭 케이블로 유선 모드 전환도 즉시 가능해서 편리합니다.",
        "likes": 19
      },
      {
        "id": "rev-prod-08-13",
        "author": "남*희",
        "rating": 5,
        "date": "2026-08-22",
        "content": "휴대하기 좋은 슬림한 두께라 가방에 쏙 넣어 카페 작업할 때 챙겨가기 좋아요.",
        "likes": 18
      },
      {
        "id": "rev-prod-08-14",
        "author": "심*진",
        "rating": 5,
        "date": "2026-08-19",
        "content": "키감이 너무 중독적이라 타자 연습을 계속하게 되네요. 개발자/작가분들께 강추합니다.",
        "likes": 16
      },
      {
        "id": "rev-prod-08-15",
        "author": "김*아",
        "rating": 4,
        "date": "2026-08-16",
        "content": "기계식 키보드 입문용으로 샀는데 플래그십 종결급 완성도에 감탄했습니다.",
        "likes": 15
      },
      {
        "id": "rev-prod-08-16",
        "author": "이*태",
        "rating": 5,
        "date": "2026-08-13",
        "content": "키스위치 핫스왑 지원이라 나중에 스위치 커스텀 교체하기도 쉬울 것 같아요.",
        "likes": 13
      },
      {
        "id": "rev-prod-08-17",
        "author": "박*현",
        "rating": 5,
        "date": "2026-08-10",
        "content": "디자인이 모던하고 애플 스페이스 그레이 색상과 완벽한 일체감을 보여줍니다.",
        "likes": 12
      },
      {
        "id": "rev-prod-08-18",
        "author": "최*호",
        "rating": 5,
        "date": "2026-08-07",
        "content": "포장 박스부터 키캡 리무버, 더스트 커버까지 풀 패키지 구성이 훌륭합니다.",
        "likes": 10
      },
      {
        "id": "rev-prod-08-19",
        "author": "정*훈",
        "rating": 5,
        "date": "2026-08-04",
        "content": "타건 소리가 정갈하고 잡음이 없어 음성 회의 중에도 마이크에 키보드 소리가 안 들어가요.",
        "likes": 9
      },
      {
        "id": "rev-prod-08-20",
        "author": "강*서",
        "rating": 5,
        "date": "2026-08-01",
        "content": "손목 건강과 업무 효율을 동시에 챙겨주는 최고의 무선 기계식 키보드입니다!",
        "likes": 7
      }
    ],
    "qnas": []
  },
  {
    "id": "prod-09",
    "name": "시그니처 우디 아로마 디퓨저 & 캔들 세트",
    "category": "리빙 / 인테리어",
    "categoryId": "cat-living",
    "price": 52000,
    "originalPrice": 75000,
    "discountRate": 30,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 70,
    "isBest": false,
    "isNew": true,
    "isSale": true,
    "isFreeShipping": true,
    "thumbnail": "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "프랑스 그라스 향료 조향, 시더우드와 은은한 샌달우드가 전하는 힐링의 숲",
    "description": "<h3>지친 하루의 끝, 공간을 채우는 우아한 휴식</h3><p>천연 소이왁스와 식물성 디퓨저 베이스로 머리 아픔 없는 편안한 발향을 선사합니다. 고급스러운 앰버 글라스 보틀로 인테리어 오브제로도 손색없습니다.</p>",
    "options": [
      {
        "name": "포레스트 레스트 (시더우드 & 앰버)",
        "stock": 40
      },
      {
        "name": "모닝 미스트 (유칼립투스 & 베르가못)",
        "stock": 30
      }
    ],
    "specs": {
      "구성": "디퓨저 200ml + 리드스틱 6개 + 소이캔들 180g",
      "사용기간": "디퓨저 약 2~3개월 지속",
      "안전확인": "환경부 안전기준 적합확인 신고 완료"
    },
    "reviews": [
      {
        "id": "rev-prod-09-1",
        "author": "조*은",
        "rating": 4,
        "date": "2026-09-26",
        "content": "시더우드와 은은한 샌달우드 향이 방안 가득 퍼져서 마치 고급 호텔 스파에 온 기분입니다.",
        "likes": 38
      },
      {
        "id": "rev-prod-09-2",
        "author": "윤*윤",
        "rating": 5,
        "date": "2026-09-23",
        "content": "인공적인 독한 향이 아니라 천연 에센셜 오일 향이라 머리가 전혀 아프지 않아요.",
        "likes": 36
      },
      {
        "id": "rev-prod-09-3",
        "author": "장*민",
        "rating": 5,
        "date": "2026-09-20",
        "content": "앰버 글라스 보틀과 블랙 리드스틱 조화가 모던해서 거실 인테리어 포인트가 됩니다.",
        "likes": 35
      },
      {
        "id": "rev-prod-09-4",
        "author": "임*지",
        "rating": 5,
        "date": "2026-09-17",
        "content": "소이캔들도 심지가 타닥타닥 타는 소리와 함께 은은하게 발향되어 자기 전 힐링템이에요.",
        "likes": 33
      },
      {
        "id": "rev-prod-09-5",
        "author": "한*정",
        "rating": 5,
        "date": "2026-09-14",
        "content": "리드스틱 3개만 꽂아두었는데도 30평대 거실 전체에 기분 좋은 숲 향이 은은하게 퍼집니다.",
        "likes": 32
      },
      {
        "id": "rev-prod-09-6",
        "author": "오*영",
        "rating": 5,
        "date": "2026-09-11",
        "content": "집들이 선물로 드렸는데 패키지가 너무 고급스러워서 선물한 저까지 뿌듯했습니다.",
        "likes": 30
      },
      {
        "id": "rev-prod-09-7",
        "author": "서*원",
        "rating": 5,
        "date": "2026-09-08",
        "content": "포레스트 레스트 향은 피톤치드 가득한 새벽 숲길을 걷는 듯 마음이 편안해집니다.",
        "likes": 29
      },
      {
        "id": "rev-prod-09-8",
        "author": "신*린",
        "rating": 4,
        "date": "2026-09-05",
        "content": "디퓨저 용량이 200ml라 3개월 이상 넉넉하게 오래 쓸 수 있어 가성비도 훌륭해요.",
        "likes": 27
      },
      {
        "id": "rev-prod-09-9",
        "author": "권*준",
        "rating": 5,
        "date": "2026-09-02",
        "content": "환경부 안전기준 인증 완료 제품이라 반려동물과 함께 사는 집에서도 안심하고 씁니다.",
        "likes": 26
      },
      {
        "id": "rev-prod-09-10",
        "author": "황*경",
        "rating": 5,
        "date": "2026-08-30",
        "content": "욕실에 두었더니 특유의 꿉꿉한 냄새가 싹 사라지고 쾌적한 숲속 향만 남았어요.",
        "likes": 24
      },
      {
        "id": "rev-prod-09-11",
        "author": "안*수",
        "rating": 5,
        "date": "2026-08-27",
        "content": "모닝 미스트 향도 상큼한 베르가못과 유칼립투스 조합이 활력을 불어넣어 줍니다.",
        "likes": 23
      },
      {
        "id": "rev-prod-09-12",
        "author": "송*우",
        "rating": 5,
        "date": "2026-08-24",
        "content": "캔들 태울 때 그을음이 전혀 없고 왁스가 터널링 없이 고르게 잘 녹아내립니다.",
        "likes": 21
      },
      {
        "id": "rev-prod-09-13",
        "author": "전*희",
        "rating": 5,
        "date": "2026-08-21",
        "content": "퇴근하고 집에 들어왔을 때 현관에서 나는 우디 향 덕분에 하루 피로가 싹 풀려요.",
        "likes": 20
      },
      {
        "id": "rev-prod-09-14",
        "author": "홍*진",
        "rating": 5,
        "date": "2026-08-18",
        "content": "유리병 마감과 라벨 디자인이 감각적이어서 다 쓰고 화병으로 재활용해도 예쁠 것 같아요.",
        "likes": 18
      },
      {
        "id": "rev-prod-09-15",
        "author": "유*아",
        "rating": 4,
        "date": "2026-08-15",
        "content": "향에 민감한 남편도 이 디퓨저 향은 너무 편안하고 좋다고 인정했습니다.",
        "likes": 17
      },
      {
        "id": "rev-prod-09-16",
        "author": "고*태",
        "rating": 5,
        "date": "2026-08-12",
        "content": "계절을 타지 않는 중성적이고 세련된 우디 베이스라 사계절 내내 사용하기 좋습니다.",
        "likes": 15
      },
      {
        "id": "rev-prod-09-17",
        "author": "문*현",
        "rating": 5,
        "date": "2026-08-09",
        "content": "발향력이 떨어질 때쯤 리드스틱을 뒤집어주면 다시 풍성한 향이 살아납니다.",
        "likes": 14
      },
      {
        "id": "rev-prod-09-18",
        "author": "양*호",
        "rating": 5,
        "date": "2026-08-06",
        "content": "친구 생일 선물로 보냈는데 포장 박스 열자마자 향기가 나서 너무 감동했대요.",
        "likes": 12
      },
      {
        "id": "rev-prod-09-19",
        "author": "손*훈",
        "rating": 5,
        "date": "2026-08-03",
        "content": "가격 대비 향의 깊이감과 지속력이 니치 향수 브랜드 디퓨저 이상입니다.",
        "likes": 11
      },
      {
        "id": "rev-prod-09-20",
        "author": "배*서",
        "rating": 5,
        "date": "2026-09-29",
        "content": "공간의 분위기를 한 단계 업그레이드해 주는 인생 디퓨저 & 캔들 세트입니다!",
        "likes": 9
      }
    ],
    "qnas": []
  },
  {
    "id": "prod-10",
    "name": "비건 세라마이드 보습 장벽 수분크림 100ml",
    "category": "뷰티 / 케어",
    "categoryId": "cat-beauty",
    "price": 34000,
    "originalPrice": 48000,
    "discountRate": 29,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 65,
    "isBest": false,
    "isNew": false,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "100시간 보습 지속력 임상 완료, 5종 세라마이드로 무너진 피부 장벽 급속 리셋",
    "description": "<h3>속건조 완벽 해결, 순한 비건 보습막</h3><p>EWG 그린 등급 원료만을 사용하여 민감성 피부도 안심하고 사용할 수 있는 고보습 장벽 크림입니다. 번들거림 없이 실키하게 밀착됩니다.</p>",
    "options": [
      {
        "name": "본품 100ml 튜브형",
        "stock": 45
      },
      {
        "name": "대용량 200ml 펌프형 (+15,000원)",
        "stock": 20
      }
    ],
    "specs": {
      "용량": "100ml / 200ml",
      "인증": "이탈리아 V-LABEL 비건 정식 인증",
      "피부타입": "건성, 민감성, 수부지"
    },
    "reviews": [
      {
        "id": "rev-prod-10-1",
        "author": "백*은",
        "rating": 4,
        "date": "2026-09-25",
        "content": "100시간 보습 임상 완료답게 아침에 바르고 나가도 저녁까지 당김이 전혀 없습니다.",
        "likes": 40
      },
      {
        "id": "rev-prod-10-2",
        "author": "허*윤",
        "rating": 5,
        "date": "2026-09-22",
        "content": "5종 세라마이드 덕분인지 환절기마다 붉어지던 피부 장벽이 튼튼하게 회복되었어요.",
        "likes": 38
      },
      {
        "id": "rev-prod-10-3",
        "author": "노*민",
        "rating": 5,
        "date": "2026-09-19",
        "content": "튜브형이라 위생적이고 양 조절하기 쉬우며 여행 갈 때 챙기기에도 편리합니다.",
        "likes": 37
      },
      {
        "id": "rev-prod-10-4",
        "author": "남*지",
        "rating": 5,
        "date": "2026-09-16",
        "content": "비건 정식 인증 제품이라 성분이 너무 순해서 트러블 피부에도 자극 없이 편안해요.",
        "likes": 35
      },
      {
        "id": "rev-prod-10-5",
        "author": "심*정",
        "rating": 5,
        "date": "2026-09-13",
        "content": "고보습 크림인데도 무겁거나 끈적이지 않고 피부에 쏙 흡수되어 벨벳처럼 마무리됩니다.",
        "likes": 34
      },
      {
        "id": "rev-prod-10-6",
        "author": "김*영",
        "rating": 5,
        "date": "2026-09-10",
        "content": "메이크업 전에 얇게 펴 바르면 베이스 화장이 찰떡같이 밀착되고 들뜸이 사라져요.",
        "likes": 32
      },
      {
        "id": "rev-prod-10-7",
        "author": "이*원",
        "rating": 5,
        "date": "2026-09-07",
        "content": "여드름 압출 후 민감해진 부위에 발라주면 진정 효과가 아주 뛰어납니다.",
        "likes": 31
      },
      {
        "id": "rev-prod-10-8",
        "author": "박*린",
        "rating": 4,
        "date": "2026-09-04",
        "content": "무향이라 향에 민감하신 분들도 호불호 없이 온 가족이 함께 쓸 수 있는 크림입니다.",
        "likes": 29
      },
      {
        "id": "rev-prod-10-9",
        "author": "최*준",
        "rating": 5,
        "date": "2026-09-01",
        "content": "피부 속부터 수분이 꽉 차오르는 느낌이라 속건조 잡는 데는 이만한 크림이 없네요.",
        "likes": 28
      },
      {
        "id": "rev-prod-10-10",
        "author": "정*경",
        "rating": 5,
        "date": "2026-08-29",
        "content": "남편 면도 후 진정 보습용으로 같이 쓰는데 면도독도 안 올라오고 대만족입니다.",
        "likes": 26
      },
      {
        "id": "rev-prod-10-11",
        "author": "강*수",
        "rating": 5,
        "date": "2026-08-26",
        "content": "대용량 펌프형도 추가 구매해서 바디 건조한 부위까지 아낌없이 바르고 있어요.",
        "likes": 25
      },
      {
        "id": "rev-prod-10-12",
        "author": "조*우",
        "rating": 5,
        "date": "2026-08-23",
        "content": "겨울철 히터 바람 앞에서도 피부 수분이 날아가지 않고 촉촉하게 방어막을 쳐줍니다.",
        "likes": 23
      },
      {
        "id": "rev-prod-10-13",
        "author": "윤*희",
        "rating": 5,
        "date": "2026-08-20",
        "content": "피부과 레이저 시술 받고 재생 보습 크림으로 썼는데 회복 속도가 빨랐습니다.",
        "likes": 22
      },
      {
        "id": "rev-prod-10-14",
        "author": "장*진",
        "rating": 5,
        "date": "2026-08-17",
        "content": "EWG 그린 등급 전성분이라 임산부인 언니에게도 안심하고 선물했습니다.",
        "likes": 20
      },
      {
        "id": "rev-prod-10-15",
        "author": "임*아",
        "rating": 4,
        "date": "2026-08-14",
        "content": "발림성이 부드러운 생크림 같아서 소량만 발라도 얼굴 전체에 촉촉하게 펴 발립니다.",
        "likes": 19
      },
      {
        "id": "rev-prod-10-16",
        "author": "한*태",
        "rating": 5,
        "date": "2026-08-11",
        "content": "유수분 밸런스를 기가 막히게 맞춰줘서 번들거림 없이 깔끔한 유수분막을 형성해요.",
        "likes": 17
      },
      {
        "id": "rev-prod-10-17",
        "author": "오*현",
        "rating": 5,
        "date": "2026-08-08",
        "content": "수부지(수분부족지성) 피부 타입 분들에게 적극 추천하고 싶은 장벽 크림입니다.",
        "likes": 16
      },
      {
        "id": "rev-prod-10-18",
        "author": "서*호",
        "rating": 5,
        "date": "2026-08-05",
        "content": "벌써 3통째 비우고 있는 정착템입니다. 단종되면 안 되는 인생 수분크림이에요.",
        "likes": 14
      },
      {
        "id": "rev-prod-10-19",
        "author": "신*훈",
        "rating": 5,
        "date": "2026-08-02",
        "content": "가성비, 성분, 보습력, 흡수력 모두 완벽한 5점 만점짜리 스킨케어입니다.",
        "likes": 13
      },
      {
        "id": "rev-prod-10-20",
        "author": "권*서",
        "rating": 5,
        "date": "2026-09-28",
        "content": "민감하고 건조한 피부로 고민 중이시라면 꼭 한번 써보세요. 놀라운 변화를 느끼실 겁니다!",
        "likes": 11
      }
    ],
    "qnas": []
  },
  {
    "id": "prod-11",
    "name": "핸드메이드 세라믹 머그 & 우드 코스터 세트",
    "category": "리빙 / 인테리어",
    "categoryId": "cat-living",
    "price": 24000,
    "originalPrice": 32000,
    "discountRate": 25,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 40,
    "isBest": false,
    "isNew": true,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "도예 작가의 정성스런 손길로 빚은 질감, 월넛 천연목 코스터 포함",
    "description": "<h3>따뜻한 온기를 전하는 테이블웨어</h3><p>1,250도 고온에서 구워내 내구성이 뛰어나며 전자레인지 및 식기세척기 사용이 가능합니다. 자연스러운 유약의 흐름이 멋스러운 나만의 컵입니다.</p>",
    "options": [
      {
        "name": "아이보리 매트 (350ml)",
        "stock": 20
      },
      {
        "name": "테라코타 샌드 (350ml)",
        "stock": 20
      }
    ],
    "specs": {
      "재질": "도자기 (머그), 북미산 월넛 (코스터)",
      "원산지": "대한민국 여주"
    },
    "reviews": [
      {
        "id": "rev-prod-11-1",
        "author": "황*은",
        "rating": 4,
        "date": "2026-09-29",
        "content": "여주 도예 작가님의 손길이 느껴지는 질감과 그립감이 너무 편안하고 따뜻합니다.",
        "likes": 32
      },
      {
        "id": "rev-prod-11-2",
        "author": "안*윤",
        "rating": 5,
        "date": "2026-09-26",
        "content": "월넛 천연목 코스터가 세트로 포함되어 있어 홈카페 감성 티타임에 완벽해요.",
        "likes": 30
      },
      {
        "id": "rev-prod-11-3",
        "author": "송*민",
        "rating": 5,
        "date": "2026-09-23",
        "content": "350ml 용량이 넉넉해서 아메리카노나 라떼 한 잔 듬뿍 내려 마시기 딱 좋습니다.",
        "likes": 29
      },
      {
        "id": "rev-prod-11-4",
        "author": "전*지",
        "rating": 5,
        "date": "2026-09-20",
        "content": "전자레인지와 식기세척기 사용이 가능해서 일상에서 관리하기가 정말 수월해요.",
        "likes": 27
      },
      {
        "id": "rev-prod-11-5",
        "author": "홍*정",
        "rating": 5,
        "date": "2026-09-17",
        "content": "아이보리 매트 색상의 자연스러운 유약 흐름이 은은하고 예술품 같은 멋이 있습니다.",
        "likes": 26
      },
      {
        "id": "rev-prod-11-6",
        "author": "유*영",
        "rating": 5,
        "date": "2026-09-14",
        "content": "머그잔 손잡이가 손가락에 착 감겨서 가득 담아도 손목에 무리가 가지 않아요.",
        "likes": 24
      },
      {
        "id": "rev-prod-11-7",
        "author": "고*원",
        "rating": 5,
        "date": "2026-09-11",
        "content": "보온성이 좋아서 따뜻한 차나 커피가 오랫동안 식지 않고 온기를 유지합니다.",
        "likes": 23
      },
      {
        "id": "rev-prod-11-8",
        "author": "문*린",
        "rating": 4,
        "date": "2026-09-08",
        "content": "결혼 축하 선물로 커플 세트로 선물했는데 받는 분들이 사진 찍어 자랑할 정도로 좋아했어요.",
        "likes": 21
      },
      {
        "id": "rev-prod-11-9",
        "author": "양*준",
        "rating": 5,
        "date": "2026-09-05",
        "content": "테라코타 샌드 색상도 흙 본연의 내추럴한 멋이 살아있어 브런치 플레이팅에 찰떡입니다.",
        "likes": 20
      },
      {
        "id": "rev-prod-11-10",
        "author": "손*경",
        "rating": 5,
        "date": "2026-09-02",
        "content": "도자기 두께감이 적당히 도톰해서 입술에 닿는 촉감이 아주 부드럽습니다.",
        "likes": 18
      },
      {
        "id": "rev-prod-11-11",
        "author": "배*수",
        "rating": 5,
        "date": "2026-08-30",
        "content": "포장 패키지도 친환경 완충재와 고급 상자에 담겨와서 파손 없이 안전하게 받았습니다.",
        "likes": 17
      },
      {
        "id": "rev-prod-11-12",
        "author": "백*우",
        "rating": 5,
        "date": "2026-08-27",
        "content": "코스터는 컵 받침뿐만 아니라 작은 디저트 플레이트로 활용해도 너무 예뻐요.",
        "likes": 15
      },
      {
        "id": "rev-prod-11-13",
        "author": "허*희",
        "rating": 5,
        "date": "2026-08-24",
        "content": "핸드메이드 특유의 세상에 단 하나뿐인 고유한 질감이 매력적입니다.",
        "likes": 14
      },
      {
        "id": "rev-prod-11-14",
        "author": "노*진",
        "rating": 5,
        "date": "2026-08-21",
        "content": "일할 때 책상 위에 올려두기만 해도 데스크 인테리어가 차분하고 정갈해집니다.",
        "likes": 12
      },
      {
        "id": "rev-prod-11-15",
        "author": "남*아",
        "rating": 4,
        "date": "2026-08-18",
        "content": "매일 아침 이 잔에 모닝커피를 마시는 게 하루의 소소하고 확실한 행복이 되었어요.",
        "likes": 11
      },
      {
        "id": "rev-prod-11-16",
        "author": "심*태",
        "rating": 5,
        "date": "2026-08-15",
        "content": "바닥면 마감도 매끄럽게 처리되어 테이블에 스크래치를 내지 않습니다.",
        "likes": 9
      },
      {
        "id": "rev-prod-11-17",
        "author": "김*현",
        "rating": 5,
        "date": "2026-08-12",
        "content": "가벼운 세척만으로도 커피 착색이 남지 않고 깔끔하게 닦여서 관리하기 좋아요.",
        "likes": 8
      },
      {
        "id": "rev-prod-11-18",
        "author": "이*호",
        "rating": 5,
        "date": "2026-08-09",
        "content": "집들이, 생일, 기념일 선물용으로 이만한 가성비와 감성을 갖춘 머그잔이 없습니다.",
        "likes": 6
      },
      {
        "id": "rev-prod-11-19",
        "author": "박*훈",
        "rating": 5,
        "date": "2026-08-06",
        "content": "도자기 퀄리티가 높아서 오래오래 소중하게 쓰고 싶은 나만의 애착 컵입니다.",
        "likes": 5
      },
      {
        "id": "rev-prod-11-20",
        "author": "최*서",
        "rating": 5,
        "date": "2026-08-03",
        "content": "이지샵 리빙 소품은 항상 기대 이상의 감동을 주네요. 200% 만족합니다!",
        "likes": 3
      }
    ],
    "qnas": []
  },
  {
    "id": "prod-12",
    "name": "유기농 프리미엄 마누카 꿀 UMF 15+ MGO 514",
    "category": "푸드 / 키친",
    "categoryId": "cat-food",
    "price": 88000,
    "originalPrice": 125000,
    "discountRate": 29,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 45,
    "isBest": true,
    "isNew": false,
    "isSale": true,
    "isFreeShipping": true,
    "thumbnail": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "뉴질랜드 100% 정품 인증, 풍부한 항산화와 면역력을 챙기는 프리미엄 천연 꿀",
    "description": "<h3>자연이 준 가장 순수한 선물</h3><p>뉴질랜드 청정 자연에서 채밀된 100% 생마누카 꿀입니다. UMF 협회 공식 인증을 받은 고등급 제품으로 매일 아침 공복 한 스푼으로 활력을 채워보세요.</p>",
    "options": [
      {
        "name": "마누카 UMF 15+ (250g)",
        "stock": 25
      },
      {
        "name": "마누카 UMF 15+ (500g)",
        "stock": 20
      }
    ],
    "specs": {
      "용량": "250g / 500g",
      "원산지": "뉴질랜드 100% 직수입",
      "보관": "직사광선을 피해 실온 보관"
    },
    "reviews": [
      {
        "id": "rev-prod-12-1",
        "author": "정*은",
        "rating": 4,
        "date": "2026-09-28",
        "content": "뉴질랜드 100% 직수입 정품이라 믿음이 가고, 매일 아침 공복 한 스푼으로 활력을 채웁니다.",
        "likes": 34
      },
      {
        "id": "rev-prod-12-2",
        "author": "강*윤",
        "rating": 5,
        "date": "2026-09-25",
        "content": "UMF 15+ MGO 514 고등급답게 제형이 묵직하고 꾸덕꾸덕하며 풍미가 깊습니다.",
        "likes": 32
      },
      {
        "id": "rev-prod-12-3",
        "author": "조*민",
        "rating": 5,
        "date": "2026-09-22",
        "content": "환절기마다 목이 칼칼하고 감기 기운이 있었는데 마누카 꿀 먹고 면역력이 확실히 좋아졌어요.",
        "likes": 31
      },
      {
        "id": "rev-prod-12-4",
        "author": "윤*지",
        "rating": 5,
        "date": "2026-09-19",
        "content": "위 건강이 안 좋아서 속 쓰림이 잦았는데 공복에 꾸준히 먹으니 속이 정말 편안해졌습니다.",
        "likes": 29
      },
      {
        "id": "rev-prod-12-5",
        "author": "장*정",
        "rating": 5,
        "date": "2026-09-16",
        "content": "일반 꿀과는 차원이 다른 허브향과 카라멜 같은 진하고 고급스러운 단맛이 일품이에요.",
        "likes": 28
      },
      {
        "id": "rev-prod-12-6",
        "author": "임*영",
        "rating": 5,
        "date": "2026-09-13",
        "content": "부모님 건강 선물로 500g 주문해 드렸는데 피로 회복에 너무 좋다고 극찬하셨습니다.",
        "likes": 26
      },
      {
        "id": "rev-prod-12-7",
        "author": "한*원",
        "rating": 5,
        "date": "2026-09-10",
        "content": "포장도 정품 인증 씰과 에어캡으로 완벽하게 밀봉되어 안전하게 배송되었습니다.",
        "likes": 25
      },
      {
        "id": "rev-prod-12-8",
        "author": "오*린",
        "rating": 4,
        "date": "2026-09-07",
        "content": "따뜻한 미온수에 타서 마시거나 요거트에 그래놀라와 함께 곁들여 먹으면 꿀맛입니다.",
        "likes": 23
      },
      {
        "id": "rev-prod-12-9",
        "author": "서*준",
        "rating": 5,
        "date": "2026-09-04",
        "content": "목을 많이 쓰는 강사 직업인데 목 관리용 비상 상비약처럼 챙겨 먹고 있습니다.",
        "likes": 22
      },
      {
        "id": "rev-prod-12-10",
        "author": "신*경",
        "rating": 5,
        "date": "2026-09-01",
        "content": "항산화 성분이 풍부해서인지 아침에 일어날 때 피로감이 훨씬 덜하고 개운해요.",
        "likes": 20
      },
      {
        "id": "rev-prod-12-11",
        "author": "권*수",
        "rating": 5,
        "date": "2026-08-29",
        "content": "자연 100% 생꿀이라 열을 가하지 않고 나무 숟가락으로 그대로 떠먹는 걸 추천합니다.",
        "likes": 19
      },
      {
        "id": "rev-prod-12-12",
        "author": "황*우",
        "rating": 5,
        "date": "2026-08-26",
        "content": "시중 백화점 마누카 꿀보다 가격도 합리적이고 품질은 최상급이라 대만족입니다.",
        "likes": 17
      },
      {
        "id": "rev-prod-12-13",
        "author": "안*희",
        "rating": 5,
        "date": "2026-08-23",
        "content": "아이들도 거부감 없이 맛있게 잘 먹어서 온 가족 면역력 지킴이로 자리 잡았습니다.",
        "likes": 16
      },
      {
        "id": "rev-prod-12-14",
        "author": "송*진",
        "rating": 5,
        "date": "2026-08-20",
        "content": "입안에 혓바늘 돋았을 때 한 스푼 머금고 잤더니 다음날 싹 가라앉아서 신기했어요.",
        "likes": 14
      },
      {
        "id": "rev-prod-12-15",
        "author": "전*아",
        "rating": 4,
        "date": "2026-08-17",
        "content": "유통기한도 넉넉하고 정품 UMF 라이선스 번호가 라벨에 표기되어 있어 안심입니다.",
        "likes": 13
      },
      {
        "id": "rev-prod-12-16",
        "author": "홍*태",
        "rating": 5,
        "date": "2026-08-14",
        "content": "하루 한 스푼의 건강한 루틴으로 삶의 활력을 되찾았습니다.",
        "likes": 11
      },
      {
        "id": "rev-prod-12-17",
        "author": "유*현",
        "rating": 5,
        "date": "2026-08-11",
        "content": "스푼으로 떴을 때 쫀쫀하게 흘러내리는 텍스처에서 천연 생꿀의 진가가 느껴집니다.",
        "likes": 10
      },
      {
        "id": "rev-prod-12-18",
        "author": "고*호",
        "rating": 5,
        "date": "2026-08-08",
        "content": "선물용으로 고급 쇼핑백에 담아 전달하기에도 품격이 느껴지는 프리미엄 제품입니다.",
        "likes": 8
      },
      {
        "id": "rev-prod-12-19",
        "author": "문*훈",
        "rating": 5,
        "date": "2026-08-05",
        "content": "다 먹으면 무조건 재구매할 건강 필수템입니다. 주변에도 강력 추천하고 있어요.",
        "likes": 7
      },
      {
        "id": "rev-prod-12-20",
        "author": "양*서",
        "rating": 5,
        "date": "2026-08-02",
        "content": "진짜 프리미엄 마누카 꿀을 찾으신다면 망설임 없이 이 제품을 선택하세요!",
        "likes": 5
      }
    ],
    "qnas": []
  }
]
'@

[System.IO.File]::WriteAllText((Join-Path $dataDir 'products.json'), $productsJson, [System.Text.Encoding]::UTF8)
Write-Host "Generated: products.json" -ForegroundColor Green

# 3. Orders
$ordersJson = @'
[
  {
    "orderId": "ORD-20260907-8812",
    "orderDate": "2026-09-07 09:30:15",
    "customerName": "김민준",
    "customerPhone": "010-3849-1290",
    "customerEmail": "minjun.kim@example.com",
    "shippingAddress": "서울특별시 강남구 테헤란로 152 강남파이낸스센터 18층",
    "shippingNote": "부재 시 문 앞에 놓아주세요.",
    "paymentMethod": "신용카드 (현대카드)",
    "totalAmount": 289000,
    "shippingFee": 0,
    "discountAmount": 10000,
    "status": "배송중",
    "trackingNumber": "CJ68291039841",
    "items": [
      {
        "productId": "prod-01",
        "name": "프리미엄 캐시미어 블렌드 오버핏 코트",
        "option": "오트밀 베이지 / L(105)",
        "quantity": 1,
        "price": 289000,
        "thumbnail": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    "orderId": "ORD-20260906-5521",
    "orderDate": "2026-09-06 18:42:10",
    "customerName": "이지은",
    "customerPhone": "010-9921-7734",
    "customerEmail": "jieun.lee@example.com",
    "shippingAddress": "경기도 성남시 분당구 판교역로 235 에이치스퀘어 N동 5층",
    "shippingNote": "배송 전 연락 부탁드립니다.",
    "paymentMethod": "카카오페이",
    "totalAmount": 244000,
    "shippingFee": 0,
    "discountAmount": 0,
    "status": "상품준비",
    "trackingNumber": "",
    "items": [
      {
        "productId": "prod-02",
        "name": "에어사운드 노이즈캔슬링 무선 헤드폰 프로",
        "option": "스페이스 그레이",
        "quantity": 1,
        "price": 198000,
        "thumbnail": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
      },
      {
        "productId": "prod-03",
        "name": "글로우 리바이탈라이징 나이트 앰플 세럼 50ml",
        "option": "단품 50ml",
        "quantity": 1,
        "price": 46000,
        "thumbnail": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    "orderId": "ORD-20260906-3109",
    "orderDate": "2026-09-06 14:15:30",
    "customerName": "박서준",
    "customerPhone": "010-4412-8876",
    "customerEmail": "seojun.park@example.com",
    "shippingAddress": "부산광역시 해운대구 센텀중앙로 90 큐비이센텀 1201호",
    "shippingNote": "경비실에 맡겨주세요.",
    "paymentMethod": "토스페이",
    "totalAmount": 129000,
    "shippingFee": 0,
    "discountAmount": 5000,
    "status": "결제완료",
    "trackingNumber": "",
    "items": [
      {
        "productId": "prod-08",
        "name": "울트라 슬림 기계식 무선 블루투스 키보드",
        "option": "저소음 갈축 (부드러운 구분감)",
        "quantity": 1,
        "price": 129000,
        "thumbnail": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    "orderId": "ORD-20260905-1940",
    "orderDate": "2026-09-05 11:05:44",
    "customerName": "정수아",
    "customerPhone": "010-7731-0029",
    "customerEmail": "suah.jung@example.com",
    "shippingAddress": "인천광역시 연수구 송도과학로 32 테크노파크 IT센터 20층",
    "shippingNote": "직접 수령하겠습니다.",
    "paymentMethod": "네이버페이",
    "totalAmount": 52000,
    "shippingFee": 0,
    "discountAmount": 0,
    "status": "배송완료",
    "trackingNumber": "CJ99481726354",
    "items": [
      {
        "productId": "prod-09",
        "name": "시그니처 우디 아로마 디퓨저 & 캔들 세트",
        "option": "포레스트 레스트 (시더우드 & 앰버)",
        "quantity": 1,
        "price": 52000,
        "thumbnail": "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80"
      }
    ]
  }
]
'@

[System.IO.File]::WriteAllText((Join-Path $dataDir 'orders.json'), $ordersJson, [System.Text.Encoding]::UTF8)
Write-Host "Generated: orders.json" -ForegroundColor Green

# 4. Inquiries
$inquiriesJson = @'
[
  {
    "id": "inq-01",
    "type": "상품문의",
    "productName": "프리미엄 캐시미어 블렌드 오버핏 코트",
    "author": "김*아",
    "phone": "010-9876-5432",
    "title": "여성 55 사이즈가 입기에 M사이즈가 많이 클까요?",
    "content": "루즈하게 입는 걸 좋아하는데 M사이즈 총장과 어깨너비가 어느 정도인지 궁금합니다.",
    "status": "답변완료",
    "createdAt": "2026-09-06 16:20",
    "answer": "고객님 안녕하세요! M사이즈는 총장 112cm, 어깨단면 51cm로 여성 고객님께서 착용 시 자연스럽고 트렌디한 롱 오버핏으로 연출 가능합니다. 상세페이지 하단 실측표를 참고 부탁드립니다.",
    "answeredAt": "2026-09-06 17:05"
  },
  {
    "id": "inq-02",
    "type": "배송문의",
    "productName": "에어사운드 노이즈캔슬링 무선 헤드폰 프로",
    "author": "이*원",
    "phone": "010-1234-5678",
    "title": "오늘 주문하면 내일 바로 받아볼 수 있나요?",
    "content": "생일 선물로 주려고 하는데 당일 발송 가능한지 문의드립니다.",
    "status": "답변완료",
    "createdAt": "2026-09-07 09:10",
    "answer": "안녕하세요 고객님! 오후 2시 이전 결제 완료 건은 당일 출고되며, 서울/수도권 기준 익일 수령 가능하십니다. 감사합니다.",
    "answeredAt": "2026-09-07 09:25"
  },
  {
    "id": "inq-03",
    "type": "교환/반품",
    "productName": "울트라 슬림 기계식 무선 블루투스 키보드",
    "author": "최*민",
    "phone": "010-5555-8888",
    "title": "갈축으로 주문했는데 적축으로 교환 가능한가요?",
    "content": "미개봉 상태입니다. 색상 교환 절차 안내 부탁드립니다.",
    "status": "답변대기",
    "createdAt": "2026-09-07 10:15",
    "answer": "",
    "answeredAt": ""
  }
]
'@

[System.IO.File]::WriteAllText((Join-Path $dataDir 'inquiries.json'), $inquiriesJson, [System.Text.Encoding]::UTF8)
Write-Host "Generated: inquiries.json" -ForegroundColor Green

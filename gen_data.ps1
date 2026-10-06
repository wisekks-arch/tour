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
    "stock": 30,
    "isBest": true,
    "isNew": true,
    "isSale": true,
    "isFreeShipping": true,
    "thumbnail": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "최고급 몽골리안 캐시미어 30% 혼방, 우아한 실루엣과 극강의 보온성",
    "description": "<h3>타임리스 클래식의 정수, 프리미엄 캐시미어 코트</h3><p>엄선된 몽골산 천연 캐시미어와 호주산 메리노 울을 황금비율로 블렌딩하여 가벼우면서도 탁월한 보온성을 선사합니다. 체형을 자연스럽게 커버하는 세미 오버핏 실루엣과 고급 소뿔 단추 마감으로 격식 있는 자리부터 데일리 룩까지 완벽하게 소화합니다.</p>",
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
      "소재": "캐시미어 30%, 울 70%",
      "품질보증": "1년 무상수선"
    },
    "reviews": [
      {
        "id": "rev-prod-01-1",
        "author": "이*은",
        "rating": 4,
        "date": "2026-09-29",
        "content": "프리미엄 캐시미어 블렌드 오버핏 코트 실물이 훨씬 예쁘고 원단이 정말 탄탄합니다.",
        "likes": 34
      },
      {
        "id": "rev-prod-01-2",
        "author": "박*윤",
        "rating": 5,
        "date": "2026-09-26",
        "content": "핏이 자연스럽게 떨어져서 체형 커버도 잘 되고 날씬해 보여요.",
        "likes": 32
      },
      {
        "id": "rev-prod-01-3",
        "author": "최*민",
        "rating": 5,
        "date": "2026-09-23",
        "content": "마감 바느질이나 단추 퀄리티가 백화점 고가 브랜드 못지않네요.",
        "likes": 30
      },
      {
        "id": "rev-prod-01-4",
        "author": "정*지",
        "rating": 5,
        "date": "2026-09-20",
        "content": "배송도 하루 만에 칼배송으로 왔고 포장도 정성스럽습니다.",
        "likes": 29
      },
      {
        "id": "rev-prod-01-5",
        "author": "강*정",
        "rating": 5,
        "date": "2026-09-17",
        "content": "색감이 너무 튀지 않고 은은하게 고급스러워서 데일리룩으로 딱입니다.",
        "likes": 27
      },
      {
        "id": "rev-prod-01-6",
        "author": "조*영",
        "rating": 5,
        "date": "2026-09-14",
        "content": "착용감이 편해서 하루 종일 입고 있어도 피로감이 전혀 없어요.",
        "likes": 26
      },
      {
        "id": "rev-prod-01-7",
        "author": "윤*원",
        "rating": 4,
        "date": "2026-09-11",
        "content": "친구들이 다 어디서 샀냐고 물어봐서 이지샵 추천해 줬습니다.",
        "likes": 24
      },
      {
        "id": "rev-prod-01-8",
        "author": "장*린",
        "rating": 5,
        "date": "2026-09-08",
        "content": "세탁 후에도 변형이나 줄어듦 없이 형태가 잘 유지되네요.",
        "likes": 22
      },
      {
        "id": "rev-prod-01-9",
        "author": "임*준",
        "rating": 5,
        "date": "2026-09-05",
        "content": "사이즈 가이드대로 주문했더니 맞춤옷처럼 딱 맞습니다.",
        "likes": 21
      },
      {
        "id": "rev-prod-01-10",
        "author": "한*경",
        "rating": 5,
        "date": "2026-09-02",
        "content": "가성비, 디자인, 품질 모두 만족스러운 최고의 쇼핑이었습니다.",
        "likes": 19
      },
      {
        "id": "rev-prod-01-11",
        "author": "오*수",
        "rating": 5,
        "date": "2026-08-30",
        "content": "원단 촉감이 부드러워서 피부 자극 없이 편안합니다.",
        "likes": 18
      },
      {
        "id": "rev-prod-01-12",
        "author": "서*우",
        "rating": 5,
        "date": "2026-08-27",
        "content": "계절 상관없이 활용도가 높아서 손이 자주 가는 아이템이에요.",
        "likes": 16
      },
      {
        "id": "rev-prod-01-13",
        "author": "신*희",
        "rating": 4,
        "date": "2026-08-24",
        "content": "디테일 하나하나 신경 쓴 게 느껴지는 완성도 높은 옷입니다.",
        "likes": 14
      },
      {
        "id": "rev-prod-01-14",
        "author": "권*진",
        "rating": 5,
        "date": "2026-08-21",
        "content": "단정한 출근룩부터 주말 캐주얼룩까지 전천후로 소화 가능해요.",
        "likes": 13
      },
      {
        "id": "rev-prod-01-15",
        "author": "황*아",
        "rating": 5,
        "date": "2026-08-18",
        "content": "다른 색상도 추가로 구매해서 쟁여둘 생각입니다.",
        "likes": 11
      },
      {
        "id": "rev-prod-01-16",
        "author": "안*태",
        "rating": 5,
        "date": "2026-08-15",
        "content": "가성비가 정말 훌륭합니다. 이 가격에 이 퀄리티라니 놀랍네요.",
        "likes": 10
      },
      {
        "id": "rev-prod-01-17",
        "author": "송*현",
        "rating": 5,
        "date": "2026-08-12",
        "content": "포장 박스를 열자마자 만족감이 100% 차올랐습니다.",
        "likes": 8
      },
      {
        "id": "rev-prod-01-18",
        "author": "전*호",
        "rating": 5,
        "date": "2026-08-09",
        "content": "기장감과 품이 여유 있어서 활동하기가 아주 수월합니다.",
        "likes": 6
      },
      {
        "id": "rev-prod-01-19",
        "author": "홍*훈",
        "rating": 4,
        "date": "2026-08-06",
        "content": "선물용으로 샀는데 받는 분이 너무 좋아하셨습니다.",
        "likes": 5
      },
      {
        "id": "rev-prod-01-20",
        "author": "유*서",
        "rating": 5,
        "date": "2026-08-03",
        "content": "올해 구매한 패션 아이템 중 가장 마음에 듭니다. 적극 추천해요!",
        "likes": 3
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-01-1",
        "author": "조*훈",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-02",
    "name": "프렌치 린넨 100% 루즈핏 스트라이프 셔츠",
    "category": "패션 / 의류",
    "categoryId": "cat-fashion",
    "price": 79000,
    "originalPrice": 119000,
    "discountRate": 33,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 37,
    "isBest": false,
    "isNew": true,
    "isSale": true,
    "isFreeShipping": true,
    "thumbnail": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "프랑스 노르망디산 프리미엄 린넨, 자연스러운 구김과 쾌적한 쿨링 터치",
    "description": "<h3>자연을 닮은 편안함, 내추럴 프렌치 린넨</h3><p>피부에 닿는 순간 시원한 청량감을 주는 100% 최고급 프렌치 린넨으로 제작되었습니다. 여유 있는 오버핏 패턴으로 단독 착용은 물론 아우터 셔츠로도 훌륭합니다.</p>",
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
      }
    ],
    "specs": {
      "소재": "프렌치 린넨 100%",
      "원산지": "대한민국",
      "세탁": "찬물 단독 울코스"
    },
    "reviews": [
      {
        "id": "rev-prod-02-1",
        "author": "고*은",
        "rating": 4,
        "date": "2026-09-28",
        "content": "프렌치 린넨 100% 루즈핏 스트라이프 셔츠 실물이 훨씬 예쁘고 원단이 정말 탄탄합니다.",
        "likes": 36
      },
      {
        "id": "rev-prod-02-2",
        "author": "문*윤",
        "rating": 5,
        "date": "2026-09-25",
        "content": "핏이 자연스럽게 떨어져서 체형 커버도 잘 되고 날씬해 보여요.",
        "likes": 34
      },
      {
        "id": "rev-prod-02-3",
        "author": "양*민",
        "rating": 5,
        "date": "2026-09-22",
        "content": "마감 바느질이나 단추 퀄리티가 백화점 고가 브랜드 못지않네요.",
        "likes": 32
      },
      {
        "id": "rev-prod-02-4",
        "author": "손*지",
        "rating": 5,
        "date": "2026-09-19",
        "content": "배송도 하루 만에 칼배송으로 왔고 포장도 정성스럽습니다.",
        "likes": 31
      },
      {
        "id": "rev-prod-02-5",
        "author": "배*정",
        "rating": 5,
        "date": "2026-09-16",
        "content": "색감이 너무 튀지 않고 은은하게 고급스러워서 데일리룩으로 딱입니다.",
        "likes": 29
      },
      {
        "id": "rev-prod-02-6",
        "author": "백*영",
        "rating": 5,
        "date": "2026-09-13",
        "content": "착용감이 편해서 하루 종일 입고 있어도 피로감이 전혀 없어요.",
        "likes": 28
      },
      {
        "id": "rev-prod-02-7",
        "author": "허*원",
        "rating": 4,
        "date": "2026-09-10",
        "content": "친구들이 다 어디서 샀냐고 물어봐서 이지샵 추천해 줬습니다.",
        "likes": 26
      },
      {
        "id": "rev-prod-02-8",
        "author": "노*린",
        "rating": 5,
        "date": "2026-09-07",
        "content": "세탁 후에도 변형이나 줄어듦 없이 형태가 잘 유지되네요.",
        "likes": 24
      },
      {
        "id": "rev-prod-02-9",
        "author": "남*준",
        "rating": 5,
        "date": "2026-09-04",
        "content": "사이즈 가이드대로 주문했더니 맞춤옷처럼 딱 맞습니다.",
        "likes": 23
      },
      {
        "id": "rev-prod-02-10",
        "author": "심*경",
        "rating": 5,
        "date": "2026-09-01",
        "content": "가성비, 디자인, 품질 모두 만족스러운 최고의 쇼핑이었습니다.",
        "likes": 21
      },
      {
        "id": "rev-prod-02-11",
        "author": "김*수",
        "rating": 5,
        "date": "2026-08-29",
        "content": "원단 촉감이 부드러워서 피부 자극 없이 편안합니다.",
        "likes": 20
      },
      {
        "id": "rev-prod-02-12",
        "author": "이*우",
        "rating": 5,
        "date": "2026-08-26",
        "content": "계절 상관없이 활용도가 높아서 손이 자주 가는 아이템이에요.",
        "likes": 18
      },
      {
        "id": "rev-prod-02-13",
        "author": "박*희",
        "rating": 4,
        "date": "2026-08-23",
        "content": "디테일 하나하나 신경 쓴 게 느껴지는 완성도 높은 옷입니다.",
        "likes": 16
      },
      {
        "id": "rev-prod-02-14",
        "author": "최*진",
        "rating": 5,
        "date": "2026-08-20",
        "content": "단정한 출근룩부터 주말 캐주얼룩까지 전천후로 소화 가능해요.",
        "likes": 15
      },
      {
        "id": "rev-prod-02-15",
        "author": "정*아",
        "rating": 5,
        "date": "2026-08-17",
        "content": "다른 색상도 추가로 구매해서 쟁여둘 생각입니다.",
        "likes": 13
      },
      {
        "id": "rev-prod-02-16",
        "author": "강*태",
        "rating": 5,
        "date": "2026-08-14",
        "content": "가성비가 정말 훌륭합니다. 이 가격에 이 퀄리티라니 놀랍네요.",
        "likes": 12
      },
      {
        "id": "rev-prod-02-17",
        "author": "조*현",
        "rating": 5,
        "date": "2026-08-11",
        "content": "포장 박스를 열자마자 만족감이 100% 차올랐습니다.",
        "likes": 10
      },
      {
        "id": "rev-prod-02-18",
        "author": "윤*호",
        "rating": 5,
        "date": "2026-08-08",
        "content": "기장감과 품이 여유 있어서 활동하기가 아주 수월합니다.",
        "likes": 8
      },
      {
        "id": "rev-prod-02-19",
        "author": "장*훈",
        "rating": 4,
        "date": "2026-08-05",
        "content": "선물용으로 샀는데 받는 분이 너무 좋아하셨습니다.",
        "likes": 7
      },
      {
        "id": "rev-prod-02-20",
        "author": "임*서",
        "rating": 5,
        "date": "2026-08-02",
        "content": "올해 구매한 패션 아이템 중 가장 마음에 듭니다. 적극 추천해요!",
        "likes": 5
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-02-1",
        "author": "윤*서",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-03",
    "name": "엑스트라 파인 메리노울 터틀넥 니트",
    "category": "패션 / 의류",
    "categoryId": "cat-fashion",
    "price": 89000,
    "originalPrice": 129000,
    "discountRate": 31,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 44,
    "isBest": true,
    "isNew": false,
    "isSale": true,
    "isFreeShipping": true,
    "thumbnail": "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "19.5 마이크론 초극세 메리노울 100%, 맨살에도 부드러운 하이엔드 니트웨어",
    "description": "<h3>포근하고 부드러운 궁극의 터틀넥</h3><p>따가움 없는 최고급 엑스트라 파인 메리노울을 촘촘한 14게이지로 편직하여 단정하고 우아한 실루엣을 자랑합니다.</p>",
    "options": [
      {
        "name": "아이보리 / Free",
        "stock": 25
      },
      {
        "name": "차콜 그레이 / Free",
        "stock": 20
      },
      {
        "name": "모카 브라운 / Free",
        "stock": 15
      }
    ],
    "specs": {
      "소재": "메리노울 100%",
      "제조국": "대한민국"
    },
    "reviews": [
      {
        "id": "rev-prod-03-1",
        "author": "한*은",
        "rating": 4,
        "date": "2026-09-27",
        "content": "엑스트라 파인 메리노울 터틀넥 니트 실물이 훨씬 예쁘고 원단이 정말 탄탄합니다.",
        "likes": 38
      },
      {
        "id": "rev-prod-03-2",
        "author": "오*윤",
        "rating": 5,
        "date": "2026-09-24",
        "content": "핏이 자연스럽게 떨어져서 체형 커버도 잘 되고 날씬해 보여요.",
        "likes": 36
      },
      {
        "id": "rev-prod-03-3",
        "author": "서*민",
        "rating": 5,
        "date": "2026-09-21",
        "content": "마감 바느질이나 단추 퀄리티가 백화점 고가 브랜드 못지않네요.",
        "likes": 34
      },
      {
        "id": "rev-prod-03-4",
        "author": "신*지",
        "rating": 5,
        "date": "2026-09-18",
        "content": "배송도 하루 만에 칼배송으로 왔고 포장도 정성스럽습니다.",
        "likes": 33
      },
      {
        "id": "rev-prod-03-5",
        "author": "권*정",
        "rating": 5,
        "date": "2026-09-15",
        "content": "색감이 너무 튀지 않고 은은하게 고급스러워서 데일리룩으로 딱입니다.",
        "likes": 31
      },
      {
        "id": "rev-prod-03-6",
        "author": "황*영",
        "rating": 5,
        "date": "2026-09-12",
        "content": "착용감이 편해서 하루 종일 입고 있어도 피로감이 전혀 없어요.",
        "likes": 30
      },
      {
        "id": "rev-prod-03-7",
        "author": "안*원",
        "rating": 4,
        "date": "2026-09-09",
        "content": "친구들이 다 어디서 샀냐고 물어봐서 이지샵 추천해 줬습니다.",
        "likes": 28
      },
      {
        "id": "rev-prod-03-8",
        "author": "송*린",
        "rating": 5,
        "date": "2026-09-06",
        "content": "세탁 후에도 변형이나 줄어듦 없이 형태가 잘 유지되네요.",
        "likes": 26
      },
      {
        "id": "rev-prod-03-9",
        "author": "전*준",
        "rating": 5,
        "date": "2026-09-03",
        "content": "사이즈 가이드대로 주문했더니 맞춤옷처럼 딱 맞습니다.",
        "likes": 25
      },
      {
        "id": "rev-prod-03-10",
        "author": "홍*경",
        "rating": 5,
        "date": "2026-08-31",
        "content": "가성비, 디자인, 품질 모두 만족스러운 최고의 쇼핑이었습니다.",
        "likes": 23
      },
      {
        "id": "rev-prod-03-11",
        "author": "유*수",
        "rating": 5,
        "date": "2026-08-28",
        "content": "원단 촉감이 부드러워서 피부 자극 없이 편안합니다.",
        "likes": 22
      },
      {
        "id": "rev-prod-03-12",
        "author": "고*우",
        "rating": 5,
        "date": "2026-08-25",
        "content": "계절 상관없이 활용도가 높아서 손이 자주 가는 아이템이에요.",
        "likes": 20
      },
      {
        "id": "rev-prod-03-13",
        "author": "문*희",
        "rating": 4,
        "date": "2026-08-22",
        "content": "디테일 하나하나 신경 쓴 게 느껴지는 완성도 높은 옷입니다.",
        "likes": 18
      },
      {
        "id": "rev-prod-03-14",
        "author": "양*진",
        "rating": 5,
        "date": "2026-08-19",
        "content": "단정한 출근룩부터 주말 캐주얼룩까지 전천후로 소화 가능해요.",
        "likes": 17
      },
      {
        "id": "rev-prod-03-15",
        "author": "손*아",
        "rating": 5,
        "date": "2026-08-16",
        "content": "다른 색상도 추가로 구매해서 쟁여둘 생각입니다.",
        "likes": 15
      },
      {
        "id": "rev-prod-03-16",
        "author": "배*태",
        "rating": 5,
        "date": "2026-08-13",
        "content": "가성비가 정말 훌륭합니다. 이 가격에 이 퀄리티라니 놀랍네요.",
        "likes": 14
      },
      {
        "id": "rev-prod-03-17",
        "author": "백*현",
        "rating": 5,
        "date": "2026-08-10",
        "content": "포장 박스를 열자마자 만족감이 100% 차올랐습니다.",
        "likes": 12
      },
      {
        "id": "rev-prod-03-18",
        "author": "허*호",
        "rating": 5,
        "date": "2026-08-07",
        "content": "기장감과 품이 여유 있어서 활동하기가 아주 수월합니다.",
        "likes": 10
      },
      {
        "id": "rev-prod-03-19",
        "author": "노*훈",
        "rating": 4,
        "date": "2026-08-04",
        "content": "선물용으로 샀는데 받는 분이 너무 좋아하셨습니다.",
        "likes": 9
      },
      {
        "id": "rev-prod-03-20",
        "author": "남*서",
        "rating": 5,
        "date": "2026-08-01",
        "content": "올해 구매한 패션 아이템 중 가장 마음에 듭니다. 적극 추천해요!",
        "likes": 7
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-03-1",
        "author": "장*은",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-04",
    "name": "컴포트 올데이 4방향 스트레치 테이퍼드 슬랙스",
    "category": "패션 / 의류",
    "categoryId": "cat-fashion",
    "price": 64000,
    "originalPrice": 89000,
    "discountRate": 28,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 51,
    "isBest": true,
    "isNew": true,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "비밀 밴딩 허리와 4Way 고탄성 복원력, 하루 종일 편안한 비즈니스 캐주얼 슬랙스",
    "description": "<h3>하루 12시간 앉아있어도 구김 없는 완벽한 바지</h3><p>사이드 히든 밴딩으로 식사 후에도 압박 없이 편안하며, 슬림한 테이퍼드 핏으로 다리가 길어 보입니다.</p>",
    "options": [
      {
        "name": "블랙 / M(30-31)",
        "stock": 30
      },
      {
        "name": "블랙 / L(32-33)",
        "stock": 25
      },
      {
        "name": "다크네이비 / M(30-31)",
        "stock": 20
      }
    ],
    "specs": {
      "소재": "폴리에스터 68%, 레이온 28%, 스판 4%",
      "원산지": "대한민국"
    },
    "reviews": [
      {
        "id": "rev-prod-04-1",
        "author": "심*은",
        "rating": 4,
        "date": "2026-09-26",
        "content": "컴포트 올데이 4방향 스트레치 테이퍼드 슬랙스 실물이 훨씬 예쁘고 원단이 정말 탄탄합니다.",
        "likes": 40
      },
      {
        "id": "rev-prod-04-2",
        "author": "김*윤",
        "rating": 5,
        "date": "2026-09-23",
        "content": "핏이 자연스럽게 떨어져서 체형 커버도 잘 되고 날씬해 보여요.",
        "likes": 38
      },
      {
        "id": "rev-prod-04-3",
        "author": "이*민",
        "rating": 5,
        "date": "2026-09-20",
        "content": "마감 바느질이나 단추 퀄리티가 백화점 고가 브랜드 못지않네요.",
        "likes": 36
      },
      {
        "id": "rev-prod-04-4",
        "author": "박*지",
        "rating": 5,
        "date": "2026-09-17",
        "content": "배송도 하루 만에 칼배송으로 왔고 포장도 정성스럽습니다.",
        "likes": 35
      },
      {
        "id": "rev-prod-04-5",
        "author": "최*정",
        "rating": 5,
        "date": "2026-09-14",
        "content": "색감이 너무 튀지 않고 은은하게 고급스러워서 데일리룩으로 딱입니다.",
        "likes": 33
      },
      {
        "id": "rev-prod-04-6",
        "author": "정*영",
        "rating": 5,
        "date": "2026-09-11",
        "content": "착용감이 편해서 하루 종일 입고 있어도 피로감이 전혀 없어요.",
        "likes": 32
      },
      {
        "id": "rev-prod-04-7",
        "author": "강*원",
        "rating": 4,
        "date": "2026-09-08",
        "content": "친구들이 다 어디서 샀냐고 물어봐서 이지샵 추천해 줬습니다.",
        "likes": 30
      },
      {
        "id": "rev-prod-04-8",
        "author": "조*린",
        "rating": 5,
        "date": "2026-09-05",
        "content": "세탁 후에도 변형이나 줄어듦 없이 형태가 잘 유지되네요.",
        "likes": 28
      },
      {
        "id": "rev-prod-04-9",
        "author": "윤*준",
        "rating": 5,
        "date": "2026-09-02",
        "content": "사이즈 가이드대로 주문했더니 맞춤옷처럼 딱 맞습니다.",
        "likes": 27
      },
      {
        "id": "rev-prod-04-10",
        "author": "장*경",
        "rating": 5,
        "date": "2026-08-30",
        "content": "가성비, 디자인, 품질 모두 만족스러운 최고의 쇼핑이었습니다.",
        "likes": 25
      },
      {
        "id": "rev-prod-04-11",
        "author": "임*수",
        "rating": 5,
        "date": "2026-08-27",
        "content": "원단 촉감이 부드러워서 피부 자극 없이 편안합니다.",
        "likes": 24
      },
      {
        "id": "rev-prod-04-12",
        "author": "한*우",
        "rating": 5,
        "date": "2026-08-24",
        "content": "계절 상관없이 활용도가 높아서 손이 자주 가는 아이템이에요.",
        "likes": 22
      },
      {
        "id": "rev-prod-04-13",
        "author": "오*희",
        "rating": 4,
        "date": "2026-08-21",
        "content": "디테일 하나하나 신경 쓴 게 느껴지는 완성도 높은 옷입니다.",
        "likes": 20
      },
      {
        "id": "rev-prod-04-14",
        "author": "서*진",
        "rating": 5,
        "date": "2026-08-18",
        "content": "단정한 출근룩부터 주말 캐주얼룩까지 전천후로 소화 가능해요.",
        "likes": 19
      },
      {
        "id": "rev-prod-04-15",
        "author": "신*아",
        "rating": 5,
        "date": "2026-08-15",
        "content": "다른 색상도 추가로 구매해서 쟁여둘 생각입니다.",
        "likes": 17
      },
      {
        "id": "rev-prod-04-16",
        "author": "권*태",
        "rating": 5,
        "date": "2026-08-12",
        "content": "가성비가 정말 훌륭합니다. 이 가격에 이 퀄리티라니 놀랍네요.",
        "likes": 16
      },
      {
        "id": "rev-prod-04-17",
        "author": "황*현",
        "rating": 5,
        "date": "2026-08-09",
        "content": "포장 박스를 열자마자 만족감이 100% 차올랐습니다.",
        "likes": 14
      },
      {
        "id": "rev-prod-04-18",
        "author": "안*호",
        "rating": 5,
        "date": "2026-08-06",
        "content": "기장감과 품이 여유 있어서 활동하기가 아주 수월합니다.",
        "likes": 12
      },
      {
        "id": "rev-prod-04-19",
        "author": "송*훈",
        "rating": 4,
        "date": "2026-08-03",
        "content": "선물용으로 샀는데 받는 분이 너무 좋아하셨습니다.",
        "likes": 11
      },
      {
        "id": "rev-prod-04-20",
        "author": "전*서",
        "rating": 5,
        "date": "2026-07-31",
        "content": "올해 구매한 패션 아이템 중 가장 마음에 듭니다. 적극 추천해요!",
        "likes": 9
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-04-1",
        "author": "임*윤",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-05",
    "name": "헤비웨이트 950g 프렌치테리 오버핏 후드 집업",
    "category": "패션 / 의류",
    "categoryId": "cat-fashion",
    "price": 78000,
    "originalPrice": 98000,
    "discountRate": 20,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 58,
    "isBest": false,
    "isNew": true,
    "isSale": true,
    "isFreeShipping": true,
    "thumbnail": "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "밀도 높은 950g/yd 헤비 프렌치테리, 모자 각이 무너지지 않는 탄탄한 후드",
    "description": "<h3>탄탄한 원단감의 끝판왕 후드 집업</h3><p>YKK 2Way 투웨이 지퍼를 채택하여 다양한 실루엣 연출이 가능하며, 세탁 후 수축을 방지하는 텐타/덤블 워싱 가공을 거쳤습니다.</p>",
    "options": [
      {
        "name": "멜란지 그레이 / L",
        "stock": 25
      },
      {
        "name": "멜란지 그레이 / XL",
        "stock": 15
      },
      {
        "name": "딥 블랙 / L",
        "stock": 20
      }
    ],
    "specs": {
      "소재": "코튼 100% (950g 헤비테리)",
      "부자재": "YKK 2Way 지퍼"
    },
    "reviews": [
      {
        "id": "rev-prod-05-1",
        "author": "홍*은",
        "rating": 4,
        "date": "2026-09-25",
        "content": "헤비웨이트 950g 프렌치테리 오버핏 후드 집업 실물이 훨씬 예쁘고 원단이 정말 탄탄합니다.",
        "likes": 42
      },
      {
        "id": "rev-prod-05-2",
        "author": "유*윤",
        "rating": 5,
        "date": "2026-09-22",
        "content": "핏이 자연스럽게 떨어져서 체형 커버도 잘 되고 날씬해 보여요.",
        "likes": 40
      },
      {
        "id": "rev-prod-05-3",
        "author": "고*민",
        "rating": 5,
        "date": "2026-09-19",
        "content": "마감 바느질이나 단추 퀄리티가 백화점 고가 브랜드 못지않네요.",
        "likes": 38
      },
      {
        "id": "rev-prod-05-4",
        "author": "문*지",
        "rating": 5,
        "date": "2026-09-16",
        "content": "배송도 하루 만에 칼배송으로 왔고 포장도 정성스럽습니다.",
        "likes": 37
      },
      {
        "id": "rev-prod-05-5",
        "author": "양*정",
        "rating": 5,
        "date": "2026-09-13",
        "content": "색감이 너무 튀지 않고 은은하게 고급스러워서 데일리룩으로 딱입니다.",
        "likes": 35
      },
      {
        "id": "rev-prod-05-6",
        "author": "손*영",
        "rating": 5,
        "date": "2026-09-10",
        "content": "착용감이 편해서 하루 종일 입고 있어도 피로감이 전혀 없어요.",
        "likes": 34
      },
      {
        "id": "rev-prod-05-7",
        "author": "배*원",
        "rating": 4,
        "date": "2026-09-07",
        "content": "친구들이 다 어디서 샀냐고 물어봐서 이지샵 추천해 줬습니다.",
        "likes": 32
      },
      {
        "id": "rev-prod-05-8",
        "author": "백*린",
        "rating": 5,
        "date": "2026-09-04",
        "content": "세탁 후에도 변형이나 줄어듦 없이 형태가 잘 유지되네요.",
        "likes": 30
      },
      {
        "id": "rev-prod-05-9",
        "author": "허*준",
        "rating": 5,
        "date": "2026-09-01",
        "content": "사이즈 가이드대로 주문했더니 맞춤옷처럼 딱 맞습니다.",
        "likes": 29
      },
      {
        "id": "rev-prod-05-10",
        "author": "노*경",
        "rating": 5,
        "date": "2026-08-29",
        "content": "가성비, 디자인, 품질 모두 만족스러운 최고의 쇼핑이었습니다.",
        "likes": 27
      },
      {
        "id": "rev-prod-05-11",
        "author": "남*수",
        "rating": 5,
        "date": "2026-08-26",
        "content": "원단 촉감이 부드러워서 피부 자극 없이 편안합니다.",
        "likes": 26
      },
      {
        "id": "rev-prod-05-12",
        "author": "심*우",
        "rating": 5,
        "date": "2026-08-23",
        "content": "계절 상관없이 활용도가 높아서 손이 자주 가는 아이템이에요.",
        "likes": 24
      },
      {
        "id": "rev-prod-05-13",
        "author": "김*희",
        "rating": 4,
        "date": "2026-08-20",
        "content": "디테일 하나하나 신경 쓴 게 느껴지는 완성도 높은 옷입니다.",
        "likes": 22
      },
      {
        "id": "rev-prod-05-14",
        "author": "이*진",
        "rating": 5,
        "date": "2026-08-17",
        "content": "단정한 출근룩부터 주말 캐주얼룩까지 전천후로 소화 가능해요.",
        "likes": 21
      },
      {
        "id": "rev-prod-05-15",
        "author": "박*아",
        "rating": 5,
        "date": "2026-08-14",
        "content": "다른 색상도 추가로 구매해서 쟁여둘 생각입니다.",
        "likes": 19
      },
      {
        "id": "rev-prod-05-16",
        "author": "최*태",
        "rating": 5,
        "date": "2026-08-11",
        "content": "가성비가 정말 훌륭합니다. 이 가격에 이 퀄리티라니 놀랍네요.",
        "likes": 18
      },
      {
        "id": "rev-prod-05-17",
        "author": "정*현",
        "rating": 5,
        "date": "2026-08-08",
        "content": "포장 박스를 열자마자 만족감이 100% 차올랐습니다.",
        "likes": 16
      },
      {
        "id": "rev-prod-05-18",
        "author": "강*호",
        "rating": 5,
        "date": "2026-08-05",
        "content": "기장감과 품이 여유 있어서 활동하기가 아주 수월합니다.",
        "likes": 14
      },
      {
        "id": "rev-prod-05-19",
        "author": "조*훈",
        "rating": 4,
        "date": "2026-08-02",
        "content": "선물용으로 샀는데 받는 분이 너무 좋아하셨습니다.",
        "likes": 13
      },
      {
        "id": "rev-prod-05-20",
        "author": "윤*서",
        "rating": 5,
        "date": "2026-07-30",
        "content": "올해 구매한 패션 아이템 중 가장 마음에 듭니다. 적극 추천해요!",
        "likes": 11
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-05-1",
        "author": "한*민",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-06",
    "name": "테크니컬 방수 방풍 윈드브레이커 자켓",
    "category": "패션 / 의류",
    "categoryId": "cat-fashion",
    "price": 119000,
    "originalPrice": 159000,
    "discountRate": 25,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 65,
    "isBest": false,
    "isNew": true,
    "isSale": true,
    "isFreeShipping": true,
    "thumbnail": "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "3단 레이어 방수 투습 멤브레인, 일상과 아웃도어를 넘나드는 고기능성 쉘",
    "description": "<h3>갑작스러운 비바람에도 끄떡없는 고기능성 윈드쉘</h3><p>방수 10,000mm 투습 8,000g 스펙의 경량 하이테크 원단으로 트레킹부터 도심 라이딩까지 쾌적하게 착용할 수 있습니다.</p>",
    "options": [
      {
        "name": "포레스트 올리브 / L(100)",
        "stock": 18
      },
      {
        "name": "스텔스 블랙 / L(100)",
        "stock": 22
      },
      {
        "name": "스텔스 블랙 / XL(105)",
        "stock": 14
      }
    ],
    "specs": {
      "방수도": "10,000mm",
      "투습도": "8,000g/m²/24h",
      "원산지": "대한민국"
    },
    "reviews": [
      {
        "id": "rev-prod-06-1",
        "author": "장*은",
        "rating": 4,
        "date": "2026-09-24",
        "content": "테크니컬 방수 방풍 윈드브레이커 자켓 실물이 훨씬 예쁘고 원단이 정말 탄탄합니다.",
        "likes": 34
      },
      {
        "id": "rev-prod-06-2",
        "author": "임*윤",
        "rating": 5,
        "date": "2026-09-21",
        "content": "핏이 자연스럽게 떨어져서 체형 커버도 잘 되고 날씬해 보여요.",
        "likes": 32
      },
      {
        "id": "rev-prod-06-3",
        "author": "한*민",
        "rating": 5,
        "date": "2026-09-18",
        "content": "마감 바느질이나 단추 퀄리티가 백화점 고가 브랜드 못지않네요.",
        "likes": 30
      },
      {
        "id": "rev-prod-06-4",
        "author": "오*지",
        "rating": 5,
        "date": "2026-09-15",
        "content": "배송도 하루 만에 칼배송으로 왔고 포장도 정성스럽습니다.",
        "likes": 29
      },
      {
        "id": "rev-prod-06-5",
        "author": "서*정",
        "rating": 5,
        "date": "2026-09-12",
        "content": "색감이 너무 튀지 않고 은은하게 고급스러워서 데일리룩으로 딱입니다.",
        "likes": 27
      },
      {
        "id": "rev-prod-06-6",
        "author": "신*영",
        "rating": 5,
        "date": "2026-09-09",
        "content": "착용감이 편해서 하루 종일 입고 있어도 피로감이 전혀 없어요.",
        "likes": 26
      },
      {
        "id": "rev-prod-06-7",
        "author": "권*원",
        "rating": 4,
        "date": "2026-09-06",
        "content": "친구들이 다 어디서 샀냐고 물어봐서 이지샵 추천해 줬습니다.",
        "likes": 24
      },
      {
        "id": "rev-prod-06-8",
        "author": "황*린",
        "rating": 5,
        "date": "2026-09-03",
        "content": "세탁 후에도 변형이나 줄어듦 없이 형태가 잘 유지되네요.",
        "likes": 22
      },
      {
        "id": "rev-prod-06-9",
        "author": "안*준",
        "rating": 5,
        "date": "2026-08-31",
        "content": "사이즈 가이드대로 주문했더니 맞춤옷처럼 딱 맞습니다.",
        "likes": 21
      },
      {
        "id": "rev-prod-06-10",
        "author": "송*경",
        "rating": 5,
        "date": "2026-08-28",
        "content": "가성비, 디자인, 품질 모두 만족스러운 최고의 쇼핑이었습니다.",
        "likes": 19
      },
      {
        "id": "rev-prod-06-11",
        "author": "전*수",
        "rating": 5,
        "date": "2026-08-25",
        "content": "원단 촉감이 부드러워서 피부 자극 없이 편안합니다.",
        "likes": 18
      },
      {
        "id": "rev-prod-06-12",
        "author": "홍*우",
        "rating": 5,
        "date": "2026-08-22",
        "content": "계절 상관없이 활용도가 높아서 손이 자주 가는 아이템이에요.",
        "likes": 16
      },
      {
        "id": "rev-prod-06-13",
        "author": "유*희",
        "rating": 4,
        "date": "2026-08-19",
        "content": "디테일 하나하나 신경 쓴 게 느껴지는 완성도 높은 옷입니다.",
        "likes": 14
      },
      {
        "id": "rev-prod-06-14",
        "author": "고*진",
        "rating": 5,
        "date": "2026-08-16",
        "content": "단정한 출근룩부터 주말 캐주얼룩까지 전천후로 소화 가능해요.",
        "likes": 13
      },
      {
        "id": "rev-prod-06-15",
        "author": "문*아",
        "rating": 5,
        "date": "2026-08-13",
        "content": "다른 색상도 추가로 구매해서 쟁여둘 생각입니다.",
        "likes": 11
      },
      {
        "id": "rev-prod-06-16",
        "author": "양*태",
        "rating": 5,
        "date": "2026-08-10",
        "content": "가성비가 정말 훌륭합니다. 이 가격에 이 퀄리티라니 놀랍네요.",
        "likes": 10
      },
      {
        "id": "rev-prod-06-17",
        "author": "손*현",
        "rating": 5,
        "date": "2026-08-07",
        "content": "포장 박스를 열자마자 만족감이 100% 차올랐습니다.",
        "likes": 8
      },
      {
        "id": "rev-prod-06-18",
        "author": "배*호",
        "rating": 5,
        "date": "2026-08-04",
        "content": "기장감과 품이 여유 있어서 활동하기가 아주 수월합니다.",
        "likes": 6
      },
      {
        "id": "rev-prod-06-19",
        "author": "백*훈",
        "rating": 4,
        "date": "2026-08-01",
        "content": "선물용으로 샀는데 받는 분이 너무 좋아하셨습니다.",
        "likes": 5
      },
      {
        "id": "rev-prod-06-20",
        "author": "허*서",
        "rating": 5,
        "date": "2026-07-29",
        "content": "올해 구매한 패션 아이템 중 가장 마음에 듭니다. 적극 추천해요!",
        "likes": 3
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-06-1",
        "author": "오*지",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-07",
    "name": "프리미엄 헝가리 구스다운 라이트 패딩 베스트",
    "category": "패션 / 의류",
    "categoryId": "cat-fashion",
    "price": 98000,
    "originalPrice": 139000,
    "discountRate": 29,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 72,
    "isBest": true,
    "isNew": false,
    "isSale": true,
    "isFreeShipping": true,
    "thumbnail": "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "구스 솜털 90% 깃털 10% 필파워 750+, 코트 속 이너로도 완벽한 초경량 조끼",
    "description": "<h3>깃털처럼 가볍고 난로처럼 따뜻한 구스 베스트</h3><p>초경량 고밀도 다운프루프 겉감으로 털 빠짐을 완벽 차단하였으며 V넥/라운드넥 2단 변형 단추로 셔츠와 코트 이너웨어로 제격입니다.</p>",
    "options": [
      {
        "name": "매트 블랙 / M(95)",
        "stock": 20
      },
      {
        "name": "매트 블랙 / L(100)",
        "stock": 25
      },
      {
        "name": "웜 토프 / L(100)",
        "stock": 15
      }
    ],
    "specs": {
      "충전재": "헝가리 구스 90:10 (필파워 750+)",
      "중량": "약 160g"
    },
    "reviews": [
      {
        "id": "rev-prod-07-1",
        "author": "노*은",
        "rating": 4,
        "date": "2026-09-23",
        "content": "프리미엄 헝가리 구스다운 라이트 패딩 베스트 실물이 훨씬 예쁘고 원단이 정말 탄탄합니다.",
        "likes": 36
      },
      {
        "id": "rev-prod-07-2",
        "author": "남*윤",
        "rating": 5,
        "date": "2026-09-20",
        "content": "핏이 자연스럽게 떨어져서 체형 커버도 잘 되고 날씬해 보여요.",
        "likes": 34
      },
      {
        "id": "rev-prod-07-3",
        "author": "심*민",
        "rating": 5,
        "date": "2026-09-17",
        "content": "마감 바느질이나 단추 퀄리티가 백화점 고가 브랜드 못지않네요.",
        "likes": 32
      },
      {
        "id": "rev-prod-07-4",
        "author": "김*지",
        "rating": 5,
        "date": "2026-09-14",
        "content": "배송도 하루 만에 칼배송으로 왔고 포장도 정성스럽습니다.",
        "likes": 31
      },
      {
        "id": "rev-prod-07-5",
        "author": "이*정",
        "rating": 5,
        "date": "2026-09-11",
        "content": "색감이 너무 튀지 않고 은은하게 고급스러워서 데일리룩으로 딱입니다.",
        "likes": 29
      },
      {
        "id": "rev-prod-07-6",
        "author": "박*영",
        "rating": 5,
        "date": "2026-09-08",
        "content": "착용감이 편해서 하루 종일 입고 있어도 피로감이 전혀 없어요.",
        "likes": 28
      },
      {
        "id": "rev-prod-07-7",
        "author": "최*원",
        "rating": 4,
        "date": "2026-09-05",
        "content": "친구들이 다 어디서 샀냐고 물어봐서 이지샵 추천해 줬습니다.",
        "likes": 26
      },
      {
        "id": "rev-prod-07-8",
        "author": "정*린",
        "rating": 5,
        "date": "2026-09-02",
        "content": "세탁 후에도 변형이나 줄어듦 없이 형태가 잘 유지되네요.",
        "likes": 24
      },
      {
        "id": "rev-prod-07-9",
        "author": "강*준",
        "rating": 5,
        "date": "2026-08-30",
        "content": "사이즈 가이드대로 주문했더니 맞춤옷처럼 딱 맞습니다.",
        "likes": 23
      },
      {
        "id": "rev-prod-07-10",
        "author": "조*경",
        "rating": 5,
        "date": "2026-08-27",
        "content": "가성비, 디자인, 품질 모두 만족스러운 최고의 쇼핑이었습니다.",
        "likes": 21
      },
      {
        "id": "rev-prod-07-11",
        "author": "윤*수",
        "rating": 5,
        "date": "2026-08-24",
        "content": "원단 촉감이 부드러워서 피부 자극 없이 편안합니다.",
        "likes": 20
      },
      {
        "id": "rev-prod-07-12",
        "author": "장*우",
        "rating": 5,
        "date": "2026-08-21",
        "content": "계절 상관없이 활용도가 높아서 손이 자주 가는 아이템이에요.",
        "likes": 18
      },
      {
        "id": "rev-prod-07-13",
        "author": "임*희",
        "rating": 4,
        "date": "2026-08-18",
        "content": "디테일 하나하나 신경 쓴 게 느껴지는 완성도 높은 옷입니다.",
        "likes": 16
      },
      {
        "id": "rev-prod-07-14",
        "author": "한*진",
        "rating": 5,
        "date": "2026-08-15",
        "content": "단정한 출근룩부터 주말 캐주얼룩까지 전천후로 소화 가능해요.",
        "likes": 15
      },
      {
        "id": "rev-prod-07-15",
        "author": "오*아",
        "rating": 5,
        "date": "2026-08-12",
        "content": "다른 색상도 추가로 구매해서 쟁여둘 생각입니다.",
        "likes": 13
      },
      {
        "id": "rev-prod-07-16",
        "author": "서*태",
        "rating": 5,
        "date": "2026-08-09",
        "content": "가성비가 정말 훌륭합니다. 이 가격에 이 퀄리티라니 놀랍네요.",
        "likes": 12
      },
      {
        "id": "rev-prod-07-17",
        "author": "신*현",
        "rating": 5,
        "date": "2026-08-06",
        "content": "포장 박스를 열자마자 만족감이 100% 차올랐습니다.",
        "likes": 10
      },
      {
        "id": "rev-prod-07-18",
        "author": "권*호",
        "rating": 5,
        "date": "2026-08-03",
        "content": "기장감과 품이 여유 있어서 활동하기가 아주 수월합니다.",
        "likes": 8
      },
      {
        "id": "rev-prod-07-19",
        "author": "황*훈",
        "rating": 4,
        "date": "2026-07-31",
        "content": "선물용으로 샀는데 받는 분이 너무 좋아하셨습니다.",
        "likes": 7
      },
      {
        "id": "rev-prod-07-20",
        "author": "안*서",
        "rating": 5,
        "date": "2026-07-28",
        "content": "올해 구매한 패션 아이템 중 가장 마음에 듭니다. 적극 추천해요!",
        "likes": 5
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-07-1",
        "author": "서*정",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-08",
    "name": "코튼 와이드 투턱 카고 이지 팬츠",
    "category": "패션 / 의류",
    "categoryId": "cat-fashion",
    "price": 58000,
    "originalPrice": 79000,
    "discountRate": 26,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 79,
    "isBest": false,
    "isNew": true,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "탄탄한 16수 고밀도 트윌 코튼, 자연스러운 투턱 주름과 실용적인 플랩 포켓",
    "description": "<h3>트렌디한 시티보이 룩의 완성</h3><p>밑단 스트링으로 와이드핏과 조거핏 2가지 스타일링이 가능하며, 바이오 워싱으로 수축과 틀어짐을 최소화했습니다.</p>",
    "options": [
      {
        "name": "카키 그레이 / M(30-31)",
        "stock": 20
      },
      {
        "name": "카키 그레이 / L(32-33)",
        "stock": 15
      },
      {
        "name": "소프트 크림 / M(30-31)",
        "stock": 15
      }
    ],
    "specs": {
      "소재": "면 100% (바이오워싱)",
      "디테일": "밑단 스트링 조절"
    },
    "reviews": [
      {
        "id": "rev-prod-08-1",
        "author": "송*은",
        "rating": 4,
        "date": "2026-09-29",
        "content": "코튼 와이드 투턱 카고 이지 팬츠 실물이 훨씬 예쁘고 원단이 정말 탄탄합니다.",
        "likes": 38
      },
      {
        "id": "rev-prod-08-2",
        "author": "전*윤",
        "rating": 5,
        "date": "2026-09-26",
        "content": "핏이 자연스럽게 떨어져서 체형 커버도 잘 되고 날씬해 보여요.",
        "likes": 36
      },
      {
        "id": "rev-prod-08-3",
        "author": "홍*민",
        "rating": 5,
        "date": "2026-09-23",
        "content": "마감 바느질이나 단추 퀄리티가 백화점 고가 브랜드 못지않네요.",
        "likes": 34
      },
      {
        "id": "rev-prod-08-4",
        "author": "유*지",
        "rating": 5,
        "date": "2026-09-20",
        "content": "배송도 하루 만에 칼배송으로 왔고 포장도 정성스럽습니다.",
        "likes": 33
      },
      {
        "id": "rev-prod-08-5",
        "author": "고*정",
        "rating": 5,
        "date": "2026-09-17",
        "content": "색감이 너무 튀지 않고 은은하게 고급스러워서 데일리룩으로 딱입니다.",
        "likes": 31
      },
      {
        "id": "rev-prod-08-6",
        "author": "문*영",
        "rating": 5,
        "date": "2026-09-14",
        "content": "착용감이 편해서 하루 종일 입고 있어도 피로감이 전혀 없어요.",
        "likes": 30
      },
      {
        "id": "rev-prod-08-7",
        "author": "양*원",
        "rating": 4,
        "date": "2026-09-11",
        "content": "친구들이 다 어디서 샀냐고 물어봐서 이지샵 추천해 줬습니다.",
        "likes": 28
      },
      {
        "id": "rev-prod-08-8",
        "author": "손*린",
        "rating": 5,
        "date": "2026-09-08",
        "content": "세탁 후에도 변형이나 줄어듦 없이 형태가 잘 유지되네요.",
        "likes": 26
      },
      {
        "id": "rev-prod-08-9",
        "author": "배*준",
        "rating": 5,
        "date": "2026-09-05",
        "content": "사이즈 가이드대로 주문했더니 맞춤옷처럼 딱 맞습니다.",
        "likes": 25
      },
      {
        "id": "rev-prod-08-10",
        "author": "백*경",
        "rating": 5,
        "date": "2026-09-02",
        "content": "가성비, 디자인, 품질 모두 만족스러운 최고의 쇼핑이었습니다.",
        "likes": 23
      },
      {
        "id": "rev-prod-08-11",
        "author": "허*수",
        "rating": 5,
        "date": "2026-08-30",
        "content": "원단 촉감이 부드러워서 피부 자극 없이 편안합니다.",
        "likes": 22
      },
      {
        "id": "rev-prod-08-12",
        "author": "노*우",
        "rating": 5,
        "date": "2026-08-27",
        "content": "계절 상관없이 활용도가 높아서 손이 자주 가는 아이템이에요.",
        "likes": 20
      },
      {
        "id": "rev-prod-08-13",
        "author": "남*희",
        "rating": 4,
        "date": "2026-08-24",
        "content": "디테일 하나하나 신경 쓴 게 느껴지는 완성도 높은 옷입니다.",
        "likes": 18
      },
      {
        "id": "rev-prod-08-14",
        "author": "심*진",
        "rating": 5,
        "date": "2026-08-21",
        "content": "단정한 출근룩부터 주말 캐주얼룩까지 전천후로 소화 가능해요.",
        "likes": 17
      },
      {
        "id": "rev-prod-08-15",
        "author": "김*아",
        "rating": 5,
        "date": "2026-08-18",
        "content": "다른 색상도 추가로 구매해서 쟁여둘 생각입니다.",
        "likes": 15
      },
      {
        "id": "rev-prod-08-16",
        "author": "이*태",
        "rating": 5,
        "date": "2026-08-15",
        "content": "가성비가 정말 훌륭합니다. 이 가격에 이 퀄리티라니 놀랍네요.",
        "likes": 14
      },
      {
        "id": "rev-prod-08-17",
        "author": "박*현",
        "rating": 5,
        "date": "2026-08-12",
        "content": "포장 박스를 열자마자 만족감이 100% 차올랐습니다.",
        "likes": 12
      },
      {
        "id": "rev-prod-08-18",
        "author": "최*호",
        "rating": 5,
        "date": "2026-08-09",
        "content": "기장감과 품이 여유 있어서 활동하기가 아주 수월합니다.",
        "likes": 10
      },
      {
        "id": "rev-prod-08-19",
        "author": "정*훈",
        "rating": 4,
        "date": "2026-08-06",
        "content": "선물용으로 샀는데 받는 분이 너무 좋아하셨습니다.",
        "likes": 9
      },
      {
        "id": "rev-prod-08-20",
        "author": "강*서",
        "rating": 5,
        "date": "2026-08-03",
        "content": "올해 구매한 패션 아이템 중 가장 마음에 듭니다. 적극 추천해요!",
        "likes": 7
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-08-1",
        "author": "신*영",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-09",
    "name": "클래식 80수 2합 옥스포드 버튼다운 셔츠",
    "category": "패션 / 의류",
    "categoryId": "cat-fashion",
    "price": 59000,
    "originalPrice": 79000,
    "discountRate": 25,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 36,
    "isBest": false,
    "isNew": false,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "탄탄한 옥스포드 조직감, 입을수록 자연스럽게 길드는 프리미엄 에센셜 셔츠",
    "description": "<h3>기본에 충실한 에센셜 옥스포드 셔츠</h3><p>롤링감이 살아있는 버튼다운 카라와 자개 단추 마감으로 단정한 비즈니스룩부터 주말 캐주얼룩까지 전천후로 활용 가능합니다.</p>",
    "options": [
      {
        "name": "화이트 / M(100)",
        "stock": 30
      },
      {
        "name": "화이트 / L(105)",
        "stock": 20
      },
      {
        "name": "라이트 블루 / M(100)",
        "stock": 25
      }
    ],
    "specs": {
      "소재": "프리미엄 코튼 100%",
      "카라": "버튼다운"
    },
    "reviews": [
      {
        "id": "rev-prod-09-1",
        "author": "조*은",
        "rating": 4,
        "date": "2026-09-28",
        "content": "클래식 80수 2합 옥스포드 버튼다운 셔츠 실물이 훨씬 예쁘고 원단이 정말 탄탄합니다.",
        "likes": 40
      },
      {
        "id": "rev-prod-09-2",
        "author": "윤*윤",
        "rating": 5,
        "date": "2026-09-25",
        "content": "핏이 자연스럽게 떨어져서 체형 커버도 잘 되고 날씬해 보여요.",
        "likes": 38
      },
      {
        "id": "rev-prod-09-3",
        "author": "장*민",
        "rating": 5,
        "date": "2026-09-22",
        "content": "마감 바느질이나 단추 퀄리티가 백화점 고가 브랜드 못지않네요.",
        "likes": 36
      },
      {
        "id": "rev-prod-09-4",
        "author": "임*지",
        "rating": 5,
        "date": "2026-09-19",
        "content": "배송도 하루 만에 칼배송으로 왔고 포장도 정성스럽습니다.",
        "likes": 35
      },
      {
        "id": "rev-prod-09-5",
        "author": "한*정",
        "rating": 5,
        "date": "2026-09-16",
        "content": "색감이 너무 튀지 않고 은은하게 고급스러워서 데일리룩으로 딱입니다.",
        "likes": 33
      },
      {
        "id": "rev-prod-09-6",
        "author": "오*영",
        "rating": 5,
        "date": "2026-09-13",
        "content": "착용감이 편해서 하루 종일 입고 있어도 피로감이 전혀 없어요.",
        "likes": 32
      },
      {
        "id": "rev-prod-09-7",
        "author": "서*원",
        "rating": 4,
        "date": "2026-09-10",
        "content": "친구들이 다 어디서 샀냐고 물어봐서 이지샵 추천해 줬습니다.",
        "likes": 30
      },
      {
        "id": "rev-prod-09-8",
        "author": "신*린",
        "rating": 5,
        "date": "2026-09-07",
        "content": "세탁 후에도 변형이나 줄어듦 없이 형태가 잘 유지되네요.",
        "likes": 28
      },
      {
        "id": "rev-prod-09-9",
        "author": "권*준",
        "rating": 5,
        "date": "2026-09-04",
        "content": "사이즈 가이드대로 주문했더니 맞춤옷처럼 딱 맞습니다.",
        "likes": 27
      },
      {
        "id": "rev-prod-09-10",
        "author": "황*경",
        "rating": 5,
        "date": "2026-09-01",
        "content": "가성비, 디자인, 품질 모두 만족스러운 최고의 쇼핑이었습니다.",
        "likes": 25
      },
      {
        "id": "rev-prod-09-11",
        "author": "안*수",
        "rating": 5,
        "date": "2026-08-29",
        "content": "원단 촉감이 부드러워서 피부 자극 없이 편안합니다.",
        "likes": 24
      },
      {
        "id": "rev-prod-09-12",
        "author": "송*우",
        "rating": 5,
        "date": "2026-08-26",
        "content": "계절 상관없이 활용도가 높아서 손이 자주 가는 아이템이에요.",
        "likes": 22
      },
      {
        "id": "rev-prod-09-13",
        "author": "전*희",
        "rating": 4,
        "date": "2026-08-23",
        "content": "디테일 하나하나 신경 쓴 게 느껴지는 완성도 높은 옷입니다.",
        "likes": 20
      },
      {
        "id": "rev-prod-09-14",
        "author": "홍*진",
        "rating": 5,
        "date": "2026-08-20",
        "content": "단정한 출근룩부터 주말 캐주얼룩까지 전천후로 소화 가능해요.",
        "likes": 19
      },
      {
        "id": "rev-prod-09-15",
        "author": "유*아",
        "rating": 5,
        "date": "2026-08-17",
        "content": "다른 색상도 추가로 구매해서 쟁여둘 생각입니다.",
        "likes": 17
      },
      {
        "id": "rev-prod-09-16",
        "author": "고*태",
        "rating": 5,
        "date": "2026-08-14",
        "content": "가성비가 정말 훌륭합니다. 이 가격에 이 퀄리티라니 놀랍네요.",
        "likes": 16
      },
      {
        "id": "rev-prod-09-17",
        "author": "문*현",
        "rating": 5,
        "date": "2026-08-11",
        "content": "포장 박스를 열자마자 만족감이 100% 차올랐습니다.",
        "likes": 14
      },
      {
        "id": "rev-prod-09-18",
        "author": "양*호",
        "rating": 5,
        "date": "2026-08-08",
        "content": "기장감과 품이 여유 있어서 활동하기가 아주 수월합니다.",
        "likes": 12
      },
      {
        "id": "rev-prod-09-19",
        "author": "손*훈",
        "rating": 4,
        "date": "2026-08-05",
        "content": "선물용으로 샀는데 받는 분이 너무 좋아하셨습니다.",
        "likes": 11
      },
      {
        "id": "rev-prod-09-20",
        "author": "배*서",
        "rating": 5,
        "date": "2026-08-02",
        "content": "올해 구매한 패션 아이템 중 가장 마음에 듭니다. 적극 추천해요!",
        "likes": 9
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-09-1",
        "author": "권*원",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-10",
    "name": "울 블렌드 클래식 A라인 플리츠 스커트",
    "category": "패션 / 의류",
    "categoryId": "cat-fashion",
    "price": 69000,
    "originalPrice": 95000,
    "discountRate": 27,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 43,
    "isBest": false,
    "isNew": true,
    "isSale": true,
    "isFreeShipping": true,
    "thumbnail": "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "정교한 열 프레스 주름 가공, 걸을 때마다 우아하게 흩날리는 플리츠 실루엣",
    "description": "<h3>클래식하고 여성스러운 플리츠 스커트</h3><p>울 블렌드 소재의 차분한 드레이프성과 뒷밴딩 디자인으로 편안한 착용감과 단정한 핏을 동시에 선사합니다.</p>",
    "options": [
      {
        "name": "차콜 / S(55)",
        "stock": 15
      },
      {
        "name": "차콜 / M(66)",
        "stock": 20
      },
      {
        "name": "베이지 브라운 / M(66)",
        "stock": 12
      }
    ],
    "specs": {
      "소재": "울 30%, 폴리에스터 70%",
      "안감": "정전기 방지 안감"
    },
    "reviews": [
      {
        "id": "rev-prod-10-1",
        "author": "백*은",
        "rating": 4,
        "date": "2026-09-27",
        "content": "울 블렌드 클래식 A라인 플리츠 스커트 실물이 훨씬 예쁘고 원단이 정말 탄탄합니다.",
        "likes": 42
      },
      {
        "id": "rev-prod-10-2",
        "author": "허*윤",
        "rating": 5,
        "date": "2026-09-24",
        "content": "핏이 자연스럽게 떨어져서 체형 커버도 잘 되고 날씬해 보여요.",
        "likes": 40
      },
      {
        "id": "rev-prod-10-3",
        "author": "노*민",
        "rating": 5,
        "date": "2026-09-21",
        "content": "마감 바느질이나 단추 퀄리티가 백화점 고가 브랜드 못지않네요.",
        "likes": 38
      },
      {
        "id": "rev-prod-10-4",
        "author": "남*지",
        "rating": 5,
        "date": "2026-09-18",
        "content": "배송도 하루 만에 칼배송으로 왔고 포장도 정성스럽습니다.",
        "likes": 37
      },
      {
        "id": "rev-prod-10-5",
        "author": "심*정",
        "rating": 5,
        "date": "2026-09-15",
        "content": "색감이 너무 튀지 않고 은은하게 고급스러워서 데일리룩으로 딱입니다.",
        "likes": 35
      },
      {
        "id": "rev-prod-10-6",
        "author": "김*영",
        "rating": 5,
        "date": "2026-09-12",
        "content": "착용감이 편해서 하루 종일 입고 있어도 피로감이 전혀 없어요.",
        "likes": 34
      },
      {
        "id": "rev-prod-10-7",
        "author": "이*원",
        "rating": 4,
        "date": "2026-09-09",
        "content": "친구들이 다 어디서 샀냐고 물어봐서 이지샵 추천해 줬습니다.",
        "likes": 32
      },
      {
        "id": "rev-prod-10-8",
        "author": "박*린",
        "rating": 5,
        "date": "2026-09-06",
        "content": "세탁 후에도 변형이나 줄어듦 없이 형태가 잘 유지되네요.",
        "likes": 30
      },
      {
        "id": "rev-prod-10-9",
        "author": "최*준",
        "rating": 5,
        "date": "2026-09-03",
        "content": "사이즈 가이드대로 주문했더니 맞춤옷처럼 딱 맞습니다.",
        "likes": 29
      },
      {
        "id": "rev-prod-10-10",
        "author": "정*경",
        "rating": 5,
        "date": "2026-08-31",
        "content": "가성비, 디자인, 품질 모두 만족스러운 최고의 쇼핑이었습니다.",
        "likes": 27
      },
      {
        "id": "rev-prod-10-11",
        "author": "강*수",
        "rating": 5,
        "date": "2026-08-28",
        "content": "원단 촉감이 부드러워서 피부 자극 없이 편안합니다.",
        "likes": 26
      },
      {
        "id": "rev-prod-10-12",
        "author": "조*우",
        "rating": 5,
        "date": "2026-08-25",
        "content": "계절 상관없이 활용도가 높아서 손이 자주 가는 아이템이에요.",
        "likes": 24
      },
      {
        "id": "rev-prod-10-13",
        "author": "윤*희",
        "rating": 4,
        "date": "2026-08-22",
        "content": "디테일 하나하나 신경 쓴 게 느껴지는 완성도 높은 옷입니다.",
        "likes": 22
      },
      {
        "id": "rev-prod-10-14",
        "author": "장*진",
        "rating": 5,
        "date": "2026-08-19",
        "content": "단정한 출근룩부터 주말 캐주얼룩까지 전천후로 소화 가능해요.",
        "likes": 21
      },
      {
        "id": "rev-prod-10-15",
        "author": "임*아",
        "rating": 5,
        "date": "2026-08-16",
        "content": "다른 색상도 추가로 구매해서 쟁여둘 생각입니다.",
        "likes": 19
      },
      {
        "id": "rev-prod-10-16",
        "author": "한*태",
        "rating": 5,
        "date": "2026-08-13",
        "content": "가성비가 정말 훌륭합니다. 이 가격에 이 퀄리티라니 놀랍네요.",
        "likes": 18
      },
      {
        "id": "rev-prod-10-17",
        "author": "오*현",
        "rating": 5,
        "date": "2026-08-10",
        "content": "포장 박스를 열자마자 만족감이 100% 차올랐습니다.",
        "likes": 16
      },
      {
        "id": "rev-prod-10-18",
        "author": "서*호",
        "rating": 5,
        "date": "2026-08-07",
        "content": "기장감과 품이 여유 있어서 활동하기가 아주 수월합니다.",
        "likes": 14
      },
      {
        "id": "rev-prod-10-19",
        "author": "신*훈",
        "rating": 4,
        "date": "2026-08-04",
        "content": "선물용으로 샀는데 받는 분이 너무 좋아하셨습니다.",
        "likes": 13
      },
      {
        "id": "rev-prod-10-20",
        "author": "권*서",
        "rating": 5,
        "date": "2026-08-01",
        "content": "올해 구매한 패션 아이템 중 가장 마음에 듭니다. 적극 추천해요!",
        "likes": 11
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-10-1",
        "author": "황*린",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-11",
    "name": "이탈리안 베지터블 천연 소가죽 미니멀 벨트",
    "category": "패션 / 의류",
    "categoryId": "cat-fashion",
    "price": 45000,
    "originalPrice": 62000,
    "discountRate": 27,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 50,
    "isBest": false,
    "isNew": false,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "이태리 수입 풀그레인 통가죽, 황동 버클과 에이징될수록 깊어지는 가죽 본연의 멋",
    "description": "<h3>평생을 함께하는 클래식 레더 벨트</h3><p>30mm 최적의 폭으로 슬랙스와 데님 모두에 어울리며, 인위적인 코팅 없이 가죽 본연의 질감을 살려 시간이 지날수록 멋진 태닝이 진행됩니다.</p>",
    "options": [
      {
        "name": "앤틱 브라운 / Free(최대 36인치)",
        "stock": 25
      },
      {
        "name": "클래식 블랙 / Free(최대 36인치)",
        "stock": 30
      }
    ],
    "specs": {
      "가죽": "이탈리아 풀그레인 소가죽",
      "버클": "무광 황동 합금"
    },
    "reviews": [
      {
        "id": "rev-prod-11-1",
        "author": "황*은",
        "rating": 4,
        "date": "2026-09-26",
        "content": "이탈리안 베지터블 천연 소가죽 미니멀 벨트 실물이 훨씬 예쁘고 원단이 정말 탄탄합니다.",
        "likes": 34
      },
      {
        "id": "rev-prod-11-2",
        "author": "안*윤",
        "rating": 5,
        "date": "2026-09-23",
        "content": "핏이 자연스럽게 떨어져서 체형 커버도 잘 되고 날씬해 보여요.",
        "likes": 32
      },
      {
        "id": "rev-prod-11-3",
        "author": "송*민",
        "rating": 5,
        "date": "2026-09-20",
        "content": "마감 바느질이나 단추 퀄리티가 백화점 고가 브랜드 못지않네요.",
        "likes": 30
      },
      {
        "id": "rev-prod-11-4",
        "author": "전*지",
        "rating": 5,
        "date": "2026-09-17",
        "content": "배송도 하루 만에 칼배송으로 왔고 포장도 정성스럽습니다.",
        "likes": 29
      },
      {
        "id": "rev-prod-11-5",
        "author": "홍*정",
        "rating": 5,
        "date": "2026-09-14",
        "content": "색감이 너무 튀지 않고 은은하게 고급스러워서 데일리룩으로 딱입니다.",
        "likes": 27
      },
      {
        "id": "rev-prod-11-6",
        "author": "유*영",
        "rating": 5,
        "date": "2026-09-11",
        "content": "착용감이 편해서 하루 종일 입고 있어도 피로감이 전혀 없어요.",
        "likes": 26
      },
      {
        "id": "rev-prod-11-7",
        "author": "고*원",
        "rating": 4,
        "date": "2026-09-08",
        "content": "친구들이 다 어디서 샀냐고 물어봐서 이지샵 추천해 줬습니다.",
        "likes": 24
      },
      {
        "id": "rev-prod-11-8",
        "author": "문*린",
        "rating": 5,
        "date": "2026-09-05",
        "content": "세탁 후에도 변형이나 줄어듦 없이 형태가 잘 유지되네요.",
        "likes": 22
      },
      {
        "id": "rev-prod-11-9",
        "author": "양*준",
        "rating": 5,
        "date": "2026-09-02",
        "content": "사이즈 가이드대로 주문했더니 맞춤옷처럼 딱 맞습니다.",
        "likes": 21
      },
      {
        "id": "rev-prod-11-10",
        "author": "손*경",
        "rating": 5,
        "date": "2026-08-30",
        "content": "가성비, 디자인, 품질 모두 만족스러운 최고의 쇼핑이었습니다.",
        "likes": 19
      },
      {
        "id": "rev-prod-11-11",
        "author": "배*수",
        "rating": 5,
        "date": "2026-08-27",
        "content": "원단 촉감이 부드러워서 피부 자극 없이 편안합니다.",
        "likes": 18
      },
      {
        "id": "rev-prod-11-12",
        "author": "백*우",
        "rating": 5,
        "date": "2026-08-24",
        "content": "계절 상관없이 활용도가 높아서 손이 자주 가는 아이템이에요.",
        "likes": 16
      },
      {
        "id": "rev-prod-11-13",
        "author": "허*희",
        "rating": 4,
        "date": "2026-08-21",
        "content": "디테일 하나하나 신경 쓴 게 느껴지는 완성도 높은 옷입니다.",
        "likes": 14
      },
      {
        "id": "rev-prod-11-14",
        "author": "노*진",
        "rating": 5,
        "date": "2026-08-18",
        "content": "단정한 출근룩부터 주말 캐주얼룩까지 전천후로 소화 가능해요.",
        "likes": 13
      },
      {
        "id": "rev-prod-11-15",
        "author": "남*아",
        "rating": 5,
        "date": "2026-08-15",
        "content": "다른 색상도 추가로 구매해서 쟁여둘 생각입니다.",
        "likes": 11
      },
      {
        "id": "rev-prod-11-16",
        "author": "심*태",
        "rating": 5,
        "date": "2026-08-12",
        "content": "가성비가 정말 훌륭합니다. 이 가격에 이 퀄리티라니 놀랍네요.",
        "likes": 10
      },
      {
        "id": "rev-prod-11-17",
        "author": "김*현",
        "rating": 5,
        "date": "2026-08-09",
        "content": "포장 박스를 열자마자 만족감이 100% 차올랐습니다.",
        "likes": 8
      },
      {
        "id": "rev-prod-11-18",
        "author": "이*호",
        "rating": 5,
        "date": "2026-08-06",
        "content": "기장감과 품이 여유 있어서 활동하기가 아주 수월합니다.",
        "likes": 6
      },
      {
        "id": "rev-prod-11-19",
        "author": "박*훈",
        "rating": 4,
        "date": "2026-08-03",
        "content": "선물용으로 샀는데 받는 분이 너무 좋아하셨습니다.",
        "likes": 5
      },
      {
        "id": "rev-prod-11-20",
        "author": "최*서",
        "rating": 5,
        "date": "2026-07-31",
        "content": "올해 구매한 패션 아이템 중 가장 마음에 듭니다. 적극 추천해요!",
        "likes": 3
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-11-1",
        "author": "안*준",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-12",
    "name": "100% 퓨어 캐시미어 프리미엄 롱 머플러",
    "category": "패션 / 의류",
    "categoryId": "cat-fashion",
    "price": 89000,
    "originalPrice": 129000,
    "discountRate": 31,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 57,
    "isBest": true,
    "isNew": true,
    "isSale": true,
    "isFreeShipping": true,
    "thumbnail": "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "내몽골산 100% 순수 캐시미어, 폭 35cm x 길이 200cm의 풍성한 보온성",
    "description": "<h3>목을 감싸는 극상의 부드러움</h3><p>지블링(물결무늬) 가공으로 캐시미어 고유의 고급스러운 윤기를 극대화했으며, 남녀노소 선물용으로 최적의 아이템입니다.</p>",
    "options": [
      {
        "name": "카멜 베이지",
        "stock": 20
      },
      {
        "name": "라이트 그레이",
        "stock": 25
      },
      {
        "name": "더스티 로즈",
        "stock": 15
      }
    ],
    "specs": {
      "소재": "캐시미어 100%",
      "크기": "35 x 200 cm (수술 포함)"
    },
    "reviews": [
      {
        "id": "rev-prod-12-1",
        "author": "정*은",
        "rating": 4,
        "date": "2026-09-25",
        "content": "100% 퓨어 캐시미어 프리미엄 롱 머플러 실물이 훨씬 예쁘고 원단이 정말 탄탄합니다.",
        "likes": 36
      },
      {
        "id": "rev-prod-12-2",
        "author": "강*윤",
        "rating": 5,
        "date": "2026-09-22",
        "content": "핏이 자연스럽게 떨어져서 체형 커버도 잘 되고 날씬해 보여요.",
        "likes": 34
      },
      {
        "id": "rev-prod-12-3",
        "author": "조*민",
        "rating": 5,
        "date": "2026-09-19",
        "content": "마감 바느질이나 단추 퀄리티가 백화점 고가 브랜드 못지않네요.",
        "likes": 32
      },
      {
        "id": "rev-prod-12-4",
        "author": "윤*지",
        "rating": 5,
        "date": "2026-09-16",
        "content": "배송도 하루 만에 칼배송으로 왔고 포장도 정성스럽습니다.",
        "likes": 31
      },
      {
        "id": "rev-prod-12-5",
        "author": "장*정",
        "rating": 5,
        "date": "2026-09-13",
        "content": "색감이 너무 튀지 않고 은은하게 고급스러워서 데일리룩으로 딱입니다.",
        "likes": 29
      },
      {
        "id": "rev-prod-12-6",
        "author": "임*영",
        "rating": 5,
        "date": "2026-09-10",
        "content": "착용감이 편해서 하루 종일 입고 있어도 피로감이 전혀 없어요.",
        "likes": 28
      },
      {
        "id": "rev-prod-12-7",
        "author": "한*원",
        "rating": 4,
        "date": "2026-09-07",
        "content": "친구들이 다 어디서 샀냐고 물어봐서 이지샵 추천해 줬습니다.",
        "likes": 26
      },
      {
        "id": "rev-prod-12-8",
        "author": "오*린",
        "rating": 5,
        "date": "2026-09-04",
        "content": "세탁 후에도 변형이나 줄어듦 없이 형태가 잘 유지되네요.",
        "likes": 24
      },
      {
        "id": "rev-prod-12-9",
        "author": "서*준",
        "rating": 5,
        "date": "2026-09-01",
        "content": "사이즈 가이드대로 주문했더니 맞춤옷처럼 딱 맞습니다.",
        "likes": 23
      },
      {
        "id": "rev-prod-12-10",
        "author": "신*경",
        "rating": 5,
        "date": "2026-08-29",
        "content": "가성비, 디자인, 품질 모두 만족스러운 최고의 쇼핑이었습니다.",
        "likes": 21
      },
      {
        "id": "rev-prod-12-11",
        "author": "권*수",
        "rating": 5,
        "date": "2026-08-26",
        "content": "원단 촉감이 부드러워서 피부 자극 없이 편안합니다.",
        "likes": 20
      },
      {
        "id": "rev-prod-12-12",
        "author": "황*우",
        "rating": 5,
        "date": "2026-08-23",
        "content": "계절 상관없이 활용도가 높아서 손이 자주 가는 아이템이에요.",
        "likes": 18
      },
      {
        "id": "rev-prod-12-13",
        "author": "안*희",
        "rating": 4,
        "date": "2026-08-20",
        "content": "디테일 하나하나 신경 쓴 게 느껴지는 완성도 높은 옷입니다.",
        "likes": 16
      },
      {
        "id": "rev-prod-12-14",
        "author": "송*진",
        "rating": 5,
        "date": "2026-08-17",
        "content": "단정한 출근룩부터 주말 캐주얼룩까지 전천후로 소화 가능해요.",
        "likes": 15
      },
      {
        "id": "rev-prod-12-15",
        "author": "전*아",
        "rating": 5,
        "date": "2026-08-14",
        "content": "다른 색상도 추가로 구매해서 쟁여둘 생각입니다.",
        "likes": 13
      },
      {
        "id": "rev-prod-12-16",
        "author": "홍*태",
        "rating": 5,
        "date": "2026-08-11",
        "content": "가성비가 정말 훌륭합니다. 이 가격에 이 퀄리티라니 놀랍네요.",
        "likes": 12
      },
      {
        "id": "rev-prod-12-17",
        "author": "유*현",
        "rating": 5,
        "date": "2026-08-08",
        "content": "포장 박스를 열자마자 만족감이 100% 차올랐습니다.",
        "likes": 10
      },
      {
        "id": "rev-prod-12-18",
        "author": "고*호",
        "rating": 5,
        "date": "2026-08-05",
        "content": "기장감과 품이 여유 있어서 활동하기가 아주 수월합니다.",
        "likes": 8
      },
      {
        "id": "rev-prod-12-19",
        "author": "문*훈",
        "rating": 4,
        "date": "2026-08-02",
        "content": "선물용으로 샀는데 받는 분이 너무 좋아하셨습니다.",
        "likes": 7
      },
      {
        "id": "rev-prod-12-20",
        "author": "양*서",
        "rating": 5,
        "date": "2026-07-30",
        "content": "올해 구매한 패션 아이템 중 가장 마음에 듭니다. 적극 추천해요!",
        "likes": 5
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-12-1",
        "author": "송*경",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-13",
    "name": "에어사운드 노이즈캔슬링 무선 헤드폰 프로",
    "category": "디지털 / 가전",
    "categoryId": "cat-digital",
    "price": 198000,
    "originalPrice": 269000,
    "discountRate": 26,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 64,
    "isBest": true,
    "isNew": false,
    "isSale": true,
    "isFreeShipping": true,
    "thumbnail": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "하이브리드 ANC 45dB 노이즈 차단, 최대 60시간 연속 재생, 고해상도 Hi-Res 오디오",
    "description": "<h3>압도적인 몰입감, 소음 없는 당신만의 사운드 스페이스</h3><p>40mm 티타늄 다이내믹 드라이버 탑재로 깊고 단단한 저음과 맑고 청량한 고음을 전달합니다.</p>",
    "options": [
      {
        "name": "스페이스 그레이",
        "stock": 20
      },
      {
        "name": "매트 실버",
        "stock": 15
      }
    ],
    "specs": {
      "블루투스": "v5.4",
      "배터리": "최대 60시간",
      "무게": "245g"
    },
    "reviews": [
      {
        "id": "rev-prod-13-1",
        "author": "손*은",
        "rating": 4,
        "date": "2026-09-24",
        "content": "에어사운드 노이즈캔슬링 무선 헤드폰 프로 성능이 기대 이상으로 훌륭합니다. 마감도 깔끔해요.",
        "likes": 38
      },
      {
        "id": "rev-prod-13-2",
        "author": "배*윤",
        "rating": 5,
        "date": "2026-09-21",
        "content": "연결이 빠르고 끊김 없이 안정적으로 동작해서 너무 편합니다.",
        "likes": 36
      },
      {
        "id": "rev-prod-13-3",
        "author": "백*민",
        "rating": 5,
        "date": "2026-09-18",
        "content": "디자인이 모던하고 미니멀해서 데스크테리어에 찰떡이에요.",
        "likes": 34
      },
      {
        "id": "rev-prod-13-4",
        "author": "허*지",
        "rating": 5,
        "date": "2026-09-15",
        "content": "배터리가 오래가서 충전 스트레스 없이 쓰고 있습니다.",
        "likes": 33
      },
      {
        "id": "rev-prod-13-5",
        "author": "노*정",
        "rating": 5,
        "date": "2026-09-12",
        "content": "버튼 조작감과 인터페이스가 직관적이라 사용하기 쉽네요.",
        "likes": 31
      },
      {
        "id": "rev-prod-13-6",
        "author": "남*영",
        "rating": 5,
        "date": "2026-09-09",
        "content": "무게가 가벼워서 휴대하고 다니기에 부담이 전혀 없습니다.",
        "likes": 30
      },
      {
        "id": "rev-prod-13-7",
        "author": "심*원",
        "rating": 4,
        "date": "2026-09-06",
        "content": "가격 대비 스펙이 아주 훌륭한 가성비 종결템입니다.",
        "likes": 28
      },
      {
        "id": "rev-prod-13-8",
        "author": "김*린",
        "rating": 5,
        "date": "2026-09-03",
        "content": "패키징도 꼼꼼하고 충전 케이블 등 부속품 퀄리티도 좋아요.",
        "likes": 26
      },
      {
        "id": "rev-prod-13-9",
        "author": "이*준",
        "rating": 5,
        "date": "2026-08-31",
        "content": "업무 효율이 확실히 올라갔습니다. 재택근무 필수품이에요.",
        "likes": 25
      },
      {
        "id": "rev-prod-13-10",
        "author": "박*경",
        "rating": 5,
        "date": "2026-08-28",
        "content": "소음이나 발열이 적어서 장시간 사용해도 안심이 됩니다.",
        "likes": 23
      },
      {
        "id": "rev-prod-13-11",
        "author": "최*수",
        "rating": 5,
        "date": "2026-08-25",
        "content": "친구 추천으로 샀는데 왜 인기 많은지 알겠네요.",
        "likes": 22
      },
      {
        "id": "rev-prod-13-12",
        "author": "정*우",
        "rating": 5,
        "date": "2026-08-22",
        "content": "블루투스 페어링 속도가 1초 만에 바로 잡혀서 감탄했습니다.",
        "likes": 20
      },
      {
        "id": "rev-prod-13-13",
        "author": "강*희",
        "rating": 4,
        "date": "2026-08-19",
        "content": "내구성이 튼튼해서 오래오래 고장 없이 쓸 수 있을 것 같아요.",
        "likes": 18
      },
      {
        "id": "rev-prod-13-14",
        "author": "조*진",
        "rating": 5,
        "date": "2026-08-16",
        "content": "기능이 다양하면서도 불필요한 군더더기가 없어 만족스럽습니다.",
        "likes": 17
      },
      {
        "id": "rev-prod-13-15",
        "author": "윤*아",
        "rating": 5,
        "date": "2026-08-13",
        "content": "선물용으로 구매했는데 받는 사람이 너무 유용하다고 칭찬하네요.",
        "likes": 15
      },
      {
        "id": "rev-prod-13-16",
        "author": "장*태",
        "rating": 5,
        "date": "2026-08-10",
        "content": "화면이나 음질, 반응속도 등 기본기가 탄탄하게 잡혀있습니다.",
        "likes": 14
      },
      {
        "id": "rev-prod-13-17",
        "author": "임*현",
        "rating": 5,
        "date": "2026-08-07",
        "content": "한 손에 쏙 들어오는 그립감과 컴팩트함이 아주 매력적입니다.",
        "likes": 12
      },
      {
        "id": "rev-prod-13-18",
        "author": "한*호",
        "rating": 5,
        "date": "2026-08-04",
        "content": "기술력이 뛰어난 게 느껴지는 완성도 높은 IT 디바이스입니다.",
        "likes": 10
      },
      {
        "id": "rev-prod-13-19",
        "author": "오*훈",
        "rating": 4,
        "date": "2026-08-01",
        "content": "이지샵 디지털 제품은 항상 믿고 구매하게 됩니다.",
        "likes": 9
      },
      {
        "id": "rev-prod-13-20",
        "author": "서*서",
        "rating": 5,
        "date": "2026-07-29",
        "content": "별 5개가 아깝지 않은 최고의 디지털 가전입니다. 강추!",
        "likes": 7
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-13-1",
        "author": "전*수",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-14",
    "name": "울트라 슬림 기계식 무선 블루투스 키보드",
    "category": "디지털 / 가전",
    "categoryId": "cat-digital",
    "price": 129000,
    "originalPrice": 169000,
    "discountRate": 23,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 71,
    "isBest": true,
    "isNew": true,
    "isSale": false,
    "isFreeShipping": true,
    "thumbnail": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "로우 프로파일 게이트론 적축/갈축, Mac/Windows 동시 지원 멀티페어링",
    "description": "<h3>얇고 경쾌한 프리미엄 타건감</h3><p>두께 18mm의 초슬림 디자인으로 손목 받침대 없이도 장시간 편안한 타이핑을 제공합니다.</p>",
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
      "배열": "84키 텐키리스",
      "배터리": "4000mAh",
      "연결": "BT 5.1 / 유선 Type-C"
    },
    "reviews": [
      {
        "id": "rev-prod-14-1",
        "author": "신*은",
        "rating": 4,
        "date": "2026-09-23",
        "content": "울트라 슬림 기계식 무선 블루투스 키보드 성능이 기대 이상으로 훌륭합니다. 마감도 깔끔해요.",
        "likes": 40
      },
      {
        "id": "rev-prod-14-2",
        "author": "권*윤",
        "rating": 5,
        "date": "2026-09-20",
        "content": "연결이 빠르고 끊김 없이 안정적으로 동작해서 너무 편합니다.",
        "likes": 38
      },
      {
        "id": "rev-prod-14-3",
        "author": "황*민",
        "rating": 5,
        "date": "2026-09-17",
        "content": "디자인이 모던하고 미니멀해서 데스크테리어에 찰떡이에요.",
        "likes": 36
      },
      {
        "id": "rev-prod-14-4",
        "author": "안*지",
        "rating": 5,
        "date": "2026-09-14",
        "content": "배터리가 오래가서 충전 스트레스 없이 쓰고 있습니다.",
        "likes": 35
      },
      {
        "id": "rev-prod-14-5",
        "author": "송*정",
        "rating": 5,
        "date": "2026-09-11",
        "content": "버튼 조작감과 인터페이스가 직관적이라 사용하기 쉽네요.",
        "likes": 33
      },
      {
        "id": "rev-prod-14-6",
        "author": "전*영",
        "rating": 5,
        "date": "2026-09-08",
        "content": "무게가 가벼워서 휴대하고 다니기에 부담이 전혀 없습니다.",
        "likes": 32
      },
      {
        "id": "rev-prod-14-7",
        "author": "홍*원",
        "rating": 4,
        "date": "2026-09-05",
        "content": "가격 대비 스펙이 아주 훌륭한 가성비 종결템입니다.",
        "likes": 30
      },
      {
        "id": "rev-prod-14-8",
        "author": "유*린",
        "rating": 5,
        "date": "2026-09-02",
        "content": "패키징도 꼼꼼하고 충전 케이블 등 부속품 퀄리티도 좋아요.",
        "likes": 28
      },
      {
        "id": "rev-prod-14-9",
        "author": "고*준",
        "rating": 5,
        "date": "2026-08-30",
        "content": "업무 효율이 확실히 올라갔습니다. 재택근무 필수품이에요.",
        "likes": 27
      },
      {
        "id": "rev-prod-14-10",
        "author": "문*경",
        "rating": 5,
        "date": "2026-08-27",
        "content": "소음이나 발열이 적어서 장시간 사용해도 안심이 됩니다.",
        "likes": 25
      },
      {
        "id": "rev-prod-14-11",
        "author": "양*수",
        "rating": 5,
        "date": "2026-08-24",
        "content": "친구 추천으로 샀는데 왜 인기 많은지 알겠네요.",
        "likes": 24
      },
      {
        "id": "rev-prod-14-12",
        "author": "손*우",
        "rating": 5,
        "date": "2026-08-21",
        "content": "블루투스 페어링 속도가 1초 만에 바로 잡혀서 감탄했습니다.",
        "likes": 22
      },
      {
        "id": "rev-prod-14-13",
        "author": "배*희",
        "rating": 4,
        "date": "2026-08-18",
        "content": "내구성이 튼튼해서 오래오래 고장 없이 쓸 수 있을 것 같아요.",
        "likes": 20
      },
      {
        "id": "rev-prod-14-14",
        "author": "백*진",
        "rating": 5,
        "date": "2026-08-15",
        "content": "기능이 다양하면서도 불필요한 군더더기가 없어 만족스럽습니다.",
        "likes": 19
      },
      {
        "id": "rev-prod-14-15",
        "author": "허*아",
        "rating": 5,
        "date": "2026-08-12",
        "content": "선물용으로 구매했는데 받는 사람이 너무 유용하다고 칭찬하네요.",
        "likes": 17
      },
      {
        "id": "rev-prod-14-16",
        "author": "노*태",
        "rating": 5,
        "date": "2026-08-09",
        "content": "화면이나 음질, 반응속도 등 기본기가 탄탄하게 잡혀있습니다.",
        "likes": 16
      },
      {
        "id": "rev-prod-14-17",
        "author": "남*현",
        "rating": 5,
        "date": "2026-08-06",
        "content": "한 손에 쏙 들어오는 그립감과 컴팩트함이 아주 매력적입니다.",
        "likes": 14
      },
      {
        "id": "rev-prod-14-18",
        "author": "심*호",
        "rating": 5,
        "date": "2026-08-03",
        "content": "기술력이 뛰어난 게 느껴지는 완성도 높은 IT 디바이스입니다.",
        "likes": 12
      },
      {
        "id": "rev-prod-14-19",
        "author": "김*훈",
        "rating": 4,
        "date": "2026-07-31",
        "content": "이지샵 디지털 제품은 항상 믿고 구매하게 됩니다.",
        "likes": 11
      },
      {
        "id": "rev-prod-14-20",
        "author": "이*서",
        "rating": 5,
        "date": "2026-07-28",
        "content": "별 5개가 아깝지 않은 최고의 디지털 가전입니다. 강추!",
        "likes": 9
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-14-1",
        "author": "홍*우",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-15",
    "name": "에르고노믹 알루미늄 노트북 거치대 스탠드",
    "category": "디지털 / 가전",
    "categoryId": "cat-digital",
    "price": 45000,
    "originalPrice": 62000,
    "discountRate": 27,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 78,
    "isBest": true,
    "isNew": false,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "풀 CNC 가공 항공 알루미늄, 360도 회전 및 무단 높이/각도 조절, 흔들림 없는 지지력",
    "description": "<h3>바른 자세를 위한 프리미엄 데스크테리어 필수품</h3><p>맥북부터 17인치 대화면 노트북까지 완벽 거치 가능한 듀얼 힌지 구조입니다.</p>",
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
      "호환": "10~17.3인치",
      "재질": "항공 알루미늄 합금",
      "최대하중": "10kg"
    },
    "reviews": [
      {
        "id": "rev-prod-15-1",
        "author": "박*은",
        "rating": 4,
        "date": "2026-09-29",
        "content": "에르고노믹 알루미늄 노트북 거치대 스탠드 성능이 기대 이상으로 훌륭합니다. 마감도 깔끔해요.",
        "likes": 42
      },
      {
        "id": "rev-prod-15-2",
        "author": "최*윤",
        "rating": 5,
        "date": "2026-09-26",
        "content": "연결이 빠르고 끊김 없이 안정적으로 동작해서 너무 편합니다.",
        "likes": 40
      },
      {
        "id": "rev-prod-15-3",
        "author": "정*민",
        "rating": 5,
        "date": "2026-09-23",
        "content": "디자인이 모던하고 미니멀해서 데스크테리어에 찰떡이에요.",
        "likes": 38
      },
      {
        "id": "rev-prod-15-4",
        "author": "강*지",
        "rating": 5,
        "date": "2026-09-20",
        "content": "배터리가 오래가서 충전 스트레스 없이 쓰고 있습니다.",
        "likes": 37
      },
      {
        "id": "rev-prod-15-5",
        "author": "조*정",
        "rating": 5,
        "date": "2026-09-17",
        "content": "버튼 조작감과 인터페이스가 직관적이라 사용하기 쉽네요.",
        "likes": 35
      },
      {
        "id": "rev-prod-15-6",
        "author": "윤*영",
        "rating": 5,
        "date": "2026-09-14",
        "content": "무게가 가벼워서 휴대하고 다니기에 부담이 전혀 없습니다.",
        "likes": 34
      },
      {
        "id": "rev-prod-15-7",
        "author": "장*원",
        "rating": 4,
        "date": "2026-09-11",
        "content": "가격 대비 스펙이 아주 훌륭한 가성비 종결템입니다.",
        "likes": 32
      },
      {
        "id": "rev-prod-15-8",
        "author": "임*린",
        "rating": 5,
        "date": "2026-09-08",
        "content": "패키징도 꼼꼼하고 충전 케이블 등 부속품 퀄리티도 좋아요.",
        "likes": 30
      },
      {
        "id": "rev-prod-15-9",
        "author": "한*준",
        "rating": 5,
        "date": "2026-09-05",
        "content": "업무 효율이 확실히 올라갔습니다. 재택근무 필수품이에요.",
        "likes": 29
      },
      {
        "id": "rev-prod-15-10",
        "author": "오*경",
        "rating": 5,
        "date": "2026-09-02",
        "content": "소음이나 발열이 적어서 장시간 사용해도 안심이 됩니다.",
        "likes": 27
      },
      {
        "id": "rev-prod-15-11",
        "author": "서*수",
        "rating": 5,
        "date": "2026-08-30",
        "content": "친구 추천으로 샀는데 왜 인기 많은지 알겠네요.",
        "likes": 26
      },
      {
        "id": "rev-prod-15-12",
        "author": "신*우",
        "rating": 5,
        "date": "2026-08-27",
        "content": "블루투스 페어링 속도가 1초 만에 바로 잡혀서 감탄했습니다.",
        "likes": 24
      },
      {
        "id": "rev-prod-15-13",
        "author": "권*희",
        "rating": 4,
        "date": "2026-08-24",
        "content": "내구성이 튼튼해서 오래오래 고장 없이 쓸 수 있을 것 같아요.",
        "likes": 22
      },
      {
        "id": "rev-prod-15-14",
        "author": "황*진",
        "rating": 5,
        "date": "2026-08-21",
        "content": "기능이 다양하면서도 불필요한 군더더기가 없어 만족스럽습니다.",
        "likes": 21
      },
      {
        "id": "rev-prod-15-15",
        "author": "안*아",
        "rating": 5,
        "date": "2026-08-18",
        "content": "선물용으로 구매했는데 받는 사람이 너무 유용하다고 칭찬하네요.",
        "likes": 19
      },
      {
        "id": "rev-prod-15-16",
        "author": "송*태",
        "rating": 5,
        "date": "2026-08-15",
        "content": "화면이나 음질, 반응속도 등 기본기가 탄탄하게 잡혀있습니다.",
        "likes": 18
      },
      {
        "id": "rev-prod-15-17",
        "author": "전*현",
        "rating": 5,
        "date": "2026-08-12",
        "content": "한 손에 쏙 들어오는 그립감과 컴팩트함이 아주 매력적입니다.",
        "likes": 16
      },
      {
        "id": "rev-prod-15-18",
        "author": "홍*호",
        "rating": 5,
        "date": "2026-08-09",
        "content": "기술력이 뛰어난 게 느껴지는 완성도 높은 IT 디바이스입니다.",
        "likes": 14
      },
      {
        "id": "rev-prod-15-19",
        "author": "유*훈",
        "rating": 4,
        "date": "2026-08-06",
        "content": "이지샵 디지털 제품은 항상 믿고 구매하게 됩니다.",
        "likes": 13
      },
      {
        "id": "rev-prod-15-20",
        "author": "고*서",
        "rating": 5,
        "date": "2026-08-03",
        "content": "별 5개가 아깝지 않은 최고의 디지털 가전입니다. 강추!",
        "likes": 11
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-15-1",
        "author": "유*희",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-16",
    "name": "초소형 GaN 65W 3포트 초고속 충전기 (C타입 2구 + A타입 1구)",
    "category": "디지털 / 가전",
    "categoryId": "cat-digital",
    "price": 38000,
    "originalPrice": 52000,
    "discountRate": 26,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 35,
    "isBest": true,
    "isNew": true,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "차세대 질화갈륨(GaN) 반도체 탑재, 노트북과 스마트폰을 동시에 초고속 충전",
    "description": "<h3>여행과 출장의 무게를 줄여주는 단 하나의 충전기</h3><p>신용카드보다 작은 크기에 65W PD 3.0 / PPS 출력을 지원하여 맥북, 갤럭시, 아이폰을 모두 최고 속도로 충전합니다.</p>",
    "options": [
      {
        "name": "매트 화이트",
        "stock": 40
      },
      {
        "name": "매트 블랙",
        "stock": 30
      }
    ],
    "specs": {
      "출력": "최대 65W (PD 3.0 / PPS)",
      "포트": "USB-C x 2, USB-A x 1",
      "무게": "115g"
    },
    "reviews": [
      {
        "id": "rev-prod-16-1",
        "author": "문*은",
        "rating": 4,
        "date": "2026-09-28",
        "content": "초소형 GaN 65W 3포트 초고속 충전기 (C타입 2구 + A타입 1구) 성능이 기대 이상으로 훌륭합니다. 마감도 깔끔해요.",
        "likes": 34
      },
      {
        "id": "rev-prod-16-2",
        "author": "양*윤",
        "rating": 5,
        "date": "2026-09-25",
        "content": "연결이 빠르고 끊김 없이 안정적으로 동작해서 너무 편합니다.",
        "likes": 32
      },
      {
        "id": "rev-prod-16-3",
        "author": "손*민",
        "rating": 5,
        "date": "2026-09-22",
        "content": "디자인이 모던하고 미니멀해서 데스크테리어에 찰떡이에요.",
        "likes": 30
      },
      {
        "id": "rev-prod-16-4",
        "author": "배*지",
        "rating": 5,
        "date": "2026-09-19",
        "content": "배터리가 오래가서 충전 스트레스 없이 쓰고 있습니다.",
        "likes": 29
      },
      {
        "id": "rev-prod-16-5",
        "author": "백*정",
        "rating": 5,
        "date": "2026-09-16",
        "content": "버튼 조작감과 인터페이스가 직관적이라 사용하기 쉽네요.",
        "likes": 27
      },
      {
        "id": "rev-prod-16-6",
        "author": "허*영",
        "rating": 5,
        "date": "2026-09-13",
        "content": "무게가 가벼워서 휴대하고 다니기에 부담이 전혀 없습니다.",
        "likes": 26
      },
      {
        "id": "rev-prod-16-7",
        "author": "노*원",
        "rating": 4,
        "date": "2026-09-10",
        "content": "가격 대비 스펙이 아주 훌륭한 가성비 종결템입니다.",
        "likes": 24
      },
      {
        "id": "rev-prod-16-8",
        "author": "남*린",
        "rating": 5,
        "date": "2026-09-07",
        "content": "패키징도 꼼꼼하고 충전 케이블 등 부속품 퀄리티도 좋아요.",
        "likes": 22
      },
      {
        "id": "rev-prod-16-9",
        "author": "심*준",
        "rating": 5,
        "date": "2026-09-04",
        "content": "업무 효율이 확실히 올라갔습니다. 재택근무 필수품이에요.",
        "likes": 21
      },
      {
        "id": "rev-prod-16-10",
        "author": "김*경",
        "rating": 5,
        "date": "2026-09-01",
        "content": "소음이나 발열이 적어서 장시간 사용해도 안심이 됩니다.",
        "likes": 19
      },
      {
        "id": "rev-prod-16-11",
        "author": "이*수",
        "rating": 5,
        "date": "2026-08-29",
        "content": "친구 추천으로 샀는데 왜 인기 많은지 알겠네요.",
        "likes": 18
      },
      {
        "id": "rev-prod-16-12",
        "author": "박*우",
        "rating": 5,
        "date": "2026-08-26",
        "content": "블루투스 페어링 속도가 1초 만에 바로 잡혀서 감탄했습니다.",
        "likes": 16
      },
      {
        "id": "rev-prod-16-13",
        "author": "최*희",
        "rating": 4,
        "date": "2026-08-23",
        "content": "내구성이 튼튼해서 오래오래 고장 없이 쓸 수 있을 것 같아요.",
        "likes": 14
      },
      {
        "id": "rev-prod-16-14",
        "author": "정*진",
        "rating": 5,
        "date": "2026-08-20",
        "content": "기능이 다양하면서도 불필요한 군더더기가 없어 만족스럽습니다.",
        "likes": 13
      },
      {
        "id": "rev-prod-16-15",
        "author": "강*아",
        "rating": 5,
        "date": "2026-08-17",
        "content": "선물용으로 구매했는데 받는 사람이 너무 유용하다고 칭찬하네요.",
        "likes": 11
      },
      {
        "id": "rev-prod-16-16",
        "author": "조*태",
        "rating": 5,
        "date": "2026-08-14",
        "content": "화면이나 음질, 반응속도 등 기본기가 탄탄하게 잡혀있습니다.",
        "likes": 10
      },
      {
        "id": "rev-prod-16-17",
        "author": "윤*현",
        "rating": 5,
        "date": "2026-08-11",
        "content": "한 손에 쏙 들어오는 그립감과 컴팩트함이 아주 매력적입니다.",
        "likes": 8
      },
      {
        "id": "rev-prod-16-18",
        "author": "장*호",
        "rating": 5,
        "date": "2026-08-08",
        "content": "기술력이 뛰어난 게 느껴지는 완성도 높은 IT 디바이스입니다.",
        "likes": 6
      },
      {
        "id": "rev-prod-16-19",
        "author": "임*훈",
        "rating": 4,
        "date": "2026-08-05",
        "content": "이지샵 디지털 제품은 항상 믿고 구매하게 됩니다.",
        "likes": 5
      },
      {
        "id": "rev-prod-16-20",
        "author": "한*서",
        "rating": 5,
        "date": "2026-08-02",
        "content": "별 5개가 아깝지 않은 최고의 디지털 가전입니다. 강추!",
        "likes": 3
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-16-1",
        "author": "고*진",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-17",
    "name": "스마트 무선 노이즈캔슬링 이어폰 에어핏 프로",
    "category": "디지털 / 가전",
    "categoryId": "cat-digital",
    "price": 89000,
    "originalPrice": 129000,
    "discountRate": 31,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 42,
    "isBest": false,
    "isNew": true,
    "isSale": true,
    "isFreeShipping": true,
    "thumbnail": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "40dB 액티브 노이즈 캔슬링, 6마이크 통화 소음 저감, 무선 충전 케이스 포함",
    "description": "<h3>귀에 쏙 감기는 가벼운 핏과 선명한 통화 품질</h3><p>단 3.8g의 초경량 이어버드로 하루 종일 착용해도 이물감이 없으며, 11mm 대구경 베릴륨 드라이버의 풍부한 베이스를 선사합니다.</p>",
    "options": [
      {
        "name": "퓨어 화이트",
        "stock": 35
      },
      {
        "name": "미드나잇 블랙",
        "stock": 25
      }
    ],
    "specs": {
      "재생시간": "이어버드 8시간, 케이스 포함 32시간",
      "방수": "IPX5 생활방수"
    },
    "reviews": [
      {
        "id": "rev-prod-17-1",
        "author": "오*은",
        "rating": 4,
        "date": "2026-09-27",
        "content": "스마트 무선 노이즈캔슬링 이어폰 에어핏 프로 성능이 기대 이상으로 훌륭합니다. 마감도 깔끔해요.",
        "likes": 36
      },
      {
        "id": "rev-prod-17-2",
        "author": "서*윤",
        "rating": 5,
        "date": "2026-09-24",
        "content": "연결이 빠르고 끊김 없이 안정적으로 동작해서 너무 편합니다.",
        "likes": 34
      },
      {
        "id": "rev-prod-17-3",
        "author": "신*민",
        "rating": 5,
        "date": "2026-09-21",
        "content": "디자인이 모던하고 미니멀해서 데스크테리어에 찰떡이에요.",
        "likes": 32
      },
      {
        "id": "rev-prod-17-4",
        "author": "권*지",
        "rating": 5,
        "date": "2026-09-18",
        "content": "배터리가 오래가서 충전 스트레스 없이 쓰고 있습니다.",
        "likes": 31
      },
      {
        "id": "rev-prod-17-5",
        "author": "황*정",
        "rating": 5,
        "date": "2026-09-15",
        "content": "버튼 조작감과 인터페이스가 직관적이라 사용하기 쉽네요.",
        "likes": 29
      },
      {
        "id": "rev-prod-17-6",
        "author": "안*영",
        "rating": 5,
        "date": "2026-09-12",
        "content": "무게가 가벼워서 휴대하고 다니기에 부담이 전혀 없습니다.",
        "likes": 28
      },
      {
        "id": "rev-prod-17-7",
        "author": "송*원",
        "rating": 4,
        "date": "2026-09-09",
        "content": "가격 대비 스펙이 아주 훌륭한 가성비 종결템입니다.",
        "likes": 26
      },
      {
        "id": "rev-prod-17-8",
        "author": "전*린",
        "rating": 5,
        "date": "2026-09-06",
        "content": "패키징도 꼼꼼하고 충전 케이블 등 부속품 퀄리티도 좋아요.",
        "likes": 24
      },
      {
        "id": "rev-prod-17-9",
        "author": "홍*준",
        "rating": 5,
        "date": "2026-09-03",
        "content": "업무 효율이 확실히 올라갔습니다. 재택근무 필수품이에요.",
        "likes": 23
      },
      {
        "id": "rev-prod-17-10",
        "author": "유*경",
        "rating": 5,
        "date": "2026-08-31",
        "content": "소음이나 발열이 적어서 장시간 사용해도 안심이 됩니다.",
        "likes": 21
      },
      {
        "id": "rev-prod-17-11",
        "author": "고*수",
        "rating": 5,
        "date": "2026-08-28",
        "content": "친구 추천으로 샀는데 왜 인기 많은지 알겠네요.",
        "likes": 20
      },
      {
        "id": "rev-prod-17-12",
        "author": "문*우",
        "rating": 5,
        "date": "2026-08-25",
        "content": "블루투스 페어링 속도가 1초 만에 바로 잡혀서 감탄했습니다.",
        "likes": 18
      },
      {
        "id": "rev-prod-17-13",
        "author": "양*희",
        "rating": 4,
        "date": "2026-08-22",
        "content": "내구성이 튼튼해서 오래오래 고장 없이 쓸 수 있을 것 같아요.",
        "likes": 16
      },
      {
        "id": "rev-prod-17-14",
        "author": "손*진",
        "rating": 5,
        "date": "2026-08-19",
        "content": "기능이 다양하면서도 불필요한 군더더기가 없어 만족스럽습니다.",
        "likes": 15
      },
      {
        "id": "rev-prod-17-15",
        "author": "배*아",
        "rating": 5,
        "date": "2026-08-16",
        "content": "선물용으로 구매했는데 받는 사람이 너무 유용하다고 칭찬하네요.",
        "likes": 13
      },
      {
        "id": "rev-prod-17-16",
        "author": "백*태",
        "rating": 5,
        "date": "2026-08-13",
        "content": "화면이나 음질, 반응속도 등 기본기가 탄탄하게 잡혀있습니다.",
        "likes": 12
      },
      {
        "id": "rev-prod-17-17",
        "author": "허*현",
        "rating": 5,
        "date": "2026-08-10",
        "content": "한 손에 쏙 들어오는 그립감과 컴팩트함이 아주 매력적입니다.",
        "likes": 10
      },
      {
        "id": "rev-prod-17-18",
        "author": "노*호",
        "rating": 5,
        "date": "2026-08-07",
        "content": "기술력이 뛰어난 게 느껴지는 완성도 높은 IT 디바이스입니다.",
        "likes": 8
      },
      {
        "id": "rev-prod-17-19",
        "author": "남*훈",
        "rating": 4,
        "date": "2026-08-04",
        "content": "이지샵 디지털 제품은 항상 믿고 구매하게 됩니다.",
        "likes": 7
      },
      {
        "id": "rev-prod-17-20",
        "author": "심*서",
        "rating": 5,
        "date": "2026-08-01",
        "content": "별 5개가 아깝지 않은 최고의 디지털 가전입니다. 강추!",
        "likes": 5
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-17-1",
        "author": "문*아",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-18",
    "name": "3in1 마그네틱 폴더블 무선 고속 충전 스탠드",
    "category": "디지털 / 가전",
    "categoryId": "cat-digital",
    "price": 49000,
    "originalPrice": 69000,
    "discountRate": 28,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 49,
    "isBest": true,
    "isNew": true,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "스마트폰 + 워치 + 이어폰을 동시에 충전, 여행 시 접어서 휴대 가능한 미니멀 디자인",
    "description": "<h3>지저분한 선 없는 깔끔한 데스크 충전 환경</h3><p>맥세이프 마그네틱 결합으로 가로/세로 거치가 자유로우며, 스탠바이 모드 디스플레이로 탁상시계처럼 활용할 수 있습니다.</p>",
    "options": [
      {
        "name": "스페이스 실버",
        "stock": 30
      },
      {
        "name": "딥 블랙",
        "stock": 25
      }
    ],
    "specs": {
      "출력": "스마트폰 15W + 워치 3W + 이어폰 5W",
      "재질": "알루미늄 합금"
    },
    "reviews": [
      {
        "id": "rev-prod-18-1",
        "author": "김*은",
        "rating": 4,
        "date": "2026-09-26",
        "content": "3in1 마그네틱 폴더블 무선 고속 충전 스탠드 성능이 기대 이상으로 훌륭합니다. 마감도 깔끔해요.",
        "likes": 38
      },
      {
        "id": "rev-prod-18-2",
        "author": "이*윤",
        "rating": 5,
        "date": "2026-09-23",
        "content": "연결이 빠르고 끊김 없이 안정적으로 동작해서 너무 편합니다.",
        "likes": 36
      },
      {
        "id": "rev-prod-18-3",
        "author": "박*민",
        "rating": 5,
        "date": "2026-09-20",
        "content": "디자인이 모던하고 미니멀해서 데스크테리어에 찰떡이에요.",
        "likes": 34
      },
      {
        "id": "rev-prod-18-4",
        "author": "최*지",
        "rating": 5,
        "date": "2026-09-17",
        "content": "배터리가 오래가서 충전 스트레스 없이 쓰고 있습니다.",
        "likes": 33
      },
      {
        "id": "rev-prod-18-5",
        "author": "정*정",
        "rating": 5,
        "date": "2026-09-14",
        "content": "버튼 조작감과 인터페이스가 직관적이라 사용하기 쉽네요.",
        "likes": 31
      },
      {
        "id": "rev-prod-18-6",
        "author": "강*영",
        "rating": 5,
        "date": "2026-09-11",
        "content": "무게가 가벼워서 휴대하고 다니기에 부담이 전혀 없습니다.",
        "likes": 30
      },
      {
        "id": "rev-prod-18-7",
        "author": "조*원",
        "rating": 4,
        "date": "2026-09-08",
        "content": "가격 대비 스펙이 아주 훌륭한 가성비 종결템입니다.",
        "likes": 28
      },
      {
        "id": "rev-prod-18-8",
        "author": "윤*린",
        "rating": 5,
        "date": "2026-09-05",
        "content": "패키징도 꼼꼼하고 충전 케이블 등 부속품 퀄리티도 좋아요.",
        "likes": 26
      },
      {
        "id": "rev-prod-18-9",
        "author": "장*준",
        "rating": 5,
        "date": "2026-09-02",
        "content": "업무 효율이 확실히 올라갔습니다. 재택근무 필수품이에요.",
        "likes": 25
      },
      {
        "id": "rev-prod-18-10",
        "author": "임*경",
        "rating": 5,
        "date": "2026-08-30",
        "content": "소음이나 발열이 적어서 장시간 사용해도 안심이 됩니다.",
        "likes": 23
      },
      {
        "id": "rev-prod-18-11",
        "author": "한*수",
        "rating": 5,
        "date": "2026-08-27",
        "content": "친구 추천으로 샀는데 왜 인기 많은지 알겠네요.",
        "likes": 22
      },
      {
        "id": "rev-prod-18-12",
        "author": "오*우",
        "rating": 5,
        "date": "2026-08-24",
        "content": "블루투스 페어링 속도가 1초 만에 바로 잡혀서 감탄했습니다.",
        "likes": 20
      },
      {
        "id": "rev-prod-18-13",
        "author": "서*희",
        "rating": 4,
        "date": "2026-08-21",
        "content": "내구성이 튼튼해서 오래오래 고장 없이 쓸 수 있을 것 같아요.",
        "likes": 18
      },
      {
        "id": "rev-prod-18-14",
        "author": "신*진",
        "rating": 5,
        "date": "2026-08-18",
        "content": "기능이 다양하면서도 불필요한 군더더기가 없어 만족스럽습니다.",
        "likes": 17
      },
      {
        "id": "rev-prod-18-15",
        "author": "권*아",
        "rating": 5,
        "date": "2026-08-15",
        "content": "선물용으로 구매했는데 받는 사람이 너무 유용하다고 칭찬하네요.",
        "likes": 15
      },
      {
        "id": "rev-prod-18-16",
        "author": "황*태",
        "rating": 5,
        "date": "2026-08-12",
        "content": "화면이나 음질, 반응속도 등 기본기가 탄탄하게 잡혀있습니다.",
        "likes": 14
      },
      {
        "id": "rev-prod-18-17",
        "author": "안*현",
        "rating": 5,
        "date": "2026-08-09",
        "content": "한 손에 쏙 들어오는 그립감과 컴팩트함이 아주 매력적입니다.",
        "likes": 12
      },
      {
        "id": "rev-prod-18-18",
        "author": "송*호",
        "rating": 5,
        "date": "2026-08-06",
        "content": "기술력이 뛰어난 게 느껴지는 완성도 높은 IT 디바이스입니다.",
        "likes": 10
      },
      {
        "id": "rev-prod-18-19",
        "author": "전*훈",
        "rating": 4,
        "date": "2026-08-03",
        "content": "이지샵 디지털 제품은 항상 믿고 구매하게 됩니다.",
        "likes": 9
      },
      {
        "id": "rev-prod-18-20",
        "author": "홍*서",
        "rating": 5,
        "date": "2026-07-31",
        "content": "별 5개가 아깝지 않은 최고의 디지털 가전입니다. 강추!",
        "likes": 7
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-18-1",
        "author": "양*태",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-19",
    "name": "무소음 초음파 무선 탁상용 미니 가습기 500ml",
    "category": "디지털 / 가전",
    "categoryId": "cat-digital",
    "price": 29000,
    "originalPrice": 39000,
    "discountRate": 25,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 56,
    "isBest": false,
    "isNew": false,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1543459176-4426b37223ba?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1543459176-4426b37223ba?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "20dB 초저소음 미세 분무, 2000mAh 배터리 내장, 은은한 무드등 기능",
    "description": "<h3>건조한 사무실과 침실을 촉촉하게 채우는 힐링 가습기</h3><p>상부 급수 구조로 물 보충과 통세척이 간편하며, 수위 감지 자동 전원 차단 센서로 안전하게 사용할 수 있습니다.</p>",
    "options": [
      {
        "name": "스노우 화이트",
        "stock": 45
      },
      {
        "name": "파스텔 핑크",
        "stock": 20
      }
    ],
    "specs": {
      "수조용량": "500ml",
      "분무량": "시간당 50ml",
      "소음": "20dB 이하"
    },
    "reviews": [
      {
        "id": "rev-prod-19-1",
        "author": "유*은",
        "rating": 4,
        "date": "2026-09-25",
        "content": "무소음 초음파 무선 탁상용 미니 가습기 500ml 성능이 기대 이상으로 훌륭합니다. 마감도 깔끔해요.",
        "likes": 40
      },
      {
        "id": "rev-prod-19-2",
        "author": "고*윤",
        "rating": 5,
        "date": "2026-09-22",
        "content": "연결이 빠르고 끊김 없이 안정적으로 동작해서 너무 편합니다.",
        "likes": 38
      },
      {
        "id": "rev-prod-19-3",
        "author": "문*민",
        "rating": 5,
        "date": "2026-09-19",
        "content": "디자인이 모던하고 미니멀해서 데스크테리어에 찰떡이에요.",
        "likes": 36
      },
      {
        "id": "rev-prod-19-4",
        "author": "양*지",
        "rating": 5,
        "date": "2026-09-16",
        "content": "배터리가 오래가서 충전 스트레스 없이 쓰고 있습니다.",
        "likes": 35
      },
      {
        "id": "rev-prod-19-5",
        "author": "손*정",
        "rating": 5,
        "date": "2026-09-13",
        "content": "버튼 조작감과 인터페이스가 직관적이라 사용하기 쉽네요.",
        "likes": 33
      },
      {
        "id": "rev-prod-19-6",
        "author": "배*영",
        "rating": 5,
        "date": "2026-09-10",
        "content": "무게가 가벼워서 휴대하고 다니기에 부담이 전혀 없습니다.",
        "likes": 32
      },
      {
        "id": "rev-prod-19-7",
        "author": "백*원",
        "rating": 4,
        "date": "2026-09-07",
        "content": "가격 대비 스펙이 아주 훌륭한 가성비 종결템입니다.",
        "likes": 30
      },
      {
        "id": "rev-prod-19-8",
        "author": "허*린",
        "rating": 5,
        "date": "2026-09-04",
        "content": "패키징도 꼼꼼하고 충전 케이블 등 부속품 퀄리티도 좋아요.",
        "likes": 28
      },
      {
        "id": "rev-prod-19-9",
        "author": "노*준",
        "rating": 5,
        "date": "2026-09-01",
        "content": "업무 효율이 확실히 올라갔습니다. 재택근무 필수품이에요.",
        "likes": 27
      },
      {
        "id": "rev-prod-19-10",
        "author": "남*경",
        "rating": 5,
        "date": "2026-08-29",
        "content": "소음이나 발열이 적어서 장시간 사용해도 안심이 됩니다.",
        "likes": 25
      },
      {
        "id": "rev-prod-19-11",
        "author": "심*수",
        "rating": 5,
        "date": "2026-08-26",
        "content": "친구 추천으로 샀는데 왜 인기 많은지 알겠네요.",
        "likes": 24
      },
      {
        "id": "rev-prod-19-12",
        "author": "김*우",
        "rating": 5,
        "date": "2026-08-23",
        "content": "블루투스 페어링 속도가 1초 만에 바로 잡혀서 감탄했습니다.",
        "likes": 22
      },
      {
        "id": "rev-prod-19-13",
        "author": "이*희",
        "rating": 4,
        "date": "2026-08-20",
        "content": "내구성이 튼튼해서 오래오래 고장 없이 쓸 수 있을 것 같아요.",
        "likes": 20
      },
      {
        "id": "rev-prod-19-14",
        "author": "박*진",
        "rating": 5,
        "date": "2026-08-17",
        "content": "기능이 다양하면서도 불필요한 군더더기가 없어 만족스럽습니다.",
        "likes": 19
      },
      {
        "id": "rev-prod-19-15",
        "author": "최*아",
        "rating": 5,
        "date": "2026-08-14",
        "content": "선물용으로 구매했는데 받는 사람이 너무 유용하다고 칭찬하네요.",
        "likes": 17
      },
      {
        "id": "rev-prod-19-16",
        "author": "정*태",
        "rating": 5,
        "date": "2026-08-11",
        "content": "화면이나 음질, 반응속도 등 기본기가 탄탄하게 잡혀있습니다.",
        "likes": 16
      },
      {
        "id": "rev-prod-19-17",
        "author": "강*현",
        "rating": 5,
        "date": "2026-08-08",
        "content": "한 손에 쏙 들어오는 그립감과 컴팩트함이 아주 매력적입니다.",
        "likes": 14
      },
      {
        "id": "rev-prod-19-18",
        "author": "조*호",
        "rating": 5,
        "date": "2026-08-05",
        "content": "기술력이 뛰어난 게 느껴지는 완성도 높은 IT 디바이스입니다.",
        "likes": 12
      },
      {
        "id": "rev-prod-19-19",
        "author": "윤*훈",
        "rating": 4,
        "date": "2026-08-02",
        "content": "이지샵 디지털 제품은 항상 믿고 구매하게 됩니다.",
        "likes": 11
      },
      {
        "id": "rev-prod-19-20",
        "author": "장*서",
        "rating": 5,
        "date": "2026-07-30",
        "content": "별 5개가 아깝지 않은 최고의 디지털 가전입니다. 강추!",
        "likes": 9
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-19-1",
        "author": "손*현",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-20",
    "name": "슬림 마그네틱 맥세이프 보조배터리 10000mAh",
    "category": "디지털 / 가전",
    "categoryId": "cat-digital",
    "price": 39000,
    "originalPrice": 55000,
    "discountRate": 29,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 63,
    "isBest": true,
    "isNew": true,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1609592424368-b7f754fc32e3?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1609592424368-b7f754fc32e3?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "12mm 초슬림 두께, 강력한 15N 네오디뮴 자력, 20W 유무선 동시 고속 충전",
    "description": "<h3>폰 뒤에 착 붙이고 가볍게 외출하세요</h3><p>배터리 잔량을 직관적으로 보여주는 디지털 LED 인디케이터와 접이식 메탈 킥스탠드로 거치대 겸용으로 활용 가능합니다.</p>",
    "options": [
      {
        "name": "티타늄 그레이",
        "stock": 35
      },
      {
        "name": "펄 화이트",
        "stock": 25
      }
    ],
    "specs": {
      "용량": "10,000mAh",
      "유선출력": "20W PD",
      "무선출력": "15W Max"
    },
    "reviews": [
      {
        "id": "rev-prod-20-1",
        "author": "임*은",
        "rating": 4,
        "date": "2026-09-24",
        "content": "슬림 마그네틱 맥세이프 보조배터리 10000mAh 성능이 기대 이상으로 훌륭합니다. 마감도 깔끔해요.",
        "likes": 42
      },
      {
        "id": "rev-prod-20-2",
        "author": "한*윤",
        "rating": 5,
        "date": "2026-09-21",
        "content": "연결이 빠르고 끊김 없이 안정적으로 동작해서 너무 편합니다.",
        "likes": 40
      },
      {
        "id": "rev-prod-20-3",
        "author": "오*민",
        "rating": 5,
        "date": "2026-09-18",
        "content": "디자인이 모던하고 미니멀해서 데스크테리어에 찰떡이에요.",
        "likes": 38
      },
      {
        "id": "rev-prod-20-4",
        "author": "서*지",
        "rating": 5,
        "date": "2026-09-15",
        "content": "배터리가 오래가서 충전 스트레스 없이 쓰고 있습니다.",
        "likes": 37
      },
      {
        "id": "rev-prod-20-5",
        "author": "신*정",
        "rating": 5,
        "date": "2026-09-12",
        "content": "버튼 조작감과 인터페이스가 직관적이라 사용하기 쉽네요.",
        "likes": 35
      },
      {
        "id": "rev-prod-20-6",
        "author": "권*영",
        "rating": 5,
        "date": "2026-09-09",
        "content": "무게가 가벼워서 휴대하고 다니기에 부담이 전혀 없습니다.",
        "likes": 34
      },
      {
        "id": "rev-prod-20-7",
        "author": "황*원",
        "rating": 4,
        "date": "2026-09-06",
        "content": "가격 대비 스펙이 아주 훌륭한 가성비 종결템입니다.",
        "likes": 32
      },
      {
        "id": "rev-prod-20-8",
        "author": "안*린",
        "rating": 5,
        "date": "2026-09-03",
        "content": "패키징도 꼼꼼하고 충전 케이블 등 부속품 퀄리티도 좋아요.",
        "likes": 30
      },
      {
        "id": "rev-prod-20-9",
        "author": "송*준",
        "rating": 5,
        "date": "2026-08-31",
        "content": "업무 효율이 확실히 올라갔습니다. 재택근무 필수품이에요.",
        "likes": 29
      },
      {
        "id": "rev-prod-20-10",
        "author": "전*경",
        "rating": 5,
        "date": "2026-08-28",
        "content": "소음이나 발열이 적어서 장시간 사용해도 안심이 됩니다.",
        "likes": 27
      },
      {
        "id": "rev-prod-20-11",
        "author": "홍*수",
        "rating": 5,
        "date": "2026-08-25",
        "content": "친구 추천으로 샀는데 왜 인기 많은지 알겠네요.",
        "likes": 26
      },
      {
        "id": "rev-prod-20-12",
        "author": "유*우",
        "rating": 5,
        "date": "2026-08-22",
        "content": "블루투스 페어링 속도가 1초 만에 바로 잡혀서 감탄했습니다.",
        "likes": 24
      },
      {
        "id": "rev-prod-20-13",
        "author": "고*희",
        "rating": 4,
        "date": "2026-08-19",
        "content": "내구성이 튼튼해서 오래오래 고장 없이 쓸 수 있을 것 같아요.",
        "likes": 22
      },
      {
        "id": "rev-prod-20-14",
        "author": "문*진",
        "rating": 5,
        "date": "2026-08-16",
        "content": "기능이 다양하면서도 불필요한 군더더기가 없어 만족스럽습니다.",
        "likes": 21
      },
      {
        "id": "rev-prod-20-15",
        "author": "양*아",
        "rating": 5,
        "date": "2026-08-13",
        "content": "선물용으로 구매했는데 받는 사람이 너무 유용하다고 칭찬하네요.",
        "likes": 19
      },
      {
        "id": "rev-prod-20-16",
        "author": "손*태",
        "rating": 5,
        "date": "2026-08-10",
        "content": "화면이나 음질, 반응속도 등 기본기가 탄탄하게 잡혀있습니다.",
        "likes": 18
      },
      {
        "id": "rev-prod-20-17",
        "author": "배*현",
        "rating": 5,
        "date": "2026-08-07",
        "content": "한 손에 쏙 들어오는 그립감과 컴팩트함이 아주 매력적입니다.",
        "likes": 16
      },
      {
        "id": "rev-prod-20-18",
        "author": "백*호",
        "rating": 5,
        "date": "2026-08-04",
        "content": "기술력이 뛰어난 게 느껴지는 완성도 높은 IT 디바이스입니다.",
        "likes": 14
      },
      {
        "id": "rev-prod-20-19",
        "author": "허*훈",
        "rating": 4,
        "date": "2026-08-01",
        "content": "이지샵 디지털 제품은 항상 믿고 구매하게 됩니다.",
        "likes": 13
      },
      {
        "id": "rev-prod-20-20",
        "author": "노*서",
        "rating": 5,
        "date": "2026-07-29",
        "content": "별 5개가 아깝지 않은 최고의 디지털 가전입니다. 강추!",
        "likes": 11
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-20-1",
        "author": "배*호",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-21",
    "name": "스마트 블루투스 프리미엄 체지방 체중계 (BIA 16종 분석)",
    "category": "디지털 / 가전",
    "categoryId": "cat-digital",
    "price": 36000,
    "originalPrice": 49000,
    "discountRate": 26,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 70,
    "isBest": false,
    "isNew": false,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "골격근량, 체지방률, 기초대사량 등 16가지 신체 데이터 앱 자동 기록",
    "description": "<h3>매일 아침 건강을 디자인하는 스마트 헬스 파트너</h3><p>ITO 풀 글래스 고정밀 센서로 발 위치에 구애받지 않고 정확하게 측정하며, 애플 헬스 및 삼성 헬스와 완벽 연동됩니다.</p>",
    "options": [
      {
        "name": "클라우드 화이트",
        "stock": 40
      },
      {
        "name": "미드나잇 블랙",
        "stock": 20
      }
    ],
    "specs": {
      "측정항목": "16가지 BIA 지표",
      "연동": "전용 한국어 앱 (iOS/Android)",
      "강화유리": "6mm"
    },
    "reviews": [
      {
        "id": "rev-prod-21-1",
        "author": "남*은",
        "rating": 4,
        "date": "2026-09-23",
        "content": "스마트 블루투스 프리미엄 체지방 체중계 (BIA 16종 분석) 성능이 기대 이상으로 훌륭합니다. 마감도 깔끔해요.",
        "likes": 34
      },
      {
        "id": "rev-prod-21-2",
        "author": "심*윤",
        "rating": 5,
        "date": "2026-09-20",
        "content": "연결이 빠르고 끊김 없이 안정적으로 동작해서 너무 편합니다.",
        "likes": 32
      },
      {
        "id": "rev-prod-21-3",
        "author": "김*민",
        "rating": 5,
        "date": "2026-09-17",
        "content": "디자인이 모던하고 미니멀해서 데스크테리어에 찰떡이에요.",
        "likes": 30
      },
      {
        "id": "rev-prod-21-4",
        "author": "이*지",
        "rating": 5,
        "date": "2026-09-14",
        "content": "배터리가 오래가서 충전 스트레스 없이 쓰고 있습니다.",
        "likes": 29
      },
      {
        "id": "rev-prod-21-5",
        "author": "박*정",
        "rating": 5,
        "date": "2026-09-11",
        "content": "버튼 조작감과 인터페이스가 직관적이라 사용하기 쉽네요.",
        "likes": 27
      },
      {
        "id": "rev-prod-21-6",
        "author": "최*영",
        "rating": 5,
        "date": "2026-09-08",
        "content": "무게가 가벼워서 휴대하고 다니기에 부담이 전혀 없습니다.",
        "likes": 26
      },
      {
        "id": "rev-prod-21-7",
        "author": "정*원",
        "rating": 4,
        "date": "2026-09-05",
        "content": "가격 대비 스펙이 아주 훌륭한 가성비 종결템입니다.",
        "likes": 24
      },
      {
        "id": "rev-prod-21-8",
        "author": "강*린",
        "rating": 5,
        "date": "2026-09-02",
        "content": "패키징도 꼼꼼하고 충전 케이블 등 부속품 퀄리티도 좋아요.",
        "likes": 22
      },
      {
        "id": "rev-prod-21-9",
        "author": "조*준",
        "rating": 5,
        "date": "2026-08-30",
        "content": "업무 효율이 확실히 올라갔습니다. 재택근무 필수품이에요.",
        "likes": 21
      },
      {
        "id": "rev-prod-21-10",
        "author": "윤*경",
        "rating": 5,
        "date": "2026-08-27",
        "content": "소음이나 발열이 적어서 장시간 사용해도 안심이 됩니다.",
        "likes": 19
      },
      {
        "id": "rev-prod-21-11",
        "author": "장*수",
        "rating": 5,
        "date": "2026-08-24",
        "content": "친구 추천으로 샀는데 왜 인기 많은지 알겠네요.",
        "likes": 18
      },
      {
        "id": "rev-prod-21-12",
        "author": "임*우",
        "rating": 5,
        "date": "2026-08-21",
        "content": "블루투스 페어링 속도가 1초 만에 바로 잡혀서 감탄했습니다.",
        "likes": 16
      },
      {
        "id": "rev-prod-21-13",
        "author": "한*희",
        "rating": 4,
        "date": "2026-08-18",
        "content": "내구성이 튼튼해서 오래오래 고장 없이 쓸 수 있을 것 같아요.",
        "likes": 14
      },
      {
        "id": "rev-prod-21-14",
        "author": "오*진",
        "rating": 5,
        "date": "2026-08-15",
        "content": "기능이 다양하면서도 불필요한 군더더기가 없어 만족스럽습니다.",
        "likes": 13
      },
      {
        "id": "rev-prod-21-15",
        "author": "서*아",
        "rating": 5,
        "date": "2026-08-12",
        "content": "선물용으로 구매했는데 받는 사람이 너무 유용하다고 칭찬하네요.",
        "likes": 11
      },
      {
        "id": "rev-prod-21-16",
        "author": "신*태",
        "rating": 5,
        "date": "2026-08-09",
        "content": "화면이나 음질, 반응속도 등 기본기가 탄탄하게 잡혀있습니다.",
        "likes": 10
      },
      {
        "id": "rev-prod-21-17",
        "author": "권*현",
        "rating": 5,
        "date": "2026-08-06",
        "content": "한 손에 쏙 들어오는 그립감과 컴팩트함이 아주 매력적입니다.",
        "likes": 8
      },
      {
        "id": "rev-prod-21-18",
        "author": "황*호",
        "rating": 5,
        "date": "2026-08-03",
        "content": "기술력이 뛰어난 게 느껴지는 완성도 높은 IT 디바이스입니다.",
        "likes": 6
      },
      {
        "id": "rev-prod-21-19",
        "author": "안*훈",
        "rating": 4,
        "date": "2026-07-31",
        "content": "이지샵 디지털 제품은 항상 믿고 구매하게 됩니다.",
        "likes": 5
      },
      {
        "id": "rev-prod-21-20",
        "author": "송*서",
        "rating": 5,
        "date": "2026-07-28",
        "content": "별 5개가 아깝지 않은 최고의 디지털 가전입니다. 강추!",
        "likes": 3
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-21-1",
        "author": "백*훈",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-22",
    "name": "손목터널증후군 예방 무선 버티컬 인체공학 마우스",
    "category": "디지털 / 가전",
    "categoryId": "cat-digital",
    "price": 39000,
    "originalPrice": 55000,
    "discountRate": 29,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 77,
    "isBest": false,
    "isNew": true,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "57도 악수 그립 자연스러운 손목 각도, 무소음 클릭, 블루투스 & 2.4G 듀얼 무선",
    "description": "<h3>하루 8시간 마우스 잡는 직장인의 손목을 구하다</h3><p>손목 꺾임 없는 최적의 57도 인체공학 설계로 건초염과 피로를 방지하며, 충전식 배터리로 건전지 교체 없이 사용합니다.</p>",
    "options": [
      {
        "name": "차콜 그레이",
        "stock": 30
      },
      {
        "name": "밀크 베이지",
        "stock": 20
      }
    ],
    "specs": {
      "각도": "57도 버티컬",
      "연결": "BT 5.0 + 2.4GHz 무선",
      "DPI": "800/1200/1600/2400"
    },
    "reviews": [
      {
        "id": "rev-prod-22-1",
        "author": "전*은",
        "rating": 4,
        "date": "2026-09-29",
        "content": "손목터널증후군 예방 무선 버티컬 인체공학 마우스 성능이 기대 이상으로 훌륭합니다. 마감도 깔끔해요.",
        "likes": 36
      },
      {
        "id": "rev-prod-22-2",
        "author": "홍*윤",
        "rating": 5,
        "date": "2026-09-26",
        "content": "연결이 빠르고 끊김 없이 안정적으로 동작해서 너무 편합니다.",
        "likes": 34
      },
      {
        "id": "rev-prod-22-3",
        "author": "유*민",
        "rating": 5,
        "date": "2026-09-23",
        "content": "디자인이 모던하고 미니멀해서 데스크테리어에 찰떡이에요.",
        "likes": 32
      },
      {
        "id": "rev-prod-22-4",
        "author": "고*지",
        "rating": 5,
        "date": "2026-09-20",
        "content": "배터리가 오래가서 충전 스트레스 없이 쓰고 있습니다.",
        "likes": 31
      },
      {
        "id": "rev-prod-22-5",
        "author": "문*정",
        "rating": 5,
        "date": "2026-09-17",
        "content": "버튼 조작감과 인터페이스가 직관적이라 사용하기 쉽네요.",
        "likes": 29
      },
      {
        "id": "rev-prod-22-6",
        "author": "양*영",
        "rating": 5,
        "date": "2026-09-14",
        "content": "무게가 가벼워서 휴대하고 다니기에 부담이 전혀 없습니다.",
        "likes": 28
      },
      {
        "id": "rev-prod-22-7",
        "author": "손*원",
        "rating": 4,
        "date": "2026-09-11",
        "content": "가격 대비 스펙이 아주 훌륭한 가성비 종결템입니다.",
        "likes": 26
      },
      {
        "id": "rev-prod-22-8",
        "author": "배*린",
        "rating": 5,
        "date": "2026-09-08",
        "content": "패키징도 꼼꼼하고 충전 케이블 등 부속품 퀄리티도 좋아요.",
        "likes": 24
      },
      {
        "id": "rev-prod-22-9",
        "author": "백*준",
        "rating": 5,
        "date": "2026-09-05",
        "content": "업무 효율이 확실히 올라갔습니다. 재택근무 필수품이에요.",
        "likes": 23
      },
      {
        "id": "rev-prod-22-10",
        "author": "허*경",
        "rating": 5,
        "date": "2026-09-02",
        "content": "소음이나 발열이 적어서 장시간 사용해도 안심이 됩니다.",
        "likes": 21
      },
      {
        "id": "rev-prod-22-11",
        "author": "노*수",
        "rating": 5,
        "date": "2026-08-30",
        "content": "친구 추천으로 샀는데 왜 인기 많은지 알겠네요.",
        "likes": 20
      },
      {
        "id": "rev-prod-22-12",
        "author": "남*우",
        "rating": 5,
        "date": "2026-08-27",
        "content": "블루투스 페어링 속도가 1초 만에 바로 잡혀서 감탄했습니다.",
        "likes": 18
      },
      {
        "id": "rev-prod-22-13",
        "author": "심*희",
        "rating": 4,
        "date": "2026-08-24",
        "content": "내구성이 튼튼해서 오래오래 고장 없이 쓸 수 있을 것 같아요.",
        "likes": 16
      },
      {
        "id": "rev-prod-22-14",
        "author": "김*진",
        "rating": 5,
        "date": "2026-08-21",
        "content": "기능이 다양하면서도 불필요한 군더더기가 없어 만족스럽습니다.",
        "likes": 15
      },
      {
        "id": "rev-prod-22-15",
        "author": "이*아",
        "rating": 5,
        "date": "2026-08-18",
        "content": "선물용으로 구매했는데 받는 사람이 너무 유용하다고 칭찬하네요.",
        "likes": 13
      },
      {
        "id": "rev-prod-22-16",
        "author": "박*태",
        "rating": 5,
        "date": "2026-08-15",
        "content": "화면이나 음질, 반응속도 등 기본기가 탄탄하게 잡혀있습니다.",
        "likes": 12
      },
      {
        "id": "rev-prod-22-17",
        "author": "최*현",
        "rating": 5,
        "date": "2026-08-12",
        "content": "한 손에 쏙 들어오는 그립감과 컴팩트함이 아주 매력적입니다.",
        "likes": 10
      },
      {
        "id": "rev-prod-22-18",
        "author": "정*호",
        "rating": 5,
        "date": "2026-08-09",
        "content": "기술력이 뛰어난 게 느껴지는 완성도 높은 IT 디바이스입니다.",
        "likes": 8
      },
      {
        "id": "rev-prod-22-19",
        "author": "강*훈",
        "rating": 4,
        "date": "2026-08-06",
        "content": "이지샵 디지털 제품은 항상 믿고 구매하게 됩니다.",
        "likes": 7
      },
      {
        "id": "rev-prod-22-20",
        "author": "조*서",
        "rating": 5,
        "date": "2026-08-03",
        "content": "별 5개가 아깝지 않은 최고의 디지털 가전입니다. 강추!",
        "likes": 5
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-22-1",
        "author": "허*서",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-23",
    "name": "휴대용 무선 구강세정기 워터픽 300ml 대용량",
    "category": "디지털 / 가전",
    "categoryId": "cat-digital",
    "price": 49000,
    "originalPrice": 68000,
    "discountRate": 28,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 34,
    "isBest": false,
    "isNew": true,
    "isSale": true,
    "isFreeShipping": true,
    "thumbnail": "https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "분당 1800회 맥동 수압, IPX7 완전 방수, 4가지 맞춤 세정 모드 및 노즐 4종 증정",
    "description": "<h3>치과 스케일링 받은 듯 개운한 잇몸 케어</h3><p>미세한 맥동 수압이 칫솔이 닿지 않는 치간 이물질을 99.9% 완벽 제거하며, 300ml 대용량 물통으로 도중 물 보충 없이 한 번에 세정합니다.</p>",
    "options": [
      {
        "name": "매트 화이트 (노즐 4종 포함)",
        "stock": 35
      },
      {
        "name": "아쿠아 블루 (노즐 4종 포함)",
        "stock": 20
      }
    ],
    "specs": {
      "수압모드": "4단계",
      "물통용량": "300ml",
      "방수": "IPX7 완전방수"
    },
    "reviews": [
      {
        "id": "rev-prod-23-1",
        "author": "윤*은",
        "rating": 4,
        "date": "2026-09-28",
        "content": "휴대용 무선 구강세정기 워터픽 300ml 대용량 성능이 기대 이상으로 훌륭합니다. 마감도 깔끔해요.",
        "likes": 38
      },
      {
        "id": "rev-prod-23-2",
        "author": "장*윤",
        "rating": 5,
        "date": "2026-09-25",
        "content": "연결이 빠르고 끊김 없이 안정적으로 동작해서 너무 편합니다.",
        "likes": 36
      },
      {
        "id": "rev-prod-23-3",
        "author": "임*민",
        "rating": 5,
        "date": "2026-09-22",
        "content": "디자인이 모던하고 미니멀해서 데스크테리어에 찰떡이에요.",
        "likes": 34
      },
      {
        "id": "rev-prod-23-4",
        "author": "한*지",
        "rating": 5,
        "date": "2026-09-19",
        "content": "배터리가 오래가서 충전 스트레스 없이 쓰고 있습니다.",
        "likes": 33
      },
      {
        "id": "rev-prod-23-5",
        "author": "오*정",
        "rating": 5,
        "date": "2026-09-16",
        "content": "버튼 조작감과 인터페이스가 직관적이라 사용하기 쉽네요.",
        "likes": 31
      },
      {
        "id": "rev-prod-23-6",
        "author": "서*영",
        "rating": 5,
        "date": "2026-09-13",
        "content": "무게가 가벼워서 휴대하고 다니기에 부담이 전혀 없습니다.",
        "likes": 30
      },
      {
        "id": "rev-prod-23-7",
        "author": "신*원",
        "rating": 4,
        "date": "2026-09-10",
        "content": "가격 대비 스펙이 아주 훌륭한 가성비 종결템입니다.",
        "likes": 28
      },
      {
        "id": "rev-prod-23-8",
        "author": "권*린",
        "rating": 5,
        "date": "2026-09-07",
        "content": "패키징도 꼼꼼하고 충전 케이블 등 부속품 퀄리티도 좋아요.",
        "likes": 26
      },
      {
        "id": "rev-prod-23-9",
        "author": "황*준",
        "rating": 5,
        "date": "2026-09-04",
        "content": "업무 효율이 확실히 올라갔습니다. 재택근무 필수품이에요.",
        "likes": 25
      },
      {
        "id": "rev-prod-23-10",
        "author": "안*경",
        "rating": 5,
        "date": "2026-09-01",
        "content": "소음이나 발열이 적어서 장시간 사용해도 안심이 됩니다.",
        "likes": 23
      },
      {
        "id": "rev-prod-23-11",
        "author": "송*수",
        "rating": 5,
        "date": "2026-08-29",
        "content": "친구 추천으로 샀는데 왜 인기 많은지 알겠네요.",
        "likes": 22
      },
      {
        "id": "rev-prod-23-12",
        "author": "전*우",
        "rating": 5,
        "date": "2026-08-26",
        "content": "블루투스 페어링 속도가 1초 만에 바로 잡혀서 감탄했습니다.",
        "likes": 20
      },
      {
        "id": "rev-prod-23-13",
        "author": "홍*희",
        "rating": 4,
        "date": "2026-08-23",
        "content": "내구성이 튼튼해서 오래오래 고장 없이 쓸 수 있을 것 같아요.",
        "likes": 18
      },
      {
        "id": "rev-prod-23-14",
        "author": "유*진",
        "rating": 5,
        "date": "2026-08-20",
        "content": "기능이 다양하면서도 불필요한 군더더기가 없어 만족스럽습니다.",
        "likes": 17
      },
      {
        "id": "rev-prod-23-15",
        "author": "고*아",
        "rating": 5,
        "date": "2026-08-17",
        "content": "선물용으로 구매했는데 받는 사람이 너무 유용하다고 칭찬하네요.",
        "likes": 15
      },
      {
        "id": "rev-prod-23-16",
        "author": "문*태",
        "rating": 5,
        "date": "2026-08-14",
        "content": "화면이나 음질, 반응속도 등 기본기가 탄탄하게 잡혀있습니다.",
        "likes": 14
      },
      {
        "id": "rev-prod-23-17",
        "author": "양*현",
        "rating": 5,
        "date": "2026-08-11",
        "content": "한 손에 쏙 들어오는 그립감과 컴팩트함이 아주 매력적입니다.",
        "likes": 12
      },
      {
        "id": "rev-prod-23-18",
        "author": "손*호",
        "rating": 5,
        "date": "2026-08-08",
        "content": "기술력이 뛰어난 게 느껴지는 완성도 높은 IT 디바이스입니다.",
        "likes": 10
      },
      {
        "id": "rev-prod-23-19",
        "author": "배*훈",
        "rating": 4,
        "date": "2026-08-05",
        "content": "이지샵 디지털 제품은 항상 믿고 구매하게 됩니다.",
        "likes": 9
      },
      {
        "id": "rev-prod-23-20",
        "author": "백*서",
        "rating": 5,
        "date": "2026-08-02",
        "content": "별 5개가 아깝지 않은 최고의 디지털 가전입니다. 강추!",
        "likes": 7
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-23-1",
        "author": "노*은",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-24",
    "name": "스마트 미니 휴대용 빔프로젝터 FHD 1080P",
    "category": "디지털 / 가전",
    "categoryId": "cat-digital",
    "price": 189000,
    "originalPrice": 259000,
    "discountRate": 27,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 41,
    "isBest": true,
    "isNew": true,
    "isSale": true,
    "isFreeShipping": true,
    "thumbnail": "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "안드로이드 OS 자체 탑재, 오토 포커스 & 자동 키스톤, 최대 150인치 대화면",
    "description": "<h3>침실과 캠핑장을 영화관으로 만드는 마법</h3><p>넷플릭스, 유튜브를 스마트폰 연결 없이 자체 앱으로 바로 시청 가능하며, 180도 회전 힌지로 천장 투사도 완벽 지원합니다.</p>",
    "options": [
      {
        "name": "스노우 화이트",
        "stock": 20
      },
      {
        "name": "다크 그레이",
        "stock": 15
      }
    ],
    "specs": {
      "해상도": "Native 1080P FHD",
      "밝기": "350 ANSI 루멘",
      "스피커": "Hi-Fi 스테레오 5W"
    },
    "reviews": [
      {
        "id": "rev-prod-24-1",
        "author": "허*은",
        "rating": 4,
        "date": "2026-09-27",
        "content": "스마트 미니 휴대용 빔프로젝터 FHD 1080P 성능이 기대 이상으로 훌륭합니다. 마감도 깔끔해요.",
        "likes": 40
      },
      {
        "id": "rev-prod-24-2",
        "author": "노*윤",
        "rating": 5,
        "date": "2026-09-24",
        "content": "연결이 빠르고 끊김 없이 안정적으로 동작해서 너무 편합니다.",
        "likes": 38
      },
      {
        "id": "rev-prod-24-3",
        "author": "남*민",
        "rating": 5,
        "date": "2026-09-21",
        "content": "디자인이 모던하고 미니멀해서 데스크테리어에 찰떡이에요.",
        "likes": 36
      },
      {
        "id": "rev-prod-24-4",
        "author": "심*지",
        "rating": 5,
        "date": "2026-09-18",
        "content": "배터리가 오래가서 충전 스트레스 없이 쓰고 있습니다.",
        "likes": 35
      },
      {
        "id": "rev-prod-24-5",
        "author": "김*정",
        "rating": 5,
        "date": "2026-09-15",
        "content": "버튼 조작감과 인터페이스가 직관적이라 사용하기 쉽네요.",
        "likes": 33
      },
      {
        "id": "rev-prod-24-6",
        "author": "이*영",
        "rating": 5,
        "date": "2026-09-12",
        "content": "무게가 가벼워서 휴대하고 다니기에 부담이 전혀 없습니다.",
        "likes": 32
      },
      {
        "id": "rev-prod-24-7",
        "author": "박*원",
        "rating": 4,
        "date": "2026-09-09",
        "content": "가격 대비 스펙이 아주 훌륭한 가성비 종결템입니다.",
        "likes": 30
      },
      {
        "id": "rev-prod-24-8",
        "author": "최*린",
        "rating": 5,
        "date": "2026-09-06",
        "content": "패키징도 꼼꼼하고 충전 케이블 등 부속품 퀄리티도 좋아요.",
        "likes": 28
      },
      {
        "id": "rev-prod-24-9",
        "author": "정*준",
        "rating": 5,
        "date": "2026-09-03",
        "content": "업무 효율이 확실히 올라갔습니다. 재택근무 필수품이에요.",
        "likes": 27
      },
      {
        "id": "rev-prod-24-10",
        "author": "강*경",
        "rating": 5,
        "date": "2026-08-31",
        "content": "소음이나 발열이 적어서 장시간 사용해도 안심이 됩니다.",
        "likes": 25
      },
      {
        "id": "rev-prod-24-11",
        "author": "조*수",
        "rating": 5,
        "date": "2026-08-28",
        "content": "친구 추천으로 샀는데 왜 인기 많은지 알겠네요.",
        "likes": 24
      },
      {
        "id": "rev-prod-24-12",
        "author": "윤*우",
        "rating": 5,
        "date": "2026-08-25",
        "content": "블루투스 페어링 속도가 1초 만에 바로 잡혀서 감탄했습니다.",
        "likes": 22
      },
      {
        "id": "rev-prod-24-13",
        "author": "장*희",
        "rating": 4,
        "date": "2026-08-22",
        "content": "내구성이 튼튼해서 오래오래 고장 없이 쓸 수 있을 것 같아요.",
        "likes": 20
      },
      {
        "id": "rev-prod-24-14",
        "author": "임*진",
        "rating": 5,
        "date": "2026-08-19",
        "content": "기능이 다양하면서도 불필요한 군더더기가 없어 만족스럽습니다.",
        "likes": 19
      },
      {
        "id": "rev-prod-24-15",
        "author": "한*아",
        "rating": 5,
        "date": "2026-08-16",
        "content": "선물용으로 구매했는데 받는 사람이 너무 유용하다고 칭찬하네요.",
        "likes": 17
      },
      {
        "id": "rev-prod-24-16",
        "author": "오*태",
        "rating": 5,
        "date": "2026-08-13",
        "content": "화면이나 음질, 반응속도 등 기본기가 탄탄하게 잡혀있습니다.",
        "likes": 16
      },
      {
        "id": "rev-prod-24-17",
        "author": "서*현",
        "rating": 5,
        "date": "2026-08-10",
        "content": "한 손에 쏙 들어오는 그립감과 컴팩트함이 아주 매력적입니다.",
        "likes": 14
      },
      {
        "id": "rev-prod-24-18",
        "author": "신*호",
        "rating": 5,
        "date": "2026-08-07",
        "content": "기술력이 뛰어난 게 느껴지는 완성도 높은 IT 디바이스입니다.",
        "likes": 12
      },
      {
        "id": "rev-prod-24-19",
        "author": "권*훈",
        "rating": 4,
        "date": "2026-08-04",
        "content": "이지샵 디지털 제품은 항상 믿고 구매하게 됩니다.",
        "likes": 11
      },
      {
        "id": "rev-prod-24-20",
        "author": "황*서",
        "rating": 5,
        "date": "2026-08-01",
        "content": "별 5개가 아깝지 않은 최고의 디지털 가전입니다. 강추!",
        "likes": 9
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-24-1",
        "author": "남*윤",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-25",
    "name": "글로우 리바이탈라이징 나이트 앰플 세럼 50ml",
    "category": "뷰티 / 케어",
    "categoryId": "cat-beauty",
    "price": 46000,
    "originalPrice": 68000,
    "discountRate": 32,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 48,
    "isBest": true,
    "isNew": true,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "8중 히알루론산 & 펩타이드 콤플렉스, 밤사이 되살아나는 탄력 수분 광채",
    "description": "<h3>피부 깊숙이 채워지는 밤샘 수분 탄력 케어</h3><p>피부 장벽을 탄탄하게 가꿔주는 8중 복합 히알루론산과 콜라겐 생성에 도움을 주는 고농축 펩타이드 성분이 밤사이 지친 피부에 생기를 불어넣어 줍니다.</p>",
    "options": [
      {
        "name": "단품 50ml",
        "stock": 50
      },
      {
        "name": "기획세트 (50ml + 미니어처 15ml)",
        "stock": 30
      }
    ],
    "specs": {
      "용량": "50ml",
      "피부타입": "모든 피부용 (민감성 테스트 완료)"
    },
    "reviews": [
      {
        "id": "rev-prod-25-1",
        "author": "안*은",
        "rating": 4,
        "date": "2026-09-26",
        "content": "글로우 리바이탈라이징 나이트 앰플 세럼 50ml 바르자마자 피부에 쏙 흡수되고 촉촉함이 오래가요.",
        "likes": 42
      },
      {
        "id": "rev-prod-25-2",
        "author": "송*윤",
        "rating": 5,
        "date": "2026-09-23",
        "content": "속건조가 심한 편인데 이거 바르고 당김이 싹 사라졌습니다.",
        "likes": 40
      },
      {
        "id": "rev-prod-25-3",
        "author": "전*민",
        "rating": 5,
        "date": "2026-09-20",
        "content": "순한 성분이라 민감한 제 피부에도 자극 없이 편안하네요.",
        "likes": 38
      },
      {
        "id": "rev-prod-25-4",
        "author": "홍*지",
        "rating": 5,
        "date": "2026-09-17",
        "content": "다음날 아침 화장이 들뜸 없이 찰떡같이 잘 먹어서 감동했어요.",
        "likes": 37
      },
      {
        "id": "rev-prod-25-5",
        "author": "유*정",
        "rating": 5,
        "date": "2026-09-14",
        "content": "향이 인공적이지 않고 은은해서 스킨케어할 때 힐링됩니다.",
        "likes": 35
      },
      {
        "id": "rev-prod-25-6",
        "author": "고*영",
        "rating": 5,
        "date": "2026-09-11",
        "content": "끈적임 없이 산뜻하게 마무리되어 계절 불문 데일리로 좋아요.",
        "likes": 34
      },
      {
        "id": "rev-prod-25-7",
        "author": "문*원",
        "rating": 4,
        "date": "2026-09-08",
        "content": "피부 결이 매끄러워지고 톤이 한층 맑아진 느낌입니다.",
        "likes": 32
      },
      {
        "id": "rev-prod-25-8",
        "author": "양*린",
        "rating": 5,
        "date": "2026-09-05",
        "content": "용기도 위생적이고 양 조절하기 쉬워서 사용하기 편합니다.",
        "likes": 30
      },
      {
        "id": "rev-prod-25-9",
        "author": "손*준",
        "rating": 5,
        "date": "2026-09-02",
        "content": "용량 대비 가격도 착하고 성분도 착해서 대만족이에요.",
        "likes": 29
      },
      {
        "id": "rev-prod-25-10",
        "author": "배*경",
        "rating": 5,
        "date": "2026-08-30",
        "content": "어머니께 선물해 드렸는데 너무 좋다고 또 사달라고 하셨어요.",
        "likes": 27
      },
      {
        "id": "rev-prod-25-11",
        "author": "백*수",
        "rating": 5,
        "date": "2026-08-27",
        "content": "붉은기 진정과 보습 장벽 강화에 확실히 효과를 봤습니다.",
        "likes": 26
      },
      {
        "id": "rev-prod-25-12",
        "author": "허*우",
        "rating": 5,
        "date": "2026-08-24",
        "content": "비건 인증 제품이라 안심하고 온 가족이 함께 쓰고 있습니다.",
        "likes": 24
      },
      {
        "id": "rev-prod-25-13",
        "author": "노*희",
        "rating": 4,
        "date": "2026-08-21",
        "content": "발림성이 부드럽고 소량으로도 얼굴 전체에 촉촉하게 펴 발려요.",
        "likes": 22
      },
      {
        "id": "rev-prod-25-14",
        "author": "남*진",
        "rating": 5,
        "date": "2026-08-18",
        "content": "벌써 2통째 비우고 있는 저의 찐 정착템입니다.",
        "likes": 21
      },
      {
        "id": "rev-prod-25-15",
        "author": "심*아",
        "rating": 5,
        "date": "2026-08-15",
        "content": "피부과 케어 받은 것처럼 피부가 쫀쫀하고 탄력 있어 보여요.",
        "likes": 19
      },
      {
        "id": "rev-prod-25-16",
        "author": "김*태",
        "rating": 5,
        "date": "2026-08-12",
        "content": "선물 포장도 예쁘게 와서 생일 선물용으로도 완벽합니다.",
        "likes": 18
      },
      {
        "id": "rev-prod-25-17",
        "author": "이*현",
        "rating": 5,
        "date": "2026-08-09",
        "content": "유수분 밸런스를 딱 맞춰줘서 번들거림 없이 촉촉합니다.",
        "likes": 16
      },
      {
        "id": "rev-prod-25-18",
        "author": "박*호",
        "rating": 5,
        "date": "2026-08-06",
        "content": "기초 라인 이것저것 방황하다가 드디어 인생템 정착했습니다.",
        "likes": 14
      },
      {
        "id": "rev-prod-25-19",
        "author": "최*훈",
        "rating": 4,
        "date": "2026-08-03",
        "content": "트러블 유발 없이 순하게 피부 컨디션을 끌어올려 줍니다.",
        "likes": 13
      },
      {
        "id": "rev-prod-25-20",
        "author": "정*서",
        "rating": 5,
        "date": "2026-07-31",
        "content": "피부 고민 있으신 분들은 꼭 한번 써보세요. 강력 추천!",
        "likes": 11
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-25-1",
        "author": "심*민",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-26",
    "name": "비건 세라마이드 보습 장벽 수분크림 100ml",
    "category": "뷰티 / 케어",
    "categoryId": "cat-beauty",
    "price": 34000,
    "originalPrice": 48000,
    "discountRate": 29,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 55,
    "isBest": false,
    "isNew": false,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "100시간 보습 지속력 임상 완료, 5종 세라마이드로 무너진 피부 장벽 급속 리셋",
    "description": "<h3>속건조 완벽 해결, 순한 비건 보습막</h3><p>EWG 그린 등급 원료만을 사용하여 민감성 피부도 안심하고 사용할 수 있는 고보습 장벽 크림입니다.</p>",
    "options": [
      {
        "name": "본품 100ml 튜브형",
        "stock": 45
      },
      {
        "name": "대용량 200ml 펌프형",
        "stock": 20
      }
    ],
    "specs": {
      "용량": "100ml / 200ml",
      "인증": "이탈리아 V-LABEL 비건 인증"
    },
    "reviews": [
      {
        "id": "rev-prod-26-1",
        "author": "강*은",
        "rating": 4,
        "date": "2026-09-25",
        "content": "비건 세라마이드 보습 장벽 수분크림 100ml 바르자마자 피부에 쏙 흡수되고 촉촉함이 오래가요.",
        "likes": 34
      },
      {
        "id": "rev-prod-26-2",
        "author": "조*윤",
        "rating": 5,
        "date": "2026-09-22",
        "content": "속건조가 심한 편인데 이거 바르고 당김이 싹 사라졌습니다.",
        "likes": 32
      },
      {
        "id": "rev-prod-26-3",
        "author": "윤*민",
        "rating": 5,
        "date": "2026-09-19",
        "content": "순한 성분이라 민감한 제 피부에도 자극 없이 편안하네요.",
        "likes": 30
      },
      {
        "id": "rev-prod-26-4",
        "author": "장*지",
        "rating": 5,
        "date": "2026-09-16",
        "content": "다음날 아침 화장이 들뜸 없이 찰떡같이 잘 먹어서 감동했어요.",
        "likes": 29
      },
      {
        "id": "rev-prod-26-5",
        "author": "임*정",
        "rating": 5,
        "date": "2026-09-13",
        "content": "향이 인공적이지 않고 은은해서 스킨케어할 때 힐링됩니다.",
        "likes": 27
      },
      {
        "id": "rev-prod-26-6",
        "author": "한*영",
        "rating": 5,
        "date": "2026-09-10",
        "content": "끈적임 없이 산뜻하게 마무리되어 계절 불문 데일리로 좋아요.",
        "likes": 26
      },
      {
        "id": "rev-prod-26-7",
        "author": "오*원",
        "rating": 4,
        "date": "2026-09-07",
        "content": "피부 결이 매끄러워지고 톤이 한층 맑아진 느낌입니다.",
        "likes": 24
      },
      {
        "id": "rev-prod-26-8",
        "author": "서*린",
        "rating": 5,
        "date": "2026-09-04",
        "content": "용기도 위생적이고 양 조절하기 쉬워서 사용하기 편합니다.",
        "likes": 22
      },
      {
        "id": "rev-prod-26-9",
        "author": "신*준",
        "rating": 5,
        "date": "2026-09-01",
        "content": "용량 대비 가격도 착하고 성분도 착해서 대만족이에요.",
        "likes": 21
      },
      {
        "id": "rev-prod-26-10",
        "author": "권*경",
        "rating": 5,
        "date": "2026-08-29",
        "content": "어머니께 선물해 드렸는데 너무 좋다고 또 사달라고 하셨어요.",
        "likes": 19
      },
      {
        "id": "rev-prod-26-11",
        "author": "황*수",
        "rating": 5,
        "date": "2026-08-26",
        "content": "붉은기 진정과 보습 장벽 강화에 확실히 효과를 봤습니다.",
        "likes": 18
      },
      {
        "id": "rev-prod-26-12",
        "author": "안*우",
        "rating": 5,
        "date": "2026-08-23",
        "content": "비건 인증 제품이라 안심하고 온 가족이 함께 쓰고 있습니다.",
        "likes": 16
      },
      {
        "id": "rev-prod-26-13",
        "author": "송*희",
        "rating": 4,
        "date": "2026-08-20",
        "content": "발림성이 부드럽고 소량으로도 얼굴 전체에 촉촉하게 펴 발려요.",
        "likes": 14
      },
      {
        "id": "rev-prod-26-14",
        "author": "전*진",
        "rating": 5,
        "date": "2026-08-17",
        "content": "벌써 2통째 비우고 있는 저의 찐 정착템입니다.",
        "likes": 13
      },
      {
        "id": "rev-prod-26-15",
        "author": "홍*아",
        "rating": 5,
        "date": "2026-08-14",
        "content": "피부과 케어 받은 것처럼 피부가 쫀쫀하고 탄력 있어 보여요.",
        "likes": 11
      },
      {
        "id": "rev-prod-26-16",
        "author": "유*태",
        "rating": 5,
        "date": "2026-08-11",
        "content": "선물 포장도 예쁘게 와서 생일 선물용으로도 완벽합니다.",
        "likes": 10
      },
      {
        "id": "rev-prod-26-17",
        "author": "고*현",
        "rating": 5,
        "date": "2026-08-08",
        "content": "유수분 밸런스를 딱 맞춰줘서 번들거림 없이 촉촉합니다.",
        "likes": 8
      },
      {
        "id": "rev-prod-26-18",
        "author": "문*호",
        "rating": 5,
        "date": "2026-08-05",
        "content": "기초 라인 이것저것 방황하다가 드디어 인생템 정착했습니다.",
        "likes": 6
      },
      {
        "id": "rev-prod-26-19",
        "author": "양*훈",
        "rating": 4,
        "date": "2026-08-02",
        "content": "트러블 유발 없이 순하게 피부 컨디션을 끌어올려 줍니다.",
        "likes": 5
      },
      {
        "id": "rev-prod-26-20",
        "author": "손*서",
        "rating": 5,
        "date": "2026-07-30",
        "content": "피부 고민 있으신 분들은 꼭 한번 써보세요. 강력 추천!",
        "likes": 3
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-26-1",
        "author": "김*지",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-27",
    "name": "시카 판테놀 급속 진정 토너 패드 (80매 대용량)",
    "category": "뷰티 / 케어",
    "categoryId": "cat-beauty",
    "price": 24000,
    "originalPrice": 32000,
    "discountRate": 25,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 62,
    "isBest": true,
    "isNew": true,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1608248597359-25f00e9cf67b?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1608248597359-25f00e9cf67b?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "병풀추출물 85% 함유, 100% 순면 엠보면과 부드러운 매끈면 듀얼 케어",
    "description": "<h3>울긋불긋 달아오른 민감 피부 3분 급속 진정팩</h3><p>지름 7cm 빅사이즈 패드로 양 볼과 이마에 얹어 진정 팩으로 활용하기 좋으며, 각질과 피지를 자극 없이 정돈합니다.</p>",
    "options": [
      {
        "name": "본품 80매 (에센스 200ml)",
        "stock": 60
      },
      {
        "name": "2개 묶음 세트 (80매 x 2)",
        "stock": 35
      }
    ],
    "specs": {
      "용량": "80매 (200ml)",
      "패드원단": "100% 무표백 순면"
    },
    "reviews": [
      {
        "id": "rev-prod-27-1",
        "author": "배*은",
        "rating": 4,
        "date": "2026-09-24",
        "content": "시카 판테놀 급속 진정 토너 패드 (80매 대용량) 바르자마자 피부에 쏙 흡수되고 촉촉함이 오래가요.",
        "likes": 36
      },
      {
        "id": "rev-prod-27-2",
        "author": "백*윤",
        "rating": 5,
        "date": "2026-09-21",
        "content": "속건조가 심한 편인데 이거 바르고 당김이 싹 사라졌습니다.",
        "likes": 34
      },
      {
        "id": "rev-prod-27-3",
        "author": "허*민",
        "rating": 5,
        "date": "2026-09-18",
        "content": "순한 성분이라 민감한 제 피부에도 자극 없이 편안하네요.",
        "likes": 32
      },
      {
        "id": "rev-prod-27-4",
        "author": "노*지",
        "rating": 5,
        "date": "2026-09-15",
        "content": "다음날 아침 화장이 들뜸 없이 찰떡같이 잘 먹어서 감동했어요.",
        "likes": 31
      },
      {
        "id": "rev-prod-27-5",
        "author": "남*정",
        "rating": 5,
        "date": "2026-09-12",
        "content": "향이 인공적이지 않고 은은해서 스킨케어할 때 힐링됩니다.",
        "likes": 29
      },
      {
        "id": "rev-prod-27-6",
        "author": "심*영",
        "rating": 5,
        "date": "2026-09-09",
        "content": "끈적임 없이 산뜻하게 마무리되어 계절 불문 데일리로 좋아요.",
        "likes": 28
      },
      {
        "id": "rev-prod-27-7",
        "author": "김*원",
        "rating": 4,
        "date": "2026-09-06",
        "content": "피부 결이 매끄러워지고 톤이 한층 맑아진 느낌입니다.",
        "likes": 26
      },
      {
        "id": "rev-prod-27-8",
        "author": "이*린",
        "rating": 5,
        "date": "2026-09-03",
        "content": "용기도 위생적이고 양 조절하기 쉬워서 사용하기 편합니다.",
        "likes": 24
      },
      {
        "id": "rev-prod-27-9",
        "author": "박*준",
        "rating": 5,
        "date": "2026-08-31",
        "content": "용량 대비 가격도 착하고 성분도 착해서 대만족이에요.",
        "likes": 23
      },
      {
        "id": "rev-prod-27-10",
        "author": "최*경",
        "rating": 5,
        "date": "2026-08-28",
        "content": "어머니께 선물해 드렸는데 너무 좋다고 또 사달라고 하셨어요.",
        "likes": 21
      },
      {
        "id": "rev-prod-27-11",
        "author": "정*수",
        "rating": 5,
        "date": "2026-08-25",
        "content": "붉은기 진정과 보습 장벽 강화에 확실히 효과를 봤습니다.",
        "likes": 20
      },
      {
        "id": "rev-prod-27-12",
        "author": "강*우",
        "rating": 5,
        "date": "2026-08-22",
        "content": "비건 인증 제품이라 안심하고 온 가족이 함께 쓰고 있습니다.",
        "likes": 18
      },
      {
        "id": "rev-prod-27-13",
        "author": "조*희",
        "rating": 4,
        "date": "2026-08-19",
        "content": "발림성이 부드럽고 소량으로도 얼굴 전체에 촉촉하게 펴 발려요.",
        "likes": 16
      },
      {
        "id": "rev-prod-27-14",
        "author": "윤*진",
        "rating": 5,
        "date": "2026-08-16",
        "content": "벌써 2통째 비우고 있는 저의 찐 정착템입니다.",
        "likes": 15
      },
      {
        "id": "rev-prod-27-15",
        "author": "장*아",
        "rating": 5,
        "date": "2026-08-13",
        "content": "피부과 케어 받은 것처럼 피부가 쫀쫀하고 탄력 있어 보여요.",
        "likes": 13
      },
      {
        "id": "rev-prod-27-16",
        "author": "임*태",
        "rating": 5,
        "date": "2026-08-10",
        "content": "선물 포장도 예쁘게 와서 생일 선물용으로도 완벽합니다.",
        "likes": 12
      },
      {
        "id": "rev-prod-27-17",
        "author": "한*현",
        "rating": 5,
        "date": "2026-08-07",
        "content": "유수분 밸런스를 딱 맞춰줘서 번들거림 없이 촉촉합니다.",
        "likes": 10
      },
      {
        "id": "rev-prod-27-18",
        "author": "오*호",
        "rating": 5,
        "date": "2026-08-04",
        "content": "기초 라인 이것저것 방황하다가 드디어 인생템 정착했습니다.",
        "likes": 8
      },
      {
        "id": "rev-prod-27-19",
        "author": "서*훈",
        "rating": 4,
        "date": "2026-08-01",
        "content": "트러블 유발 없이 순하게 피부 컨디션을 끌어올려 줍니다.",
        "likes": 7
      },
      {
        "id": "rev-prod-27-20",
        "author": "신*서",
        "rating": 5,
        "date": "2026-07-29",
        "content": "피부 고민 있으신 분들은 꼭 한번 써보세요. 강력 추천!",
        "likes": 5
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-27-1",
        "author": "이*정",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-28",
    "name": "비타민C 브라이트닝 수분 선크림 SPF50+ PA++++ (50ml)",
    "category": "뷰티 / 케어",
    "categoryId": "cat-beauty",
    "price": 26000,
    "originalPrice": 35000,
    "discountRate": 26,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 69,
    "isBest": false,
    "isNew": true,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "백탁 없는 투명 수분 로션 제형, 순수 비타민C 유도체로 자외선 차단과 톤업을 동시에",
    "description": "<h3>눈시림 없이 촉촉한 데일리 유기자차 선크림</h3><p>스킨케어 크림을 바른 듯 가볍게 밀착되어 메이크업 전 밀림이 없으며, 해양 생태계를 지키는 리프 세이프 포뮬러입니다.</p>",
    "options": [
      {
        "name": "단품 50ml",
        "stock": 50
      },
      {
        "name": "1+1 더블 기획세트 (50ml x 2)",
        "stock": 40
      }
    ],
    "specs": {
      "차단지수": "SPF50+ PA++++",
      "제형": "수분 에센스 로션"
    },
    "reviews": [
      {
        "id": "rev-prod-28-1",
        "author": "권*은",
        "rating": 4,
        "date": "2026-09-23",
        "content": "비타민C 브라이트닝 수분 선크림 SPF50+ PA++++ (50ml) 바르자마자 피부에 쏙 흡수되고 촉촉함이 오래가요.",
        "likes": 38
      },
      {
        "id": "rev-prod-28-2",
        "author": "황*윤",
        "rating": 5,
        "date": "2026-09-20",
        "content": "속건조가 심한 편인데 이거 바르고 당김이 싹 사라졌습니다.",
        "likes": 36
      },
      {
        "id": "rev-prod-28-3",
        "author": "안*민",
        "rating": 5,
        "date": "2026-09-17",
        "content": "순한 성분이라 민감한 제 피부에도 자극 없이 편안하네요.",
        "likes": 34
      },
      {
        "id": "rev-prod-28-4",
        "author": "송*지",
        "rating": 5,
        "date": "2026-09-14",
        "content": "다음날 아침 화장이 들뜸 없이 찰떡같이 잘 먹어서 감동했어요.",
        "likes": 33
      },
      {
        "id": "rev-prod-28-5",
        "author": "전*정",
        "rating": 5,
        "date": "2026-09-11",
        "content": "향이 인공적이지 않고 은은해서 스킨케어할 때 힐링됩니다.",
        "likes": 31
      },
      {
        "id": "rev-prod-28-6",
        "author": "홍*영",
        "rating": 5,
        "date": "2026-09-08",
        "content": "끈적임 없이 산뜻하게 마무리되어 계절 불문 데일리로 좋아요.",
        "likes": 30
      },
      {
        "id": "rev-prod-28-7",
        "author": "유*원",
        "rating": 4,
        "date": "2026-09-05",
        "content": "피부 결이 매끄러워지고 톤이 한층 맑아진 느낌입니다.",
        "likes": 28
      },
      {
        "id": "rev-prod-28-8",
        "author": "고*린",
        "rating": 5,
        "date": "2026-09-02",
        "content": "용기도 위생적이고 양 조절하기 쉬워서 사용하기 편합니다.",
        "likes": 26
      },
      {
        "id": "rev-prod-28-9",
        "author": "문*준",
        "rating": 5,
        "date": "2026-08-30",
        "content": "용량 대비 가격도 착하고 성분도 착해서 대만족이에요.",
        "likes": 25
      },
      {
        "id": "rev-prod-28-10",
        "author": "양*경",
        "rating": 5,
        "date": "2026-08-27",
        "content": "어머니께 선물해 드렸는데 너무 좋다고 또 사달라고 하셨어요.",
        "likes": 23
      },
      {
        "id": "rev-prod-28-11",
        "author": "손*수",
        "rating": 5,
        "date": "2026-08-24",
        "content": "붉은기 진정과 보습 장벽 강화에 확실히 효과를 봤습니다.",
        "likes": 22
      },
      {
        "id": "rev-prod-28-12",
        "author": "배*우",
        "rating": 5,
        "date": "2026-08-21",
        "content": "비건 인증 제품이라 안심하고 온 가족이 함께 쓰고 있습니다.",
        "likes": 20
      },
      {
        "id": "rev-prod-28-13",
        "author": "백*희",
        "rating": 4,
        "date": "2026-08-18",
        "content": "발림성이 부드럽고 소량으로도 얼굴 전체에 촉촉하게 펴 발려요.",
        "likes": 18
      },
      {
        "id": "rev-prod-28-14",
        "author": "허*진",
        "rating": 5,
        "date": "2026-08-15",
        "content": "벌써 2통째 비우고 있는 저의 찐 정착템입니다.",
        "likes": 17
      },
      {
        "id": "rev-prod-28-15",
        "author": "노*아",
        "rating": 5,
        "date": "2026-08-12",
        "content": "피부과 케어 받은 것처럼 피부가 쫀쫀하고 탄력 있어 보여요.",
        "likes": 15
      },
      {
        "id": "rev-prod-28-16",
        "author": "남*태",
        "rating": 5,
        "date": "2026-08-09",
        "content": "선물 포장도 예쁘게 와서 생일 선물용으로도 완벽합니다.",
        "likes": 14
      },
      {
        "id": "rev-prod-28-17",
        "author": "심*현",
        "rating": 5,
        "date": "2026-08-06",
        "content": "유수분 밸런스를 딱 맞춰줘서 번들거림 없이 촉촉합니다.",
        "likes": 12
      },
      {
        "id": "rev-prod-28-18",
        "author": "김*호",
        "rating": 5,
        "date": "2026-08-03",
        "content": "기초 라인 이것저것 방황하다가 드디어 인생템 정착했습니다.",
        "likes": 10
      },
      {
        "id": "rev-prod-28-19",
        "author": "이*훈",
        "rating": 4,
        "date": "2026-07-31",
        "content": "트러블 유발 없이 순하게 피부 컨디션을 끌어올려 줍니다.",
        "likes": 9
      },
      {
        "id": "rev-prod-28-20",
        "author": "박*서",
        "rating": 5,
        "date": "2026-07-28",
        "content": "피부 고민 있으신 분들은 꼭 한번 써보세요. 강력 추천!",
        "likes": 7
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-28-1",
        "author": "박*영",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-29",
    "name": "어성초 약산성 마이크로 딥 클렌징 폼 150ml",
    "category": "뷰티 / 케어",
    "categoryId": "cat-beauty",
    "price": 18000,
    "originalPrice": 24000,
    "discountRate": 25,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 76,
    "isBest": false,
    "isNew": false,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1556228722-d0b5b0345f24?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1556228722-d0b5b0345f24?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "국내산 지리산 어성초 추출물 30%, 세안 후에도 당김 없는 pH 5.5 약산성 거품",
    "description": "<h3>모공 속 초미세먼지까지 순하게 딥클렌징</h3><p>풍성하고 쫀쫀한 미세 거품이 모공 속 피지와 메이크업 잔여물을 말끔하게 씻어내며 천연 보습막을 지켜줍니다.</p>",
    "options": [
      {
        "name": "본품 150ml",
        "stock": 60
      },
      {
        "name": "2개 세트 (150ml x 2)",
        "stock": 30
      }
    ],
    "specs": {
      "용량": "150ml",
      "pH": "5.5 약산성 포뮬러"
    },
    "reviews": [
      {
        "id": "rev-prod-29-1",
        "author": "최*은",
        "rating": 4,
        "date": "2026-09-29",
        "content": "어성초 약산성 마이크로 딥 클렌징 폼 150ml 바르자마자 피부에 쏙 흡수되고 촉촉함이 오래가요.",
        "likes": 40
      },
      {
        "id": "rev-prod-29-2",
        "author": "정*윤",
        "rating": 5,
        "date": "2026-09-26",
        "content": "속건조가 심한 편인데 이거 바르고 당김이 싹 사라졌습니다.",
        "likes": 38
      },
      {
        "id": "rev-prod-29-3",
        "author": "강*민",
        "rating": 5,
        "date": "2026-09-23",
        "content": "순한 성분이라 민감한 제 피부에도 자극 없이 편안하네요.",
        "likes": 36
      },
      {
        "id": "rev-prod-29-4",
        "author": "조*지",
        "rating": 5,
        "date": "2026-09-20",
        "content": "다음날 아침 화장이 들뜸 없이 찰떡같이 잘 먹어서 감동했어요.",
        "likes": 35
      },
      {
        "id": "rev-prod-29-5",
        "author": "윤*정",
        "rating": 5,
        "date": "2026-09-17",
        "content": "향이 인공적이지 않고 은은해서 스킨케어할 때 힐링됩니다.",
        "likes": 33
      },
      {
        "id": "rev-prod-29-6",
        "author": "장*영",
        "rating": 5,
        "date": "2026-09-14",
        "content": "끈적임 없이 산뜻하게 마무리되어 계절 불문 데일리로 좋아요.",
        "likes": 32
      },
      {
        "id": "rev-prod-29-7",
        "author": "임*원",
        "rating": 4,
        "date": "2026-09-11",
        "content": "피부 결이 매끄러워지고 톤이 한층 맑아진 느낌입니다.",
        "likes": 30
      },
      {
        "id": "rev-prod-29-8",
        "author": "한*린",
        "rating": 5,
        "date": "2026-09-08",
        "content": "용기도 위생적이고 양 조절하기 쉬워서 사용하기 편합니다.",
        "likes": 28
      },
      {
        "id": "rev-prod-29-9",
        "author": "오*준",
        "rating": 5,
        "date": "2026-09-05",
        "content": "용량 대비 가격도 착하고 성분도 착해서 대만족이에요.",
        "likes": 27
      },
      {
        "id": "rev-prod-29-10",
        "author": "서*경",
        "rating": 5,
        "date": "2026-09-02",
        "content": "어머니께 선물해 드렸는데 너무 좋다고 또 사달라고 하셨어요.",
        "likes": 25
      },
      {
        "id": "rev-prod-29-11",
        "author": "신*수",
        "rating": 5,
        "date": "2026-08-30",
        "content": "붉은기 진정과 보습 장벽 강화에 확실히 효과를 봤습니다.",
        "likes": 24
      },
      {
        "id": "rev-prod-29-12",
        "author": "권*우",
        "rating": 5,
        "date": "2026-08-27",
        "content": "비건 인증 제품이라 안심하고 온 가족이 함께 쓰고 있습니다.",
        "likes": 22
      },
      {
        "id": "rev-prod-29-13",
        "author": "황*희",
        "rating": 4,
        "date": "2026-08-24",
        "content": "발림성이 부드럽고 소량으로도 얼굴 전체에 촉촉하게 펴 발려요.",
        "likes": 20
      },
      {
        "id": "rev-prod-29-14",
        "author": "안*진",
        "rating": 5,
        "date": "2026-08-21",
        "content": "벌써 2통째 비우고 있는 저의 찐 정착템입니다.",
        "likes": 19
      },
      {
        "id": "rev-prod-29-15",
        "author": "송*아",
        "rating": 5,
        "date": "2026-08-18",
        "content": "피부과 케어 받은 것처럼 피부가 쫀쫀하고 탄력 있어 보여요.",
        "likes": 17
      },
      {
        "id": "rev-prod-29-16",
        "author": "전*태",
        "rating": 5,
        "date": "2026-08-15",
        "content": "선물 포장도 예쁘게 와서 생일 선물용으로도 완벽합니다.",
        "likes": 16
      },
      {
        "id": "rev-prod-29-17",
        "author": "홍*현",
        "rating": 5,
        "date": "2026-08-12",
        "content": "유수분 밸런스를 딱 맞춰줘서 번들거림 없이 촉촉합니다.",
        "likes": 14
      },
      {
        "id": "rev-prod-29-18",
        "author": "유*호",
        "rating": 5,
        "date": "2026-08-09",
        "content": "기초 라인 이것저것 방황하다가 드디어 인생템 정착했습니다.",
        "likes": 12
      },
      {
        "id": "rev-prod-29-19",
        "author": "고*훈",
        "rating": 4,
        "date": "2026-08-06",
        "content": "트러블 유발 없이 순하게 피부 컨디션을 끌어올려 줍니다.",
        "likes": 11
      },
      {
        "id": "rev-prod-29-20",
        "author": "문*서",
        "rating": 5,
        "date": "2026-08-03",
        "content": "피부 고민 있으신 분들은 꼭 한번 써보세요. 강력 추천!",
        "likes": 9
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-29-1",
        "author": "최*원",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-30",
    "name": "골든 모로칸 아르간 헤어 리페어 오일 100ml",
    "category": "뷰티 / 케어",
    "categoryId": "cat-beauty",
    "price": 29000,
    "originalPrice": 42000,
    "discountRate": 31,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 33,
    "isBest": true,
    "isNew": false,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1608248597330-84a1d4d8e5e8?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1608248597330-84a1d4d8e5e8?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "모로코 유기농 아르간 오일 100%, 끈적임 없는 실키한 흡수감과 살롱급 단백질 영양",
    "description": "<h3>손상모를 위한 기적의 한 방울</h3><p>잦은 펌과 염색으로 갈라진 모발 끝에 즉각적인 윤기와 부드러움을 선사하며, 우아한 화이트 플로럴 향이 하루 종일 지속됩니다.</p>",
    "options": [
      {
        "name": "본품 100ml 펌프형",
        "stock": 45
      },
      {
        "name": "기획세트 (100ml + 30ml 미니)",
        "stock": 25
      }
    ],
    "specs": {
      "용량": "100ml",
      "주요성분": "유기농 아르간커넬오일, 케라틴 단백질"
    },
    "reviews": [
      {
        "id": "rev-prod-30-1",
        "author": "양*은",
        "rating": 4,
        "date": "2026-09-28",
        "content": "골든 모로칸 아르간 헤어 리페어 오일 100ml 바르자마자 피부에 쏙 흡수되고 촉촉함이 오래가요.",
        "likes": 42
      },
      {
        "id": "rev-prod-30-2",
        "author": "손*윤",
        "rating": 5,
        "date": "2026-09-25",
        "content": "속건조가 심한 편인데 이거 바르고 당김이 싹 사라졌습니다.",
        "likes": 40
      },
      {
        "id": "rev-prod-30-3",
        "author": "배*민",
        "rating": 5,
        "date": "2026-09-22",
        "content": "순한 성분이라 민감한 제 피부에도 자극 없이 편안하네요.",
        "likes": 38
      },
      {
        "id": "rev-prod-30-4",
        "author": "백*지",
        "rating": 5,
        "date": "2026-09-19",
        "content": "다음날 아침 화장이 들뜸 없이 찰떡같이 잘 먹어서 감동했어요.",
        "likes": 37
      },
      {
        "id": "rev-prod-30-5",
        "author": "허*정",
        "rating": 5,
        "date": "2026-09-16",
        "content": "향이 인공적이지 않고 은은해서 스킨케어할 때 힐링됩니다.",
        "likes": 35
      },
      {
        "id": "rev-prod-30-6",
        "author": "노*영",
        "rating": 5,
        "date": "2026-09-13",
        "content": "끈적임 없이 산뜻하게 마무리되어 계절 불문 데일리로 좋아요.",
        "likes": 34
      },
      {
        "id": "rev-prod-30-7",
        "author": "남*원",
        "rating": 4,
        "date": "2026-09-10",
        "content": "피부 결이 매끄러워지고 톤이 한층 맑아진 느낌입니다.",
        "likes": 32
      },
      {
        "id": "rev-prod-30-8",
        "author": "심*린",
        "rating": 5,
        "date": "2026-09-07",
        "content": "용기도 위생적이고 양 조절하기 쉬워서 사용하기 편합니다.",
        "likes": 30
      },
      {
        "id": "rev-prod-30-9",
        "author": "김*준",
        "rating": 5,
        "date": "2026-09-04",
        "content": "용량 대비 가격도 착하고 성분도 착해서 대만족이에요.",
        "likes": 29
      },
      {
        "id": "rev-prod-30-10",
        "author": "이*경",
        "rating": 5,
        "date": "2026-09-01",
        "content": "어머니께 선물해 드렸는데 너무 좋다고 또 사달라고 하셨어요.",
        "likes": 27
      },
      {
        "id": "rev-prod-30-11",
        "author": "박*수",
        "rating": 5,
        "date": "2026-08-29",
        "content": "붉은기 진정과 보습 장벽 강화에 확실히 효과를 봤습니다.",
        "likes": 26
      },
      {
        "id": "rev-prod-30-12",
        "author": "최*우",
        "rating": 5,
        "date": "2026-08-26",
        "content": "비건 인증 제품이라 안심하고 온 가족이 함께 쓰고 있습니다.",
        "likes": 24
      },
      {
        "id": "rev-prod-30-13",
        "author": "정*희",
        "rating": 4,
        "date": "2026-08-23",
        "content": "발림성이 부드럽고 소량으로도 얼굴 전체에 촉촉하게 펴 발려요.",
        "likes": 22
      },
      {
        "id": "rev-prod-30-14",
        "author": "강*진",
        "rating": 5,
        "date": "2026-08-20",
        "content": "벌써 2통째 비우고 있는 저의 찐 정착템입니다.",
        "likes": 21
      },
      {
        "id": "rev-prod-30-15",
        "author": "조*아",
        "rating": 5,
        "date": "2026-08-17",
        "content": "피부과 케어 받은 것처럼 피부가 쫀쫀하고 탄력 있어 보여요.",
        "likes": 19
      },
      {
        "id": "rev-prod-30-16",
        "author": "윤*태",
        "rating": 5,
        "date": "2026-08-14",
        "content": "선물 포장도 예쁘게 와서 생일 선물용으로도 완벽합니다.",
        "likes": 18
      },
      {
        "id": "rev-prod-30-17",
        "author": "장*현",
        "rating": 5,
        "date": "2026-08-11",
        "content": "유수분 밸런스를 딱 맞춰줘서 번들거림 없이 촉촉합니다.",
        "likes": 16
      },
      {
        "id": "rev-prod-30-18",
        "author": "임*호",
        "rating": 5,
        "date": "2026-08-08",
        "content": "기초 라인 이것저것 방황하다가 드디어 인생템 정착했습니다.",
        "likes": 14
      },
      {
        "id": "rev-prod-30-19",
        "author": "한*훈",
        "rating": 4,
        "date": "2026-08-05",
        "content": "트러블 유발 없이 순하게 피부 컨디션을 끌어올려 줍니다.",
        "likes": 13
      },
      {
        "id": "rev-prod-30-20",
        "author": "오*서",
        "rating": 5,
        "date": "2026-08-02",
        "content": "피부 고민 있으신 분들은 꼭 한번 써보세요. 강력 추천!",
        "likes": 11
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-30-1",
        "author": "정*린",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-31",
    "name": "바쿠치올 & 펩타이드 주름 개선 아이크림 30ml",
    "category": "뷰티 / 케어",
    "categoryId": "cat-beauty",
    "price": 38000,
    "originalPrice": 52000,
    "discountRate": 27,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 40,
    "isBest": false,
    "isNew": true,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "차세대 식물성 레티놀 바쿠치올 1%, 눈가 주름과 다크서클을 케어하는 저자극 아이 트리트먼트",
    "description": "<h3>자극 없는 식물성 탄력 리프팅</h3><p>레티놀 특유의 붉어짐이나 각질 부작용 없이 낮과 밤 언제나 안심하고 바를 수 있는 고농축 탄력 아이크림입니다.</p>",
    "options": [
      {
        "name": "본품 30ml 메탈 어플리케이터형",
        "stock": 35
      },
      {
        "name": "2개 세트 (30ml x 2)",
        "stock": 20
      }
    ],
    "specs": {
      "용량": "30ml",
      "기능성": "주름개선 / 미백 2중 기능성"
    },
    "reviews": [
      {
        "id": "rev-prod-31-1",
        "author": "서*은",
        "rating": 4,
        "date": "2026-09-27",
        "content": "바쿠치올 & 펩타이드 주름 개선 아이크림 30ml 바르자마자 피부에 쏙 흡수되고 촉촉함이 오래가요.",
        "likes": 34
      },
      {
        "id": "rev-prod-31-2",
        "author": "신*윤",
        "rating": 5,
        "date": "2026-09-24",
        "content": "속건조가 심한 편인데 이거 바르고 당김이 싹 사라졌습니다.",
        "likes": 32
      },
      {
        "id": "rev-prod-31-3",
        "author": "권*민",
        "rating": 5,
        "date": "2026-09-21",
        "content": "순한 성분이라 민감한 제 피부에도 자극 없이 편안하네요.",
        "likes": 30
      },
      {
        "id": "rev-prod-31-4",
        "author": "황*지",
        "rating": 5,
        "date": "2026-09-18",
        "content": "다음날 아침 화장이 들뜸 없이 찰떡같이 잘 먹어서 감동했어요.",
        "likes": 29
      },
      {
        "id": "rev-prod-31-5",
        "author": "안*정",
        "rating": 5,
        "date": "2026-09-15",
        "content": "향이 인공적이지 않고 은은해서 스킨케어할 때 힐링됩니다.",
        "likes": 27
      },
      {
        "id": "rev-prod-31-6",
        "author": "송*영",
        "rating": 5,
        "date": "2026-09-12",
        "content": "끈적임 없이 산뜻하게 마무리되어 계절 불문 데일리로 좋아요.",
        "likes": 26
      },
      {
        "id": "rev-prod-31-7",
        "author": "전*원",
        "rating": 4,
        "date": "2026-09-09",
        "content": "피부 결이 매끄러워지고 톤이 한층 맑아진 느낌입니다.",
        "likes": 24
      },
      {
        "id": "rev-prod-31-8",
        "author": "홍*린",
        "rating": 5,
        "date": "2026-09-06",
        "content": "용기도 위생적이고 양 조절하기 쉬워서 사용하기 편합니다.",
        "likes": 22
      },
      {
        "id": "rev-prod-31-9",
        "author": "유*준",
        "rating": 5,
        "date": "2026-09-03",
        "content": "용량 대비 가격도 착하고 성분도 착해서 대만족이에요.",
        "likes": 21
      },
      {
        "id": "rev-prod-31-10",
        "author": "고*경",
        "rating": 5,
        "date": "2026-08-31",
        "content": "어머니께 선물해 드렸는데 너무 좋다고 또 사달라고 하셨어요.",
        "likes": 19
      },
      {
        "id": "rev-prod-31-11",
        "author": "문*수",
        "rating": 5,
        "date": "2026-08-28",
        "content": "붉은기 진정과 보습 장벽 강화에 확실히 효과를 봤습니다.",
        "likes": 18
      },
      {
        "id": "rev-prod-31-12",
        "author": "양*우",
        "rating": 5,
        "date": "2026-08-25",
        "content": "비건 인증 제품이라 안심하고 온 가족이 함께 쓰고 있습니다.",
        "likes": 16
      },
      {
        "id": "rev-prod-31-13",
        "author": "손*희",
        "rating": 4,
        "date": "2026-08-22",
        "content": "발림성이 부드럽고 소량으로도 얼굴 전체에 촉촉하게 펴 발려요.",
        "likes": 14
      },
      {
        "id": "rev-prod-31-14",
        "author": "배*진",
        "rating": 5,
        "date": "2026-08-19",
        "content": "벌써 2통째 비우고 있는 저의 찐 정착템입니다.",
        "likes": 13
      },
      {
        "id": "rev-prod-31-15",
        "author": "백*아",
        "rating": 5,
        "date": "2026-08-16",
        "content": "피부과 케어 받은 것처럼 피부가 쫀쫀하고 탄력 있어 보여요.",
        "likes": 11
      },
      {
        "id": "rev-prod-31-16",
        "author": "허*태",
        "rating": 5,
        "date": "2026-08-13",
        "content": "선물 포장도 예쁘게 와서 생일 선물용으로도 완벽합니다.",
        "likes": 10
      },
      {
        "id": "rev-prod-31-17",
        "author": "노*현",
        "rating": 5,
        "date": "2026-08-10",
        "content": "유수분 밸런스를 딱 맞춰줘서 번들거림 없이 촉촉합니다.",
        "likes": 8
      },
      {
        "id": "rev-prod-31-18",
        "author": "남*호",
        "rating": 5,
        "date": "2026-08-07",
        "content": "기초 라인 이것저것 방황하다가 드디어 인생템 정착했습니다.",
        "likes": 6
      },
      {
        "id": "rev-prod-31-19",
        "author": "심*훈",
        "rating": 4,
        "date": "2026-08-04",
        "content": "트러블 유발 없이 순하게 피부 컨디션을 끌어올려 줍니다.",
        "likes": 5
      },
      {
        "id": "rev-prod-31-20",
        "author": "김*서",
        "rating": 5,
        "date": "2026-08-01",
        "content": "피부 고민 있으신 분들은 꼭 한번 써보세요. 강력 추천!",
        "likes": 3
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-31-1",
        "author": "강*준",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-32",
    "name": "내추럴 올리브 & 시어버터 립 트리트먼트 밤 15g",
    "category": "뷰티 / 케어",
    "categoryId": "cat-beauty",
    "price": 14000,
    "originalPrice": 19000,
    "discountRate": 26,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 47,
    "isBest": false,
    "isNew": false,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "스페인 유기농 엑스트라 버진 올리브유와 아프리카 시어버터의 극강 입술 보습",
    "description": "<h3>트고 갈라진 입술을 위한 밤샘 슬리핑 립 마스크 겸용 립밤</h3><p>인공 색소와 인공 향료 무첨가로 입술에 안전하며, 바르는 즉시 촉촉한 볼륨 코팅막을 형성합니다.</p>",
    "options": [
      {
        "name": "무향 내추럴 (15g)",
        "stock": 50
      },
      {
        "name": "베리 틴티드 (생기 핑크 / 15g)",
        "stock": 40
      }
    ],
    "specs": {
      "용량": "15g",
      "성분": "EWG 올그린 등급 식물성 오일"
    },
    "reviews": [
      {
        "id": "rev-prod-32-1",
        "author": "이*은",
        "rating": 4,
        "date": "2026-09-26",
        "content": "내추럴 올리브 & 시어버터 립 트리트먼트 밤 15g 바르자마자 피부에 쏙 흡수되고 촉촉함이 오래가요.",
        "likes": 36
      },
      {
        "id": "rev-prod-32-2",
        "author": "박*윤",
        "rating": 5,
        "date": "2026-09-23",
        "content": "속건조가 심한 편인데 이거 바르고 당김이 싹 사라졌습니다.",
        "likes": 34
      },
      {
        "id": "rev-prod-32-3",
        "author": "최*민",
        "rating": 5,
        "date": "2026-09-20",
        "content": "순한 성분이라 민감한 제 피부에도 자극 없이 편안하네요.",
        "likes": 32
      },
      {
        "id": "rev-prod-32-4",
        "author": "정*지",
        "rating": 5,
        "date": "2026-09-17",
        "content": "다음날 아침 화장이 들뜸 없이 찰떡같이 잘 먹어서 감동했어요.",
        "likes": 31
      },
      {
        "id": "rev-prod-32-5",
        "author": "강*정",
        "rating": 5,
        "date": "2026-09-14",
        "content": "향이 인공적이지 않고 은은해서 스킨케어할 때 힐링됩니다.",
        "likes": 29
      },
      {
        "id": "rev-prod-32-6",
        "author": "조*영",
        "rating": 5,
        "date": "2026-09-11",
        "content": "끈적임 없이 산뜻하게 마무리되어 계절 불문 데일리로 좋아요.",
        "likes": 28
      },
      {
        "id": "rev-prod-32-7",
        "author": "윤*원",
        "rating": 4,
        "date": "2026-09-08",
        "content": "피부 결이 매끄러워지고 톤이 한층 맑아진 느낌입니다.",
        "likes": 26
      },
      {
        "id": "rev-prod-32-8",
        "author": "장*린",
        "rating": 5,
        "date": "2026-09-05",
        "content": "용기도 위생적이고 양 조절하기 쉬워서 사용하기 편합니다.",
        "likes": 24
      },
      {
        "id": "rev-prod-32-9",
        "author": "임*준",
        "rating": 5,
        "date": "2026-09-02",
        "content": "용량 대비 가격도 착하고 성분도 착해서 대만족이에요.",
        "likes": 23
      },
      {
        "id": "rev-prod-32-10",
        "author": "한*경",
        "rating": 5,
        "date": "2026-08-30",
        "content": "어머니께 선물해 드렸는데 너무 좋다고 또 사달라고 하셨어요.",
        "likes": 21
      },
      {
        "id": "rev-prod-32-11",
        "author": "오*수",
        "rating": 5,
        "date": "2026-08-27",
        "content": "붉은기 진정과 보습 장벽 강화에 확실히 효과를 봤습니다.",
        "likes": 20
      },
      {
        "id": "rev-prod-32-12",
        "author": "서*우",
        "rating": 5,
        "date": "2026-08-24",
        "content": "비건 인증 제품이라 안심하고 온 가족이 함께 쓰고 있습니다.",
        "likes": 18
      },
      {
        "id": "rev-prod-32-13",
        "author": "신*희",
        "rating": 4,
        "date": "2026-08-21",
        "content": "발림성이 부드럽고 소량으로도 얼굴 전체에 촉촉하게 펴 발려요.",
        "likes": 16
      },
      {
        "id": "rev-prod-32-14",
        "author": "권*진",
        "rating": 5,
        "date": "2026-08-18",
        "content": "벌써 2통째 비우고 있는 저의 찐 정착템입니다.",
        "likes": 15
      },
      {
        "id": "rev-prod-32-15",
        "author": "황*아",
        "rating": 5,
        "date": "2026-08-15",
        "content": "피부과 케어 받은 것처럼 피부가 쫀쫀하고 탄력 있어 보여요.",
        "likes": 13
      },
      {
        "id": "rev-prod-32-16",
        "author": "안*태",
        "rating": 5,
        "date": "2026-08-12",
        "content": "선물 포장도 예쁘게 와서 생일 선물용으로도 완벽합니다.",
        "likes": 12
      },
      {
        "id": "rev-prod-32-17",
        "author": "송*현",
        "rating": 5,
        "date": "2026-08-09",
        "content": "유수분 밸런스를 딱 맞춰줘서 번들거림 없이 촉촉합니다.",
        "likes": 10
      },
      {
        "id": "rev-prod-32-18",
        "author": "전*호",
        "rating": 5,
        "date": "2026-08-06",
        "content": "기초 라인 이것저것 방황하다가 드디어 인생템 정착했습니다.",
        "likes": 8
      },
      {
        "id": "rev-prod-32-19",
        "author": "홍*훈",
        "rating": 4,
        "date": "2026-08-03",
        "content": "트러블 유발 없이 순하게 피부 컨디션을 끌어올려 줍니다.",
        "likes": 7
      },
      {
        "id": "rev-prod-32-20",
        "author": "유*서",
        "rating": 5,
        "date": "2026-07-31",
        "content": "피부 고민 있으신 분들은 꼭 한번 써보세요. 강력 추천!",
        "likes": 5
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-32-1",
        "author": "조*경",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-33",
    "name": "티트리 카밍 스팟 젤 20ml (응급 트러블 진정)",
    "category": "뷰티 / 케어",
    "categoryId": "cat-beauty",
    "price": 19000,
    "originalPrice": 26000,
    "discountRate": 27,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 54,
    "isBest": false,
    "isNew": true,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "호주산 유기농 티트리잎 오일 10,000ppm + 살리실산(BHA) 0.5% 빠른 진정",
    "description": "<h3>갑자기 올라온 피부 고민을 빠르게 잠재우는 SOS 스팟</h3><p>투명하고 산뜻한 젤 텍스처로 메이크업 위에 덧발라도 뭉침이 없으며 국소 부위 피지를 조절해 줍니다.</p>",
    "options": [
      {
        "name": "본품 20ml 튜브형",
        "stock": 40
      }
    ],
    "specs": {
      "용량": "20ml",
      "임상": "논코메도제닉 테스트 완료"
    },
    "reviews": [
      {
        "id": "rev-prod-33-1",
        "author": "고*은",
        "rating": 4,
        "date": "2026-09-25",
        "content": "티트리 카밍 스팟 젤 20ml (응급 트러블 진정) 바르자마자 피부에 쏙 흡수되고 촉촉함이 오래가요.",
        "likes": 38
      },
      {
        "id": "rev-prod-33-2",
        "author": "문*윤",
        "rating": 5,
        "date": "2026-09-22",
        "content": "속건조가 심한 편인데 이거 바르고 당김이 싹 사라졌습니다.",
        "likes": 36
      },
      {
        "id": "rev-prod-33-3",
        "author": "양*민",
        "rating": 5,
        "date": "2026-09-19",
        "content": "순한 성분이라 민감한 제 피부에도 자극 없이 편안하네요.",
        "likes": 34
      },
      {
        "id": "rev-prod-33-4",
        "author": "손*지",
        "rating": 5,
        "date": "2026-09-16",
        "content": "다음날 아침 화장이 들뜸 없이 찰떡같이 잘 먹어서 감동했어요.",
        "likes": 33
      },
      {
        "id": "rev-prod-33-5",
        "author": "배*정",
        "rating": 5,
        "date": "2026-09-13",
        "content": "향이 인공적이지 않고 은은해서 스킨케어할 때 힐링됩니다.",
        "likes": 31
      },
      {
        "id": "rev-prod-33-6",
        "author": "백*영",
        "rating": 5,
        "date": "2026-09-10",
        "content": "끈적임 없이 산뜻하게 마무리되어 계절 불문 데일리로 좋아요.",
        "likes": 30
      },
      {
        "id": "rev-prod-33-7",
        "author": "허*원",
        "rating": 4,
        "date": "2026-09-07",
        "content": "피부 결이 매끄러워지고 톤이 한층 맑아진 느낌입니다.",
        "likes": 28
      },
      {
        "id": "rev-prod-33-8",
        "author": "노*린",
        "rating": 5,
        "date": "2026-09-04",
        "content": "용기도 위생적이고 양 조절하기 쉬워서 사용하기 편합니다.",
        "likes": 26
      },
      {
        "id": "rev-prod-33-9",
        "author": "남*준",
        "rating": 5,
        "date": "2026-09-01",
        "content": "용량 대비 가격도 착하고 성분도 착해서 대만족이에요.",
        "likes": 25
      },
      {
        "id": "rev-prod-33-10",
        "author": "심*경",
        "rating": 5,
        "date": "2026-08-29",
        "content": "어머니께 선물해 드렸는데 너무 좋다고 또 사달라고 하셨어요.",
        "likes": 23
      },
      {
        "id": "rev-prod-33-11",
        "author": "김*수",
        "rating": 5,
        "date": "2026-08-26",
        "content": "붉은기 진정과 보습 장벽 강화에 확실히 효과를 봤습니다.",
        "likes": 22
      },
      {
        "id": "rev-prod-33-12",
        "author": "이*우",
        "rating": 5,
        "date": "2026-08-23",
        "content": "비건 인증 제품이라 안심하고 온 가족이 함께 쓰고 있습니다.",
        "likes": 20
      },
      {
        "id": "rev-prod-33-13",
        "author": "박*희",
        "rating": 4,
        "date": "2026-08-20",
        "content": "발림성이 부드럽고 소량으로도 얼굴 전체에 촉촉하게 펴 발려요.",
        "likes": 18
      },
      {
        "id": "rev-prod-33-14",
        "author": "최*진",
        "rating": 5,
        "date": "2026-08-17",
        "content": "벌써 2통째 비우고 있는 저의 찐 정착템입니다.",
        "likes": 17
      },
      {
        "id": "rev-prod-33-15",
        "author": "정*아",
        "rating": 5,
        "date": "2026-08-14",
        "content": "피부과 케어 받은 것처럼 피부가 쫀쫀하고 탄력 있어 보여요.",
        "likes": 15
      },
      {
        "id": "rev-prod-33-16",
        "author": "강*태",
        "rating": 5,
        "date": "2026-08-11",
        "content": "선물 포장도 예쁘게 와서 생일 선물용으로도 완벽합니다.",
        "likes": 14
      },
      {
        "id": "rev-prod-33-17",
        "author": "조*현",
        "rating": 5,
        "date": "2026-08-08",
        "content": "유수분 밸런스를 딱 맞춰줘서 번들거림 없이 촉촉합니다.",
        "likes": 12
      },
      {
        "id": "rev-prod-33-18",
        "author": "윤*호",
        "rating": 5,
        "date": "2026-08-05",
        "content": "기초 라인 이것저것 방황하다가 드디어 인생템 정착했습니다.",
        "likes": 10
      },
      {
        "id": "rev-prod-33-19",
        "author": "장*훈",
        "rating": 4,
        "date": "2026-08-02",
        "content": "트러블 유발 없이 순하게 피부 컨디션을 끌어올려 줍니다.",
        "likes": 9
      },
      {
        "id": "rev-prod-33-20",
        "author": "임*서",
        "rating": 5,
        "date": "2026-07-30",
        "content": "피부 고민 있으신 분들은 꼭 한번 써보세요. 강력 추천!",
        "likes": 7
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-33-1",
        "author": "윤*수",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-34",
    "name": "8중 히알루론산 딥 모이스처 마스크팩 (10매 세트)",
    "category": "뷰티 / 케어",
    "categoryId": "cat-beauty",
    "price": 25000,
    "originalPrice": 35000,
    "discountRate": 29,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 61,
    "isBest": true,
    "isNew": false,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1567928815104-b798b750c778?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1567928815104-b798b750c778?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "1회 사용으로 수분량 240% 급상승, 밀착력 뛰어난 100% 텐셀 스킨 시트",
    "description": "<h3>중요한 날 전날 밤 수분 폭탄 스페셜 케어</h3><p>한 장에 30ml 앰플 한 병의 영양을 통째로 담아 메마른 피부에 즉각적인 수분 광채를 선사합니다.</p>",
    "options": [
      {
        "name": "10매 1박스 세트",
        "stock": 60
      },
      {
        "name": "20매 특별 더블 기획세트",
        "stock": 35
      }
    ],
    "specs": {
      "구성": "1박스 (30ml x 10매)",
      "시트원단": "비건 인증 텐셀 극세사"
    },
    "reviews": [
      {
        "id": "rev-prod-34-1",
        "author": "한*은",
        "rating": 4,
        "date": "2026-09-24",
        "content": "8중 히알루론산 딥 모이스처 마스크팩 (10매 세트) 바르자마자 피부에 쏙 흡수되고 촉촉함이 오래가요.",
        "likes": 40
      },
      {
        "id": "rev-prod-34-2",
        "author": "오*윤",
        "rating": 5,
        "date": "2026-09-21",
        "content": "속건조가 심한 편인데 이거 바르고 당김이 싹 사라졌습니다.",
        "likes": 38
      },
      {
        "id": "rev-prod-34-3",
        "author": "서*민",
        "rating": 5,
        "date": "2026-09-18",
        "content": "순한 성분이라 민감한 제 피부에도 자극 없이 편안하네요.",
        "likes": 36
      },
      {
        "id": "rev-prod-34-4",
        "author": "신*지",
        "rating": 5,
        "date": "2026-09-15",
        "content": "다음날 아침 화장이 들뜸 없이 찰떡같이 잘 먹어서 감동했어요.",
        "likes": 35
      },
      {
        "id": "rev-prod-34-5",
        "author": "권*정",
        "rating": 5,
        "date": "2026-09-12",
        "content": "향이 인공적이지 않고 은은해서 스킨케어할 때 힐링됩니다.",
        "likes": 33
      },
      {
        "id": "rev-prod-34-6",
        "author": "황*영",
        "rating": 5,
        "date": "2026-09-09",
        "content": "끈적임 없이 산뜻하게 마무리되어 계절 불문 데일리로 좋아요.",
        "likes": 32
      },
      {
        "id": "rev-prod-34-7",
        "author": "안*원",
        "rating": 4,
        "date": "2026-09-06",
        "content": "피부 결이 매끄러워지고 톤이 한층 맑아진 느낌입니다.",
        "likes": 30
      },
      {
        "id": "rev-prod-34-8",
        "author": "송*린",
        "rating": 5,
        "date": "2026-09-03",
        "content": "용기도 위생적이고 양 조절하기 쉬워서 사용하기 편합니다.",
        "likes": 28
      },
      {
        "id": "rev-prod-34-9",
        "author": "전*준",
        "rating": 5,
        "date": "2026-08-31",
        "content": "용량 대비 가격도 착하고 성분도 착해서 대만족이에요.",
        "likes": 27
      },
      {
        "id": "rev-prod-34-10",
        "author": "홍*경",
        "rating": 5,
        "date": "2026-08-28",
        "content": "어머니께 선물해 드렸는데 너무 좋다고 또 사달라고 하셨어요.",
        "likes": 25
      },
      {
        "id": "rev-prod-34-11",
        "author": "유*수",
        "rating": 5,
        "date": "2026-08-25",
        "content": "붉은기 진정과 보습 장벽 강화에 확실히 효과를 봤습니다.",
        "likes": 24
      },
      {
        "id": "rev-prod-34-12",
        "author": "고*우",
        "rating": 5,
        "date": "2026-08-22",
        "content": "비건 인증 제품이라 안심하고 온 가족이 함께 쓰고 있습니다.",
        "likes": 22
      },
      {
        "id": "rev-prod-34-13",
        "author": "문*희",
        "rating": 4,
        "date": "2026-08-19",
        "content": "발림성이 부드럽고 소량으로도 얼굴 전체에 촉촉하게 펴 발려요.",
        "likes": 20
      },
      {
        "id": "rev-prod-34-14",
        "author": "양*진",
        "rating": 5,
        "date": "2026-08-16",
        "content": "벌써 2통째 비우고 있는 저의 찐 정착템입니다.",
        "likes": 19
      },
      {
        "id": "rev-prod-34-15",
        "author": "손*아",
        "rating": 5,
        "date": "2026-08-13",
        "content": "피부과 케어 받은 것처럼 피부가 쫀쫀하고 탄력 있어 보여요.",
        "likes": 17
      },
      {
        "id": "rev-prod-34-16",
        "author": "배*태",
        "rating": 5,
        "date": "2026-08-10",
        "content": "선물 포장도 예쁘게 와서 생일 선물용으로도 완벽합니다.",
        "likes": 16
      },
      {
        "id": "rev-prod-34-17",
        "author": "백*현",
        "rating": 5,
        "date": "2026-08-07",
        "content": "유수분 밸런스를 딱 맞춰줘서 번들거림 없이 촉촉합니다.",
        "likes": 14
      },
      {
        "id": "rev-prod-34-18",
        "author": "허*호",
        "rating": 5,
        "date": "2026-08-04",
        "content": "기초 라인 이것저것 방황하다가 드디어 인생템 정착했습니다.",
        "likes": 12
      },
      {
        "id": "rev-prod-34-19",
        "author": "노*훈",
        "rating": 4,
        "date": "2026-08-01",
        "content": "트러블 유발 없이 순하게 피부 컨디션을 끌어올려 줍니다.",
        "likes": 11
      },
      {
        "id": "rev-prod-34-20",
        "author": "남*서",
        "rating": 5,
        "date": "2026-07-29",
        "content": "피부 고민 있으신 분들은 꼭 한번 써보세요. 강력 추천!",
        "likes": 9
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-34-1",
        "author": "장*우",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-35",
    "name": "보태니컬 허브 아로마 바디워시 & 바디로션 세트 (각 500ml)",
    "category": "뷰티 / 케어",
    "categoryId": "cat-beauty",
    "price": 42000,
    "originalPrice": 58000,
    "discountRate": 28,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 68,
    "isBest": false,
    "isNew": true,
    "isSale": true,
    "isFreeShipping": true,
    "thumbnail": "https://images.unsplash.com/photo-1556228724-4da94348a867?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1556228724-4da94348a867?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "로즈마리 & 라벤더 천연 에센셜 오일의 힐링 바디케어, 선물용 하드박스 패키지",
    "description": "<h3>샤워하는 시간이 럭셔리 스파로 변하는 순간</h3><p>설페이트 프리 저자극 식물성 계면활성제로 촉촉하게 씻어내고, 시어버터 고보습 로션으로 부드러운 피부결을 가꿔줍니다.</p>",
    "options": [
      {
        "name": "라벤더 & 로즈마리 세트",
        "stock": 30
      },
      {
        "name": "베르가못 & 시더우드 세트",
        "stock": 25
      }
    ],
    "specs": {
      "구성": "바디워시 500ml + 바디로션 500ml + 쇼핑백",
      "원산지": "대한민국"
    },
    "reviews": [
      {
        "id": "rev-prod-35-1",
        "author": "심*은",
        "rating": 4,
        "date": "2026-09-23",
        "content": "보태니컬 허브 아로마 바디워시 & 바디로션 세트 (각 500ml) 바르자마자 피부에 쏙 흡수되고 촉촉함이 오래가요.",
        "likes": 42
      },
      {
        "id": "rev-prod-35-2",
        "author": "김*윤",
        "rating": 5,
        "date": "2026-09-20",
        "content": "속건조가 심한 편인데 이거 바르고 당김이 싹 사라졌습니다.",
        "likes": 40
      },
      {
        "id": "rev-prod-35-3",
        "author": "이*민",
        "rating": 5,
        "date": "2026-09-17",
        "content": "순한 성분이라 민감한 제 피부에도 자극 없이 편안하네요.",
        "likes": 38
      },
      {
        "id": "rev-prod-35-4",
        "author": "박*지",
        "rating": 5,
        "date": "2026-09-14",
        "content": "다음날 아침 화장이 들뜸 없이 찰떡같이 잘 먹어서 감동했어요.",
        "likes": 37
      },
      {
        "id": "rev-prod-35-5",
        "author": "최*정",
        "rating": 5,
        "date": "2026-09-11",
        "content": "향이 인공적이지 않고 은은해서 스킨케어할 때 힐링됩니다.",
        "likes": 35
      },
      {
        "id": "rev-prod-35-6",
        "author": "정*영",
        "rating": 5,
        "date": "2026-09-08",
        "content": "끈적임 없이 산뜻하게 마무리되어 계절 불문 데일리로 좋아요.",
        "likes": 34
      },
      {
        "id": "rev-prod-35-7",
        "author": "강*원",
        "rating": 4,
        "date": "2026-09-05",
        "content": "피부 결이 매끄러워지고 톤이 한층 맑아진 느낌입니다.",
        "likes": 32
      },
      {
        "id": "rev-prod-35-8",
        "author": "조*린",
        "rating": 5,
        "date": "2026-09-02",
        "content": "용기도 위생적이고 양 조절하기 쉬워서 사용하기 편합니다.",
        "likes": 30
      },
      {
        "id": "rev-prod-35-9",
        "author": "윤*준",
        "rating": 5,
        "date": "2026-08-30",
        "content": "용량 대비 가격도 착하고 성분도 착해서 대만족이에요.",
        "likes": 29
      },
      {
        "id": "rev-prod-35-10",
        "author": "장*경",
        "rating": 5,
        "date": "2026-08-27",
        "content": "어머니께 선물해 드렸는데 너무 좋다고 또 사달라고 하셨어요.",
        "likes": 27
      },
      {
        "id": "rev-prod-35-11",
        "author": "임*수",
        "rating": 5,
        "date": "2026-08-24",
        "content": "붉은기 진정과 보습 장벽 강화에 확실히 효과를 봤습니다.",
        "likes": 26
      },
      {
        "id": "rev-prod-35-12",
        "author": "한*우",
        "rating": 5,
        "date": "2026-08-21",
        "content": "비건 인증 제품이라 안심하고 온 가족이 함께 쓰고 있습니다.",
        "likes": 24
      },
      {
        "id": "rev-prod-35-13",
        "author": "오*희",
        "rating": 4,
        "date": "2026-08-18",
        "content": "발림성이 부드럽고 소량으로도 얼굴 전체에 촉촉하게 펴 발려요.",
        "likes": 22
      },
      {
        "id": "rev-prod-35-14",
        "author": "서*진",
        "rating": 5,
        "date": "2026-08-15",
        "content": "벌써 2통째 비우고 있는 저의 찐 정착템입니다.",
        "likes": 21
      },
      {
        "id": "rev-prod-35-15",
        "author": "신*아",
        "rating": 5,
        "date": "2026-08-12",
        "content": "피부과 케어 받은 것처럼 피부가 쫀쫀하고 탄력 있어 보여요.",
        "likes": 19
      },
      {
        "id": "rev-prod-35-16",
        "author": "권*태",
        "rating": 5,
        "date": "2026-08-09",
        "content": "선물 포장도 예쁘게 와서 생일 선물용으로도 완벽합니다.",
        "likes": 18
      },
      {
        "id": "rev-prod-35-17",
        "author": "황*현",
        "rating": 5,
        "date": "2026-08-06",
        "content": "유수분 밸런스를 딱 맞춰줘서 번들거림 없이 촉촉합니다.",
        "likes": 16
      },
      {
        "id": "rev-prod-35-18",
        "author": "안*호",
        "rating": 5,
        "date": "2026-08-03",
        "content": "기초 라인 이것저것 방황하다가 드디어 인생템 정착했습니다.",
        "likes": 14
      },
      {
        "id": "rev-prod-35-19",
        "author": "송*훈",
        "rating": 4,
        "date": "2026-07-31",
        "content": "트러블 유발 없이 순하게 피부 컨디션을 끌어올려 줍니다.",
        "likes": 13
      },
      {
        "id": "rev-prod-35-20",
        "author": "전*서",
        "rating": 5,
        "date": "2026-07-28",
        "content": "피부 고민 있으신 분들은 꼭 한번 써보세요. 강력 추천!",
        "likes": 11
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-35-1",
        "author": "임*희",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-36",
    "name": "니치 퍼퓸 시그니처 핸드크림 3종 기프트 세트 (각 50ml)",
    "category": "뷰티 / 케어",
    "categoryId": "cat-beauty",
    "price": 32000,
    "originalPrice": 45000,
    "discountRate": 29,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 75,
    "isBest": true,
    "isNew": true,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "프랑스 프리미엄 조향사의 3가지 향기 (상탈 우디 / 블랑 머스크 / 튤립 가든)",
    "description": "<h3>향수 대신 바르는 감각적인 니치 퍼퓸 핸드크림</h3><p>알루미늄 튜브 감성과 풍부한 시어버터 보습력으로 끈적임 없이 손을 촉촉하고 향기롭게 감싸줍니다.</p>",
    "options": [
      {
        "name": "시그니처 3종 트리오 세트 (50ml x 3)",
        "stock": 50
      }
    ],
    "specs": {
      "구성": "핸드크림 50ml x 3개입 하드케이스",
      "향지속력": "약 4~5시간"
    },
    "reviews": [
      {
        "id": "rev-prod-36-1",
        "author": "홍*은",
        "rating": 4,
        "date": "2026-09-29",
        "content": "니치 퍼퓸 시그니처 핸드크림 3종 기프트 세트 (각 50ml) 바르자마자 피부에 쏙 흡수되고 촉촉함이 오래가요.",
        "likes": 34
      },
      {
        "id": "rev-prod-36-2",
        "author": "유*윤",
        "rating": 5,
        "date": "2026-09-26",
        "content": "속건조가 심한 편인데 이거 바르고 당김이 싹 사라졌습니다.",
        "likes": 32
      },
      {
        "id": "rev-prod-36-3",
        "author": "고*민",
        "rating": 5,
        "date": "2026-09-23",
        "content": "순한 성분이라 민감한 제 피부에도 자극 없이 편안하네요.",
        "likes": 30
      },
      {
        "id": "rev-prod-36-4",
        "author": "문*지",
        "rating": 5,
        "date": "2026-09-20",
        "content": "다음날 아침 화장이 들뜸 없이 찰떡같이 잘 먹어서 감동했어요.",
        "likes": 29
      },
      {
        "id": "rev-prod-36-5",
        "author": "양*정",
        "rating": 5,
        "date": "2026-09-17",
        "content": "향이 인공적이지 않고 은은해서 스킨케어할 때 힐링됩니다.",
        "likes": 27
      },
      {
        "id": "rev-prod-36-6",
        "author": "손*영",
        "rating": 5,
        "date": "2026-09-14",
        "content": "끈적임 없이 산뜻하게 마무리되어 계절 불문 데일리로 좋아요.",
        "likes": 26
      },
      {
        "id": "rev-prod-36-7",
        "author": "배*원",
        "rating": 4,
        "date": "2026-09-11",
        "content": "피부 결이 매끄러워지고 톤이 한층 맑아진 느낌입니다.",
        "likes": 24
      },
      {
        "id": "rev-prod-36-8",
        "author": "백*린",
        "rating": 5,
        "date": "2026-09-08",
        "content": "용기도 위생적이고 양 조절하기 쉬워서 사용하기 편합니다.",
        "likes": 22
      },
      {
        "id": "rev-prod-36-9",
        "author": "허*준",
        "rating": 5,
        "date": "2026-09-05",
        "content": "용량 대비 가격도 착하고 성분도 착해서 대만족이에요.",
        "likes": 21
      },
      {
        "id": "rev-prod-36-10",
        "author": "노*경",
        "rating": 5,
        "date": "2026-09-02",
        "content": "어머니께 선물해 드렸는데 너무 좋다고 또 사달라고 하셨어요.",
        "likes": 19
      },
      {
        "id": "rev-prod-36-11",
        "author": "남*수",
        "rating": 5,
        "date": "2026-08-30",
        "content": "붉은기 진정과 보습 장벽 강화에 확실히 효과를 봤습니다.",
        "likes": 18
      },
      {
        "id": "rev-prod-36-12",
        "author": "심*우",
        "rating": 5,
        "date": "2026-08-27",
        "content": "비건 인증 제품이라 안심하고 온 가족이 함께 쓰고 있습니다.",
        "likes": 16
      },
      {
        "id": "rev-prod-36-13",
        "author": "김*희",
        "rating": 4,
        "date": "2026-08-24",
        "content": "발림성이 부드럽고 소량으로도 얼굴 전체에 촉촉하게 펴 발려요.",
        "likes": 14
      },
      {
        "id": "rev-prod-36-14",
        "author": "이*진",
        "rating": 5,
        "date": "2026-08-21",
        "content": "벌써 2통째 비우고 있는 저의 찐 정착템입니다.",
        "likes": 13
      },
      {
        "id": "rev-prod-36-15",
        "author": "박*아",
        "rating": 5,
        "date": "2026-08-18",
        "content": "피부과 케어 받은 것처럼 피부가 쫀쫀하고 탄력 있어 보여요.",
        "likes": 11
      },
      {
        "id": "rev-prod-36-16",
        "author": "최*태",
        "rating": 5,
        "date": "2026-08-15",
        "content": "선물 포장도 예쁘게 와서 생일 선물용으로도 완벽합니다.",
        "likes": 10
      },
      {
        "id": "rev-prod-36-17",
        "author": "정*현",
        "rating": 5,
        "date": "2026-08-12",
        "content": "유수분 밸런스를 딱 맞춰줘서 번들거림 없이 촉촉합니다.",
        "likes": 8
      },
      {
        "id": "rev-prod-36-18",
        "author": "강*호",
        "rating": 5,
        "date": "2026-08-09",
        "content": "기초 라인 이것저것 방황하다가 드디어 인생템 정착했습니다.",
        "likes": 6
      },
      {
        "id": "rev-prod-36-19",
        "author": "조*훈",
        "rating": 4,
        "date": "2026-08-06",
        "content": "트러블 유발 없이 순하게 피부 컨디션을 끌어올려 줍니다.",
        "likes": 5
      },
      {
        "id": "rev-prod-36-20",
        "author": "윤*서",
        "rating": 5,
        "date": "2026-08-03",
        "content": "피부 고민 있으신 분들은 꼭 한번 써보세요. 강력 추천!",
        "likes": 3
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-36-1",
        "author": "한*진",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-37",
    "name": "미니멀 무선 마그네틱 터치 LED 무드등",
    "category": "리빙 / 인테리어",
    "categoryId": "cat-living",
    "price": 38000,
    "originalPrice": 55000,
    "discountRate": 30,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 32,
    "isBest": false,
    "isNew": true,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "3단계 색온도 조절, 무단계 디밍, 2000mAh 대용량 배터리 무선 인테리어 조명",
    "description": "<h3>어느 공간에나 감성을 더하는 미니멀 조명</h3><p>알루미늄 바디와 부드러운 디퓨저 렌즈로 눈부심 없는 아늑한 빛을 연출합니다.</p>",
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
      "배터리": "2,000mAh",
      "충전": "Type-C",
      "색온도": "3000K/4000K/5700K"
    },
    "reviews": [
      {
        "id": "rev-prod-37-1",
        "author": "장*은",
        "rating": 4,
        "date": "2026-09-28",
        "content": "미니멀 무선 마그네틱 터치 LED 무드등 하나로 집안 분위기가 호텔처럼 아늑해졌습니다.",
        "likes": 36
      },
      {
        "id": "rev-prod-37-2",
        "author": "임*윤",
        "rating": 5,
        "date": "2026-09-25",
        "content": "디자인이 감각적이고 공간 어디에 두어도 인테리어가 사네요.",
        "likes": 34
      },
      {
        "id": "rev-prod-37-3",
        "author": "한*민",
        "rating": 5,
        "date": "2026-09-22",
        "content": "실용성이 뛰어나서 매일매일 유용하게 잘 쓰고 있습니다.",
        "likes": 32
      },
      {
        "id": "rev-prod-37-4",
        "author": "오*지",
        "rating": 5,
        "date": "2026-09-19",
        "content": "마감 퀄리티가 정교하고 흠집 없이 깨끗하게 배송되었습니다.",
        "likes": 31
      },
      {
        "id": "rev-prod-37-5",
        "author": "서*정",
        "rating": 5,
        "date": "2026-09-16",
        "content": "집들이 선물로 가져갔는데 센스 있다는 칭찬 엄청 들었어요.",
        "likes": 29
      },
      {
        "id": "rev-prod-37-6",
        "author": "신*영",
        "rating": 5,
        "date": "2026-09-13",
        "content": "재질이 고급스럽고 내구성이 좋아서 오래 쓸 수 있겠어요.",
        "likes": 28
      },
      {
        "id": "rev-prod-37-7",
        "author": "권*원",
        "rating": 4,
        "date": "2026-09-10",
        "content": "사용법이 간편하고 세척 및 관리하기가 정말 수월합니다.",
        "likes": 26
      },
      {
        "id": "rev-prod-37-8",
        "author": "황*린",
        "rating": 5,
        "date": "2026-09-07",
        "content": "원목과 패브릭의 따뜻한 감성이 일상에 큰 힐링을 줍니다.",
        "likes": 24
      },
      {
        "id": "rev-prod-37-9",
        "author": "안*준",
        "rating": 5,
        "date": "2026-09-04",
        "content": "크기와 비율이 딱 적당해서 공간 차지도 많이 안 하고 좋아요.",
        "likes": 23
      },
      {
        "id": "rev-prod-37-10",
        "author": "송*경",
        "rating": 5,
        "date": "2026-09-01",
        "content": "가격 대비 만족도가 200%인 리빙 인테리어 소품입니다.",
        "likes": 21
      },
      {
        "id": "rev-prod-37-11",
        "author": "전*수",
        "rating": 5,
        "date": "2026-08-29",
        "content": "눈에 띌 때마다 기분이 좋아지는 감성 가득한 아이템이에요.",
        "likes": 20
      },
      {
        "id": "rev-prod-37-12",
        "author": "홍*우",
        "rating": 5,
        "date": "2026-08-26",
        "content": "선물 포장 상자부터 완충재까지 정성이 가득 담겨왔습니다.",
        "likes": 18
      },
      {
        "id": "rev-prod-37-13",
        "author": "유*희",
        "rating": 4,
        "date": "2026-08-23",
        "content": "침실 협탁과 거실 선반 어디에 올려두어도 멋스럽습니다.",
        "likes": 16
      },
      {
        "id": "rev-prod-37-14",
        "author": "고*진",
        "rating": 5,
        "date": "2026-08-20",
        "content": "튼튼하면서도 가벼워서 위치를 옮겨가며 쓰기 편해요.",
        "likes": 15
      },
      {
        "id": "rev-prod-37-15",
        "author": "문*아",
        "rating": 5,
        "date": "2026-08-17",
        "content": "집안에 머무는 시간이 더 행복해지는 기분 좋은 변화입니다.",
        "likes": 13
      },
      {
        "id": "rev-prod-37-16",
        "author": "양*태",
        "rating": 5,
        "date": "2026-08-14",
        "content": "색감이 모던하고 은은해서 어떤 가구와도 잘 어울립니다.",
        "likes": 12
      },
      {
        "id": "rev-prod-37-17",
        "author": "손*현",
        "rating": 5,
        "date": "2026-08-11",
        "content": "주변 지인들에게도 강력 추천하고 있는 애정템입니다.",
        "likes": 10
      },
      {
        "id": "rev-prod-37-18",
        "author": "배*호",
        "rating": 5,
        "date": "2026-08-08",
        "content": "작은 소품 하나로 삶의 질이 수직 상승한 걸 느낍니다.",
        "likes": 8
      },
      {
        "id": "rev-prod-37-19",
        "author": "백*훈",
        "rating": 4,
        "date": "2026-08-05",
        "content": "이지샵 리빙 카테고리는 늘 실패가 없어서 믿고 삽니다.",
        "likes": 7
      },
      {
        "id": "rev-prod-37-20",
        "author": "허*서",
        "rating": 5,
        "date": "2026-08-02",
        "content": "가성비와 감성을 모두 잡은 최고의 인테리어 아이템입니다!",
        "likes": 5
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-37-1",
        "author": "오*아",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-38",
    "name": "시그니처 우디 아로마 디퓨저 & 캔들 세트",
    "category": "리빙 / 인테리어",
    "categoryId": "cat-living",
    "price": 52000,
    "originalPrice": 75000,
    "discountRate": 30,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 39,
    "isBest": false,
    "isNew": true,
    "isSale": true,
    "isFreeShipping": true,
    "thumbnail": "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "프랑스 그라스 향료 조향, 시더우드와 은은한 샌달우드가 전하는 힐링의 숲",
    "description": "<h3>지친 하루의 끝, 공간을 채우는 우아한 휴식</h3><p>천연 소이왁스와 식물성 디퓨저 베이스로 머리 아픔 없는 편안한 발향을 선사합니다.</p>",
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
      "구성": "디퓨저 200ml + 리드스틱 6개 + 소이캔들 180g"
    },
    "reviews": [
      {
        "id": "rev-prod-38-1",
        "author": "노*은",
        "rating": 4,
        "date": "2026-09-27",
        "content": "시그니처 우디 아로마 디퓨저 & 캔들 세트 하나로 집안 분위기가 호텔처럼 아늑해졌습니다.",
        "likes": 38
      },
      {
        "id": "rev-prod-38-2",
        "author": "남*윤",
        "rating": 5,
        "date": "2026-09-24",
        "content": "디자인이 감각적이고 공간 어디에 두어도 인테리어가 사네요.",
        "likes": 36
      },
      {
        "id": "rev-prod-38-3",
        "author": "심*민",
        "rating": 5,
        "date": "2026-09-21",
        "content": "실용성이 뛰어나서 매일매일 유용하게 잘 쓰고 있습니다.",
        "likes": 34
      },
      {
        "id": "rev-prod-38-4",
        "author": "김*지",
        "rating": 5,
        "date": "2026-09-18",
        "content": "마감 퀄리티가 정교하고 흠집 없이 깨끗하게 배송되었습니다.",
        "likes": 33
      },
      {
        "id": "rev-prod-38-5",
        "author": "이*정",
        "rating": 5,
        "date": "2026-09-15",
        "content": "집들이 선물로 가져갔는데 센스 있다는 칭찬 엄청 들었어요.",
        "likes": 31
      },
      {
        "id": "rev-prod-38-6",
        "author": "박*영",
        "rating": 5,
        "date": "2026-09-12",
        "content": "재질이 고급스럽고 내구성이 좋아서 오래 쓸 수 있겠어요.",
        "likes": 30
      },
      {
        "id": "rev-prod-38-7",
        "author": "최*원",
        "rating": 4,
        "date": "2026-09-09",
        "content": "사용법이 간편하고 세척 및 관리하기가 정말 수월합니다.",
        "likes": 28
      },
      {
        "id": "rev-prod-38-8",
        "author": "정*린",
        "rating": 5,
        "date": "2026-09-06",
        "content": "원목과 패브릭의 따뜻한 감성이 일상에 큰 힐링을 줍니다.",
        "likes": 26
      },
      {
        "id": "rev-prod-38-9",
        "author": "강*준",
        "rating": 5,
        "date": "2026-09-03",
        "content": "크기와 비율이 딱 적당해서 공간 차지도 많이 안 하고 좋아요.",
        "likes": 25
      },
      {
        "id": "rev-prod-38-10",
        "author": "조*경",
        "rating": 5,
        "date": "2026-08-31",
        "content": "가격 대비 만족도가 200%인 리빙 인테리어 소품입니다.",
        "likes": 23
      },
      {
        "id": "rev-prod-38-11",
        "author": "윤*수",
        "rating": 5,
        "date": "2026-08-28",
        "content": "눈에 띌 때마다 기분이 좋아지는 감성 가득한 아이템이에요.",
        "likes": 22
      },
      {
        "id": "rev-prod-38-12",
        "author": "장*우",
        "rating": 5,
        "date": "2026-08-25",
        "content": "선물 포장 상자부터 완충재까지 정성이 가득 담겨왔습니다.",
        "likes": 20
      },
      {
        "id": "rev-prod-38-13",
        "author": "임*희",
        "rating": 4,
        "date": "2026-08-22",
        "content": "침실 협탁과 거실 선반 어디에 올려두어도 멋스럽습니다.",
        "likes": 18
      },
      {
        "id": "rev-prod-38-14",
        "author": "한*진",
        "rating": 5,
        "date": "2026-08-19",
        "content": "튼튼하면서도 가벼워서 위치를 옮겨가며 쓰기 편해요.",
        "likes": 17
      },
      {
        "id": "rev-prod-38-15",
        "author": "오*아",
        "rating": 5,
        "date": "2026-08-16",
        "content": "집안에 머무는 시간이 더 행복해지는 기분 좋은 변화입니다.",
        "likes": 15
      },
      {
        "id": "rev-prod-38-16",
        "author": "서*태",
        "rating": 5,
        "date": "2026-08-13",
        "content": "색감이 모던하고 은은해서 어떤 가구와도 잘 어울립니다.",
        "likes": 14
      },
      {
        "id": "rev-prod-38-17",
        "author": "신*현",
        "rating": 5,
        "date": "2026-08-10",
        "content": "주변 지인들에게도 강력 추천하고 있는 애정템입니다.",
        "likes": 12
      },
      {
        "id": "rev-prod-38-18",
        "author": "권*호",
        "rating": 5,
        "date": "2026-08-07",
        "content": "작은 소품 하나로 삶의 질이 수직 상승한 걸 느낍니다.",
        "likes": 10
      },
      {
        "id": "rev-prod-38-19",
        "author": "황*훈",
        "rating": 4,
        "date": "2026-08-04",
        "content": "이지샵 리빙 카테고리는 늘 실패가 없어서 믿고 삽니다.",
        "likes": 9
      },
      {
        "id": "rev-prod-38-20",
        "author": "안*서",
        "rating": 5,
        "date": "2026-08-01",
        "content": "가성비와 감성을 모두 잡은 최고의 인테리어 아이템입니다!",
        "likes": 7
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-38-1",
        "author": "서*태",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-39",
    "name": "핸드메이드 세라믹 머그 & 우드 코스터 세트",
    "category": "리빙 / 인테리어",
    "categoryId": "cat-living",
    "price": 24000,
    "originalPrice": 32000,
    "discountRate": 25,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 46,
    "isBest": false,
    "isNew": true,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "도예 작가의 정성스런 손길로 빚은 질감, 월넛 천연목 코스터 포함",
    "description": "<h3>따뜻한 온기를 전하는 테이블웨어</h3><p>1,250도 고온 소성으로 내구성이 뛰어나며 전자레인지 및 식기세척기 사용이 가능합니다.</p>",
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
        "id": "rev-prod-39-1",
        "author": "송*은",
        "rating": 4,
        "date": "2026-09-26",
        "content": "핸드메이드 세라믹 머그 & 우드 코스터 세트 하나로 집안 분위기가 호텔처럼 아늑해졌습니다.",
        "likes": 40
      },
      {
        "id": "rev-prod-39-2",
        "author": "전*윤",
        "rating": 5,
        "date": "2026-09-23",
        "content": "디자인이 감각적이고 공간 어디에 두어도 인테리어가 사네요.",
        "likes": 38
      },
      {
        "id": "rev-prod-39-3",
        "author": "홍*민",
        "rating": 5,
        "date": "2026-09-20",
        "content": "실용성이 뛰어나서 매일매일 유용하게 잘 쓰고 있습니다.",
        "likes": 36
      },
      {
        "id": "rev-prod-39-4",
        "author": "유*지",
        "rating": 5,
        "date": "2026-09-17",
        "content": "마감 퀄리티가 정교하고 흠집 없이 깨끗하게 배송되었습니다.",
        "likes": 35
      },
      {
        "id": "rev-prod-39-5",
        "author": "고*정",
        "rating": 5,
        "date": "2026-09-14",
        "content": "집들이 선물로 가져갔는데 센스 있다는 칭찬 엄청 들었어요.",
        "likes": 33
      },
      {
        "id": "rev-prod-39-6",
        "author": "문*영",
        "rating": 5,
        "date": "2026-09-11",
        "content": "재질이 고급스럽고 내구성이 좋아서 오래 쓸 수 있겠어요.",
        "likes": 32
      },
      {
        "id": "rev-prod-39-7",
        "author": "양*원",
        "rating": 4,
        "date": "2026-09-08",
        "content": "사용법이 간편하고 세척 및 관리하기가 정말 수월합니다.",
        "likes": 30
      },
      {
        "id": "rev-prod-39-8",
        "author": "손*린",
        "rating": 5,
        "date": "2026-09-05",
        "content": "원목과 패브릭의 따뜻한 감성이 일상에 큰 힐링을 줍니다.",
        "likes": 28
      },
      {
        "id": "rev-prod-39-9",
        "author": "배*준",
        "rating": 5,
        "date": "2026-09-02",
        "content": "크기와 비율이 딱 적당해서 공간 차지도 많이 안 하고 좋아요.",
        "likes": 27
      },
      {
        "id": "rev-prod-39-10",
        "author": "백*경",
        "rating": 5,
        "date": "2026-08-30",
        "content": "가격 대비 만족도가 200%인 리빙 인테리어 소품입니다.",
        "likes": 25
      },
      {
        "id": "rev-prod-39-11",
        "author": "허*수",
        "rating": 5,
        "date": "2026-08-27",
        "content": "눈에 띌 때마다 기분이 좋아지는 감성 가득한 아이템이에요.",
        "likes": 24
      },
      {
        "id": "rev-prod-39-12",
        "author": "노*우",
        "rating": 5,
        "date": "2026-08-24",
        "content": "선물 포장 상자부터 완충재까지 정성이 가득 담겨왔습니다.",
        "likes": 22
      },
      {
        "id": "rev-prod-39-13",
        "author": "남*희",
        "rating": 4,
        "date": "2026-08-21",
        "content": "침실 협탁과 거실 선반 어디에 올려두어도 멋스럽습니다.",
        "likes": 20
      },
      {
        "id": "rev-prod-39-14",
        "author": "심*진",
        "rating": 5,
        "date": "2026-08-18",
        "content": "튼튼하면서도 가벼워서 위치를 옮겨가며 쓰기 편해요.",
        "likes": 19
      },
      {
        "id": "rev-prod-39-15",
        "author": "김*아",
        "rating": 5,
        "date": "2026-08-15",
        "content": "집안에 머무는 시간이 더 행복해지는 기분 좋은 변화입니다.",
        "likes": 17
      },
      {
        "id": "rev-prod-39-16",
        "author": "이*태",
        "rating": 5,
        "date": "2026-08-12",
        "content": "색감이 모던하고 은은해서 어떤 가구와도 잘 어울립니다.",
        "likes": 16
      },
      {
        "id": "rev-prod-39-17",
        "author": "박*현",
        "rating": 5,
        "date": "2026-08-09",
        "content": "주변 지인들에게도 강력 추천하고 있는 애정템입니다.",
        "likes": 14
      },
      {
        "id": "rev-prod-39-18",
        "author": "최*호",
        "rating": 5,
        "date": "2026-08-06",
        "content": "작은 소품 하나로 삶의 질이 수직 상승한 걸 느낍니다.",
        "likes": 12
      },
      {
        "id": "rev-prod-39-19",
        "author": "정*훈",
        "rating": 4,
        "date": "2026-08-03",
        "content": "이지샵 리빙 카테고리는 늘 실패가 없어서 믿고 삽니다.",
        "likes": 11
      },
      {
        "id": "rev-prod-39-20",
        "author": "강*서",
        "rating": 5,
        "date": "2026-07-31",
        "content": "가성비와 감성을 모두 잡은 최고의 인테리어 아이템입니다!",
        "likes": 9
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-39-1",
        "author": "신*현",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-40",
    "name": "호텔식 60수 고밀도 프리미엄 순면 차렵이불 세트 (Q/K)",
    "category": "리빙 / 인테리어",
    "categoryId": "cat-living",
    "price": 139000,
    "originalPrice": 198000,
    "discountRate": 30,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 53,
    "isBest": true,
    "isNew": false,
    "isSale": true,
    "isFreeShipping": true,
    "thumbnail": "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "사각거리는 5성급 호텔 침구의 감촉, 마이크로 화이버 항균 솜 충전",
    "description": "<h3>매일 밤 5성급 스위트룸에서 잠드는 기분</h3><p>60수 고밀도 원단으로 집먼지진드기를 완벽 차단하며, 세탁기 통세탁이 가능하여 관리가 편리합니다.</p>",
    "options": [
      {
        "name": "클라우드 화이트 / 퀸(Q)",
        "stock": 15
      },
      {
        "name": "소프트 차콜 / 퀸(Q)",
        "stock": 15
      },
      {
        "name": "클라우드 화이트 / 킹(K)",
        "stock": 10
      }
    ],
    "specs": {
      "원단": "60수 고밀도 바이오워싱 순면 100%",
      "충전재": "마이크로화이버 항균솜"
    },
    "reviews": [
      {
        "id": "rev-prod-40-1",
        "author": "조*은",
        "rating": 4,
        "date": "2026-09-25",
        "content": "호텔식 60수 고밀도 프리미엄 순면 차렵이불 세트 (Q/K) 하나로 집안 분위기가 호텔처럼 아늑해졌습니다.",
        "likes": 42
      },
      {
        "id": "rev-prod-40-2",
        "author": "윤*윤",
        "rating": 5,
        "date": "2026-09-22",
        "content": "디자인이 감각적이고 공간 어디에 두어도 인테리어가 사네요.",
        "likes": 40
      },
      {
        "id": "rev-prod-40-3",
        "author": "장*민",
        "rating": 5,
        "date": "2026-09-19",
        "content": "실용성이 뛰어나서 매일매일 유용하게 잘 쓰고 있습니다.",
        "likes": 38
      },
      {
        "id": "rev-prod-40-4",
        "author": "임*지",
        "rating": 5,
        "date": "2026-09-16",
        "content": "마감 퀄리티가 정교하고 흠집 없이 깨끗하게 배송되었습니다.",
        "likes": 37
      },
      {
        "id": "rev-prod-40-5",
        "author": "한*정",
        "rating": 5,
        "date": "2026-09-13",
        "content": "집들이 선물로 가져갔는데 센스 있다는 칭찬 엄청 들었어요.",
        "likes": 35
      },
      {
        "id": "rev-prod-40-6",
        "author": "오*영",
        "rating": 5,
        "date": "2026-09-10",
        "content": "재질이 고급스럽고 내구성이 좋아서 오래 쓸 수 있겠어요.",
        "likes": 34
      },
      {
        "id": "rev-prod-40-7",
        "author": "서*원",
        "rating": 4,
        "date": "2026-09-07",
        "content": "사용법이 간편하고 세척 및 관리하기가 정말 수월합니다.",
        "likes": 32
      },
      {
        "id": "rev-prod-40-8",
        "author": "신*린",
        "rating": 5,
        "date": "2026-09-04",
        "content": "원목과 패브릭의 따뜻한 감성이 일상에 큰 힐링을 줍니다.",
        "likes": 30
      },
      {
        "id": "rev-prod-40-9",
        "author": "권*준",
        "rating": 5,
        "date": "2026-09-01",
        "content": "크기와 비율이 딱 적당해서 공간 차지도 많이 안 하고 좋아요.",
        "likes": 29
      },
      {
        "id": "rev-prod-40-10",
        "author": "황*경",
        "rating": 5,
        "date": "2026-08-29",
        "content": "가격 대비 만족도가 200%인 리빙 인테리어 소품입니다.",
        "likes": 27
      },
      {
        "id": "rev-prod-40-11",
        "author": "안*수",
        "rating": 5,
        "date": "2026-08-26",
        "content": "눈에 띌 때마다 기분이 좋아지는 감성 가득한 아이템이에요.",
        "likes": 26
      },
      {
        "id": "rev-prod-40-12",
        "author": "송*우",
        "rating": 5,
        "date": "2026-08-23",
        "content": "선물 포장 상자부터 완충재까지 정성이 가득 담겨왔습니다.",
        "likes": 24
      },
      {
        "id": "rev-prod-40-13",
        "author": "전*희",
        "rating": 4,
        "date": "2026-08-20",
        "content": "침실 협탁과 거실 선반 어디에 올려두어도 멋스럽습니다.",
        "likes": 22
      },
      {
        "id": "rev-prod-40-14",
        "author": "홍*진",
        "rating": 5,
        "date": "2026-08-17",
        "content": "튼튼하면서도 가벼워서 위치를 옮겨가며 쓰기 편해요.",
        "likes": 21
      },
      {
        "id": "rev-prod-40-15",
        "author": "유*아",
        "rating": 5,
        "date": "2026-08-14",
        "content": "집안에 머무는 시간이 더 행복해지는 기분 좋은 변화입니다.",
        "likes": 19
      },
      {
        "id": "rev-prod-40-16",
        "author": "고*태",
        "rating": 5,
        "date": "2026-08-11",
        "content": "색감이 모던하고 은은해서 어떤 가구와도 잘 어울립니다.",
        "likes": 18
      },
      {
        "id": "rev-prod-40-17",
        "author": "문*현",
        "rating": 5,
        "date": "2026-08-08",
        "content": "주변 지인들에게도 강력 추천하고 있는 애정템입니다.",
        "likes": 16
      },
      {
        "id": "rev-prod-40-18",
        "author": "양*호",
        "rating": 5,
        "date": "2026-08-05",
        "content": "작은 소품 하나로 삶의 질이 수직 상승한 걸 느낍니다.",
        "likes": 14
      },
      {
        "id": "rev-prod-40-19",
        "author": "손*훈",
        "rating": 4,
        "date": "2026-08-02",
        "content": "이지샵 리빙 카테고리는 늘 실패가 없어서 믿고 삽니다.",
        "likes": 13
      },
      {
        "id": "rev-prod-40-20",
        "author": "배*서",
        "rating": 5,
        "date": "2026-07-30",
        "content": "가성비와 감성을 모두 잡은 최고의 인테리어 아이템입니다!",
        "likes": 11
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-40-1",
        "author": "권*호",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-41",
    "name": "천연 규조토 소프트 순간 흡수 발매트",
    "category": "리빙 / 인테리어",
    "categoryId": "cat-living",
    "price": 19000,
    "originalPrice": 28000,
    "discountRate": 32,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 60,
    "isBest": true,
    "isNew": true,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "발 딛는 순간 1초 만에 뽀송하게 건조, 깨질 걱정 없는 폭신한 3세대 소프트 규조토",
    "description": "<h3>축축한 욕실 발매트는 이제 그만</h3><p>바닥 미끄럼 방지 실리콘 패킹과 물세탁 가능한 구조로 곰팡이와 세균 번식을 완벽 차단합니다.</p>",
    "options": [
      {
        "name": "모던 그레이 (60x40cm)",
        "stock": 50
      },
      {
        "name": "테라조 베이지 (60x40cm)",
        "stock": 40
      }
    ],
    "specs": {
      "재질": "천연 규조토 추출 분말 + 재생 고무",
      "크기": "60 x 40 cm"
    },
    "reviews": [
      {
        "id": "rev-prod-41-1",
        "author": "백*은",
        "rating": 4,
        "date": "2026-09-24",
        "content": "천연 규조토 소프트 순간 흡수 발매트 하나로 집안 분위기가 호텔처럼 아늑해졌습니다.",
        "likes": 34
      },
      {
        "id": "rev-prod-41-2",
        "author": "허*윤",
        "rating": 5,
        "date": "2026-09-21",
        "content": "디자인이 감각적이고 공간 어디에 두어도 인테리어가 사네요.",
        "likes": 32
      },
      {
        "id": "rev-prod-41-3",
        "author": "노*민",
        "rating": 5,
        "date": "2026-09-18",
        "content": "실용성이 뛰어나서 매일매일 유용하게 잘 쓰고 있습니다.",
        "likes": 30
      },
      {
        "id": "rev-prod-41-4",
        "author": "남*지",
        "rating": 5,
        "date": "2026-09-15",
        "content": "마감 퀄리티가 정교하고 흠집 없이 깨끗하게 배송되었습니다.",
        "likes": 29
      },
      {
        "id": "rev-prod-41-5",
        "author": "심*정",
        "rating": 5,
        "date": "2026-09-12",
        "content": "집들이 선물로 가져갔는데 센스 있다는 칭찬 엄청 들었어요.",
        "likes": 27
      },
      {
        "id": "rev-prod-41-6",
        "author": "김*영",
        "rating": 5,
        "date": "2026-09-09",
        "content": "재질이 고급스럽고 내구성이 좋아서 오래 쓸 수 있겠어요.",
        "likes": 26
      },
      {
        "id": "rev-prod-41-7",
        "author": "이*원",
        "rating": 4,
        "date": "2026-09-06",
        "content": "사용법이 간편하고 세척 및 관리하기가 정말 수월합니다.",
        "likes": 24
      },
      {
        "id": "rev-prod-41-8",
        "author": "박*린",
        "rating": 5,
        "date": "2026-09-03",
        "content": "원목과 패브릭의 따뜻한 감성이 일상에 큰 힐링을 줍니다.",
        "likes": 22
      },
      {
        "id": "rev-prod-41-9",
        "author": "최*준",
        "rating": 5,
        "date": "2026-08-31",
        "content": "크기와 비율이 딱 적당해서 공간 차지도 많이 안 하고 좋아요.",
        "likes": 21
      },
      {
        "id": "rev-prod-41-10",
        "author": "정*경",
        "rating": 5,
        "date": "2026-08-28",
        "content": "가격 대비 만족도가 200%인 리빙 인테리어 소품입니다.",
        "likes": 19
      },
      {
        "id": "rev-prod-41-11",
        "author": "강*수",
        "rating": 5,
        "date": "2026-08-25",
        "content": "눈에 띌 때마다 기분이 좋아지는 감성 가득한 아이템이에요.",
        "likes": 18
      },
      {
        "id": "rev-prod-41-12",
        "author": "조*우",
        "rating": 5,
        "date": "2026-08-22",
        "content": "선물 포장 상자부터 완충재까지 정성이 가득 담겨왔습니다.",
        "likes": 16
      },
      {
        "id": "rev-prod-41-13",
        "author": "윤*희",
        "rating": 4,
        "date": "2026-08-19",
        "content": "침실 협탁과 거실 선반 어디에 올려두어도 멋스럽습니다.",
        "likes": 14
      },
      {
        "id": "rev-prod-41-14",
        "author": "장*진",
        "rating": 5,
        "date": "2026-08-16",
        "content": "튼튼하면서도 가벼워서 위치를 옮겨가며 쓰기 편해요.",
        "likes": 13
      },
      {
        "id": "rev-prod-41-15",
        "author": "임*아",
        "rating": 5,
        "date": "2026-08-13",
        "content": "집안에 머무는 시간이 더 행복해지는 기분 좋은 변화입니다.",
        "likes": 11
      },
      {
        "id": "rev-prod-41-16",
        "author": "한*태",
        "rating": 5,
        "date": "2026-08-10",
        "content": "색감이 모던하고 은은해서 어떤 가구와도 잘 어울립니다.",
        "likes": 10
      },
      {
        "id": "rev-prod-41-17",
        "author": "오*현",
        "rating": 5,
        "date": "2026-08-07",
        "content": "주변 지인들에게도 강력 추천하고 있는 애정템입니다.",
        "likes": 8
      },
      {
        "id": "rev-prod-41-18",
        "author": "서*호",
        "rating": 5,
        "date": "2026-08-04",
        "content": "작은 소품 하나로 삶의 질이 수직 상승한 걸 느낍니다.",
        "likes": 6
      },
      {
        "id": "rev-prod-41-19",
        "author": "신*훈",
        "rating": 4,
        "date": "2026-08-01",
        "content": "이지샵 리빙 카테고리는 늘 실패가 없어서 믿고 삽니다.",
        "likes": 5
      },
      {
        "id": "rev-prod-41-20",
        "author": "권*서",
        "rating": 5,
        "date": "2026-07-29",
        "content": "가성비와 감성을 모두 잡은 최고의 인테리어 아이템입니다!",
        "likes": 3
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-41-1",
        "author": "황*훈",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-42",
    "name": "북미산 천연 월넛 원목 북스탠드 독서대",
    "category": "리빙 / 인테리어",
    "categoryId": "cat-living",
    "price": 42000,
    "originalPrice": 58000,
    "discountRate": 28,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 67,
    "isBest": false,
    "isNew": false,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "5단계 각도 조절, 두꺼운 전공서적과 태블릿도 안정적으로 지지하는 원목 독서대",
    "description": "<h3>책 읽는 시간을 특별하게 만드는 원목의 따스함</h3><p>천연 오일 마감으로 은은한 나무 향이 감돌며, 투명 아크릴 페이지 고정대로 시야 방해 없이 독서에 몰입할 수 있습니다.</p>",
    "options": [
      {
        "name": "월넛 (대형 / 39x28cm)",
        "stock": 30
      },
      {
        "name": "내추럴 오크 (대형 / 39x28cm)",
        "stock": 25
      }
    ],
    "specs": {
      "목재": "북미산 FAS등급 천연 월넛/오크",
      "무게": "약 980g"
    },
    "reviews": [
      {
        "id": "rev-prod-42-1",
        "author": "황*은",
        "rating": 4,
        "date": "2026-09-23",
        "content": "북미산 천연 월넛 원목 북스탠드 독서대 하나로 집안 분위기가 호텔처럼 아늑해졌습니다.",
        "likes": 36
      },
      {
        "id": "rev-prod-42-2",
        "author": "안*윤",
        "rating": 5,
        "date": "2026-09-20",
        "content": "디자인이 감각적이고 공간 어디에 두어도 인테리어가 사네요.",
        "likes": 34
      },
      {
        "id": "rev-prod-42-3",
        "author": "송*민",
        "rating": 5,
        "date": "2026-09-17",
        "content": "실용성이 뛰어나서 매일매일 유용하게 잘 쓰고 있습니다.",
        "likes": 32
      },
      {
        "id": "rev-prod-42-4",
        "author": "전*지",
        "rating": 5,
        "date": "2026-09-14",
        "content": "마감 퀄리티가 정교하고 흠집 없이 깨끗하게 배송되었습니다.",
        "likes": 31
      },
      {
        "id": "rev-prod-42-5",
        "author": "홍*정",
        "rating": 5,
        "date": "2026-09-11",
        "content": "집들이 선물로 가져갔는데 센스 있다는 칭찬 엄청 들었어요.",
        "likes": 29
      },
      {
        "id": "rev-prod-42-6",
        "author": "유*영",
        "rating": 5,
        "date": "2026-09-08",
        "content": "재질이 고급스럽고 내구성이 좋아서 오래 쓸 수 있겠어요.",
        "likes": 28
      },
      {
        "id": "rev-prod-42-7",
        "author": "고*원",
        "rating": 4,
        "date": "2026-09-05",
        "content": "사용법이 간편하고 세척 및 관리하기가 정말 수월합니다.",
        "likes": 26
      },
      {
        "id": "rev-prod-42-8",
        "author": "문*린",
        "rating": 5,
        "date": "2026-09-02",
        "content": "원목과 패브릭의 따뜻한 감성이 일상에 큰 힐링을 줍니다.",
        "likes": 24
      },
      {
        "id": "rev-prod-42-9",
        "author": "양*준",
        "rating": 5,
        "date": "2026-08-30",
        "content": "크기와 비율이 딱 적당해서 공간 차지도 많이 안 하고 좋아요.",
        "likes": 23
      },
      {
        "id": "rev-prod-42-10",
        "author": "손*경",
        "rating": 5,
        "date": "2026-08-27",
        "content": "가격 대비 만족도가 200%인 리빙 인테리어 소품입니다.",
        "likes": 21
      },
      {
        "id": "rev-prod-42-11",
        "author": "배*수",
        "rating": 5,
        "date": "2026-08-24",
        "content": "눈에 띌 때마다 기분이 좋아지는 감성 가득한 아이템이에요.",
        "likes": 20
      },
      {
        "id": "rev-prod-42-12",
        "author": "백*우",
        "rating": 5,
        "date": "2026-08-21",
        "content": "선물 포장 상자부터 완충재까지 정성이 가득 담겨왔습니다.",
        "likes": 18
      },
      {
        "id": "rev-prod-42-13",
        "author": "허*희",
        "rating": 4,
        "date": "2026-08-18",
        "content": "침실 협탁과 거실 선반 어디에 올려두어도 멋스럽습니다.",
        "likes": 16
      },
      {
        "id": "rev-prod-42-14",
        "author": "노*진",
        "rating": 5,
        "date": "2026-08-15",
        "content": "튼튼하면서도 가벼워서 위치를 옮겨가며 쓰기 편해요.",
        "likes": 15
      },
      {
        "id": "rev-prod-42-15",
        "author": "남*아",
        "rating": 5,
        "date": "2026-08-12",
        "content": "집안에 머무는 시간이 더 행복해지는 기분 좋은 변화입니다.",
        "likes": 13
      },
      {
        "id": "rev-prod-42-16",
        "author": "심*태",
        "rating": 5,
        "date": "2026-08-09",
        "content": "색감이 모던하고 은은해서 어떤 가구와도 잘 어울립니다.",
        "likes": 12
      },
      {
        "id": "rev-prod-42-17",
        "author": "김*현",
        "rating": 5,
        "date": "2026-08-06",
        "content": "주변 지인들에게도 강력 추천하고 있는 애정템입니다.",
        "likes": 10
      },
      {
        "id": "rev-prod-42-18",
        "author": "이*호",
        "rating": 5,
        "date": "2026-08-03",
        "content": "작은 소품 하나로 삶의 질이 수직 상승한 걸 느낍니다.",
        "likes": 8
      },
      {
        "id": "rev-prod-42-19",
        "author": "박*훈",
        "rating": 4,
        "date": "2026-07-31",
        "content": "이지샵 리빙 카테고리는 늘 실패가 없어서 믿고 삽니다.",
        "likes": 7
      },
      {
        "id": "rev-prod-42-20",
        "author": "최*서",
        "rating": 5,
        "date": "2026-07-28",
        "content": "가성비와 감성을 모두 잡은 최고의 인테리어 아이템입니다!",
        "likes": 5
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-42-1",
        "author": "안*서",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-43",
    "name": "미니멀 우드 프레임 LED 탁상 전자시계 (온습도계 겸용)",
    "category": "리빙 / 인테리어",
    "categoryId": "cat-living",
    "price": 28000,
    "originalPrice": 38000,
    "discountRate": 26,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 74,
    "isBest": false,
    "isNew": true,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "음성 인식 절전 모드, 실시간 실내 온도 & 습도 표시, 3단계 밝기 조절",
    "description": "<h3>시간과 공간을 깔끔하게 정돈하는 인테리어 시계</h3><p>손뼉을 치거나 가볍게 터치하면 LED가 부드럽게 켜지며, 모던한 원목 블록 디자인으로 침실과 거실 어디에나 조화롭습니다.</p>",
    "options": [
      {
        "name": "내추럴 우드",
        "stock": 35
      },
      {
        "name": "블랙 우드",
        "stock": 25
      }
    ],
    "specs": {
      "전원": "USB C타입 상시 전원 / AAA 건전지 겸용",
      "기능": "시간, 날짜, 온습도, 알람 3개"
    },
    "reviews": [
      {
        "id": "rev-prod-43-1",
        "author": "정*은",
        "rating": 4,
        "date": "2026-09-29",
        "content": "미니멀 우드 프레임 LED 탁상 전자시계 (온습도계 겸용) 하나로 집안 분위기가 호텔처럼 아늑해졌습니다.",
        "likes": 38
      },
      {
        "id": "rev-prod-43-2",
        "author": "강*윤",
        "rating": 5,
        "date": "2026-09-26",
        "content": "디자인이 감각적이고 공간 어디에 두어도 인테리어가 사네요.",
        "likes": 36
      },
      {
        "id": "rev-prod-43-3",
        "author": "조*민",
        "rating": 5,
        "date": "2026-09-23",
        "content": "실용성이 뛰어나서 매일매일 유용하게 잘 쓰고 있습니다.",
        "likes": 34
      },
      {
        "id": "rev-prod-43-4",
        "author": "윤*지",
        "rating": 5,
        "date": "2026-09-20",
        "content": "마감 퀄리티가 정교하고 흠집 없이 깨끗하게 배송되었습니다.",
        "likes": 33
      },
      {
        "id": "rev-prod-43-5",
        "author": "장*정",
        "rating": 5,
        "date": "2026-09-17",
        "content": "집들이 선물로 가져갔는데 센스 있다는 칭찬 엄청 들었어요.",
        "likes": 31
      },
      {
        "id": "rev-prod-43-6",
        "author": "임*영",
        "rating": 5,
        "date": "2026-09-14",
        "content": "재질이 고급스럽고 내구성이 좋아서 오래 쓸 수 있겠어요.",
        "likes": 30
      },
      {
        "id": "rev-prod-43-7",
        "author": "한*원",
        "rating": 4,
        "date": "2026-09-11",
        "content": "사용법이 간편하고 세척 및 관리하기가 정말 수월합니다.",
        "likes": 28
      },
      {
        "id": "rev-prod-43-8",
        "author": "오*린",
        "rating": 5,
        "date": "2026-09-08",
        "content": "원목과 패브릭의 따뜻한 감성이 일상에 큰 힐링을 줍니다.",
        "likes": 26
      },
      {
        "id": "rev-prod-43-9",
        "author": "서*준",
        "rating": 5,
        "date": "2026-09-05",
        "content": "크기와 비율이 딱 적당해서 공간 차지도 많이 안 하고 좋아요.",
        "likes": 25
      },
      {
        "id": "rev-prod-43-10",
        "author": "신*경",
        "rating": 5,
        "date": "2026-09-02",
        "content": "가격 대비 만족도가 200%인 리빙 인테리어 소품입니다.",
        "likes": 23
      },
      {
        "id": "rev-prod-43-11",
        "author": "권*수",
        "rating": 5,
        "date": "2026-08-30",
        "content": "눈에 띌 때마다 기분이 좋아지는 감성 가득한 아이템이에요.",
        "likes": 22
      },
      {
        "id": "rev-prod-43-12",
        "author": "황*우",
        "rating": 5,
        "date": "2026-08-27",
        "content": "선물 포장 상자부터 완충재까지 정성이 가득 담겨왔습니다.",
        "likes": 20
      },
      {
        "id": "rev-prod-43-13",
        "author": "안*희",
        "rating": 4,
        "date": "2026-08-24",
        "content": "침실 협탁과 거실 선반 어디에 올려두어도 멋스럽습니다.",
        "likes": 18
      },
      {
        "id": "rev-prod-43-14",
        "author": "송*진",
        "rating": 5,
        "date": "2026-08-21",
        "content": "튼튼하면서도 가벼워서 위치를 옮겨가며 쓰기 편해요.",
        "likes": 17
      },
      {
        "id": "rev-prod-43-15",
        "author": "전*아",
        "rating": 5,
        "date": "2026-08-18",
        "content": "집안에 머무는 시간이 더 행복해지는 기분 좋은 변화입니다.",
        "likes": 15
      },
      {
        "id": "rev-prod-43-16",
        "author": "홍*태",
        "rating": 5,
        "date": "2026-08-15",
        "content": "색감이 모던하고 은은해서 어떤 가구와도 잘 어울립니다.",
        "likes": 14
      },
      {
        "id": "rev-prod-43-17",
        "author": "유*현",
        "rating": 5,
        "date": "2026-08-12",
        "content": "주변 지인들에게도 강력 추천하고 있는 애정템입니다.",
        "likes": 12
      },
      {
        "id": "rev-prod-43-18",
        "author": "고*호",
        "rating": 5,
        "date": "2026-08-09",
        "content": "작은 소품 하나로 삶의 질이 수직 상승한 걸 느낍니다.",
        "likes": 10
      },
      {
        "id": "rev-prod-43-19",
        "author": "문*훈",
        "rating": 4,
        "date": "2026-08-06",
        "content": "이지샵 리빙 카테고리는 늘 실패가 없어서 믿고 삽니다.",
        "likes": 9
      },
      {
        "id": "rev-prod-43-20",
        "author": "양*서",
        "rating": 5,
        "date": "2026-08-03",
        "content": "가성비와 감성을 모두 잡은 최고의 인테리어 아이템입니다!",
        "likes": 7
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-43-1",
        "author": "송*은",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-44",
    "name": "친환경 천연 사이잘삼 주방 수세미 & 우드 브러시 5종 세트",
    "category": "리빙 / 인테리어",
    "categoryId": "cat-living",
    "price": 21000,
    "originalPrice": 29000,
    "discountRate": 28,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 31,
    "isBest": false,
    "isNew": false,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "미세플라스틱 0% 제로웨이스트 설거지, 냄비 스크래치 없는 천연 식물모 브러시",
    "description": "<h3>지구와 내 식기를 위한 건강한 주방 루틴</h3><p>너도밤나무 손잡이와 천연 사이잘삼 섬유로 기름때와 찌든 때를 말끔히 닦아내며 생분해되는 친환경 주방 세트입니다.</p>",
    "options": [
      {
        "name": "친환경 설거지 5종 풀패키지",
        "stock": 45
      }
    ],
    "specs": {
      "구성": "손잡이 브러시 2종 + 천연 수세미 3매 + 전용 거치 고리"
    },
    "reviews": [
      {
        "id": "rev-prod-44-1",
        "author": "손*은",
        "rating": 4,
        "date": "2026-09-28",
        "content": "친환경 천연 사이잘삼 주방 수세미 & 우드 브러시 5종 세트 하나로 집안 분위기가 호텔처럼 아늑해졌습니다.",
        "likes": 40
      },
      {
        "id": "rev-prod-44-2",
        "author": "배*윤",
        "rating": 5,
        "date": "2026-09-25",
        "content": "디자인이 감각적이고 공간 어디에 두어도 인테리어가 사네요.",
        "likes": 38
      },
      {
        "id": "rev-prod-44-3",
        "author": "백*민",
        "rating": 5,
        "date": "2026-09-22",
        "content": "실용성이 뛰어나서 매일매일 유용하게 잘 쓰고 있습니다.",
        "likes": 36
      },
      {
        "id": "rev-prod-44-4",
        "author": "허*지",
        "rating": 5,
        "date": "2026-09-19",
        "content": "마감 퀄리티가 정교하고 흠집 없이 깨끗하게 배송되었습니다.",
        "likes": 35
      },
      {
        "id": "rev-prod-44-5",
        "author": "노*정",
        "rating": 5,
        "date": "2026-09-16",
        "content": "집들이 선물로 가져갔는데 센스 있다는 칭찬 엄청 들었어요.",
        "likes": 33
      },
      {
        "id": "rev-prod-44-6",
        "author": "남*영",
        "rating": 5,
        "date": "2026-09-13",
        "content": "재질이 고급스럽고 내구성이 좋아서 오래 쓸 수 있겠어요.",
        "likes": 32
      },
      {
        "id": "rev-prod-44-7",
        "author": "심*원",
        "rating": 4,
        "date": "2026-09-10",
        "content": "사용법이 간편하고 세척 및 관리하기가 정말 수월합니다.",
        "likes": 30
      },
      {
        "id": "rev-prod-44-8",
        "author": "김*린",
        "rating": 5,
        "date": "2026-09-07",
        "content": "원목과 패브릭의 따뜻한 감성이 일상에 큰 힐링을 줍니다.",
        "likes": 28
      },
      {
        "id": "rev-prod-44-9",
        "author": "이*준",
        "rating": 5,
        "date": "2026-09-04",
        "content": "크기와 비율이 딱 적당해서 공간 차지도 많이 안 하고 좋아요.",
        "likes": 27
      },
      {
        "id": "rev-prod-44-10",
        "author": "박*경",
        "rating": 5,
        "date": "2026-09-01",
        "content": "가격 대비 만족도가 200%인 리빙 인테리어 소품입니다.",
        "likes": 25
      },
      {
        "id": "rev-prod-44-11",
        "author": "최*수",
        "rating": 5,
        "date": "2026-08-29",
        "content": "눈에 띌 때마다 기분이 좋아지는 감성 가득한 아이템이에요.",
        "likes": 24
      },
      {
        "id": "rev-prod-44-12",
        "author": "정*우",
        "rating": 5,
        "date": "2026-08-26",
        "content": "선물 포장 상자부터 완충재까지 정성이 가득 담겨왔습니다.",
        "likes": 22
      },
      {
        "id": "rev-prod-44-13",
        "author": "강*희",
        "rating": 4,
        "date": "2026-08-23",
        "content": "침실 협탁과 거실 선반 어디에 올려두어도 멋스럽습니다.",
        "likes": 20
      },
      {
        "id": "rev-prod-44-14",
        "author": "조*진",
        "rating": 5,
        "date": "2026-08-20",
        "content": "튼튼하면서도 가벼워서 위치를 옮겨가며 쓰기 편해요.",
        "likes": 19
      },
      {
        "id": "rev-prod-44-15",
        "author": "윤*아",
        "rating": 5,
        "date": "2026-08-17",
        "content": "집안에 머무는 시간이 더 행복해지는 기분 좋은 변화입니다.",
        "likes": 17
      },
      {
        "id": "rev-prod-44-16",
        "author": "장*태",
        "rating": 5,
        "date": "2026-08-14",
        "content": "색감이 모던하고 은은해서 어떤 가구와도 잘 어울립니다.",
        "likes": 16
      },
      {
        "id": "rev-prod-44-17",
        "author": "임*현",
        "rating": 5,
        "date": "2026-08-11",
        "content": "주변 지인들에게도 강력 추천하고 있는 애정템입니다.",
        "likes": 14
      },
      {
        "id": "rev-prod-44-18",
        "author": "한*호",
        "rating": 5,
        "date": "2026-08-08",
        "content": "작은 소품 하나로 삶의 질이 수직 상승한 걸 느낍니다.",
        "likes": 12
      },
      {
        "id": "rev-prod-44-19",
        "author": "오*훈",
        "rating": 4,
        "date": "2026-08-05",
        "content": "이지샵 리빙 카테고리는 늘 실패가 없어서 믿고 삽니다.",
        "likes": 11
      },
      {
        "id": "rev-prod-44-20",
        "author": "서*서",
        "rating": 5,
        "date": "2026-08-02",
        "content": "가성비와 감성을 모두 잡은 최고의 인테리어 아이템입니다!",
        "likes": 9
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-44-1",
        "author": "전*윤",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-45",
    "name": "프렌치 내추럴 린넨 키친 크로스 티타월 (4종 세트)",
    "category": "리빙 / 인테리어",
    "categoryId": "cat-living",
    "price": 25000,
    "originalPrice": 34000,
    "discountRate": 26,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 38,
    "isBest": false,
    "isNew": true,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "빠른 건조력과 뛰어난 흡수력, 플레이팅 매트 및 식기 건조용 다목적 린넨 패브릭",
    "description": "<h3>주방의 품격을 높여주는 감성 키친 크로스</h3><p>프리미엄 워싱 린넨 코튼 혼방으로 세탁할수록 부드러워지며, 감각적인 체크와 스트라이프 패턴 4종 구성입니다.</p>",
    "options": [
      {
        "name": "클래식 어스 4종 세트 (45x65cm)",
        "stock": 40
      }
    ],
    "specs": {
      "크기": "45 x 65 cm (4매입)",
      "소재": "린넨 55%, 코튼 45%"
    },
    "reviews": [
      {
        "id": "rev-prod-45-1",
        "author": "신*은",
        "rating": 4,
        "date": "2026-09-27",
        "content": "프렌치 내추럴 린넨 키친 크로스 티타월 (4종 세트) 하나로 집안 분위기가 호텔처럼 아늑해졌습니다.",
        "likes": 42
      },
      {
        "id": "rev-prod-45-2",
        "author": "권*윤",
        "rating": 5,
        "date": "2026-09-24",
        "content": "디자인이 감각적이고 공간 어디에 두어도 인테리어가 사네요.",
        "likes": 40
      },
      {
        "id": "rev-prod-45-3",
        "author": "황*민",
        "rating": 5,
        "date": "2026-09-21",
        "content": "실용성이 뛰어나서 매일매일 유용하게 잘 쓰고 있습니다.",
        "likes": 38
      },
      {
        "id": "rev-prod-45-4",
        "author": "안*지",
        "rating": 5,
        "date": "2026-09-18",
        "content": "마감 퀄리티가 정교하고 흠집 없이 깨끗하게 배송되었습니다.",
        "likes": 37
      },
      {
        "id": "rev-prod-45-5",
        "author": "송*정",
        "rating": 5,
        "date": "2026-09-15",
        "content": "집들이 선물로 가져갔는데 센스 있다는 칭찬 엄청 들었어요.",
        "likes": 35
      },
      {
        "id": "rev-prod-45-6",
        "author": "전*영",
        "rating": 5,
        "date": "2026-09-12",
        "content": "재질이 고급스럽고 내구성이 좋아서 오래 쓸 수 있겠어요.",
        "likes": 34
      },
      {
        "id": "rev-prod-45-7",
        "author": "홍*원",
        "rating": 4,
        "date": "2026-09-09",
        "content": "사용법이 간편하고 세척 및 관리하기가 정말 수월합니다.",
        "likes": 32
      },
      {
        "id": "rev-prod-45-8",
        "author": "유*린",
        "rating": 5,
        "date": "2026-09-06",
        "content": "원목과 패브릭의 따뜻한 감성이 일상에 큰 힐링을 줍니다.",
        "likes": 30
      },
      {
        "id": "rev-prod-45-9",
        "author": "고*준",
        "rating": 5,
        "date": "2026-09-03",
        "content": "크기와 비율이 딱 적당해서 공간 차지도 많이 안 하고 좋아요.",
        "likes": 29
      },
      {
        "id": "rev-prod-45-10",
        "author": "문*경",
        "rating": 5,
        "date": "2026-08-31",
        "content": "가격 대비 만족도가 200%인 리빙 인테리어 소품입니다.",
        "likes": 27
      },
      {
        "id": "rev-prod-45-11",
        "author": "양*수",
        "rating": 5,
        "date": "2026-08-28",
        "content": "눈에 띌 때마다 기분이 좋아지는 감성 가득한 아이템이에요.",
        "likes": 26
      },
      {
        "id": "rev-prod-45-12",
        "author": "손*우",
        "rating": 5,
        "date": "2026-08-25",
        "content": "선물 포장 상자부터 완충재까지 정성이 가득 담겨왔습니다.",
        "likes": 24
      },
      {
        "id": "rev-prod-45-13",
        "author": "배*희",
        "rating": 4,
        "date": "2026-08-22",
        "content": "침실 협탁과 거실 선반 어디에 올려두어도 멋스럽습니다.",
        "likes": 22
      },
      {
        "id": "rev-prod-45-14",
        "author": "백*진",
        "rating": 5,
        "date": "2026-08-19",
        "content": "튼튼하면서도 가벼워서 위치를 옮겨가며 쓰기 편해요.",
        "likes": 21
      },
      {
        "id": "rev-prod-45-15",
        "author": "허*아",
        "rating": 5,
        "date": "2026-08-16",
        "content": "집안에 머무는 시간이 더 행복해지는 기분 좋은 변화입니다.",
        "likes": 19
      },
      {
        "id": "rev-prod-45-16",
        "author": "노*태",
        "rating": 5,
        "date": "2026-08-13",
        "content": "색감이 모던하고 은은해서 어떤 가구와도 잘 어울립니다.",
        "likes": 18
      },
      {
        "id": "rev-prod-45-17",
        "author": "남*현",
        "rating": 5,
        "date": "2026-08-10",
        "content": "주변 지인들에게도 강력 추천하고 있는 애정템입니다.",
        "likes": 16
      },
      {
        "id": "rev-prod-45-18",
        "author": "심*호",
        "rating": 5,
        "date": "2026-08-07",
        "content": "작은 소품 하나로 삶의 질이 수직 상승한 걸 느낍니다.",
        "likes": 14
      },
      {
        "id": "rev-prod-45-19",
        "author": "김*훈",
        "rating": 4,
        "date": "2026-08-04",
        "content": "이지샵 리빙 카테고리는 늘 실패가 없어서 믿고 삽니다.",
        "likes": 13
      },
      {
        "id": "rev-prod-45-20",
        "author": "이*서",
        "rating": 5,
        "date": "2026-08-01",
        "content": "가성비와 감성을 모두 잡은 최고의 인테리어 아이템입니다!",
        "likes": 11
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-45-1",
        "author": "홍*민",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-46",
    "name": "인체공학 C커브 3D 고밀도 메모리폼 경추베개",
    "category": "리빙 / 인테리어",
    "categoryId": "cat-living",
    "price": 49000,
    "originalPrice": 69000,
    "discountRate": 29,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 45,
    "isBest": true,
    "isNew": false,
    "isSale": true,
    "isFreeShipping": true,
    "thumbnail": "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "목뼈의 자연스러운 C자 곡선 완벽 지지, 텐셀 오가닉 항균 커버 포함",
    "description": "<h3>자고 일어나면 목과 어깨가 개운해지는 기적</h3><p>어깨 눌림을 방지하는 옆누움 전용 존과 통기성 에어홀 구조로 사계절 내내 쾌적한 숙면을 약속합니다.</p>",
    "options": [
      {
        "name": "스탠다드 (높이 9-11cm)",
        "stock": 35
      },
      {
        "name": "로우 (높이 7-9cm / 낮은 베개 선호)",
        "stock": 25
      }
    ],
    "specs": {
      "내장재": "60D 고밀도 메모리폼",
      "커버": "오가닉 텐셀 100% 분리세탁형"
    },
    "reviews": [
      {
        "id": "rev-prod-46-1",
        "author": "박*은",
        "rating": 4,
        "date": "2026-09-26",
        "content": "인체공학 C커브 3D 고밀도 메모리폼 경추베개 하나로 집안 분위기가 호텔처럼 아늑해졌습니다.",
        "likes": 34
      },
      {
        "id": "rev-prod-46-2",
        "author": "최*윤",
        "rating": 5,
        "date": "2026-09-23",
        "content": "디자인이 감각적이고 공간 어디에 두어도 인테리어가 사네요.",
        "likes": 32
      },
      {
        "id": "rev-prod-46-3",
        "author": "정*민",
        "rating": 5,
        "date": "2026-09-20",
        "content": "실용성이 뛰어나서 매일매일 유용하게 잘 쓰고 있습니다.",
        "likes": 30
      },
      {
        "id": "rev-prod-46-4",
        "author": "강*지",
        "rating": 5,
        "date": "2026-09-17",
        "content": "마감 퀄리티가 정교하고 흠집 없이 깨끗하게 배송되었습니다.",
        "likes": 29
      },
      {
        "id": "rev-prod-46-5",
        "author": "조*정",
        "rating": 5,
        "date": "2026-09-14",
        "content": "집들이 선물로 가져갔는데 센스 있다는 칭찬 엄청 들었어요.",
        "likes": 27
      },
      {
        "id": "rev-prod-46-6",
        "author": "윤*영",
        "rating": 5,
        "date": "2026-09-11",
        "content": "재질이 고급스럽고 내구성이 좋아서 오래 쓸 수 있겠어요.",
        "likes": 26
      },
      {
        "id": "rev-prod-46-7",
        "author": "장*원",
        "rating": 4,
        "date": "2026-09-08",
        "content": "사용법이 간편하고 세척 및 관리하기가 정말 수월합니다.",
        "likes": 24
      },
      {
        "id": "rev-prod-46-8",
        "author": "임*린",
        "rating": 5,
        "date": "2026-09-05",
        "content": "원목과 패브릭의 따뜻한 감성이 일상에 큰 힐링을 줍니다.",
        "likes": 22
      },
      {
        "id": "rev-prod-46-9",
        "author": "한*준",
        "rating": 5,
        "date": "2026-09-02",
        "content": "크기와 비율이 딱 적당해서 공간 차지도 많이 안 하고 좋아요.",
        "likes": 21
      },
      {
        "id": "rev-prod-46-10",
        "author": "오*경",
        "rating": 5,
        "date": "2026-08-30",
        "content": "가격 대비 만족도가 200%인 리빙 인테리어 소품입니다.",
        "likes": 19
      },
      {
        "id": "rev-prod-46-11",
        "author": "서*수",
        "rating": 5,
        "date": "2026-08-27",
        "content": "눈에 띌 때마다 기분이 좋아지는 감성 가득한 아이템이에요.",
        "likes": 18
      },
      {
        "id": "rev-prod-46-12",
        "author": "신*우",
        "rating": 5,
        "date": "2026-08-24",
        "content": "선물 포장 상자부터 완충재까지 정성이 가득 담겨왔습니다.",
        "likes": 16
      },
      {
        "id": "rev-prod-46-13",
        "author": "권*희",
        "rating": 4,
        "date": "2026-08-21",
        "content": "침실 협탁과 거실 선반 어디에 올려두어도 멋스럽습니다.",
        "likes": 14
      },
      {
        "id": "rev-prod-46-14",
        "author": "황*진",
        "rating": 5,
        "date": "2026-08-18",
        "content": "튼튼하면서도 가벼워서 위치를 옮겨가며 쓰기 편해요.",
        "likes": 13
      },
      {
        "id": "rev-prod-46-15",
        "author": "안*아",
        "rating": 5,
        "date": "2026-08-15",
        "content": "집안에 머무는 시간이 더 행복해지는 기분 좋은 변화입니다.",
        "likes": 11
      },
      {
        "id": "rev-prod-46-16",
        "author": "송*태",
        "rating": 5,
        "date": "2026-08-12",
        "content": "색감이 모던하고 은은해서 어떤 가구와도 잘 어울립니다.",
        "likes": 10
      },
      {
        "id": "rev-prod-46-17",
        "author": "전*현",
        "rating": 5,
        "date": "2026-08-09",
        "content": "주변 지인들에게도 강력 추천하고 있는 애정템입니다.",
        "likes": 8
      },
      {
        "id": "rev-prod-46-18",
        "author": "홍*호",
        "rating": 5,
        "date": "2026-08-06",
        "content": "작은 소품 하나로 삶의 질이 수직 상승한 걸 느낍니다.",
        "likes": 6
      },
      {
        "id": "rev-prod-46-19",
        "author": "유*훈",
        "rating": 4,
        "date": "2026-08-03",
        "content": "이지샵 리빙 카테고리는 늘 실패가 없어서 믿고 삽니다.",
        "likes": 5
      },
      {
        "id": "rev-prod-46-20",
        "author": "고*서",
        "rating": 5,
        "date": "2026-07-31",
        "content": "가성비와 감성을 모두 잡은 최고의 인테리어 아이템입니다!",
        "likes": 3
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-46-1",
        "author": "유*지",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-47",
    "name": "이중 진공 단열 스테인리스 텀블러 710ml (스트로우 겸용)",
    "category": "리빙 / 인테리어",
    "categoryId": "cat-living",
    "price": 32000,
    "originalPrice": 45000,
    "discountRate": 29,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 52,
    "isBest": true,
    "isNew": true,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "최대 24시간 보냉 & 12시간 보온, 차량 컵홀더 완벽 호환 대용량 텀블러",
    "description": "<h3>하루 종일 얼음이 녹지 않는 강력한 보냉력</h3><p>식품용 최고급 STS 304 스테인리스 재질로 냄새 배임이 없으며, 결로 현상이 없어 가방이나 책상에 두기 안전합니다.</p>",
    "options": [
      {
        "name": "매트 크림 화이트 (710ml)",
        "stock": 40
      },
      {
        "name": "미드나잇 네이비 (710ml)",
        "stock": 30
      }
    ],
    "specs": {
      "용량": "710ml (24oz)",
      "보냉/보온": "보냉 24h, 보온 12h",
      "재질": "STS 304"
    },
    "reviews": [
      {
        "id": "rev-prod-47-1",
        "author": "문*은",
        "rating": 4,
        "date": "2026-09-25",
        "content": "이중 진공 단열 스테인리스 텀블러 710ml (스트로우 겸용) 하나로 집안 분위기가 호텔처럼 아늑해졌습니다.",
        "likes": 36
      },
      {
        "id": "rev-prod-47-2",
        "author": "양*윤",
        "rating": 5,
        "date": "2026-09-22",
        "content": "디자인이 감각적이고 공간 어디에 두어도 인테리어가 사네요.",
        "likes": 34
      },
      {
        "id": "rev-prod-47-3",
        "author": "손*민",
        "rating": 5,
        "date": "2026-09-19",
        "content": "실용성이 뛰어나서 매일매일 유용하게 잘 쓰고 있습니다.",
        "likes": 32
      },
      {
        "id": "rev-prod-47-4",
        "author": "배*지",
        "rating": 5,
        "date": "2026-09-16",
        "content": "마감 퀄리티가 정교하고 흠집 없이 깨끗하게 배송되었습니다.",
        "likes": 31
      },
      {
        "id": "rev-prod-47-5",
        "author": "백*정",
        "rating": 5,
        "date": "2026-09-13",
        "content": "집들이 선물로 가져갔는데 센스 있다는 칭찬 엄청 들었어요.",
        "likes": 29
      },
      {
        "id": "rev-prod-47-6",
        "author": "허*영",
        "rating": 5,
        "date": "2026-09-10",
        "content": "재질이 고급스럽고 내구성이 좋아서 오래 쓸 수 있겠어요.",
        "likes": 28
      },
      {
        "id": "rev-prod-47-7",
        "author": "노*원",
        "rating": 4,
        "date": "2026-09-07",
        "content": "사용법이 간편하고 세척 및 관리하기가 정말 수월합니다.",
        "likes": 26
      },
      {
        "id": "rev-prod-47-8",
        "author": "남*린",
        "rating": 5,
        "date": "2026-09-04",
        "content": "원목과 패브릭의 따뜻한 감성이 일상에 큰 힐링을 줍니다.",
        "likes": 24
      },
      {
        "id": "rev-prod-47-9",
        "author": "심*준",
        "rating": 5,
        "date": "2026-09-01",
        "content": "크기와 비율이 딱 적당해서 공간 차지도 많이 안 하고 좋아요.",
        "likes": 23
      },
      {
        "id": "rev-prod-47-10",
        "author": "김*경",
        "rating": 5,
        "date": "2026-08-29",
        "content": "가격 대비 만족도가 200%인 리빙 인테리어 소품입니다.",
        "likes": 21
      },
      {
        "id": "rev-prod-47-11",
        "author": "이*수",
        "rating": 5,
        "date": "2026-08-26",
        "content": "눈에 띌 때마다 기분이 좋아지는 감성 가득한 아이템이에요.",
        "likes": 20
      },
      {
        "id": "rev-prod-47-12",
        "author": "박*우",
        "rating": 5,
        "date": "2026-08-23",
        "content": "선물 포장 상자부터 완충재까지 정성이 가득 담겨왔습니다.",
        "likes": 18
      },
      {
        "id": "rev-prod-47-13",
        "author": "최*희",
        "rating": 4,
        "date": "2026-08-20",
        "content": "침실 협탁과 거실 선반 어디에 올려두어도 멋스럽습니다.",
        "likes": 16
      },
      {
        "id": "rev-prod-47-14",
        "author": "정*진",
        "rating": 5,
        "date": "2026-08-17",
        "content": "튼튼하면서도 가벼워서 위치를 옮겨가며 쓰기 편해요.",
        "likes": 15
      },
      {
        "id": "rev-prod-47-15",
        "author": "강*아",
        "rating": 5,
        "date": "2026-08-14",
        "content": "집안에 머무는 시간이 더 행복해지는 기분 좋은 변화입니다.",
        "likes": 13
      },
      {
        "id": "rev-prod-47-16",
        "author": "조*태",
        "rating": 5,
        "date": "2026-08-11",
        "content": "색감이 모던하고 은은해서 어떤 가구와도 잘 어울립니다.",
        "likes": 12
      },
      {
        "id": "rev-prod-47-17",
        "author": "윤*현",
        "rating": 5,
        "date": "2026-08-08",
        "content": "주변 지인들에게도 강력 추천하고 있는 애정템입니다.",
        "likes": 10
      },
      {
        "id": "rev-prod-47-18",
        "author": "장*호",
        "rating": 5,
        "date": "2026-08-05",
        "content": "작은 소품 하나로 삶의 질이 수직 상승한 걸 느낍니다.",
        "likes": 8
      },
      {
        "id": "rev-prod-47-19",
        "author": "임*훈",
        "rating": 4,
        "date": "2026-08-02",
        "content": "이지샵 리빙 카테고리는 늘 실패가 없어서 믿고 삽니다.",
        "likes": 7
      },
      {
        "id": "rev-prod-47-20",
        "author": "한*서",
        "rating": 5,
        "date": "2026-07-30",
        "content": "가성비와 감성을 모두 잡은 최고의 인테리어 아이템입니다!",
        "likes": 5
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-47-1",
        "author": "고*정",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-48",
    "name": "모던 세라믹 오브제 화병 꽃병 (2종 세트)",
    "category": "리빙 / 인테리어",
    "categoryId": "cat-living",
    "price": 34000,
    "originalPrice": 48000,
    "discountRate": 29,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 59,
    "isBest": false,
    "isNew": true,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "감각적인 도넛 & 아치형 실루엣, 꽃 없이 오브제 자체로도 공간을 채우는 아트 피스",
    "description": "<h3>미술관 같은 무드를 연출하는 인테리어 오브제</h3><p>은은한 모래 질감의 매트 도자기 마감으로 생화, 드라이플라워, 조화 모두 세련되게 어우러집니다.</p>",
    "options": [
      {
        "name": "베이지 & 테라코타 2종 세트",
        "stock": 30
      }
    ],
    "specs": {
      "재질": "매트 도자기",
      "구성": "도넛 화병 1P + 아치 화병 1P"
    },
    "reviews": [
      {
        "id": "rev-prod-48-1",
        "author": "오*은",
        "rating": 4,
        "date": "2026-09-24",
        "content": "모던 세라믹 오브제 화병 꽃병 (2종 세트) 하나로 집안 분위기가 호텔처럼 아늑해졌습니다.",
        "likes": 38
      },
      {
        "id": "rev-prod-48-2",
        "author": "서*윤",
        "rating": 5,
        "date": "2026-09-21",
        "content": "디자인이 감각적이고 공간 어디에 두어도 인테리어가 사네요.",
        "likes": 36
      },
      {
        "id": "rev-prod-48-3",
        "author": "신*민",
        "rating": 5,
        "date": "2026-09-18",
        "content": "실용성이 뛰어나서 매일매일 유용하게 잘 쓰고 있습니다.",
        "likes": 34
      },
      {
        "id": "rev-prod-48-4",
        "author": "권*지",
        "rating": 5,
        "date": "2026-09-15",
        "content": "마감 퀄리티가 정교하고 흠집 없이 깨끗하게 배송되었습니다.",
        "likes": 33
      },
      {
        "id": "rev-prod-48-5",
        "author": "황*정",
        "rating": 5,
        "date": "2026-09-12",
        "content": "집들이 선물로 가져갔는데 센스 있다는 칭찬 엄청 들었어요.",
        "likes": 31
      },
      {
        "id": "rev-prod-48-6",
        "author": "안*영",
        "rating": 5,
        "date": "2026-09-09",
        "content": "재질이 고급스럽고 내구성이 좋아서 오래 쓸 수 있겠어요.",
        "likes": 30
      },
      {
        "id": "rev-prod-48-7",
        "author": "송*원",
        "rating": 4,
        "date": "2026-09-06",
        "content": "사용법이 간편하고 세척 및 관리하기가 정말 수월합니다.",
        "likes": 28
      },
      {
        "id": "rev-prod-48-8",
        "author": "전*린",
        "rating": 5,
        "date": "2026-09-03",
        "content": "원목과 패브릭의 따뜻한 감성이 일상에 큰 힐링을 줍니다.",
        "likes": 26
      },
      {
        "id": "rev-prod-48-9",
        "author": "홍*준",
        "rating": 5,
        "date": "2026-08-31",
        "content": "크기와 비율이 딱 적당해서 공간 차지도 많이 안 하고 좋아요.",
        "likes": 25
      },
      {
        "id": "rev-prod-48-10",
        "author": "유*경",
        "rating": 5,
        "date": "2026-08-28",
        "content": "가격 대비 만족도가 200%인 리빙 인테리어 소품입니다.",
        "likes": 23
      },
      {
        "id": "rev-prod-48-11",
        "author": "고*수",
        "rating": 5,
        "date": "2026-08-25",
        "content": "눈에 띌 때마다 기분이 좋아지는 감성 가득한 아이템이에요.",
        "likes": 22
      },
      {
        "id": "rev-prod-48-12",
        "author": "문*우",
        "rating": 5,
        "date": "2026-08-22",
        "content": "선물 포장 상자부터 완충재까지 정성이 가득 담겨왔습니다.",
        "likes": 20
      },
      {
        "id": "rev-prod-48-13",
        "author": "양*희",
        "rating": 4,
        "date": "2026-08-19",
        "content": "침실 협탁과 거실 선반 어디에 올려두어도 멋스럽습니다.",
        "likes": 18
      },
      {
        "id": "rev-prod-48-14",
        "author": "손*진",
        "rating": 5,
        "date": "2026-08-16",
        "content": "튼튼하면서도 가벼워서 위치를 옮겨가며 쓰기 편해요.",
        "likes": 17
      },
      {
        "id": "rev-prod-48-15",
        "author": "배*아",
        "rating": 5,
        "date": "2026-08-13",
        "content": "집안에 머무는 시간이 더 행복해지는 기분 좋은 변화입니다.",
        "likes": 15
      },
      {
        "id": "rev-prod-48-16",
        "author": "백*태",
        "rating": 5,
        "date": "2026-08-10",
        "content": "색감이 모던하고 은은해서 어떤 가구와도 잘 어울립니다.",
        "likes": 14
      },
      {
        "id": "rev-prod-48-17",
        "author": "허*현",
        "rating": 5,
        "date": "2026-08-07",
        "content": "주변 지인들에게도 강력 추천하고 있는 애정템입니다.",
        "likes": 12
      },
      {
        "id": "rev-prod-48-18",
        "author": "노*호",
        "rating": 5,
        "date": "2026-08-04",
        "content": "작은 소품 하나로 삶의 질이 수직 상승한 걸 느낍니다.",
        "likes": 10
      },
      {
        "id": "rev-prod-48-19",
        "author": "남*훈",
        "rating": 4,
        "date": "2026-08-01",
        "content": "이지샵 리빙 카테고리는 늘 실패가 없어서 믿고 삽니다.",
        "likes": 9
      },
      {
        "id": "rev-prod-48-20",
        "author": "심*서",
        "rating": 5,
        "date": "2026-07-29",
        "content": "가성비와 감성을 모두 잡은 최고의 인테리어 아이템입니다!",
        "likes": 7
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-48-1",
        "author": "문*영",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-49",
    "name": "스페셜티 드립백 커피 시그니처 4종 기프트 세트",
    "category": "푸드 / 키친",
    "categoryId": "cat-food",
    "price": 28000,
    "originalPrice": 35000,
    "discountRate": 20,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 66,
    "isBest": true,
    "isNew": false,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "에티오피아 예가체프, 과테말라 안티구아, 콜롬비아 수프리모 등 최고 등급 20개입",
    "description": "<h3>집에서 즐기는 바리스타의 스페셜티 커피</h3><p>당일 로스팅한 신선한 원두만을 질소 충전 드립백에 담았습니다. 풍부한 아로마와 크레마를 느껴보세요.</p>",
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
      "포장": "선물용 하드케이스 & 쇼핑백"
    },
    "reviews": [
      {
        "id": "rev-prod-49-1",
        "author": "김*은",
        "rating": 4,
        "date": "2026-09-23",
        "content": "스페셜티 드립백 커피 시그니처 4종 기프트 세트 맛과 풍미가 깊고 신선함이 입안 가득 느껴집니다.",
        "likes": 40
      },
      {
        "id": "rev-prod-49-2",
        "author": "이*윤",
        "rating": 5,
        "date": "2026-09-20",
        "content": "포장 상태가 너무 정갈해서 선물용으로도 손색이 없네요.",
        "likes": 38
      },
      {
        "id": "rev-prod-49-3",
        "author": "박*민",
        "rating": 5,
        "date": "2026-09-17",
        "content": "자연 그대로의 건강한 단맛과 감칠맛이 일품입니다.",
        "likes": 36
      },
      {
        "id": "rev-prod-49-4",
        "author": "최*지",
        "rating": 5,
        "date": "2026-09-14",
        "content": "아이들과 온 가족이 모두 맛있다고 간식으로 순삭했어요.",
        "likes": 35
      },
      {
        "id": "rev-prod-49-5",
        "author": "정*정",
        "rating": 5,
        "date": "2026-09-11",
        "content": "신선한 재료 본연의 맛이 살아있어 요리의 품격이 올라갑니다.",
        "likes": 33
      },
      {
        "id": "rev-prod-49-6",
        "author": "강*영",
        "rating": 5,
        "date": "2026-09-08",
        "content": "아침 식사 대용이나 홈카페 티타임에 곁들이기 딱 좋아요.",
        "likes": 32
      },
      {
        "id": "rev-prod-49-7",
        "author": "조*원",
        "rating": 4,
        "date": "2026-09-05",
        "content": "유통기한도 넉넉하고 제조일자가 최근이라 안심하고 먹습니다.",
        "likes": 30
      },
      {
        "id": "rev-prod-49-8",
        "author": "윤*린",
        "rating": 5,
        "date": "2026-09-02",
        "content": "시중 마트 제품과는 비교가 안 되는 프리미엄 퀄리티입니다.",
        "likes": 28
      },
      {
        "id": "rev-prod-49-9",
        "author": "장*준",
        "rating": 5,
        "date": "2026-08-30",
        "content": "부모님께 보내드렸는데 너무 맛있다고 극찬을 아끼지 않으셨어요.",
        "likes": 27
      },
      {
        "id": "rev-prod-49-10",
        "author": "임*경",
        "rating": 5,
        "date": "2026-08-27",
        "content": "패키지 디자인도 세련되고 보관하기 편한 용기라 만족합니다.",
        "likes": 25
      },
      {
        "id": "rev-prod-49-11",
        "author": "한*수",
        "rating": 5,
        "date": "2026-08-24",
        "content": "자극적이지 않고 깔끔해서 매일 먹어도 질리지 않아요.",
        "likes": 24
      },
      {
        "id": "rev-prod-49-12",
        "author": "오*우",
        "rating": 5,
        "date": "2026-08-21",
        "content": "원산지와 유기농 인증이 확실해서 믿고 먹을 수 있습니다.",
        "likes": 22
      },
      {
        "id": "rev-prod-49-13",
        "author": "서*희",
        "rating": 4,
        "date": "2026-08-18",
        "content": "친구들 놀러 왔을 때 대접했는데 다들 어디서 샀냐고 물어보네요.",
        "likes": 20
      },
      {
        "id": "rev-prod-49-14",
        "author": "신*진",
        "rating": 5,
        "date": "2026-08-15",
        "content": "정기배송하고 싶을 정도로 만족스러운 고품격 푸드입니다.",
        "likes": 19
      },
      {
        "id": "rev-prod-49-15",
        "author": "권*아",
        "rating": 5,
        "date": "2026-08-12",
        "content": "신선도를 유지해 주는 꼼꼼한 이중 포장에 감동했습니다.",
        "likes": 17
      },
      {
        "id": "rev-prod-49-16",
        "author": "황*태",
        "rating": 5,
        "date": "2026-08-09",
        "content": "홈카페와 홈쿠킹 퀄리티가 전문점 수준으로 업그레이드됐어요.",
        "likes": 16
      },
      {
        "id": "rev-prod-49-17",
        "author": "안*현",
        "rating": 5,
        "date": "2026-08-06",
        "content": "재구매 의사 1000%입니다. 다 먹으면 또 주문할게요.",
        "likes": 14
      },
      {
        "id": "rev-prod-49-18",
        "author": "송*호",
        "rating": 5,
        "date": "2026-08-03",
        "content": "지인 답례품으로 돌렸는데 반응이 역대급으로 좋았습니다.",
        "likes": 12
      },
      {
        "id": "rev-prod-49-19",
        "author": "전*훈",
        "rating": 4,
        "date": "2026-07-31",
        "content": "정성이 가득 담긴 건강한 먹거리라 몸도 마음도 든든합니다.",
        "likes": 11
      },
      {
        "id": "rev-prod-49-20",
        "author": "홍*서",
        "rating": 5,
        "date": "2026-07-28",
        "content": "맛, 영양, 포장까지 3박자를 모두 갖춘 최고의 제품입니다!",
        "likes": 9
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-49-1",
        "author": "양*원",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-50",
    "name": "유기농 프리미엄 마누카 꿀 UMF 15+ MGO 514 (250g/500g)",
    "category": "푸드 / 키친",
    "categoryId": "cat-food",
    "price": 88000,
    "originalPrice": 125000,
    "discountRate": 29,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 73,
    "isBest": true,
    "isNew": false,
    "isSale": true,
    "isFreeShipping": true,
    "thumbnail": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "뉴질랜드 100% 정품 인증, 풍부한 항산화와 면역력을 챙기는 프리미엄 천연 꿀",
    "description": "<h3>자연이 준 가장 순수한 건강 선물</h3><p>UMF 협회 공식 인증을 받은 고등급 생마누카 꿀로 매일 아침 공복 한 스푼으로 활력을 채워보세요.</p>",
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
      "등급": "UMF 15+ (MGO 514+)",
      "원산지": "뉴질랜드 100% 직수입"
    },
    "reviews": [
      {
        "id": "rev-prod-50-1",
        "author": "유*은",
        "rating": 4,
        "date": "2026-09-29",
        "content": "유기농 프리미엄 마누카 꿀 UMF 15+ MGO 514 (250g/500g) 맛과 풍미가 깊고 신선함이 입안 가득 느껴집니다.",
        "likes": 42
      },
      {
        "id": "rev-prod-50-2",
        "author": "고*윤",
        "rating": 5,
        "date": "2026-09-26",
        "content": "포장 상태가 너무 정갈해서 선물용으로도 손색이 없네요.",
        "likes": 40
      },
      {
        "id": "rev-prod-50-3",
        "author": "문*민",
        "rating": 5,
        "date": "2026-09-23",
        "content": "자연 그대로의 건강한 단맛과 감칠맛이 일품입니다.",
        "likes": 38
      },
      {
        "id": "rev-prod-50-4",
        "author": "양*지",
        "rating": 5,
        "date": "2026-09-20",
        "content": "아이들과 온 가족이 모두 맛있다고 간식으로 순삭했어요.",
        "likes": 37
      },
      {
        "id": "rev-prod-50-5",
        "author": "손*정",
        "rating": 5,
        "date": "2026-09-17",
        "content": "신선한 재료 본연의 맛이 살아있어 요리의 품격이 올라갑니다.",
        "likes": 35
      },
      {
        "id": "rev-prod-50-6",
        "author": "배*영",
        "rating": 5,
        "date": "2026-09-14",
        "content": "아침 식사 대용이나 홈카페 티타임에 곁들이기 딱 좋아요.",
        "likes": 34
      },
      {
        "id": "rev-prod-50-7",
        "author": "백*원",
        "rating": 4,
        "date": "2026-09-11",
        "content": "유통기한도 넉넉하고 제조일자가 최근이라 안심하고 먹습니다.",
        "likes": 32
      },
      {
        "id": "rev-prod-50-8",
        "author": "허*린",
        "rating": 5,
        "date": "2026-09-08",
        "content": "시중 마트 제품과는 비교가 안 되는 프리미엄 퀄리티입니다.",
        "likes": 30
      },
      {
        "id": "rev-prod-50-9",
        "author": "노*준",
        "rating": 5,
        "date": "2026-09-05",
        "content": "부모님께 보내드렸는데 너무 맛있다고 극찬을 아끼지 않으셨어요.",
        "likes": 29
      },
      {
        "id": "rev-prod-50-10",
        "author": "남*경",
        "rating": 5,
        "date": "2026-09-02",
        "content": "패키지 디자인도 세련되고 보관하기 편한 용기라 만족합니다.",
        "likes": 27
      },
      {
        "id": "rev-prod-50-11",
        "author": "심*수",
        "rating": 5,
        "date": "2026-08-30",
        "content": "자극적이지 않고 깔끔해서 매일 먹어도 질리지 않아요.",
        "likes": 26
      },
      {
        "id": "rev-prod-50-12",
        "author": "김*우",
        "rating": 5,
        "date": "2026-08-27",
        "content": "원산지와 유기농 인증이 확실해서 믿고 먹을 수 있습니다.",
        "likes": 24
      },
      {
        "id": "rev-prod-50-13",
        "author": "이*희",
        "rating": 4,
        "date": "2026-08-24",
        "content": "친구들 놀러 왔을 때 대접했는데 다들 어디서 샀냐고 물어보네요.",
        "likes": 22
      },
      {
        "id": "rev-prod-50-14",
        "author": "박*진",
        "rating": 5,
        "date": "2026-08-21",
        "content": "정기배송하고 싶을 정도로 만족스러운 고품격 푸드입니다.",
        "likes": 21
      },
      {
        "id": "rev-prod-50-15",
        "author": "최*아",
        "rating": 5,
        "date": "2026-08-18",
        "content": "신선도를 유지해 주는 꼼꼼한 이중 포장에 감동했습니다.",
        "likes": 19
      },
      {
        "id": "rev-prod-50-16",
        "author": "정*태",
        "rating": 5,
        "date": "2026-08-15",
        "content": "홈카페와 홈쿠킹 퀄리티가 전문점 수준으로 업그레이드됐어요.",
        "likes": 18
      },
      {
        "id": "rev-prod-50-17",
        "author": "강*현",
        "rating": 5,
        "date": "2026-08-12",
        "content": "재구매 의사 1000%입니다. 다 먹으면 또 주문할게요.",
        "likes": 16
      },
      {
        "id": "rev-prod-50-18",
        "author": "조*호",
        "rating": 5,
        "date": "2026-08-09",
        "content": "지인 답례품으로 돌렸는데 반응이 역대급으로 좋았습니다.",
        "likes": 14
      },
      {
        "id": "rev-prod-50-19",
        "author": "윤*훈",
        "rating": 4,
        "date": "2026-08-06",
        "content": "정성이 가득 담긴 건강한 먹거리라 몸도 마음도 든든합니다.",
        "likes": 13
      },
      {
        "id": "rev-prod-50-20",
        "author": "장*서",
        "rating": 5,
        "date": "2026-08-03",
        "content": "맛, 영양, 포장까지 3박자를 모두 갖춘 최고의 제품입니다!",
        "likes": 11
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-50-1",
        "author": "손*린",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-51",
    "name": "지중해 유기농 엑스트라 버진 올리브오일 500ml (산도 0.2% 이하)",
    "category": "푸드 / 키친",
    "categoryId": "cat-food",
    "price": 36000,
    "originalPrice": 48000,
    "discountRate": 25,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 30,
    "isBest": true,
    "isNew": true,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "스페인 안달루시아 단일 품종 조기 수확, 싱그러운 풀향과 매콤한 폴리페놀의 풍미",
    "description": "<h3>요리의 완성도를 결정짓는 최상급 올리브유</h3><p>열을 가하지 않은 냉압착(Cold Pressed) 방식으로 영양소를 고스란히 보존하였으며 샐러드 드레싱과 파스타에 환상적입니다.</p>",
    "options": [
      {
        "name": "본품 500ml 유리병",
        "stock": 40
      },
      {
        "name": "선물용 2본입 세트 (500ml x 2)",
        "stock": 25
      }
    ],
    "specs": {
      "산도": "0.18% (엑스트라 버진 기준 충족)",
      "추출": "냉압착 방식"
    },
    "reviews": [
      {
        "id": "rev-prod-51-1",
        "author": "임*은",
        "rating": 4,
        "date": "2026-09-28",
        "content": "지중해 유기농 엑스트라 버진 올리브오일 500ml (산도 0.2% 이하) 맛과 풍미가 깊고 신선함이 입안 가득 느껴집니다.",
        "likes": 34
      },
      {
        "id": "rev-prod-51-2",
        "author": "한*윤",
        "rating": 5,
        "date": "2026-09-25",
        "content": "포장 상태가 너무 정갈해서 선물용으로도 손색이 없네요.",
        "likes": 32
      },
      {
        "id": "rev-prod-51-3",
        "author": "오*민",
        "rating": 5,
        "date": "2026-09-22",
        "content": "자연 그대로의 건강한 단맛과 감칠맛이 일품입니다.",
        "likes": 30
      },
      {
        "id": "rev-prod-51-4",
        "author": "서*지",
        "rating": 5,
        "date": "2026-09-19",
        "content": "아이들과 온 가족이 모두 맛있다고 간식으로 순삭했어요.",
        "likes": 29
      },
      {
        "id": "rev-prod-51-5",
        "author": "신*정",
        "rating": 5,
        "date": "2026-09-16",
        "content": "신선한 재료 본연의 맛이 살아있어 요리의 품격이 올라갑니다.",
        "likes": 27
      },
      {
        "id": "rev-prod-51-6",
        "author": "권*영",
        "rating": 5,
        "date": "2026-09-13",
        "content": "아침 식사 대용이나 홈카페 티타임에 곁들이기 딱 좋아요.",
        "likes": 26
      },
      {
        "id": "rev-prod-51-7",
        "author": "황*원",
        "rating": 4,
        "date": "2026-09-10",
        "content": "유통기한도 넉넉하고 제조일자가 최근이라 안심하고 먹습니다.",
        "likes": 24
      },
      {
        "id": "rev-prod-51-8",
        "author": "안*린",
        "rating": 5,
        "date": "2026-09-07",
        "content": "시중 마트 제품과는 비교가 안 되는 프리미엄 퀄리티입니다.",
        "likes": 22
      },
      {
        "id": "rev-prod-51-9",
        "author": "송*준",
        "rating": 5,
        "date": "2026-09-04",
        "content": "부모님께 보내드렸는데 너무 맛있다고 극찬을 아끼지 않으셨어요.",
        "likes": 21
      },
      {
        "id": "rev-prod-51-10",
        "author": "전*경",
        "rating": 5,
        "date": "2026-09-01",
        "content": "패키지 디자인도 세련되고 보관하기 편한 용기라 만족합니다.",
        "likes": 19
      },
      {
        "id": "rev-prod-51-11",
        "author": "홍*수",
        "rating": 5,
        "date": "2026-08-29",
        "content": "자극적이지 않고 깔끔해서 매일 먹어도 질리지 않아요.",
        "likes": 18
      },
      {
        "id": "rev-prod-51-12",
        "author": "유*우",
        "rating": 5,
        "date": "2026-08-26",
        "content": "원산지와 유기농 인증이 확실해서 믿고 먹을 수 있습니다.",
        "likes": 16
      },
      {
        "id": "rev-prod-51-13",
        "author": "고*희",
        "rating": 4,
        "date": "2026-08-23",
        "content": "친구들 놀러 왔을 때 대접했는데 다들 어디서 샀냐고 물어보네요.",
        "likes": 14
      },
      {
        "id": "rev-prod-51-14",
        "author": "문*진",
        "rating": 5,
        "date": "2026-08-20",
        "content": "정기배송하고 싶을 정도로 만족스러운 고품격 푸드입니다.",
        "likes": 13
      },
      {
        "id": "rev-prod-51-15",
        "author": "양*아",
        "rating": 5,
        "date": "2026-08-17",
        "content": "신선도를 유지해 주는 꼼꼼한 이중 포장에 감동했습니다.",
        "likes": 11
      },
      {
        "id": "rev-prod-51-16",
        "author": "손*태",
        "rating": 5,
        "date": "2026-08-14",
        "content": "홈카페와 홈쿠킹 퀄리티가 전문점 수준으로 업그레이드됐어요.",
        "likes": 10
      },
      {
        "id": "rev-prod-51-17",
        "author": "배*현",
        "rating": 5,
        "date": "2026-08-11",
        "content": "재구매 의사 1000%입니다. 다 먹으면 또 주문할게요.",
        "likes": 8
      },
      {
        "id": "rev-prod-51-18",
        "author": "백*호",
        "rating": 5,
        "date": "2026-08-08",
        "content": "지인 답례품으로 돌렸는데 반응이 역대급으로 좋았습니다.",
        "likes": 6
      },
      {
        "id": "rev-prod-51-19",
        "author": "허*훈",
        "rating": 4,
        "date": "2026-08-05",
        "content": "정성이 가득 담긴 건강한 먹거리라 몸도 마음도 든든합니다.",
        "likes": 5
      },
      {
        "id": "rev-prod-51-20",
        "author": "노*서",
        "rating": 5,
        "date": "2026-08-02",
        "content": "맛, 영양, 포장까지 3박자를 모두 갖춘 최고의 제품입니다!",
        "likes": 3
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-51-1",
        "author": "배*준",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-52",
    "name": "국산 100% 저온압착 프리미엄 생들기름 300ml",
    "category": "푸드 / 키친",
    "categoryId": "cat-food",
    "price": 29000,
    "originalPrice": 38000,
    "discountRate": 24,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 37,
    "isBest": false,
    "isNew": false,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "충북 음성 100% 햇들깨, 벤조피렌 걱정 없는 맑고 깨끗한 저온 착유 오메가-3",
    "description": "<h3>황금빛 맑은 한 방울의 고소함</h3><p>태우지 않고 저온에서 부드럽게 볶아 착유하여 들깨 본연의 영양과 고소한 풍미가 나물 무침과 비빔밥을 한층 빛내줍니다.</p>",
    "options": [
      {
        "name": "생들기름 300ml",
        "stock": 35
      },
      {
        "name": "생참기름 300ml",
        "stock": 30
      }
    ],
    "specs": {
      "원재료": "국내산 통들깨 100%",
      "유통기한": "제조일로부터 9개월"
    },
    "reviews": [
      {
        "id": "rev-prod-52-1",
        "author": "남*은",
        "rating": 4,
        "date": "2026-09-27",
        "content": "국산 100% 저온압착 프리미엄 생들기름 300ml 맛과 풍미가 깊고 신선함이 입안 가득 느껴집니다.",
        "likes": 36
      },
      {
        "id": "rev-prod-52-2",
        "author": "심*윤",
        "rating": 5,
        "date": "2026-09-24",
        "content": "포장 상태가 너무 정갈해서 선물용으로도 손색이 없네요.",
        "likes": 34
      },
      {
        "id": "rev-prod-52-3",
        "author": "김*민",
        "rating": 5,
        "date": "2026-09-21",
        "content": "자연 그대로의 건강한 단맛과 감칠맛이 일품입니다.",
        "likes": 32
      },
      {
        "id": "rev-prod-52-4",
        "author": "이*지",
        "rating": 5,
        "date": "2026-09-18",
        "content": "아이들과 온 가족이 모두 맛있다고 간식으로 순삭했어요.",
        "likes": 31
      },
      {
        "id": "rev-prod-52-5",
        "author": "박*정",
        "rating": 5,
        "date": "2026-09-15",
        "content": "신선한 재료 본연의 맛이 살아있어 요리의 품격이 올라갑니다.",
        "likes": 29
      },
      {
        "id": "rev-prod-52-6",
        "author": "최*영",
        "rating": 5,
        "date": "2026-09-12",
        "content": "아침 식사 대용이나 홈카페 티타임에 곁들이기 딱 좋아요.",
        "likes": 28
      },
      {
        "id": "rev-prod-52-7",
        "author": "정*원",
        "rating": 4,
        "date": "2026-09-09",
        "content": "유통기한도 넉넉하고 제조일자가 최근이라 안심하고 먹습니다.",
        "likes": 26
      },
      {
        "id": "rev-prod-52-8",
        "author": "강*린",
        "rating": 5,
        "date": "2026-09-06",
        "content": "시중 마트 제품과는 비교가 안 되는 프리미엄 퀄리티입니다.",
        "likes": 24
      },
      {
        "id": "rev-prod-52-9",
        "author": "조*준",
        "rating": 5,
        "date": "2026-09-03",
        "content": "부모님께 보내드렸는데 너무 맛있다고 극찬을 아끼지 않으셨어요.",
        "likes": 23
      },
      {
        "id": "rev-prod-52-10",
        "author": "윤*경",
        "rating": 5,
        "date": "2026-08-31",
        "content": "패키지 디자인도 세련되고 보관하기 편한 용기라 만족합니다.",
        "likes": 21
      },
      {
        "id": "rev-prod-52-11",
        "author": "장*수",
        "rating": 5,
        "date": "2026-08-28",
        "content": "자극적이지 않고 깔끔해서 매일 먹어도 질리지 않아요.",
        "likes": 20
      },
      {
        "id": "rev-prod-52-12",
        "author": "임*우",
        "rating": 5,
        "date": "2026-08-25",
        "content": "원산지와 유기농 인증이 확실해서 믿고 먹을 수 있습니다.",
        "likes": 18
      },
      {
        "id": "rev-prod-52-13",
        "author": "한*희",
        "rating": 4,
        "date": "2026-08-22",
        "content": "친구들 놀러 왔을 때 대접했는데 다들 어디서 샀냐고 물어보네요.",
        "likes": 16
      },
      {
        "id": "rev-prod-52-14",
        "author": "오*진",
        "rating": 5,
        "date": "2026-08-19",
        "content": "정기배송하고 싶을 정도로 만족스러운 고품격 푸드입니다.",
        "likes": 15
      },
      {
        "id": "rev-prod-52-15",
        "author": "서*아",
        "rating": 5,
        "date": "2026-08-16",
        "content": "신선도를 유지해 주는 꼼꼼한 이중 포장에 감동했습니다.",
        "likes": 13
      },
      {
        "id": "rev-prod-52-16",
        "author": "신*태",
        "rating": 5,
        "date": "2026-08-13",
        "content": "홈카페와 홈쿠킹 퀄리티가 전문점 수준으로 업그레이드됐어요.",
        "likes": 12
      },
      {
        "id": "rev-prod-52-17",
        "author": "권*현",
        "rating": 5,
        "date": "2026-08-10",
        "content": "재구매 의사 1000%입니다. 다 먹으면 또 주문할게요.",
        "likes": 10
      },
      {
        "id": "rev-prod-52-18",
        "author": "황*호",
        "rating": 5,
        "date": "2026-08-07",
        "content": "지인 답례품으로 돌렸는데 반응이 역대급으로 좋았습니다.",
        "likes": 8
      },
      {
        "id": "rev-prod-52-19",
        "author": "안*훈",
        "rating": 4,
        "date": "2026-08-04",
        "content": "정성이 가득 담긴 건강한 먹거리라 몸도 마음도 든든합니다.",
        "likes": 7
      },
      {
        "id": "rev-prod-52-20",
        "author": "송*서",
        "rating": 5,
        "date": "2026-08-01",
        "content": "맛, 영양, 포장까지 3박자를 모두 갖춘 최고의 제품입니다!",
        "likes": 5
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-52-1",
        "author": "백*경",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-53",
    "name": "수제 유기농 오트밀 너츠 그래놀라 400g (메이플 피칸)",
    "category": "푸드 / 키친",
    "categoryId": "cat-food",
    "price": 18000,
    "originalPrice": 24000,
    "discountRate": 25,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 44,
    "isBest": true,
    "isNew": true,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1517093709565-38c205776d37?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1517093709565-38c205776d37?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "캐나다산 100% 퓨어 메이플 시럽, 피칸과 아몬드가 통째로 씹히는 바삭한 홈메이드 식감",
    "description": "<h3>건강하고 든든한 아침을 여는 크런치 그래놀라</h3><p>정제설탕, 밀가루, 팜유 무첨가로 그릭요거트나 우유와 함께 가볍고 영양 가득한 한 끼 식사로 훌륭합니다.</p>",
    "options": [
      {
        "name": "메이플 피칸 400g",
        "stock": 45
      },
      {
        "name": "다크 카카오 헤이즐넛 400g",
        "stock": 35
      }
    ],
    "specs": {
      "용량": "400g 지퍼백",
      "원료": "유기농 오트밀 45%, 피칸 15%, 통아몬드 15%"
    },
    "reviews": [
      {
        "id": "rev-prod-53-1",
        "author": "전*은",
        "rating": 4,
        "date": "2026-09-26",
        "content": "수제 유기농 오트밀 너츠 그래놀라 400g (메이플 피칸) 맛과 풍미가 깊고 신선함이 입안 가득 느껴집니다.",
        "likes": 38
      },
      {
        "id": "rev-prod-53-2",
        "author": "홍*윤",
        "rating": 5,
        "date": "2026-09-23",
        "content": "포장 상태가 너무 정갈해서 선물용으로도 손색이 없네요.",
        "likes": 36
      },
      {
        "id": "rev-prod-53-3",
        "author": "유*민",
        "rating": 5,
        "date": "2026-09-20",
        "content": "자연 그대로의 건강한 단맛과 감칠맛이 일품입니다.",
        "likes": 34
      },
      {
        "id": "rev-prod-53-4",
        "author": "고*지",
        "rating": 5,
        "date": "2026-09-17",
        "content": "아이들과 온 가족이 모두 맛있다고 간식으로 순삭했어요.",
        "likes": 33
      },
      {
        "id": "rev-prod-53-5",
        "author": "문*정",
        "rating": 5,
        "date": "2026-09-14",
        "content": "신선한 재료 본연의 맛이 살아있어 요리의 품격이 올라갑니다.",
        "likes": 31
      },
      {
        "id": "rev-prod-53-6",
        "author": "양*영",
        "rating": 5,
        "date": "2026-09-11",
        "content": "아침 식사 대용이나 홈카페 티타임에 곁들이기 딱 좋아요.",
        "likes": 30
      },
      {
        "id": "rev-prod-53-7",
        "author": "손*원",
        "rating": 4,
        "date": "2026-09-08",
        "content": "유통기한도 넉넉하고 제조일자가 최근이라 안심하고 먹습니다.",
        "likes": 28
      },
      {
        "id": "rev-prod-53-8",
        "author": "배*린",
        "rating": 5,
        "date": "2026-09-05",
        "content": "시중 마트 제품과는 비교가 안 되는 프리미엄 퀄리티입니다.",
        "likes": 26
      },
      {
        "id": "rev-prod-53-9",
        "author": "백*준",
        "rating": 5,
        "date": "2026-09-02",
        "content": "부모님께 보내드렸는데 너무 맛있다고 극찬을 아끼지 않으셨어요.",
        "likes": 25
      },
      {
        "id": "rev-prod-53-10",
        "author": "허*경",
        "rating": 5,
        "date": "2026-08-30",
        "content": "패키지 디자인도 세련되고 보관하기 편한 용기라 만족합니다.",
        "likes": 23
      },
      {
        "id": "rev-prod-53-11",
        "author": "노*수",
        "rating": 5,
        "date": "2026-08-27",
        "content": "자극적이지 않고 깔끔해서 매일 먹어도 질리지 않아요.",
        "likes": 22
      },
      {
        "id": "rev-prod-53-12",
        "author": "남*우",
        "rating": 5,
        "date": "2026-08-24",
        "content": "원산지와 유기농 인증이 확실해서 믿고 먹을 수 있습니다.",
        "likes": 20
      },
      {
        "id": "rev-prod-53-13",
        "author": "심*희",
        "rating": 4,
        "date": "2026-08-21",
        "content": "친구들 놀러 왔을 때 대접했는데 다들 어디서 샀냐고 물어보네요.",
        "likes": 18
      },
      {
        "id": "rev-prod-53-14",
        "author": "김*진",
        "rating": 5,
        "date": "2026-08-18",
        "content": "정기배송하고 싶을 정도로 만족스러운 고품격 푸드입니다.",
        "likes": 17
      },
      {
        "id": "rev-prod-53-15",
        "author": "이*아",
        "rating": 5,
        "date": "2026-08-15",
        "content": "신선도를 유지해 주는 꼼꼼한 이중 포장에 감동했습니다.",
        "likes": 15
      },
      {
        "id": "rev-prod-53-16",
        "author": "박*태",
        "rating": 5,
        "date": "2026-08-12",
        "content": "홈카페와 홈쿠킹 퀄리티가 전문점 수준으로 업그레이드됐어요.",
        "likes": 14
      },
      {
        "id": "rev-prod-53-17",
        "author": "최*현",
        "rating": 5,
        "date": "2026-08-09",
        "content": "재구매 의사 1000%입니다. 다 먹으면 또 주문할게요.",
        "likes": 12
      },
      {
        "id": "rev-prod-53-18",
        "author": "정*호",
        "rating": 5,
        "date": "2026-08-06",
        "content": "지인 답례품으로 돌렸는데 반응이 역대급으로 좋았습니다.",
        "likes": 10
      },
      {
        "id": "rev-prod-53-19",
        "author": "강*훈",
        "rating": 4,
        "date": "2026-08-03",
        "content": "정성이 가득 담긴 건강한 먹거리라 몸도 마음도 든든합니다.",
        "likes": 9
      },
      {
        "id": "rev-prod-53-20",
        "author": "조*서",
        "rating": 5,
        "date": "2026-07-31",
        "content": "맛, 영양, 포장까지 3박자를 모두 갖춘 최고의 제품입니다!",
        "likes": 7
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-53-1",
        "author": "허*수",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-54",
    "name": "명인 수제 전통 찹쌀 유과 & 한과 프리미엄 선물세트",
    "category": "푸드 / 키친",
    "categoryId": "cat-food",
    "price": 48000,
    "originalPrice": 65000,
    "discountRate": 26,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 51,
    "isBest": false,
    "isNew": false,
    "isSale": true,
    "isFreeShipping": true,
    "thumbnail": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "국내산 찹쌀과 천연 조청으로 빚은 입안에서 사르르 녹는 전통 명품 디저트",
    "description": "<h3>소중한 분께 전하는 품격 있는 전통의 맛</h3><p>인공 색소 없이 백년초, 단호박, 쑥으로 고운 빛깔을 냈으며 명절 선물과 상견례 답례품으로 손색없습니다.</p>",
    "options": [
      {
        "name": "전통 2단 한과 선물세트",
        "stock": 30
      }
    ],
    "specs": {
      "구성": "찹쌀유과, 약과, 다식, 매작과 등 600g 하드박스 포장"
    },
    "reviews": [
      {
        "id": "rev-prod-54-1",
        "author": "윤*은",
        "rating": 4,
        "date": "2026-09-25",
        "content": "명인 수제 전통 찹쌀 유과 & 한과 프리미엄 선물세트 맛과 풍미가 깊고 신선함이 입안 가득 느껴집니다.",
        "likes": 40
      },
      {
        "id": "rev-prod-54-2",
        "author": "장*윤",
        "rating": 5,
        "date": "2026-09-22",
        "content": "포장 상태가 너무 정갈해서 선물용으로도 손색이 없네요.",
        "likes": 38
      },
      {
        "id": "rev-prod-54-3",
        "author": "임*민",
        "rating": 5,
        "date": "2026-09-19",
        "content": "자연 그대로의 건강한 단맛과 감칠맛이 일품입니다.",
        "likes": 36
      },
      {
        "id": "rev-prod-54-4",
        "author": "한*지",
        "rating": 5,
        "date": "2026-09-16",
        "content": "아이들과 온 가족이 모두 맛있다고 간식으로 순삭했어요.",
        "likes": 35
      },
      {
        "id": "rev-prod-54-5",
        "author": "오*정",
        "rating": 5,
        "date": "2026-09-13",
        "content": "신선한 재료 본연의 맛이 살아있어 요리의 품격이 올라갑니다.",
        "likes": 33
      },
      {
        "id": "rev-prod-54-6",
        "author": "서*영",
        "rating": 5,
        "date": "2026-09-10",
        "content": "아침 식사 대용이나 홈카페 티타임에 곁들이기 딱 좋아요.",
        "likes": 32
      },
      {
        "id": "rev-prod-54-7",
        "author": "신*원",
        "rating": 4,
        "date": "2026-09-07",
        "content": "유통기한도 넉넉하고 제조일자가 최근이라 안심하고 먹습니다.",
        "likes": 30
      },
      {
        "id": "rev-prod-54-8",
        "author": "권*린",
        "rating": 5,
        "date": "2026-09-04",
        "content": "시중 마트 제품과는 비교가 안 되는 프리미엄 퀄리티입니다.",
        "likes": 28
      },
      {
        "id": "rev-prod-54-9",
        "author": "황*준",
        "rating": 5,
        "date": "2026-09-01",
        "content": "부모님께 보내드렸는데 너무 맛있다고 극찬을 아끼지 않으셨어요.",
        "likes": 27
      },
      {
        "id": "rev-prod-54-10",
        "author": "안*경",
        "rating": 5,
        "date": "2026-08-29",
        "content": "패키지 디자인도 세련되고 보관하기 편한 용기라 만족합니다.",
        "likes": 25
      },
      {
        "id": "rev-prod-54-11",
        "author": "송*수",
        "rating": 5,
        "date": "2026-08-26",
        "content": "자극적이지 않고 깔끔해서 매일 먹어도 질리지 않아요.",
        "likes": 24
      },
      {
        "id": "rev-prod-54-12",
        "author": "전*우",
        "rating": 5,
        "date": "2026-08-23",
        "content": "원산지와 유기농 인증이 확실해서 믿고 먹을 수 있습니다.",
        "likes": 22
      },
      {
        "id": "rev-prod-54-13",
        "author": "홍*희",
        "rating": 4,
        "date": "2026-08-20",
        "content": "친구들 놀러 왔을 때 대접했는데 다들 어디서 샀냐고 물어보네요.",
        "likes": 20
      },
      {
        "id": "rev-prod-54-14",
        "author": "유*진",
        "rating": 5,
        "date": "2026-08-17",
        "content": "정기배송하고 싶을 정도로 만족스러운 고품격 푸드입니다.",
        "likes": 19
      },
      {
        "id": "rev-prod-54-15",
        "author": "고*아",
        "rating": 5,
        "date": "2026-08-14",
        "content": "신선도를 유지해 주는 꼼꼼한 이중 포장에 감동했습니다.",
        "likes": 17
      },
      {
        "id": "rev-prod-54-16",
        "author": "문*태",
        "rating": 5,
        "date": "2026-08-11",
        "content": "홈카페와 홈쿠킹 퀄리티가 전문점 수준으로 업그레이드됐어요.",
        "likes": 16
      },
      {
        "id": "rev-prod-54-17",
        "author": "양*현",
        "rating": 5,
        "date": "2026-08-08",
        "content": "재구매 의사 1000%입니다. 다 먹으면 또 주문할게요.",
        "likes": 14
      },
      {
        "id": "rev-prod-54-18",
        "author": "손*호",
        "rating": 5,
        "date": "2026-08-05",
        "content": "지인 답례품으로 돌렸는데 반응이 역대급으로 좋았습니다.",
        "likes": 12
      },
      {
        "id": "rev-prod-54-19",
        "author": "배*훈",
        "rating": 4,
        "date": "2026-08-02",
        "content": "정성이 가득 담긴 건강한 먹거리라 몸도 마음도 든든합니다.",
        "likes": 11
      },
      {
        "id": "rev-prod-54-20",
        "author": "백*서",
        "rating": 5,
        "date": "2026-07-30",
        "content": "맛, 영양, 포장까지 3박자를 모두 갖춘 최고의 제품입니다!",
        "likes": 9
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-54-1",
        "author": "노*우",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-55",
    "name": "제주 유기농 말차 파우더 & 라떼 믹스 200g",
    "category": "푸드 / 키친",
    "categoryId": "cat-food",
    "price": 22000,
    "originalPrice": 29000,
    "discountRate": 24,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 58,
    "isBest": false,
    "isNew": true,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "제주 다원의 어린 찻잎만을 곱게 갈아낸 선명한 녹색과 쌉싸름하고 진한 풍미",
    "description": "<h3>카페에서 마시던 진한 말차 라떼를 집에서</h3><p>우유에 타서 말차 라떼로 마시거나 베이킹, 아이스크림 토핑 등 다양하게 활용 가능한 프리미엄 유기농 말차입니다.</p>",
    "options": [
      {
        "name": "순수 유기농 말차 100% (100g 캔)",
        "stock": 35
      },
      {
        "name": "스위트 말차 라떼 믹스 (250g 지퍼백)",
        "stock": 40
      }
    ],
    "specs": {
      "원산지": "제주특별자치도 100%",
      "인증": "국립농산물품질관리원 유기농 인증"
    },
    "reviews": [
      {
        "id": "rev-prod-55-1",
        "author": "허*은",
        "rating": 4,
        "date": "2026-09-24",
        "content": "제주 유기농 말차 파우더 & 라떼 믹스 200g 맛과 풍미가 깊고 신선함이 입안 가득 느껴집니다.",
        "likes": 42
      },
      {
        "id": "rev-prod-55-2",
        "author": "노*윤",
        "rating": 5,
        "date": "2026-09-21",
        "content": "포장 상태가 너무 정갈해서 선물용으로도 손색이 없네요.",
        "likes": 40
      },
      {
        "id": "rev-prod-55-3",
        "author": "남*민",
        "rating": 5,
        "date": "2026-09-18",
        "content": "자연 그대로의 건강한 단맛과 감칠맛이 일품입니다.",
        "likes": 38
      },
      {
        "id": "rev-prod-55-4",
        "author": "심*지",
        "rating": 5,
        "date": "2026-09-15",
        "content": "아이들과 온 가족이 모두 맛있다고 간식으로 순삭했어요.",
        "likes": 37
      },
      {
        "id": "rev-prod-55-5",
        "author": "김*정",
        "rating": 5,
        "date": "2026-09-12",
        "content": "신선한 재료 본연의 맛이 살아있어 요리의 품격이 올라갑니다.",
        "likes": 35
      },
      {
        "id": "rev-prod-55-6",
        "author": "이*영",
        "rating": 5,
        "date": "2026-09-09",
        "content": "아침 식사 대용이나 홈카페 티타임에 곁들이기 딱 좋아요.",
        "likes": 34
      },
      {
        "id": "rev-prod-55-7",
        "author": "박*원",
        "rating": 4,
        "date": "2026-09-06",
        "content": "유통기한도 넉넉하고 제조일자가 최근이라 안심하고 먹습니다.",
        "likes": 32
      },
      {
        "id": "rev-prod-55-8",
        "author": "최*린",
        "rating": 5,
        "date": "2026-09-03",
        "content": "시중 마트 제품과는 비교가 안 되는 프리미엄 퀄리티입니다.",
        "likes": 30
      },
      {
        "id": "rev-prod-55-9",
        "author": "정*준",
        "rating": 5,
        "date": "2026-08-31",
        "content": "부모님께 보내드렸는데 너무 맛있다고 극찬을 아끼지 않으셨어요.",
        "likes": 29
      },
      {
        "id": "rev-prod-55-10",
        "author": "강*경",
        "rating": 5,
        "date": "2026-08-28",
        "content": "패키지 디자인도 세련되고 보관하기 편한 용기라 만족합니다.",
        "likes": 27
      },
      {
        "id": "rev-prod-55-11",
        "author": "조*수",
        "rating": 5,
        "date": "2026-08-25",
        "content": "자극적이지 않고 깔끔해서 매일 먹어도 질리지 않아요.",
        "likes": 26
      },
      {
        "id": "rev-prod-55-12",
        "author": "윤*우",
        "rating": 5,
        "date": "2026-08-22",
        "content": "원산지와 유기농 인증이 확실해서 믿고 먹을 수 있습니다.",
        "likes": 24
      },
      {
        "id": "rev-prod-55-13",
        "author": "장*희",
        "rating": 4,
        "date": "2026-08-19",
        "content": "친구들 놀러 왔을 때 대접했는데 다들 어디서 샀냐고 물어보네요.",
        "likes": 22
      },
      {
        "id": "rev-prod-55-14",
        "author": "임*진",
        "rating": 5,
        "date": "2026-08-16",
        "content": "정기배송하고 싶을 정도로 만족스러운 고품격 푸드입니다.",
        "likes": 21
      },
      {
        "id": "rev-prod-55-15",
        "author": "한*아",
        "rating": 5,
        "date": "2026-08-13",
        "content": "신선도를 유지해 주는 꼼꼼한 이중 포장에 감동했습니다.",
        "likes": 19
      },
      {
        "id": "rev-prod-55-16",
        "author": "오*태",
        "rating": 5,
        "date": "2026-08-10",
        "content": "홈카페와 홈쿠킹 퀄리티가 전문점 수준으로 업그레이드됐어요.",
        "likes": 18
      },
      {
        "id": "rev-prod-55-17",
        "author": "서*현",
        "rating": 5,
        "date": "2026-08-07",
        "content": "재구매 의사 1000%입니다. 다 먹으면 또 주문할게요.",
        "likes": 16
      },
      {
        "id": "rev-prod-55-18",
        "author": "신*호",
        "rating": 5,
        "date": "2026-08-04",
        "content": "지인 답례품으로 돌렸는데 반응이 역대급으로 좋았습니다.",
        "likes": 14
      },
      {
        "id": "rev-prod-55-19",
        "author": "권*훈",
        "rating": 4,
        "date": "2026-08-01",
        "content": "정성이 가득 담긴 건강한 먹거리라 몸도 마음도 든든합니다.",
        "likes": 13
      },
      {
        "id": "rev-prod-55-20",
        "author": "황*서",
        "rating": 5,
        "date": "2026-07-29",
        "content": "맛, 영양, 포장까지 3박자를 모두 갖춘 최고의 제품입니다!",
        "likes": 11
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-55-1",
        "author": "남*희",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-56",
    "name": "자연 그대로 담은 무첨가 건조 과일칩 5종 세트",
    "category": "푸드 / 키친",
    "categoryId": "cat-food",
    "price": 24000,
    "originalPrice": 32000,
    "discountRate": 25,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 65,
    "isBest": false,
    "isNew": false,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "동결건조 딸기, 사과, 바나나, 망고, 블루베리 원물 100% 영양 간식",
    "description": "<h3>아이부터 어른까지 바삭하고 건강하게 즐기는 핑거푸드</h3><p>설탕, 보존료, 색소를 일체 넣지 않고 과일 본연의 새콤달콤한 맛과 비타민을 그대로 간직했습니다.</p>",
    "options": [
      {
        "name": "5종 버라이어티 팩 (각 30g x 5봉)",
        "stock": 50
      }
    ],
    "specs": {
      "구성": "딸기, 사과, 망고, 바나나, 블루베리 각 1봉씩"
    },
    "reviews": [
      {
        "id": "rev-prod-56-1",
        "author": "안*은",
        "rating": 4,
        "date": "2026-09-23",
        "content": "자연 그대로 담은 무첨가 건조 과일칩 5종 세트 맛과 풍미가 깊고 신선함이 입안 가득 느껴집니다.",
        "likes": 34
      },
      {
        "id": "rev-prod-56-2",
        "author": "송*윤",
        "rating": 5,
        "date": "2026-09-20",
        "content": "포장 상태가 너무 정갈해서 선물용으로도 손색이 없네요.",
        "likes": 32
      },
      {
        "id": "rev-prod-56-3",
        "author": "전*민",
        "rating": 5,
        "date": "2026-09-17",
        "content": "자연 그대로의 건강한 단맛과 감칠맛이 일품입니다.",
        "likes": 30
      },
      {
        "id": "rev-prod-56-4",
        "author": "홍*지",
        "rating": 5,
        "date": "2026-09-14",
        "content": "아이들과 온 가족이 모두 맛있다고 간식으로 순삭했어요.",
        "likes": 29
      },
      {
        "id": "rev-prod-56-5",
        "author": "유*정",
        "rating": 5,
        "date": "2026-09-11",
        "content": "신선한 재료 본연의 맛이 살아있어 요리의 품격이 올라갑니다.",
        "likes": 27
      },
      {
        "id": "rev-prod-56-6",
        "author": "고*영",
        "rating": 5,
        "date": "2026-09-08",
        "content": "아침 식사 대용이나 홈카페 티타임에 곁들이기 딱 좋아요.",
        "likes": 26
      },
      {
        "id": "rev-prod-56-7",
        "author": "문*원",
        "rating": 4,
        "date": "2026-09-05",
        "content": "유통기한도 넉넉하고 제조일자가 최근이라 안심하고 먹습니다.",
        "likes": 24
      },
      {
        "id": "rev-prod-56-8",
        "author": "양*린",
        "rating": 5,
        "date": "2026-09-02",
        "content": "시중 마트 제품과는 비교가 안 되는 프리미엄 퀄리티입니다.",
        "likes": 22
      },
      {
        "id": "rev-prod-56-9",
        "author": "손*준",
        "rating": 5,
        "date": "2026-08-30",
        "content": "부모님께 보내드렸는데 너무 맛있다고 극찬을 아끼지 않으셨어요.",
        "likes": 21
      },
      {
        "id": "rev-prod-56-10",
        "author": "배*경",
        "rating": 5,
        "date": "2026-08-27",
        "content": "패키지 디자인도 세련되고 보관하기 편한 용기라 만족합니다.",
        "likes": 19
      },
      {
        "id": "rev-prod-56-11",
        "author": "백*수",
        "rating": 5,
        "date": "2026-08-24",
        "content": "자극적이지 않고 깔끔해서 매일 먹어도 질리지 않아요.",
        "likes": 18
      },
      {
        "id": "rev-prod-56-12",
        "author": "허*우",
        "rating": 5,
        "date": "2026-08-21",
        "content": "원산지와 유기농 인증이 확실해서 믿고 먹을 수 있습니다.",
        "likes": 16
      },
      {
        "id": "rev-prod-56-13",
        "author": "노*희",
        "rating": 4,
        "date": "2026-08-18",
        "content": "친구들 놀러 왔을 때 대접했는데 다들 어디서 샀냐고 물어보네요.",
        "likes": 14
      },
      {
        "id": "rev-prod-56-14",
        "author": "남*진",
        "rating": 5,
        "date": "2026-08-15",
        "content": "정기배송하고 싶을 정도로 만족스러운 고품격 푸드입니다.",
        "likes": 13
      },
      {
        "id": "rev-prod-56-15",
        "author": "심*아",
        "rating": 5,
        "date": "2026-08-12",
        "content": "신선도를 유지해 주는 꼼꼼한 이중 포장에 감동했습니다.",
        "likes": 11
      },
      {
        "id": "rev-prod-56-16",
        "author": "김*태",
        "rating": 5,
        "date": "2026-08-09",
        "content": "홈카페와 홈쿠킹 퀄리티가 전문점 수준으로 업그레이드됐어요.",
        "likes": 10
      },
      {
        "id": "rev-prod-56-17",
        "author": "이*현",
        "rating": 5,
        "date": "2026-08-06",
        "content": "재구매 의사 1000%입니다. 다 먹으면 또 주문할게요.",
        "likes": 8
      },
      {
        "id": "rev-prod-56-18",
        "author": "박*호",
        "rating": 5,
        "date": "2026-08-03",
        "content": "지인 답례품으로 돌렸는데 반응이 역대급으로 좋았습니다.",
        "likes": 6
      },
      {
        "id": "rev-prod-56-19",
        "author": "최*훈",
        "rating": 4,
        "date": "2026-07-31",
        "content": "정성이 가득 담긴 건강한 먹거리라 몸도 마음도 든든합니다.",
        "likes": 5
      },
      {
        "id": "rev-prod-56-20",
        "author": "정*서",
        "rating": 5,
        "date": "2026-07-28",
        "content": "맛, 영양, 포장까지 3박자를 모두 갖춘 최고의 제품입니다!",
        "likes": 3
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-56-1",
        "author": "심*진",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-57",
    "name": "히말라야 핑크솔트 & 캄폿 블랙페퍼 글라인더 세트",
    "category": "푸드 / 키친",
    "categoryId": "cat-food",
    "price": 29000,
    "originalPrice": 39000,
    "discountRate": 26,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 72,
    "isBest": true,
    "isNew": true,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "2억 년 전 청정 암염의 깔끔한 감칠맛과 캄보디아 캄폿 프리미엄 통후추의 톡 쏘는 아로마",
    "description": "<h3>스테이크와 요리의 풍미를 극대화하는 키친 필수품</h3><p>굵기 조절이 가능한 세라믹 그라인더 헤드가 일체형으로 결합되어 항상 신선하게 갈아 사용할 수 있습니다.</p>",
    "options": [
      {
        "name": "핑크솔트(200g) + 블랙페퍼(100g) 그라인더 세트",
        "stock": 45
      }
    ],
    "specs": {
      "헤드": "내구성 뛰어난 세라믹 분쇄날",
      "포장": "선물용 크라프트 박스"
    },
    "reviews": [
      {
        "id": "rev-prod-57-1",
        "author": "강*은",
        "rating": 4,
        "date": "2026-09-29",
        "content": "히말라야 핑크솔트 & 캄폿 블랙페퍼 글라인더 세트 맛과 풍미가 깊고 신선함이 입안 가득 느껴집니다.",
        "likes": 36
      },
      {
        "id": "rev-prod-57-2",
        "author": "조*윤",
        "rating": 5,
        "date": "2026-09-26",
        "content": "포장 상태가 너무 정갈해서 선물용으로도 손색이 없네요.",
        "likes": 34
      },
      {
        "id": "rev-prod-57-3",
        "author": "윤*민",
        "rating": 5,
        "date": "2026-09-23",
        "content": "자연 그대로의 건강한 단맛과 감칠맛이 일품입니다.",
        "likes": 32
      },
      {
        "id": "rev-prod-57-4",
        "author": "장*지",
        "rating": 5,
        "date": "2026-09-20",
        "content": "아이들과 온 가족이 모두 맛있다고 간식으로 순삭했어요.",
        "likes": 31
      },
      {
        "id": "rev-prod-57-5",
        "author": "임*정",
        "rating": 5,
        "date": "2026-09-17",
        "content": "신선한 재료 본연의 맛이 살아있어 요리의 품격이 올라갑니다.",
        "likes": 29
      },
      {
        "id": "rev-prod-57-6",
        "author": "한*영",
        "rating": 5,
        "date": "2026-09-14",
        "content": "아침 식사 대용이나 홈카페 티타임에 곁들이기 딱 좋아요.",
        "likes": 28
      },
      {
        "id": "rev-prod-57-7",
        "author": "오*원",
        "rating": 4,
        "date": "2026-09-11",
        "content": "유통기한도 넉넉하고 제조일자가 최근이라 안심하고 먹습니다.",
        "likes": 26
      },
      {
        "id": "rev-prod-57-8",
        "author": "서*린",
        "rating": 5,
        "date": "2026-09-08",
        "content": "시중 마트 제품과는 비교가 안 되는 프리미엄 퀄리티입니다.",
        "likes": 24
      },
      {
        "id": "rev-prod-57-9",
        "author": "신*준",
        "rating": 5,
        "date": "2026-09-05",
        "content": "부모님께 보내드렸는데 너무 맛있다고 극찬을 아끼지 않으셨어요.",
        "likes": 23
      },
      {
        "id": "rev-prod-57-10",
        "author": "권*경",
        "rating": 5,
        "date": "2026-09-02",
        "content": "패키지 디자인도 세련되고 보관하기 편한 용기라 만족합니다.",
        "likes": 21
      },
      {
        "id": "rev-prod-57-11",
        "author": "황*수",
        "rating": 5,
        "date": "2026-08-30",
        "content": "자극적이지 않고 깔끔해서 매일 먹어도 질리지 않아요.",
        "likes": 20
      },
      {
        "id": "rev-prod-57-12",
        "author": "안*우",
        "rating": 5,
        "date": "2026-08-27",
        "content": "원산지와 유기농 인증이 확실해서 믿고 먹을 수 있습니다.",
        "likes": 18
      },
      {
        "id": "rev-prod-57-13",
        "author": "송*희",
        "rating": 4,
        "date": "2026-08-24",
        "content": "친구들 놀러 왔을 때 대접했는데 다들 어디서 샀냐고 물어보네요.",
        "likes": 16
      },
      {
        "id": "rev-prod-57-14",
        "author": "전*진",
        "rating": 5,
        "date": "2026-08-21",
        "content": "정기배송하고 싶을 정도로 만족스러운 고품격 푸드입니다.",
        "likes": 15
      },
      {
        "id": "rev-prod-57-15",
        "author": "홍*아",
        "rating": 5,
        "date": "2026-08-18",
        "content": "신선도를 유지해 주는 꼼꼼한 이중 포장에 감동했습니다.",
        "likes": 13
      },
      {
        "id": "rev-prod-57-16",
        "author": "유*태",
        "rating": 5,
        "date": "2026-08-15",
        "content": "홈카페와 홈쿠킹 퀄리티가 전문점 수준으로 업그레이드됐어요.",
        "likes": 12
      },
      {
        "id": "rev-prod-57-17",
        "author": "고*현",
        "rating": 5,
        "date": "2026-08-12",
        "content": "재구매 의사 1000%입니다. 다 먹으면 또 주문할게요.",
        "likes": 10
      },
      {
        "id": "rev-prod-57-18",
        "author": "문*호",
        "rating": 5,
        "date": "2026-08-09",
        "content": "지인 답례품으로 돌렸는데 반응이 역대급으로 좋았습니다.",
        "likes": 8
      },
      {
        "id": "rev-prod-57-19",
        "author": "양*훈",
        "rating": 4,
        "date": "2026-08-06",
        "content": "정성이 가득 담긴 건강한 먹거리라 몸도 마음도 든든합니다.",
        "likes": 7
      },
      {
        "id": "rev-prod-57-20",
        "author": "손*서",
        "rating": 5,
        "date": "2026-08-03",
        "content": "맛, 영양, 포장까지 3박자를 모두 갖춘 최고의 제품입니다!",
        "likes": 5
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-57-1",
        "author": "김*아",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-58",
    "name": "지리산 생과일 수제 과일청 3종 기프트 세트 (각 300g)",
    "category": "푸드 / 키친",
    "categoryId": "cat-food",
    "price": 35000,
    "originalPrice": 48000,
    "discountRate": 27,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 79,
    "isBest": false,
    "isNew": true,
    "isSale": true,
    "isFreeShipping": true,
    "thumbnail": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "자몽 레몬청, 백향과(패션후르츠)청, 생강 배도라지청으로 즐기는 홈카페 에이드 & 티",
    "description": "<h3>원과 육즙이 톡톡 터지는 신선한 수제청</h3><p>유기농 비정제 원당을 사용하여 너무 달지 않고 과일 본연의 상큼함을 살렸으며 탄산수에 타서 시원한 에이드로 즐기기 좋습니다.</p>",
    "options": [
      {
        "name": "인기 3종 세트 (자몽레몬 + 패션후르츠 + 생강배도라지)",
        "stock": 35
      }
    ],
    "specs": {
      "구성": "300g x 3병 + 미니 우드 스푼",
      "보관": "수령 후 냉장 보관"
    },
    "reviews": [
      {
        "id": "rev-prod-58-1",
        "author": "배*은",
        "rating": 4,
        "date": "2026-09-28",
        "content": "지리산 생과일 수제 과일청 3종 기프트 세트 (각 300g) 맛과 풍미가 깊고 신선함이 입안 가득 느껴집니다.",
        "likes": 38
      },
      {
        "id": "rev-prod-58-2",
        "author": "백*윤",
        "rating": 5,
        "date": "2026-09-25",
        "content": "포장 상태가 너무 정갈해서 선물용으로도 손색이 없네요.",
        "likes": 36
      },
      {
        "id": "rev-prod-58-3",
        "author": "허*민",
        "rating": 5,
        "date": "2026-09-22",
        "content": "자연 그대로의 건강한 단맛과 감칠맛이 일품입니다.",
        "likes": 34
      },
      {
        "id": "rev-prod-58-4",
        "author": "노*지",
        "rating": 5,
        "date": "2026-09-19",
        "content": "아이들과 온 가족이 모두 맛있다고 간식으로 순삭했어요.",
        "likes": 33
      },
      {
        "id": "rev-prod-58-5",
        "author": "남*정",
        "rating": 5,
        "date": "2026-09-16",
        "content": "신선한 재료 본연의 맛이 살아있어 요리의 품격이 올라갑니다.",
        "likes": 31
      },
      {
        "id": "rev-prod-58-6",
        "author": "심*영",
        "rating": 5,
        "date": "2026-09-13",
        "content": "아침 식사 대용이나 홈카페 티타임에 곁들이기 딱 좋아요.",
        "likes": 30
      },
      {
        "id": "rev-prod-58-7",
        "author": "김*원",
        "rating": 4,
        "date": "2026-09-10",
        "content": "유통기한도 넉넉하고 제조일자가 최근이라 안심하고 먹습니다.",
        "likes": 28
      },
      {
        "id": "rev-prod-58-8",
        "author": "이*린",
        "rating": 5,
        "date": "2026-09-07",
        "content": "시중 마트 제품과는 비교가 안 되는 프리미엄 퀄리티입니다.",
        "likes": 26
      },
      {
        "id": "rev-prod-58-9",
        "author": "박*준",
        "rating": 5,
        "date": "2026-09-04",
        "content": "부모님께 보내드렸는데 너무 맛있다고 극찬을 아끼지 않으셨어요.",
        "likes": 25
      },
      {
        "id": "rev-prod-58-10",
        "author": "최*경",
        "rating": 5,
        "date": "2026-09-01",
        "content": "패키지 디자인도 세련되고 보관하기 편한 용기라 만족합니다.",
        "likes": 23
      },
      {
        "id": "rev-prod-58-11",
        "author": "정*수",
        "rating": 5,
        "date": "2026-08-29",
        "content": "자극적이지 않고 깔끔해서 매일 먹어도 질리지 않아요.",
        "likes": 22
      },
      {
        "id": "rev-prod-58-12",
        "author": "강*우",
        "rating": 5,
        "date": "2026-08-26",
        "content": "원산지와 유기농 인증이 확실해서 믿고 먹을 수 있습니다.",
        "likes": 20
      },
      {
        "id": "rev-prod-58-13",
        "author": "조*희",
        "rating": 4,
        "date": "2026-08-23",
        "content": "친구들 놀러 왔을 때 대접했는데 다들 어디서 샀냐고 물어보네요.",
        "likes": 18
      },
      {
        "id": "rev-prod-58-14",
        "author": "윤*진",
        "rating": 5,
        "date": "2026-08-20",
        "content": "정기배송하고 싶을 정도로 만족스러운 고품격 푸드입니다.",
        "likes": 17
      },
      {
        "id": "rev-prod-58-15",
        "author": "장*아",
        "rating": 5,
        "date": "2026-08-17",
        "content": "신선도를 유지해 주는 꼼꼼한 이중 포장에 감동했습니다.",
        "likes": 15
      },
      {
        "id": "rev-prod-58-16",
        "author": "임*태",
        "rating": 5,
        "date": "2026-08-14",
        "content": "홈카페와 홈쿠킹 퀄리티가 전문점 수준으로 업그레이드됐어요.",
        "likes": 14
      },
      {
        "id": "rev-prod-58-17",
        "author": "한*현",
        "rating": 5,
        "date": "2026-08-11",
        "content": "재구매 의사 1000%입니다. 다 먹으면 또 주문할게요.",
        "likes": 12
      },
      {
        "id": "rev-prod-58-18",
        "author": "오*호",
        "rating": 5,
        "date": "2026-08-08",
        "content": "지인 답례품으로 돌렸는데 반응이 역대급으로 좋았습니다.",
        "likes": 10
      },
      {
        "id": "rev-prod-58-19",
        "author": "서*훈",
        "rating": 4,
        "date": "2026-08-05",
        "content": "정성이 가득 담긴 건강한 먹거리라 몸도 마음도 든든합니다.",
        "likes": 9
      },
      {
        "id": "rev-prod-58-20",
        "author": "신*서",
        "rating": 5,
        "date": "2026-08-02",
        "content": "맛, 영양, 포장까지 3박자를 모두 갖춘 최고의 제품입니다!",
        "likes": 7
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-58-1",
        "author": "이*태",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-59",
    "name": "유기농 루이보스 & 카모마일 허브 블렌딩 티백 세트 (30티백)",
    "category": "푸드 / 키친",
    "categoryId": "cat-food",
    "price": 23000,
    "originalPrice": 32000,
    "discountRate": 28,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 36,
    "isBest": false,
    "isNew": false,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "무카페인 안심 허브티, 생분해성 사탕수수 PLA 삼각 티백의 맑고 은은한 휴식",
    "description": "<h3>자기 전 편안하게 마시는 힐링 티타임</h3><p>임산부도 안심하고 마실 수 있는 100% 카페인 프리 티로 은은한 허브 꽃향이 지친 몸과 마음을 편안하게 이완시켜 줍니다.</p>",
    "options": [
      {
        "name": "루이보스 바닐라 & 슬립 카모마일 (각 15티백)",
        "stock": 40
      }
    ],
    "specs": {
      "구성": "삼각티백 30개입 틴케이스",
      "티백재질": "친환경 PLA 사탕수수 필터"
    },
    "reviews": [
      {
        "id": "rev-prod-59-1",
        "author": "권*은",
        "rating": 4,
        "date": "2026-09-27",
        "content": "유기농 루이보스 & 카모마일 허브 블렌딩 티백 세트 (30티백) 맛과 풍미가 깊고 신선함이 입안 가득 느껴집니다.",
        "likes": 40
      },
      {
        "id": "rev-prod-59-2",
        "author": "황*윤",
        "rating": 5,
        "date": "2026-09-24",
        "content": "포장 상태가 너무 정갈해서 선물용으로도 손색이 없네요.",
        "likes": 38
      },
      {
        "id": "rev-prod-59-3",
        "author": "안*민",
        "rating": 5,
        "date": "2026-09-21",
        "content": "자연 그대로의 건강한 단맛과 감칠맛이 일품입니다.",
        "likes": 36
      },
      {
        "id": "rev-prod-59-4",
        "author": "송*지",
        "rating": 5,
        "date": "2026-09-18",
        "content": "아이들과 온 가족이 모두 맛있다고 간식으로 순삭했어요.",
        "likes": 35
      },
      {
        "id": "rev-prod-59-5",
        "author": "전*정",
        "rating": 5,
        "date": "2026-09-15",
        "content": "신선한 재료 본연의 맛이 살아있어 요리의 품격이 올라갑니다.",
        "likes": 33
      },
      {
        "id": "rev-prod-59-6",
        "author": "홍*영",
        "rating": 5,
        "date": "2026-09-12",
        "content": "아침 식사 대용이나 홈카페 티타임에 곁들이기 딱 좋아요.",
        "likes": 32
      },
      {
        "id": "rev-prod-59-7",
        "author": "유*원",
        "rating": 4,
        "date": "2026-09-09",
        "content": "유통기한도 넉넉하고 제조일자가 최근이라 안심하고 먹습니다.",
        "likes": 30
      },
      {
        "id": "rev-prod-59-8",
        "author": "고*린",
        "rating": 5,
        "date": "2026-09-06",
        "content": "시중 마트 제품과는 비교가 안 되는 프리미엄 퀄리티입니다.",
        "likes": 28
      },
      {
        "id": "rev-prod-59-9",
        "author": "문*준",
        "rating": 5,
        "date": "2026-09-03",
        "content": "부모님께 보내드렸는데 너무 맛있다고 극찬을 아끼지 않으셨어요.",
        "likes": 27
      },
      {
        "id": "rev-prod-59-10",
        "author": "양*경",
        "rating": 5,
        "date": "2026-08-31",
        "content": "패키지 디자인도 세련되고 보관하기 편한 용기라 만족합니다.",
        "likes": 25
      },
      {
        "id": "rev-prod-59-11",
        "author": "손*수",
        "rating": 5,
        "date": "2026-08-28",
        "content": "자극적이지 않고 깔끔해서 매일 먹어도 질리지 않아요.",
        "likes": 24
      },
      {
        "id": "rev-prod-59-12",
        "author": "배*우",
        "rating": 5,
        "date": "2026-08-25",
        "content": "원산지와 유기농 인증이 확실해서 믿고 먹을 수 있습니다.",
        "likes": 22
      },
      {
        "id": "rev-prod-59-13",
        "author": "백*희",
        "rating": 4,
        "date": "2026-08-22",
        "content": "친구들 놀러 왔을 때 대접했는데 다들 어디서 샀냐고 물어보네요.",
        "likes": 20
      },
      {
        "id": "rev-prod-59-14",
        "author": "허*진",
        "rating": 5,
        "date": "2026-08-19",
        "content": "정기배송하고 싶을 정도로 만족스러운 고품격 푸드입니다.",
        "likes": 19
      },
      {
        "id": "rev-prod-59-15",
        "author": "노*아",
        "rating": 5,
        "date": "2026-08-16",
        "content": "신선도를 유지해 주는 꼼꼼한 이중 포장에 감동했습니다.",
        "likes": 17
      },
      {
        "id": "rev-prod-59-16",
        "author": "남*태",
        "rating": 5,
        "date": "2026-08-13",
        "content": "홈카페와 홈쿠킹 퀄리티가 전문점 수준으로 업그레이드됐어요.",
        "likes": 16
      },
      {
        "id": "rev-prod-59-17",
        "author": "심*현",
        "rating": 5,
        "date": "2026-08-10",
        "content": "재구매 의사 1000%입니다. 다 먹으면 또 주문할게요.",
        "likes": 14
      },
      {
        "id": "rev-prod-59-18",
        "author": "김*호",
        "rating": 5,
        "date": "2026-08-07",
        "content": "지인 답례품으로 돌렸는데 반응이 역대급으로 좋았습니다.",
        "likes": 12
      },
      {
        "id": "rev-prod-59-19",
        "author": "이*훈",
        "rating": 4,
        "date": "2026-08-04",
        "content": "정성이 가득 담긴 건강한 먹거리라 몸도 마음도 든든합니다.",
        "likes": 11
      },
      {
        "id": "rev-prod-59-20",
        "author": "박*서",
        "rating": 5,
        "date": "2026-08-01",
        "content": "맛, 영양, 포장까지 3박자를 모두 갖춘 최고의 제품입니다!",
        "likes": 9
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-59-1",
        "author": "박*현",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
  },
  {
    "id": "prod-60",
    "name": "제주 화산암반수 저온추출 더치 콜드브루 원액 500ml",
    "category": "푸드 / 키친",
    "categoryId": "cat-food",
    "price": 19000,
    "originalPrice": 26000,
    "discountRate": 27,
    "rating": 4.8,
    "reviewCount": 20,
    "stock": 43,
    "isBest": true,
    "isNew": true,
    "isSale": true,
    "isFreeShipping": false,
    "thumbnail": "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=1000&q=80"
    ],
    "summary": "12시간 동안 한 방울씩 정성으로 내린 깊고 진한 와인 같은 커피의 눈물",
    "description": "<h3>쓴맛 없이 초콜릿 같은 부드러움</h3><p>제주 삼다수 암반수로 추출하여 잡미 없이 깔끔하며, 물이나 우유에 1:4 비율로 희석하여 간편하게 아메리카노와 라떼를 즐기세요.</p>",
    "options": [
      {
        "name": "더치 원액 500ml 유리병",
        "stock": 50
      },
      {
        "name": "더치 원액 1000ml 대용량",
        "stock": 30
      }
    ],
    "specs": {
      "용량": "500ml / 1000ml",
      "추출": "12시간 점적식 저온 추출"
    },
    "reviews": [
      {
        "id": "rev-prod-60-1",
        "author": "최*은",
        "rating": 4,
        "date": "2026-09-26",
        "content": "제주 화산암반수 저온추출 더치 콜드브루 원액 500ml 맛과 풍미가 깊고 신선함이 입안 가득 느껴집니다.",
        "likes": 42
      },
      {
        "id": "rev-prod-60-2",
        "author": "정*윤",
        "rating": 5,
        "date": "2026-09-23",
        "content": "포장 상태가 너무 정갈해서 선물용으로도 손색이 없네요.",
        "likes": 40
      },
      {
        "id": "rev-prod-60-3",
        "author": "강*민",
        "rating": 5,
        "date": "2026-09-20",
        "content": "자연 그대로의 건강한 단맛과 감칠맛이 일품입니다.",
        "likes": 38
      },
      {
        "id": "rev-prod-60-4",
        "author": "조*지",
        "rating": 5,
        "date": "2026-09-17",
        "content": "아이들과 온 가족이 모두 맛있다고 간식으로 순삭했어요.",
        "likes": 37
      },
      {
        "id": "rev-prod-60-5",
        "author": "윤*정",
        "rating": 5,
        "date": "2026-09-14",
        "content": "신선한 재료 본연의 맛이 살아있어 요리의 품격이 올라갑니다.",
        "likes": 35
      },
      {
        "id": "rev-prod-60-6",
        "author": "장*영",
        "rating": 5,
        "date": "2026-09-11",
        "content": "아침 식사 대용이나 홈카페 티타임에 곁들이기 딱 좋아요.",
        "likes": 34
      },
      {
        "id": "rev-prod-60-7",
        "author": "임*원",
        "rating": 4,
        "date": "2026-09-08",
        "content": "유통기한도 넉넉하고 제조일자가 최근이라 안심하고 먹습니다.",
        "likes": 32
      },
      {
        "id": "rev-prod-60-8",
        "author": "한*린",
        "rating": 5,
        "date": "2026-09-05",
        "content": "시중 마트 제품과는 비교가 안 되는 프리미엄 퀄리티입니다.",
        "likes": 30
      },
      {
        "id": "rev-prod-60-9",
        "author": "오*준",
        "rating": 5,
        "date": "2026-09-02",
        "content": "부모님께 보내드렸는데 너무 맛있다고 극찬을 아끼지 않으셨어요.",
        "likes": 29
      },
      {
        "id": "rev-prod-60-10",
        "author": "서*경",
        "rating": 5,
        "date": "2026-08-30",
        "content": "패키지 디자인도 세련되고 보관하기 편한 용기라 만족합니다.",
        "likes": 27
      },
      {
        "id": "rev-prod-60-11",
        "author": "신*수",
        "rating": 5,
        "date": "2026-08-27",
        "content": "자극적이지 않고 깔끔해서 매일 먹어도 질리지 않아요.",
        "likes": 26
      },
      {
        "id": "rev-prod-60-12",
        "author": "권*우",
        "rating": 5,
        "date": "2026-08-24",
        "content": "원산지와 유기농 인증이 확실해서 믿고 먹을 수 있습니다.",
        "likes": 24
      },
      {
        "id": "rev-prod-60-13",
        "author": "황*희",
        "rating": 4,
        "date": "2026-08-21",
        "content": "친구들 놀러 왔을 때 대접했는데 다들 어디서 샀냐고 물어보네요.",
        "likes": 22
      },
      {
        "id": "rev-prod-60-14",
        "author": "안*진",
        "rating": 5,
        "date": "2026-08-18",
        "content": "정기배송하고 싶을 정도로 만족스러운 고품격 푸드입니다.",
        "likes": 21
      },
      {
        "id": "rev-prod-60-15",
        "author": "송*아",
        "rating": 5,
        "date": "2026-08-15",
        "content": "신선도를 유지해 주는 꼼꼼한 이중 포장에 감동했습니다.",
        "likes": 19
      },
      {
        "id": "rev-prod-60-16",
        "author": "전*태",
        "rating": 5,
        "date": "2026-08-12",
        "content": "홈카페와 홈쿠킹 퀄리티가 전문점 수준으로 업그레이드됐어요.",
        "likes": 18
      },
      {
        "id": "rev-prod-60-17",
        "author": "홍*현",
        "rating": 5,
        "date": "2026-08-09",
        "content": "재구매 의사 1000%입니다. 다 먹으면 또 주문할게요.",
        "likes": 16
      },
      {
        "id": "rev-prod-60-18",
        "author": "유*호",
        "rating": 5,
        "date": "2026-08-06",
        "content": "지인 답례품으로 돌렸는데 반응이 역대급으로 좋았습니다.",
        "likes": 14
      },
      {
        "id": "rev-prod-60-19",
        "author": "고*훈",
        "rating": 4,
        "date": "2026-08-03",
        "content": "정성이 가득 담긴 건강한 먹거리라 몸도 마음도 든든합니다.",
        "likes": 13
      },
      {
        "id": "rev-prod-60-20",
        "author": "문*서",
        "rating": 5,
        "date": "2026-07-31",
        "content": "맛, 영양, 포장까지 3박자를 모두 갖춘 최고의 제품입니다!",
        "likes": 11
      }
    ],
    "qnas": [
      {
        "id": "qna-prod-60-1",
        "author": "최*호",
        "date": "2026-09-20",
        "question": "오늘 주문하면 언제 출고되나요?",
        "answer": "고객님 안녕하세요! 오후 2시 이전 결제 완료 시 당일 안전하게 로켓 출고됩니다."
      }
    ]
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

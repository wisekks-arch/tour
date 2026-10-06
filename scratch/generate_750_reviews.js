const fs = require('fs');
const path = require('path');

const packagesPath = path.join(__dirname, '..', 'data', 'packages.json');
const packages = JSON.parse(fs.readFileSync(packagesPath, 'utf8'));

console.log(`Found ${packages.length} packages. Generating 10 reviews per package (Total: ${packages.length * 10})...`);

const firstNames = [
  '김*우', '이*진', '박*현', '최*영', '정*훈', '강*원', '조*민', '윤*서', '장*혁', '임*하',
  '한*준', '송*은', '오*진', '신*호', '배*린', '유*재', '홍*경', '문*석', '류*희', '서*준',
  '황*연', '안*태', '고*아', '권*민', '백*승', '노*주', '허*석', '남*우', '심*정', '하*빈'
];

const emailDomains = ['naver.com', 'gmail.com', 'daum.net', 'kakao.com', 'hanmail.net'];

const travelDates = ['2026-04', '2026-05', '2026-06', '2026-07', '2026-08', '2026-09'];

// Templates for creating realistic contextual reviews
const reviewPatterns = [
  {
    titleSuffix: '가족 여행으로 다녀왔는데 모두가 극찬했습니다!',
    contentFn: (p) => `${p.city || p.country} 여행을 부모님 모시고 다녀왔는데 코스 구성이 정말 완벽했습니다. 전용 차량으로 이동해서 피로감도 전혀 없었고, 배정된 호텔 룸 컨디션과 조식도 기대 이상이었습니다. 가이드님이 친절하게 하나하나 챙겨주셔서 온 가족이 평생 기억에 남을 행복한 추억 만들고 갑니다!`
  },
  {
    titleSuffix: '일정부터 숙소, 식사까지 흠잡을 데 없는 완벽한 힐링',
    contentFn: (p) => `${p.title} 상품으로 다녀온 후기 남깁니다. 패키지 특유의 빡빡함 없이 자유시간도 넉넉해서 여유롭게 현지 분위기를 만끽할 수 있었어요. 특히 현지 특식과 일정에 포함된 스팟들의 뷰가 환상적이었습니다. 다음에도 투어이지에서 예약할 예정입니다.`
  },
  {
    titleSuffix: '친구들과 잊지 못할 인생 여행 만들고 왔어요',
    contentFn: (p) => `친구 3명과 함께 떠난 ${p.city || p.country} 여행이었는데, 사진 찍기 좋은 명소들도 알차게 포함되어 있고 인생샷 수백 장 건졌습니다! 가이드님의 센스 넘치는 맛집 추천 덕분에 먹는 즐거움도 최고였네요. 투어이지 강력 추천합니다.`
  },
  {
    titleSuffix: '부부 기념일 여행 대만족! 럭셔리함의 끝판왕',
    contentFn: (p) => `결혼기념일 기념으로 다녀왔는데 기대했던 것보다 훨씬 더 고급스럽고 만족스러운 일정이었습니다. 숙소 뷰도 예술이었고, 프라이빗하게 진행되어 오롯이 둘만의 소중한 시간을 보낼 수 있었습니다. 꼼꼼한 케어에 진심으로 감사드립니다.`
  },
  {
    titleSuffix: '가성비와 가심비 모두 잡은 최고의 여행 패키지',
    contentFn: (p) => `가격 대비 포함 내역이 너무 알차서 깜짝 놀랐습니다. 항공, 호텔, 식사, 주요 관광지 입장권까지 하나하나 신경 쓴 게 느껴졌어요. 현지 이동도 너무 쾌적했고 일정 내내 스트레스 없이 온전히 힐링하고 왔습니다.`
  },
  {
    titleSuffix: '가이드님의 전문적인 인솔 덕분에 100배 더 즐거웠습니다',
    contentFn: (p) => `여행지 역사와 숨겨진 포인트를 쉽고 재미있게 설명해 주셔서 여행의 깊이가 달라졌습니다. 질문에도 친절히 답해주시고 이동 중에도 편안하게 배려해주셔서 정말 든든했습니다. 최고의 인솔자님 덕분에 최고의 여행이었습니다!`
  },
  {
    titleSuffix: '숙소 퀄리티와 전망이 압도적으로 훌륭했습니다',
    contentFn: (p) => `${p.city || p.country}에서 묵은 호텔 퀄리티가 정말 대박이었습니다. 창밖으로 펼쳐지는 멋진 전망과 침구류의 안락함 덕분에 여행 피로가 싹 풀렸어요. 위치도 좋아서 저녁에 주변 산책하기도 딱이었습니다.`
  },
  {
    titleSuffix: '처음 가본 여행지였는데 완벽한 일정 덕분에 반했습니다',
    contentFn: (p) => `처음 방문하는 곳이라 걱정이 앞섰는데 핵심 명소만 쏙쏙 골라 담은 일정 덕분에 알차게 둘러봤습니다. 현지 특색을 살린 미식 체험도 잊을 수 없네요. 주변 지인들에게도 꼭 가보라고 추천하고 있습니다.`
  },
  {
    titleSuffix: '아이들과 함께한 여행, 아이도 어른도 대만족!',
    contentFn: (p) => `아이와 함께하는 여행이라 신경 쓸 게 많았는데, 이동 동선도 배려 깊고 아이가 좋아할 만한 프로그램이 포함되어 있어 수월하게 다녀왔습니다. 호텔 수영장과 부대시설도 최고였어요. 가족 여행지로 강력 추천합니다.`
  },
  {
    titleSuffix: '재방문 의사 200%! 믿고 떠나는 투어이지 패키지',
    contentFn: (p) => `예약 과정부터 현지 인솔, 귀국까지 물 흐르듯 매끄러웠습니다. 세심한 일정 배치와 넉넉한 휴식 시간이 패키지 여행의 편견을 완전히 깨주었습니다. 매년 휴가는 투어이지와 함께하기로 마음먹었습니다!`
  }
];

const allReviews = [];

packages.forEach((pkg, pkgIdx) => {
  const pkgImages = Array.isArray(pkg.images) && pkg.images.length > 0
    ? pkg.images
    : (pkg.thumbnail ? [pkg.thumbnail] : ['https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80']);

  for (let i = 0; i < 10; i++) {
    const pattern = reviewPatterns[i % reviewPatterns.length];
    const userIdx = (pkgIdx * 10 + i) % firstNames.length;
    const userName = firstNames[userIdx];
    const userDomain = emailDomains[(pkgIdx + i) % emailDomains.length];
    const userEmail = `user${pkgIdx * 10 + i + 101}@${userDomain}`;
    
    // Rating: 85% 5 stars, 15% 4 stars
    const rating = (i === 4 || i === 8) ? 4 : 5;
    
    const travelDate = travelDates[(pkgIdx + i) % travelDates.length];
    const day = String((i * 3 + 2) % 27 + 1).padStart(2, '0');
    const hour = String(9 + (i * 2) % 12).padStart(2, '0');
    const min = String((i * 7) % 60).padStart(2, '0');
    const createdAt = `${travelDate}-${day}T${hour}:${min}:00.000Z`;

    const imgIndex = i % pkgImages.length;
    const primaryImg = pkgImages[imgIndex];
    const subImgs = [primaryImg];
    if (pkgImages[(imgIndex + 1) % pkgImages.length] && pkgImages.length > 1) {
      subImgs.push(pkgImages[(imgIndex + 1) % pkgImages.length]);
    }

    const reviewObj = {
      id: `rev-${pkg.id}-${String(i + 1).padStart(2, '0')}`,
      userId: `usr-rev-${pkgIdx * 10 + i + 1}`,
      userName,
      userEmail,
      packageId: pkg.id,
      packageSlug: pkg.slug || pkg.id,
      packageTitle: pkg.title,
      rating,
      title: `[${pkg.city || pkg.country || pkg.region}] ${pattern.titleSuffix}`,
      content: pattern.contentFn(pkg),
      travelDate,
      imageUrl: primaryImg,
      images: subImgs,
      likes: 6 + ((pkgIdx * 7 + i * 3) % 30),
      createdAt
    };

    allReviews.push(reviewObj);
  }
});

console.log(`Generated total ${allReviews.length} reviews for ${packages.length} packages.`);

// 1. Save data/reviews.json
const reviewsJsonPath = path.join(__dirname, '..', 'data', 'reviews.json');
fs.writeFileSync(reviewsJsonPath, JSON.stringify(allReviews, null, 2), 'utf8');
console.log(`✓ Saved ${reviewsJsonPath}`);

// 2. Update DEFAULT_REVIEWS in js/api.js and public/js/api.js
const reviewsJsCode = `const DEFAULT_REVIEWS = ${JSON.stringify(allReviews, null, 2)};\n`;

function updateApiJs(filePath) {
  let code = fs.readFileSync(filePath, 'utf8');
  const startIdx = code.indexOf('const DEFAULT_REVIEWS = [');
  if (startIdx === -1) {
    console.error(`DEFAULT_REVIEWS not found in ${filePath}`);
    return;
  }
  const endMarker = 'const DEFAULT_HOTELS = [';
  const endIdx = code.indexOf(endMarker);
  if (endIdx === -1) {
    console.error(`DEFAULT_HOTELS marker not found in ${filePath}`);
    return;
  }

  const prefix = code.slice(0, startIdx);
  const suffix = code.slice(endIdx);
  const newCode = prefix + reviewsJsCode + '\n' + suffix;
  fs.writeFileSync(filePath, newCode, 'utf8');
  console.log(`✓ Updated ${filePath} with ${allReviews.length} reviews.`);
}

updateApiJs(path.join(__dirname, '..', 'js', 'api.js'));
updateApiJs(path.join(__dirname, '..', 'public', 'js', 'api.js'));

console.log('Done generating 750 reviews across all packages.');

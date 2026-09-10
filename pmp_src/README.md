# 🏆 PMP Exam Master - PMP 실전 모의고사 & 학습 플랫폼

PMI의 최신 **PMBOK 7판** 및 **ECO (Examination Content Outline)** 기준을 완벽하게 반영한 PMP 실전 모의고사, 영역별 집중 학습, EVM 계산기, 오답노트 플랫폼입니다.

---

## 🚀 빠른 시작 (Quick Start)

### 1. 원클릭 실행
[start.bat](file:///d:/92.SW/pmp/start.bat) 파일을 더블 클릭하면 서버(포트 5000)가 구동되며 브라우저가 자동으로 열립니다.

### 2. 접속 주소
- 🏠 **포털 메인**: [http://localhost:5000/](http://localhost:5000/)
- ⏱️ **실전 모의고사**: [http://localhost:5000/exam.html](http://localhost:5000/exam.html)
- 📖 **영역별 학습**: [http://localhost:5000/study.html](http://localhost:5000/study.html)
- 🧮 **EVM 계산기 & 공식**: [http://localhost:5000/formulas.html](http://localhost:5000/formulas.html)
- 🗂️ **핵심 용어 플래시카드**: [http://localhost:5000/flashcards.html](http://localhost:5000/flashcards.html)
- 📝 **오답노트 & 북마크**: [http://localhost:5000/review.html](http://localhost:5000/review.html)
- ⚙️ **문제 관리자**: [http://localhost:5000/admin.html](http://localhost:5000/admin.html)

---

## 🌟 주요 기능 구성

1. **⏱️ Pearson VUE 실전 모의고사 (`exam.html`)**
   - 실전 시험 카운트다운 타이머 & 문항 탐색기
   - 🚩 Review Later (검토 마킹)
   - ✂️ 오답 소거선 (Strikethrough)
   - 🌐 한/영 원문 병기 토글
   - 종합 성적표 및 도메인별(People 42%, Process 50%, Business 8%) 득점률 분석

2. **📖 영역별 집중 학습 & 즉시 해설 (`study.html`)**
   - 도메인별 / 애자일 특화 필터링
   - 정답 선택 즉시 O/X 결과 및 PMBOK 7판 근거 상세 해설 출력
   - 각 보기(A, B, C, D)별 오답/정답 이유 상세 비교

3. **🧮 EVM 시뮬레이터 & 공식 마스터 (`formulas.html`)**
   - BAC, PV, EV, AC 실시간 파라미터 시뮬레이션
   - SV, CV, SPI, CPI, EAC, ETC, TCPI 자동 계산 및 상태 진단
   - 삼점추정(PERT), 의사소통 채널 수 등 PMP 빈출 공식 요약

4. **🗂️ 핵심 개념 3D 플래시카드 (`flashcards.html`)**
   - 서번트 리더십, 주공정법(CPM), 골드 플레이팅, DoD 등 빈출 핵심 용어 암기

5. **📝 오답노트 & 북마크 (`review.html`)**
   - 틀린 문제 자동 누적 보관 및 복습, 시험 응시 이력 추적

6. **⚙️ 문제 은행 관리자 (`admin.html`)**
   - 신규 문제 등록, 기존 문제 수정/삭제 (REST API 연동)

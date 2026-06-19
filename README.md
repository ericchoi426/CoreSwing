<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<title>오늘 뭐 먹소? 🐮 — 기말고사 구현과제 보고서</title>
<style>
  /* ===== Sage Green & Cream Wellness Design System (앱과 동일) ===== */
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap');

  * { box-sizing: border-box; }
  body {
    font-family: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
    line-height: 1.75;
    color: #2D3748;
    background: linear-gradient(180deg, #F3F6F2 0%, #FAF9F6 100%);
    max-width: 920px;
    margin: 40px auto;
    padding: 60px 70px;
    background-color: #FFFFFF;
    box-shadow: 0 10px 40px rgba(63, 94, 66, 0.08);
    border-radius: 4px;
  }

  /* ===== 표지 ===== */
  .cover {
    text-align: center;
    padding: 30px 0 40px;
    border-bottom: 3px solid #4F6F52;
    margin-bottom: 50px;
  }
  .cover .cow { font-size: 84px; line-height: 1; animation: bounce 2.5s infinite ease-in-out; display:inline-block;}
  @keyframes bounce { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }
  .cover h1 {
    font-size: 38px;
    margin: 12px 0 6px;
    background: linear-gradient(135deg, #3F5E42 0%, #739072 50%, #4F6F52 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 900;
    letter-spacing: -1.2px;
  }
  .cover .tagline {
    font-size: 17px;
    color: #555E55;
    font-weight: 500;
    margin-bottom: 28px;
  }
  .cover .meta {
    display: inline-block;
    text-align: left;
    background: #F3F6F2;
    border: 1px solid #DCE2DA;
    padding: 16px 28px;
    border-radius: 12px;
    font-size: 14px;
    color: #3F5E42;
  }
  .cover .meta div { margin: 5px 0; }

  /* ===== 헤딩 ===== */
  h2 {
    font-size: 25px;
    color: #2F3E32;
    border-left: 6px solid #4F6F52;
    padding-left: 16px;
    margin-top: 55px;
    margin-bottom: 18px;
    font-weight: 800;
  }
  h2 .small { font-size: 14px; color: #718096; font-weight: 500; }
  h3 {
    font-size: 19px;
    color: #3F5E42;
    margin-top: 30px;
    margin-bottom: 12px;
    font-weight: 700;
  }
  h4 {
    font-size: 15.5px;
    color: #2D3748;
    margin-top: 22px;
    margin-bottom: 8px;
    font-weight: 700;
  }

  /* ===== STEP (큰 단계 박스) ===== */
  .step {
    background: #FFFFFF;
    border: 2px solid #DCE2DA;
    border-radius: 14px;
    padding: 18px 22px 18px 70px;
    margin: 18px 0;
    position: relative;
    box-shadow: 0 4px 16px rgba(63, 94, 66, 0.04);
  }
  .step::before {
    content: attr(data-step);
    position: absolute;
    left: 16px;
    top: 16px;
    width: 38px;
    height: 38px;
    background: linear-gradient(135deg, #4F6F52 0%, #3F5E42 100%);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    font-size: 16px;
    box-shadow: 0 4px 10px rgba(63, 94, 66, 0.25);
  }
  .step .step-title {
    font-size: 17px;
    font-weight: 800;
    color: #2F3E32;
    margin-bottom: 10px;
  }
  .step .substep {
    margin: 8px 0;
  }

  /* ===== 본문 ===== */
  p { margin: 10px 0; }
  ul, ol { padding-left: 24px; }
  li { margin: 6px 0; }
  strong { color: #2F3E32; }

  /* ===== 박스 컴포넌트 ===== */
  blockquote {
    border-left: 4px solid #4F6F52;
    background: #F4F6F4;
    padding: 16px 22px;
    margin: 18px 0;
    color: #2F3E32;
    font-weight: 500;
    border-radius: 4px;
  }
  .callout {
    background: #FFFBEA;
    border: 1px solid #F6E05E;
    border-radius: 10px;
    padding: 14px 20px;
    margin: 16px 0;
    font-size: 14px;
  }
  .callout.green { background: #F0FFF4; border-color: #9AE6B4; }
  .callout.sage { background: #F4F6F4; border-color: #B6C2B2; }
  .callout.red { background: #FFF5F5; border-color: #FCA5A5; }
  .callout-title { font-weight: 800; margin-bottom: 4px; }

  /* ===== 표 ===== */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 18px 0;
    font-size: 14px;
  }
  th, td {
    border: 1px solid #DCE2DA;
    padding: 10px 12px;
    text-align: left;
    vertical-align: top;
  }
  th {
    background: linear-gradient(135deg, #4F6F52 0%, #3F5E42 100%);
    color: #fff;
    font-weight: 600;
  }
  tr:nth-child(even) td { background: #FAF9F6; }
  td code { background: #E6EAE4; color: #3F5E42; }

  /* ===== 코드 ===== */
  code {
    font-family: 'JetBrains Mono', monospace;
    background: #F3F6F2;
    color: #C53030;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 13px;
  }
  pre {
    background: #2F3E32;
    color: #D2E3C8;
    padding: 16px 20px;
    border-radius: 12px;
    overflow-x: auto;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    line-height: 1.6;
    border: 1px solid #3F5E42;
  }
  pre code { background: transparent; color: inherit; padding: 0; font-size: 13px; }

  /* 터미널 출력 예시 박스 */
  .terminal-output {
    background: #1A202C;
    color: #A0AEC0;
    padding: 14px 18px;
    border-radius: 10px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12.5px;
    line-height: 1.55;
    overflow-x: auto;
    border-left: 4px solid #68D391;
    white-space: pre;
    margin: 10px 0;
  }
  .terminal-output .ok { color: #68D391; }
  .terminal-output .info { color: #63B3ED; }
  .terminal-output .warn { color: #F6AD55; }

  /* OS 탭 (CSS only — 정적이지만 시각 구분) */
  .os-block {
    background: #F3F6F2;
    border: 1px solid #DCE2DA;
    border-radius: 10px;
    padding: 12px 16px;
    margin: 8px 0;
  }
  .os-block .os-label {
    display: inline-block;
    background: #4F6F52;
    color: #fff;
    padding: 3px 12px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 700;
    margin-bottom: 8px;
  }
  .os-block .os-label.mac { background: #2D3748; }
  .os-block .os-label.linux { background: #D97706; }

  /* ===== 카드 ===== */
  .card {
    background: #FFFFFF;
    border: 1px solid #E4E8E2;
    border-radius: 16px;
    padding: 22px 26px;
    margin: 18px 0;
    box-shadow: 0 6px 20px rgba(63, 94, 66, 0.04);
  }
  .card-title {
    font-size: 16px;
    font-weight: 800;
    color: #2D3748;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-bottom: 1.5px solid #F0F4EE;
    padding-bottom: 8px;
  }

  /* ===== 매크로 진척률 바 ===== */
  .macro-tracker { margin: 8px 0; }
  .macro-label-group {
    display: flex; justify-content: space-between;
    font-size: 13px; font-weight: 700;
    color: #4A5568; margin-bottom: 4px;
  }
  .macro-bar-bg {
    width: 100%; height: 8px;
    background-color: #E6EAE4;
    border-radius: 4px; overflow: hidden;
  }
  .macro-bar-fill { height: 100%; border-radius: 4px; }
  .carb-fill { background: linear-gradient(90deg, #FCD34D 0%, #F59E0B 100%); }
  .prot-fill { background: linear-gradient(90deg, #FCA5A5 0%, #EF4444 100%); }
  .fat-fill { background: linear-gradient(90deg, #A7F3D0 0%, #10B981 100%); }

  /* ===== 메뉴 풀 그리드 ===== */
  .menu-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin: 12px 0;
  }
  .menu-item {
    background: #F4F6F4;
    border-left: 3px solid #4F6F52;
    padding: 10px 14px;
    border-radius: 6px;
    font-size: 13.5px;
  }
  .menu-item .name { font-weight: 700; color: #2F3E32; }
  .menu-item .kcal {
    display: inline-block;
    background: #FEE2E2;
    color: #C53030;
    padding: 1px 7px;
    border-radius: 4px;
    font-size: 11.5px;
    font-weight: 700;
    margin-left: 6px;
  }

  /* ===== 흐름도 ===== */
  .flow {
    background: #F3F6F2;
    border: 1px dashed #739072;
    border-radius: 10px;
    padding: 18px 22px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    white-space: pre;
    line-height: 1.55;
    color: #2F3E32;
    overflow-x: auto;
  }

  /* ===== 마무리 ===== */
  .signoff {
    text-align: center;
    margin-top: 60px;
    padding-top: 30px;
    border-top: 2px dashed #B6C2B2;
    color: #555E55;
    font-size: 14px;
  }

  /* ===== 인쇄용 ===== */
  @media print {
    body { box-shadow: none; margin: 0; padding: 18mm; max-width: none; }
    h2 { page-break-after: avoid; }
    pre, table, .card, .flow, .step, .terminal-output { page-break-inside: avoid; }
    .cover .cow { animation: none; }
  }
</style>
</head>
<body>

<!-- ============== 표지 ============== -->
<div class="cover">
  <div class="cow">🐮</div>
  <h1>오늘 뭐 먹소?</h1>
  <div class="tagline">배달 단골 가족을 위한 영양 밸런스 케어 서비스<br/>
    <span style="font-size:14px;color:#739072;">Premium Wellness Delivery Curator powered by Streamlit</span>
  </div>
  <div class="meta">
    <div><strong>과목</strong> &nbsp; S/W프로그래밍</div>
    <div><strong>과제</strong> &nbsp; 기말고사 구현과제</div>
    <div><strong>제출 형태</strong> &nbsp; <code>delivery_menu_recommender.zip</code> + 본 보고서(PDF)</div>
    <div><strong>제출일</strong> &nbsp; 2026년 6월</div>
  </div>
</div>

<!-- ============== 1. 기획 의도 ============== -->
<h2>1. 무엇을 왜 만들고자 했는가 <span class="small">(기획 의도)</span></h2>

<h3>1.1 출발점이 된 문제</h3>
<p>
저희 집은 평소 집에서 요리를 거의 하지 않아, 사실상 <strong>매일 저녁을 배달 음식으로 해결</strong>합니다.
처음에는 편하다고 느꼈지만, 시간이 지나면서 두 가지 문제가 명확히 드러났습니다.
</p>
<ul>
  <li><strong>문제 ① 결정 피로</strong> — 매일 저녁 가족 단톡방에서 "오늘 뭐 먹지?"로 시작해, 결국 30분 넘게 못 정하고 배만 더 고파지는 일이 반복.</li>
  <li><strong>문제 ② 영양 불균형</strong> — 배달 음식은 자극적·고탄수·고지방 위주가 많아, 한 달, 두 달이 쌓이면 건강이 정말 걱정.</li>
</ul>

<h3>1.2 왜 "코드로" 풀고 싶었는가</h3>
<p>
이번 학기 강의에서 배운 <code>random</code>, <strong>사용자 정의 모듈</strong>, <strong>예외 처리(try-except)</strong>를 보면서
"이거 그대로 우리 집 문제에 쓸 수 있겠는데?"라는 생각이 들었습니다.
</p>
<ul>
  <li>"랜덤"으로 → <strong>결정 피로</strong> 해결</li>
  <li>"카테고리(영양소) 분류"로 → <strong>건강 고려</strong></li>
  <li>"예외 처리"로 → <strong>가족 누구나 부담 없이 쓰는 안정성</strong></li>
</ul>
<p>
거기에 더해, 이왕 만든다면 <strong>가족이 진짜로 매일 쓸 수 있는 도구</strong>를 만들고 싶어
"단순 추천기"에서 멈추지 않고 <strong>칼로리·매크로 영양소 트래킹 + 식단 히스토리 + 통계 대시보드</strong>까지 확장했습니다.
</p>

<!-- ============== 2. 무엇을 만들었는가 ============== -->
<h2>2. 무엇을 만들었는가 <span class="small">(프로그램 정의)</span></h2>

<h3>2.1 한 줄 정의</h3>
<blockquote>
"오늘 뭐 먹소? 🐮" — 사용자가 보충하고 싶은 <strong>영양 카테고리</strong>를 고르면, 해당 카테고리의 건강 메뉴를
<strong>무작위로 추천</strong>하고, <strong>칼로리/탄·단·지 매크로 영양소 진척률</strong>까지 시각화해주는 <strong>프리미엄 웰니스 배달 큐레이션 웹앱</strong>.
</blockquote>

<h3>2.2 핵심 기능 매트릭스</h3>
<table>
  <thead><tr><th>#</th><th>기능</th><th>구현 위치</th><th>활용 강의 개념</th></tr></thead>
  <tbody>
    <tr><td>①</td><td>4개 영양 카테고리 셀렉트박스 입력</td><td><code>app.py</code></td><td>입력 위젯</td></tr>
    <tr><td>②</td><td>카테고리 메뉴 풀에서 랜덤 1개 추첨</td><td><code>recommender.py</code></td><td><strong><code>random.choice()</code></strong></td></tr>
    <tr><td>③</td><td>데이터 / 로직 / UI 3계층 모듈 분리</td><td>3개 .py 파일</td><td><strong>사용자 정의 모듈 <code>import</code></strong></td></tr>
    <tr><td>④</td><td>잘못된 카테고리 입력 시 안전한 Fallback 복구</td><td><code>recommender.py</code></td><td><strong><code>try-except KeyError</code></strong></td></tr>
    <tr><td>⑤</td><td>커스텀 ASCII 말풍선 (한·영 문자 너비 자동 보정)</td><td><code>app.py</code> · <code>make_cow_speech()</code></td><td>문자열 처리, 함수 정의</td></tr>
    <tr><td>⑥</td><td>23종 메뉴별 헬스코치 팁 (캐릭터 어투)</td><td><code>app.py</code> · <code>COW_COACH_TIPS</code></td><td>딕셔너리</td></tr>
    <tr><td>⑦</td><td>일일 목표 칼로리 슬라이더 + 매크로 자동 환산 (5:3:2)</td><td><code>app.py</code> 사이드바</td><td>비례 계산, 위젯</td></tr>
    <tr><td>⑧</td><td>식단 기록 & 누적 히스토리 (session_state)</td><td><code>app.py</code></td><td>리스트/딕셔너리, 상태 관리</td></tr>
    <tr><td>⑨</td><td>일별/주별/월별 칼로리 통계 + 원형 게이지</td><td><code>app.py</code> 히스토리 탭</td><td><code>pandas</code> groupby</td></tr>
    <tr><td>⑩</td><td>백엔드 자동 검증 테스트 스크립트</td><td><code>test_menu.py</code></td><td>함수 검증</td></tr>
  </tbody>
</table>

<h3>2.3 프로젝트 구조 (3계층 아키텍처)</h3>
<pre><code>delivery_menu_recommender/
├── app.py                # 🎨 프레젠테이션 / UI 레이어 (Streamlit + CSS)
├── recommender.py        # 🧠 비즈니스 로직 레이어 (random.choice + try-except)
├── data_manager.py       # 💾 데이터 관리 레이어 (메뉴 DB + 조회 API)
├── test_menu.py          # 🧪 백엔드 자동 검증 스크립트
├── requirements.txt      # 📦 의존성 명세 (streamlit, pandas)
└── README.md             # 📖 사용자 가이드</code></pre>
<p style="color:#555E55; font-size:14px;">
👉 강의에서 배운 "<strong>사용자 정의 모듈을 import해서 쓴다</strong>"는 개념을, 단순한 한 줄 import가 아니라
실무 수준의 <strong>3계층 분리 아키텍처</strong>로 적용했습니다.
</p>

<h3>2.4 메뉴 데이터베이스 (4 카테고리 × 5메뉴 = 총 20종)</h3>

<h4>🍖 단백질</h4>
<div class="menu-grid">
  <div class="menu-item"><span class="name">보쌈 (쌈채소 많이)</span><span class="kcal">620</span></div>
  <div class="menu-item"><span class="name">오븐에 구운 치킨</span><span class="kcal">550</span></div>
  <div class="menu-item"><span class="name">연어회 & 광어회 세트</span><span class="kcal">420</span></div>
  <div class="menu-item"><span class="name">두부 보쌈 정식</span><span class="kcal">520</span></div>
  <div class="menu-item"><span class="name">육회 비빔밥</span><span class="kcal">590</span></div>
</div>

<h4>🥬 식이섬유</h4>
<div class="menu-grid">
  <div class="menu-item"><span class="name">소고기 버섯 샤브샤브</span><span class="kcal">480</span></div>
  <div class="menu-item"><span class="name">포케 샐러드 (현미밥)</span><span class="kcal">450</span></div>
  <div class="menu-item"><span class="name">우렁 쌈밥 도시락</span><span class="kcal">510</span></div>
  <div class="menu-item"><span class="name">월남쌈 (야채 듬뿍)</span><span class="kcal">390</span></div>
  <div class="menu-item"><span class="name">수제 리코타 치즈 샐러드</span><span class="kcal">410</span></div>
</div>

<h4>🍱 균형잡힌식단</h4>
<div class="menu-grid">
  <div class="menu-item"><span class="name">한식 가정식 백반 ⭐</span><span class="kcal">650</span></div>
  <div class="menu-item"><span class="name">일식 회덮밥</span><span class="kcal">560</span></div>
  <div class="menu-item"><span class="name">화덕 생선구이 정식</span><span class="kcal">580</span></div>
  <div class="menu-item"><span class="name">곤드레 밥상 도시락</span><span class="kcal">490</span></div>
  <div class="menu-item"><span class="name">돌솥 비빔밥 (계란)</span><span class="kcal">620</span></div>
</div>
<p style="font-size:13px; color:#739072; margin-top:6px;">⭐ <strong>한식 가정식 백반</strong>은 예외 발생 시 안전한 Fallback 기본 메뉴로 지정되어 있습니다.</p>

<h4>🥗 가벼운식단 (저칼로리)</h4>
<div class="menu-grid">
  <div class="menu-item"><span class="name">닭가슴살 샌드위치</span><span class="kcal">380</span></div>
  <div class="menu-item"><span class="name">곤약 면 메밀소바</span><span class="kcal">210</span></div>
  <div class="menu-item"><span class="name">순두부 샐러드</span><span class="kcal">240</span></div>
  <div class="menu-item"><span class="name">그릭 요거트 & 그래놀라</span><span class="kcal">330</span></div>
  <div class="menu-item"><span class="name">야채 월남쌈 롤</span><span class="kcal">280</span></div>
</div>

<p style="font-size:14px; color:#555E55;">
각 메뉴는 단순 문자열이 아니라 <code>{name, calories, details, macros}</code> 구조의
<strong>풍부한 딕셔너리 객체</strong>로 관리되어, 추천 결과로 곧바로 시각화/통계까지 연결됩니다.
</p>

<!-- ============== 3. 작동 방식 ============== -->
<h2>3. 어떻게 작동하는가 <span class="small">(알고리즘 & 구현 방식)</span></h2>

<h3>3.1 데이터 구조 — <code>data_manager.py</code></h3>
<pre><code>MENU_DATA = {
    "단백질": [
        {
            "name": "보쌈 (쌈채소 많이)",
            "calories": 620,
            "details": "돼지고기를 삶아내어 ...",
            "macros": {"탄수화물": 25, "단백질": 45, "지방": 22}
        },
        ...
    ],
    "식이섬유":     [ ... ],
    "균형잡힌식단": [ ... ],
    "가벼운식단 (저칼로리)": [ ... ],
}

def get_categories() -> list[str]:
    return list(MENU_DATA.keys())

def get_food_items(category: str) -> list[dict]:
    return MENU_DATA[category]   # 잘못된 키 → 자연스럽게 KeyError 발생</code></pre>

<h3>3.2 추천 로직 — <code>recommender.py</code></h3>
<pre><code>import random
import logging
from data_manager import get_food_items

logger = logging.getLogger(__name__)

# Fallback 기본 메뉴 (KeyError 시 안전망)
DEFAULT_MENU = {
    "name": "한식 가정식 백반",
    "calories": 650,
    "details": "정갈한 반찬들과 국, 밥이 어우러진 백반...",
    "macros": {"탄수화물": 85, "단백질": 32, "지방": 15}
}

def recommend_menu(category: str) -> tuple[dict, bool, str | None]:
    try:
        menu_list = get_food_items(category)
        if not menu_list:
            raise ValueError(f"Category '{category}' has no food items.")
        selected_menu = random.choice(menu_list)
        return selected_menu, False, None

    except KeyError:
        logger.warning(f"KeyError: '{category}' is not a valid category.")
        friendly_warning = (
            f"앗! '{category}' 카테고리를 데이터베이스에서 찾지 못했어요. 🔍\n"
            f"대신 매일 먹어도 질리지 않는 영양 가득한 기본 식단으로 건강 코칭해 드릴게요!"
        )
        return DEFAULT_MENU, True, friendly_warning

    except (ValueError, IndexError) as e:
        logger.error(f"Error selecting food item: {e}")
        friendly_warning = (
            f"선택하신 '{category}' 카테고리에 준비된 메뉴가 없네요! 😮\n"
            f"기본 건강 식단으로 안전하게 선택해 드릴게요."
        )
        return DEFAULT_MENU, True, friendly_warning</code></pre>

<div class="callout sage">
  <div class="callout-title">📌 예외 처리 설계 포인트</div>
  <ul style="margin:6px 0 0;">
    <li><strong>3중 안전망</strong>: <code>KeyError</code>(잘못된 카테고리) / <code>ValueError</code>(빈 리스트) / <code>IndexError</code>(상정 외 상황)</li>
    <li><strong>Fallback 정책</strong>: 어떤 예외가 나도 항상 "한식 가정식 백반"으로 대체해 프로그램이 절대 멈추지 않음</li>
    <li><strong>친절한 한글 안내</strong>: 단순 에러 메시지가 아닌, 사용자에게 위로가 되는 톤의 메시지</li>
    <li><strong><code>logging</code> 모듈 병행</strong>: 사용자에게는 친절한 메시지, 개발자에게는 정확한 로그</li>
    <li><strong>튜플 반환 <code>(menu, is_fallback, warning)</code></strong>: UI 레이어가 fallback 여부를 구분해 다르게 표시</li>
  </ul>
</div>

<h3>3.3 알고리즘 흐름도</h3>
<div class="flow">┌─────────────────────────────────┐
│ 사용자: 카테고리 선택 (셀렉트박스)│
└────────────┬────────────────────┘
             ▼
┌─────────────────────────────────┐
│ recommender.recommend_menu()    │
│ try:                            │
│   menu_list = get_food_items()  │
│   selected = random.choice(...) │
└────────────┬────────────────────┘
             │
       ┌─────┴─────┐
      성공         예외 (KeyError / ValueError / IndexError)
       │           │
       ▼           ▼
  (menu, False, None)   (DEFAULT_MENU, True, 안내문)
       │           │
       └─────┬─────┘
             ▼
┌─────────────────────────────────┐
│ app.py UI 렌더링                │
│ - CSS 그라데이션 말풍선          │
│ - 칼로리 배지                   │
│ - 매크로 진척률 바 (탄/단/지)    │
│ - ASCII Cowsay (Expander)       │
│ - "식사 기록하기" 버튼           │
└────────────┬────────────────────┘
             ▼
┌─────────────────────────────────┐
│ session_state.history에 누적     │
│ → 히스토리 탭에서 통계 자동 갱신 │
└─────────────────────────────────┘</div>

<h3>3.4 매크로 영양소 자동 환산 (5:3:2 칼로리 분배)</h3>
<p>사이드바의 일일 목표 칼로리(1200~3200 kcal)를 기반으로 권장 매크로 g수를 자동 계산합니다.</p>
<pre><code># 5:3:2 비율 (탄:단:지) — 칼로리 → g 환산
carb_target = round((target_calories * 0.50) / 4)   # 탄수화물: 1g = 4 kcal
prot_target = round((target_calories * 0.30) / 4)   # 단백질  : 1g = 4 kcal
fat_target  = round((target_calories * 0.20) / 9)   # 지방    : 1g = 9 kcal</code></pre>
<p>예) 목표 2000 kcal → 탄 250g / 단 150g / 지 44g</p>

<div class="card">
  <div class="card-title">📊 매크로 진척률 바 미리보기 (목표 2000 kcal · 보쌈 사례)</div>
  <div class="macro-tracker">
    <div class="macro-label-group"><span>탄수화물</span><span>25g / 250g (10%)</span></div>
    <div class="macro-bar-bg"><div class="macro-bar-fill carb-fill" style="width:10%"></div></div>
  </div>
  <div class="macro-tracker">
    <div class="macro-label-group"><span>단백질</span><span>45g / 150g (30%)</span></div>
    <div class="macro-bar-bg"><div class="macro-bar-fill prot-fill" style="width:30%"></div></div>
  </div>
  <div class="macro-tracker">
    <div class="macro-label-group"><span>지방</span><span>22g / 44g (50%)</span></div>
    <div class="macro-bar-bg"><div class="macro-bar-fill fat-fill" style="width:50%"></div></div>
  </div>
</div>

<!-- ============== 4. 개발 과정 ============== -->
<h2>4. 만든 과정은 어떠했는가 <span class="small">(개발 과정 회고)</span></h2>

<h3>4.1 단계별 진행</h3>

<h4>[1단계] 데이터 구조 설계 — "단순 리스트로 끝낼 수 있을까?"</h4>
<ul>
  <li>처음에는 <code>{"단백질": ["보쌈", "치킨", ...]}</code>처럼 카테고리별 문자열 리스트만 두려고 했음.</li>
  <li>그런데 칼로리/영양 정보까지 보여주려면 <strong>각 메뉴가 풍부한 딕셔너리</strong>여야 한다는 것을 깨달음.</li>
  <li>최종적으로 <code>{name, calories, details, macros}</code> 4-필드 구조로 설계 → 이후 모든 시각화의 기반이 됨.</li>
</ul>

<h4>[2단계] 추천 로직 — "한 줄짜리 함수가 끝이 아니다"</h4>
<ul>
  <li><code>random.choice(MENU_DB[category])</code> 한 줄이면 끝나는 줄 알았는데, "<strong>예외가 나도 사용자가 멈추지 않게 하려면?</strong>"이 진짜 어려움.</li>
  <li>3중 예외 처리 + Fallback 메뉴 + 친절한 한글 안내 + <code>logging</code> 병행 구조로 진화.</li>
  <li>리턴 값을 단일 dict가 아니라 <code>(menu, is_fallback, warning)</code> 튜플로 두니, UI에서 fallback 여부를 표시하기가 자연스러워짐.</li>
</ul>

<h4>[3단계] UI/UX — "기왕이면 가족이 진짜로 쓸 만하게"</h4>
<ul>
  <li>처음엔 Streamlit 기본 위젯만 썼는데, 너무 사무적이라 가족이 안 쓸 것 같았음.</li>
  <li>전문 디자이너처럼 <strong>Sage Green & Cream 디자인 시스템</strong>을 정의하고, <strong>Pretendard 폰트</strong> + <strong>iOS 스타일 탭</strong> + <strong>그라데이션 말풍선</strong>을 적용.</li>
  <li>CSS 변수로 컬러 팔레트를 통일해, 컴포넌트가 늘어도 톤이 흔들리지 않도록 함.</li>
</ul>

<h4>[4단계] 기능 확장 — "기록되지 않으면 의미 없다"</h4>
<ul>
  <li>"오늘 추천만 받고 끝나면 가족 건강을 못 챙긴다" → <strong>식단 히스토리 + 일/주/월 통계</strong> 추가.</li>
  <li>Streamlit <code>session_state</code>로 메모리 내 누적 관리.</li>
  <li><code>pandas</code>로 groupby 집계, <code>conic-gradient</code> CSS로 원형 게이지 시각화.</li>
</ul>

<h4>[5단계] cowsay 자체 구현 — "외부 패키지 줄이기"</h4>
<ul>
  <li>처음엔 <code>cowsay</code> 패키지를 쓰려 했지만, <strong>한글이 모노스페이스 폰트에서 2칸을 차지</strong>하는 문제로 박스가 깨짐.</li>
  <li>직접 <code>get_display_width()</code> 함수로 동아시아 문자 너비를 계산해 박스를 정확히 맞추는 <code>make_cow_speech()</code> 함수를 구현.</li>
  <li>덕분에 <code>requirements.txt</code>가 <strong>streamlit + pandas</strong> 두 개로 깔끔해짐.</li>
</ul>

<h3>4.2 막혔던 지점과 해결</h3>
<table>
  <thead><tr><th>막혔던 점</th><th>해결</th></tr></thead>
  <tbody>
    <tr><td>한글이 cowsay 박스에서 1칸으로 계산되어 정렬이 깨짐</td><td><code>ord(char) > 127</code>로 동아시아 문자 너비 2 처리</td></tr>
    <tr><td>session_state에 옛날 형태 데이터가 남아 앱이 충돌</td><td>"<strong>방어적 정리</strong>" 코드로 시작 시 자동 마이그레이션</td></tr>
    <tr><td>Streamlit 기본 디자인이 너무 평범</td><td>Sage Green 컬러 팔레트 + CSS 변수 + 반복 컴포넌트화</td></tr>
    <tr><td>예외가 한 종류만 있는 게 아님 (빈 리스트도 가능)</td><td><code>KeyError</code> + <code>ValueError</code> + <code>IndexError</code> 3중망 구성</td></tr>
    <tr><td>Windows에서 한글 출력 깨짐</td><td><code>python -X utf8</code> 플래그로 UTF-8 강제 적용</td></tr>
  </tbody>
</table>

<h3>4.3 깨달은 점</h3>
<div class="callout green">
  <ul style="margin:0;">
    <li><strong>"짧은 코드 ≠ 쉬운 코드"</strong> — 핵심은 <code>random.choice()</code> 한 줄이지만, 그것을 "쓸 만한 서비스"로 만드는 건 데이터 구조, 모듈 분리, 예외 처리, UI/UX, 패키징 같은 주변 작업이라는 걸 체감.</li>
    <li><strong>"vibe coding"의 진짜 의미</strong> — AI에 무작정 시키는 게 아니라, "<strong>내가 무엇을 왜 만들고 싶은지를 명확히 말로 표현</strong>"할수록 결과물이 좋아진다는 걸 직접 경험.</li>
    <li><strong>"문제 → 코드"의 거리는 의외로 짧다</strong> — 우리 집의 진짜 문제(매일의 메뉴 고민)를 코드로 옮기는 데 한 학기 분량의 개념이면 충분했다.</li>
  </ul>
</div>

<!-- ============== 5. 실행 방법 (대폭 강화) ============== -->
<h2>5. 실행 방법 <span class="small">— 처음 보시는 분도 따라하면 무조건 됩니다</span></h2>

<div class="callout">
  <div class="callout-title">⏱️ 예상 소요 시간</div>
  Python이 이미 설치된 PC: <strong>약 3~5분</strong> &nbsp;|&nbsp; 처음 설치하는 PC: <strong>약 10~15분</strong>
</div>

<h3>📋 5.0 사전 준비물 체크리스트</h3>
<ul>
  <li>✅ <strong>Python 3.9 이상</strong> 설치 (없다면 [STEP 1]에서 설치)</li>
  <li>✅ <strong>인터넷 연결</strong> (패키지 다운로드용)</li>
  <li>✅ <strong>웹 브라우저</strong> (Chrome 또는 Edge 권장)</li>
  <li>✅ <strong>제출된 ZIP 파일</strong> (<code>delivery_menu_recommender.zip</code>)</li>
</ul>

<!-- STEP 1 -->
<div class="step" data-step="1">
  <div class="step-title">🐍 Python 설치 확인 (이미 설치되어 있다면 건너뛰기)</div>

  <p>먼저 Python이 이미 PC에 설치되어 있는지 확인합니다. 터미널을 열고 아래 명령어를 입력하세요.</p>

  <div class="os-block">
    <span class="os-label">Windows</span>
    <p style="margin:4px 0 6px; font-size:13.5px;">시작 메뉴 → "PowerShell" 검색 → 클릭 → 아래 입력</p>
    <pre><code>python --version</code></pre>
  </div>

  <div class="os-block">
    <span class="os-label mac">macOS</span>
    <p style="margin:4px 0 6px; font-size:13.5px;"><code>Cmd + Space</code> → "터미널" 검색 → 엔터 → 아래 입력</p>
    <pre><code>python3 --version</code></pre>
  </div>

  <div class="substep">
    <strong>✔️ 정상 출력 예시:</strong>
    <div class="terminal-output"><span class="ok">Python 3.11.5</span></div>
    <p style="font-size:13.5px;">→ 버전이 <strong>3.9 이상</strong>이면 OK. <strong>STEP 2로 이동</strong>하세요.</p>
  </div>

  <div class="substep">
    <strong>❌ 만약 "command not found" 또는 "python을(를) 찾을 수 없습니다" 가 나오면</strong>:
    <ol style="font-size:13.5px;">
      <li><a href="https://www.python.org/downloads/" target="_blank">https://www.python.org/downloads/</a> 접속</li>
      <li>최신 버전 다운로드 → 설치 시작</li>
      <li>Windows의 경우 <strong>반드시 "Add Python to PATH" 체크박스 체크</strong> 후 설치 진행</li>
      <li>설치 후 터미널을 <strong>새로 열고</strong> 다시 <code>python --version</code> 확인</li>
    </ol>
  </div>
</div>

<!-- STEP 2 -->
<div class="step" data-step="2">
  <div class="step-title">📂 ZIP 압축 해제 및 폴더로 이동</div>

  <div class="substep">
    <strong>① 압축 해제</strong>
    <ul style="font-size:13.5px;">
      <li>다운받은 <code>delivery_menu_recommender.zip</code> 파일을 마우스 우클릭</li>
      <li>"<strong>압축 풀기</strong>" 또는 "<strong>여기에 압축 풀기</strong>" 선택</li>
      <li>Mac: 더블클릭만 해도 자동 해제됨</li>
      <li>예시 결과 폴더: <code>C:\Users\사용자\Downloads\delivery_menu_recommender</code></li>
    </ul>
  </div>

  <div class="substep">
    <strong>② 폴더에서 터미널 열기 (꿀팁)</strong>
    <div class="os-block">
      <span class="os-label">Windows (가장 빠른 방법)</span>
      <p style="font-size:13.5px; margin:4px 0;">압축 해제된 폴더를 열기 → <strong>주소창 클릭 → <code>cmd</code> 입력 → Enter</strong> →
      현재 폴더에서 명령 프롬프트가 바로 열림! ✨</p>
    </div>

    <div class="os-block">
      <span class="os-label mac">macOS</span>
      <p style="font-size:13.5px; margin:4px 0;">Finder에서 폴더 우클릭 → "<strong>폴더에서 새로운 터미널 열기</strong>"
      <br/>(메뉴가 안 보이면 시스템 환경설정 → 키보드 → 단축키 → 서비스에서 활성화)</p>
    </div>

    <p style="font-size:13.5px; margin-top:8px;">
      또는 터미널을 열고 직접 이동:
    </p>
    <pre><code>cd Downloads/delivery_menu_recommender</code></pre>
  </div>

  <div class="substep">
    <strong>③ 현재 위치 확인 (선택)</strong>
    <p style="font-size:13.5px; margin:4px 0;">폴더 안의 파일들이 보이는지 확인합니다.</p>
    <pre><code>dir            # Windows
ls             # macOS / Linux</code></pre>
    <strong>✔️ 정상 출력 예시:</strong>
    <div class="terminal-output">app.py
data_manager.py
recommender.py
test_menu.py
requirements.txt
README.md</div>
  </div>
</div>

<!-- STEP 3 -->
<div class="step" data-step="3">
  <div class="step-title">🔒 가상환경 생성 (권장 — 깨끗한 환경에서 실행)</div>

  <p style="font-size:14px;">가상환경을 사용하면 PC에 이미 설치된 다른 Python 패키지들과 충돌하지 않고, 본 앱 전용으로 깔끔하게 실행할 수 있습니다.
  <em>건너뛰셔도 동작은 하지만 적극 권장드립니다.</em></p>

  <div class="os-block">
    <span class="os-label">Windows</span>
    <pre><code># (1) 가상환경 생성 (현재 폴더에 venv 폴더가 만들어집니다)
python -m venv venv

# (2) 활성화
.\venv\Scripts\activate</code></pre>
  </div>

  <div class="os-block">
    <span class="os-label mac">macOS / Linux</span>
    <pre><code># (1) 가상환경 생성
python3 -m venv venv

# (2) 활성화
source venv/bin/activate</code></pre>
  </div>

  <div class="substep">
    <strong>✔️ 활성화 성공 시</strong>: 터미널 프롬프트 맨 앞에 <code>(venv)</code>가 표시됩니다.
    <div class="terminal-output"><span class="info">(venv)</span> C:\Users\사용자\Downloads\delivery_menu_recommender&gt; _</div>
  </div>

  <div class="callout red" style="margin-top:8px;">
    <div class="callout-title">⚠️ Windows에서 활성화 실패 시</div>
    <p style="margin:0; font-size:13.5px;">"이 시스템에서 스크립트를 실행할 수 없으므로..." 같은 보안 오류가 나면 PowerShell을 <strong>관리자 권한</strong>으로 다시 열고 아래를 한 번 실행하세요.</p>
    <pre><code>Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned</code></pre>
  </div>
</div>

<!-- STEP 4 -->
<div class="step" data-step="4">
  <div class="step-title">📦 필수 패키지 설치</div>

  <p style="font-size:14px;"><code>requirements.txt</code>에 명시된 패키지(<code>streamlit</code>, <code>pandas</code>)를 한 번에 설치합니다.</p>

  <pre><code>pip install -r requirements.txt</code></pre>

  <div class="substep">
    <strong>✔️ 정상 진행 화면 예시</strong>:
    <div class="terminal-output"><span class="info">Collecting streamlit&gt;=1.30.0</span>
  Downloading streamlit-1.32.0-py2.py3-none-any.whl (8.5 MB)
<span class="info">Collecting pandas&gt;=2.0.0</span>
  Downloading pandas-2.2.0-cp311-cp311-win_amd64.whl (11.6 MB)
... (의존성 패키지 자동 설치) ...
<span class="ok">Successfully installed streamlit-1.32.0 pandas-2.2.0 ...</span></div>
    <p style="font-size:13.5px;">PC 상태에 따라 <strong>30초 ~ 2분</strong> 정도 걸립니다. 다운로드 진행 막대가 보이면 정상입니다.</p>
  </div>

  <div class="callout">
    <div class="callout-title">💡 인터넷이 느리거나 회사 네트워크라 설치가 막힌다면</div>
    <p style="font-size:13.5px; margin:0;">아래처럼 국내 미러를 지정하면 훨씬 빠릅니다.</p>
    <pre><code>pip install -r requirements.txt -i https://pypi.python.org/simple/</code></pre>
  </div>
</div>

<!-- STEP 5 -->
<div class="step" data-step="5">
  <div class="step-title">🧪 (선택) 백엔드 자동 검증 — 핵심 로직이 잘 동작하는지 확인</div>

  <p style="font-size:14px;">웹앱을 켜기 전에, 추천 로직과 예외 처리가 정확히 동작하는지 빠르게 확인하는 단계입니다.</p>

  <pre><code>python -X utf8 test_menu.py</code></pre>

  <p style="font-size:13.5px; color:#555E55; margin-top:6px;">
    <code>-X utf8</code> 옵션은 Windows에서 한글이 <code>?</code>나 깨진 글자로 나오지 않게 해줍니다.
    macOS/Linux에서는 굳이 안 붙여도 되지만, 붙여도 무방합니다.
  </p>

  <div class="substep">
    <strong>✔️ 정상 출력 예시</strong>:
    <div class="terminal-output"><span class="info">--- Menu Recommender Backend Test ---</span>

[1] Available categories:
    ['단백질', '식이섬유', '균형잡힌식단', '가벼운식단 (저칼로리)']

[2] Normal Category Recommendation:
    카테고리: 단백질
    추천 메뉴: 오븐에 구운 치킨 (550 kcal)
    is_fallback: <span class="ok">False</span>

[3] KeyError / Fallback Recommendation:
    카테고리: 존재하지않는카테고리
    추천 메뉴: 한식 가정식 백반 (650 kcal)
    is_fallback: <span class="warn">True</span>
    warning: 앗! '존재하지않는카테고리' 카테고리를 ...

<span class="ok">--- All tests passed ✅ ---</span></div>
  </div>
</div>

<!-- STEP 6 -->
<div class="step" data-step="6">
  <div class="step-title">🚀 웹 서비스 실행</div>

  <p style="font-size:14px;">드디어 본 앱을 실행합니다!</p>

  <pre><code>streamlit run app.py</code></pre>

  <div class="callout">
    <div class="callout-title">💡 만약 <code>streamlit: command not found</code> 가 나온다면</div>
    <pre><code>python -m streamlit run app.py</code></pre>
    <p style="font-size:13.5px; margin:4px 0 0;">로 대신 실행해 주세요. (가상환경을 활성화하지 않았을 때 종종 발생)</p>
  </div>

  <div class="substep">
    <strong>✔️ 정상 실행 화면</strong>:
    <div class="terminal-output">
  <span class="ok">You can now view your Streamlit app in your browser.</span>

  Local URL: <span class="info">http://localhost:8501</span>
  Network URL: http://192.168.0.10:8501</div>
    <p style="font-size:13.5px;">대부분의 경우 <strong>브라우저가 자동으로 열립니다</strong>. 안 열린다면 위 <code>http://localhost:8501</code> 을 직접 클릭하거나 브라우저 주소창에 복사해 주세요.</p>
  </div>

  <div class="substep" style="margin-top:14px;">
    <strong>✋ 앱을 종료하려면</strong>: 터미널 창을 활성화한 뒤 <code>Ctrl + C</code> (Windows/Linux) 또는 <code>Control + C</code> (Mac).
  </div>
</div>

<!-- STEP 7 -->
<div class="step" data-step="7">
  <div class="step-title">🐮 앱 사용 시나리오 (브라우저에서)</div>

  <ol style="margin:0;">
    <li>브라우저에 앱이 열리면 상단에 <strong>"오늘 뭐 먹소? 🐮"</strong> 타이틀 확인</li>
    <li><strong>왼쪽 사이드바</strong>(접혀있다면 좌상단 화살표 ❯ 클릭)에서 <strong>일일 목표 칼로리</strong> 슬라이더 조정 (예: 2000 kcal)</li>
    <li>메인 영역의 <strong>"🐮 배달 메뉴 추천기"</strong> 탭에서 영양 카테고리 선택 (예: <strong>단백질</strong>)</li>
    <li><strong>[메뉴 추천받기 🐮]</strong> 버튼 클릭 → 풍선 효과와 함께 추천 결과 등장 🎉</li>
    <li>아래쪽에서 <strong>매크로 진척률 바</strong>(탄/단/지) 확인</li>
    <li>마음에 들면 <strong>[이 식단 선택 완료]</strong> 클릭 → 히스토리에 기록</li>
    <li>상단 두 번째 탭 <strong>"📊 나의 식단 히스토리 & 통계"</strong>로 이동 → 누적 분석 확인
      <ul>
        <li>오늘의 칼로리 원형 게이지</li>
        <li>일별 칼로리 막대 그래프</li>
        <li>주간/월간 요약 테이블</li>
      </ul>
    </li>
    <li>(선택) <strong>"💾 오리지널 Cowsay ASCII 아트 보기"</strong> 펼치기 → 클래식한 ASCII 말하는 소 🐄 출력 확인</li>
  </ol>
</div>

<!-- 트러블슈팅 -->
<h3>🛟 자주 만나는 문제와 해결 방법</h3>

<table>
  <thead><tr><th>증상</th><th>원인 / 해결 방법</th></tr></thead>
  <tbody>
    <tr>
      <td><code>'python'은(는) 내부 또는 외부 명령으로 인식되지 않습니다.</code></td>
      <td>Python이 PATH에 등록되지 않음. <strong>STEP 1 마지막 단계</strong>처럼 "Add Python to PATH"를 체크하고 재설치하거나, 터미널을 새로 열고 시도.</td>
    </tr>
    <tr>
      <td><code>ModuleNotFoundError: No module named 'streamlit'</code></td>
      <td>가상환경이 활성화되지 않았거나 패키지 설치를 건너뜀. 터미널 앞에 <code>(venv)</code>가 보이는지 확인 후 <code>pip install -r requirements.txt</code> 다시 실행.</td>
    </tr>
    <tr>
      <td>브라우저가 자동으로 안 열림</td>
      <td>터미널에 표시된 <code>http://localhost:8501</code>을 직접 클릭하거나 주소창에 복사해서 접속.</td>
    </tr>
    <tr>
      <td>한글이 깨져서 나옴 (터미널)</td>
      <td>Windows에서 <code>python -X utf8 test_menu.py</code>처럼 <code>-X utf8</code> 옵션을 추가. 웹앱 자체는 영향 없음.</td>
    </tr>
    <tr>
      <td>포트 8501이 이미 사용 중</td>
      <td><code>streamlit run app.py --server.port 8502</code>처럼 다른 포트 지정 후 <code>http://localhost:8502</code> 접속.</td>
    </tr>
    <tr>
      <td>앱은 켜졌는데 화면이 흰색이거나 깨짐</td>
      <td>브라우저 새로고침(F5). 그래도 안 되면 시크릿 모드로 접속하거나 캐시 삭제 후 재시도.</td>
    </tr>
    <tr>
      <td>두 번째 실행부터 "이미 실행 중" 메시지</td>
      <td>이전 터미널의 streamlit 프로세스가 살아있음. 해당 터미널에서 <code>Ctrl + C</code>로 종료 후 다시 실행.</td>
    </tr>
  </tbody>
</table>

<!-- 한 번에 명령어 모음 -->
<h3>📝 한눈에 보는 전체 명령어 (요약)</h3>

<div class="os-block">
  <span class="os-label">Windows</span>
<pre><code>cd 압축해제경로\delivery_menu_recommender
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python -X utf8 test_menu.py
streamlit run app.py</code></pre>
</div>

<div class="os-block">
  <span class="os-label mac">macOS / Linux</span>
<pre><code>cd 압축해제경로/delivery_menu_recommender
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 test_menu.py
streamlit run app.py</code></pre>
</div>

<!-- ============== 6. 소감 & 향후 ============== -->
<h2>6. S/W프로그래밍 강의에 대한 소감 &amp; 향후 해보고 싶은 것</h2>

<h3>6.1 강의에 대한 솔직한 소감</h3>
<p>
처음에는 "프로그래밍은 컴공과 사람들이나 하는 것"이라는 막연한 거리감이 있었습니다.
그런데 한 학기 동안 변수, 조건문, 반복문, 자료구조, 모듈, 예외 처리까지 차근차근 쌓다 보니,
<strong>어느 순간 "내 일상의 문제를 코드로 옮기는 게 가능해진" 순간</strong>이 왔습니다.
이번 구현과제가 바로 그 순간을 확인하는 시험대였다고 생각합니다.
</p>
<p>
특히 인상 깊었던 것은 <strong>"vibe coding"</strong> 개념이었습니다.
작년까지만 해도 AI가 코드를 잘 못 짰다는 말씀이 인상적이었는데, 올해 실제로 AI와 함께 코드를 만들어보니
<strong>"내가 무엇을 만들고 싶은지를 명확히 말로 표현할 수 있다면, 구현은 따라온다"</strong>는 새로운 패러다임을 체감했습니다.
실제로 이번 과제도 "단순 추천기"에서 "Sage Green 디자인 시스템을 가진 웰니스 매니저"로 진화하는 과정에서
<strong>매번 더 구체적이고 더 야심찬 말로 표현</strong>할수록 결과물도 같이 진화했습니다.
</p>
<p>
즉, 이번 강의가 가르쳐 준 건 단순한 문법이 아니라
<strong>"문제를 코드의 언어로 정의하는 능력"</strong>이라고 느꼈습니다.
</p>

<h3>6.2 아쉬웠던 점 / 더 다뤘으면 했던 점</h3>
<ul>
  <li>자료구조 부분에서 <strong>클래스(객체지향)</strong>까지 살짝만 더 다뤘다면, 메뉴 객체를 dict가 아닌 dataclass로 깔끔하게 정의할 수 있었을 것입니다.</li>
  <li>실제 <strong>웹 API 호출</strong>이나 <strong>JSON 파일 입출력</strong> 미니 실습이 한 번쯤 있었다면, 메뉴 데이터를 외부 파일에서 불러오는 형태로 더 발전시킬 수 있었을 것 같습니다.</li>
  <li><strong>버전 관리(Git)</strong>도 한두 차시 다뤘다면, 이번 과제처럼 점차 기능을 확장할 때 훨씬 안전하게 작업할 수 있었을 것입니다.</li>
</ul>

<h3>6.3 "나라면 이런 걸 해보고 싶다"</h3>
<p>이번 "오늘 뭐 먹소? 🐮"를 만들면서 떠오른 후속 아이디어들입니다.</p>
<ol>
  <li>🌐 <strong>Streamlit Community Cloud 배포</strong> — 누구나 접속 가능한 URL로 만들어 가족·친구가 바로 쓸 수 있게.</li>
  <li>👨‍👩‍👧 <strong>가족 프로필 기능</strong> — 구성원별 알레르기/비선호 음식·기초대사량을 등록해 자동 필터링.</li>
  <li>📅 <strong>일주일 식단 자동 생성기</strong> — 한 주 단위로 영양 균형이 맞는 식단을 자동 큐레이션.</li>
  <li>🔗 <strong>배달앱 연동</strong> — 추천 메뉴의 실제 주문 링크를 한 번에 제공.</li>
  <li>🤖 <strong>LLM 결합</strong> — "냉장고에 ○○○ 있는데 뭐 시켜 먹지?"처럼 자연어 입력 지원.</li>
  <li>📱 <strong>모바일 PWA화</strong> — 핸드폰 홈 화면에 "🐮 아이콘"으로 설치되는 진짜 앱 경험.</li>
  <li>🍳 <strong>AI 영양사 모드</strong> — 누적 히스토리를 분석해 "지난 주에 단백질이 부족했어요"처럼 코칭.</li>
</ol>
<p>
장기적으로는 "오늘 뭐 먹소?"를 <strong>"우리 가족 전용 식단 비서"</strong>로 키워보고 싶습니다.
이번 학기에서 시작점을 확실히 잡았다는 것에 큰 의미를 두고 있습니다.
</p>

<!-- ============== 마무리 ============== -->
<div class="signoff">
  <p>한 학기 동안 좋은 강의 정말 감사드립니다.<br/>
  <em>"프로그래밍은 짧은 시간에 해내는 실전"</em>이라는 말씀처럼,<br/>
  이번 과제는 <strong>"내가 진짜 쓸 도구를, 내 손으로, 짧은 시간에"</strong> 만들어보는 값진 경험이었습니다.</p>
  <p style="margin-top:18px; font-size:18px;">🐮 — 끝 — 🐮</p>
</div>

</body>
</html>

# buysell0322

## 🎉 배포 완료

### 📍 접속 URL
- **메인 도메인**: https://huan.my
- **서브 도메인**: https://www.huan.my  
- **Cloudflare Pages**: https://buysell0322.pages.dev
- **최근 배포**: https://5e1f7ca7.buysell0322.pages.dev

### 📦 프로젝트 개요
AI 기반 글로벌 이커머스 자동화 플랫폼

**주요 기능:**
- 📊 실시간 통계 대시보드 (매출, 주문, 상품, 자동화율)
- 📈 트렌드 분석 (키워드 성장률, 수요, 점수)
- 🤖 AI 비즈니스 엔진
  - 브랜딩 자동 생성
  - 리뷰 감성 분석
  - 수익 시뮬레이션
  - 비디오 콘텐츠 생성 (TikTok/Reels)
- 🌐 자동 번역 (Gemini AI)
- 💬 AI 챗봇 (실시간 WebSocket)
- 🔄 자동화 워크플로우 (상품 소싱, 리스팅, 캠페인 최적화)

### 🛠 기술 스택
- **Frontend**: React 19, TailwindCSS, Motion
- **Backend**: Express.js, WebSocket
- **AI**: Google Gemini 3 Flash
- **Database**: Firebase Firestore
- **Charts**: Recharts
- **Routing**: React Router v7
- **Build**: Vite 6
- **Deployment**: Cloudflare Pages

### 📊 현재 데이터 구조
```javascript
// 통계 데이터
{
  revenue: 12340,
  orders: 320,
  products: 1200,
  automation_rate: 92
}

// 트렌드 데이터
[
  { keyword: "Wireless Earbuds", growth: 85, demand: 12000, score: 78 },
  { keyword: "Smart Watch", growth: 45, demand: 8500, score: 62 },
  { keyword: "Yoga Mat", growth: 120, demand: 5000, score: 88 },
  { keyword: "Portable Blender", growth: 95, demand: 7200, score: 82 }
]
```

### 🌐 API 엔드포인트
- `GET /api/health` - 헬스 체크
- `POST /api/translate` - 텍스트 번역
- `GET /api/stats` - 통계 데이터
- `GET /api/trends` - 트렌드 분석
- `POST /api/automation/run` - 자동화 실행
- `POST /api/ai/branding` - AI 브랜딩 생성
- `POST /api/ai/analyze-reviews` - 리뷰 분석
- `POST /api/ai/simulate` - 수익 시뮬레이션
- `POST /api/ai/generate-video` - 비디오 생성

### ⚠️ 현재 제한사항
**Cloudflare Pages 환경에서는 다음 기능이 제한됩니다:**
- ❌ WebSocket 서버 (실시간 챗봇)
- ❌ Express.js 백엔드 서버
- ❌ 장기 실행 프로세스

**해결 방안:**
1. **정적 SPA로 배포 완료** ✅ (현재 상태)
2. **향후 개선사항:**
   - Hono 프레임워크로 API 마이그레이션
   - Cloudflare Workers로 서버리스 API 구현
   - Cloudflare Durable Objects로 WebSocket 대체
   - Firebase Realtime Database로 실시간 채팅 구현

### 🚀 로컬 개발
```bash
# 의존성 설치
npm install

# 환경 변수 설정 (.env.local)
GEMINI_API_KEY=your_gemini_api_key

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 미리보기
npm run preview
```

### 📝 배포 히스토리
- **2026-03-22**: Cloudflare Pages 배포 완료
  - 메인 도메인: huan.my
  - 서브 도메인: www.huan.my
  - Pages 도메인: buysell0322.pages.dev

### 🔗 관련 링크
- **GitHub**: https://github.com/langsb16-collab/buysell0322
- **AI Studio**: https://ai.studio/apps/84cf133c-6c8a-4cac-9e5e-1e5d87772558
- **Cloudflare Dashboard**: https://dash.cloudflare.com/

### 📋 다음 단계 (권장)
1. ✅ 정적 SPA 배포 완료
2. ⏳ Hono API 서버 구현 (Cloudflare Workers)
3. ⏳ Firebase Firestore 통합
4. ⏳ 실시간 기능 구현 (Cloudflare Durable Objects or Firebase)
5. ⏳ API 키 보안 (Cloudflare Secrets)
6. ⏳ D1 Database 또는 KV Storage 추가
7. ⏳ CI/CD 파이프라인 설정 (GitHub Actions)

---

**Last Updated**: 2026-03-22  
**Status**: ✅ Deployed  
**Platform**: Cloudflare Pages

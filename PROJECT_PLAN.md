# Indonesian Issue Tracker - Project Plan & Roadmap

## 🎯 **MVP (Minimum Viable Product)**
**Target**: 2-3 minggu
**Goal**: Produk yang bisa digunakan untuk tracking issue dasar

### 1. Infrastructure & Setup
- Setup PostgreSQL + Redis dengan Docker
- Inisialisasi NestJS backend dengan TypeScript
- Inisialisasi Next.js frontend dengan Tailwind CSS
- Database schema dasar (Issues, Categories, Events)
- Authentication sederhana (JWT)

### 2. News Scraping (Python)
- Scraper untuk 2-3 sumber utama (Kompas.com, Detik.com)
- Ekstraksi: judul, konten, tanggal, URL
- Simpan ke database
- Scheduling scraping setiap 6 jam

### 3. Issue Management (Backend)
- CRUD API untuk issues
- Kategorisasi manual (user bisa pilih kategori)
- Basic search (by title, category, date)
- REST API endpoints

### 4. Web Interface (Frontend)
- Dashboard sederhana: list issues terbaru
- Filter by kategori, tanggal
- Detail page untuk setiap issue
- Basic responsive design

### 5. Version Control Dasar
- Setiap perubahan issue dicatat sebagai event
- Bisa lihat history perubahan issue
- Timestamp setiap perubahan

**Deliverable MVP**: User bisa lihat issues terbaru dari berita Indonesia, search, filter, dan lihat history perubahan.

---

## 🚀 **KILLER FEATURES**
**Target**: 1-2 bulan
**Goal**: Fitur yang bikin project ini unik dan valuable

### 1. **AI Conversational Bot** ⭐ (MOST IMPORTANT)
- Integrasi LangChain + OpenAI/Claude
- Chat interface di web
- User bisa tanya:
  - "Apa isu terbesar minggu ini?"
  - "Ceritakan tentang kasus korupsi di Jakarta"
  - "Bandingkan isu lingkungan tahun ini vs tahun lalu"
- Bot kasih jawaban dengan data dari database
- Context-aware (ingat percakapan sebelumnya)
- Bilingual: Bahasa Indonesia & English

### 2. **RAG (Retrieval-Augmented Generation)**
- Vector embeddings untuk semua issues
- Semantic search (cari berdasarkan makna, bukan keyword)
- Bot bisa temukan issue relevan walaupun kata-katanya beda
- PostgreSQL pgvector untuk vector storage

### 3. **Auto-Categorization dengan ML**
- Model ML (IndoBERT) untuk auto-kategorisasi issue
- Auto-tagging
- Sentiment analysis
- Severity scoring otomatis

### 4. **Smart Duplicate Detection**
- Deteksi otomatis kalau ada issue yang sama dari berbeda sumber
- Auto-merge duplicate issues
- Notifikasi kalau ada update dari issue yang sudah ada

**Deliverable Killer Features**: User bisa ngobrol sama bot untuk explore data, bot bisa kasih insights yang meaningful, auto-categorization makes data lebih terstruktur.

---

## 💡 **NICE TO HAVE**
**Target**: 2-3 bulan
**Goal**: Enhance user experience

### 1. Advanced Analytics Dashboard
- Charts & graphs (trend over time)
- Geographic visualization (peta Indonesia)
- Heatmap untuk issue hotspots
- Category distribution
- Severity trends

### 2. Issue Tracking Like Git
- Branch & merge concepts untuk issues
- "Fork" issue untuk buat alternatif perspective
- Diff view untuk perbandingan versions
- Rollback ke version sebelumnya

### 3. Notification System
- Email/push notification untuk issue baru di kategori favorit
- Daily/weekly digest
- Alert untuk breaking issues
- Customizable notification preferences

### 4. Export & Reporting
- Export data ke CSV, JSON, PDF
- Generate laporan otomatis
- Shareable links untuk specific queries
- API public untuk developer lain

### 5. Multi-Source Enhancement
- Tambah lebih banyak sumber berita (8+ sources)
- Social media monitoring (Twitter/X tentang trending issues)
- Government announcement scraping
- Community-contributed issues

### 6. User Personalization
- Save favorite issues
- Create custom issue collections
- Personal dashboard
- Bookmark conversations dengan bot

---

## 🌟 **OTHERS (Future Enhancements)**
**Target**: 3-6 bulan+
**Goal**: Scale & additional channels

### 1. Multi-Platform Bots
- WhatsApp bot (untuk akses lebih mudah)
- Telegram bot
- Slack integration
- Discord bot

### 2. Voice Interface
- Indonesian Text-to-Speech
- Speech-to-Text untuk voice queries
- Voice conversation dengan bot

### 3. Community Features
- User registration & profiles
- Upvote/downvote issues
- Comment & discussion threads
- Verified contributor badges
- Crowdsourced issue verification

### 4. Advanced AI Features
- Predictive analytics (prediksi issue yang akan trending)
- Automated fact-checking
- Cross-referencing dengan multiple sources
- Bias detection dalam berita
- Generate executive summaries

### 5. Mobile Apps
- React Native app untuk iOS & Android
- Push notifications
- Offline mode
- Voice interface native

### 6. Enterprise Features
- API rate limiting & pricing tiers
- White-label solution
- Custom data sources
- Advanced access controls
- SLA guarantees

---

## 📋 **DEVELOPMENT SEQUENCE**

### Sprint 1-2 (Week 1-2): Foundation
**Focus**: Infrastructure & Basic Setup
- [ ] Setup Docker infrastructure (PostgreSQL with pgvector, Redis)
- [ ] Initialize NestJS backend project
- [ ] Initialize Next.js frontend project
- [ ] Create database schema and migrations
- [ ] Setup basic authentication (JWT)
- [ ] Create basic scraper for 1 news source (Kompas.com)

### Sprint 3-4 (Week 3-4): Core Features
**Focus**: Complete MVP
- [ ] Scraping for 2-3 sources (Kompas, Detik, Tempo)
- [ ] Issue CRUD API endpoints
- [ ] Basic web UI (issue list, filters, search)
- [ ] Issue detail page
- [ ] Manual categorization interface
- [ ] Event logging system for version control
- [ ] Basic scheduling for scraper (every 6 hours)

### Sprint 5-6 (Week 5-6): AI Integration - KILLER FEATURE
**Focus**: Conversational Bot
- [ ] Setup LangChain framework
- [ ] Integrate OpenAI/Claude API
- [ ] Implement vector embeddings generation
- [ ] Setup PostgreSQL pgvector
- [ ] RAG implementation (retrieval + generation)
- [ ] Create chat interface UI
- [ ] Basic bot conversations (Q&A)
- [ ] WebSocket for streaming responses

### Sprint 7-8 (Week 7-8): Intelligence
**Focus**: ML & Automation
- [ ] Auto-categorization ML model (IndoBERT)
- [ ] Duplicate detection algorithm
- [ ] Sentiment analysis
- [ ] Severity scoring automation
- [ ] Enhanced bot capabilities (multi-turn, context)
- [ ] Bot agent modes (Explorer, Analyst, Tracker)
- [ ] Bilingual support (Indonesian + English)

### Sprint 9-10 (Month 3): Analytics & Visualization
**Focus**: Data Insights
- [ ] Analytics dashboard
- [ ] Charts and graphs (trend analysis)
- [ ] Geographic visualization
- [ ] Category and severity distribution
- [ ] Timeline view
- [ ] Git-like diff view for issue versions

### Sprint 11-12 (Month 3-4): Enhancement
**Focus**: User Experience
- [ ] Notification system
- [ ] Email digest
- [ ] Export features (CSV, JSON, PDF)
- [ ] User personalization
- [ ] Saved conversations
- [ ] Favorite issues
- [ ] Advanced search filters

### Sprint 13+ (Month 4+): Scale & Community
**Focus**: Growth & Additional Channels
- [ ] Add more news sources (8+ total)
- [ ] WhatsApp bot integration
- [ ] Telegram bot
- [ ] Community features (comments, discussions)
- [ ] User-contributed issues
- [ ] API documentation and public API
- [ ] Performance optimization
- [ ] Advanced caching strategies

---

## 🎯 **RECOMMENDED PRIORITY**

1. **MVP First** → Buktikan konsep works
2. **AI Bot ASAP** → Ini killer feature yang bikin unique
3. **Auto-categorization** → Makes data quality better
4. **Analytics** → Makes data useful
5. **Multi-platform** → Scale adoption

---

## 📊 **Success Metrics**

### MVP Success Criteria
- [ ] Successfully scrape 100+ issues from 2-3 sources
- [ ] Basic UI working and responsive
- [ ] Search and filter working
- [ ] Version control tracking all changes

### Killer Feature Success Criteria
- [ ] Bot can answer 80%+ of user questions accurately
- [ ] Average response time < 3 seconds
- [ ] Vector search finds relevant issues with >85% accuracy
- [ ] Auto-categorization accuracy >75%

### Long-term Success Criteria
- [ ] 1000+ issues tracked
- [ ] 100+ daily active users
- [ ] 50+ bot conversations per day
- [ ] Coverage of 8+ trusted news sources
- [ ] API used by 5+ external developers

---

## 🛠️ **Technical Debt & Maintenance**

### Continuous Tasks
- Security updates for dependencies
- Database optimization and indexing
- API performance monitoring
- Error tracking and logging (Sentry)
- Backup and disaster recovery
- Documentation updates
- Test coverage improvement (target: 80%+)

### Code Quality
- Unit tests for backend services
- Integration tests for API endpoints
- E2E tests for critical user flows
- Code review process
- TypeScript strict mode
- ESLint + Prettier configuration
- Git commit conventions

---

## 💰 **Cost Estimation (Monthly)**

### MVP Phase
- Infrastructure: $20-30 (Digital Ocean/AWS)
- OpenAI API: $50-100 (for embeddings + chat)
- Domain + SSL: $2-5
- **Total**: ~$100-150/month

### Production Scale (1000+ users)
- Infrastructure: $100-200
- OpenAI API: $300-500
- Monitoring tools: $20-50
- **Total**: ~$500-800/month

---

## 📝 **Notes**

- Start small, iterate fast
- User feedback is critical after MVP
- AI bot is the differentiator - prioritize it
- Indonesian language processing is key
- Data quality > data quantity in early stages
- Consider partnerships with news publishers
- Open source parts of the stack for community contributions

---

**Last Updated**: March 15, 2026
**Document Owner**: Development Team
**Review Cycle**: Bi-weekly

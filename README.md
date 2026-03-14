# Indonesian Issue Tracker

A comprehensive system for tracking and categorizing Indonesian national issues from trusted news publishers, with git-like version control for issue history and AI-powered conversational interface.

## Project Goals

1. **Aggregate Issues**: Automatically collect and track issues from trusted Indonesian news publishers
2. **Categorization**: Intelligently categorize issues by topic, severity, region, and domain
3. **Version Control**: Maintain complete history of issue evolution similar to git commits
4. **AI-Powered Interaction**: Conversational bots that allow users to query and explore issues naturally
5. **Transparency**: Provide clear tracking of how issues develop over time
6. **Analysis**: Enable trend analysis and pattern recognition in Indonesian national issues

## Trusted Indonesian News Sources

- Kompas.com
- Detik.com
- Tempo.co
- CNN Indonesia
- Antara News
- Republika.co.id
- The Jakarta Post
- Bisnis Indonesia

## Tech Stack

### Backend
- **Framework**: Node.js with NestJS
  - Type-safe with TypeScript
  - Modular architecture
  - Built-in dependency injection
  - Easy to scale and maintain

### Database
- **Primary Database**: PostgreSQL 15+ with pgvector
  - JSONB support for flexible issue metadata
  - Full-text search for Indonesian content
  - Vector storage for semantic search
  - Robust transaction support for version control
- **Caching Layer**: Redis
  - Session management
  - API response caching
  - Queue management
  - Conversation context storage

### AI & Conversational Interface
- **LLM Integration**: OpenAI GPT-4 / Anthropic Claude
  - Natural language understanding in Indonesian & English
  - Context-aware responses
  - Multi-turn conversations
- **Vector Database**: PostgreSQL pgvector / Pinecone
  - Semantic search across issues
  - RAG (Retrieval-Augmented Generation)
  - Similar issue detection
- **Embedding Model**:
  - OpenAI text-embedding-3-large
  - Indonesian-specific embeddings (IndoBERT embeddings)
- **Conversational Framework**: LangChain
  - Agent orchestration
  - Memory management
  - Tool integration
  - Streaming responses

### Frontend
- **Framework**: Next.js 14+ (App Router)
  - Server-side rendering for SEO
  - TypeScript for type safety
  - Responsive design with Tailwind CSS
  - Real-time chat interface with WebSockets
- **Chat UI**: Custom chat component with markdown support
  - Code highlighting
  - Rich media embedding
  - Conversation history
  - Export chat transcripts

### Data Collection
- **Scraping Engine**: Python with Scrapy
  - Robust HTML parsing
  - Rate limiting and politeness
  - Proxy support
  - Custom middleware for Indonesian sites

### Message Queue
- **Queue System**: BullMQ
  - Reliable job processing
  - Scheduled scraping tasks
  - Retry mechanisms
  - Priority queues for urgent issues
  - Background embedding generation

### NLP & Categorization
- **Indonesian Text Processing**:
  - IndoBERT for text classification
  - Sastrawi for Indonesian stemming
  - spaCy with Indonesian models
- **Category Detection**: Custom ML models trained on Indonesian news corpus

### Version Control System
- **Event Sourcing Pattern**:
  - Every change creates an immutable event
  - Complete audit trail
  - Time-travel capabilities
  - Git-like diff and merge concepts

## Architecture Overview

```
┌─────────────────┐
│  News Sources   │
│  (Indonesian)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Scraping Engine │ ──► Redis Queue
│   (Python)      │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────┐
│      NestJS Backend         │
│  - API Layer                │
│  - Processing               │
│  - Categorizer              │
│  - AI Agent Service         │◄──► OpenAI/Claude API
│  - Vector Embedding Service │
└─────────┬───────────────────┘
          │
          ▼
┌─────────────────┐     ┌──────────────┐
│   PostgreSQL    │◄────┤    Redis     │
│  - Issues DB    │     │   - Cache    │
│  - Events Log   │     │   - Sessions │
│  - Vector Store │     │   - Context  │
└─────────────────┘     └──────────────┘
          │
          ▼
┌─────────────────┐
│   Next.js UI    │
│  - Dashboard    │
│  - Analytics    │
│  - History View │
│  - Chat Bot UI  │
└─────────────────┘
```

## AI Bot Capabilities

### Conversational Queries
Users can ask the bot questions in natural Indonesian or English:
- "Apa isu terbesar minggu ini?" (What's the biggest issue this week?)
- "Berikan saya ringkasan isu lingkungan di Kalimantan" (Give me a summary of environmental issues in Kalimantan)
- "Bagaimana perkembangan kasus korupsi XYZ?" (How has the XYZ corruption case developed?)
- "Compare infrastructure issues between Jakarta and Surabaya"
- "Show me trends in education issues over the last 6 months"

### Bot Features
1. **Semantic Search**: Find relevant issues based on meaning, not just keywords
2. **Summarization**: Generate concise summaries of complex issues
3. **Trend Analysis**: Identify patterns and trends in issues
4. **Comparative Analysis**: Compare issues across regions, time periods, or categories
5. **Follow-up Context**: Maintain conversation context for natural interactions
6. **Source Citations**: Always provide sources for information
7. **Issue History**: Explain how issues have evolved over time
8. **Proactive Insights**: Suggest related issues or emerging trends

### Agent Modes
- **Explorer Mode**: Browse and discover issues
- **Analyst Mode**: Deep dive into specific issues with statistics
- **Tracker Mode**: Monitor specific issues and get updates
- **Researcher Mode**: Cross-reference multiple issues and sources

## Data Model

### Issue Entity
```typescript
{
  id: string (UUID)
  title: string
  description: string
  summary: string (AI-generated)
  category: CategoryEnum
  severity: SeverityLevel
  region: string[]
  tags: string[]
  source: NewsSource
  sourceUrl: string
  embedding: number[] (vector)
  firstReportedAt: Date
  status: IssueStatus
  currentVersion: number
  sentiment: number (-1 to 1)
}
```

### Issue Event (Version Control)
```typescript
{
  id: string (UUID)
  issueId: string
  version: number
  eventType: 'created' | 'updated' | 'merged' | 'resolved'
  changes: JsonDiff
  metadata: {
    reporter: string
    timestamp: Date
    source: string
  }
  parentVersion?: number
}
```

### Conversation
```typescript
{
  id: string (UUID)
  userId: string
  messages: Message[]
  context: {
    relevantIssues: string[]
    mode: AgentMode
  }
  createdAt: Date
  updatedAt: Date
}
```

### Categories
- Politics & Government
- Economy & Business
- Social Issues
- Environment & Climate
- Education
- Health
- Infrastructure
- Technology
- Law & Justice
- Culture & Religion

## Features

### Phase 1: Foundation
- [ ] News scraper for top 3 sources
- [ ] Basic issue extraction and storage
- [ ] Simple categorization
- [ ] REST API for CRUD operations
- [ ] Basic web interface

### Phase 2: Intelligence
- [ ] ML-based auto-categorization
- [ ] Duplicate detection and merging
- [ ] Severity scoring algorithm
- [ ] Event sourcing implementation
- [ ] Advanced search and filtering
- [ ] Vector embeddings generation

### Phase 3: AI Bot Integration
- [ ] LangChain agent setup
- [ ] RAG implementation with vector search
- [ ] Conversational interface (web chat)
- [ ] Multi-language support (Indonesian/English)
- [ ] Context management
- [ ] Source citation system
- [ ] Streaming responses

### Phase 4: Analytics
- [ ] Trend analysis dashboard
- [ ] Geographic visualization
- [ ] Timeline and history views
- [ ] AI-powered insights
- [ ] Export and reporting
- [ ] API for external integrations

### Phase 5: Advanced Bot Features
- [ ] WhatsApp bot integration
- [ ] Telegram bot
- [ ] Slack integration
- [ ] Email digest with AI summaries
- [ ] Voice interface (Indonesian TTS/STT)
- [ ] Proactive notifications

### Phase 6: Collaboration
- [ ] User authentication
- [ ] Community contributions
- [ ] Issue verification system
- [ ] Discussion threads
- [ ] Saved conversations
- [ ] Shared bot insights

## Development Setup

### Prerequisites
- Node.js 20+
- Python 3.11+
- PostgreSQL 15+ with pgvector extension
- Redis 7+
- Docker & Docker Compose
- OpenAI API key or Anthropic API key

### Installation
```bash
# Clone repository
git clone https://github.com/dwisusanto007/issue-tracker.git
cd issue-tracker

# Install dependencies
npm install

# Setup Python environment for scraper
cd scraper
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Setup environment variables
cp .env.example .env
# Edit .env with your configuration including:
# - DATABASE_URL
# - REDIS_URL
# - OPENAI_API_KEY or ANTHROPIC_API_KEY
# - Vector DB credentials

# Start infrastructure
docker-compose up -d

# Install pgvector extension
psql $DATABASE_URL -c "CREATE EXTENSION IF NOT EXISTS vector;"

# Run migrations
npm run migration:run

# Start development servers
npm run dev
```

## Project Structure

```
indo-issue-tracker/
├── backend/               # NestJS backend
│   ├── src/
│   │   ├── issues/       # Issue management module
│   │   ├── events/       # Event sourcing module
│   │   ├── categories/   # Categorization module
│   │   ├── scraper-api/  # Scraper coordination
│   │   ├── ai-agent/     # AI bot & RAG module
│   │   │   ├── services/
│   │   │   │   ├── langchain.service.ts
│   │   │   │   ├── embedding.service.ts
│   │   │   │   ├── rag.service.ts
│   │   │   │   └── conversation.service.ts
│   │   │   ├── agents/
│   │   │   │   ├── explorer.agent.ts
│   │   │   │   ├── analyst.agent.ts
│   │   │   │   └── tracker.agent.ts
│   │   │   └── tools/
│   │   │       ├── search.tool.ts
│   │   │       ├── summarize.tool.ts
│   │   │       └── analyze.tool.ts
│   │   └── common/       # Shared utilities
│   ├── test/
│   └── package.json
├── frontend/             # Next.js frontend
│   ├── app/
│   │   ├── chat/        # Chat interface
│   │   ├── dashboard/   # Analytics dashboard
│   │   └── issues/      # Issue browser
│   ├── components/
│   │   ├── chat/        # Chat components
│   │   ├── ui/          # UI components
│   │   └── visualizations/
│   ├── lib/
│   │   ├── api.ts
│   │   └── websocket.ts
│   └── package.json
├── scraper/              # Python scraping engine
│   ├── spiders/
│   ├── pipelines/
│   ├── models/
│   └── requirements.txt
├── ml-models/            # ML categorization models
│   ├── training/
│   ├── models/
│   └── inference/
├── docker-compose.yml
├── .env.example
└── README.md
```

## API Documentation

API documentation will be available at `/api/docs` using Swagger/OpenAPI specification.

### Bot API Endpoints

```
POST   /api/chat/message          # Send message to bot
GET    /api/chat/conversations    # Get conversation history
DELETE /api/chat/conversations/:id # Delete conversation
POST   /api/chat/feedback          # Provide feedback on bot response
WS     /api/chat/stream            # WebSocket for streaming responses
```

## Example Bot Interactions

**User**: "Apa isu lingkungan terbesar bulan ini?"

**Bot**: "Berdasarkan analisis dari 47 artikel yang terkumpul bulan ini, berikut adalah 3 isu lingkungan terbesar:

1. **Kebakaran Hutan di Kalimantan** (Severity: High)
   - 23 artikel dari Kompas, Detik, dan Tempo
   - Wilayah terdampak: Kalimantan Tengah, Kalimantan Barat
   - Pertama dilaporkan: 1 Maret 2026
   - Status: Ongoing

2. **Polusi Udara Jakarta** (Severity: Medium-High)
   - 15 artikel
   - Peningkatan 30% dari bulan lalu

3. **Pencemaran Sungai Citarum** (Severity: Medium)
   - 9 artikel
   - Ada perkembangan positif dari pemerintah

Apakah Anda ingin detail lebih lanjut tentang salah satu isu ini?"

---

**User**: "Tell me about the Kalimantan forest fire history"

**Bot**: "Here's the history of the Kalimantan forest fire issue:

**Timeline**:
- **Mar 1, 2026**: First reported by Kompas.com - fire spotted in Central Kalimantan
- **Mar 5, 2026**: Severity upgraded - 1,000 hectares affected
- **Mar 8, 2026**: Government response announced
- **Mar 12, 2026**: Air quality emergency declared (current)

**Evolution**: The issue has escalated from a local fire to a regional air quality crisis affecting 3 provinces.

**Related Issues**:
- Similar fires occurred in 2023 and 2024 during dry season
- Connected to palm oil expansion debates

Would you like to see the geographic spread or compare with previous years?"

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## License

MIT License

## Contact

For questions and support, please open an issue on GitHub.

# Quick Start Guide

## Prerequisites

- Docker & Docker Compose
- Node.js 20+
- Python 3.11+
- npm

## 1. Start Infrastructure

```bash
# Start PostgreSQL and Redis
docker compose up -d

# Verify containers are running
docker compose ps

# Test connections
./test-connection.sh
```

## 2. Setup Python Scraper

```bash
cd scraper

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment variables
cp ../.env.example ../.env
# Edit .env with your configuration

# Test scraper (limited pages)
scrapy crawl kompas -s CLOSESPIDER_PAGECOUNT=2
```

## 3. Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Access the frontend at http://localhost:3000

## 4. Environment Configuration

Edit `.env` file in the root directory:

```env
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/indo_issue_tracker

# Scraper
SCRAPER_DELAY=2000
SCRAPER_CONCURRENT_REQUESTS=5

# AI (for future features)
OPENAI_API_KEY=your-key-here
```

## Project Structure

```
indo-issue-tracker/
├── docker-compose.yml          # Infrastructure setup
├── init-scripts/               # Database initialization
├── scraper/                    # Python news scraper
│   ├── spiders/               # Scrapy spiders
│   └── pipelines/             # Data processing
├── frontend/                   # Next.js web interface
│   ├── app/                   # Pages and routes
│   └── components/            # React components
└── backend/                    # (Coming soon) NestJS API
```

## What's Working Now

✅ **Infrastructure**
- PostgreSQL with pgvector extension
- Redis for caching
- Database tables and indexes

✅ **Scraper**
- Kompas.com spider
- Detik.com spider
- Text cleaning pipeline
- Database storage

✅ **Frontend**
- Dashboard page
- Issues listing page
- Navigation
- Responsive design

## What's Next

🚧 **Coming Soon**
- NestJS backend API
- Real-time scraping scheduler
- AI chatbot integration
- Analytics dashboard
- Auto-categorization

## Troubleshooting

### Database connection failed
```bash
# Check if containers are running
docker compose ps

# Restart containers
docker compose restart
```

### Scraper errors
```bash
# Check database connection
psql $DATABASE_URL -c "SELECT 1"

# Run with debug mode
scrapy crawl kompas -L DEBUG
```

### Frontend won't start
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## Support

For issues, questions, or contributions, please open an issue on GitHub.

# Indonesian News Scraper

Python-based web scraper using Scrapy to collect news articles from trusted Indonesian news publishers.

## Supported Sources

- Kompas.com
- Detik.com

## Installation

```bash
# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

## Configuration

Copy `.env.example` from the root directory and configure:

```
DATABASE_URL=postgresql://postgres:password@localhost:5432/indo_issue_tracker
SCRAPER_DELAY=2000
SCRAPER_CONCURRENT_REQUESTS=5
```

## Usage

### Run individual spider

```bash
# Scrape Kompas.com
scrapy crawl kompas

# Scrape Detik.com
scrapy crawl detik
```

### Run all spiders

```bash
scrapy list | xargs -n 1 scrapy crawl
```

## Architecture

```
scraper/
├── spiders/          # Spider implementations for each news source
│   ├── kompas.py     # Kompas.com spider
│   └── detik.py      # Detik.com spider
├── pipelines/        # Data processing pipelines
│   ├── clean_text.py    # Text cleaning and normalization
│   ├── date_parser.py   # Date parsing
│   └── database.py      # PostgreSQL storage
├── items.py          # Data models
├── settings.py       # Scrapy configuration
└── requirements.txt  # Python dependencies
```

## Data Flow

1. **Spider** crawls news website
2. **Extract** article data (title, content, author, date, URL)
3. **CleanTextPipeline** normalizes Indonesian text
4. **DateParserPipeline** parses and standardizes dates
5. **DatabasePipeline** saves to PostgreSQL

## Adding New Sources

1. Create new spider in `spiders/` directory
2. Inherit from `scrapy.Spider`
3. Implement `parse()` and `parse_article()` methods
4. Use `ArticleItem` for data structure
5. Set appropriate `DOWNLOAD_DELAY` and `CONCURRENT_REQUESTS`

## Best Practices

- Respect `robots.txt`
- Use appropriate delays between requests (2-3 seconds)
- Set proper User-Agent
- Handle errors gracefully
- Log important events
- Check for duplicate articles before saving

## Testing

Test individual spider on limited pages:

```bash
scrapy crawl kompas -s CLOSESPIDER_PAGECOUNT=5
```

## Scheduling

For production, use cron or a task scheduler:

```bash
# Run every 6 hours
0 */6 * * * cd /path/to/scraper && source venv/bin/activate && scrapy crawl kompas && scrapy crawl detik
```

Or use BullMQ from the backend for better queue management.

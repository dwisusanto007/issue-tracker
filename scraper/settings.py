import os
from dotenv import load_dotenv

load_dotenv()

# Scrapy settings for Indonesian Issue Tracker
BOT_NAME = 'indo_issue_scraper'

SPIDER_MODULES = ['scraper.spiders']
NEWSPIDER_MODULE = 'scraper.spiders'

# Crawl responsibly
ROBOTSTXT_OBEY = True
CONCURRENT_REQUESTS = int(os.getenv('SCRAPER_CONCURRENT_REQUESTS', 5))
DOWNLOAD_DELAY = int(os.getenv('SCRAPER_DELAY', 2000)) / 1000  # Convert ms to seconds

# User agent
USER_AGENT = os.getenv('SCRAPER_USER_AGENT', 'Mozilla/5.0 (compatible; IndoIssueTrackerBot/1.0)')

# Item pipelines
ITEM_PIPELINES = {
    'scraper.pipelines.CleanTextPipeline': 100,
    'scraper.pipelines.DateParserPipeline': 200,
    'scraper.pipelines.DatabasePipeline': 300,
}

# Database settings
DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql://postgres:password@localhost:5432/indo_issue_tracker')

# Retry settings
RETRY_TIMES = 3
RETRY_HTTP_CODES = [500, 502, 503, 504, 408, 429]

# AutoThrottle
AUTOTHROTTLE_ENABLED = True
AUTOTHROTTLE_START_DELAY = 2
AUTOTHROTTLE_MAX_DELAY = 10
AUTOTHROTTLE_TARGET_CONCURRENCY = 2.0

# Logging
LOG_LEVEL = 'INFO'
LOG_FORMAT = '%(asctime)s [%(name)s] %(levelname)s: %(message)s'

# Cache
HTTPCACHE_ENABLED = False

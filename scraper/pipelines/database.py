import psycopg2
from psycopg2.extras import RealDictCursor
import logging


class DatabasePipeline:
    """Save articles to PostgreSQL database"""

    def __init__(self, database_url):
        self.database_url = database_url
        self.connection = None
        self.cursor = None
        self.logger = logging.getLogger(__name__)

    @classmethod
    def from_crawler(cls, crawler):
        return cls(
            database_url=crawler.settings.get('DATABASE_URL')
        )

    def open_spider(self, spider):
        """Open database connection when spider opens"""
        try:
            self.connection = psycopg2.connect(self.database_url)
            self.cursor = self.connection.cursor(cursor_factory=RealDictCursor)
            self.logger.info("Database connection established")
        except Exception as e:
            self.logger.error(f"Failed to connect to database: {e}")
            raise

    def close_spider(self, spider):
        """Close database connection when spider closes"""
        if self.cursor:
            self.cursor.close()
        if self.connection:
            self.connection.close()
        self.logger.info("Database connection closed")

    def process_item(self, item, spider):
        """Save item to database"""
        try:
            # Check if article already exists
            self.cursor.execute(
                "SELECT id FROM scraped_articles WHERE url = %s",
                (item['url'],)
            )
            existing = self.cursor.fetchone()

            if existing:
                self.logger.info(f"Article already exists: {item['url']}")
                return item

            # Insert new article
            self.cursor.execute("""
                INSERT INTO scraped_articles
                (url, title, content, author, published_at, source, raw_html, scraped_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id
            """, (
                item['url'],
                item['title'],
                item['content'],
                item.get('author'),
                item.get('published_at'),
                item['source'],
                item.get('raw_html'),
                item['scraped_at']
            ))

            article_id = self.cursor.fetchone()['id']
            self.connection.commit()

            self.logger.info(f"Saved article: {item['title']} (ID: {article_id})")

        except Exception as e:
            self.logger.error(f"Error saving article: {e}")
            self.connection.rollback()
            raise

        return item

import scrapy
from scraper.items import ArticleItem
from datetime import datetime
import logging


class DetikSpider(scrapy.Spider):
    name = 'detik'
    allowed_domains = ['detik.com']
    start_urls = [
        'https://news.detik.com/',           # News
        'https://news.detik.com/berita',     # General news
        'https://finance.detik.com/',        # Finance
    ]

    custom_settings = {
        'DOWNLOAD_DELAY': 3,
        'CONCURRENT_REQUESTS_PER_DOMAIN': 2,
    }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.logger = logging.getLogger(__name__)

    def parse(self, response):
        """Parse listing page and extract article links"""
        # Find article links
        article_links = response.css('article h2 a::attr(href)').getall()

        if not article_links:
            # Try alternative selectors
            article_links = response.css('article h3 a::attr(href)').getall()

        if not article_links:
            article_links = response.css('div.media__link a::attr(href)').getall()

        self.logger.info(f"Found {len(article_links)} article links on {response.url}")

        # Follow article links
        for link in article_links[:10]:  # Limit to 10 articles per page for testing
            if link.startswith('http'):
                yield response.follow(link, callback=self.parse_article)

    def parse_article(self, response):
        """Parse individual article page"""
        try:
            # Extract title
            title = response.css('h1.detail__title::text').get()
            if not title:
                title = response.css('h1::text').get()

            # Extract content
            content_paragraphs = response.css('div.detail__body-text p::text').getall()
            if not content_paragraphs:
                content_paragraphs = response.css('div.itp_bodycontent p::text').getall()

            content = ' '.join(content_paragraphs).strip()

            # Extract author
            author = response.css('div.detail__author::text').get()
            if not author:
                author = response.css('div.author::text').get()

            # Extract published date
            published_at = response.css('div.detail__date::text').get()
            if not published_at:
                published_at = response.css('time::attr(datetime)').get()

            # Only yield if we have minimum required data
            if title and content:
                item = ArticleItem(
                    url=response.url,
                    title=title.strip(),
                    content=content,
                    author=author.strip() if author else None,
                    published_at=published_at,
                    source='Detik.com',
                    raw_html=response.text,
                    scraped_at=datetime.now()
                )

                self.logger.info(f"Scraped article: {title[:50]}...")
                yield item
            else:
                self.logger.warning(f"Skipping article (incomplete data): {response.url}")

        except Exception as e:
            self.logger.error(f"Error parsing article {response.url}: {e}")

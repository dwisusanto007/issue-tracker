import scrapy


class ArticleItem(scrapy.Item):
    """Scraped article item"""
    url = scrapy.Field()
    title = scrapy.Field()
    content = scrapy.Field()
    author = scrapy.Field()
    published_at = scrapy.Field()
    source = scrapy.Field()
    raw_html = scrapy.Field()
    scraped_at = scrapy.Field()

from dateutil import parser
from datetime import datetime
import logging


class DateParserPipeline:
    """Parse and normalize dates"""

    def __init__(self):
        self.logger = logging.getLogger(__name__)

    def process_item(self, item, spider):
        if item.get('published_at'):
            try:
                # Try to parse the date
                if isinstance(item['published_at'], str):
                    item['published_at'] = parser.parse(item['published_at'])
                elif not isinstance(item['published_at'], datetime):
                    item['published_at'] = None
            except Exception as e:
                self.logger.warning(f"Failed to parse date: {item.get('published_at')} - {e}")
                item['published_at'] = None

        # Set scraped_at to current time
        item['scraped_at'] = datetime.now()

        return item

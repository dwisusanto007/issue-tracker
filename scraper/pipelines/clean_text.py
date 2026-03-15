import re
from Sastrawi.Stemmer.StemmerFactory import StemmerFactory


class CleanTextPipeline:
    """Clean and normalize Indonesian text"""

    def __init__(self):
        self.stemmer_factory = StemmerFactory()
        self.stemmer = self.stemmer_factory.create_stemmer()

    def process_item(self, item, spider):
        # Clean title
        if item.get('title'):
            item['title'] = self.clean_text(item['title'])

        # Clean content
        if item.get('content'):
            item['content'] = self.clean_text(item['content'])

        # Clean author
        if item.get('author'):
            item['author'] = self.clean_text(item['author'])

        return item

    def clean_text(self, text):
        """Clean text by removing extra whitespace and normalizing"""
        if not text:
            return text

        # Remove extra whitespace
        text = re.sub(r'\s+', ' ', text)

        # Remove leading/trailing whitespace
        text = text.strip()

        # Remove special characters that might cause issues
        text = text.replace('\x00', '')

        return text

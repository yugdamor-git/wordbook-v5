import pymongo
from itertools import islice
from pathlib import Path

from bs4 import BeautifulSoup

class Database:
    def __init__(self):
        db_name = "wordbook"
        connection_uri = "mongodb://root:9076b974c31e4678f@65.108.81.208:27017/?authSource=admin"
        client = pymongo.MongoClient(connection_uri)
        db = client[db_name]
        self.data = db["data"]
        self.locales = db["locales"]
        
class SiteMapGenerator:
    def __init__(self):
        print(f'site map generator init')
        
        self.baseUrl = "https://uptoword.com"
        
        self.allUrls = {}
        
        self.database = Database()
        
        self.locales = None
        
        self.maxUrlPerFile = 4000
        
        self.indexFileUrls = []
        
        self.cwd = Path.cwd()
        
        self.publicDir = self.cwd.joinpath("public")
        
        if not self.publicDir.exists():
            self.publicDir.mkdir()
        
        self.indexSiteMapStr = """<?xml version="1.0" encoding="UTF-8"?>
        <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        {}
        </sitemapindex>"""
        
        self.siteMapStr = """<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
        {}
        </urlset>"""
    
    def generateLocalesUrl(self):
        
        locales = list(self.database.locales.find({"default":False}))
        
        self.locales = locales
        
        for locale in locales:
            
            url = f'{self.baseUrl}/en/dictionary/english-to-{locale["name"]}'
            
            self.allUrls[url] = 1
            
            
        
    
    def generateWordsUrls(self):
        words = list(self.database.data.find({},{"word":1}))
        
        for word in words:
            for locale in self.locales:
                url = f'{self.baseUrl}/en/{word["word"].replace(" ","-")}-meaning-in-{locale["name"]}'
                
                self.allUrls[url] = 1
                
    def chunk(self,it, size):
        it = iter(it)
        return iter(lambda: tuple(islice(it, size)), ())
                
    def generateSiteMap(self):
        
        self.generateLocalesUrl()
        
        self.generateWordsUrls()
        
        urls = list(self.allUrls.keys())
        
        chunks = self.chunk(urls,self.maxUrlPerFile)
        
        for index,chunk in enumerate(chunks):
            fileName = f'sitemap-{index}.xml'
            line = f'<sitemap><loc>{self.baseUrl}/{fileName}</loc></sitemap>'
            self.indexFileUrls.append(line)
            currentFileUrls = []
            
            for url in chunk:
                line = f'<url><loc>{url}</loc><changefreq>yearly</changefreq><lastmod>2022-03-26T05:10:20.003Z</lastmod></url>'
                currentFileUrls.append(line)
            
            filePath = self.publicDir.joinpath(fileName)
            data =  BeautifulSoup(self.siteMapStr.format("".join(currentFileUrls)),"xml").prettify()
            
            with open(filePath,"w") as f:
                f.write(data)
            
            
        siteMapFilePath = self.publicDir.joinpath("sitemap.xml")
        
        data =  BeautifulSoup(self.indexSiteMapStr.format("".join(self.indexFileUrls)),"xml").prettify()
        
        with open(siteMapFilePath,"w") as f:
            f.write(data)
            
            
            
            
if __name__ == "__main__":
    smg = SiteMapGenerator()
    smg.generateSiteMap()
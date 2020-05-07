from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options

chrome_options = Options()
chrome_options.add_argument("--headless")

url = 'https://www.weddingwire.com/biz/kalli-bear-films/86e1f15a273366c2.html'

driver = webdriver.Chrome()
driver.get(url)

rating = driver.find_element_by_class_name('storefrontSummary__text')
list_of_reviews = driver.find_elements_by_class_name(
    'storefrontReview__description')

for i in len(list_of_reviews):
    print(i.text)
print(rating.text)

driver.close()

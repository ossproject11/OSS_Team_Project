import requests
from bs4 import BeautifulSoup
import pymysql

# connect OSS - Database
conn = pymysql.connect(host="", user="", password="", db="", charset="utf8")
curs = conn.cursor(pymysql.cursors.DictCursor)

# 수상작 목록 api 추출
win_list = requests.get("http://www.kopis.or.kr/openApi/restful/prfawad?service=&stdate=20210101&eddate=20211231&cpage=1&rows=763".encode('utf-8'))
win_soup = BeautifulSoup(win_list.content, "html.parser")
win_id = win_soup.find_all("mt20id")
win_nm = win_soup.find_all("prfnm")
win_awad = win_soup.find_all("awards")

# 수상작 목록 이중 list
winner_list = [[] for i in range(len(win_id))]

# 수상작 목록 이중 list에 공연ID, 공연명, 수상실적 입력
for i in range(len(win_id)):
    sql = "insert into Award values (%s, %s, %s)"
    curs.execute(sql, (win_id[i].text, win_nm[i].text, win_awad[i].text))
    conn.commit()

curs.close()
conn.commit()

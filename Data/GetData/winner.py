import requests
from bs4 import BeautifulSoup

# 수상작 목록 api 추출
win_list = requests.get("http://www.kopis.or.kr/openApi/restful/prfawad?service=3dbea193a9e0445a9c80d813e9233d93&stdate=20210101&eddate=20211231&cpage=1&rows=763".encode('utf-8'))
win_soup = BeautifulSoup(win_list.content, "html.parser")
win_id = win_soup.find_all("mt20id")
win_nm = win_soup.find_all("prfnm")
win_awad = win_soup.find_all("awards")

# 수상작 목록 이중 list
winner_list = [[] for i in range(len(win_id))]

# 수상작 목록 이중 list에 공연ID, 공연명, 수상실적 입력
for i in range(len(win_id)):
    winner_list[i] = [win_id[i].text, win_nm[i].text, win_awad[i].text]

# 완성된 list 출력
for i in winner_list:
    print(i)

'''
API 리스트 index 별 내용(필드명)
공연ID(mt20id), 공연명(prfnm), 수상실적(awards)
'''
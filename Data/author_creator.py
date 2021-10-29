import requests
from bs4 import BeautifulSoup

# 극작가 목록 api 추출
anc_list = requests.get("http://www.kopis.or.kr/openApi/restful/prfper?service=3dbea193a9e0445a9c80d813e9233d93&stdate=20210101&eddate=20211231&cpage=1&rows=7019".encode('utf-8'))
anc_soup = BeautifulSoup(anc_list.content, "html.parser")
anc_id = list(str(anc_soup.select("db > mt20id, prfnm, author, creator")).split("<mt20id>"))
anc_num = anc_soup.findAll("mt20id")

# 극작가 목록 이중 list
author_creator_list = [[] for i in range(len(anc_num))]

for i in range(1, len(anc_num)+1):
    author_creator_list[i-1].append(anc_id[i])

for i in author_creator_list:
    print(i)


'''
########### 현재 수정중

목표 API 리스트 index 별 내용(필드명)
공연ID(mt20id), 공연명(prfnm), 원작자(author), 창작자(creator)
'''
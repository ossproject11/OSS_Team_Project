import requests
from bs4 import BeautifulSoup

# 축제여부 목록 api 추출
fes_list = requests.get("http://www.kopis.or.kr/openApi/restful/prffest?service=3dbea193a9e0445a9c80d813e9233d93&stdate=20210101&eddate=20211231&cpage=1&rows=3588".encode('utf-8'))
fes_soup = BeautifulSoup(fes_list.content, "html.parser")
fes_id = fes_soup.find_all("mt20id")            # 공연ID
fes_nm = fes_soup.find_all("prfnm")             # 공연명
fes_yn = fes_soup.find_all("festival")          # 축제여부

print(len(fes_id), len(fes_nm), len(fes_yn))

# 축제여부 목록 이중 list
festival_list = [[] for i in range(len(fes_id))]

# 축제여부 목록 이중 list에 공연ID, 공연명, 축제여부 입력
for i in range(len(fes_id)):
    festival_list[i] = [fes_id[i].text, fes_nm[i].text, fes_yn[i].text]

# 완성된 list 출력
for i in festival_list:
    print(i)

'''
API 리스트 index 별 내용(필드명)
공연ID(mt20id), 공연명(prfnm), 축제여부(festival)
'''
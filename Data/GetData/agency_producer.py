import requests
from bs4 import BeautifulSoup

# 기획/제작사목록 api 추출
cpy_list = requests.get("http://www.kopis.or.kr/openApi/restful/mnfct?service=&cpage=1&rows=6186".encode('utf-8'))
cpy_soup = BeautifulSoup(cpy_list.content, "html.parser")
company_id = cpy_soup.find_all()

# 기획/제작사목록 list
company_list = []

# 각 기획/제작사별로 모여있는 데이터를 str로 바꾸고 strip 후 특수문자 \n 을 기준으로 split하여 리스트에 넣어 제작하였음
for i in range(1, len(company_id), 7):
    company_list.append(str(company_id[i].text.strip()).split('\n'))        # 최신작품, 기획/제작사명, 장르, 전화번호, 홈페이지, 기획/제작사ID

# 정리된 list 출력
for i in company_list:
    print(i)

'''
API 리스트 index 별 내용(필드명)
최신작품(prfnm), 기획/제작사명(entrpsnm), 장르(genrenm), 전화번호(telno), 홈페이지(relateurl), 기획/제작사ID(mt30id)"
'''
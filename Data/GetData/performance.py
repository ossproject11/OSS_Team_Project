import requests
from bs4 import BeautifulSoup

#공연목록 api
prf_list = requests.get("http://www.kopis.or.kr/openApi/restful/pblprfr?service=3dbea193a9e0445a9c80d813e9233d93&stdate=20210101&eddate=20211231&cpage=1&rows=225".encode('utf-8'))
prf_soup = BeautifulSoup(prf_list.content, "html.parser")
performance_id=prf_soup.find_all()

# 이중list 공연목록 api
performance_list = []
for i in range(1,len(performance_id),10):
    performance_list.append(str(performance_id[i].text.strip()).split('\n')) #공연 ID, 공연명, 공연시작일자, 공연종료일자, 공연시설명, 공연포스터경로, 공연 장르명, 공연상태, 오픈런 append

#세부정보 저장을 위한 공연 code
prf_code=prf_soup.find_all("mt20id") #공연 ID에 대한 세부정보 파악을 위해, ID만 들어있는 list 생성
performance_code = []
for i in range(0, len(prf_code)):
    performance_code.append(prf_code[i].text)

poster = []

#세부정보 공연목록에 append
for i in range(len(performance_id)//10):
    a_list = requests.get("http://www.kopis.or.kr/openApi/restful/pblprfr/"+str(performance_code[i])+"?service=3dbea193a9e0445a9c80d813e9233d93")
    a_soup = BeautifulSoup(a_list.content, "html.parser")
    a_id = a_soup.find_all("prfcast")           #공연출연진
    b_id = a_soup.find_all("prfcrew")           #공연제작진
    c_id = a_soup.find_all("prfruntime")        #공연런타임
    d_id = a_soup.find_all("prfage")            #공연관람연령
    e_id = a_soup.find_all("entrpsnm")          #제작사
    f_id = a_soup.find_all("pcseguidance")      #티켓가격
    g_id = a_soup.find_all("sty")               #줄거리
    h_id = a_soup.find_all("dtguidance")        #공연시간
    j_id = a_soup.find("styurl")                #최상위 소개이미지 1개 append // 없을경우는 None값이 들어감
    performance_list[i].append(a_id[0].text)
    performance_list[i].append(b_id[0].text)
    performance_list[i].append(c_id[0].text)
    performance_list[i].append(d_id[0].text)
    performance_list[i].append(e_id[0].text)
    performance_list[i].append(f_id[0].text)
    performance_list[i].append(g_id[0].text)
    performance_list[i].append(h_id[0].text)
    performance_list[i].append(str(j_id).strip("</styurl>"))

#세부정보가 포함된 공연 목록 print
for i in performance_list:
    print(i)

'''전체 코드 index별 정보
1. 공연 세부정보 : 공연 ID, 공연명, 공연시작일자, 공연종료일자, 공연시설명, 공연포스터경로, 공연 장르명, 공연상태, 오픈런, 출연진, 제작진, 런타임, 관람연령, 제작사, 티켓가격, 줄거리, 공연시간
'''
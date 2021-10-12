import requests
from bs4 import BeautifulSoup
import pymysql

conn = pymysql.connect(host="oss-project.cdwna8p0padu.us-east-2.rds.amazonaws.com", user="admin", password="ossproject", db="oss-project", charset="utf8")
curs = conn.cursor(pymysql.cursors.DictCursor)
#공연목록 api
prf_list = requests.get("http://www.kopis.or.kr/openApi/restful/pblprfr?service=9a8ded23eba14870b33c1ff1ad746a83&stdate=20210101&eddate=20211231&cpage=1&rows=225".encode('utf-8'))
prf_soup = BeautifulSoup(prf_list.content, "html.parser")
performance_id=prf_soup.find_all()

# 이중list 공연목록 api
performance_list = [[] for _ in range(len(performance_id)//10)]
for i in range(2,len(performance_id),10):
    for j in range(i, i+9):
        performance_list[i//10].append(performance_id[j].text)

#세부정보 저장을 위한 공연 code
prf_code=prf_soup.find_all("mt20id")
performance_code = []
for i in range(0, len(prf_code)):
    performance_code.append(prf_code[i].text)

#세부정보 공연목록에 append
for i in range(len(performance_id)//10):
    a_list = requests.get("http://www.kopis.or.kr/openApi/restful/pblprfr/"+str(performance_code[i])+"?service=9a8ded23eba14870b33c1ff1ad746a83")
    a_soup = BeautifulSoup(a_list.content, "html.parser")
    a_id = a_soup.find_all("prfcast")           #공연출연진
    b_id = a_soup.find_all("prfcrew")           #공연제작진
    c_id = a_soup.find_all("prfruntime")        #공연런타임
    d_id = a_soup.find_all("prfage")            #공연관람연령
    e_id = a_soup.find_all("entrpsnm")          #제작사
    f_id = a_soup.find_all("pcseguidance")      #티켓가격
    g_id = a_soup.find_all("sty")               #줄거리
    h_id = a_soup.find_all("dtguidance")        #공연시간
    for j in range(len(a_id)):
        performance_list[i].append(a_id[j].text)
        performance_list[i].append(b_id[j].text)
        performance_list[i].append(c_id[j].text)
        performance_list[i].append(d_id[j].text)
        performance_list[i].append(e_id[j].text)
        performance_list[i].append(f_id[j].text)
        performance_list[i].append(g_id[j].text)
        performance_list[i].append(h_id[j].text)

#세부정보가 포함된 공연 목록 print
for i in range(len(performance_id)//10):
    sql = "insert into Details values (%s, %s, %s, %s, %s, %s, %s, %s, %s)"

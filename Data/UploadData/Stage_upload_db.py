import requests
from bs4 import BeautifulSoup
import pymysql

# connect OSS - Database
conn = pymysql.connect(host="", user="", password="", db="", charset="utf8")
curs = conn.cursor(pymysql.cursors.DictCursor)

# 공연시설상세 api 추출
fcl_list = requests.get("http://www.kopis.or.kr/openApi/restful/prfplc?service=&cpage=1&rows=1448".encode('utf-8'))
fcl_soup = BeautifulSoup(fcl_list.content, "html.parser")
facility_id = fcl_soup.find_all("mt10id")

for i in range(len(facility_id)):
    a_list = requests.get("http://www.kopis.or.kr/openApi/restful/prfplc/" + str(
        facility_id[i].text) + "?service=")
    a_soup = BeautifulSoup(a_list.content, "html.parser")

    a_id = a_soup.find_all("fcltynm")  # 공연 시설명
    b_id = a_soup.find_all("mt13cnt")  # 공연장 수
    c_id = a_soup.find_all("fcltychartr")  # 시설 특성
    d_id = a_soup.find_all("opende")  # 개관연도
    e_id = a_soup.find_all("seatscale")  # 객석 수
    f_id = a_soup.find_all("telno")  # 전화번호
    g_id = a_soup.find_all("relateurl")  # 홈페이지
    h_id = a_soup.find_all("adres")  # 주소
    i_id = a_soup.find_all("la")  # 위도
    j_id = a_soup.find_all("lo")  # 경도

    sql = "insert into Stage values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    curs.execute(sql, (facility_id[i].text, a_id[0].text, b_id[0].text, c_id[0].text, d_id[0].text, e_id[0].text, f_id[0].text, g_id[0].text, h_id[0].text, i_id[0].text, j_id[0].text))
    conn.commit()

curs.close()
conn.commit()

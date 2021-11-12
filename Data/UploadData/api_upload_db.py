import requests
from bs4 import BeautifulSoup
import pymysql

# connect OSS - Database
conn = pymysql.connect(host="", user="", password="!", db="", charset="utf8")
curs = conn.cursor(pymysql.cursors.DictCursor)

# Open API INFO
prf_list = requests.get("http://www.kopis.or.kr/openApi/restful/pblprfr?service=&stdate=20210101&eddate=20211231&cpage=1&rows=225".encode('utf-8'))
prf_soup = BeautifulSoup(prf_list.content, "html.parser")
performance_id = prf_soup.find_all("mt20id")

# Open PrfDetail
for i in range(len(performance_id)):
    a_list = requests.get("http://www.kopis.or.kr/openApi/restful/pblprfr/" + performance_id[i].text + "?service=9a8ded23eba14870b33c1ff1ad746a83")
    a_soup = BeautifulSoup(a_list.content, "html.parser")

    # performance_id[i]                         # 공연 ID
    a_id = a_soup.find_all("mt10id")            # 공연 시설 ID
    b_id = a_soup.find_all("prfnm")             # 공연 명
    c_id = a_soup.find_all("prfpdfrom")         # 공연 시작일
    d_id = a_soup.find_all("prfpdto")           # 공연 종료일
    e_id = a_soup.find_all("fcltynm")           # 공연 시설명
    f_id = a_soup.find_all("prfcast")           # 공연 출연진
    g_id = a_soup.find_all("prfcrew")           # 공연 제작진
    h_id = a_soup.find_all("prfruntime")        # 공연 런타임
    i_id = a_soup.find_all("prfage")            # 공연 관람연령
    j_id = a_soup.find_all("entrpsnm")          # 공연 제작사
    k_id = a_soup.find_all("pcseguidance")      # 공연 티켓가격
    l_id = a_soup.find_all("poster")            # 공연 포스터
    m_id = a_soup.find_all("sty")               # 공연 줄거리
    n_id = a_soup.find_all("genrenm")           # 공연 장르
    o_id = a_soup.find_all("prfstate")          # 공연 상태
    p_id = a_soup.find_all("openrun")           # 공연 오픈런
    #q_id = a_soup.find_all("styurls")          # 공연 소개이미지목록
    #if len(q_id) == 0:
    #    q_id = ["<styurls>x</styurls>"]
    r_id = a_soup.find_all("dtguidance")        # 공연 시간

    sql = "insert into Details values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    curs.execute(sql, (performance_id[i].text, a_id[0].text, b_id[0].text, c_id[0].text, d_id[0].text, e_id[0].text, f_id[0].text, g_id[0].text, h_id[0].text,
                       i_id[0].text, j_id[0].text, k_id[0].text, l_id[0].text, m_id[0].text, n_id[0].text, o_id[0].text, p_id[0].text, r_id[0].text, "test"))
    conn.commit()

# 공연시설상세 api 추출
fcl_list = requests.get("http://www.kopis.or.kr/openApi/restful/prfplc?service=3dbea193a9e0445a9c80d813e9233d93&cpage=1&rows=1448".encode('utf-8'))
fcl_soup = BeautifulSoup(fcl_list.content, "html.parser")
facility_id = fcl_soup.find_all("mt10id")

for i in range(len(facility_id)):
    a_list = requests.get("http://www.kopis.or.kr/openApi/restful/prfplc/" + str(
        facility_id[i].text) + "?service=9a8ded23eba14870b33c1ff1ad746a83")
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

    sql = "insert into Details values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    curs.execute(sql, (facility_id[i].text, a_id[0].text, b_id[0].text, c_id[0].text, d_id[0].text, e_id[0].text, f_id[0].text, g_id[0].text, h_id[0].text, i_id[0].text, j_id[0].text))
    conn.commit()

curs.close()
conn.commit()

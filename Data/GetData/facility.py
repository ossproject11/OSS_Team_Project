import requests
from bs4 import BeautifulSoup

# 공연시설상세 api 추출
fcl_list = requests.get("http://www.kopis.or.kr/openApi/restful/prfplc?service=3dbea193a9e0445a9c80d813e9233d93&cpage=1&rows=1448".encode('utf-8'))
fcl_soup = BeautifulSoup(fcl_list.content, "html.parser")
facility_id = fcl_soup.find_all()

# 공연시설상세 list
facility_list = []

# 공연시설상세 별로 모여있는 데이터를 str로 바꾸고 strip 후 특수문자 \n 을 기준으로 split하여 리스트에 넣어 제작하였음
for i in range(1, len(facility_id), 8):
    facility_list.append(str(facility_id[i].text.strip()).split('\n'))

# 세부정보 저장을 위한 시설 code
fcl_code=fcl_soup.find_all("mt10id") #시설 ID에 대한 세부정보 파악을 위해, ID만 들어있는 list 생성
facility_code = []
for i in range(0, len(fcl_code)):
    facility_code.append(fcl_code[i].text)      # 공연시설명, 공연시설ID, 공연장 수, 시설특성, 지역(시도), 지역(구군), 개관연도

# 세부정보 시설목록에 append
for i in range(len(facility_id)//8):
    a_list = requests.get("http://www.kopis.or.kr/openApi/restful/prfplc/"+str(facility_code[i])+"?service=3dbea193a9e0445a9c80d813e9233d93")
    a_soup = BeautifulSoup(a_list.content, "html.parser")
    a_id = a_soup.find_all("seatscale")         #객석 수
    b_id = a_soup.find_all("telno")             #전화번호
    c_id = a_soup.find_all("relateurl")         #홈페이지
    d_id = a_soup.find_all("adres")             #주소
    e_id = a_soup.find_all("la")                #위도
    f_id = a_soup.find_all("lo")                #경도
    for j in range(len(a_id)):
        facility_list[i].append(a_id[j].text)
        facility_list[i].append(b_id[j].string)
        facility_list[i].append(c_id[j].text)
        facility_list[i].append(d_id[j].text)
        facility_list[i].append(e_id[j].text)
        facility_list[i].append(f_id[j].text)

# 정리된 리스트 출력
for i in facility_list:
    print(i)

'''
API 리스트 index 별 내용(필드명)
공연시설명, 공연시설ID, 공연장 수, 시설특성, 지역(시도), 지역(구군), 개관연도, 객석 수, 전화번호, 홈페이지, 주소, 위도, 경도

<<<중요>>> 수정된 내용 : 전에 오류로 전화번호를 넣지 않았는데, 이번에 전화번호가 추가되었습니다.
'''
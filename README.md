Global Weather 앱은 전 세계 도시의 현재 날씨와 5일 예보를 제공하는 React 기반의 웹 애플리케이션입니다.

주요 기능 \*도시 검색: 사용자가 원하는 도시의 날씨 정보를 검색할 수 있습니다.

\*현재 날씨: 선택한 도시의 현재 기온, 체감 온도, 날씨 상태, 습도, 풍속 등을 표시합니다.

\*5일 예보: 선택한 도시의 5일 날씨 예보를 제공합니다.

\*즐겨찾기: 자주 찾는 도시를 즐겨찾기에 추가하고 관리할 수 있습니다.

\*날씨 지도: 선택한 도시의 위치를 지도에 표시하고, 온도, 구름, 강수량 등의 날씨 레이어를 선택할 수 있습니다.

사용된 기술

React

Axios (API 요청)
OpenWeatherMap API (날씨 데이터)
Google Maps API (도시 자동완성)
Leaflet (지도 표시)
Local Storage (즐겨찾기 저장)

설치 및 실행 방법

1.저장소를 클론합니다:
git clone [저장소 URL]

2.프로젝트 디렉토리로 이동합니다:
cd global-weather-app

3.필요한 패키지를 설치합니다:
npm install

4. .env 파일을 생성하고 필요한 API 키를 설정합니다:
   REACT_APP_WEATHER_API_KEY=your_openweathermap_api_key
   REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

5.애플리케이션을 실행합니다:
npm start

컴포넌트 구조

App: 메인 컴포넌트
WeatherSearch: 도시 검색 컴포넌트
WeatherInfo: 현재 날씨 정보 표시 컴포넌트
WeatherForecast: 5일 예보 표시 컴포넌트
Favorites: 즐겨찾기 관리 컴포넌트
WeatherMap: 날씨 지도 컴포넌트

주의사항
OpenWeatherMap API와 Google Maps API 키가 필요합니다.
실제 배포 시 API 키 보안에 주의해야 합니다.

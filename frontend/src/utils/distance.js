function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // 지구의 반지름 (단위: km)
  const dLat = deg2rad(lat2 - lat1); // 위도 차이 (라디안)
  const dLon = deg2rad(lon2 - lon1); // 경도 차이 (라디안)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // 두 지점 간의 거리 (단위: km)
  return distance.toFixed(1);
}

export function getTimeTaken(lat1, lon1, lat2, lon2) {
  const R = 6371; // 지구의 반지름 (단위: km)
  const dLat = deg2rad(lat2 - lat1); // 위도 차이 (라디안)
  const dLon = deg2rad(lon2 - lon1); // 경도 차이 (라디안)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // 두 지점 간의 거리 (단위: km)

  const timeTaken = Math.round((distance * 1000) / (1.29 * 60));
  return timeTaken;
}

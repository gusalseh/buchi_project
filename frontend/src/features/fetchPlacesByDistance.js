import axios from 'axios';

export const fetchPlacesByDistance = async ({ latitude, longitude, amount }) => {
  try {
    const response = await axios.post('http://localhost:80/api/spots/getSpotByDistance', {
      latitude,
      longitude,
      amount,
    });

    const updatedPlaces = response.data.map((place) => {
      const serviceTags = [];

      if (place.private_room === 1) serviceTags.push('개인룸');
      if (place.parking_lot > 0) serviceTags.push('주차가능');
      if (place.valet === 1) serviceTags.push('발렛가능');
      if (place.corkage === 'free') serviceTags.push('콜키지 무료');
      if (place.corkage === 'charge') serviceTags.push('콜키지 유료');
      if (place.rental === 1) serviceTags.push('대관가능');
      if (place.placard === 1) serviceTags.push('플랜카드 부착 가능');
      if (place.indoor_toilet === 1) serviceTags.push('실내화장실');
      if (place.wheelchair === 1) serviceTags.push('휠체어 이용가능');

      return {
        title: place.spot_name,
        main_section_1: place.mainSec_1,
        main_section_2: place.mainSec_2,
        sub_section_1: place.subSec_1,
        sub_section_2: place.subSec_2,
        sub_section_3: place.subSec_3,
        sub_section_4: place.subSec_4,
        sub_section_5: place.subSec_5,
        tag_1: place.tag_1,
        tag_2: place.tag_2,
        tag_3: place.tag_3,
        distance: place.walking_time,
        max_group_seats: place.max_group_seats,
        rating: parseInt(place.avg_rating),
        reviews: place.review_count,
        price: parseInt(place.avg_price),
        lat: place.spot_lat,
        lng: place.spot_lng,
        img: place.spot_main_img,
        walking_time: place.walking_time,
        serviceTags: serviceTags,
      };
    });

    return updatedPlaces;
  } catch (error) {
    console.error('Error fetching places by distance:', error);
    throw error;
  }
};

const { sequelize, Visit, Review } = require('../models'); // sequelize 불러오기

exports.getVisitReviewJoinDB = async () => {
  try {
    const visitsWithReviews = await Visit.findAll({
      include: [
        {
          model: Review,
        },
      ],
    });

    // 데이터를 spot_id로 그룹화하고, rating 평균을 구함
    const groupedBySpotId = visitsWithReviews.reduce((acc, visit) => {
      const spotId = visit.spot_id;

      if (!acc[spotId]) {
        acc[spotId] = {
          reviews: [],
          totalRating: 0,
          reviewCount: 0,
        };
      }

      // 리뷰가 존재하는 경우에만 rating 합산 및 카운트 증가
      if (visit.Review && visit.Review.rating !== null) {
        acc[spotId].totalRating += visit.Review.rating;
        acc[spotId].reviewCount += 1;
      }

      acc[spotId].reviews.push(visit);
      return acc;
    }, {});

    // spot_id별로 평균 rating 계산
    const result = Object.keys(groupedBySpotId).map((spotId) => {
      const { totalRating, reviewCount, reviews } = groupedBySpotId[spotId];
      const averageRating = reviewCount > 0 ? (totalRating / reviewCount).toFixed(2) : 0;

      return {
        spot_id: parseInt(spotId, 10),
        averageRating,
        reviewCount,
        reviews,
      };
    });

    return result; // 데이터를 반환
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch visit review data');
  }
};

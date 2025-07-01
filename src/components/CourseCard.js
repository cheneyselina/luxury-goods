

import React from 'react';
import './CourseCard.css';

const CourseCard = ({ course }) => {
  const handleClick = () => {
    // 假设点击按钮后跳转到详情页面
  };
  return (
    <div className="course-card">
      <div className="image-wrapper">
        <div className="image-style">
          <img src={course.cell_cover_image_url} alt={course.title} />
        </div>
        <div className="overlay">
          <div className="brand-logo">
            <img src={course.brand_logo_image_url} alt={course.title} />
          </div>
          <div className="course-info">
            <h3>{course.title}</h3>
            <p>${course.price}</p>
            <button className="view-details" onClick={handleClick}>Coming Soon</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;


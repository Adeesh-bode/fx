
// import React from 'react';
// import PropTypes from 'prop-types';
// import './style.css'
// function Rating({ value, onChange, name, max, readOnly } : any) {
//   const handleChange = (newValue : any) => {
//     if (!readOnly && onChange) {
//       onChange(null, newValue);
//     }
//   };

//   const renderStars = () => {
//     const stars = [];
//     for (let i = 0; i < max; i++) {
//       const currentValue = value - i;
//       let starClass = 'star-empty'; 
//       if (currentValue >= 1) {
//         starClass = 'star-full'; 
//       } else if (currentValue > 0 && currentValue < 1) {
//         starClass = 'star-half'; 
//       }

//       stars.push(
//         <span
//           key={i}
//           className={`star ${starClass}`}
//           onClick={() => handleChange(i + 1)}
//           style={{ cursor: readOnly ? 'not-allowed' : 'pointer' }}
//           role="button"
//           aria-label={`${name} ${i + 1}`}
//         />
//       );
//     }
//     return stars;
//   };

//   return (
//     <div className="rating-container" role="radiogroup" aria-labelledby={name}>
//       {renderStars()}
//     </div>
//   );
// }

// Rating.propTypes = {
//   value: PropTypes.number.isRequired,
//   onChange: PropTypes.func,
//   name: PropTypes.string.isRequired,
//   max: PropTypes.number,
//   readOnly: PropTypes.bool,
// };

// Rating.defaultProps = {
//   max: 5,
//   readOnly: false,
// };

// export default Rating;

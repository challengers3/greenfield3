import React from 'react';

let styles = {
  imgResize: {
    maxWidth: '30%',
    maxHeight: '30%',
  }
}

let starIcons = {
  '0.0': require('../assets/starIcons/0.png'),
  '1': require('../assets/starIcons/1.png'),
  '1.5': require('../assets/starIcons/1half.png'),
  '2': require('../assets/starIcons/2.png'),
  '2.5': require('../assets/starIcons/2half.png'),
  '3': require('../assets/starIcons/3.png'),
  '3.5': require('../assets/starIcons/3half.png'),
  '4': require('../assets/starIcons/4.png'),
  '4.5': require('../assets/starIcons/4half.png'),
  '5': require('../assets/starIcons/5.png')
}

const ReviewStars = (props) => {
  let result = starIcons[props.rating];
  return (
    <div>
      <img style={styles.imgResize} src={result} />
    </div>
  )
}

export default ReviewStars;

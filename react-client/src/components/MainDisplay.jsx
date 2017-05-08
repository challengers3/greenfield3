import React from 'react';
import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import PropTypes from 'prop-types';
import ReviewStars from './ReviewStars.jsx';

const styles = {
  cardStyle: {
    display: 'table',
    margin: '0 auto',
    marginTop: '20px',
  },
};

const MainDisplay = (props) => {
  const propsData = props.data[0].businesses['0'];
  return (
    <Card style={styles.cardStyle}>
      <CardHeader
        title={propsData.name}
        subtitle={<ReviewStars rating={propsData.rating} />}
      />
      <CardTitle title="Description" />
      <CardText>
        <p>{propsData.description}</p>
        <p>Type of food: {propsData.categories[0].title}</p>
        <p>Street Address: {propsData.location.address1}</p>
        <p>City: {propsData.location.city}</p>
        <p>State: {propsData.location.state},&nbsp;
          {propsData.location.zip_code}</p>
      </CardText>
      <CardActions>
        <IconButton><StarBorder color="rgb(0, 188, 212)" />
        </IconButton>
      </CardActions>
    </Card>
  );
};

MainDisplay.propTypes = {
  data: PropTypes.array,
};

MainDisplay.defaultProps = {
  data: PropTypes.array,
};

export default MainDisplay;

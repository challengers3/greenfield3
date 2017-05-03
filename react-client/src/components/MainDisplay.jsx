import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';

const MainDisplay = (props) => {
  let propsData = props.data[0].businesses['0'];
  return (
    <Card>
      <CardHeader
        title={propsData.name}
      />
      {/* <CardMedia
        <img src={<List />} />
      </CardMedia> */}
      <CardTitle title="Description" />
      <CardText>
        {propsData.description}
      </CardText>
      Street Address: {propsData.location.address1}
      City: {propsData.location.city}
      State: {propsData.location.state}, {propsData.location['zip_code']}
      <CardActions>
        <FloatingActionButton mini={true}>
          <ContentAdd />
        </FloatingActionButton>

        <FloatingActionButton mini={true}>
          <ContentRemove />
        </FloatingActionButton>
      </CardActions>
    </Card>
  )
}

export default MainDisplay;

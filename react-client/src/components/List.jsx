import React from 'react';
import ListItem from './ListItem.jsx';

// var fishData = [
//   {
//     name: 'Goldfish',
//     image: 'http://tinyurl.com/n4vgcl5',
//     description: 'Everyone\'s first pet'
//   },
//   {
//     name: 'Pufferfish',
//     image: 'http://tinyurl.com/kxd7cuu',
//     description: 'So puffy!'
//   },
//   {
//     name: 'Tuna',
//     image: 'http://tinyurl.com/zgs7z2s',
//     description: 'Why are these things so huge? THey\'re terrifying.'
//   }
// ];

// ReactDOM.render(
//   <FishTable fishes={fishData}/>,
//   document.getElementById('app')
// );


var List = (props) => (
  <table>
    <tbody> 
      {props.items.map(function(item, index) {
        return <ListItem item={item}/>;
      })}
    </tbody>
  </table>
);

List.propTypes = {
  items: React.PropTypes.array.isRequired
};

export default List;

//window.List = List;
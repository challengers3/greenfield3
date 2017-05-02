import React from 'react';

class ListItem extends React.Component {
  constructor(props) {
    super(props); 

    this.state = {
      showDescription: false

      //idk what else goes here
    };
  }

  render() {
    return (
      <tr onClick={() => this.setState({showDescription: !this.showDescription})}>
        <td className="item-name">{this.props.item.name}</td>
        {this.state.showDescription ? <td className="item.description">{this.props.item.description}</td> : null}
      </tr>
    )
  }
}

ListItem.propTypes= {
  item: React.PropTypes.object.isRequired
}

//window.listItem = listItem; 
export default ListItem;
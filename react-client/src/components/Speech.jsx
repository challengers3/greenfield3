import React from 'react';
import annyang from 'cdnjs.cloudflare.com/ajax/libs/annyang/2.6.0/annyang.min.js';

const Speech = (props) => {
  if (annyang) {
    const commands = {
      'show me *tag': props.onSearch(tag),
    };
    annyang.addCommands(commands);
    annyang.start();
  }
}

export default Speech;

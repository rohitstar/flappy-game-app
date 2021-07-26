import React from 'react';
import {View, Image} from 'react-native';

const Bird = ({birdBottom, birdLeft}) => {
  const birdWidth = 80;
  const birdHeight = 50;
  // const birdWidthLeft = birdWidth / 2;
  // const birdHeightLeft = birdHeight / 2;

  // console.log(birdLeft - birdWidth / 2);
  // console.log(birdBottom - birdHeight / 2);

  return (
    <Image
      style={{
        position: 'absolute',
        // backgroundColor: 'red',
        width: birdWidth,
        height: birdHeight,
        left: birdLeft - birdWidth / 2,
        bottom: birdBottom - birdHeight / 2,
      }}
      source={require('./flappy.png')}
    />
  );
};

export default Bird;

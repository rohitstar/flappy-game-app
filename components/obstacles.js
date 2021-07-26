import React from 'react';
import {Image} from 'react-native';

const Obstacles = ({
  color,
  obstaclesLeft,
  obstaclesWidth,
  obstaclesHeight,
  gap,
  rendomBottom,
}) => {
  return (
    <>
      <Image
        style={{
          position: 'absolute',
          //   backgroundColor: color,
          width: obstaclesWidth,
          height: obstaclesHeight,
          left: obstaclesLeft,
          bottom: rendomBottom + obstaclesHeight + gap,
        }}
        source={require('./top.png')}
      />

      <Image
        style={{
          position: 'absolute',
          //   backgroundColor: color,
          width: obstaclesWidth,
          height: obstaclesHeight,
          left: obstaclesLeft,
          bottom: rendomBottom,
        }}
        source={require('./bottom.png')}
      />
    </>
  );
};

export default Obstacles;

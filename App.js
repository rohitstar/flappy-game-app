import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  ImageBackground,
} from 'react-native';
import Bird from './components/Bird';
import Obstacles from './components/obstacles';
import Modal from './components/modal';

const App = () => {
  const screenHeight = Dimensions.get('screen').height;
  const screenWidth = Dimensions.get('screen').width;
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth);
  const [obstaclesLeftSec, setObstaclesLeftSec] = useState(
    screenWidth + screenWidth / 2 + 30,
  );
  const [score, setScore] = useState(0);
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2);
  const [obstaclesNegHeight, setObstaclesNegHeight] = useState(0);
  const [obstaclesNegHeightSec, setObstaclesNegHeightSec] = useState(0);
  const birdLeft = screenWidth / 2;
  const gravity = 3;
  const obstaclesWidth = 80;
  const obstaclesHeight = 300;
  const gap = 200;
  let gameTimeId;
  let obstaclesLeftTimeId;
  let obstaclesLeftTimeIdSec;
  const [isGameOver, setIsGameOver] = useState(false);
  // const [playAgain, setPlayAgain] = useState()

  // console.log(screenHeight);
  // console.log(screenWidth);
  // console.log(birdLeft);
  // console.log(birdBottom);

  useEffect(() => {
    if (birdBottom > 0) {
      gameTimeId = setInterval(() => {
        setBirdBottom(birdBottom => birdBottom - gravity);
      }, 20);
      return () => {
        clearInterval(gameTimeId);
      };
    }
  }, [birdBottom]);
  console.log(birdBottom);

  const jumping = () => {
    if (!isGameOver && birdBottom < screenHeight) {
      setBirdBottom(birdBottom => birdBottom + 50);
      console.log('jumped');
    }
  };

  // start first obstacle

  useEffect(() => {
    if (obstaclesLeft > -obstaclesWidth) {
      obstaclesLeftTimeId = setInterval(() => {
        setObstaclesLeft(obstaclesLeft => obstaclesLeft - 5);
      }, 30);
      return () => {
        clearInterval(obstaclesLeftTimeId);
      };
    } else {
      setObstaclesLeft(screenWidth);
      setObstaclesNegHeight(-Math.random() * 100);
      setScore(score => score + 1);
    }
  }, [obstaclesLeft]);
  // console.log(obstaclesLeft);

  // start second obstacle

  useEffect(() => {
    if (obstaclesLeftSec > -obstaclesWidth) {
      obstaclesLeftTimeIdSec = setInterval(() => {
        setObstaclesLeftSec(obstaclesLeftSec => obstaclesLeftSec - 5);
      }, 30);
      return () => {
        clearInterval(obstaclesLeftTimeIdSec);
      };
    } else {
      setObstaclesLeftSec(screenWidth);
      setObstaclesNegHeightSec(-Math.random() * 100);
      setScore(score => score + 1);
    }
  }, [obstaclesLeftSec]);
  // console.log(obstaclesLeftSec);

  // birdBottom < obstaclesNegHeight + obstaclesHeight + 30 ||
  // (birdBottom > obstaclesNegHeight + obstaclesHeight + gap - 30 &&
  //   obstaclesLeft > screenWidth / 2 - 30 &&
  //   obstaclesLeft < screenWidth / 2 + 30) ||
  // birdBottom < obstaclesNegHeightSec + obstaclesHeight + 30 ||
  // (birdBottom > obstaclesNegHeightSec + obstaclesHeight + gap - 30 &&
  //   obstaclesLeftSec > screenWidth / 2 - 30 &&
  //   obstaclesLeftSec < screenWidth / 2 + 30)

  //check for colletion

  useEffect(() => {
    if (
      birdBottom < obstaclesNegHeight + obstaclesHeight + 30 ||
      (birdBottom > obstaclesNegHeight + obstaclesHeight + gap - 30 &&
        obstaclesLeft > screenWidth / 2 - 30 &&
        obstaclesLeft < screenWidth / 2 + 30) ||
      birdBottom < obstaclesNegHeightSec + obstaclesHeight + 30 ||
      (birdBottom > obstaclesNegHeightSec + obstaclesHeight + gap - 30 &&
        obstaclesLeftSec > screenWidth / 2 - 30 &&
        obstaclesLeftSec < screenWidth / 2 + 30)
    ) {
      console.log('Game Over');
      gameOver();
    } else {
      console.log('Play');

      playAgain();
    }
  });

  const gameOver = () => {
    clearInterval(gameTimeId);
    clearInterval(obstaclesLeftTimeId);
    clearInterval(obstaclesLeftTimeIdSec);
    setIsGameOver(true);
  };

  const playAgain = () => {};

  return (
    <>
      <TouchableWithoutFeedback onPress={jumping}>
        {/* <View > */}
        <ImageBackground
          style={styles.container}
          source={require('./components/images.jpeg')}
          resizeMode="cover">
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              position: 'absolute',
              top: 20,
              left: 150,
              zIndex: 1,
            }}>
            Score : {score}
          </Text>
          {isGameOver && <Modal score={score} isGameOver={isGameOver} />}
          <Bird birdBottom={birdBottom} birdLeft={birdLeft} />

          <Obstacles
            obstaclesLeft={obstaclesLeft}
            obstaclesWidth={obstaclesWidth}
            obstaclesHeight={obstaclesHeight}
            gap={gap}
            rendomBottom={obstaclesNegHeight}
            color={'green'}
          />

          <Obstacles
            obstaclesLeft={obstaclesLeftSec}
            obstaclesWidth={obstaclesWidth}
            obstaclesHeight={obstaclesHeight}
            rendomBottom={obstaclesNegHeightSec}
            gap={gap}
            color={'yellow'}
          />
        </ImageBackground>
        {/* </View> */}
      </TouchableWithoutFeedback>
    </>
  );
};

// (obstaclesLeft > screenWidth / 2 - 30 &&
//   obstaclesLeft < screenWidth / 2 + 30 &&
//   birdBottom < obstaclesNegHeight + obstaclesHeight + 30) ||
// birdBottom > obstaclesNegHeight + obstaclesHeight + gap - 30 ||
// (obstaclesLeftSec > screenWidth / 2 - 30 &&
//   obstaclesLeftSec < screenWidth / 2 + 30 &&
//   birdBottom < obstaclesNegHeightSec + obstaclesHeight + 30) ||
// birdBottom > obstaclesNegHeightSec + obstaclesHeight + gap - 30

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;

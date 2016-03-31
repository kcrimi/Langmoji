/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';
var {width, height} = require('Dimensions').get('window');

class AlphaGame extends Component {
  render() {
    return (
      <View style={ styles.container }>
        <View style={ styles.tile }>
          <Text style={ styles.letter }> A </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#644B62',
  },
  tile: {
    width: 100,
    height: 100,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BEE1D2'
  },
  letter: {
    color: '#333333',
    fontSize: 80,
  },
});

module.exports = AlphaGame;

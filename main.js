/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  Component,
  StyleSheet,
  View
} from 'react-native';
import BoardView from './components/BoardView.js';

class AlphaGame extends Component {
  render() {
    return (
      <View style={ styles.container }>
        <BoardView/>
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
});

module.exports = AlphaGame;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  Component,
  StyleSheet,
  View
} from 'react-native';
import Firebase from 'firebase';
import BoardView from './components/BoardView.js';
import ActionButton from './components/ActionButton.js';
const WAVE_SIZE = 16;

class Langmoji extends Component {

  constructor(props) {
    super(props);
    this.dataRef = new Firebase("<https://langmoji.firebaseio.com/lessons/basic");
    this.state = {
      dataSource: [],
      score: 0,
    }
  }

  render() {
    return (
      <View style={ styles.container }>
        <BoardView 
          activeIcons={ this.state.dataSource }/>
      </View>
    );
  }

  componentDidMount() {
    this.listenForData(this.dataRef);
  }

  listenForData(dataRef) {
    dataRef.on('value', (snap) => {
      var data = [];
      snap.forEach((child) => {
        data.push({ 
          emoji:child.val().emoji, 
          description: child.val().description,
          tags: child.val().tags,
          _key: child.key(),
        })
      });
      this.setState({
        dataSource: this.shuffleData(data),
      })
    });
  }

  shuffleData(dataArray) {
    var i = 0;
    var j = 0;
    var temp = null;

    for (i = dataArray.length -1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = dataArray[i]
      dataArray[i] = dataArray[j];
      dataArray[j] = temp;
    } 
    return dataArray; 
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

module.exports = Langmoji;

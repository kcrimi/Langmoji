/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  Component,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Firebase from 'firebase';
import BoardView from './components/BoardView.js';
import ActionButton from './components/ActionButton.js';
import ClueText from './components/ClueText.js';
const WAVE_SIZE = 16;

class Langmoji extends Component {

  constructor(props) {
    super(props);
    this.dataRef = new Firebase("<https://langmoji.firebaseio.com/lessons/basic");
    this.state = {
      dataSource: [],
      activeData: [],
      score: 0,
      currentItem: null,
    }
  }

  render() {
    if (false) {
      var selectedItem = {emoji:'K', description: "This is a test item"};
      return (
        <View style={ styles.container }>
        </View>
        );
    } 

    return (
      <View style={ styles.container }>
        <View style={ styles.score }>
          <Text style= { styles.scoreText }>Score: { this.state.score }</Text>
        </View>
        <BoardView 
          activeIcons={ this.state.activeData}
          tileClickCallback={this.checkTileClick.bind(this)}/>
        <ClueText selectItem={ this.state.activeData[this.state.currentItem] }/>
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
        if (child.val().hasOwnProperty('emoji') && child.val().hasOwnProperty('description')) {
          data.push({ 
            emoji:child.val().emoji, 
            description: child.val().description,
            tags: child.val().tags,
            _key: child.key(),
          })
        } else {
          // Data cleanse missing data
          this.dataRef.child(child.key()).remove();
        }
        
      });
      data = this.shuffleData(data)
      this.setState({
        dataSource: data,
        activeData: data.slice(0, WAVE_SIZE + 1),
        currentItem: this.selectCurrentItem(),
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

  selectCurrentItem() {
    return Math.floor(Math.random() * WAVE_SIZE);
  }

  checkTileClick(id) {
    if (id == this.state.currentItem) {
      this.state.activeData[id] = this.state.dataSource[WAVE_SIZE+this.state.score];
      this.state.score++;
      this.setState({
        currentItem: this.selectCurrentItem(),
      })
      console.log("CORRECT!");
    } else {
      console.log("wrong tile");
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0066cc',
  },
  score: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 50,
    color: '#ffad33',
  },
});

module.exports = Langmoji;

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
    this.dataRef = new Firebase("<https://langmoji.firebaseio.com/lessons/0");
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

  loadData() {
    console.log("loading data");
    const EMOJI_DATA = require('./assets/emoji-pack.json');
    var lesson = -1;
    var item = 0;
    for (element in EMOJI_DATA) {
      if (EMOJI_DATA[element].hasOwnProperty('emoji') 
        && EMOJI_DATA[element].hasOwnProperty('description')) {
        if (item % 30 == 0) {
          lesson++;
          console.log("lesson "+lesson);
          var firepush = new Firebase("<https://langmoji.firebaseio.com/lessons/"+lesson);
        }
        firepush.push({
          emoji: EMOJI_DATA[element].emoji,
          description: EMOJI_DATA[element].description,
          tags: EMOJI_DATA[element].tags,
        })
      item++;
      }
    }
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
    var choice = Math.floor(Math.random() * WAVE_SIZE);
    while (this.state.activeData.length != 0
      && this.state.activeData[choice].hasOwnProperty('completed')) {
      choice = Math.floor(Math.random() * WAVE_SIZE);
    }
    return choice;
  }

  checkTileClick(id) {
    if (id == this.state.currentItem) {
      if (WAVE_SIZE+this.state.score < this.state.dataSource.length){
        this.state.activeData[id] = this.state.dataSource[WAVE_SIZE+this.state.score];
      } else {
        this.state.activeData[id] = {emoji: "", description: "LEVEL COMPLETE!", completed: true};
      }
      this.state.score++;
      if (this.state.score == this.state.dataSource.length){
        this.setState({
          currentItem: this.state.currentItem,
        })
      } else {
        this.setState({
          currentItem: this.selectCurrentItem(),
        })
      }
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

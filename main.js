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

class AlphaGame extends Component {

  constructor(props) {
    super(props);
    this.dataRef = new Firebase("<https://langmoji.firebaseio.com/lessons/basic");
    this.state = {
      dataSource: [],
    }
  }

  render() {
    return (
      <View style={ styles.container }>
        <BoardView activeIcons={ this.state.dataSource }/>
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
        dataSource: data,
      })
    });
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

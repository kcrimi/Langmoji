import React, {
  Component,
  StyleSheet,
  View,
  Text
} from 'react-native';

class ClueText extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		var text = this.props.selectItem != null ? this.props.selectItem.description : "";
		return (
		<View style={ styles.container }>
          <Text style={ styles.clueText }>{ text }</Text>
        </View>
        )
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clueText : {
  	fontSize: 30,
  	color: '#FFFFFF',
  }
});

module.exports = ClueText;
'use strict'

import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
var {width, height} = require('Dimensions').get('window');
const GRID_SIZE = 4;
const CELL_SIZE = Math.floor(width * .2);
const CELL_PADDING = Math.floor(CELL_SIZE * .05);
const BORDER_RADIUS = CELL_PADDING * 2;
const TILE_SIZE = CELL_SIZE - CELL_PADDING * 2;
const LETTER_SIZE = Math.floor(TILE_SIZE * .85);

class BoardView extends Component {

	render() {
		return (
			<View style = {styles.container}>
				{this.renderTiles()}
			</View>
		);
	}

	renderTiles() {
		var result = [];
		for (var row = 0; row < GRID_SIZE; row++) {
			for (var col = 0; col < GRID_SIZE; col++) {
				var key = row * GRID_SIZE + col;
				var letter = String.fromCharCode(65 + key);
				var position = {
					left: col * CELL_SIZE + CELL_PADDING,
					top: row * CELL_SIZE + CELL_PADDING,
				};
				result.push(this.renderTile(key, position, letter));
			}
		}
		return result;
	}

	renderTile(id, position, letter){
		return (
			<View key={id} style={ [styles.tile, position] }
				onStartShouldSetResponder={() => this.clickTile(id)}>
				<Text style={ styles.letter }> { letter } </Text>
			</View>
		);
	}

	clickTile(id) {
		console.log(id);
	}
}

const styles = StyleSheet.create({
	container: {
		width: CELL_SIZE * GRID_SIZE,
		height: CELL_SIZE * GRID_SIZE,
		backgroundColor: 'transparent',
	},
	tile: {
		position: 'absolute',
		paddingTop: CELL_PADDING * 2,
		width: TILE_SIZE,
		height: TILE_SIZE,
		borderRadius: BORDER_RADIUS,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#BEE1D2'
	},
	letter: {
		fontFamily: 'Serto Urhoy',
		color: '#333',
		fontSize: LETTER_SIZE,
		backgroundColor: 'transparent',
	},
});

module.exports = BoardView;
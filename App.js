
/*

Class 66 - Ternary Operator Monkey Chunky Stage 4

Goals:
● Learn about ternary operators.
● Use ternary operators to conditionally render different styles
to the user.
● Fix case issue in the application.

*/

import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Header } from 'react-native-elements';
import db from './localdb';
import PhonicSoundButton from './components/PhonicSoundButton';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      CompleteWord: '',
      DisplayCompleteWord: '',
      WordChunks: [],
      PhonicSounds: [],
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#9c8210'}
          centerComponent={{
            text: 'Monkey Chunky',
            style: { color: '#fff', fontSize: 20 },
          }}
        />

        <Image
          style={styles.imageIcon}
          source={{
            uri:
              'https://www.shareicon.net/data/128x128/2015/08/06/80805_face_512x512.png',
          }}
        />

        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({ CompleteWord: text });
          }}
          value={this.state.CompleteWord}
        />
        <TouchableOpacity
          style={styles.goButton}
          onPress={() => {
            console.log('this.state.CompleteWord: ' + this.state.CompleteWord);
            var word = this.state.CompleteWord.toLowerCase().trim();
            db[word]
              ? (this.setState({ WordChunks: db[word].chunks }),
                this.setState({ PhonicSounds: db[word].phones }))
              : alert('The word does not exist in our database');
          }}>
          <Text style={styles.buttonText}>GO</Text>
        </TouchableOpacity>
        <View>
          {this.state.WordChunks.map((item, index) => {
            return (
              <PhonicSoundButton
                wordChunk={this.state.WordChunks[index]}
                soundChunk={this.state.PhonicSounds[index]}
                buttonIndex={index}
              />
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b8b8b8',
  },
  inputBox: {
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
  goButton: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  imageIcon: {
    width: 150,
    height: 150,
    marginLeft: 95,
  },
});

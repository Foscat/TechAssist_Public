// 3rd party imports 
import React, { Component } from 'react'
import { 
  KeyboardAvoidingView, View, ScrollView,
  StyleSheet, Button, Keyboard
} from 'react-native';
import Voice from 'react-native-voice';
import Tts from 'react-native-tts';

// Custom imports
import BotMessage from '../../parts/botParts/BotMessage';
import UserMessage from '../../parts/botParts/UserMessage';
import Header from '../../parts/botParts/Header';
import InputText from '../../parts/botParts/InputText';
import appConfig from '../../../config';
import Parser from '../../../instructions/logic/Parser';
const fileSwitch = require("../../../instructions/logic/FileSwitch");

class ChatScreen extends Component {

  constructor(props) {
    super(props);
    
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechRecognized = this.onSpeechRecognized;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;

    this.sendMessage = this.sendMessage.bind(this);
    this.state = {
      instructions: ["Doin ya mom!","every fucking day", "get money fuck bitches"],
      // Voice state atters
      recognized: '',
      pitch: '',
      error: '',
      end: '',
      started: '',
      results: [],
      partialResults: [],
      // button type and function switcher
      talking: false,

      // chatbot state atters 
      text: null,
      messages: [{
        message: appConfig.bot.initMessage,
        datetime: new Date().toLocaleString()
      }],
      stepNum:0,
      endOfSteps: "false"
    };
  }

  componentDidMount(){
    // Tts.voices().then(voices => console.log(voices));
    Tts.setDefaultRate(0.8);
  }

  componentDidUpdate(){
    console.log("Da state", this.state);
  }

  // When component unmounts clear all listening functions
  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  // Chatbot input and output logic 

    // when the input text bar is changed update the state
    textChange = text => {
      let state = this.state;
      state.text = text;
      this.setState(state);
    }

    // When a user submits a command is changes state and fires the submit message function
    submitText = event => {
      if (this.state.text) {
        console.log('send message', this.state.text)
        this.updateMessages({
          userMessage: true,
          message: this.state.text,
          datetime: new Date().toLocaleString()
        });
        this.sendMessage(this.state.text);

        let state = this.state;
        state.text = "";
        this.setState(state);
      }
    }

    parseIt = async fileName => {
      let runParser = await Parser.print(fileName);
      return runParser;
    }

    // Actually sends the message to lex
    sendMessage = (message) => {

      console.log("TCL: ChatScreen -> sendMessage -> message", message);
      // When a message is sent close keyboard
      Keyboard.dismiss();

      let AWS = require('aws-sdk/dist/aws-sdk-react-native');

      AWS.config.credentials = {
        "accessKeyId": appConfig.accessKeyId,
        "secretAccessKey": appConfig.secretAccessKey,
        "region": appConfig.region
      };
      AWS.config.update({region: 'us-east-1'});

      let lexruntime = new AWS.LexRuntime({
        apiVersion: appConfig.apiVersion,
      });

      console.log(this.state.messages);

      // Feed lex specific bot params
      let params = {
        botAlias: appConfig.botAlias, /* required */
        botName: appConfig.botName, /* required */
        inputText: message, /* required */
        userId: appConfig.userId, /* required */
        // Must have session attributes or function will not go through
        sessionAttributes: {
          // Send in string from instruction array since lex can only recive strings this is why the step is converted to a string before sending
          message: this.state.instructions[this.state.stepNum],
          msgEnd: this.state.endOfSteps
        }
      };
      console.log("TCL: ChatScreen -> sendMessage -> params.sessionAttributes", params.sessionAttributes);

      // Post text handles text and ssml inputs
      lexruntime.postText(params, (err, data) => {

        console.log("TCL: ChatScreen -> sendMessage -> data", data);

        if (err) console.log(err, err.stack);
        else {
          if(data.dialogState === "Fulfilled" && data.intentName === "fileFinder"){

            const fileType = data.slots.fileType;console.log("File type slot", fileType);
            const fileDescription = data.slots.fileDescription;console.log("File description slot", fileDescription);

            let fileName="";

            if(fileType === "Bulletin"){
              fileName = fileSwitch("sb", fileDescription)
            }
            console.log("Complete file name", fileName);

            // this.parseIt(fileName).then(console.log("Parser called"));
            if(fileName === "sberror"){
              this.setState({ instructions: ["Your file search did not work"] });
            }
            else{
              fetch(`https://sleepy-headland-90094.herokuapp.com/api/parseXml/${fileName}`)
              .then(res => res.json())
              .then(steps => {
                console.log("**_Returned step info_**", steps);
                this.setState({ instructions: steps.stepArray });
              })
            }
          }

          if (data.dialogState === "ReadyForFulfillment") {
            data.message = appConfig.bot.completeMessage;
          }
          data.datetime = new Date().toLocaleString();
          this.updateMessages(data);
        }
      });
    }

    // Updates the messages log in the state
    updateMessages = (message) => {
      console.log("TCL: ChatScreen -> updateMessages -> message", message);
      // If the message is not from the user call text to speech method
      if(!message.hasOwnProperty("userMessage")){ 
        Tts.speak(message.message);
        if(message.sessionAttributes.hasOwnProperty("currentStep")){
          let incomingStep = parseInt(message.sessionAttributes.currentStep);
          console.log("////////////////////// Updating step number in state", incomingStep);
          this.setState({ stepNum: incomingStep});
          // message.sessionAttributes.currentStep +=1;
          if(this.state.stepNum >= this.state.instructions.length){
            this.setState({ endOfSteps: "true"  });
          }
        }
        else console.log("no current step session atters");

      }
      
      let state = this.state;
      state.messages = state.messages.concat(message);
      this.setState(state);
    }

  // Voice command functions
    onSpeechStart = e => this.setState({started: '√'});
    onSpeechRecognized = e => this.setState({recognized: '√'});
    onSpeechEnd = e => this.setState({end: '√'});
    onSpeechError = e => this.setState({error: JSON.stringify(e.error)});
    onSpeechPartialResults = e => this.setState({partialResults: e.value});
    onSpeechVolumeChanged = e => this.setState({pitch: e.value});
  
    onSpeechResults = e => {
      console.log('onSpeechResults: ', e);
      this.setState({ results: e.value});
      this.textChange(this.state.results[0]);
      this.submitText();
    };
  
    _startRecognizing = async () => {
      this.setState({recognized: '', pitch: '',error: '', started: '', results: [], partialResults: [], end: '', talking: true});
      try {await Voice.start('en-US');} catch (e) {console.error(e);}
    };
  
    _stopRecognizing = async () => {
      this.setState({ talking:false  });
      try { await Voice.stop(); } catch (e) {console.error(e);}
      console.log("Stop recording:", this.state)
    };
  
    _cancelRecognizing = async () => {
      try { await Voice.cancel(); } catch (e) { console.error(e);}
    };
  
    _destroyRecognizer = async () => {
      try { await Voice.destroy();} catch (e) {console.error(e);}
      this.setState({recognized: '', pitch: '', error: '', end: '',started: '', results: [], partialResults: [],});
    };

  render() {
    
    let voicebutton;
    if(!this.state.talking) voicebutton = <Button title="start" color="green" onPress={this._startRecognizing} /> 
    else voicebutton=<Button title="stop" color="red" onPress={this._stopRecognizing} /> 

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">

        <View style={styles.nav}/>

        <Header title={appConfig.bot.name}/>

        <ScrollView>

          <View style={styles.messageArea}>
              {
                this.state.messages.map((obj, key) => {
                  // console.log(this.state.messages);
                  if (obj.userMessage) {
                      return <UserMessage message={obj.message} datetime={obj.datetime} key={key}/>
                  } 
                  else {
                      return <BotMessage message={obj.message} datetime={obj.datetime} key={key}/>
                  }
                })
              }
          </View>

        </ScrollView>

        <View style={styles.buttonContainer}>

          <InputText 
            onChangeText={this.textChange}
            submitText={this.submitText}
            value={this.state.text}
          />

          {voicebutton}

        </View>

      </KeyboardAvoidingView>
    ); // End return
  } // End render
}; // End class

const styles = StyleSheet.create({
  nav: {
    height: 21,
    backgroundColor: 'black'
  },
  container: {
    flex: 1
  },
  messageArea: {
    flex: 1,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default ChatScreen;
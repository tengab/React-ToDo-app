import React, {Component} from 'react';
import TextField from 'material-ui/TextField'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

const style = {

    margin: 20,
    textAlign: 'center',

};

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
            <div>
                <Paper style={style} zDepth={5}>
                    <h1>React ToDo List</h1>
                <TextField
                    text
                    hintText="Type here"
                    floatingLabelText="Please type your task"
                    fullWidth={true}
                /><br />
                </Paper>
                <Paper style={style} zDepth={3}>
                <RaisedButton
                    label="ADD TASK"
                    fullWidth={true}
                    primary={true}
                />

                </Paper>

            </div>
            </MuiThemeProvider>
        )


    }
}

export default App;

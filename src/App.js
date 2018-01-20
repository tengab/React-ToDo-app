import React, {Component} from 'react';
import TextField from 'material-ui/TextField'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import ActionInfo from 'material-ui/svg-icons/action/info';
import {List, ListItem} from 'material-ui/List';
import ActionDelete from 'material-ui/svg-icons/action/delete'
import {database} from './firebase'

const style = {
    margin: 20,
    textAlign: 'center',
};

const Task = (props) => {
    return <ListItem
        primaryText={props.taskName}
        rightIcon={
            <ActionDelete
                onClick={() => props.deleteTask(props.taskId)}
            />}
            leftIcon={
                <ActionInfo
            onClick={() => props.crossTask(props.taskId)}
            />
        }
    />
}


class App extends Component {


    componentWillMount = () => {
        database.ref('/homeworkTaskList')
            .on('value', (snapshot) => {
                console.log(snapshot.val())
            })
    }

    addTask = () => {
        alert('ADD TASK')
    }

    deleteTask = () => {
        alert('DELETE TASK')
    }
    crossTask = () => {
        alert('CROSS TASK')
    }

    render() {
        return (
            <MuiThemeProvider>
                <Paper style={style} zDepth={3}>
                    <h1>React ToDo List</h1>
                    <TextField
                        hintText={"Type here"}
                        floatingLabelText={"Please type your task"}
                        fullWidth={true}
                    />
                    <RaisedButton
                        label={"ADD TASK"}
                        fullWidth={true}
                        primary={true}
                        onClick={() => {
                            this.addTask()
                        }}
                    />
                    <List>
                        <Task
                            taskName={'Pierwszy task'}
                            taskId={0}
                            deleteTask={() => {
                                this.deleteTask()
                            }}
                            crossTask={()=> {
                                this.crossTask()
                            }}
                        />
                        <Task
                            taskName={'drugi task'}
                            taskId={0}
                            deleteTask={() => {this.deleteTask()}}
                            crossTask={()=> {this.crossTask()
                            }}
                        />
                    </List>
                </Paper>
            </MuiThemeProvider>
        )
    }
}

export default App;

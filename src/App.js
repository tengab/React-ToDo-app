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
}

const Task = (props) => (
    <ListItem
        primaryText={props.taskName}
        rightIcon={
            <ActionDelete
                onClick={() => props.deleteTask(props.taskId)}
            />
        }
        leftIcon={
            <ActionInfo
                onClick={() => props.crossTask(props.taskId)}
            />
        }
    />
)


class App extends Component {
    state = {
        tasks: null,
        newTaskName: '',
        doneTask: ''
    }

    componentWillMount = () => {
        database.ref('/homeworkTaskList')
            .on('value', (snapshot) => {
                const mappedObjectEntries =
                    Object.entries(
                        snapshot.val() || {}
                    )
                        .map(([key, value]) => {
                            value.key = key
                            return value

                        })
                this.setState({
                    tasks: mappedObjectEntries
                })
            })

    }

    addTask = () => {
        if (!this.state.newTaskName){
            alert('Ogarnij się, do zrobienia musi być COŚ')
            return
        }
        database.ref('/homeworkTaskList')
            .push({
                name: this.state.newTaskName,
                done: false
            })
        this.setState({
            newTaskName: ''
        })
    }


    deleteTask = (taskId) => {

        database.ref(`/homeworkTaskList/${taskId}`).remove()
    }
    crossTask = (taskId) => {
        database.ref(`/homeworkTaskList/${taskId}`)
            .set({name: 'DUPAKA',
                done: true})
            this.setState()
                       }

    render() {
        return (
            <MuiThemeProvider>
                <Paper style={style} zDepth={3}>
                    <h1>React ToDo List</h1>
                    <TextField
                        value={this.state.newTaskName}
                        onChange={(event, value) => this.setState({newTaskName: value})}
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
                        {this.state.tasks
                        &&
                        this.state.tasks.map((task) => (
                            <Task
                                key={task.key}
                                taskName={task.name}
                                taskId={task.key}
                                deleteTask={this.deleteTask}
                                crossTask={this.crossTask}
                            />
                        ))
                        }
                    </List>
                </Paper>
            </MuiThemeProvider>
        )
    }
}

export default App;

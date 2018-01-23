import React, {Component} from 'react';
import TextField from 'material-ui/TextField'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import ActionInfo from 'material-ui/svg-icons/action/info';
import {List, ListItem} from 'material-ui/List';
import ActionDelete from 'material-ui/svg-icons/action/delete'
import {database} from './firebase'
import {Card, CardHeader, CardText} from 'material-ui/Card';

const style = {
    margin: 10,
    padding: 10,
    textAlign: 'center',
}
const Task = (props) => (
    <ListItem
        primaryText={props.taskName}
        style={
            {
                textDecoration: props.taskDec,
            }}


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
        taskSearch: '',
        checked: '',
        newTaskName: '',
        group: 'ALL TASKS'
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
                    tasks: mappedObjectEntries,
                    group: 'ALL TASKS'
                })
            })
    }
    addTask = () => {
        if (!this.state.newTaskName) {
            alert('This cannot be empty. Type smth')
            return
        }
        database.ref('/homeworkTaskList')
            .push({
                name: this.state.newTaskName,
                done: false
            })
        this.setState({
            newTaskName: '',
            checked: ''
        })
    }
    deleteTask = (taskId) => {
        database.ref(`/homeworkTaskList/${taskId}`).remove()
    }
    crossTask = (taskId,) => {
        database.ref(`/homeworkTaskList/${taskId}`)
            .update({
                done: true,
            })

    }
    showDoneList = () => {
        database.ref('/homeworkTaskList')
            .on('value', (snapshot) => {
                const nameToCross = Object.entries(
                    snapshot.val() || {}
                )
                    .map(([key, value]) => {
                        value.key = key
                        return value
                    })
                    .filter((el) => {
                        if (el.done === true)
                            return el
                    })
                this.setState({
                    tasks: nameToCross,
                    group: "DONE TASKS"
                })
            })
    }
    showUndoneList = () => {

        database.ref('/homeworkTaskList')
            .on('value', (snapshot) => {
                const filteredUndoneTasks = Object.entries(
                    snapshot.val() || {}
                )
                    .map(([key, value]) => {
                        value.key = key
                        return value
                    })
                    .filter((el) => {
                        if (el.done === false)
                            return el
                    })
                this.setState({
                    tasks: filteredUndoneTasks,
                    group: 'UNDONE TASKS'
                })
            })
    }

    searchTaskName = (event, value) => {
        this.setState({taskSearch: value});

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
                    <h5>{this.state.group}</h5>
                    <List>
                        {
                            this.state.tasks
                            &&
                            this.state.tasks.map((task) => (
                                <Task
                                    key={task.key}
                                    taskName={task.name}
                                    taskId={task.key}
                                    taskDec={task.done ?
                                        'line-through'
                                        :
                                        'none'
                                    }
                                    deleteTask={this.deleteTask}
                                    crossTask={this.crossTask}
                                />
                            ))
                        }
                    </List>
                    <Paper style={{margin: 20, padding: 20}} zDepth={2}>
                        <Card>
                            <CardHeader
                                title="Find a task"
                                actAsExpander={true}
                                showExpandableButton={true}
                            />
                            <CardText expandable={true}>
                                <TextField
                                    onChange={this.searchTaskName}
                                    hintText={"Type here"}
                                    floatingLabelText={"Please type your task"}
                                    fullWidth={true}
                                />
                            </CardText>
                        </Card>
                    </Paper>
                    <RaisedButton
                        label={"SHOW LIST OF DONE"}
                        fullWidth={true}
                        primary={true}
                        onClick={() => {
                            this.showDoneList()
                        }}
                    />
                    <br/><br/>
                    <RaisedButton
                        label={"SHOW LIST OF UNDONE"}
                        fullWidth={true}
                        primary={true}
                        onClick={() => {
                            this.showUndoneList()
                        }}
                    />
                    <br/><br/>
                    <RaisedButton
                        label={"SHOW ALL"}
                        fullWidth={true}
                        primary={true}
                        onClick={() => {
                            this.componentWillMount()
                        }}
                    />
                </Paper>
            </MuiThemeProvider>
        )
    }
}

export default App;

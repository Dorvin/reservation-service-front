import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../store/actions';

class App extends Component {
    componentDidMount() {
        this.props.onGetAllMeetings();
    }

    render() {
        return (
            <div className="App">
                <h1>{this.props.login ? `login user: ${this.props.username}` : 'please login'}</h1>
                <p>username</p>
                <input value={this.props.inputUser} onChange={(e) => this.props.onChangeInputUser(e.target.value)}/>
                <p>password</p>
                <input value={this.props.inputPassword}
                       onChange={(e) => this.props.onChangeInputPassword(e.target.value)}/>
                <br/>
                <button onClick={() => {
                    this.props.onLogin({
                        username: this.props.inputUser,
                        password: this.props.inputPassword,
                    });
                    this.props.onChangeInputUser('');
                    this.props.onChangeInputPassword('');
                }}>로그인
                </button>
                <button onClick={() => this.props.onLogout()}>로그아웃</button>
                <h2>{this.props.updating ? `updating` : 'adding mode'}</h2>
                <button onClick={() => {
                    this.props.onModeAdd();
                    this.props.onChangeInputSinceWhen('');
                    this.props.onChangeInputTilWhen('');
                }}>Change To Add Mode</button>
                <p>sinceWhen</p>
                <input value={this.props.inputSinceWhen}
                       onChange={(e) => this.props.onChangeInputSinceWhen(e.target.value)}/>
                <p>tilWhen</p>
                <input value={this.props.inputTilWhen}
                       onChange={(e) => this.props.onChangeInputTilWhen(e.target.value)}/>
                <br/>
                <button onClick={() => {
                    if (this.props.updating) {
                        let previousMeeting = this.props.meetings.filter((data)=> data.id === this.props.updatingId)[0];
                        this.props.onUpdateMeeting({
                            ...previousMeeting,
                            sinceWhen: this.props.inputSinceWhen,
                            tilWhen: this.props.inputTilWhen,
                        });
                        this.props.onChangeInputSinceWhen('');
                        this.props.onChangeInputTilWhen('');
                        this.props.onModeAdd();
                    } else {
                        this.props.onAddMeeting({
                            sinceWhen: this.props.inputSinceWhen,
                            tilWhen: this.props.inputTilWhen,
                        });
                        this.props.onChangeInputSinceWhen('');
                        this.props.onChangeInputTilWhen('');
                    }
                }}>{this.props.updating ? 'update' : 'add'}
                </button>
                <p>current meetings</p>
                <ul>
                    {this.props.meetings.map((data) =>
                        (<li key={data.id} style={{color: (this.props.updatingId === data.id) ? 'red' : 'white'}}>{`since ${data.sinceWhen} until ${data.tilWhen} by ${data.user}`}<br/>
                                <button onClick={()=>{
                                    this.props.onModeUpdate(data.id);
                                    this.props.onChangeInputSinceWhen(data.sinceWhen);
                                    this.props.onChangeInputTilWhen(data.tilWhen);
                                }}>update</button>
                                <button onClick={()=>this.props.onDeleteMeeting(data.id)}>delete</button>
                                <br/><br/>
                            </li>
                        ))}
                </ul>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        meetings: state.meetings.data,
        inputSinceWhen: state.meetings.inputSinceWhen,
        inputTilWhen: state.meetings.inputTilWhen,
        login: state.auth.login,
        username: state.auth.username,
        inputUser: state.auth.inputUser,
        inputPassword: state.auth.inputPassword,
        updating: state.meetings.updating,
        updatingId: state.meetings.updatingId,
    }),
    (dispatch) => ({
        onGetAllMeetings: () => dispatch(actions.getAllMeetings()),
        onAddMeeting: (meeting) => dispatch(actions.addMeeting(meeting)),
        onDeleteMeeting: (id) => dispatch(actions.deleteMeeting(id)),
        onUpdateMeeting: (meeting) => dispatch(actions.updateMeeting(meeting)),
        onChangeInputSinceWhen: (value) => dispatch(actions.changeInputSinceWhen(value)),
        onChangeInputTilWhen: (value) => dispatch(actions.changeInputTilWhen(value)),
        onLogin: (user) => dispatch(actions.login(user)),
        onLogout: () => dispatch(actions.logout()),
        onChangeInputUser: (value) => dispatch(actions.changeInputUser(value)),
        onChangeInputPassword: (value) => dispatch(actions.changeInputPassword(value)),
        onModeUpdate: (id) => dispatch(actions.modeUpdate(id)),
        onModeAdd: () => dispatch(actions.modeAdd()),
    })
)(App);

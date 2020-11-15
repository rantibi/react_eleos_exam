import React from "react";
import ReactDOM from "react-dom";
import './App.css'

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            meetings: []
        };
    }

    componentDidMount() {
        this.listMeetings();
    }

    listMeetings() {
        fetch("http://127.0.0.1:8080/api/v1/meetings", {method: "GET"}).then(async response => {
                let res = await response.json();
                this.setState({meetings: res})
            }
        ).catch(e => {
            console.log(e)
            alert("Error while trying fetch meetings")
        });
    }

    endMeeting(meetingId) {
        fetch("http://127.0.0.1:8080/api/v1/meetings/" + meetingId + "/end", {method: "POST"}).then(async response => {
                console.log(response);
                if (response.status === 204) {
                    alert("meeting " + meetingId + " ended successfully");
                    this.listMeetings();
                }
            }
        ).catch(e => {
            console.log(e)
            alert("Error while trying to end meeting " + meetingId)
        });
    }

    render() {
        const {meetings} = this.state;
        return (
            <table style={{border: 1}}>
                <tbody>
                <tr>
                    <td>Meeting Id</td>
                    <td># of participants</td>
                    <td>End Meeting</td>
                </tr>
                {meetings.map(meeting => {
                    return (
                        <tr key={meeting.id}>
                            <td>{meeting.id}</td>
                            <td>{meeting.participants}</td>
                            <td>
                                <button
                                    onClick={() => {
                                        this.endMeeting(meeting.id);
                                    }}
                                >
                                    End
                                </button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById("container"));

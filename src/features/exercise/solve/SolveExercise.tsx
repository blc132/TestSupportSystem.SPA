import React, { Fragment } from 'react';
import { Segment, Button } from 'semantic-ui-react';
import { Controlled as CodeMirror } from 'react-codemirror2'
import './SolveExercise.css'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');

interface IProps {
    options: {
        mode: string,
    },
    code: "Hello World",

}

interface IState {
    code: string;
}

class SolveExercise extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            code: this.props.code
        };
    }

    render() {
        return (
            <Fragment>
                <Segment>
                    Treść pytania...
                </Segment>
                <Segment>
                    <CodeMirror
                        value={this.state.code}
                        options={{
                            mode: 'javascript',
                            theme: 'material',
                            lineNumbers: true,
                            smartIndent: true,
                            readOnly: false,
                        }}
                        onBeforeChange={(editor, data, value) => {
                            this.setState({ code: value });
                        }}
                        onChange={() => {
                        }}
                    />
                    <div className="send-button-div">
                        <Button
                            className="send-button"
                            positive
                            content="Wyślij">
                        </Button>
                    </div>
                </Segment>
                <Segment>
                    Wynik...
                </Segment>
            </Fragment>
        );
    };
}
export default SolveExercise;

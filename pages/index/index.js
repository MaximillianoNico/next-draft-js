import React from 'react';
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw} from 'draft-js';

class Index extends React.Component {
    constructor(props) {
      super(props)
  
      this.state = {
        editorState: EditorState.createEmpty(),
        editor: null
      }
  
      this.onChange = editorState => this.setState({ editorState })
      this._submit = this._submit.bind(this);
    }
  
    handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
          this.onChange(newState);
          return 'handled';
        }
        return 'not-handled';
      }

    componentDidMount() {
      this.setState({ editor: Editor })
    }
  
    _submit(){
        // const converter = convertToRaw(this.state.editorState)
        console.log(convertToRaw(this.state.editorState.getCurrentContent()))
    }
    render() {
      const ClientEditor = this.state.editor
      const convert__to_raw = convertToRaw(this.state.editorState.getCurrentContent());
      const convert__to_html = convertFromRaw(convert__to_raw)
      return (
        <div>
            <div>
                <h1>Next-Draft-JS</h1>
            </div>
          {
            this.state.editor ?
              <ClientEditor 
                editorState={this.state.editorState}
                handleKeyCommand={this.handleKeyCommand}
                onChange={this.onChange}
                
              /> :
              null
          }
          <button onClick={this._submit}>submit</button>
          <h4>JSON</h4>
          <pre>{JSON.stringify(convert__to_raw,undefined,2)}</pre>
          <h4>Convert To Html</h4>
          {/* <pre>{conver}</pre> */}
        </div>
      )
    }
  }

export default Index;

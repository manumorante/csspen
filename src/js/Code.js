import React from "react";
import hljs from 'highlight.js/lib/highlight';
import css from 'highlight.js/lib/languages/css';
hljs.registerLanguage('css', css);
import 'highlight.js/styles/atom-one-dark.css';

export class Code extends React.Component {
    constructor(props) {
        super(props);
        this.myCode = React.createRef();
    }

    myEditStep(e) {
        this.props.editStep(e.target.textContent);
    }

    componentDidMount(){
        hljs.highlightBlock(this.myCode.current);
    }

    componentDidUpdate(){
        hljs.highlightBlock(this.myCode.current);
    }

    render() {
        return (
            <pre>
            <code
                ref={this.myCode}
                className="code css"
                contentEditable="true"
                onBlur={(e) => { this.myEditStep(e) }}
                suppressContentEditableWarning="true"
                autoCorrect="off"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck="false">{this.props.css}</code>
                </pre>
        );
    }
}

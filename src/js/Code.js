import React from "react";

export class Code extends React.Component {
    editStep(e) {
        console.log(e.target.textContent);
    }
    render() {
        return (
            <code
                className="code"
                contentEditable="true"
                onInput={(e) => { this.editStep(e) }}
                suppressContentEditableWarning="true"
                autoCorrect="off"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck="false">{this.props.css}</code>
        );
    }
}

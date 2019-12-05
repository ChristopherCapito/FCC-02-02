import React, { useState, useEffect } from 'react';
import './App.css';
import { Container, Row, Col, FormGroup, FormControl } from 'react-bootstrap';
import marked from 'marked';
//import htmlParser from 'html-react-parser';
import DOMpurify from 'dompurify';

//#region Inital Markdown
const initialText = `
# Welcome to my React Markdown Previewer!

## This is a sub-heading...

### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and

> Block Quotes!

And if you want to get really crazy, even tables:

| Wild Header      | Crazy Header    | Another Header?    |
| ---------------- | --------------- | ------------------ |
| Your content can | be here, and it | can be here....    |
| And here.        | Okay.           | I think we get it. |

- And of course there are lists.
  - Some are bulleted.
    - With different indentation levels.
      - That look like this.

1. And there are numbererd lists too.
1. Use just 1s if you want!
1. But the list goes on...

- Even if you use dashes or asterisks.

* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)`;
//#endregion

// Main
function App() {
  const [textInput, setTextInput] = useState('');
  const [htmlOutput, setHtmlOutput] = useState();

  //Watch for text change and convert
  useEffect(() => {
    setHtmlOutput(mdToHtml(textInput));
  }, [textInput]);

  //On Load set some markdown
  useEffect(() => {
    setTextInput(initialText);
    setHtmlOutput(mdToHtml(textInput));
  }, []);

  //Convert markdown to html
  const mdToHtml = text =>
    DOMpurify.sanitize(
      marked(text, {
        //MarkedJS Options
        breaks: true
      })
    );

  const insertTab = event => {
    if (event.key == 'Tab') {
      event.preventDefault();
      let index = event.target.selectionStart;
      console.log('Tabbed');
      console.log(index);
      let editorText = event.target.value;
      let start = editorText.slice(0, index);
      let end = editorText.slice(index);
      
      event.target.value=`${start}&emsp;${end}`;
      event.target.selectionEnd = event.target.selectionEnd + 1;
    }
  };

  return (
    <div className='App'>
      <Container fluid='true'>
        <Row id='flexContainer' style={{ minHeight: '100vh' }}>
          <Col id='markdownEditor'>
            <FormGroup>
              <FormControl
                id='editor'
                as='textarea'
                onKeyDown={event => insertTab(event)}
                onChange={event => setTextInput(event.target.value)}
                bsPrefix={'markdownEditorText'}
                defaultValue={initialText}
              />
            </FormGroup>
          </Col>
          <Col
            id='preview'
            className='htmlOutputCol'
            dangerouslySetInnerHTML={{ __html: htmlOutput }}
          ></Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;

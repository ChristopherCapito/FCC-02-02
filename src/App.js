import React, { useState } from 'react';
import './App.css';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl
} from 'react-bootstrap';
import marked from 'marked';
import htmlParser from 'html-react-parser';

function App() {
  const [textInput, setTextInput] = useState('');
  const [htmlOutput, setHtmlOutput] = useState();

  let somevar = React.createRef();

  const handleChange = event => {
    setTextInput(somevar.current.value);
    let markdown = marked(textInput);
    let htmlIntermediate = htmlParser(markdown);
    setHtmlOutput(htmlIntermediate);
  };

  const add = (event) => console.log(event.keyCode)

  return (
    <div className='App'>
      <Container fluid='true'>
        <Row style={{ minHeight: '100vh' }}>
          <Col md={6} className='markdownEditor'>
            <FormGroup controlId='markdownEditorField'>
              <FormControl
                as='textarea'
                ref={somevar}            
                onChange={() => handleChange()}
                bsPrefix={'markdownEditorText'}
              />
            </FormGroup>
          </Col>
          <Col>{htmlOutput}</Col>
        </Row>
      </Container>
    </div>
  );
}


export default App;

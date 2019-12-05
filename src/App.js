import React, { useState, useEffect } from 'react';
import './App.css';
import { Container, Row, Col, FormGroup, FormControl } from 'react-bootstrap';
import marked from 'marked';
import htmlParser from 'html-react-parser';
import DOMpurify from 'dompurify';

// Main
function App() {
  const [textInput, setTextInput] = useState('');
  const [htmlOutput, setHtmlOutput] = useState();

  useEffect(() => {
    /** SET HTML OUTPUT FOR PREVIEW
     * This function chain returns the html-parsed, sanitized, marked version of the input text.
     * It works like this (see from inside out):
     * 1. marked() takes the textInput with options
     * 2. The result of marked gets sanitized with DOMpurify in order to prevent XSS
     * The result of DOMpurify gets parsed via HTML parser
     * to return valid html
     */
    setHtmlOutput(
      htmlParser(
        DOMpurify.sanitize(
          marked(textInput, {
            //MarkedJS Options
            breaks: true
          })
        )
      )
    );
  }, [textInput]);

  useEffect(() => {
    console.log(htmlOutput);
  }, [htmlOutput]);

  return (
    <div className='App'>
      <Container fluid='true'>
        <Row style={{ minHeight: '100vh' }}>
          <Col md={6} className='markdownEditor'>
            <FormGroup>
              <FormControl
                id='editor'
                as='textarea'
                onChange={event => setTextInput(event.target.value)}
                bsPrefix={'markdownEditorText'}
              />
            </FormGroup>
          </Col>
          <Col id='preview' className='htmlOutputCol'>
            {htmlOutput}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;

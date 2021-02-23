import { useState } from 'react';
import classNames from 'classnames';
import Collapse from './components/Collapse/Collapse.jsx';
import './App.css';

const Inspector = (props) => {
  const classes = classNames(['inspector', { 'inspector_violation': props.violated }])
  const message = (props.violated) ? 'Меры приняты' : null;

  return (
    <span className={classes}>{message}</span>
  );
}

function App() {
  const [state, setState] = useState({ violated: false });

  const handleRestrictedExpand = (expanded) => {
    setState({ violated: true });
  }

  return (
    <>
      <h2>Default</h2>
      <Collapse>
        <p>Необязательная информация</p>
      </Collapse>

      <h2>Label properties</h2>
      <Collapse collapsedLabel="Сколлапсировано" expandedLabel="Расширено">
        <p>Необязательная информация</p>
      </Collapse>

      <h2>isExpanded property</h2>
      <Collapse isExpanded={true}>
        <p>Необязательная информация</p>
      </Collapse>

      <h2>className property</h2>
      <Collapse id="styled-collapse-123" className="modern-style" data-test-id="qatester_ivan_321">
        <p>Необязательная информация</p>
      </Collapse>

      <h2>onExpandedChange property <Inspector violated={state.violated} /></h2>

      <Collapse
        collapsedLabel="Не открывать"
        expandedLabel="Мы же предупреждали"
        onExpandedChange={handleRestrictedExpand}
      >
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt, quibusdam doloribus distinctio harum quos, voluptates nisi ipsum rerum numquam eos vitae, repellat earum. Hic impedit dolorem iure facere consectetur architecto.</p>
      </Collapse>
    </>
  );
}

export default App;

import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Collapse.css';

function Collapse(props) {
  const { isExpanded, collapsedLabel, expandedLabel, onExpandedChange } = props;
  const [state, setState] = useState({
    /* Current expanded/collapsed state */
    isExpanded,
    /* Content measured flag */
    animationReady: false,
    /* Used to prevent animation on first render */
    changed: false,
    /* Measured height of child content */
    expandedHeight: undefined
  });

  const contentRef = useCallback((node) => {
    if (node) {
      setState((prev) => ({
        ...prev,
        animationReady: true,
        expandedHeight: node.offsetHeight,
      }));
    }
  }, []);

  const label = (state.isExpanded)
    ? expandedLabel
    : collapsedLabel;

  const toggleState = () => {
    let newExpanded = state.isExpanded;

    setState((prev) => {
      newExpanded = !prev.isExpanded;
      const newState = {
        ...prev,
        isExpanded: newExpanded,
        changed: true,
      };

      return newState;
    });

    if (onExpandedChange) {
      onExpandedChange(newExpanded);
    }
  }

  const mainClassNames = classNames([
    'collapse',
    state.isExpanded ? 'collapse_expanded' : 'collapse_collapsed',
    { 'collapse_animated': state.animationReady && state.changed },
    props.className
  ]);

  const animationStyle = {};
  if (state.animationReady) {
    animationStyle.height = (state.isExpanded) ? state.expandedHeight : 0;
  }

  return (
    <div id={props.id} className={mainClassNames} data-test-id={props['data-test-id']}>
      <button className="collapse__toggle-btn" onClick={toggleState}>
        <span className="collapse__title">{label}</span>
      </button>
      <div className="collapse__content" style={animationStyle}>
        <div className="collapse__content-wrapper" ref={contentRef}>
          {props.children}
        </div>
      </div>
    </div >
  )
}

Collapse.propTypes = {
  id: PropTypes.string,
  'data-test-id': PropTypes.string,
  collapsedLabel: PropTypes.string,
  expandedLabel: PropTypes.string,
  isExpanded: PropTypes.bool,
};

Collapse.defaultProps = {
  id: undefined,
  'data-test-id': undefined,
  collapsedLabel: 'Развернуть',
  expandedLabel: 'Свернуть',
  isExpanded: false,
};

export default Collapse;

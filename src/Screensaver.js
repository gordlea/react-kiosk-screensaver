import { styled } from '@linaria/react'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { useIdle } from 'react-use'

const Container = styled.div`
  font-size: 12px;
  color: ${(props) => props.color || 'red'};
  border: 1px solid red;

  &:hover {
    border-color: blue;
  }
`

const forceOptions = {
  show: true,
  hide: false
}

export default function Screensaver({
  children,
  idleTimeout,
  idleDisplay,
  force,
  onActiveStateChange,
}) {
  const isIdle = useIdle(idleTimeout)

  const [active, setActive] = useState(force === 'show')

  useEffect(() => {
    const newValue = force !== null ? forceOptions[force] : isIdle;
    if (newValue !== active) {
      setActive(newValue);
      onActiveStateChange({
        isActive: newValue,
      });
    }
  }, [force, isIdle, setActive]);

  if (active) {
    return idleDisplay
  }

  return children
}

Screensaver.defaultProps = {
  idleTimeout: 300000,
  onActiveStateChange() {}
}

Screensaver.propTypes = {
  /**
   If there is no interaction with the page for this many milliseconds, display the idleComponent. Defaults to 300000 (5 minutes).
  */
  idleTimeout: PropTypes.number,

  idleDisplay: PropTypes.elementType,

  children: PropTypes.elementType,

  force: PropTypes.oneOf(['show', 'hide']),

  /**  This function is called when the active state changes. */
  onActiveStateChange: PropTypes.func
}

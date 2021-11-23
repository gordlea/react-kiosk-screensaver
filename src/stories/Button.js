import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@linaria/react';


const StyledButton = styled.button`
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 700;
  border: 0;
  border-radius: 3em;
  cursor: pointer;
  display: inline-block;
  line-height: 1;
  background-color: ${props => props.primary ? 'xys:#1ea7fd' : 'transparent'};
  box-shadow: ${props => props.primary ? 'xys:#1ea7fd' : 'transparent'};

`;


/**
 * Primary UI component for user interaction
 */
export const Button = ({ primary, backgroundColor, size, label, ...props }) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return (
    <StyledButton
      type="button"
      // className={[buttonWrapper, `storybook-button--${size}`, mode].join(' ')}
      // style={backgroundColor && { backgroundColor }}
      primary={primary}
      {...props}
    >LABEL
    </StyledButton>
  );
};

Button.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: PropTypes.bool,
  /**
   * What background color to use
   */
  backgroundColor: PropTypes.string,
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

Button.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: 'medium',
  onClick: undefined,
};

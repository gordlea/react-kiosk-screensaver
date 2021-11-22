import React from 'react'
import { styled } from '@linaria/react'

const Container = styled.div`
  font-size: 12px;
  color: ${(props) => props.color || 'red'};
  border: 1px solid red;

  &:hover {
    border-color: blue;
  }
`

export default function Screensaver({ idleTimeout = 0 }) {
  return (
    <Container>Example Component: {text}</Container>
  )
}

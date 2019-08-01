import styled from '@emotion/styled'

const RefreshButton = styled.button`
  margin: 0 1rem;
  display: flex;
  align-items: center;
  border: none;
  background-color: #00000000;
  fill: ${({ theme }) => theme.accent || 'white'};
  outline: ${({ theme }) => theme.accent || 'white'};

  &.animate {
    animation-name: spin;
    animation-duration: 2000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  &:hover {
    cursor: pointer;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(-360deg);
    }
  }
`

export default RefreshButton

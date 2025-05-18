'use client';

import styled from 'styled-components';
declare module 'styled-components' {
  export interface DefaultTheme {
    darkMode?: boolean;
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  margin-bottom: 2rem;
  font-size: 1.125rem;
  color: #4b5563;
  ${({ theme }) => theme?.darkMode && `
    color: #d1d5db;
  `}
`;

export default function HomePage() {
  return (
    <Container>
      <Title>Willkommen zu deinem Projekt!</Title>
      <Subtitle>
        Wähle eine Komponente aus, um fortzufahren:
      </Subtitle>
    </Container>
  );
}
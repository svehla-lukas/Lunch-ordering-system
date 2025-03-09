// weatherStyles.ts
/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled'

// --- CONTAINERS ---
export const Container = styled.div<{
  flexDirection?: string
  alignItems?: string
  justifyContent?: string
  height?: string
}>`
  margin: 5px auto;
  padding: 5px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #f7f7f7;
  font-family: Arial, sans-serif;
  height: ${({ height = 'auto' }) => height};
  display: flex;
  flex-direction: ${({ flexDirection = 'column' }) => flexDirection};
  align-items: ${({ alignItems = 'center' }) => alignItems};
  justify-content: ${({ justifyContent = 'space-between' }) => justifyContent};
`
export const TransparentContainer = styled.div<{
  flexDirection?: string
  alignItems?: string
  justifyContent?: string
  height?: string
}>`
  margin: 5px auto;
  padding: 5px;
  height: ${({ height = 'auto' }) => height};
  display: flex;
  flex-direction: ${({ flexDirection = 'column' }) => flexDirection};
  align-items: ${({ alignItems = 'center' }) => alignItems};
  justify-content: ${({ justifyContent = 'space-between' }) => justifyContent};
  background-color: transparent;
  box-shadow: none;
`

export const GridContainer = styled.div<{ columns?: number }>`
  display: grid;
  grid-gap: 10px;
  margin-top: 2rem;
  grid-template-columns: ${({ columns }) => `repeat(${columns}, 1fr)`};
`
export const ButtonContainer = styled.div<{ flexDirection?: string }>`
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-direction: ${({ flexDirection = 'column' }) => flexDirection};
`

// --- Headers ---
export const Heading1 = styled.h1`
  font-size: 2.2rem;
  font-weight: bold;
  color: #333;
`

export const Heading2 = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
`
export const Heading3 = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
`
// --- TEXT ---

export const OrangeText = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: #e67e22;
  margin: 0;
`

export const Text = styled.p`
  font-size: 1rem;
  color: #555;
`

export const Text12 = styled.p`
  font-size: 1.2rem;
  color: #555;
`
export const Text14 = styled.p`
  font-size: 1.4rem;
  color: #555;
`
export const Text20 = styled.p`
  font-size: 2rem;
  color: #555;
`

export const BoldText = styled.p`
  font-size: 1rem;
  color: #555;
  font-weight: bold;
`
export const TextVisibility = styled.div<{ visibility: string }>`
  visibility: ${({ visibility = 'visible' }) => visibility};
  min-height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
`

export const ExtraInfo = styled.p`
  margin-top: 10px;
  font-size: 0.9rem;
  color: #555;
`
export const Pre = styled.pre`
  text-align: left;
  white-space: pre-wrap;
  font-family: monospace;
`

//  --- ICONS ---
export const Icon = styled.img`
  width: 80px;
  height: 80px;
`

//  --- Buttons ---
export const Button = styled.button<{ size?: string; background?: string; color?: string }>`
  padding: ${({ size = 'medium' }) =>
    size === 'small'
      ? '8px 12px'
      : size === 'large'
      ? '16px 24px'
      : '12px 16px'}; /* Small, Medium, Large Sizes */
  font-size: ${({ size = 'medium' }) =>
    size === 'small' ? '12px' : size === 'large' ? '16px' : '14px'};
  background-color: #007bff;
  background: ${({ background = 'lightGray' }) => background};
  color: ${({ color = 'black' }) => color};
  border: 1px solid black;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: white; /* Darker blue on hover */
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    background-color: #lightgray; /* Even darker blue on click */
    transform: scale(0.95); /* Slight scale effect on click */
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`

export const SquareButtonCard = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  font-size: 1.5rem;
  border-radius: 5px;
  background: yellow;
  color: black;
  width: 4rem;
  height: 4rem;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`

//  --- INPUTS ---
export const Input = styled.input`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 5px;
  border: 2px solid #ccc;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 40%;
  max-width: 300px;

  &:focus {
    border-color: #00bfa5;
    box-shadow: 0 0 8px rgba(0, 191, 165, 0.5);
  }
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
  width: 100%;
`

export const InputLabel = styled.label`
  font-size: 1rem;
  font-weight: bold;
  margin-right: 1rem;
  color: #333;
  width: 40%;
`

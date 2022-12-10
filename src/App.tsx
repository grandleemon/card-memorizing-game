import {useEffect, useState} from 'react'
import './App.css'

type SelectedCard = {
  rowIndex: number
  colIndex: number
  value: number
}

function App() {
  const [grid] = useState<number[][]>([
    [5, 1, 2, 3],
    [3, 2, 4, 1],
    [0, 4, 0, 5],
  ])
  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([])
  const [guessedCards, setGuessedCards] = useState<number[]>([])
  const [numberOfMoves, setNumberOfMoves] = useState<number>(0)

  const handleClick = (rowIndex: number, colIndex: number, value: number) => () => {
    if (guessedCards.includes(value)) return;

    const temp: SelectedCard = {
      rowIndex,
      colIndex,
      value,
    }

    if (selectedCards.length < 2) {
      setSelectedCards(prevState => [...prevState, temp])
    } else {
      setSelectedCards([])
      setSelectedCards(prevState => [...prevState, temp])
    }
  }

  useEffect(() => {
    if (selectedCards[0]?.value === selectedCards[1]?.value) {
      setGuessedCards(prevState => [...prevState, selectedCards[0]?.value])
    }
    if (selectedCards.length === 2 && selectedCards[0]?.value !== selectedCards[1]?.value) {
      setTimeout(() => {
        setSelectedCards([])
      }, 500)
    }
    if(selectedCards.length === 2) setNumberOfMoves(numberOfMoves + 1)
  }, [selectedCards])

  const colConditionIndex = (rowIndex: number, colIndex: number, i: number): boolean => {
    return selectedCards[i]?.rowIndex === rowIndex && selectedCards[i]?.colIndex === colIndex
  }

  return (
    <div className="App">
      <div>{numberOfMoves}</div>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className='row'>
          {row.map((col, colIndex) => (
            <div
              key={colIndex}
              className={`col ${colConditionIndex(rowIndex, colIndex, 0)
                ? 'selected'
                : colConditionIndex(rowIndex, colIndex, 1) ? 'selected' :
                  guessedCards.includes(col) ? 'selected' : ''}`}
              onClick={handleClick(rowIndex, colIndex, col)}
            >
              {colConditionIndex(rowIndex, colIndex, 0)
                ? col
                : colConditionIndex(rowIndex, colIndex, 1)
                  ? col
                  : guessedCards.includes(col) ? col : ''}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default App

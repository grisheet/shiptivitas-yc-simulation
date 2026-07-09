import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Board.css';

const API_BASE = 'http://localhost:3001/api';

const SWIMLANES = [
  { id: 'backlog', title: 'Backlog' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];

function Board() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await fetch(`${API_BASE}/cards`);
      if (!response.ok) throw new Error('Failed to fetch cards');
      const data = await response.json();
      setCards(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const getCardsByStatus = (status) => {
    return cards
      .filter(card => card.status === status)
      .sort((a, b) => a.position - b.position);
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId &&
        destination.index === source.index) return;

    const newStatus = destination.droppableId;
    const newPosition = destination.index;

    // Optimistic update
    const updatedCards = cards.map(card => {
      if (card.id === draggableId) {
        return { ...card, status: newStatus, position: newPosition };
      }
      return card;
    });
    setCards(updatedCards);

    // Persist to backend
    try {
      const response = await fetch(`${API_BASE}/cards/${draggableId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, position: newPosition }),
      });
      if (!response.ok) throw new Error('Failed to update card');
    } catch (err) {
      console.error('Error updating card:', err);
      // Revert on error
      fetchCards();
    }
  };

  if (loading) return <div className="board-loading">Loading board...</div>;
  if (error) return <div className="board-error">Error: {error}</div>;

  return (
    <div className="board">
      <h1 className="board-title">Shiptivitas Kanban Board</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="swimlanes">
          {SWIMLANES.map(lane => (
            <div key={lane.id} className="swimlane">
              <h2 className="swimlane-title">{lane.title}</h2>
              <div className="card-count">{getCardsByStatus(lane.id).length} cards</div>
              <Droppable droppableId={lane.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`card-list ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                  >
                    {getCardsByStatus(lane.id).map((card, index) => (
                      <Draggable key={card.id} draggableId={card.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`card ${snapshot.isDragging ? 'dragging' : ''}`}
                          >
                            <p className="card-title">{card.title}</p>
                            <span className={`card-status status-${card.status}`}>
                              {card.status}
                            </span>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default Board;

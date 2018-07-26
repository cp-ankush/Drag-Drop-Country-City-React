import React from 'react';
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';

const Cities = ({ cities, onLeave, onDrop }) => (
  <DropTarget
    targetKey={'city'}
    onHit={onLeave}
    dropData={{ name: 'city' }}
  >
    <ul style={{ textAlign: 'center', width: '100%', height: '400px', padding: '20px', margin: '0' }}>
      {
        map(cities, (city, index) => {

          if (isEmpty(city.childOf)) {
            return (
              <DragDropContainer
                targetKey={'country'}
                dragData={{ cityId: city.ID }}
                key={city.LocationName}
                onDrop={onDrop}
              >
                <div key={index} style={{
                  backgroundColor: 'rgba(243, 191, 156, 1)',
                  margin: '10px',
                  borderRadius: '5px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end'
                }}>
                  <span style={{ display: 'none' }}>{city.ID}&&</span>
                  <span style={{
                    textAlign: 'right',
                    padding: '0 5px',
                    width: 'fit-content',
                    fontSize: '14px'
                  }}>
                    x
                  </span>
                  <span style={{ padding: '0px 20px 15px' }}>{city.LocationName}</span>
                </div>
              </DragDropContainer>
            );
          }
        })
      }
    </ul>
  </DropTarget>
)

export default Cities;

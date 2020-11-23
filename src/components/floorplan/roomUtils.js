export function adaptRooms(rooms, canvasWidth, canvasHeight) {
  const scaledRooms = scaleRooms(rooms, canvasWidth, canvasHeight);
  const centeredRooms = centerRooms(scaledRooms, canvasWidth, canvasHeight);
  return centeredRooms;
}

function scaleRooms(rooms, canvasWidth, canvasHeight) {
  const maxX = Math.max(
    ...rooms.map((room) => room.walls.map((point) => point.x)).flat()
  );
  const minX = Math.min(
    ...rooms.map((room) => room.walls.map((point) => point.x)).flat()
  );

  const maxY = Math.max(
    ...rooms.map((room) => room.walls.map((point) => point.y)).flat()
  );
  const minY = Math.min(
    ...rooms.map((room) => room.walls.map((point) => point.y)).flat()
  );

  const scaleX = canvasWidth / (maxX - minX);
  const scaleY = canvasHeight / (maxY - minY);

  const scale = (scaleX > scaleY ? scaleY : scaleX) * 0.99;

  return rooms.map((room) => {
    return {
      ...room,
      walls: room.walls.map((point) => {
        return {
          ...point,
          x: parseInt(point.x * scale),
          y: parseInt(point.y * scale),
        };
      }),
    };
  });
}

function centerRooms(rooms, canvasWidth, canvasHeight) {
  const maxX = Math.max(
    ...rooms.map((room) => room.walls.map((point) => point.x)).flat()
  );
  const minX = Math.min(
    ...rooms.map((room) => room.walls.map((point) => point.x)).flat()
  );

  const maxY = Math.max(
    ...rooms.map((room) => room.walls.map((point) => point.y)).flat()
  );
  const minY = Math.min(
    ...rooms.map((room) => room.walls.map((point) => point.y)).flat()
  );

  const offsetX = parseInt((canvasWidth - maxX - minX) / 2);
  const offsetY = parseInt((canvasHeight - maxY - minY) / 2);

  return rooms.map((room) => {
    return {
      ...room,
      walls: room.walls.map((point) => {
        return { ...point, x: point.x + offsetX, y: point.y + offsetY };
      }),
    };
  });
}

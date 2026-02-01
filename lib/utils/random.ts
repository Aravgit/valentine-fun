export const getRandomPosition = (
  containerWidth: number,
  containerHeight: number,
  elementWidth: number,
  elementHeight: number,
  margin: number = 40
): { x: number; y: number } => {
  // Ensure the element stays within bounds with proper margins
  const minX = margin;
  const maxX = Math.max(margin, containerWidth - elementWidth - margin);
  const minY = margin;
  const maxY = Math.max(margin, containerHeight - elementHeight - margin);

  return {
    x: Math.random() * (maxX - minX) + minX,
    y: Math.random() * (maxY - minY) + minY,
  };
};

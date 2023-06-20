import { Paper } from '@mui/material';
import React, { useRef, useEffect } from 'react';

const CanvasGraph = ({ prices }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate the minimum and maximum prices
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    // Set the line color based on the price trend
    const lineColor = prices[prices.length - 2] > prices[prices.length - 1] ? 'green' : 'red';

    // Draw the graph
    const graphHeight = canvas.height - 20;
    const graphWidth = canvas.width - 20;
    const xStep = graphWidth / (prices.length - 1);

    ctx.beginPath();
    ctx.moveTo(10, canvas.height - 10);

    prices.forEach((price, index) => {
      const x = index * xStep + 10;
      const y = canvas.height - 10 - (price - minPrice) / (maxPrice - minPrice) * graphHeight;
      ctx.lineTo(x, y);
    });

    ctx.strokeStyle = lineColor;
    ctx.stroke();
  }, [prices]);

  return (
    <Paper elevation={3} sx={{width: 150, height: 30 }}>
      <canvas ref={canvasRef} width={150} height={30} />
    </Paper>
  )
};

export default CanvasGraph;
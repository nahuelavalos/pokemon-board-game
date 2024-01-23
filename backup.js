function drawCanvas(ctx) {
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 3.1;
    const distance = 60; // Distancia entre los círculos
    const radius = 20; // Radio de los círculos
  
    function drawCircle(x, y, rad, color) {
      ctx.beginPath();
      ctx.arc(x, y, rad, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = "black";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  
    function drawLine(startX, startY, endX, endY) {
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    }
  
    const colors = ["lightgrey", "lightyellow", "lightblue", "lightpink", "lightgreen"]; // Colores por nivel
  
    const directions = [
      { x: 0, y: -distance },
      { x: distance, y: 0 },
      { x: 0, y: distance },
      { x: -distance, y: 0 },
      { x: distance * Math.cos(Math.PI / 4), y: -distance * Math.sin(Math.PI / 4) },
      { x: distance * Math.cos(Math.PI / 4), y: distance * Math.sin(Math.PI / 4) },
      { x: -distance * Math.cos(Math.PI / 4), y: distance * Math.sin(Math.PI / 4) },
      { x: -distance * Math.cos(Math.PI / 4), y: -distance * Math.sin(Math.PI / 4) }
    ];
  
    directions.forEach((direction, index) => {
      const circleX = centerX + direction.x;
      const circleY = centerY + direction.y;
  
      const color = colors[1]; // Asignar color según nivel
  
      drawCircle(circleX, circleY, radius, color);
  
      for (let i = -1; i <= 3; i++) {
        const currentX = circleX + direction.x * i;
        const currentY = circleY + direction.y * i;
        const nextX = circleX + direction.x * (i + 1);
        const nextY = circleY + direction.y * (i + 1);
        const levelColor = colors[i + 1]; // Color del siguiente nivel
  
        drawCircle(currentX, currentY, radius, levelColor);
  
        if (i !== 3) {
          const startX = currentX + radius * Math.cos(Math.atan2(nextY - currentY, nextX - currentX));
          const startY = currentY + radius * Math.sin(Math.atan2(nextY - currentY, nextX - currentX));
          const endX = nextX - radius * Math.cos(Math.atan2(nextY - currentY, nextX - currentX));
          const endY = nextY - radius * Math.sin(Math.atan2(nextY - currentY, nextX - currentX));
          drawLine(startX, startY, endX, endY);
        }
      }
  
      function drawSquare(x, y, size, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, size, size);
        ctx.strokeStyle = "black";
        ctx.strokeRect(x, y, size, size);
      }
  
      function drawRectangle(x, y, width, height, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
        ctx.strokeStyle = "black";
        ctx.strokeRect(x, y, width, height);
      }
  
      // Dibujar 6 circulos
      const circleSize = 30; // Tamaño del círculo en el rectángulo
      const circleGap = 40; // Espacio entre los círculos
      const circlesCount = 6; // Cantidad de círculos
  
      for (let i = 0; i < circlesCount; i++) {
        const row = Math.floor(i / 2); // Calcular fila
        const col = i % 2 - 1; // Calcular columna
        const circleX = 370 + col * (circleSize + circleGap) + circleSize / 0.45; // Posición en X del círculo
        const circleY = 580 + row * (circleSize + circleGap) + circleSize / 8; // Posición en Y del círculo
        drawCircle(circleX, circleY, circleSize, "lightblue");
      }
  
      // Dibujar los rectángulos
      const rectWidth = 63 * 2; // Ancho del rectángulo
     
      const rectHeight = 88 * 2; // Alto del rectángulo

      const rectX1 = centerX - rectWidth / 1.5 - 125;
      const rectY1 = centerY + distance * 4.8;
      const rectX2 = centerX - rectWidth / 2 + 150;
      const rectY2 = centerY + distance * 4.8;
  
      drawRectangle(rectX1, rectY1, rectWidth, rectHeight, "lightgrey");
      drawRectangle(rectX2, rectY2, rectWidth, rectHeight, "lightgrey");
  
      const squareSize = 80; // Tamaño del cuadrado
      const gap = 0; // Espacio entre los cuadrados
      const squaresCount = 10; // Cantidad de cuadrados
  
      // Dibujar los cuadrados consecutivos
      for (let i = 0; i < squaresCount; i++) {
        const squareX = i * (squareSize + gap); // Posición en el eje X
        const squareY = ctx.canvas.height - squareSize; // Posición en el eje Y
        drawSquare(squareX, squareY, squareSize, "lightgrey");
      }
    });
  }
  
  // Llamada a la función para dibujar en el canvas
  document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    drawCanvas(ctx);
  });
  
  
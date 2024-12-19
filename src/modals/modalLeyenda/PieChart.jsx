import React from "react";
import { View } from "react-native";
import Svg, { G, Path, Circle, Text, Text as SvgText } from "react-native-svg";

const PieChart = ({ data, colors, size = 200, transparency = 1.0 }) => {
  const total = data.reduce((acc, value) => acc + value, 0);
  const radius = size / 2;
  let startAngle = 0;

  // Número de datos diferentes de cero
  const numDatos = [];
  data.map((element) => {
    if (element != 0) numDatos.push(element);
  });

  // Cuando solo hay un dato
  const centerX = radius + 5; // X-coordinate del centro del círculo
  const centerY = radius + 5; // Y-coordinate del centro del círculo
  const resultColor = (element) => element != 0; // color del círculo
  const resultIndexColor = data.findIndex(resultColor);

  return (
    <View>
      {numDatos.length == 1 || numDatos.length == 0 ? (
        <Svg height={2 * radius + 10} width={2 * radius + 10}>
          {/* Cuando existe solo un dato */}
          <Circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill={numDatos.length == 1 ? colors[resultIndexColor] : null}
            stroke={numDatos.length == 0 ? "white" : null}
          />

          {/* Etiqueta en el centro del círculo */}
          <Text
            x={centerX}
            y={centerY}
            textAnchor="middle"
            fontSize="12"
            fontWeight="bold"
            fill="black"
          >
            {numDatos.length == 1 ? "100 %" : "0 %"}
          </Text>
        </Svg>
      ) : (
        <Svg width={size} height={size}>
          {/* Más de un dato */}
          {data.map((value, index) => {
            const percentage = (value / total) * 100;

            const endAngle = startAngle + (percentage * Math.PI * 2) / 100;
            const x1 = radius + radius * Math.cos(startAngle);
            const y1 = radius + radius * Math.sin(startAngle);
            const x2 = radius + radius * Math.cos(endAngle);
            const y2 = radius + radius * Math.sin(endAngle);

            const largeArcFlag = percentage > 50 ? 1 : 0;
            const pathData = `M${radius},${radius} L${x1},${y1} A${radius},${radius} 0 ${largeArcFlag},1 ${x2},${y2} Z`;

            startAngle = endAngle;

            // Aplicar transparencia al color
            const colorWithTransparency = `${
              colors[index % colors.length]
            }${Math.round(transparency * 255).toString(16)}`;

            return (
              <G key={index}>
                <Path d={pathData} fill={colorWithTransparency} />

                {/* Etiqueta de porcentaje */}
                <SvgText
                  fill="black"
                  fontSize="12"
                  fontWeight="bold"
                  x={
                    radius +
                    radius *
                      0.6 *
                      Math.cos(startAngle - (percentage * Math.PI) / radius)
                  }
                  y={
                    radius +
                    radius *
                      0.6 *
                      Math.sin(startAngle - (percentage * Math.PI) / radius)
                  }
                  textAnchor="middle"
                >
                  {percentage != 0 ? `${percentage.toFixed(1)}%` : null}
                </SvgText>
              </G>
            );
          })}
        </Svg>
      )}
    </View>
  );
};

export default PieChart;

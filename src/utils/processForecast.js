// Convert 3-hour data into daily averages
export function processForecast(data) {
  const dailyData = {};

  data.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];

    if (!dailyData[date]) {
      dailyData[date] = {
        temps: [],
        conditions: [],
        rain: 0,
      };
    }

    dailyData[date].temps.push(item.main.temp);
    dailyData[date].conditions.push(item.weather[0].main);

    // Add rain if present
    if (item.rain && item.rain['3h']) {
      dailyData[date].rain += item.rain['3h'];
    }
  });

  return Object.keys(dailyData).map((date) => {
    const dayData = dailyData[date];
    const temps = dayData.temps;

    const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;
    const maxTemp = Math.max(...temps);
    const minTemp = Math.min(...temps);

    // Get the most common weather condition
    const conditionCounts = {};
    dayData.conditions.forEach(cond => {
      conditionCounts[cond] = (conditionCounts[cond] || 0) + 1;
    });
    const mainCondition = Object.keys(conditionCounts).reduce((a, b) =>
      conditionCounts[a] > conditionCounts[b] ? a : b
    );

    return {
      date,
      temp: Number(avgTemp.toFixed(1)),
      maxTemp: Number(maxTemp.toFixed(1)),
      minTemp: Number(minTemp.toFixed(1)),
      condition: mainCondition,
      rain: Number(dayData.rain.toFixed(1)),
    };
  });
}
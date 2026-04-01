export default function Insight({ data }) {
  if (!data.length) return null;

  // Helper function to get day name
  const getDayName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  // Find rainy days
  const rainyDays = data.filter(day => day.rain > 0);

  // Find very hot days (>30°C)
  const hotDays = data.filter(day => day.maxTemp > 30);

  // Find very cold days (<10°C)
  const coldDays = data.filter(day => day.minTemp < 10);

  // Generate insight
  let insight = '';

  if (rainyDays.length > 0) {
    const day = rainyDays[0];
    insight = `Rain expected on ${getDayName(day.date)} (${day.rain}mm)`;
  } else if (hotDays.length > 0) {
    const day = hotDays[0];
    insight = `Very hot day expected on ${getDayName(day.date)} (${day.maxTemp}°C)`;
  } else if (coldDays.length > 0) {
    const day = coldDays[0];
    insight = `Cold day expected on ${getDayName(day.date)} (${day.minTemp}°C)`;
  } else {
    // Best day to go out: highest temp, preferably clear
    let bestDay = data[0];
    data.forEach((day) => {
      if (day.temp > bestDay.temp) {
        bestDay = day;
      }
    });
    insight = `Best day to go out: ${getDayName(bestDay.date)} (${bestDay.temp}°C)`;
  }

  return (
    <p className="insight">
      {insight}
    </p>
  );
}
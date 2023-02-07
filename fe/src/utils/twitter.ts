// CreateIntentURL is a utility function that creates a URL for sharing a tweet
// with a given text and URL.
//
// Example:
// CreateIntentURL(['🚨 Istanbul Siginma Alanlari'], 'https://afetbilgi.com')
export function createIntentURL(lines: string[], url: string) {
    let text = lines.join('\n');
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text
  )}&url=${encodeURIComponent(url)}`;
}

export function createGatheringAreaIntentURL(city: string, areas: string[], lastUpdate: string) {
  const lines = [
    `🚨 ${city} Şehrinde Güvenli Toplanma Alanları`,
    ``, // Leave a blank line
  ];
  areas.forEach((area) => {
    lines.push(`📍 ${area}`);
  });
  lines.push(``) // Leave a blank line
  lines.push(`Son Güncelleme: ${lastUpdate}`);
  return createIntentURL(lines, 'https://afetbilgi.com');
}
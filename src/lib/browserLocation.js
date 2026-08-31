export const getPublicIp = async () => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    if (!response.ok) return "";
    const data = await response.json();
    return data.ip || "";
  } catch {
    return "";
  }
};

export const getGpsCoords = () =>
  new Promise((resolve) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      () => resolve(null),
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5 * 60 * 1000,
      }
    );
  });

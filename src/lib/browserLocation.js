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

export const getGpsCoords = () => Promise.resolve(null);

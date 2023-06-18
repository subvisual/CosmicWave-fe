const url = "https://cosmicwave-server.onrender.com";

const useServer = () => {
  const now = async () => {
    const result = await fetch(`${url}/now`);
    return await result.json();
  };

  const playlist = async () => {
    const result = await fetch(`${url}/playlist`);
    return await result.json();
  };

  return { now, playlist };
};

export default useServer;

const url = "https://cosmicwave-server.onrender.com"

const useServer = () => {
  const now = async () => {
    const result = await fetch(`${url}/now`);

    return result.json();
  };

  const playlist = async () => {
    const result = await fetch(`${url}/playlist`);

    return result.json();
  };

  return { now, playlist };
}

export default useServer;

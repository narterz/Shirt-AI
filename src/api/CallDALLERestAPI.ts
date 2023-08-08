export const CallDALLERestAPI = async (message: string) => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          message: message
        }),
        headers: {
          "Content-type": "application/json"
        }
      };
  
      const response = await fetch('http://localhost:3001/images', options);
      const data = await response.json();
      return data;
  
    } catch (error) {
      console.error(error);
    }
  };
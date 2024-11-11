import API_URL from "@/config";


export const fetchToEat = async (accessToken) => {
  try {
    const response = await fetch(`${API_URL}toEat/getList`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`, 
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    return json;
  } catch (err) {
    console.log("Error fetching to Eat:", err);
    return [];
  }
};

export const addToEat = async (postId, accessToken) => {
  try {
    const response = await fetch(`${API_URL}toEat/post?postId=${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`, 
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (err) {
    console.log("Error adding To Eat:", err);
    return [];
  }
};
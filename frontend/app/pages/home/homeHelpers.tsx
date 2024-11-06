import API_URL from "@/config";

// export const fetchPosts = async (userId, accessToken) => {
//   try {
//     const response = await fetch(`${API_URL}follow/getFollowers?user=${userId}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${accessToken}`, 
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const json = await response.json();
//     return json;
//   } catch (err) {
//     console.log("Error fetching followers info:", err);
//     return [];
//   }
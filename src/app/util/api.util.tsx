
const okStatus = [200, 201, 202];



export const Post = async (
  data: object = {},
  path: string = "/"
): Promise<object> => {
  const session = JSON.parse(localStorage.getItem("infoSession") || "{}")
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${session.tk}`);
  try {
    const req = await fetch(path, {
      method: "POST",
      body: JSON.stringify(data),
      headers: myHeaders,
    });

    if (!okStatus.includes(req.status)) {
      throw new Error("errorr");
    }

    return await req.json();
  } catch (error) {
    throw error;
  }
};

export const Get = async (
  path: string = "/"
): Promise<object> => {
  const session = JSON.parse(localStorage.getItem("infoSession") || "{}")
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${session.tk}`);
  
  try {
    const req = await fetch(path, {
      method: "GET",
      headers: myHeaders,
    });

    if (!okStatus.includes(req.status)) {
      throw new Error("errorr");
    }

    return await req.json();
  } catch (error) {
    throw error;
  }
};


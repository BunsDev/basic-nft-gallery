export interface Metadata {
  image: string;
}

export default function fetchTokenMetadata(url: string) {
  return fetch(url).then(async (res) => {
    let json = undefined;
    try {
      json = await res.json();
      console.log(json);
    } catch (error) {
      console.error(error);
      throw new Error("Something went wrong");
    }

    if (!json) {
      throw new Error("Something went wrong");
    }

    return json as Metadata;
  });
}

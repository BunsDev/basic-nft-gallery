export interface Metadata {
  name: string;
  image: string;
}

const IPFS_URL_1 = "ipfs://";
const IPFS_URL_2 = "ipfs://ipfs/";

function getIPFSURL(url: string) {
  if (url.startsWith(IPFS_URL_2)) {
    return `https://ipfs.io/${url.substring(7)}`;
  } else if (url.startsWith(IPFS_URL_1)) {
    return `https://ipfs.io/ipfs/${url.substring(7)}`;
  } else {
    return url;
  }
}

export default function fetchTokenMetadata(url: string) {
  url = getIPFSURL(url);

  return fetch(url).then(async (res) => {
    let json: any = undefined;
    try {
      json = await res.json();
      // console.log(json);
    } catch (error) {
      // console.error(error);
      throw new Error("Something went wrong");
    }

    if (!json) {
      throw new Error("Something went wrong");
    }

    json.image = getIPFSURL(json.image);
    return json as Metadata;
  });
}

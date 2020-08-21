const URL = {
  base: "https://i.ytimg.com/vi/",
  quality: {
    default: 'default',
    medium: 'mqdefault',
    high: 'hqdefault',
    standard: 'sddefault',
    maxres: 'maxresdefault'
  }
}

export function youtubeIdParser(url){
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match&&match[7].length==11)? match[7] : false;
}

export function getDefault(id) {
  return URL.base + id + '/' + URL.quality.default;
}

export function getMedium(id) {
  return URL.base + id + '/' + URL.quality.medium;
}
export function getHigh(id) {
  return URL.base + id + '/' + URL.quality.high;
}
export function getStandard(id) {
  return URL.base + id + '/' + URL.quality.standard;
}
export function getMaxRes(id) {
  return URL.base + id + '/' + URL.quality.maxres;
}

import cheerio from "cheerio";
import axios from "axios";
const config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};
var anime = [];
export async function getUrl() {
  anime = [];
  const link = "https://otakudesu.tv/ongoing-anime/";
  const result = await axios.get(link, config.headers);
  const $ = cheerio.load(result.data);
  anime.push({
    date: Date.now(),
    ongoing: [],
  });

  $(".detpost").each(function () {
    anime[0].ongoing.push({
      length: anime[0].ongoing.length + 1,
      judul: $(this).find(".jdlflm").html(),
      tanggal: $(this).find(".newnime").html(),
      link: $(this).find("a").attr("href"),
    });
  });
  return anime;
}
var episode = [];
export async function getListEpisode(url) {
  const result = await axios.get(url, config.headers);
  const $ = cheerio.load(result.data);
  episode = [];
  $(".episodelist li").each(function () {
    if ($(this).find("a[data-wpel-link=internal]").attr("href") != undefined) {
      episode.push({
        length: episode.length + 1,
        link: $(this).find("a[data-wpel-link=internal]").attr("href"),
        judul: $(this).find("a[data-wpel-link=internal]").text(),
        tanggal: $(this).find(".zeebr").text(),
      });
    }
  });
  return episode;
}

export async function getWatch(url) {
  const result = await axios.get(url, config.headers);
  const $ = cheerio.load(result.data);
  const data = $(".responsive-embed-stream").find("iframe").attr("src");
  return data;
}

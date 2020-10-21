require("dotenv").config();
import { getUrl, getListEpisode, getWatch } from "./scrapping";

const { Client } = require("discord.js");
const client = new Client();
const PREFIX = "=";
client.on("ready", () => {
  console.log(`${client.user.tag} has logged in.`);
});

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(PREFIX)) {
    const [cmd, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);
    var anime = [];
    if (cmd === "help") {
      message.channel.send(
        "```Anistream Help Menu\ngunakan =command\n\ncommands list\nongoing untuk mencari anime musim ini\nnonton```"
      );
    } else if (cmd === "ongoing") {
      message.channel.send("Tunggu sebentar ya..");
      anime = [];
      const ongoing = await getUrl();
      ongoing[0].ongoing.forEach((ep) => {
        anime.push(`${ep.length}.${ep.judul}`);
      });

      message.channel.send(anime);
      message.channel.send(
        "**Silakan pilih nomor** dengan command **=nonton** nomor, cth: =nonton 7"
      );
    } else if (cmd === "nonton") {
      if (args[0] === undefined) {
        message.channel.send("Anda belum memasukan ID anime dan ID Episode");
      } else if (args[1] === undefined) {
        message.channel.send("Anda belum memasukan ID Episode");
      } else {
        message.channel.send("tunggu bentar bang, request time.");
      }

      const ongoing = await getUrl();
      ongoing[0].ongoing.forEach((ep) => {
        anime.push(`${ep.length}.${ep.judul}`);
      });

      if (args[1] !== undefined) {
        const episode = await getListEpisode(
          ongoing[0].ongoing[parseInt(args[0] - 1)].link
        );
        const getUrl = await getWatch(episode[parseInt(args[1]) - 1].link);
        message.channel.send(getUrl);
        message.channel.send("Selamat menonton, link sudah tersedia!");
      }
    } else if (cmd === "episode") {
      if (args[0] === undefined) {
        message.channel.send("anda belum memasukan angka");
      } else {
        message.channel.send("tunggu bentar bang, request time.");
      }
      if (args[0] !== undefined) {
        const ongoing = await getUrl();
        ongoing[0].ongoing.forEach((ep) => {
          anime.push(`${ep.length}.${ep.judul}`);
        });

        message.channel.send(ongoing[0].ongoing[parseInt(args[0] - 1)].judul);
        // console.log(args[0]);

        const episode = await getListEpisode(
          ongoing[0].ongoing[parseInt(args[0] - 1)].link
        );
        var arrEpisode = [];
        arrEpisode = [];
        episode.forEach((ep) => {
          arrEpisode.push(`${ep.length}.${ep.judul}`);
        });
        try {
          message.channel.send(arrEpisode);
        } catch (err) {
          message.channel.send(err);
        }
        message.channel.send(
          "**Silakan pilih nomor** dengan command **=nonton nomor episode**, cth: =nonton 7 **2**"
        );
      }
    } else if (cmd === "test") {
      message.channel.send("https://www.youtube.com/embed/hdmUJss3NV0");
    }
  }
});

client.login("NzY3OTUwMTQyNDY4MjU5ODUw.X45XTQ.AU4jaHEylWMFicRkr61a-l4GZ4M");

const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const path = require('path');

const TOKEN = 'MTM1NzU5MjI0MDQ5ODkzNzg5Nw.GExiPh.gTZm1oCqlajNShEvfeZYnfQQCeNExYZAeKmX5c'; // Replace this
const GUILD_ID = '1102948879286149252'; // Replace this
const VOICE_CHANNEL_ID = '1356426025386377309'; // Replace this

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]
});

client.once('ready', async () => {
  console.log(`😱 Screaming bot is online as ${client.user.tag}`);

  const guild = await client.guilds.fetch(GUILD_ID);
  const channel = await guild.channels.fetch(VOICE_CHANNEL_ID);

  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: guild.id,
    adapterCreator: guild.voiceAdapterCreator
  });

  const player = createAudioPlayer();

  const playScream = () => {
    const resource = createAudioResource(path.join(__dirname, 'scream.mp3'));
    player.play(resource);
  };

  player.on(AudioPlayerStatus.Idle, playScream);

  playScream();
  connection.subscribe(player);
});

client.login(TOKEN);

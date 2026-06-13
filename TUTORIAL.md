# Tutorial complet: cum folosesti local botul Discord cu muzica

Acest tutorial te ia de la zero.

Nu presupune ca stii Discord Developer Portal. Nu presupune ca stii Node.js. Nu presupune ca stii ce este un token.

Imagineaza-ti ca botul este o mica jucarie care sta pe calculatorul tau. Discord ii spune ce comenzi au scris oamenii. Botul raspunde. Cand ii spui `/music play`, botul intra intr-un canal vocal si incearca sa cante melodia.

## Ce vei face

Pana la final, vei avea:

1. O aplicatie creata in Discord Developer Portal.
2. Un bot adaugat pe serverul tau de test.
3. Un fisier `.env` cu secretele botului.
4. Dependentele instalate cu `npm`.
5. Botul pornit local de pe calculatorul tau.
6. Comenzile slash functionale in Discord.
7. Muzica pornind intr-un voice channel.

## Surse folosite pentru acest tutorial

Acest ghid este scris pentru proiectul din acest folder, dar stilul si pasii sunt inspirati din:

- Discord Developer Docs: [Building your first Discord Bot](https://docs.discord.com/developers/quick-start/getting-started)
- Discord Developer Docs: [Discord Developer Platform](https://docs.discord.com/developers/intro)
- Medium: [A middle schooler's guide to Discord bots - Set-up](https://medium.com/analytics-vidhya/a-middle-schoolers-guide-to-discord-bots-set-up-aeac563c155b)
- freeCodeCamp: [JavaScript Discord Bot Tutorial](https://www.freecodecamp.org/news/create-a-discord-bot-with-javascript-nodejs/)

Important: tutorialele vechi de pe internet folosesc des comenzi cu prefix, cum ar fi `!ping` sau `$ping`. Botul nostru foloseste slash commands moderne, adica `/ping`, `/joke`, `/music play`.

## Partea 1: ce ai nevoie inainte sa incepi

Ai nevoie de patru lucruri:

1. Un cont Discord.
2. Un server Discord de test.
3. Node.js instalat.
4. Codul acestui proiect pe calculatorul tau.

Hai pe rand.

## Partea 2: creeaza un server Discord de test

Nu testa botul prima data pe un server mare.

Fa un server mic, doar pentru tine.

1. Deschide Discord.
2. In stanga, apasa butonul `+`.
3. Alege `Create My Own`.
4. Alege `For me and my friends`.
5. Pune un nume simplu, de exemplu `Bot Test Server`.
6. Apasa `Create`.

Gata. Acesta este locul de joaca al botului.

## Partea 3: activeaza Developer Mode in Discord

Developer Mode te lasa sa copiezi ID-uri.

Un ID este ca un numar de buletin pentru un server, canal, user sau aplicatie. Codul nostru are nevoie de ID-ul serverului.

1. Deschide Discord.
2. Apasa pe rotita de setari de langa numele tau.
3. Mergi la `Advanced`.
4. Porneste `Developer Mode`.

Acum poti da click dreapta pe servere si poti copia ID-uri.

## Partea 4: copiaza GUILD_ID

`GUILD_ID` inseamna ID-ul serverului tau Discord.

Discord numeste serverele "guilds" in API. De aceea variabila se numeste `GUILD_ID`.

1. In Discord, mergi la serverul tau de test.
2. Click dreapta pe iconita serverului.
3. Apasa `Copy Server ID`.
4. Pastreaza numarul undeva pentru cateva minute.

Il vei pune mai tarziu in `.env`.

## Partea 5: intra in Discord Developer Portal

Developer Portal este locul unde creezi aplicatia botului.

1. Deschide browserul.
2. Intra pe [Discord Developer Portal](https://discord.com/developers/applications).
3. Logheaza-te cu contul tau Discord.

Gandeste-te asa:

- Discord normal este locul unde vorbesti cu prietenii.
- Discord Developer Portal este locul unde creezi robotei si aplicatii.

## Partea 6: creeaza aplicatia

Aplicatia este "cutia mare".

Botul este un user special care traieste in cutia asta.

1. In Developer Portal, apasa `New Application`.
2. Scrie un nume, de exemplu `Tutorial Music Bot`.
3. Bifeaza ca esti de acord cu regulile, daca Discord iti cere asta.
4. Apasa `Create`.

Acum ai o aplicatie.

## Partea 7: copiaza CLIENT_ID

`CLIENT_ID` este ID-ul aplicatiei tale.

In Discord Developer Portal poate aparea ca `Application ID`.

1. In aplicatia ta, mergi la `General Information`.
2. Cauta `Application ID`.
3. Apasa `Copy`.
4. Pastreaza numarul.

Acesta va deveni `CLIENT_ID` in fisierul `.env`.

## Partea 8: creeaza sau verifica bot user-ul

Aplicatia are nevoie de un bot user.

Bot user-ul este contul care va aparea in serverul tau. El va avea nume, poza si status.

1. In stanga, apasa `Bot`.
2. Daca vezi un buton pentru crearea botului, apasa-l.
3. Daca botul exista deja, e perfect.
4. Optional, schimba numele sau poza botului.

Nu trebuie sa activezi privileged intents pentru acest proiect.

Botul nostru foloseste:

- slash commands
- server info
- voice state info

Nu citeste mesajele normale din chat. Deci nu are nevoie de `Message Content Intent`.

## Partea 9: copiaza DISCORD_TOKEN

Tokenul este parola botului.

Foarte important:

Nu pune tokenul pe GitHub. Nu il trimite pe Discord. Nu il arata in poze. Nu il da prietenilor. Daca cineva are tokenul, poate porni botul tau.

1. In Developer Portal, mergi la `Bot`.
2. Cauta sectiunea `Token`.
3. Apasa `Reset Token` sau `View Token`, in functie de ce iti arata Discord.
4. Copiaza tokenul.
5. Pastreaza-l pentru fisierul `.env`.

Daca ai pierdut tokenul, nu e grav. Apesi `Reset Token` si primesti unul nou.

Dar daca resetezi tokenul, vechiul token nu mai merge.

## Partea 10: seteaza instalarea botului

Acum trebuie sa ii spui lui Discord cum poate fi instalata aplicatia.

1. In Developer Portal, mergi la `Installation`.
2. La `Installation Contexts`, asigura-te ca `Guild Install` este pornit.
3. Daca vezi si `User Install`, il poti lasa pornit, dar pentru acest bot conteaza `Guild Install`.
4. La `Install Link`, alege `Discord Provided Link`.

Acum mergem la permisiuni.

## Partea 11: alege scopes

Scopes sunt ca niste usi mari.

Ele spun ce tip de acces cere aplicatia.

Pentru acest bot, la `Guild Install`, ai nevoie de:

1. `bot`
2. `applications.commands`

Ce inseamna:

- `bot` lasa aplicatia sa adauge bot user-ul in server.
- `applications.commands` lasa aplicatia sa creeze slash commands, cum ar fi `/ping`.

## Partea 12: alege permisiuni pentru bot

Botul nostru trebuie sa scrie raspunsuri si sa intre in voice.

Selecteaza aceste permisiuni:

1. `Send Messages`
2. `View Channels`
3. `Use Slash Commands`
4. `Connect`
5. `Speak`

Explicatie pe limba simpla:

- `View Channels`: botul poate vedea canalele unde are acces.
- `Send Messages`: botul poate raspunde in chat.
- `Use Slash Commands`: comenzile slash pot fi folosite.
- `Connect`: botul poate intra intr-un voice channel.
- `Speak`: botul poate trimite audio in voice channel.

Daca botul nu canta, foarte des problema este una din acestea:

- nu are `Connect`
- nu are `Speak`
- canalul vocal are permisiuni speciale care il blocheaza

## Partea 13: invita botul in server

1. In `Installation`, copiaza linkul de instalare.
2. Deschide linkul in browser.
3. Alege `Add to server`.
4. Alege serverul tau de test.
5. Confirma permisiunile.
6. Apasa `Authorize`.

Acum botul ar trebui sa apara in lista de membri a serverului.

Poate fi offline. Este normal.

Botul va fi online abia cand pornesti codul local cu `npm start`.

## Partea 14: instaleaza Node.js

Node.js este programul care ruleaza cod JavaScript pe calculatorul tau.

Fara Node.js, calculatorul tau nu stie sa porneasca botul.

1. Intra pe [nodejs.org](https://nodejs.org/).
2. Descarca versiunea LTS.
3. Instaleaz-o.
4. Inchide si redeschide terminalul.

Verifica instalarea:

```bash
node -v
```

Ar trebui sa vezi ceva de forma:

```text
v22.12.0
```

Numarul poate fi diferit. E ok.

Verifica si npm:

```bash
npm -v
```

`npm` vine impreuna cu Node.js.

## Partea 15: deschide proiectul in terminal

Trebuie sa fii in folderul proiectului.

Pe Windows, daca proiectul este aici:

```text
C:\Users\damia\Documents\Open Source\discordbot
```

Atunci in PowerShell poti rula:

```powershell
cd "C:\Users\damia\Documents\Open Source\discordbot"
```

Verifica unde esti:

```powershell
pwd
```

Ar trebui sa vezi folderul `discordbot`.

## Partea 16: intelege fisierele proiectului

Structura proiectului este:

```text
discordbot/
  index.js
  feature_portal.js
  features/
    ping.js
    joke.js
    music_portal.js
    music/
      play.js
      skip.js
      stop.js
      list.js
  package.json
  .env.example
  README.md
  TUTORIAL.md
```

Pe scurt:

- `package.json` spune ce pachete npm folosim si cum pornim botul.
- `.env.example` este un model pentru secrete.
- `.env` va fi fisierul tau real cu token si ID-uri.
- `index.js` porneste botul.
- `feature_portal.js` strange comenzile principale.
- `features/ping.js` face `/ping`.
- `features/joke.js` face `/joke`.
- `features/music_portal.js` creeaza `/music` si tine playerul audio.
- `features/music/play.js` face `/music play`.
- `features/music/list.js` face `/music list`.
- `features/music/skip.js` face `/music skip`.
- `features/music/stop.js` face `/music stop`.

## Partea 17: instaleaza pachetele npm

In terminal, in folderul proiectului, ruleaza:

```bash
npm install
```

Aceasta comanda citeste `package.json` si instaleaza pachetele necesare.

Botul nostru foloseste:

- `discord.js`: ca sa vorbeasca usor cu Discord.
- `@discordjs/voice`: ca sa intre in voice channel si sa redea audio.
- `play-dl`: ca sa caute si sa citeasca streamuri audio.
- `libsodium-wrappers`: ca voice audio sa poata fi criptat corect.
- `dotenv`: ca sa citeasca `.env`.

Dupa instalare, vei vedea un folder nou:

```text
node_modules/
```

Nu trebuie sa il editezi.

Este dulapul cu uneltele botului.

## Partea 18: creeaza fisierul .env

In proiect exista `.env.example`.

Acesta este doar un exemplu.

Tu trebuie sa creezi un fisier nou numit exact:

```text
.env
```

Pe Windows, poti face asta in VS Code:

1. Click dreapta in lista de fisiere.
2. `New File`.
3. Scrie `.env`.
4. Apasa Enter.

In `.env`, pune:

```env
DISCORD_TOKEN=tokenul_tau_aici
CLIENT_ID=id_ul_aplicatiei_tale_aici
GUILD_ID=id_ul_serverului_tau_aici
```

Exemplu fals:

```env
DISCORD_TOKEN=ABC.DEF.GHI
CLIENT_ID=123456789012345678
GUILD_ID=987654321098765432
```

Nu folosi valorile false de mai sus. Pune valorile tale reale.

## Partea 19: ce inseamna fiecare valoare din .env

`DISCORD_TOKEN`

Este parola botului. Vine din pagina `Bot` din Developer Portal.

`CLIENT_ID`

Este Application ID. Vine din `General Information`.

`GUILD_ID`

Este ID-ul serverului tau de test. Il copiezi din Discord cu Developer Mode pornit.

## Partea 20: porneste botul

In terminal, ruleaza:

```bash
npm start
```

Ar trebui sa vezi ceva de genul:

```text
Registering slash commands...
Slash commands registered.
Logged in as Tutorial Music Bot#1234
```

Cand vezi `Logged in`, botul este online.

Terminalul trebuie sa ramana deschis.

Daca inchizi terminalul, botul se opreste.

## Partea 21: verifica daca slash commands apar

In Discord:

1. Intra pe serverul tau de test.
2. Deschide un text channel.
3. Scrie `/`.
4. Cauta `ping`, `joke` sau `music`.

Daca nu apar imediat:

1. Asteapta cateva secunde.
2. Inchide si redeschide Discord.
3. Verifica daca `GUILD_ID` este serverul corect.
4. Opreste botul cu `Ctrl + C`.
5. Porneste-l iar cu `npm start`.

Acest proiect inregistreaza comenzile pe un singur server, nu global.

Asta e bine pentru invatare, pentru ca update-urile apar mai repede.

## Partea 22: testeaza /ping

Scrie:

```text
/ping
```

Botul trebuie sa raspunda:

```text
Pong!
```

Daca asta merge, botul primeste comenzi slash.

Este primul mare semn bun.

## Partea 23: testeaza /joke

Scrie:

```text
/joke
```

Botul trebuie sa raspunda cu o gluma aleasa random.

Daca asta merge, fisierele din `features/` se incarca bine.

## Partea 24: testeaza muzica

Acum partea distractiva.

1. Intra intr-un voice channel pe serverul tau.
2. Stai acolo.
3. Intr-un text channel, scrie:

```text
/music play query:never gonna give you up
```

Botul ar trebui sa:

1. intre in canalul tau vocal;
2. caute piesa pe YouTube;
3. adauge piesa in coada;
4. porneasca redarea.

Poti folosi si un URL YouTube:

```text
/music play query:https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

## Partea 25: vezi coada

Scrie:

```text
/music list
```

Botul va arata lista de melodii.

Daca ai pus trei melodii, vei vedea ceva de genul:

```text
Current music queue:
1. First Song - requested by Alex
2. Second Song - requested by Alex
3. Third Song - requested by Alex
```

Prima melodie este cea curenta.

Urmatoarele asteapta randul lor.

## Partea 26: sari peste o melodie

Scrie:

```text
/music skip
```

Botul opreste melodia curenta si incearca sa porneasca urmatoarea melodie din coada.

Daca nu mai exista alta melodie, coada devine goala.

## Partea 27: opreste tot

Scrie:

```text
/music stop
```

Botul va:

1. opri muzica;
2. sterge coada;
3. iesi din voice channel.

Aceasta este comanda de curatenie.

## Partea 28: cum opresti botul local

Mergi in terminalul unde ruleaza botul.

Apasa:

```text
Ctrl + C
```

Terminalul te poate intreba daca vrei sa opresti procesul.

Daca intreaba, confirma cu `Y` si Enter.

Botul va deveni offline in Discord.

## Partea 29: ce face npm start

In `package.json` exista:

```json
"scripts": {
  "start": "node index.js"
}
```

Asta inseamna:

Cand scrii:

```bash
npm start
```

npm ruleaza:

```bash
node index.js
```

`index.js` este usa de intrare a botului.

## Partea 30: ce face index.js

`index.js` face cinci lucruri mari:

1. Citeste `.env`.
2. Creeaza clientul Discord.
3. Incarca comenzile din `feature_portal.js`.
4. Trimite comenzile slash catre Discord.
5. Asculta interactiunile si ruleaza comanda potrivita.

Partea aceasta:

```js
import 'dotenv/config';
```

spune:

"Te rog, citeste fisierul `.env`."

Partea aceasta:

```js
const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;
```

spune:

"Ia valorile din `.env` si pune-le in variabile."

## Partea 31: de ce avem GatewayIntentBits.GuildVoiceStates

In `index.js`, clientul este creat cu:

```js
intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]
```

`Guilds` ajuta botul cu servere si slash commands.

`GuildVoiceStates` ajuta botul sa stie informatii despre voice channels, de exemplu daca tu esti intr-un canal vocal.

Fara `GuildVoiceStates`, botul nu ar sti unde sa intre cand scrii `/music play`.

## Partea 32: ce face feature_portal.js

`feature_portal.js` este ca o lista de meniu.

El spune:

- avem comanda `ping`;
- avem comanda `joke`;
- avem comanda `music`.

`index.js` citeste lista si le pregateste pe toate.

## Partea 33: ce face music_portal.js

`features/music_portal.js` este cel mai important fisier pentru muzica.

El face mai multe lucruri:

1. Creeaza comanda `/music`.
2. Adauga subcomenzile `play`, `list`, `skip`, `stop`.
3. Tine coada de melodii.
4. Creeaza audio player-ul.
5. Conecteaza botul la voice channel.
6. Cauta melodii.
7. Porneste urmatoarea melodie cand una se termina.

Coada este tinuta in memorie:

```js
queue: []
```

Asta inseamna:

Daca opresti botul, coada dispare.

Pentru un tutorial, este perfect. Pentru un bot mare, ai putea salva datele intr-o baza de date.

## Partea 34: ce face /music play

Cand scrii:

```text
/music play query:o melodie
```

codul face:

1. Citeste textul din `query`.
2. Verifica daca esti intr-un voice channel.
3. Conecteaza botul in canalul tau.
4. Cauta melodia cu `play-dl`.
5. Pune melodia in queue.
6. Daca nu canta deja nimic, porneste melodia.

## Partea 35: ce face /music skip

`/music skip` spune playerului:

"Opreste melodia curenta."

Cand playerul devine liber, `music_portal.js` incearca sa porneasca urmatoarea melodie.

## Partea 36: ce face /music stop

`/music stop` este mai puternic decat skip.

El spune:

1. opreste playerul;
2. goleste coada;
3. distruge conexiunea voice;
4. scoate botul din canal.

## Partea 37: greseli comune si reparatii

### Problema: `Missing DISCORD_TOKEN, CLIENT_ID, or GUILD_ID`

Inseamna ca `.env` lipseste sau are nume gresit.

Verifica:

1. Fisierul se numeste exact `.env`.
2. Nu se numeste `.env.txt`.
3. Are toate cele trei valori:

```env
DISCORD_TOKEN=...
CLIENT_ID=...
GUILD_ID=...
```

### Problema: botul este offline

Botul local este online doar cand terminalul ruleaza.

Ruleaza:

```bash
npm start
```

Daca terminalul se inchide, botul se opreste.

### Problema: comenzile slash nu apar

Verifica:

1. Ai invitat botul in server?
2. Ai pus `applications.commands` la scopes?
3. `GUILD_ID` este ID-ul serverului corect?
4. Botul a pornit fara erori?
5. Ai incercat sa repornesti Discord?

### Problema: botul spune ca trebuie sa fii intr-un voice channel

Intra intr-un voice channel inainte sa folosesti:

```text
/music play
```

Botul intra in canalul in care esti tu.

### Problema: botul intra in voice dar nu canta

Verifica:

1. Botul are permisiunea `Speak`.
2. Botul are permisiunea `Connect`.
3. Volumul tau Discord nu este pe 0.
4. Botul nu este mutat de server.
5. Canalul vocal nu are permisiuni speciale.

### Problema: YouTube nu merge

Acest bot foloseste `play-dl`.

Serviciile video isi pot schimba modul in care livreaza audio. Cand se intampla asta, pachetele care citesc streamuri pot avea nevoie de update.

Incearca:

```bash
npm update
```

Apoi:

```bash
npm start
```

### Problema: PowerShell blocheaza npm

Pe unele sisteme Windows, comanda `npm` poate fi blocata de execution policy.

Incearca:

```powershell
npm.cmd install
```

si:

```powershell
npm.cmd start
```

## Partea 38: reguli de siguranta

Nu publica `.env`.

Nu trimite tokenul nimanui.

Nu pune tokenul in poze.

Daca ai expus tokenul:

1. Mergi in Discord Developer Portal.
2. Intra la aplicatia ta.
3. Mergi la `Bot`.
4. Apasa `Reset Token`.
5. Pune noul token in `.env`.
6. Porneste botul din nou.

Tokenul este cheia botului.

Trateaza-l ca pe parola contului tau.

## Partea 39: ce inseamna "local"

Local inseamna:

Botul ruleaza pe calculatorul tau.

Discord este pe internet.

Calculatorul tau se conecteaza la Discord.

Cat timp calculatorul tau si terminalul sunt pornite, botul poate functiona.

Daca inchizi laptopul, botul se opreste.

Pentru ca botul sa stea online mereu, trebuie pus pe un server sau host. Acest tutorial este doar pentru rulare locala.

## Partea 40: checklist final

Inainte sa spui "nu merge", verifica lista aceasta:

1. Am Node.js instalat.
2. Sunt in folderul `discordbot`.
3. Am rulat `npm install`.
4. Am creat `.env`.
5. `.env` are `DISCORD_TOKEN`.
6. `.env` are `CLIENT_ID`.
7. `.env` are `GUILD_ID`.
8. Botul este invitat in server.
9. Botul are `applications.commands`.
10. Botul are `bot` scope.
11. Botul are `Connect`.
12. Botul are `Speak`.
13. Am pornit botul cu `npm start`.
14. Sunt intr-un voice channel.
15. Am testat `/ping`.
16. Am testat `/music play`.

Daca toate sunt bifate, botul ar trebui sa functioneze.

## Partea 41: mini-glosar

`Application`

Aplicatia creata in Discord Developer Portal. Este containerul mare.

`Bot`

Userul automat care intra in server.

`Token`

Parola botului.

`Client ID`

ID-ul aplicatiei.

`Guild ID`

ID-ul serverului.

`Slash command`

Comanda care incepe cu `/`, de exemplu `/ping`.

`Voice channel`

Canalul Discord unde oamenii vorbesc audio.

`Queue`

Lista de melodii care asteapta sa fie cantate.

`npm`

Programul care instaleaza si ruleaza pachete Node.js.

`node_modules`

Folderul unde npm pune pachetele instalate.

`.env`

Fisierul unde punem secretele locale.

## Partea 42: prima sesiune completa, de la cap la coada

Acesta este traseul scurt, dupa ce ai facut setup-ul o data:

1. Deschizi terminalul.
2. Intri in proiect:

```powershell
cd "C:\Users\damia\Documents\Open Source\discordbot"
```

3. Pornesti botul:

```bash
npm start
```

4. Deschizi Discord.
5. Intri in serverul de test.
6. Scrii:

```text
/ping
```

7. Intri intr-un voice channel.
8. Scrii:

```text
/music play query:lofi hip hop
```

9. Adaugi inca o melodie:

```text
/music play query:chill music
```

10. Vezi coada:

```text
/music list
```

11. Sari peste piesa:

```text
/music skip
```

12. Opresti botul din voice:

```text
/music stop
```

13. Opresti botul local cu `Ctrl + C`.

Gata. Ai folosit un bot Discord local, cu slash commands si muzica reala.

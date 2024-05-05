import config from "./config.js";
import axios from "axios";


const otherAdmins = [
    "6482749", //TheSalonSeattle
    "6382797", //TheEvilPadawan
    "6381972", //Tabaris
]

const eventDescription = '<p><span style="text-size-adjust: 100%;">Venue opens: 6:00 PM</span><br></p><p><span style="text-size-adjust: 100%;">Bracket starts: 7:00 PM<br></span></p><p><strong>Address: 1923 1st Ave</strong><br>No venue fee, free bracket entry.<br>$175 split between top 3, $100/50/25.</p><p>Prize will be modified if &lt;12 entrants.<br><strong>Please bring your own controller. We play on PC setups</strong></p><p><strong><br></strong></p><p>Additional Info:<br></p><ul>\r\n' +
    '<li>\r\n' +
    '<em></em><em></em>Outside food and beverage welcome. Hmart as well as Market Grocery &amp; Deli are two convenient nearby options, open until 9:30 PM.</li>\r\n' +
    '<li>Wifi network name is "TheSalon", the password is "psychocrusher".<br>\r\n' +
    '</li>\r\n' +
    '<li>Free parking is available at the Amazon Doppler parking garage, about a ten minute walk from the venue. Otherwise street or paid lot parking is available closer to the venue.</li>\r\n' +
    '<li>Westlake Station is a ten minute walk from the venue, for those that ride the light rail.</li>\r\n' +
    '</ul>'

//change what date you want to start
let date = new Date("2024-05-12T19:00:00.000Z");
date.setHours(date.getHours() + 8)
//change to the number you want
let number = 33

for (let i = 1; i < 11; i++) {
    await createEvent(number, date)
    number += 1
    date.setDate(date.getDate() + 7)
}

async function createEvent(number, date) {
    const titleDate = `${date.getMonth() + 1}/${date.getDate()}`
    number = parseInt(number)
    try {
        const response = await axios.post("https://api.challonge.com/v1/tournaments.json", null, {
            params: {
                api_key: config.challongeApiKey,
                "tournament[name]": `Tekken @ the Salon #${number} (${titleDate})`,
                "tournament[start_at]": date.toJSON(),
                "tournament[game_name]": "Tekken 8",
                "tournament[description]": eventDescription,
                "tournament[admin_ids_csv]": otherAdmins.join(","),
                "tournament[tournament_type]": "double elimination",
                "tournament[url]": `tknsalon${number}`,
                "tournament[public_sign_up]": "1",
                "tournament[open_signup]": true,
                "tournament[quick_advance]": true
            }
        });
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}


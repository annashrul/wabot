document api swagger : https://wabot.pesanku.id/api/

WA MULTIDEVICE BETA
URL : https://wabot.pesanku.id/
SOCKET : https://wabot.pesanku.id/wa-md
Dokumentasi API : https://wabot.pesanku.id/api

Step To Connect WaCore : 
- Register device menggunakan API
- Connect ke socket
- Scan QR
- Connect berhasil
- Kirim pesan

Untuk melakukan register device silahkan menggunakan api register device.

Berikut contoh dari response api register device : 

{
  "name": "khadafi",
  "phone_number": "628561205976",
  "id": "sktwid4dkp47s5d7",
  "created_at": "2021-05-25T15:49:35.658Z",
  "updated_at": "2021-05-25T15:49:35.658Z"
}

------------------------------------------------------------------------
Untuk mendaftar callback silahkan menggunakan API Callback

Contoh Post data Callback ketika menerima pesan dari WA: 

{
  "device_id": "sktwid4dkp47s5d7",
  "meta": {
    "remoteJid": "6285277677761@s.whatsapp.net",
    "fromMe": false,
    "id": "3EB09534D13F9480E9BD"
  },
  "timestamp": "1623586389",
  "message": {
    "conversation": "ok"
  }
}

-----

API Send Message:
/wa-md/{id}/send-message
Parameter : 
to : alamat tujuan (nohp, id group, id broadcast) (Untuk pengiriman multiple, dipisah by tanda ,)
message : pesan
type : (group, message, broadcast)
-------

API Get Contact
/wa-md/{id}/get-contact
parameter : 
limit : 10 (limit data perhalaman)
page : 1 (halaman)
type : (group, message, broadcast)

API Send Message Custom
/wa-md/{id}/send-message-custom
--CUSTOM 1
POST : https://wabot.pesanku.id/wa-md/2ew3mnu2stfl602xhju/send-message-custom
PARAMATER :
{
    "to": "085277677761",
    "type": "message",
    "message": {
        "text": "oh hello there"
    }
}
--CUSTOM 2
POST : https://wabot.pesanku.id/wa-md/2ew3mnu2stfl602xhju/send-message-custom
PARAMATER :
{
    "to": "085277677761",
    "type": "message",
    "message": {
        "text": "Hi it's button message",
        "footer": "Hello World",
        "buttons": [
            {
                "buttonId": "id1",
                "buttonText": {
                    "displayText": "Button 1"
                },
                "type": 1
            },
            {
                "buttonId": "id2",
                "buttonText": {
                    "displayText": "Button 2"
                },
                "type": 1
            },
            {
                "buttonId": "id3",
                "buttonText": {
                    "displayText": "Button 3"
                },
                "type": 1
            }
        ],
        "headerType": 1
    }
}
--CUSTOM 3
POST : https://wabot.pesanku.id/wa-md/2ew3mnu2stfl602xhju/send-message-custom
PARAMATER :
{
    "to": "085277677761",
    "type": "message",
    "message": {
        "text": "Hi it's a template message",
        "footer": "Hello World",
        "templateButtons": [
            {
                "index": 1,
                "urlButton": {
                    "displayText": "⭐ Star Pesanku!",
                    "url": "https://pesanku.id"
                }
            },
            {
                "index": 2,
                "callButton": {
                    "displayText": "Call me!",
                    "phoneNumber": "+6285 776 77761"
                }
            },
            {
                "index": 3,
                "quickReplyButton": {
                    "displayText": "This is a reply, just like normal buttons!",
                    "id": "id-like-buttons-message"
                }
            }
        ]
    }
}

--CUSTOM 4
POST : https://wabot.pesanku.id/wa-md/2ew3mnu2stfl602xhju/send-message-custom
PARAMATER :
{
    "to": "085277677761",
    "type": "message",
    "message": {
        "text": "This is a list",
        "footer": "nice footer, link: https://google.com",
        "title": "Amazing boldfaced list title",
        "buttonText": "Required, text on the button to view the list",
        "sections": [
            {
                "title": "Section 1",
                "rows": [
                    {
                        "title": "Option 1",
                        "rowId": "option1"
                    },
                    {
                        "title": "Option 2",
                        "rowId": "option2",
                        "description": "This is a description"
                    }
                ]
            },
            {
                "title": "Section 2",
                "rows": [
                    {
                        "title": "Option 3",
                        "rowId": "option3"
                    },
                    {
                        "title": "Option 4",
                        "rowId": "option4",
                        "description": "This is a description V2"
                    }
                ]
            }
        ]
    }
}
--CUSTOM 5
POST : https://wabot.pesanku.id/wa-md/2ew3mnu2stfl602xhju/send-message-custom
PARAMETER : 
{
    "to": "085277677761",
    "type": "message",
    "message": {
        "image": {
            "url": "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2022/6/7/1df37611-ee39-4c6b-a569-82ec1bd8c41b.jpg.webp?ect=4g"
        },
        "caption": "Hi it's button message",
        "footer": "Hello World",
        "buttons": [
            {
                "buttonId": "id1",
                "buttonText": {
                    "displayText": "Button 1"
                },
                "type": 1
            },
            {
                "buttonId": "id2",
                "buttonText": {
                    "displayText": "Button 2"
                },
                "type": 1
            },
            {
                "buttonId": "id3",
                "buttonText": {
                    "displayText": "Button 3"
                },
                "type": 1
            }
        ],
        "headerType": 4
    }
}

KONEKSI SOCKET
Event di Koneksi Socket 

List Event Listener Server (Emit)
- connect-wa
Parameter yang harus di kirim ke server : 
{
   "deviceId" : "2ew3lqslo1krwtdssb" (ID dari device)
}

- send-message
Parameter yang harus di kirim ke server : 
{
   "deviceId" : "sktwid4dkp47s5d7" (ID dari device),
	 "to":"6285277677761",
   "message":"test"
}

- disconnect-wa (Untuk melakukan disconnect terhadap whatsapp)
Parameter yang harus di kirim ke server : 
{
   "deviceId" : "sktwid4dkp47s5d7" (ID dari device)
}


List Event Listener Client (Listen)
- qrReload
Event yang dikirim oleh server ketika ada QR yang harus di scan
Parameter : {qr:xxxx}

- connecting
Event yang dikirim oleh server ketika koneksi ke whatsapp sedang dilakukan

- connected 
Event yang dikirim oleh server ketika whatsapp berhasil konek

- failed
Event yang dikirim oleh server ketika ada proses yang gagal

Contoh Code untuk Connect ke wa 
this.socket.emit('connect-wa', { deviceId: this.deviceId });

- disconnected
Event yang dikirim ketika whatsapp disconnect dari device
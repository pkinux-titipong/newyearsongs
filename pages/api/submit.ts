import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

type SheetForm = {
    song: String
    artist: String
    name: String
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    if(req.method !== 'POST'){ 
        return res.status(405).send({message: ' Only POST allowed'})
    }

    const body = req.body as SheetForm
    try{
        const auth = new google.auth.GoogleAuth({
            credentials:{
                client_email: "newyearsong@sheetapi-427613.iam.gserviceaccount.com",
                private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDCHJ6VopBAGjzC\n9Da2ZgRbOTUAygfe7D0lm2KnRm2qowdGhviYyH3e14PbOBx+xSmKcw78DyInKEyl\nVhOTV31T47GnefgMiAbCqRAyRdFjB6lCOvlfORr1FZhw8yl5HIRhRJDqUMqx/OHO\no8AeHJaAscEoQDcGdjCuLHa/UC62wEMiy8ymwqhwcWblUquAOsjjEjrkF3T/0ZD9\nnpnk4fPpf22Mtm8QbUXzkZ+gxSQ1oIHhkPxz0VcdFSFDg85/PXoVsCxBCC9B+UEB\nDCfoU/xKsT8vV6qX2A+UxgJzfHw9qcV8PMtq9CnmZVNYcfOOWLY82F1TPG93AUap\nDo/naGY3AgMBAAECggEADRCWD+Y4JUhezJRZVl95bZZlHd97NiLaXrydoDqaSQDe\nDX4qH0ZnSmdhBZE6QcINcLcbzBVMrCwHNJ2dha4+zjWmEGqiKl3BbrqoT2nplOvA\nFagYfrM+QD6q2vdS1Eb6Ff3ibxLvAZnOrPTSinRMIO9V29qumW29CwwNFgVUj5I1\nJnK8zGjPIPhGKoYqkqrcSHzMFQGflTCXda0Ys1r6zJcFboxT9N1g+p4Md4Jq7OZL\nAx1KcNHjL6yl4T3SnXbrPSn4pWR3BHJkvRcwIGicTpbLG9CdIdtkLrn7l7flvvX/\n/f1mZivZfNUpxa0Q6dyVQYyFFPUUVnsxbNxRNFZIAQKBgQDqrRGcxVg0lqUNHDxa\n3yrj/QFTgK7n9nbqJLyIilP6okS5xHnW4GvgbtcAh50kTnhCvZsWUejAy2pkFLij\nsuWfZimh4QbVbtv9Nsyh7Ks0cYzvH5430dECUpBoV78a7fyqzxkpdHj2gCsj8ZsX\nVqcMZEFi++cdm/ad62Wa2zZKNwKBgQDTv/Z5DmrE/7sbHhd4Vf7Vjoq/eG9OmZC0\nS9JRZmmiP4VWE+43Mmxs46zrgA/jnuOJSaq1jJ55U3nIKHwhJb8tRGCnUHHrGICc\n6AZ17ibpNS6pK6f7exJd3WPWt07LD/dztIuNynmYda9xOYWh8++yqPRhYv1CyqT7\n9mB3L6DEAQKBgQC3XdPNM0XgkXUV8WIXfxj8W8yVeo8wIJx6B4ppBezogbJBlQu+\nokyoaPMGLvDSVZ4SSCTOI+JCAq9209oRzs8s5Z7SJgo46w5ppE/wlgSQTclZbtMp\nuoAd2HWNkkJ4wEwVCw0WHzQFJ9CNnVMZwVN1k0CkH0BPGnZwnmYdwfuBsQKBgDBx\nPSDKtJBm9NYqVzI3cjpHBuTw134C0cD9i5sFs+rjX0ym+Jt2FKoAmCG0RW5Mfj99\nM+mexu54s2agJG2s5gSkHPyKAdXH4DyFNF0sY4h8mzUmgKKesD/7EwkfHI6GE5VL\n25VPmevQGJftke3QEaksz+Orssbh90aRQdZidgQBAoGAEJhaQ8Vgka3mMBzYvumh\nsiU4Taf4NzX9klPXOOO8K1pQQYr1IOUprf6I955QXrPKqm7APqfMwUNPX4VfXteF\nUEoIcwSAsmhGnPLIn7Ox6AA4FQZAxlHMRGEoVjhWuN8M4R6pfVQ5MJGzkwYJ2Fd+\nrGQnOR2zXWKhL/nuJM8l/qc=\n-----END PRIVATE KEY-----\n"
            },
            scopes:[
                'https://www.googleapis.com/auth/drive',
                'https://www.googleapis.com/auth/drive.file',
                'https://www.googleapis.com/auth/spreadsheets',
            ]
        });

        const sheets = google.sheets({
            auth,
            version: 'v4'
        });

        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: "1gk8GZWqJiRuFyPNyqSEqS04nVFakX_FFdoTA1jquNwo",
            range: 'Sheet1!A1:C1',
            valueInputOption: 'USER_ENTERED',
            requestBody:{
                values:[
                    [body.song, body.artist, body.name,]
                ]
            }
        });

        return res.status(201).json({
            data: response.data
        
        });
    }catch(e){
        console.error(e)
        return res.status(500).send({message:'มีบางอย่างผิดพลาดแน่ ๆ'})
    }
}
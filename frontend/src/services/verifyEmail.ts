import { setCookie } from "../utils/cookie";

const delay = (ms: any) => new Promise(res => setTimeout(res, ms));
const verifyEmail = async () => {
    const urlParams = new URLSearchParams(window.location.hash);
    const code = urlParams.get('oobCode');

    try {
        const body = {
            oobCode: code
        }
        // console.log('sending oobCode: ', body)
        const res = await fetch(`http://localhost:8080/verify-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })
        if (res.status === 201) {
            const resObject = await res.json()

            setCookie('token', resObject.token)
            // console.log('Registered with token: ', resObject.token)

            console.log('Successfully verified your email!')

            await delay(1000);
            window.location.href = "/graphical-services-website#/";
        } else {
            const message = await res.json()
            console.error(message)
        }
    } catch (error) {
        console.error(error)
    }
}

export default verifyEmail

/*
Processo para criar o banco de dados:
1. Enviar o link de verificação de email
2. Usuário clica e é redirecionado para uma das páginas do site -> '/verify-email'
3. Faço um fetch method GET
4. Mando o oobCode
5. Vejo se está válido, e se estiver, já crio os dados no banco de dados
*/
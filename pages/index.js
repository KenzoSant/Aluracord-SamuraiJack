import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import appConfig from '../config.json';
import { useRouter } from 'next/router';
import React from 'react';


function Titulo(props) {
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
            ${Tag} {
                color: ${appConfig.theme.colors.neutrals['000']};
                font-size: 24px;
                font-weight: 600;
            }
            `}</style>
    </>
  );
}

// Componente React
// function HomePage() {
//     // JSX
//     return (
//         <div>
//             <GlobalStyle />
//             <Titulo tag="h2">Boas vindas de volta!</Titulo>
//             <h2>Discord</h2>
//         </div>
//     )
// }
// export default HomePage

const gitHubRequest = async (username) => {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const userInfos = await res.json();
  } catch (err) {
    console.error(err);
  }
};


export default function PaginaInicial() { 
  //const [username, setUsername] = React.useState('KenzoSant');
  const [username, setUsername] = React.useState("");
  const [displayInfos, setDisplayInfos] = React.useState("none");
  const [userIsInvalid, setuserIsInvalid] = React.useState("true");
  const [showUserImage, setUserImage] = React.useState("https://openclipart.org/download/247319/abstract-user-flat-3.svg"); 
  const roteamento = useRouter();
  
  return (
    <>

        <Box
          styleSheet={{
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            //backgroundColor: appConfig.theme.colors.primary[200],
            backgroundImage: 'url(https://www.futuregamereleases.com/wp-content/uploads/2020/08/apps.52105.14073698868815407.72b02da3-3246-450a-b4f8-828cce333a35.jpg)',
            backgroundRepeat: 'no-repeat', 
            backgroundSize: 'cover',
            backgroundBlendMode: 'multiply',
          }}
        >

        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', 
            maxWidth: '700px',
            borderRadius: '10px', 
            padding: '32px', 
            margin: '16px',
            background: 'rgba(33,41,49,0.8)',
            boxShadow: '0 5px 15px rgba(0,0,0,0.8)',
            border: '1px solid',
            borderColor: appConfig.theme.colors.primary[600],
          }}
        >

        {/* Formulário */}
        <Box
          as="form"
          onSubmit={function (InfosEvent){
            InfosEvent.preventDefault()
            !userIsInvalid
                ? (roteamento.push(`/chat?username=${username}`))
                : setUserFound("");
          }}
          styleSheet={{
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            width: { xs: '100%', sm: '50%' }, 
            textAlign: 'center', 
              marginBottom: '32px',
          }}
        >

        <Titulo tag="h2">Boas vindas de volta!</Titulo>

        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
        </Text>

         {/* <input
          type="text"
          value={username}
          onChange={function (){
            console.log('user',event.target.value);    
            // Onde esta o valor? (NickName)
            const valor = event.target.value
            // Trocar valor
            setUsername(valor)
          }}
        />   */}

        <TextField
          required 
          fullWidth
          value={username}
          onChange={function (){    
            // Onde esta o valor? (NickName)
            const valor = event.target.value
            // Trocar valor
            valor.length >= 2
                  ? (setUserImage(`https://github.com/${valor}.png`),
                    setDisplayInfos(""),
                    setuserIsInvalid(""))
                  : (setUserImage("https://openclipart.org/download/247319/abstract-user-flat-3.svg"),
                    setDisplayInfos("none"),
                    setuserIsInvalid("true"));
                setUsername(valor);
          }}
          textFieldColors={{
            neutral:{
              textColor: appConfig.theme.colors.neutrals[200],
              mainColor: appConfig.theme.colors.primary[400],
              mainColorHighlight: appConfig.theme.colors.primary[950],
              backgroundColor: appConfig.theme.colors.neutrals[800],
            }
          }}
        /> 

        <Button
          type='submit'
          label='Entrar'
          disabled= {`${userIsInvalid}`}
          fullWidth
          buttonColors={{
            contrastColor: appConfig.theme.colors.neutrals["000"],
            mainColor: appConfig.theme.colors.primary[400], 
            mainColorLight: appConfig.theme.colors.primary[400],
            mainColorStrong: appConfig.theme.colors.primary[950],
          }}
          styleSheet={{
            transition: "0.5s",
          }}
        />    

        </Box>
          {/* Formulário */}

          {/* Photo Area */}

            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '16px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                border: '1px solid',
                borderColor: appConfig.theme.colors.primary[400],
                borderRadius: '10px',
                flex: 1,
                minHeight: '240px',
              }}
            >

            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={`${showUserImage}`}
            />

            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            > 
              {username.length < 3 ? `User not found` : username}
            </Text>

            </Box>
            {/* Photo Area */}
        </Box>
        
      </Box>
    </>
  );
}
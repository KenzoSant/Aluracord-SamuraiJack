import { Box, Button, Text, TextField, Image, Icon } from '@skynexui/components';
import appConfig from '../config.json';
import React from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from "next/router";
import { ButtonStickers } from '../src/componets/ButtonStickers'

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzM0MDE2NywiZXhwIjoxOTU4OTE2MTY3fQ.nsRK4zSMcfsU2B8lYaIL5vRjU9wNCtOHMg4hck6T2xM';
const SUPABASE_URL = 'https://qqzhxwurnupjdmtbrmrd.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function tempoMensagens(addMensagem){
    return supabaseClient
    .from('mensagens')
    .on('INSERT', (msg) => {
        console.log("ouve nova mensagem");
        addMensagem(msg.new)
    })
    .subscribe();
}

export default function ChatPage() {

    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);
    const [carregando, setCarregando] = React.useState(true);
    const roteamento = useRouter();
    const user = roteamento.query.username;

    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                console.log('Dados da consulta:', data);
                setListaDeMensagens(data);
                setCarregando(false)
            });

        tempoMensagens((novaMensagem) => {
            setListaDeMensagens((ValorAtualDaLista) => {
                return [
                    novaMensagem,
                    ...ValorAtualDaLista,
                ]
            });
        });
    },[]);

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
          // id: listaDeMensagens.length + 1,
          de: user,
          texto: novaMensagem,
        };
    
        if (user === "") {
          return window.alert("Please Log In before message");
        }
        if (novaMensagem.length > 0) {
          supabaseClient
            .from("mensagens")
            .insert([mensagem])
            .then(({ data }) => {
              console.log("Criando mensagem: ", data);
              // setListaDeMensagens([data[0], ...listaDeMensagens]);
            });

            setMensagem("");

        } else {
          window.alert("You can't send empty messages.");
        }
      }

    function handleDeleteMessage(event, id, de) {
        event.preventDefault();
        if (user == de) {
          supabaseClient
            .from("mensagens")
            .delete()
            .match({ id: id })
            .then(({ data }) => {
              const apagarElementoLista = listaDeMensagens
              .filter(
                    (mensagem) => mensagem.id !== id
                );
              setListaDeMensagens(apagarElementoLista);
            });
        }else {
          window.alert("Você não pode excluir mensagens de outros usuários!");
        }
    }


    return(

        <Box
            styleSheet={{
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundImage: `url(https://www.futuregamereleases.com/wp-content/uploads/2020/08/apps.52105.14073698868815407.72b02da3-3246-450a-b4f8-828cce333a35.jpg)`,
                backgroundRepeat: 'no-repeat', 
                backgroundSize: 'cover', 
                backgroundBlendMode: 'multiply',
            }}
        >

        <Box
            styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                boxShadow: '0 5px 15px rgba(0,0,0,0.8)',
                borderRadius: '10px',
                background: 'rgba(33,41,49,0.8)',
                border: '1px solid',
                borderColor: appConfig.theme.colors.primary[600],
                height: '100%',
                maxWidth: '80%',
                maxHeight: '95vh',
                padding: '32px',
            }}
        >

        <Header />

        <Box
            styleSheet={{
                position: 'relative',
                display: 'flex',
                flex: 1,
                height: '70%',
                backgroundColor: appConfig.theme.colors.neutrals[600],
                border: '1px solid',
                borderColor: appConfig.theme.colors.primary[400],
                flexDirection: 'column',
                borderRadius: '5px',
                padding: '16px',
            }}
        >

        <MessageList mensagens={listaDeMensagens} onDelete={handleDeleteMessage} carregando={carregando}/>

        <Box
            as="form"
            styleSheet={{
                display: 'flex',
                alignItems: 'stretch',
            }}
        >

        <TextField
            value={mensagem}
            onChange={(e) => {
                const valor = e.target.value;
                setMensagem(valor);
            }}
                                
            onKeyPress={(e) => {
                if (e.key === 'Enter') {               
                    if (mensagem.length < 1) {
                        e.preventDefault(); 
                    } else {
                        e.preventDefault(); 
                        handleNovaMensagem(mensagem);
                    }
                }
            }}

            placeholder="Mensagem"
            type="textarea"
            styleSheet={{
                width: '90%',
                border: '0',
                borderRadius: '10px',
                padding: '14px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                color: appConfig.theme.colors.neutrals[200],
            }}
        />

        <Button
            onClick={(event) => {
                if (mensagem.length < 1) {
                    event.preventDefault(); 
                } else {
                    event.preventDefault(); 
                    handleNovaMensagem(mensagem);
                    document.querySelector('textarea').focus()
                }
            }}

            type='submit'
            label='Enviar'

            buttonColors={{
                backgroundColor: appConfig.theme.colors.neutrals[800],
                color: appConfig.theme.colors.neutrals[200],
            }}

            styleSheet={{
                width: '15%',
                maxHeight: '90%',
                marginLeft: '10px',
                minWidth: '50px',
                border: '0',
                borderRadius: '10px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                color: appConfig.theme.colors.neutrals[200],
            }}
        />

        <ButtonStickers
            onStickerClick={(sticker) => {
                handleNovaMensagem(':sticker:' + sticker)
            }}
        />       

                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >

                <Text 
                    variant='heading5'
                    styleSheet={{
                        color: appConfig.theme.colors.neutrals['100'],
                        fontSize:'20px',
                    }}
                >
                    Chat
                </Text>

                <Button

                    styleSheet={{
                        transition: "0.5s",
                    }}
                    variant='tertiary'
                    colorVariant='light'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    console.log(props);

    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                height: '100%',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '20px',
                
            }}
        >

        {props.carregando && (

            <Box
                styleSheet={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
            >
                    
                <Text 
                    tag="strong"
                    styleSheet={{ 
                        color: appConfig.theme.colors.neutrals[100], 
                        fontSize: '20xp',
                    }}
                    >
                    Carregando mensagens...                   
                </Text>

            </Box>
        )} 

        {props.mensagens.map((mensagem) => {
                
            return (

                <Text
                    key={mensagem.id}
                    tag="li"
                    styleSheet={{
                        borderRadius: '1px',
                        padding: '18px',
                        fontSize: '14px',
                        marginBottom: '10px',
                        borderTop: `1.5px solid ${appConfig.theme.colors.neutrals[800]}`,
                        hover: {
                            backgroundColor: appConfig.theme.colors.neutrals[700],
                        }
                    }}
                >

                <Box
                    styleSheet={{
                        marginBottom: '8px',
                        display: 'flex',
                        alignContent: 'center',
                        alignItems: 'center',
                    }}
                >

                <Image
                    styleSheet={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        display: 'inline-flex',
                        marginRight: '10px',
                    }}
                    src={`https://github.com/${mensagem.de}.png`}
                />

                <Text>

                    <Text
                        styleSheet={{
                        padding: '5px',
                        borderBottom: `1px solid ${appConfig.theme.colors.neutrals[100]}` ,  
                        }}                               
                    >
                        {mensagem.de}
                    </Text>          

                    <Text
                        styleSheet={{
                            fontSize: '12px',
                            marginLeft: '35px',
                            color: appConfig.theme.colors.neutrals[400],
                        }}
                        tag="span"
                    >

                    {(new Date().toLocaleDateString())}
  
                    <Text
                        key={mensagem.id}
                        type="submit"
                        onClick={(event) => {
                                return props.onDelete(event, mensagem.id, mensagem.de);
                        }}
                        title={`Apagar mensagem`}
                        styleSheet={{
                            backgroundColor: appConfig.theme.colors.neutrals[800],
                            borderRadius: "5px",
                            color: appConfig.theme.colors.neutrals[100],
                            paddingHorizontal:'4px',
                            fontWeight: "bold",
                            marginLeft:'35px',
                            transition: "0.5s",
                            cursor: 'pointer',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[500],
                            },
                        }}
                    >
                        X
                    </Text> 

                    </Text>

                    <Box
                        styleSheet={{
                            color: appConfig.theme.colors.neutrals[100],
                            fontSize: '14px',
                            marginTop: '15px',
                        }}
                    >
                        {mensagem.texto.startsWith(':sticker:') 
                            ?(
                                <Image 
                                    src={mensagem.texto.replace(':sticker:','')}
                                    styleSheet={{
                                        maxWidth:'50%',
                                    }}
                                
                                />
                            )
                            :(
                                mensagem.texto
                            )
                        }
                        
                    </Box>
                                       
                </Text>
                </Box>
                </Text>
            )
        })}
        </Box>
    )
}

/*
    // Usuário
    - Usuário digita no campo textarea
    - Aperta enter para enviar
    - Tem que adicionar o texto na listagem
    
    // Dev
    - [X] Campo criado
    - [X] Vamos usar o onChange usa o useState (ter if pra caso seja enter pra limpar a variavel)
    - [X] Lista de mensagens 
    */

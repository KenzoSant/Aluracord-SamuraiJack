import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import appConfig from '../config.json';
import React from 'react';


export default function PageNotFound() {
    return(
        <>
            <Box
                styleSheet={{
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                //backgroundColor: appConfig.theme.colors.primary[200],
                backgroundImage: 'url(https://cutewallpaper.org/21/samurai-jack-hd-wallpaper/Samurai-Jack-HD-Wallpaper-Background-Image-1920x1080-.png)',
                backgroundRepeat: 'no-repeat', 
                backgroundSize: 'cover',
                backgroundBlendMode: 'multiply',
                }}
            >
                <Text
                    variant="body4"
                    styleSheet={{
                    position: 'absolute',
                    top: '160px',
                    fontSize: '20px',
                    fontWeight: '500',
                    color: appConfig.theme.colors.neutrals[200],
                    backgroundColor: appConfig.theme.colors.neutrals[900],
                    border: '1px solid',
                    borderColor: appConfig.theme.colors.neutrals[200],
                    padding: '25px 20px',
                    borderRadius: '1000px',
                    }}
                >
                    <strong>404</strong> Você foi lançado em um futuro distante !
                </Text>
            </Box>
        </>
    );
}



fx_version 'cerulean'
rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'
lua54 'yes'
games {'gta5', 'rdr3'}



client_scripts {
    'build/client/*.js',
    'client.lua',
} 


server_scripts {
    'build/server/*.js',
    'server.lua',
}

provide 'redux_bridge'
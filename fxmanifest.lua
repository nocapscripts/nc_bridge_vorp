fx_version 'cerulean'
rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'
lua54 'yes'
games {'gta5', 'rdr3'}

author 'Redux'

shared_scripts {
    '@ox_lib/init.lua',
}

client_scripts {
    '@redux_errorlog/client/cl_errorlog.lua',
    'build/client/*.js',
    'client.lua',
} 


server_scripts {
    '@redux_errorlog/server/sv_errorlog.lua',
    'build/server/*.js',
    'server.lua',
}

provide 'redux_bridge'
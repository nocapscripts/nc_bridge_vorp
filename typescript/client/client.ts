import { onServerCallback, triggerServerCallback } from '@overextended/ox_lib/client';
const exp = global.exports;

function GetCharacter() {
        // Triggering a server callback with the name 'test:server', sending arguments and awaiting the response.
        const response = triggerServerCallback<{ data: string }>('test:server', source);

        // Logging the response from the server (expected response contains a 'serverValue' of type number)
        //console.log('Response from server:', response["money"]);

        // You can now return or use the 'response' as needed
        //return response;

        return response
  
}


RegisterCommand('testcb', async() => {
    GetCharacter()
}, false)



exp("GetCharacter", GetCharacter);

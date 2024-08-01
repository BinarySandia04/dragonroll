var backendUrl = ''
if (import.meta.env.PROD) {
    backendUrl = 'https://api.aranroig.com/';
} else {
    backendUrl = 'http://localhost:8081/'
}


export default backendUrl;
/* CONSEGNA

In questo esercizio, utilizzerai Promise.all() per creare la funzione getDashboardData(query), che accetta una città come input e recupera simultaneamente:
Nome completo della città e paese da  /destinations?search=[query]
(result.name, result.country, nelle nuove proprietà city e country).
Il meteo attuale da /weathers?search={query}
(result.temperature e result.weather_description nella nuove proprietà temperature e weather).
Il nome dell’aeroporto principale da /airports?search={query}
(result.name nella nuova proprietà airport).
Utilizzerai Promise.all() per eseguire queste richieste in parallelo e poi restituirai un oggetto con i dati aggregati.
Attenzione: le chiamate sono delle ricerche e ritornano un’array ciascuna, di cui devi prendere il primo risultato (il primo elemento).

Note del docente
Scrivi la funzione getDashboardData(query), che deve:
Essere asincrona (async).
Utilizzare Promise.all() per eseguire più richieste in parallelo.
Restituire una Promise che risolve un oggetto contenente i dati aggregati.
Stampare i dati in console in un messaggio ben formattato.
Testa la funzione con la query "london"
*/

async function getDashboardData(query) {

    try {
        const destinationsProm = fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/destinations?search=${query}`)
            .then((res) => res.json())

        const weathersProm = fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/weathers?search=${query}`)
            .then((res) => res.json())

        const airportsProm = fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/airports?search=${query}`)
            .then((res) => res.json())

        const promises = [destinationsProm, weathersProm, airportsProm] // raccolgo tutte le promises trovate tramite fetch alle varie api
        // const results = await Promise.all(promises) // raccolgo i risultati delle promises raccolte in una variabile

        // const destinations = results[0] // prendo l'indice 0 dei risultati dentro a destinations
        // const weathers = results[1]
        // const airports = results[2]

        // per non fare 3 passaggi, faccio destructuring:
        const [destinations, weathers, airports] = await Promise.all(promises)

        // ritorno i risultati presi dai json generati
        return {
            city: destinations[0].name,// prendo il primo elemento come da richiesta
            country: destinations[0].country,
            temperature: weathers[0].temperature,
            weather: weathers[0].weather_description,
            airport: airports[0].name
        }

    } catch (error) {
        throw new Error('Errore! I dati non sono stati recuperati')
    }

}

// stampo in console tutti i dati raccolti
getDashboardData('london')
    .then(data => {
        console.log('Dasboard data:', data);
        console.log(
            `${data.city} is in ${data.country}.\n` +
            `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n` +
            `The main airport is ${data.airport}.\n`
        );
    })
    .catch(error => console.error(error));
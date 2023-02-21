export  async  function getAdress(ip) {
    const response = await fetch(`
    https://geo.ipify.org/api/v2/country,city?apiKey=at_9dPMrfMqVi7cvrxUowD4MGMpgapj5&ipAddress=${ip}`);
    return await response.json();
}
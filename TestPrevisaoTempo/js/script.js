// 1. CHAVE DA API E CONFIGURAÇÃO
// Substitui esta string pela tua chave obtida no OpenWeatherMap
const apiKey = "24db59a9db7f7f0ab3a0c75ef932882b"; 

// 2. SELEÇÃO DE ELEMENTOS DO DOM
const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search-btn");

const weatherDataContainer = document.querySelector("#weather-data");
const errorMessage = document.querySelector("#error-message");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const humidityElement = document.querySelector("#humidity");
const windElement = document.querySelector("#wind");

// 3. FUNÇÃO PARA CONSULTAR A API
const getWeatherData = async (city) => {
    // Monta a URL com parâmetros: cidade, chave de API, unidades em Celsius (metric) e idioma em Português (pt_br)
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    try {
        const response = await fetch(apiURL);

        // Se a cidade não for encontrada (código 404), lança um erro
        if (!response.ok) {
            throw new Error("Cidade não encontrada");
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Erro ao procurar dados:", error);
        return null;
    }
};

// 4. FUNÇÃO PARA EXIBIR OS DADOS NA TELA
const showWeatherData = async (city) => {
    // Limpa estados anteriores (esconde mensagens e resultados)
    errorMessage.classList.add("hide");
    weatherDataContainer.classList.add("hide");

    // Procura os dados na API
    const data = await getWeatherData(city);

    // Se retornar erro/nulo, mostra a mensagem de erro
    if (!data) {
        errorMessage.classList.remove("hide");
        return;
    }

    // Preenche as informações no HTML
    cityElement.innerText = `${data.name}, ${data.sys.country}`;
    tempElement.innerText = `${parseInt(data.main.temp)}°C`;
    descElement.innerText = data.weather[0].description;
    
    // Ícone oficial disponibilizado pela OpenWeatherMap
    weatherIconElement.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    );

    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed} km/h`;

    // Exibe a secção com os dados do tempo
    weatherDataContainer.classList.remove("hide");
};

// 5. EVENTOS (Cliques e Tecla Enter)

// Evento de clique no botão de pesquisa
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();

    if (city) {
        showWeatherData(city);
    }
});

// Evento para permitir pesquisar ao carregar na tecla "Enter"
cityInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        const city = e.target.value.trim();

        if (city) {
            showWeatherData(city);
        }
    }
});
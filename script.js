let title = document.createElement("h1");
title.setAttribute("id","title");
title.setAttribute("class","text-center");
title.innerHTML = "REST COUNTRIES AND WEATHER USING FETCH API";
document.body.append(title);


const container = document.createElement("div");
container.setAttribute("class","container");
container.setAttribute("id","hide")
document.body.append(container);

    const row1=document.createElement("div");
    row1.classList.add("row");
    container.append(row1);

    async function Countries () {
        const all = await fetch("https://restcountries.com/v3.1/all");
        const data = await all.json ();
        data.forEach(out =>{
            console.log(out.flags.png);
        })
        data.forEach(country => {
            
            const column = document.createElement("div");
            column.setAttribute("class","col-4 col-sm-6 col-md-4 col-lg-4 col-xl-4 g-5");
            column.innerHTML = `
                <div class="card h-100" style="width:18rem">
                    <div class="card-header">
                        <h4 class="card-text">${country.name.common}</h4>
                    </div>
                    <img class="card-img-top" src="${country.flags.png}" altt="">
                    <div class="card-body">
                        <div class="card-text">
                            <h6>Native Name :${country.name.official}</h6>
                            <h6>Region : ${country.region}</h6>
                            <h6>Population : ${country.population}</h6>
                            <h6>Capital : ${country.capital}</h6>
                            <h6>Country Code : ${country.cca3}</h6>
                            <h6>Latlng : ${country.latlng}</h6>
                        </div>
                    </div>
                </div>`;

            const button = document.createElement("button");
            button.classList.add("btn","btn-dark");
            button.innerText = "Click for Weather";
            button.addEventListener("click",report);
            column.append(button);
            row1.append(column);
            
            async function report(){
                const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country.name.common}&appid=da7057b4443ce13c701a0e485d030084`)
                const weatherData = await weather.json();

                document.getElementById("hide").innerHTML="";

                const wcontainer = document.createElement("div");
                wcontainer.setAttribute("class","container");
                wcontainer.innerHTML=`
                    <div class="row g-3 container">
                        <div class="col col-lg-4 col-sm-12>
                            <div class="card-header">
                            <h4 class="card-text">${country.name.common}</h4>
                            </div>
                            <img src="${country.flags.svg}" alt="">
                             <div class="card-body">
                                <h6 class="card-text">Temperature: ${weatherData.main.temp}</h6>
                                <h6 class="card-text">Ground-Level: ${weatherData.main.grnd_level}</h6>
                                <h6 class="card-text">Humidity: ${weatherData.main.humidity}</h6>
                                <h6 class="card-text">Pressure: ${weatherData.main.pressure}</h6>
                                <h6 class="card-text">Sea-Level: ${weatherData.main.sea_level}</h6>
                                <h6 class="card-text">Temp-Max: ${weatherData.main.temp_max}</h6>
                                <h6 class="card-text">Temp-Min: ${weatherData.main.temp_min}</h6>
                             </div>
                        </div>
                    </div>
                    <button class="btn btn-primary">Reset</button>`;
                    document.body.append(wcontainer);


            }

        });
    }

    Countries()


  
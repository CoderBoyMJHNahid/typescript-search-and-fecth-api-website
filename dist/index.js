"use strict";
// declare all variables for html element target
const searchFrom = document.querySelector(".search_form");
const searchInput = document.querySelector(".search_input");
const mainContainer = document.querySelector(".main-contain");
const apiUrl = "https://api.github.com/users";
const fetchUser = async (url, option) => {
    const getUser = await fetch(url);
    const data = await getUser.json();
    return data;
};
const htmlStructure = (element) => {
    const { login, avatar_url, html_url, type } = element;
    mainContainer.insertAdjacentHTML("beforeend", `<div class="col-lg-3 my-3">
        <div class="card">
            <img src="${avatar_url}" class="card-img-top" alt="${login}" />
            <div class="card-body">
            <h5 class="card-title">${login}</h5>
            <p class="card-text">Github User Type: ${type}</p>
            <a href="${html_url}" target="_blank" class="btn btn-warning">Go to the profile</a>
            </div>
        </div>
    </div>`);
};
const loadData = () => {
    fetchUser(apiUrl).then((data) => {
        for (const element of data) {
            htmlStructure(element);
        }
    });
};
loadData();
searchFrom.addEventListener("submit", async (e) => {
    e.preventDefault();
    const search_value = searchInput.value.toLowerCase();
    console.log(search_value);
    try {
        const allData = await fetchUser(apiUrl);
        const filteredData = allData.filter((element) => {
            return element.login.toLowerCase().includes(search_value);
        });
        if (filteredData.length === 0) {
            mainContainer.innerHTML = "<p class='text-center'>No Data Found!!</p>";
        }
        else {
            mainContainer.innerHTML = "";
            filteredData.forEach((element) => {
                htmlStructure(element);
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});

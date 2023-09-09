
// declare all variables for html element target

const searchFrom = document.querySelector(".search_form") as HTMLFormElement;
const searchInput = document.querySelector(".search_input") as HTMLInputElement;
const mainContainer = document.querySelector(".main-contain") as HTMLElement;

const apiUrl:string = "https://api.github.com/users";

interface User{
    login:string;
    avatar_url:string;
    html_url:string;
    type:string;
}

const fetchUser = async <T>(url:string,option?:User):Promise<T> =>{
    const getUser = await fetch(url);
    const data = await getUser.json();
    return data;
}

const htmlStructure =(element:User)=>{

    const {login,avatar_url,html_url,type} = element;


    mainContainer.insertAdjacentHTML("beforeend",
    `<div class="col-lg-3 my-3">
        <div class="card">
            <img src="${avatar_url}" class="card-img-top" alt="${login}" />
            <div class="card-body">
            <h5 class="card-title">${login}</h5>
            <p class="card-text">Github User Type: ${type}</p>
            <a href="${html_url}" target="_blank" class="btn btn-warning">Go to the profile</a>
            </div>
        </div>
    </div>`);
}

const loadData =()=>{

    fetchUser<User[]>(apiUrl).then((data:User[])=>{
        for (const element of data) {
            htmlStructure(element);    
        }
    })

}

loadData();

searchFrom.addEventListener("submit",async (e:SubmitEvent)=>{
    e.preventDefault();

    const search_value:string = searchInput.value.toLowerCase();
    console.log(search_value);
    
    try {
        
        const allData:User[] = await fetchUser(apiUrl);
        const filteredData:User[] = allData.filter((element:User)=>{
            return element.login.toLowerCase().includes(search_value);
        });
        
        if (filteredData.length === 0) {
            mainContainer.innerHTML = "<p class='text-center'>No Data Found!!</p>";
        } else {
            mainContainer.innerHTML = "";
            filteredData.forEach((element:User)=>{
                htmlStructure(element);
            })
        }

    } catch (error) {
        console.log(error);
    }

})
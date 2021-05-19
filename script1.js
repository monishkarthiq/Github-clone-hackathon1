//Module-01 - to search user in github
//getting userinput from html and passing to two functions searchBox1
//and searcBox2 for either user or repo
//searchBox1 function (intiated) on html user input
// function intited when user press search user button in html
let searchBox1 = () => {
    //get search input from html input 
    let searchUserinput = document.querySelector("input")
    let random = searchUserinput.value;
    //hardcoded the api endpoints suitably here
    let searchUser_url =  `https://api.github.com/search/users?q=${random}&per_page=100`
    //from api endpoints jsonData created by async function(postcalled)
    let fetchFromUrl = async () => {

        let fetch_SearchData = await fetch(searchUser_url);
        let json_SearchData = await fetch_SearchData.json();

        //manipulating the json data to HTML via DOM
        let sectionSelector = document.querySelector("section")
        //iterating with json data and extracting every object in it and display to HTML
        json_SearchData.items.forEach(element => {
        //creating DOM elements to display the data
        // elements to  show the user name 
        let divContainer = domMachine('div','container userContainer')
        let imgavatar = domMachine('img','image')
        imgavatar.setAttribute('src',element.avatar_url)
        let span1 = domMachine('span')
        let aTag1 = domMachine('a')
        aTag1.setAttribute('href',element.html_url)
        aTag1.innerHTML = element.login
        let hr = domMachine('hr')
        
        //linking the repository page with the user repository name
        let repolink = domMachine('form','userform');
        repolink.setAttribute('action','repository.html')

        let repolinkbutton = domMachine('button','repobutton')
        repolinkbutton.setAttribute('type','submit');
        repolinkbutton.innerHTML = `${element.login}'s-Repos`
        
        let hiddenrepolink = domMachine('input')
        hiddenrepolink.setAttribute('type','hidden')
        hiddenrepolink.setAttribute('name','repo_url')
        hiddenrepolink.setAttribute('value',`${element.repos_url}`)

        //appending all elements to DOM
        repolink.append(repolinkbutton,hiddenrepolink)
        span1.append(imgavatar,aTag1,repolink)
        divContainer.append(span1,hr)
        sectionSelector.append(divContainer)
        });
    }
    fetchFromUrl();//called to iterate with obtain user json data
}

// Module - 02 , to search repository in github
// getting user input form html and passing to searchBox2 function
// function intited when user press search repo button in html
let searchBox2 = () => {
    //assigning hard coded url suitably based on keyword 
    let searchuserRepo = document.querySelector('input');
    let RepoUrl = searchuserRepo.value;
    let searchRepoUrl = `https://api.github.com/search/repositories?q=${RepoUrl}&per_page=100`;

    //fetch async funtion to get json Data for repository
    let fetchRepoUrl = async () => {
        let fetchRepodata = await fetch(searchRepoUrl);
        let jsondata_Reposearch = await fetchRepodata.json();
        //manipulating with dom to display all json data in html
        let sectionSelector2 = document.querySelector('section');
        //iterating jsondata to pass values to html
        jsondata_Reposearch.items.forEach(element2 => {
            let divContainer = domMachine('div','container userContainer')
        let imgavatar = domMachine('img','image')
        imgavatar.setAttribute('src',element2.owner.avatar_url)
        let span1 = domMachine('span')
        let aTag1 = domMachine('a')
        aTag1.setAttribute('href',element2.html_url)
        aTag1.innerHTML = element2.full_name
        let hr = domMachine('hr')
        //appending all elements
        span1.append(imgavatar,aTag1)
        divContainer.append(span1,hr)
        sectionSelector2.append(divContainer)
        });
    }
    fetchRepoUrl();//called to iterate with repositopry jsondata
}

//DOM element with class and id creater function and called wherever needed
let domMachine =  ((element, className = '', elementId = '') => {
    let domMachineElement = document.createElement(element);
    domMachineElement.setAttribute('class',className);
    domMachineElement.setAttribute('id',elementId);
    return domMachineElement;
})
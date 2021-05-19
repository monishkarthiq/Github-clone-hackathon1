//Module - 03 - to display the repository of any user
//repository url of the user passed from index page search user data
//function processUser will process and eliminate the extra symbols and extracts,returns only the url  
function processUser()
  {
    var parameters = location.search.substring(1);
    var parameters1 = parameters.split('&')
    var temp = parameters1[0].split("=");
    url = unescape(temp[1]);
    return url;
  }
  
processUser();
//extracted and returned repository url assigned here
repos_url = url;
//fetch function to get repository json data (postcalled)
let reposFromUrl = async () => {
    let fetch_repoData = await fetch(repos_url);
    let json_repoData = await fetch_repoData.json();
    //manipulating with DOM and pushing the needed data to html
    let sectionSelector = document.querySelector("section")
    
    let imgavatar = domMachine_repo('img','image')
        imgavatar.setAttribute('src',json_repoData[0].owner.avatar_url)

    let h1Tag = domMachine_repo('h1')
    h1Tag.innerHTML = `${json_repoData[0].owner.login}'s Repository`

    //appending to document
    sectionSelector.append(imgavatar,h1Tag)
        //iterating to extract specific data form the  list objects in jsonData
        json_repoData.forEach(element => {
        //creating DOM elements to display the data
        // elements to  show the user name 
        let divContainer = domMachine_repo('div','container userContainer')
        
        let span1 = domMachine_repo('span')
        
        let aTag1 = domMachine_repo('a')
        aTag1.setAttribute('href',element.html_url)
        aTag1.innerHTML = element.full_name
        let hr = domMachine_repo('hr')

        let contentlink = domMachine_repo('form');
        contentlink.setAttribute('action','contents.html')
        
        let contentlinkbutton = domMachine_repo('button','contentbutton')
        contentlinkbutton.setAttribute('type','submit');
        contentlinkbutton.innerHTML = `Go to Contents`
        
        let contentrepolink = domMachine_repo('input')
        contentrepolink.setAttribute('type','hidden')
        contentrepolink.setAttribute('name','content_url')
        //asigning api link hiddenly to another html as parameter to process repository contents
        //content button will lead to contens.html page listing the contents of selected repository
        contentrepolink.setAttribute('value',`https://api.github.com/repos/${element.owner.login}/${element.name}/contents/`)
        //appending remaining to document
        contentlink.append(contentlinkbutton,contentrepolink)
        span1.append(aTag1,contentlink)
        divContainer.append(span1,hr)
        sectionSelector.append(divContainer)
})
}
reposFromUrl();//called to fetch and process  json Data

//DOM element with class and id creater function and called wherever needed
let domMachine_repo =  ((element, className = '', elementId = '') => {
    let domMachinerepo = document.createElement(element);
    domMachinerepo.setAttribute('class',className);
    domMachinerepo.setAttribute('id',elementId);
    return domMachinerepo;
})
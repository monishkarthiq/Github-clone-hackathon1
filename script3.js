//Module - 04 - to display the repositorycontent of any user
//repository content url of the user passed from repository page with hidden input form
//function processUser will process and eliminate the extra symbols and extracts,returns only the url
function processUser()
  {
    var parameters = location.search.substring(1);
    var parameters1 = parameters.split('&')
    var temp = parameters1[0].split("=");
    url = unescape(temp[1]);
  }
processUser();
//extracted and returned repository url assigned here
content_url = url;
//fetch function to get contents of the specific repository
let contentFromUrl = async () => {
    let fetch_contentData = await fetch(content_url);
    let json_contentData = await fetch_contentData.json();
    //manipulating DOM to get displayed contents
    let sectionSelector = document.querySelector("section")

    let h1Tag = domMachine_content('h1')
    h1Tag.innerHTML = 'Repository contents';

    sectionSelector.append(h1Tag)
        //iterating to get the list contents
        json_contentData.forEach(element => {
        //creating DOM elements to display the data
        // elements to  show the user name 
        //content name will go to its external source site
        let divContainer = domMachine_content('div','container userContainer')
        
        let span1 = domMachine_content('span')
        
        let aTag1 = domMachine_content('a')
        aTag1.setAttribute('href',element.html_url)
        aTag1.innerHTML = element.name

        let hr = domMachine_content('hr')
        //appending all to document
        span1.append(aTag1)
        divContainer.append(span1,hr)
        sectionSelector.append(divContainer)
})
}
contentFromUrl()//called to display contents of the selected repo from repository page;
//DOM element with class and id creater function and called wherever needed
let domMachine_content =  ((element, className = '', elementId = '') => {
    let domMachinecontent = document.createElement(element);
    domMachinecontent.setAttribute('class',className);
    domMachinecontent.setAttribute('id',elementId);
    return domMachinecontent;
})
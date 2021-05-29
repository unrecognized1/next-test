const body = document.body;
const btn = document.getElementById('btn-nav');
const shareLink = document.getElementById('shareLink');
const okCookie = document.getElementById('ok-cookie')
const themetext = document.getElementsByClassName('themetext')
let a = document.querySelector('.nav')
const downloadButton = document.getElementById('download__button')
const copyLinkOverlay = document.getElementsByClassName('copy-link-overlay');

const closeCopy = document.getElementById('closeCopy')
const _CopyUrl = document.getElementById('CopyUrl')
const copyIframe = document.getElementById('copyIframe')

const loginOverlay = document.getElementById('login-overlay')
const closeLogin = document.getElementById('closeLogin')
const showLogin = document.getElementById('showLogin')
const register = document.getElementById('register')
const registerButton = document.getElementById('register')
const signinButton = document.getElementById('sign-in')
const loginErr = document.getElementById('login-err')
const signupErr = document.getElementById('signup-err')
const configs = {
	api:"https://pornflies.com/api/v1/",
	afterLogin:"https://pornflies.com/my_profile_edit/"
}
Object.freeze(configs)
const ls = window.localStorage


String.prototype.Clean = function() {
							const regex = /[^A-Za-z0-9\-]/ig;
							const regex1 = /--+/g;
							return this.toLowerCase().replaceAll(' ','-').replaceAll(regex,'').replaceAll(regex1,'-');
						}

String.prototype.CleanReverse = function() {
									let a = this.replaceAll('-',' ').split(' ').filter(i=>i);;
									const l = a.length ;
									let c = "";
									for (var i = 0; i < l; i++) {
										if (typeof a[i] !=='undefined') {

											c+= i==l-1 ? a[i][0].toUpperCase()+a[i].substring(1,a[i].length) : a[i][0].toUpperCase()+a[i].substring(1,a[i].length)+" ";
										}
									}
									return c;
								}


//checking if already clicked okCookie



if (ls.getItem('recent')) {
   recent = ls.getItem('recent')
   recent = JSON.parse(recent)

   const l = recent.length

   for (var i = 0; i < l; i++) {
     
      var theDiv = document.getElementById("recent--");
      let a = document.createElement('a');
      a.href = `https://pornflies.com/search/${recent[i].Clean()}/1/`
      a.text = recent[i]
      theDiv.appendChild(a);

   }
}


function time2TimeAgo(ts) {

    var d=new Date();  // Gets the current time
    var nowTs = Math.floor(d.getTime()/1000); // getTime() returns milliseconds, and we need seconds, hence the Math.floor and division by 1000
    var seconds = nowTs-ts;

    // more that two days
    if (seconds > 2*24*3600) {
       return "a few days ago";
    }
    // a day
    if (seconds > 24*3600) {
       return "yesterday";
    }

    if (seconds > 3600) {
       return "a few hours ago";
    }
    if (seconds > 1800) {
       return "Half an hour ago";
    }
    if (seconds > 60) {
       return Math.floor(seconds/60) + " minutes ago";
    }
}




if (ls) {
	okCookie__ = ls.getItem('ok')
	theme = ls.getItem('theme')
	let a = document.getElementById('cookie-notify');
	if (a!==null) {

		if (okCookie__ == "true") {
			a.style.display = 'none'
		}else{
			a.style.display = ''
		}
	}

	if (theme!==null) {
			const html = document.getElementsByTagName('html')
			
		if (theme=="dark") {
			if(themetext!==null)themetext[0].textContent = 'Light Theme'
			html[0].setAttribute('theme','dark')
		}else{
			if(themetext!==null)themetext[0].textContent = 'Dark Theme'
			html[0].setAttribute('theme','light')
		}
	}

}


//checking if already clicked okCookie


btn.addEventListener('click', e=>{
 a.style.display = a.style.display == 'none' ? 'block' : 'none'
});
document.getElementsByClassName('nav')[0]?.addEventListener('click',e=>{
	const t = e.target?.classList[0]?.toLowerCase()
	if ( t== 'nav') {
		a.style.display = 'none'
	}
})
document.getElementsByClassName('btn-nav btn-open-search')[0]?.addEventListener('click',e=>{
	let a = document.querySelector('#search-container');
	a.style.display = a.style.display == 'none' ? 'block' : 'none'	
})
document.getElementsByClassName('close')[0]?.addEventListener('click',e=>{
	let a = document.querySelector('#search-container');
	a.style.display = 'none'
})
okCookie?.addEventListener('click',e=>{
	let a = document.getElementById('cookie-notify');
	ls.setItem("ok",true)
	a.style.display = 'none'
})


function search(keyword) {
	if (keyword?.value?.length >= 3) {
	    const key = keyword.value.Clean()
		window.location = `https://pornflies.com/search/${key}/1/`
		if (ls.getItem('recent')) {
		let	recent = ls.getItem('recent');
		recent = JSON.parse(recent)
		recent.push(key.CleanReverse())
		recent = new Set([...recent])
		ls.setItem('recent', JSON.stringify([...recent]))
		return;
		}
		ls.setItem('recent', JSON.stringify([key.CleanReverse()]))
	}
}
let infoToggle = document.getElementsByClassName('info-hide-toggle');
infoToggle[0]?.addEventListener('click',e=>{
	let a = document.getElementsByClassName('info-hide-body')[0];
	a.style.display = a.style.display == 'none' ? 'block' : 'none'
	if(a.style.display == 'none'){
		infoToggle[0].innerText = 'Show'
	}
	if(a.style.display == 'block'){
		infoToggle[0].innerText = 'Hide'
	}
	
})

function abbreviateNumber(value) {
    var newValue = value;
    if (value >= 1000) {
        var suffixes = ["", "k", "m", "b","t"];
        var suffixNum = Math.floor( (""+value).length/3 );
        var shortValue = '';
        for (var precision = 2; precision >= 1; precision--) {
            shortValue = parseFloat( (suffixNum != 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));
            var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
            if (dotLessShortValue.length <= 2) { break; }
        }
        if (shortValue % 1 != 0)  shortValue = shortValue.toFixed(1);
        newValue = shortValue+suffixes[suffixNum];
    }
    return newValue;
}





const reset = function(type="",e=[]){
	switch (type) {
		case "download":
			if (typeof e!== 'undefined') {
				const icon = document.createElement('ion-icon')
				icon['name'] = 'cloud-download-outline'
				e.innerHTML = ''
				e.append(icon)

			}
			break;
		case "signup":
			if (typeof e!== 'undefined') {
				const icon = document.createElement('ion-icon')
				icon['name'] = 'person-add-outline'
				e.innerHTML = ''
				e.append(icon)

			}
			break;
		case "profile_edit":
			if (typeof e!== 'undefined') {
				const icon = document.createElement('ion-icon')
				icon['name'] = 'add-circle-outline'
				e.innerHTML = ''
				e.append(icon)

			}
			break;
		default:
			// statements_def
			break;
	}
}

const notify = (e="",message="") =>{

	const c = {
		'error': {
			'classes':['notify-item','error'],
			'svg':['svg-icon','svg-icon-close']
		},
		'success': {
			'classes':['notify-item','success'],
			'svg':['svg-icon','svg-icon-check']
		}
	}
	const notify_ = document.getElementsByClassName('notify')
	const main = document.createElement('div')
	const imgDiv = document.createElement('div')
	const svg = document.createElement('svg')
	const text = document.createElement('div')
	const use = document.createElement('use')
	svg.setAttribute('xmlns:xlink','http://www.w3.org/2000/svg')

	if (e=="success") {

		main.classList.add(...c.success.classes)
		imgDiv.classList.add('img')
		svg.classList.add(...c.success.svg)
		use.setAttribute("xlink:href", "#check")
		use.innerHTML = '<svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" id="check"><path d="M20 6L9 17l-5-5"></path></svg>'

	}else{

		main.classList.add(...c.error.classes)
		imgDiv.classList.add('img')
		svg.classList.add(...c.error.svg)
		use.setAttribute("xlink:href", "#close")
		use.innerHTML = '<svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1" id="close"><path d="M18 6L6 18M6 6l12 12"></path></svg>'

	}

		text.textContent = message
		text.classList.add('text')
		svg.append(use)
		imgDiv.append(svg)
		main.append(imgDiv)
		main.append(text)
		notify_[0].append(main)
		
		setInterval(()=>{

			try {
				if (main!=undefined){
					main.classList.add('notifications-item-leave-active','notifications-item-leave-to')
					setTimeout(e=> main.remove(),500)
				}else {
					main.remove()
				}
			} catch(e) {
				main.remove()
			}

		}, 3000)

	return true;
}


async function download () {//use token xsrfeverywhere
 	let button__icon = document.getElementsByClassName('button__icon')
 	if (button__icon!==null) {
 		downloadButton['disabled']='disabled'
 		button__icon= button__icon[0]
 		//loader elemnts
 		const main = document.createElement('div')
 		const spinnerBorder = document.createElement('div')
 		const span = document.createElement('span')
 		main.classList.add(...['d-flex','justify-content-center'])
 		spinnerBorder.classList.add(...['spinner-border'])
 		spinnerBorder['role'] = 'status'
 		sStyle = spinnerBorder.style
 		sStyle.border = '.15em solid #fff'
 		sStyle.borderRightColor = 'transparent'
 		span.classList.add('sr-only')
 		span.textContent = 'Loading...'
 		button__icon.innerHTML = ''
 		spinnerBorder.append(span)
 		button__icon.append(spinnerBorder)

 		const link = downloadButton.getAttribute("video")
 		const vid = downloadButton.getAttribute("video_id")
 		const f = new FormData()
 		f.append('v-link',link)
 		f.append('v-id',vid)
 		f.append('location',window.location.href??"")
 		f.append('q',"download")
 		if (vid.length>0)await axios.post(configs.api,f)
 		
 		setTimeout(()=>{
			var newWin = window.open(link);             

			if(!newWin || newWin.closed || typeof newWin.closed=='undefined') //if popup blocked then redirect it 
			{ 
				window.location.href = link
			}
	 		downloadButton.removeAttribute('disabled')
	 		reset("download",button__icon)

 		}, 5000)


 	}
 }



function copyLinkModal(){
	

	if (copyLinkOverlay != null && copyLinkOverlay.length>0) {
		copyLinkOverlay[0].style.display = 'block'
	}
}



function copyLink(elem){
  const copyText = elem;
  copyText.select();
  copyText.setSelectionRange(0, 99999); 
  document.execCommand("copy");
}






if (downloadButton != null) {

 downloadButton.addEventListener('click',download)
	
}



if (shareLink != null) {
 shareLink.addEventListener('click',copyLinkModal)
}

if (copyLinkOverlay != null && copyLinkOverlay.length>0) {
	 copyLinkOverlay[0].addEventListener('click',(e)=>{
	 	if (e.target.classList.value == 'overlay-modal copy-link-overlay') {
	 	copyLinkOverlay[0].style.display = 'none'

	 	}
	 })
}






//handling copy//

if (closeCopy!==null) {
	closeCopy.addEventListener('click',()=>{
		copyLinkOverlay[0].style.display = 'none'
	})
}


if (copyIframe!==null) {
	copyIframe.addEventListener('click',()=>{
		copyLink(copyIframe)
	})
}
if (_CopyUrl!==null) {
	_CopyUrl.addEventListener('click',()=>{
		copyLink(_CopyUrl)
	})
}
//handling copy//


//handling dark/light mode

const themeBtn = document.getElementById('theme-switcher')

if (themeBtn!==null) {
	themeBtn.addEventListener('click',()=>{
		const i = ls.getItem('theme')
		const html = document.getElementsByTagName('html')
		if (i!==null&&i=="dark") {
			if(themetext!==null)themetext[0].textContent = 'Dark Theme'
			html[0].setAttribute('theme','light')
			ls.setItem('theme',"light")
		}else{
			if(themetext!==null)themetext[0].textContent = 'Light Theme'
			html[0].setAttribute('theme','dark')
			ls.setItem('theme',"dark")
		}
	})
}

//handling dark/light mode

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}


async function registration(e){
	e.preventDefault();
	let name = document.getElementsByName('name')
	let password = document.getElementsByName('password')
	let email = document.getElementsByName('email')
	let tok = document.getElementsByName('tok')

	//removing errs
	name[0].classList.remove('error')
	email[0].classList.remove('error')
	password[0].classList.remove('error')
	document.getElementsByClassName('input-error')[0]?.remove()
	if(signupErr!==null)signupErr.innerHTML = ''
	//removing errs

	if (typeof tok[0] !== 'undefined' && typeof password[0] !== 'undefined' && typeof email[0] !== 'undefined' && typeof name[0] !== 'undefined'  ) {
		name_ = name[0].value
		email_ = email[0].value
		password_ = password[0].value
		tok = tok[0].value
		const d = new FormData
		d.append('name',name_)
		d.append('email',email_)
		d.append('password',password_)
		d.append('tok',tok)
		d.append('q','registration')
		try {








			//spinner

			 	let button__icon = document.getElementsByClassName('button__icon')
			 	if (button__icon!=null) {
			 		registerButton['disabled']='disabled'
			 		button__icon= button__icon[0]
			 		//loader elemnts
			 		const main = document.createElement('div')
			 		const spinnerBorder = document.createElement('div')
			 		const span = document.createElement('span')
			 		main.classList.add(...['d-flex','justify-content-center'])
			 		spinnerBorder.classList.add(...['spinner-border'])
			 		spinnerBorder['role'] = 'status'
			 		sStyle = spinnerBorder.style
			 		sStyle.border = '.15em solid #fff'
			 		sStyle.borderRightColor = 'transparent'
			 		span.classList.add('sr-only')
			 		span.textContent = 'Loading...'
			 		button__icon.innerHTML = ''
			 		spinnerBorder.append(span)
			 		button__icon.append(spinnerBorder)
			 	}

			//spinner





			try {
					const res = await axios.post(`${configs.api}`,d)
				if (res.status==200) {
					const wrapper = document.getElementById('wrap-quack')

					const mainDiv = document.createElement('div')
					const title = document.createElement('div')
					const text = document.createElement('div')
					const support = document.createElement('div')
					const supportAhref = document.createElement('a')

					mainDiv.classList.add('signup-success')
					mainDiv['id'] = 'signup__success'
					title.classList.add('title')
					title.textContent = 'Please confirm your email'
					text.classList.add('text')
					text.textContent = `Following the instructions that were sent to your address: ${email_}`
					support.classList.add('support-text')
					supportAhref.classList.add('text-red')
					supportAhref.setAttribute('target','_blank')
					supportAhref.setAttribute('href','/information/contact')
					supportAhref.textContent = 'Support'
					support.textContent = `If you have any problems with confirmation, please contact `
					support.append(supportAhref)

					mainDiv.append(title,text,support)
					wrapper.innerHTML = ''
					wrapper.append(mainDiv)

					
				}
				
			} catch(e) {

				// console.log(e)
				if (e?.response?.data) {//handling signup errors
					const errType = e.response.data;
					if (typeof errType.err !== 'undefined') {
						const errMessage = document.createElement('div')
						errMessage.classList.add('input-error')
						errMessage.textContent = errType.response
						switch (errType.err) {
							case 1:
								name[0].classList.add('error')
								insertAfter(name[0], errMessage);
								break;
							case 2:
								email[0].classList.add('error')
								insertAfter(email[0], errMessage);
								break;
							case 3:
								password[0].classList.add('error')
								insertAfter(password[0], errMessage);
								break;
							default:
								break;
						}

					}
						if (signupErr!==null) {
							const errMessage = document.createElement('div')
							errMessage.classList.add('input-error')
							errMessage.textContent = errType.response
							errMessage.style.textAlign='center'
							if(errMessage.textContent.length>0)signupErr.append(errMessage)
						}
				}
				reset("signup",button__icon)
				registerButton.removeAttribute('disabled')
			}

	 		
			


		} catch(e) {
			// statements
// 			console.log(e.message);
		}
		

	}

}


async function signin(e){

	e.preventDefault();
	loginErr.innerHTML = ''
	let email = document.getElementsByName('email')
	let password = document.getElementsByName('password')
	if (typeof password[0] !== 'undefined' && typeof email[0] !== 'undefined') {
		const email_ = email[0].value,password_ = password[0].value
		const d = new FormData
		d.append('email',email_)
		d.append('pwd',password_)
		d.append('q','login')
		try {
				const res = await axios.post(`${configs.api}`,d)
				if (res.status==200) {
					loginOverlay.style.display = 'none'
                    
                    if (loginOverlay && loginOverlay.getAttribute('reload') !== null)return window.location.reload()
					return window.location.href = `${configs.afterLogin}`

				}
		} catch(e) {
			// statements
				if (e?.response?.data) {//handling login errors
					const errType = e.response.data;
					const errMessage = document.createElement('div')
					errMessage.classList.add('input-error')
					errMessage.style.textAlign = 'center'
					errMessage.textContent = errType.response
					loginErr.append(errMessage)
				}
		}

	}
}


//handling sign modal



if (showLogin!==null) {
	showLogin.addEventListener('click',(e)=>{
		loginOverlay.style.display = ''
	})

}

if (loginOverlay !== null) {
	 loginOverlay.addEventListener('click',(e)=>{
	 	if (e.target.classList.value == 'overlay-modal login-link-overlay') {
	 	loginOverlay.style.display = 'none'

	 	}
	 })
}


if (closeLogin!=null) {
	closeLogin.addEventListener('click',()=>{
		loginOverlay.style.display = 'none'
	})
}





//handling sign modal




if (register !== null && typeof register !== 'undefined') {

	register.addEventListener('click',registration)
}


if (signinButton !== null && typeof signinButton !== 'undefined') {

	signinButton.addEventListener('click',signin)
}





const networks_group = document.querySelector('#networks-group')
const networks_group_links = document.querySelector('#networks-group-links')
const pornstar_group = document.querySelector('#pornstar-group')
const pornstar_group_links = document.querySelector('#pornstar-group-links')
const profile_group = document.querySelector('#profile-group')
const profile_group_links = document.querySelector('#profile-group-links')

function showHideHeaderLinks(is,elem){
	if (is)elem.style.display = ''
	if (!is)elem.style.display = 'none'
}

if (networks_group!=null && networks_group_links != null) {
	networks_group.addEventListener('click',e=> networks_group_links.style.display == 'none' ? showHideHeaderLinks(true,networks_group_links) : showHideHeaderLinks(false,networks_group_links))
}
if (pornstar_group!=null && pornstar_group_links != null) {
	pornstar_group.addEventListener('click',e=> pornstar_group_links.style.display == 'none' ? showHideHeaderLinks(true,pornstar_group_links) : showHideHeaderLinks(false,pornstar_group_links))
}
if (profile_group!=null && profile_group_links != null)profile_group.addEventListener('click',e=> profile_group_links.style.display == 'none' ? showHideHeaderLinks(true,profile_group_links) : showHideHeaderLinks(false,profile_group_links))





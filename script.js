const subbtn = document.querySelector('.sub-btn');
const emailadd=document.querySelector('[data-info]');
const frm=document.querySelector('[data-form]');
const loading=document.querySelector('[data-loading]');
const infoCon=document.querySelector('.information-container');
const API= 'ema_live_nDO9g7qvZS4MHL4zjXsY3TmcVIkouJlcuGSgsH3J';

emailadd.addEventListener("keypress",(e) =>{
    if (e.key === "Enter") {
        e.preventDefault();
        subbtn.click();
    }
});
subbtn.addEventListener('click', getInformation);

function getInformation() {
    const em=emailadd.value;
    if (em=="") return ;
    fetchInfo(em);
}

async function fetchInfo(emaill) {
    loading.classList.add('active');
    infoCon.classList.remove('active');
    try {
        const response=await fetch(`https://api.emailvalidation.io/v1/info?apikey=${API}&email=${emaill}`);
        const data=await response.json();

        console.log(data);
        renderData(data);
        loading.classList.remove('active');
        infoCon.classList.add('active');
    }
    catch(err){
        loading.classList.remove('active');
        alert('Data not fetched');
    }

}

function renderData(data){
    const emailaddress=document.querySelector('[data-email-add]');
    const dstate=document.querySelector('[data-state]');
    const reason=document.querySelector('[data-reason]');
    const domain=document.querySelector('[data-domain]');
    const duser=document.querySelector('[data-user]');
    const isValid=document.querySelector('[data-format-valid]');
    const mxValid=document.querySelector('[data-mx]');
    const score=document.querySelector('[data-score]');
    const role=document.querySelector('[data-role-email]');
    const free=document.querySelector('[data-free-email]');
    const disposal=document.querySelector('[data-disposable]');
    emailaddress.innerText=data?.email;
    dstate.innerText=data.state;
    reason.innerText=data.reason;
    domain.innerText=data.domain;
    duser.innerText=data.user;
    if (data?.format_valid==true)
    isValid.innerText="Yes";
    else
    isValid.innerText="No";
    if (data?.mx_found==true)
    mxValid.innerText="Yes";
    else 
    mxValid.innerText="No";
    score.innerText=data?.score;
    if (data?.role==true)
    role.innerText="Yes";
    else 
    role.innerText="No";
    if (data?.free==true)
    free.innerText="Yes";
    else
    free.innerText="No";
    if (data?.disposable==true)
    disposal.innerText="Yes";
    else 
    disposal.innerText="No";
}
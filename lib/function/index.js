export function disableScroll(state) {
    if(state){
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        setCookie('wScrollMar', scrollTop);
        document.getElementsByTagName('html')[0].style.position = 'fixed';
        document.getElementsByTagName('html')[0].style.width = '100%';
    }else{
        document.getElementsByTagName('html')[0].style.position = '';
        window.scrollTo(0, getCookie('wScrollMar') || 0);
        removeCookie('wScrollMar');
    };
}

const setCookie = (key, val, time) => {
    var date = new Date();
    var expiresDays = time;
    date.setTime(date.getTime() + expiresDays*24*3600*1000);
    document.cookie = key + "=" + val +";expires=" + date.toGMTString();
}

const removeCookie = (key) => {
    setCookie(key, '', -1);
}

const getCookie = (key) => {
    var getCookie = document.cookie.replace(/[ ]/g,"");
    var arrCookie = getCookie.split(";")
    var res;
    for(var i = 0;i < arrCookie.length;i++){
        var arr = arrCookie[i].split("=");
        if(key == arr[0]){
            res = arr[1];
            break;
        }
    }
    return res;
}

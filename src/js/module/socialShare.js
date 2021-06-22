var ADD_ARRAY = ADD_URL.split('?');
var SHAREURL = "http://www.our-work.com.tw/demosite/2019/2019-meiji-amicolla-2019Q2/view.html";

function FBSharer() {
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(SHAREURL + "?" + ADD_ARRAY[1]),
        'facebook-share-dialog',
        'width=600,height=600'
    );
}

function FBDialog() {
    var ALL_LINK = encodeURIComponent("https://eventpxmart.com.tw/game.html?score=" + gameDate.score);
    var SHAREURL = "https://eventpxmart.com.tw/app/ShareGame.php";
    window.location.href = 'https://www.facebook.com/dialog/share?app_id=917155502026405&href=' + encodeURIComponent(SHAREURL + "?pic=" + scoreRange(gameDate.score)) + "&redirect_uri=" + ALL_LINK + "&t=" + dd.getTime();
}

function LineSharer() {
    ADD_URL = window.location.href;
    ADD_ARRAY = ADD_URL.split('?');
    window.open('https://social-plugins.line.me/lineit/share?url=' + encodeURIComponent(SHAREURL + "?" + ADD_ARRAY[1]),
        'width=600,height=600'
    );
}

function LinkinSharer() {
    window.open('http://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(url),
            'sharer',
            'toolbar=0, status=0, width=600, height=600');
        return false;
}
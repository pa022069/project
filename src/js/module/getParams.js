//方法一
UrlParams = function () {
    var _url;
    var _targetParam;

    function urlSearch(_name) {
        _url = new URL(window.location.href);
        _targetParam = _url.searchParams.get(_name);
        return _targetParam;
    }

    return {
        getUrlParams: function (_get) {
            return urlSearch(_get);
        }
    }
}

var myParams = new UrlParams();

// console.log(myParams.getUrlParams("a"));

//方法二
// var getURLParam = function (name) {
//     return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)', "ig").exec(location
//         .search) || [, ""])[1].replace(/\+/g, '%20')) || null;
// };
// console.log(getURLParam("utm_source"));
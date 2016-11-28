/**
 * Created by kxhl on 2016/6/7.
 */


$(function() {
    var _a    = $('.list').find('.banner').find('a'),
        _name = $('.supname').find('a');
        
    for(var i = 0; i < _a.length; i++) {
        var _href = _a.eq(i).attr('href'),
            _nhre = _name.eq(i).attr('href')
        _a.eq(i).attr('href', _href + '/?url=' + window.location.href)
        _name.eq(i).attr('href', _nhre + '/?url=' + window.location.href)
    }
})




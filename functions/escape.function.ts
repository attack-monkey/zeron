export function _escape (value) {
    const htmlEscapes = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
    };
    const htmlEscaper = /[&<>"'/]/g;
    return ('' + value).replace(htmlEscaper, function(match) {
        return htmlEscapes[match];
    });
};
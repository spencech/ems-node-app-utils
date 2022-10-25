exports.alphabetize = function(...parameters) {
    if (typeof parameters[0] === 'string') {
        // if this method is supplied as a callback to Array.sort
        const a = parameters[0];
        const b = parameters[1];
        if (a > b)
            return 1;
        if (a < b)
            return -1;
        return 0;
    }
    else {
        // if we're sorting a list with a supplied key to alphabetize
        const list = parameters[0];
        const property = parameters[1];
        list.sort((a, b) => {
            if (a[property] > b[property])
                return 1;
            if (a[property] < b[property])
                return -1;
            return 0;
        });
        return list;
    }
}
exports.clone = function(obj) {
    if (obj === null || obj === undefined)
        return obj;
    return JSON.parse(JSON.stringify(obj));
}
exports.dateStrings = function(date) {
    date = date || new Date();
    return {
        year: date.getFullYear(),
        month: (date.getMonth() + 1).toString().padStart(2, '0'),
        date: date.getDate().toString().padStart(2, '0'),
        time: `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`,
        seconds: date.getSeconds().toString().padStart(2, '0'),
    };
}
exports.delay = function(method, ms = 0) {
    return setTimeout(method, ms);
}

exports.empty = function(e) {
    return falsy(e);
}
exports.enumKeys = function(obj) {
    return Object.keys(obj).filter(k => Number.isNaN(+k));
}
exports.enumValues = function(obj) {
    const output = [];
    for (const value of enumKeys(obj)) {
        output.push(obj[value]);
    }
    return output;
}
exports.falsy = function(e) {
    if (typeof e === 'string' && trim(e).match(/^false$/i))
        return true;
    if (typeof e === 'string')
        return _.isEmpty(e.replace(/\s+/gim, ''));
    if (typeof e === 'boolean')
        return e === false;
    if (!isNaN(parseInt(e, 10)))
        return e === 0;
    return _.isEmpty(e);
}
exports.focus = function(selector) {
    const element = document.querySelector(selector);
    if (!element || !element.focus)
        return 0;
    return delay(() => element.focus());
}
exports.getLargestRemainder = function(values, desiredSum) {
    let sum = 0;
    let valueParts = values.map((value, index) => {
        const integerValue = value || 0;
        sum += integerValue;
        return {
            integer: integerValue,
            decimal: value % 1,
            originalIndex: index,
        };
    });
    if (sum !== desiredSum && sum) {
        valueParts = valueParts.sort((a, b) => b.decimal - a.decimal);
        const diff = desiredSum - sum;
        let i = 0;
        while (i < diff) {
            valueParts[i].integer++;
            i++;
        }
    }
    return valueParts.sort((a, b) => a.originalIndex - b.originalIndex).map((p) => p.integer);
}

exports.isset = function(e) {
    return truthy(e);
}
exports.kebab = function(e) {
    if (_.isEmpty(e))
        return e;
    return e.toLowerCase().replace(/\s+/gim, '-').replace(/_/g, '-').replace(/-+/g, '-');
}
exports.replaceItem = function(array, item, key = 'id', position = 'current') {
    const lookup = {};
    lookup[key] = item[key];
    const oldItem = _.findWhere(array, lookup);
    if (!oldItem) {
        array.unshift(item);
        return item;
    }
    const index = array.indexOf(oldItem);
    if (position === 'first') {
        array.splice(index, 1);
        array.unshift(item);
    }
    else {
        array.splice(index, 1, item);
    }
    return item;
}
exports.sleep = function(duration = 0) {
    return new Promise((resolve) => {
        delay(() => resolve(duration), duration);
    });
}
exports.snakecase = function(e) {
    if (_.isEmpty(e))
        return e;
    return e.toLowerCase().replace(/\s+/gim, '_').replace(/-/g, '_').replace(/_+/g, '_');
}
exports.tick = function(returnValue) {
    return new Promise((resolve, reject) => {
        delay(() => resolve(returnValue));
    });
}
exports.timestamp = function(date, includeTime = true) {
    const info = dateStrings(date);
    const time = `${info.time}:${info.seconds}`;
    return `${info.year}-${info.month}-${info.date}${includeTime ? time : ''}`;
}
exports.trace = function(...parameters) {
    if (!getparams().debug)
        return;
    for (let i = 0, count = parameters.length; i < count; i++) {
        // tslint:disable-next-line
        console.log(parameters[i]);
    }
}
exports.trim = function(e) {
    if (_.isEmpty(e))
        return e;
    return e.replace(/^\s+/, '').replace(/\s+$/, '');
}

exports.truthy = function(e) {
    return !falsy(e);
}

exports.validateEmail = function(email) {
    if (!email)
        return null;
    return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

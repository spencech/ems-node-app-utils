export function alphabetize(...parameters) {
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
export function clone(obj) {
    if (obj === null || obj === undefined)
        return obj;
    return JSON.parse(JSON.stringify(obj));
}
export function dateStrings(date) {
    date = date || new Date();
    return {
        year: date.getFullYear(),
        month: (date.getMonth() + 1).toString().padStart(2, '0'),
        date: date.getDate().toString().padStart(2, '0'),
        time: `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`,
        seconds: date.getSeconds().toString().padStart(2, '0'),
    };
}
export function delay(method, ms = 0) {
    return window.setTimeout(method, ms);
}
export function download(content, name, extension = 'csv') {
    const blob = new Blob([content]);
    name = kebab(name);
    if (window.navigator.msSaveOrOpenBlob)
        window.navigator.msSaveBlob(blob, `${name}.${extension}`);
    else {
        const a = window.document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = `${name}.${extension}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}
export function empty(e) {
    return falsy(e);
}
export function enumKeys(obj) {
    return Object.keys(obj).filter(k => Number.isNaN(+k));
}
export function enumValues(obj) {
    const output = [];
    for (const value of enumKeys(obj)) {
        output.push(obj[value]);
    }
    return output;
}
export function falsy(e) {
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
export function focus(selector) {
    const element = document.querySelector(selector);
    if (!element || !element.focus)
        return 0;
    return delay(() => element.focus());
}
export function getLargestRemainder(values, desiredSum) {
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
export function getparams(requestedProperty) {
    const vars = {};
    const parts = window.location.href.replace(/[?&#]+([^=&]+)=([^&]*)/gi, ((m, key, value) => {
        vars[key] = value;
    }));
    for (const prop in vars) {
        if (vars[prop].toLowerCase() === 'true')
            vars[prop] = true;
        else if (vars[prop].toLowerCase() === 'false')
            vars[prop] = false;
        else if (!isNaN(parseFloat(vars[prop])) && !vars[prop].match(/[^0-9]+/gim))
            vars[prop] = parseFloat(vars[prop]);
    }
    if (requestedProperty)
        return vars[requestedProperty];
    return vars;
}
export function isset(e) {
    return truthy(e);
}
export function kebab(e) {
    if (_.isEmpty(e))
        return e;
    return e.toLowerCase().replace(/\s+/gim, '-').replace(/_/g, '-').replace(/-+/g, '-');
}
export function replaceItem(array, item, key = 'id', position = 'current') {
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
export function sleep(duration = 0) {
    return new Promise((resolve) => {
        delay(() => resolve(duration), duration);
    });
}
export function snakecase(e) {
    if (_.isEmpty(e))
        return e;
    return e.toLowerCase().replace(/\s+/gim, '_').replace(/-/g, '_').replace(/_+/g, '_');
}
export function tick(returnValue) {
    return new Promise((resolve, reject) => {
        delay(() => resolve(returnValue));
    });
}
export function timestamp(date, includeTime = true) {
    const info = dateStrings(date);
    const time = `${info.time}:${info.seconds}`;
    return `${info.year}-${info.month}-${info.date}${includeTime ? time : ''}`;
}
export function trace(...parameters) {
    if (!getparams().debug)
        return;
    for (let i = 0, count = parameters.length; i < count; i++) {
        // tslint:disable-next-line
        console.log(parameters[i]);
    }
}
export function trim(e) {
    if (_.isEmpty(e))
        return e;
    return e.replace(/^\s+/, '').replace(/\s+$/, '');
}
export function truthy(e) {
    return !falsy(e);
}
export function validateEmail(email) {
    if (!email)
        return null;
    return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}
export function viewport(el, percentVisible = 100) {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return !(Math.floor(100 - ((rect.top >= 0 ? 0 : rect.top) / +-(rect.height / 1)) * 100) < percentVisible ||
        Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) < percentVisible);
}
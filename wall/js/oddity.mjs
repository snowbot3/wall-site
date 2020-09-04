/** wall-oddity **/
// odd utility functions

export function one(fn) {
	let ran = false, res;
	return function(...args) {
		if (!ran) {
			res = fn.apply(this, args);
			ran = true;
		}
		return res;
	};
}

export function capitalize(str) {
	return (
		str.charAt(0).toUpperCase()
		+ str.slice(1)
	);
}

/** concept */
async function cycle_await(obj, params) {
	return cycle_inner(await obj, params);
}
function cycle_inner(obj, params) {
	if (obj instanceof Promise) {
		return cycle_await(obj, params);
	} else if (obj instanceof Function || typeof obj == 'function') {
		if (params.length > 0) {
			return cycle_inner(obj(), params);
		}
	} else if (obj instanceof Object) {
		if (typeof params[0] == 'string' && params[0] in obj) {
			return cycle_inner(obj[params[0]], params.slice(1));
		}
	} else if (typeof obj == 'object') {
		// only force default for module object
		if (typeof params[0] == 'string' && params[0] in obj) {
			return cycle_inner(obj[params[0]], params.slice(1));
		} else if ('default' in obj) {
			return cycle_inner(obj['default'], params);
		}
	}
	return obj;
}
export function cycle(obj, ...params) {
	return cycle_inner(obj, params);
}
